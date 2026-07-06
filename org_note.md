# Neovim Orgmode 使用教程

## 1. 安装

插件文件已创建在 `~/.config/nvim/lua/plugins/orgmode.lua`，重启 Neovim 后 lazy.nvim 会自动安装。

首次启动会自动下载并编译 `org` treesitter parser（需要等待几秒）。

## 2. 基本概念

Orgmode 是 Emacs 中著名的纯文本组织系统，现在通过 `nvim-orgmode/orgmode` 移植到了 Neovim。核心概念：

| 概念 | 说明 |
|------|------|
| **Headline** | 以 `*` 开头的标题行，`*` 数量表示层级 |
| **TODO 状态** | `* TODO` 表示待办，`* DONE` 表示完成 |
| **Tag** | 用 `:tag1:tag2:` 给条目打标签 |
| **Priority** | `[#A]` `[#B]` `[#C]` 优先级标记 |
| **Checkbox** | `- [ ]` 未完成 / `- [X]` 已完成 |
| **Timestamp** | `<2026-07-05>` 时间戳 |

## 3. 文件管理

- 默认笔记目录：`~/org/`
- 默认笔记文件：`~/org/notes.org`
- Agenda 文件搜索路径：`~/org/**/*`

创建 `.org` 文件即可自动激活 orgmode。

所有快捷键前缀为 `<Leader>o`（即先按 `<Leader>` 再按 `o`），下文用 `<prefix>` 表示 `<Leader>o`。

## 4. 快捷键速查

### 4.1 全局快捷键

| 快捷键 | 功能 |
|--------|------|
| `<Leader>oa` | 打开 Agenda 视图 |
| `<Leader>oc` | 打开 Capture 面板（快速笔记） |

### 4.2 标题操作

| 快捷键 | 功能 |
|--------|------|
| `<Tab>` | 折叠/展开当前标题 |
| `<S-Tab>` | 全局折叠/展开 |
| `<Leader><CR>` | 插入新标题/列表项（上下文感知） |
| `<prefix>ih` | 当前标题块之后插入同级别标题 |
| `<prefix>iT` | 紧跟当前标题插入 TODO 标题 |
| `<prefix>it` | 当前标题块之后插入 TODO 标题 |
| `<s` | 提升标题层级 |
| `>s` | 降低标题层级 |
| `<<` | 提升标题层级（纯键盘） |
| `>>` | 降低标题层级（纯键盘） |
| `<prefix>K` | 上移当前子树 |
| `<prefix>J` | 下移当前子树 |

### 4.3 TODO 与标签

| 快捷键 | 功能 |
|--------|------|
| `cit` | 切换 TODO 状态 |
| `<prefix>id` | 设置 Deadline |
| `<prefix>is` | 设置 Schedule |
| `<prefix>i.` | 插入活动时间戳 |
| `<prefix>i!` | 插入非活动时间戳 |
| `<prefix>,` | 设置优先级 |
| `<prefix>t` | 设置标签 |

### 4.4 操作

| 快捷键 | 功能 |
|--------|------|
| `<C-Space>` | 切换复选框状态 |
| `<prefix>oo` | 打开链接 |
| `<prefix>'` | 编辑代码块 |
| `<prefix>$` | 归档当前子树 |
| `<prefix>A` | 切换 ARCHIVE 标签 |
| `<prefix>r` | 移动（refile）当前条目 |
| `<prefix>e` | 导出 |

### 4.5 Agenda 视图快捷键

| 快捷键 | 功能 |
|--------|------|
| `f` / `b` | 向前/向后翻页 |
| `.` | 跳到今天 |
| `<CR>` | 在当前窗口打开条目 |
| `<Tab>` | 在另一窗口打开条目 |
| `t` | 修改 TODO 状态 |
| `q` | 退出 Agenda |
| `vd` / `vw` / `vm` / `vy` | 切换到日/周/月/年视图 |

### 4.6 Capture 面板

| 快捷键 | 功能 |
|--------|------|
| `<C-c>` | 确认保存 |
| `<prefix>r` | 重定向到其他文件 |
| `<prefix>k` | 取消 |

## 5. 快速笔记（Capture）

按 `<Leader>oc` 打开 Capture 面板，然后选择模板：

- `t` — 插入 TODO 任务
- `n` — 插入普通笔记
- `m` — 插入会议记录

## 6. 示例文件

```org
#+TITLE: My Notes
#+AUTHOR: Your Name
#+STARTUP: overview

* TODO 学习 Neovim Orgmode
  SCHEDULED: <2026-07-05>
  :tag:neovim:orgmode:

  今天的目标是掌握 orgmode 的基本用法。

** DONE 安装插件
   CLOSED: [2026-07-05 Mon 10:00]

** TODO 练习快捷键 [#A]
   - [X] 创建标题
   - [X] 折叠展开
   - [ ] 设置 TODO 状态
   - [ ] 使用 Agenda 视图

* 会议记录 2026-07-05
  :tag:meeting:

  - 讨论了项目进展
  - 确定了下一步计划

* 代码笔记
  :tag:code:

  #+BEGIN_SRC lua
  print("hello from orgmode")
  #+END_SRC

  #+BEGIN_SRC python
  def greet(name):
      return f"Hello, {name}"
  #+END_SRC
```

## 7. 常用语法

### 7.1 文字样式

```org
*bold*          → 粗体
/italic/        → 斜体
_underline_     → 下划线
+strikethrough+ → 删除线
~code~          → 行内代码
=verbatim=      → 原样输出
```

### 7.2 列表

```org
- 无序列表
  1. 有序列表
  2. 第二项
- 混合使用
  - [ ] 复选框（未完成）
  - [X] 复选框（完成）
  - [-] 进行中
```

### 7.3 链接

```org
[[https://github.com/nvim-orgmode/orgmode][nvim-orgmode 项目]]
[[file:~/org/notes.org][查看笔记]]
```

### 7.4 表格

```org
| 姓名  | 分数 | 备注      |
|-------+------+-----------|
| 张三  |   95 | 优秀      |
| 李四  |   87 | 良好      |
| 总计  |      |           |
```

按 `<Tab>` 在表格内自动对齐和跳转，按 `<C-c>C-c>` 重新计算表格公式。

### 7.5 代码块

在代码块内按 `<C-c>'` 可以在独立 buffer 中编辑代码（支持 LSP 补全）。

## 8. 与 Markdown 对比

| 功能 | Orgmode | Markdown |
|------|---------|----------|
| 标题 | `*` `**` `***` | `#` `##` `###` |
| 粗体 | `*bold*` | `**bold**` |
| 斜体 | `/italic/` | `*italic*` |
| 待办 | `* TODO` | N/A |
| 优先级 | `[#A]` | N/A |
| 时间戳 | `<2026-07-05>` | N/A |
| Agenda | 内置 | N/A |
| 表格 | 原生强大 | 基础 |
| 折叠 | 原生支持 | 需插件 |

## 9. 导出

当前配置未额外安装导出后端。如需导出，可安装：

- **HTML**: 无需额外依赖，内置基础导出
- **PDF**: `brew install pandoc`，然后用 `pandoc file.org -o file.pdf`
- **Markdown**: `pandoc file.org -t markdown -o file.md`

## 10. 参考资源

- [nvim-orgmode GitHub](https://github.com/nvim-orgmode/orgmode)
- [Orgmode 官方文档](https://orgmode.org/manual/)
- [Orgmode 快速参考](https://orgmode.org/quickstart.html)
