# 在 Neovim Terminal 中显示 Fastfetch 图片 —— 全流程复盘

## 问题

在 kitty 终端里跑 `fastfetch`，能看到 `omori.png` 的图片 logo；但在 neovim 的 `:terminal` 里跑同样的命令，图片不显示。

## 思维模型

遇到这种「A 环境正常、B 环境不正常」的问题，先问自己一个问题：

> **B 环境和 A 环境之间，隔了什么层？**

kitty 跑 fastfetch → 输出直接到 kitty 的终端模拟器
nvim terminal 跑 fastfetch → 输出先到 **neovim 自带的 libvterm**，再由 libvterm 渲染到 nvim 窗口

这个中间层 **libvterm** 就是问题的根源。

---

## 第一步：诊断（不要猜，要验证）

### 1.1 确认环境变量差异

```bash
# 在 kitty 里
echo $TERM        # → xterm-kitty
echo $NVIM        # → (空)

# 在 nvim :terminal 里
echo $TERM        # → xterm-kitty (继承自 kitty)
echo $NVIM        # → /tmp/nvim.xxx/... (nvim 的 socket 路径)
```

学到的点：**`$TERM` 不能用来检测 nvim terminal**，因为它是从父终端继承的。nvim terminal 不是 xterm-kitty，它只是名字叫这个。用 `$NVIM` 才可靠。

### 1.2 确认协议支持

kitty 支持 **Kitty Graphics Protocol**（通过 `\e_G...\e\` 转义序列传像素数据）。
libvterm **不支持**任何图形协议（不支持 kitty、sixel、iterm2）。

```bash
# 验证 fastfetch 有 chafa 支持
fastfetch --list-features | grep chafa  # → chafa ✓
```

### 1.3 确认版本和能力

```bash
fastfetch --version  # → 2.62.1
nvim --version       # → 0.12.2
chafa --version      # → 未安装！→ brew install chafa
```

---

## 第二步：探索方案空间

### 2.1 方案矩阵

| 方案 | 原理 | 可行性 |
|---|---|---|
| fastfetch `type: "kitty"` | 输出 kitty 协议 | ❌ libvterm 不识 |
| fastfetch `type: "chafa"` | 用 libchafa 渲染 | ⚠️ 测试发现不加载自定义图片（可能是此版本的 bug）|
| fastfetch `type: "file-raw"` + chafa CLI | chafa CLI 预渲染为字符，fastfetch 读取文件 | ✅ 可行 |
| 直接写 ASCII art | 手绘 | ✅ 已有 `my_logo.txt`，但缺颜色 |

### 2.2 关键决策点

第一次尝试：把 fastfetch config 里的 `type` 从 `"kitty"` 改成 `"chafa"`，直接用 libchafa 渲染。但无论怎么换图片，输出始终是 macOS 内置 logo。

```bash
# 尝试了这些，都没用
fastfetch --chafa ~/.config/fastfetch/omori.png
fastfetch --logo-type chafa --logo ~/.config/fastfetch/omori.png
TERM=xterm fastfetch --chafa ~/.config/fastfetch/omori.png
```

**教训：工具声称支持的功能，不一定在所有版本/场景下工作。先做最小验证。**

换策略：不用 fastfetch 内置的 chafa，改用 chafa CLI 预渲染。

---

## 第三步：chafa CLI 预渲染

### 3.1 找出合适的尺寸

omori.png 是 639×1376 像素（宽高比 ≈ 1:2.15），很窄很高。

```bash
# 测试不同尺寸
chafa -f symbols --symbols block -s 30x44 omori.png
```

chafa 的 `-s WxH` 设定的是**最大**字符数。当宽度成为约束时（图片太窄），实际输出行数会比 H 小。

```bash
# 实测结果
-s 20x44 → 22 行
-s 30x44 → 33 行  
-s 35x44 → 38 行
-s x44   → 44 行（但宽度 103 字符！放不下文字）
```

**学到的点**：当宽度和高度互相约束时，先固定一个维度，让另一个自动适配。这里我固定了宽度（要留空间给右侧文字）。

### 3.2 宽度约束的思考

```
终端宽度 80-120 字符
图片宽度 ~30 字符
左侧 padding 4
右侧 padding 2
文字起始列 = 30 + 4 + 2 = 36
文字占用 ~35 字符
36 + 35 = 71 < 80 ✓
```

选了 `-s 30x44`，结果 33 行、30 字符宽。

```bash
chafa -f symbols --symbols block -s 30x44 ~/.config/fastfetch/omori.png \
  > ~/.config/fastfetch/omori_chafa.txt
```

### 3.3 清理转义序列

chafa 输出中混入了**光标移动**序列（`\e[33A`、`\e[36C`、`\e[?25l`），如果不清理，会和 fastfetch 自己的布局冲突。

```python
# 只保留颜色码，删除光标移动码
text = re.sub(r'\x1b\[\?25[lh]', '', text)     # 隐藏/显示光标
text = re.sub(r'\x1b\[\d*[A-DG]', '', text)    # 光标上下左右移动
text = re.sub(r'\x1b\[\d+;\d+[Hf]', '', text)  # 光标绝对定位
```

**学到的点**：转义序列分两类——SGR（颜色/样式）和 CSI（光标控制）。不要一刀切全部删掉，要精准删除不需要的那类。

---

## 第四步：高度对齐

### 4.1 文本行数计算

fastfetch 的 modules 列表中，每个模块产生 1 行输出。但 `icons`、`terminalfont`、`poweradapter` 这些模块在数据不满足时**不输出任何东西**（连空行都不出），所以实际行数 ≠ 模块数量。

```bash
# 精准方法：跑一遍再看
fastfetch --config config-nvim.jsonc --logo none | wc -l  # → 30 行
```

### 4.2 对齐策略

图片 33 行，文本 30 行 → 差 3 行。插入 3 个 `break` 补齐。

**学到的点**：不要根据配置文件「推算」输出行数，一定要**实际跑一遍**。尤其是有条件输出的模块时。

---

## 第五步：环境自动切换

### 5.1 Shell wrapper 模式

在 `.zshrc` 里定义一个同名函数覆盖原命令：

```bash
fastfetch() {
    if [[ -n "$NVIM" ]]; then
        command fastfetch --config "$HOME/.config/fastfetch/config-nvim.jsonc" "$@"
    else
        command fastfetch "$@"
    fi
}
```

关键细节：
- 用 `command fastfetch` 而不是 `fastfetch`，防止递归
- `"$@"` 保持参数透传
- 检测 `$NVIM` 而不是 `$TERM`（理由见第一步）

### 5.2 两个配置文件

| 文件 | 适用环境 | logo 类型 |
|---|---|---|
| `config.jsonc` | kitty | `"kitty"` — 原生图形协议 |
| `config-nvim.jsonc` | nvim terminal | `"file-raw"` — 预渲染的 chafa 文本 |

共享同样的 `omori.png` 源图片，显示效果不同但内容一致。

---

## 关键教训总结

### 1. 遇到「A 行 B 不行」——找中间层
kitty → nvim terminal 之间多了 libvterm，这是根因。

### 2. 先做最小验证，不要假设工具行
fastfetch 文档说支持 `type: "chafa"`，但实测不加载自定义图片。花 5 分钟验证比基于文档写一堆配置再调 bug 高效得多。

### 3. 转义序列要分类处理
不是所有 ESC 序列都是颜色码。光标控制、查询响应、模式设置——各管各的，删除时要精准。

### 4. 尺寸约束理解
`chafa -s WxH` 是**最大尺寸**，不是精确尺寸。图片会在保持宽高比的前提下尽量填充。窄图受宽度约束，矮图受高度约束。

### 5. 实际输出 > 配置推算
模块数 ≠ 输出行数。必须实际跑出来数。

### 6. 环境检测用专用变量
`$NVIM` 是 neovim 设置的，比 `$TERM` 可靠。同理：tmux 用 `$TMUX`，screen 用 `$STY`，vscode terminal 用 `$VSCODE_GIT_ASKPASS_NODE`。

---

## 文件结构

```
~/.config/fastfetch/
├── config.jsonc            # kitty 配置（kitty 协议）
├── config-nvim.jsonc       # nvim 终端配置（chafa 字符）
├── omori.png               # 原始图片
├── omori_chafa.txt         # chafa 预渲染缓存
├── update_chafa.sh         # 重新生成缓存的脚本
└── my_logo.txt             # 旧的 ASCII art（备用）

~/.zshrc                    # 含 fastfetch 自动切换 wrapper
```

---

## 日常使用

```bash
# 修改了图片或终端宽度后：
source ~/.zshrc                           # 重载配置
~/.config/fastfetch/update_chafa.sh 30    # 重新渲染（可选宽度参数）

# 在任何终端直接运行：
fastfetch
```
