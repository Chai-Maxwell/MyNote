# NixOS 文件路径理解 —— 以 Neovim 插件管理为例

> 写给准备切换到 NixOS 的用户，理解 Nix 的路径哲学和插件管理的权衡。

---

## 一、NixOS 文件系统的核心哲学

### 1.1 `/nix/store` —— 一切的根本

NixOS 的几乎所有软件都存放在 `/nix/store` 下，路径格式为：

```
/nix/store/<32位hash>-<名称>-<版本>
```

例如：

```
/nix/store/b6gvzjyb2pg0kjfwrjmg1vfhh54ad73z-firefox-133.1
/nix/store/3x5qk9m2p...-neovim-0.10.0
/nix/store/abc123...-vimplugin-nvim-treesitter-2024-01-01
```

**hash 的含义**：hash 由该软件包的所有输入计算得出（源码、依赖、编译选项、构建脚本等）。任何一个输入变化，hash 就不同 → 产生不同的存储路径。

### 1.2 不可变性（Immutability）

`/nix/store` 中的内容**一旦创建就不允许修改**：

- 构建完成后目录权限被设为只读
- 整个 `/nix/store` 通常以只读方式挂载
- **只有 Nix 守护进程**能写入 store，用户永远不能直接修改

这带来了：

| 特性 | 说明 |
|---|---|
| 原子升级 | 新版本安装到新路径，切换一个符号链接即完成 |
| 完美回滚 | 旧版本仍在 store 中，随时切回去 |
| 多版本共存 | 不同 hash = 不同目录，互不冲突 |
| 可复现构建 | 相同输入 → 相同 hash → 相同输出 |

### 1.3 关键系统路径速览

| 路径 | 说明 |
|---|---|
| `/nix/store` | 所有软件包的实际存放位置（只读） |
| `/run/current-system` | 指向**当前系统世代**(generation)的符号链接 |
| `/run/current-system/sw` | 当前系统的软件集合 |
| `/etc/nixos` | 系统级 Nix 配置文件（NixOS 特有） |
| `~/.config/home-manager` | home-manager 配置文件 |
| `/etc/profiles/per-user/<user>` | 用户级 profile，指向用户安装的软件 |
| `~/.nix-profile` | 指向当前用户 profile 的符号链接 |

**理解世代（generation）**：
```
/run/current-system → /nix/store/xxx-nixos-system-...-<generation>
```

每次 `nixos-rebuild switch` 或 `home-manager switch`，都会创建一个新的 generation，并通过符号链接切换。旧的 generation 保留在 store 中，可以随时 `nixos-rebuild switch --rollback`。

### 1.4 NixOS 不是 FHS 兼容的

传统 Linux 遵循 FHS（Filesystem Hierarchy Standard）：

```
/usr/bin/neovim      # 可执行文件
/usr/lib/...         # 共享库
/usr/share/...       # 数据文件
/etc/...             # 配置文件
```

NixOS **没有** `/usr/bin`、`/usr/lib` 等传统路径（只有 `/usr/bin/env` 等少数例外）。所有东西都在 `/nix/store` 中。

这意味着：**任何依赖传统路径的软件（如 mason.nvim 下载的 LSP server）在 NixOS 上将无法运行**。

---

## 二、Nix 方式安装 Neovim 插件

### 2.1 如何安装

在 `configuration.nix` 或 home-manager 中声明：

```nix
# home-manager 方式
programs.neovim = {
  enable = true;
  plugins = with pkgs.vimPlugins; [
    nvim-treesitter.withAllGrammars
    nvim-lspconfig
    telescope-nvim
    nvim-cmp
    cmp-nvim-lsp
  ];
  extraPackages = with pkgs; [
    lua-language-server
    nil  # nix LSP
  ];
};
```

### 2.2 插件被安装到哪里

```
/nix/store/<hash>-vimplugin-<name>-<version>/
```

一个典型的 vim 插件在 store 中的结构：

```
/nix/store/hash123-vimplugin-nvim-treesitter-2024-01-01/
├── lua/
│   └── nvim-treesitter/
├── plugin/
├── doc/
└── parser/         # treesitter 的 parser 文件
```

### 2.3 插件如何被 Neovim 加载

Nix 生成的 wrapper 脚本会设置 `packpath` 和 `runtimepath`：

```bash
# Nix 生成的 wrapper 类似：
nvim --cmd "set packpath^=/nix/store/hash456-vim-pack-dir" \
     --cmd "set rtp^=/nix/store/hash456-vim-pack-dir"
```

Nix 会创建一个 vim pack 结构：

```
/nix/store/hash456-vim-pack-dir/vim-pack-dir/
└── pack/
    └── myplugins/
        ├── opt/    # 可选加载的插件 (对应 :packadd)
        └── start/  # 启动时自动加载的插件
```

### 2.4 纯 Nix 方式的特点

**优点**：
- 完全声明式，可复现
- 插件版本由 nixpkgs revision 锁定
- 无运行时下载，无需网络
- 统一管理所有依赖（包括 LSP server、linter 等）

**缺点**：
- 插件全部在启动时加载（无内置 lazy-loading）
- 添加插件需要修改 nix 配置并 rebuild
- nixpkgs 中不一定有所有插件（小众插件需自行打包）
- 没有 lazy.nvim 的 lockfile 机制

---

## 三、Lazy.nvim 方式安装插件

### 3.1 如何工作

在 `~/.config/nvim/` 的 Lua 配置中：

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  { "nvim-telescope/telescope.nvim", event = "VeryLazy" },
  { "neovim/nvim-lspconfig" },
  { "hrsh7th/nvim-cmp", event = "InsertEnter" },
  -- ...
})
```

### 3.2 插件被安装到哪里

```
~/.local/share/nvim/lazy/
├── lazy.nvim/
├── telescope.nvim/
├── nvim-lspconfig/
├── nvim-cmp/
└── lazy-lock.json    # 版本锁定文件
```

- `vim.fn.stdpath("data")` 返回 `~/.local/share/nvim/`
- lazy.nvim 在这个目录下 clone 和管理所有插件
- `lazy-lock.json` 记录每个插件的 commit hash，用于版本锁定

### 3.3 Lazy.nvim 方式的特点

**优点**：
- 按需懒加载（lazy-loading），启动速度快
- 丰富的加载策略（event、cmd、keys、ft 等）
- 自动更新、lockfile 锁定版本
- 配置**可移植**：同一份配置在 macOS、Ubuntu、NixOS 都能用
- 生态丰富，几乎所有 neovim 插件都以 lazy.nvim 为首选管理器

**缺点**：
- 每次在新机器上要 `git clone` 下载，依赖网络
- 插件版本与 nixpkgs 无关（不受 nix 管理）
- LSP server 等外部依赖不在 nix 管理范围内（需额外处理）

---

## 四、核心对比：两种路径的本质差异

| 维度 | Nix 方式 | Lazy.nvim 方式 |
|---|---|---|
| **插件存放路径** | `/nix/store/<hash>-...` | `~/.local/share/nvim/lazy/` |
| **可写性** | 只读（不可变） | 可读写 |
| **管理方式** | Nix derivation 声明式管理 | lazy.nvim 运行时通过 git 管理 |
| **版本锁定** | 由 nixpkgs revision / flake.lock 锁定 | 由 `lazy-lock.json` 锁定 |
| **加载方式** | 全部在 packpath 中，启动时可用 | 按需懒加载 |
| **安装时机** | `nixos-rebuild` 或 `home-manager switch` 时 | Neovim 首次启动时 |
| **更新方式** | 更新 nixpkgs / flake input → rebuild | `:Lazy update` 或在 lazy 界面操作 |
| **可移植性** | 仅 NixOS / 有 Nix 的系统 | 任何安装了 Neovim 的系统 |

---

## 五、混合使用时的冲突与解决

### 5.1 核心冲突：两个管理器互相不知道对方的存在

当你既在 nix 配置中声明了插件，又在 lazy.nvim 中配置了同一个插件：

```
Nix 装了 nvim-treesitter → /nix/store/<hash>-vimplugin-nvim-treesitter/
Lazy 又装了 nvim-treesitter → ~/.local/share/nvim/lazy/nvim-treesitter/
```

结果：**两个版本同时存在，runtimepath 混乱。** 通常 lazy.nvim 的版本会"赢"，但 nix 的版本也占着空间。

### 5.2 具体问题清单

#### 问题 1：配置文件只读

Nix/home-manager 默认将 `~/.config/nvim/` 放在 `/nix/store` 中（只读）：

```bash
$ ls -la ~/.config/nvim
→ /nix/store/hash-xxx-nvim-config/  # 符号链接到只读位置
```

lazy.nvim 尝试写入 `lazy-lock.json` 时直接报错 **Read-only file system**。

**解决**：使用 `mkOutOfStoreSymlink` 将配置保持为可写位置：

```nix
xdg.configFile."nvim".source = config.lib.file.mkOutOfStoreSymlink
  "${config.home.homeDirectory}/dotfiles/nvim";
```

#### 问题 2：Treesitter parser 不可见

lazy.nvim 默认设置 `performance.reset_packpath = true`，这会清掉 nix 注入的 packpath，导致 nix 安装的 treesitter grammar 全部"消失"（`:checkhealth` 显示无 parser）。

**解决**：在 lazy.setup 中关闭此行为：

```lua
require("lazy").setup({
  -- your plugins
}, {
  performance = {
    reset_packpath = false,  -- 保留 nix 注入的 packpath
  },
})
```

代价：启动时间可能从 ~80ms 增加到 ~260ms（因为 Neovim 要扫描更多路径）。

#### 问题 3：mason.nvim 下载的二进制无法运行

mason 下载的 LSP server（如 `lua-language-server`）是为 FHS Linux 编译的，依赖 `/usr/lib` 等路径 === 在 NixOS 上无法运行。

**解决**：禁用 mason，改用 nix 管理 LSP 等外部工具：

```lua
-- 在 lazy.nvim 配置中
{
  "williamboman/mason.nvim",
  enabled = false,  -- 在 NixOS 上完全禁用
}
-- 或
{
  "williamboman/mason-lspconfig.nvim",
  opts = {
    ensure_installed = {}  -- 不通过 mason 安装任何东西
  }
}
```

```nix
# 在 home-manager 中
programs.neovim.extraPackages = with pkgs; [
  lua-language-server
  nil        # nix LSP
  nixd       # 另一个 nix LSP
  ripgrep    # telescope 依赖
  fd         # telescope 依赖
];
```

#### 问题 4：插件名称不匹配

lazy.nvim 默认用 GitHub 仓库名作为目录名（如 `neovim/nvim-lspconfig` → `nvim-lspconfig`），但 nix 的 vim plugin 目录名可能不同。不匹配时 lazy 会认为"这个插件我没见过"，然后重新 clone 一份。

---

## 六、实战策略选择

### 策略 A：Lazy.nvim 全权管理（推荐给懒人/跨平台用户）

```nix
# 只装 neovim 本体，插件全部交给 lazy.nvim
programs.neovim = {
  enable = true;
  extraPackages = with pkgs; [
    lua-language-server  # LSP 等外部工具仍由 nix 管
    ripgrep
    fd
  ];
};
# 用 mkOutOfStoreSymlink 保持 nvim 配置可写
xdg.configFile."nvim".source = config.lib.file.mkOutOfStoreSymlink
  "${config.home.homeDirectory}/dotfiles/nvim";
```

**适合**：你的 nvim 配置需要在多平台间迁移，不想被 nix 绑定。

### 策略 B：Nix 提供插件 + Lazy 只做加载（推荐给 Nix 原教旨主义者）

```nix
programs.neovim = {
  enable = true;
  plugins = with pkgs.vimPlugins; [
    lazy-nvim  # lazy.nvim 本身也由 nix 管理
  ];
  extraLuaConfig = with pkgs.vimPlugins; ''
    require("lazy").setup({
      spec = {
        {
          dir = "${nvim-cmp}",
          name = "nvim-cmp",
          event = "InsertEnter",
          dependencies = {
            { dir = "${cmp-nvim-lsp}", name = "cmp-nvim-lsp" },
          },
          config = function() ... end,
        },
        -- 每个插件都要手动指定 dir...
      },
      install = { missing = false },  -- 禁止 lazy 自己下载
    })
  '';
};
```

**适合**：你想最大化 nix 的声明式优势，但仍需要 lazy-loading。

### 策略 C：nixCats（推荐给追求优雅整合的用户）

[nixCats](https://github.com/BirdeeHub/nixCats-nvim) 是一个专门为这个场景设计的框架：

- Nix 管理 LSP server、tree-sitter、外部依赖（通过 categories 分类）
- lazy.nvim 管理插件（插件正常放在 `~/.local/share/nvim/lazy/`）
- 在 Lua 中通过 `require("nixCats")` 查询 nix 提供的路径

```nix
categoryDefinitions = { pkgs, ... }: {
  lspsAndRuntimeDeps = with pkgs; [ lua-language-server nil ];
  sharedLibraries = with pkgs; [ ];  # treesitter .so
};
```

```lua
-- 在 lazy 插件配置中
local nixCats = require("nixCats")
{
  "neovim/nvim-lspconfig",
  config = function()
    -- nixCats 提供 LSP 路径
    require("lspconfig").lua_ls.setup {
      cmd = { nixCats.pawsible({ cmd = "lua-language-server" }) },
    }
  end,
}
```

**适合**：你既想要 lazy.nvim 的完善体验，又想要 nix 管理所有外部依赖。

### 策略 D：放弃 lazy.nvim —— 纯 Nix 生态

| 工具 | 说明 |
|---|---|
| [NixVim](https://github.com/nix-community/nixvim) | 完全用 nix 语言配置 neovim，内置 lazy-loading |
| `lz.n` / `lze` | 专为 nix 设计的懒加载插件管理器 |
| home-manager 原生 | `programs.neovim.plugins` + neovim 的 `:packadd` 命令 |

**适合**：你愿意深度拥抱 nix 生态，配置只在 NixOS 上用。

---

## 七、重要注意事项总结

1. **不要混用** mason.nvim 和 nix 的 external packages —— mason 下载的二进制在 NixOS 上跑不起来。
2. **配置文件可写性**：如果 lazy.nvim 报 readonly error，用 `mkOutOfStoreSymlink`。
3. **Treesitter**：要么全用 nix 管（关闭 lazy 的 `reset_packpath`），要么全用 lazy 管（nix 不装 treesitter）。
4. **LSP / linter / formatter**：强烈建议用 nix 管理（`extraPackages`），这是 nix 最大的优势之一。
5. **跨平台**：如果你的 nvim 配置需要在非 NixOS 上使用，优先策略 A（lazy 为主）。
6. **只有 NixOS 用**：优先策略 C（nixCats）或策略 B（nix+lazy hybrid）。

---

## 八、参考资源

- [Nix Store 官方文档](https://nix.dev/manual/nix/2.22/store/store-path)
- [nixCats.nvim](https://github.com/BirdeeHub/nixCats-nvim)
- [NixVim](https://github.com/nix-community/nixvim)
- [Neovim with Nix and Lazy.nvim](https://breuer.dev/blog/nix-lazy-neovim)
- [tolerable-nvim-nix](https://github.com/wires-org/tolerable-nvim-nix)
- [LazyVim + NixOS Discussion](https://github.com/LazyVim/LazyVim/discussions/853)
- [NixOS Discourse: Treesitter + Lazy.nvim](https://discourse.nixos.org/t/bundling-all-treesitter-grammar-in-neovim-while-using-lazy-nvim/74375)
