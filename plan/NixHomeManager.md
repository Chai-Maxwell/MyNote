# Home Manager 管理用户配置与 Dotfiles —— 以 LazyVim 和 Kitty 为例

> Home Manager 是 Nix 生态中管理用户级配置（dotfiles、软件设置、服务）的工具。
> 本指南以 LazyVim 和 Kitty 两个具体案例，展示从入门到实战的完整流程。

---

## 一、为什么要用 Home Manager

### 1.1 传统的 dotfiles 管理方式

```
~/dotfiles/
├── nvim/          # 手工维护，符号链接到 ~/.config/nvim
├── kitty/
├── tmux/
├── zsh/
└── install.sh     # 一把梭脚本
```

**痛点**：

- 换了机器 → 手动 `stow` / 运行安装脚本
- 换了发行版 → 包名不同（`ripgrep` vs `rg`），脚本得改
- 配置依赖二进制工具 → "这个 LSP 装了吗？什么版本的？"
- 配置文件散落在不同的 `~/.config/xxx` 中，无法统一声明

### 1.2 Home Manager 的思路

**把用户环境当成一个"包"来构建**——就像 Nix 构建软件包一样。

```nix
# 你的整个用户环境是一个 derivation
{
  home.packages = [ ripgrep fd lazygit ];
  programs.kitty.enable = true;
  programs.kitty.settings.background_opacity = "0.8";
}
```

`home-manager switch` 之后，Kitty 安装好了，配置也到位了。这是 **声明式的**：你描述想要什么，工具负责做到。

---

## 二、核心概念：Home Manager 如何管理文件

### 2.1 三种配置方式（由"Nix 化"程度排序）

| 方式                           | Nix 化程度   | 何时用                                            |
| ------------------------------ | ------------ | ------------------------------------------------- |
| `programs.<app>.settings`      | 最高         | 该 app 有 Home Manager 模块（如 kitty, git, zsh） |
| `xdg.configFile` / `home.file` | 中等         | 直接管理配置文件（任意格式）                      |
| `mkOutOfStoreSymlink`          | 最低但最灵活 | 需要频繁修改、快速迭代的配置（如 nvim）           |

### 2.2 `programs.<name>` —— 用 Nix 语法写配置

```nix
programs.git = {
  enable = true;
  userName = "Alice";
  userEmail = "alice@example.com";
  extraConfig = {
    init.defaultBranch = "main";
    pull.rebase = true;
  };
 ;
```

Home Manager 自动将 Nix 属性翻译成 `~/.gitconfig`：

```ini
[user]
    name = Alice
    email = alice@example.com
[init]
    defaultBranch = main
[pull]
    rebase = true
```

**优点**：类型安全、自动生成、跨平台条件判断方便
**局限**：只有 Home Manager 提供了模块的软件才能这么用

### 2.3 `home.file` / `xdg.configFile` —— 直接放文件

```nix
# 单个文件
home.file.".config/foot/foot.ini".text = ''
  font=JetBrains Mono:size=12
  colors.alpha=0.8
'';

# 整个目录
xdg.configFile."nvim".source = ./nvim;

# 递归复制
home.file.".config/tmux" = {
  source = ./tmux;
  recursive = true;
};
```

Home Manager 将这些文件放入 `/nix/store` 并创建符号链接。

### 2.4 `mkOutOfStoreSymlink` —— 保持文件可写

这是 Home Manager 提供的 **非标准但极为实用** 的函数：

```nix
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
```

**效果**：

```
~/.config/nvim → /home/alice/dotfiles/nvim   # 直接指向你的工作目录
```

vs 默认行为：

```
~/.config/nvim → /nix/store/abc123-nvim-config/  # 只读的 store 路径
```

**为什么要用这个**：

- 调试 nvim 配置时不想每次 `home-manager switch`
- lazy.nvim 需要写 `lazy-lock.json`（store 路径只读）
- 快速迭代的配置（编辑器是最典型的例子）

---

## 三、实战例一：Kitty 终端 —— 纯声明式配置

Kitty 有完整的 Home Manager 模块，可以用 Nix 语法写全部配置。

### 3.1 最小配置

```nix
# home.nix 或 home-manager 模块
{ config, pkgs, lib, ... }:

{
  programs.kitty = {
    enable = true;

    # 字体
    font = {
      name = "JetBrains Mono";
      size = 14;
    };

    # 核心设置（对应 kitty.conf 的键值）
    settings = {
      background_opacity = "0.85";    # 注意：数值要加引号
      dynamic_background_opacity = true;
      confirm_os_window_close = 0;
      enable_audio_bell = false;
      mouse_hide_wait = "-1.0";
      scrollback_lines = 10000;
      cursor_shape = "beam";
      copy_on_select = "yes";
      window_padding_width = 10;
      tab_bar_edge = "bottom";
      tab_bar_style = "powerline";
    };

    # 键位映射
    keybindings = {
      "ctrl+shift+t" = "new_tab";
      "ctrl+shift+w" = "close_tab";
      "ctrl+shift+left" = "previous_tab";
      "ctrl+shift+right" = "next_tab";
      "ctrl+shift+c" = "copy_to_clipboard";
      "ctrl+shift+v" = "paste_from_clipboard";
    };
  };
}
```

### 3.2 完整配置（含主题色）

```nix
programs.kitty = {
  enable = true;

  font = {
    name = "JetBrains Mono";
    size = 14;
  };

  settings = {
    # 行为
    enable_audio_bell = false;
    confirm_os_window_close = 0;
    scrollback_lines = 2000;
    url_style = "single";
    copy_on_select = "yes";

    # 外观
    background_opacity = "0.85";
    dynamic_background_opacity = true;
    cursor_shape = "block";
    mouse_hide_wait = "3";
    window_padding_width = 10;

    # Tab 栏
    tab_bar_edge = "bottom";
    tab_bar_style = "powerline";
    active_tab_foreground = "#181926";
    active_tab_background = "#C6A0F6";
    inactive_tab_foreground = "#CAD3F5";
    inactive_tab_background = "#1E2030";
    tab_bar_background = "#181926";

    # Catppuccin Mocha 色板
    background = "#1E1E2E";
    foreground = "#CDD6F4";
    selection_background = "#585B70";
    selection_foreground = "#1E1E2E";
    url_color = "#89B4FA";
    cursor = "#F5E0DC";
    cursor_text_color = "#1E1E2E";
    active_border_color = "#B4BEFE";
    inactive_border_color = "#6C7086";
    bell_border_color = "#EED49F";

    color0  = "#45475A";  # Surface1
    color1  = "#F38BA8";  # Red
    color2  = "#A6E3A1";  # Green
    color3  = "#F9E2AF";  # Yellow
    color4  = "#89B4FA";  # Blue
    color5  = "#F5C2E7";  # Pink
    color6  = "#94E2D5";  # Teal
    color7  = "#BAC2DE";  # Subtext1
    color8  = "#585B70";  # Surface2
    color9  = "#F38BA8";  # Red
    color10 = "#A6E3A1";  # Green
    color11 = "#F9E2AF";  # Yellow
    color12 = "#89B4FA";  # Blue
    color13 = "#F5C2E7";  # Pink
    color14 = "#94E2D5";  # Teal
    color15 = "#A6ADC8";  # Subtext0
  };

  keybindings = {
    "ctrl+shift+t" = "new_tab";
    "ctrl+shift+w" = "close_tab";
    "ctrl+shift+left" = "previous_tab";
    "ctrl+shift+right" = "next_tab";
  };
};
```

### 3.3 有个设置不在 `settings` 里？用 `extraConfig`

```nix
programs.kitty.extraConfig = ''
  include ~/.config/kitty/themes/current-theme.conf
  include ./local-overrides.conf
'';
```

`extraConfig` 的内容会原样追加到 `kitty.conf` 末尾。

### 3.4 声明式 vs 传统方式的对比

```nix
# 声明式（Home Manager）
programs.kitty.settings.background_opacity = "0.85";
```

```conf
# 等价的传统写法（~/.config/kitty/kitty.conf）
background_opacity 0.85
```

**声明式的额外好处**：

```nix
# 可以写条件逻辑！
programs.kitty.settings.background_opacity =
  if config.gtk.theme.name == "dark" then "0.85" else "0.95";
```

---

## 四、实战例二：LazyVim —— 混合管理策略

### 4.1 为什么 LazyVim 不适合纯声明式

- 配置频繁变更（每天改 keymap、加插件）
- lazy.nvim 需要写 `lazy-lock.json`（锁定插件版本）
- 社区生态以 Lua 代码为主
- 如果每次改一行 Lua 都要 `home-manager switch`，开发体验会很差

**推荐策略**：Nix 管依赖（Neovim 本体、LSP、工具）+ LazyVim 管插件和配置。

### 4.2 方案：`mkOutOfStoreSymlink` + `extraPackages`

这是一个完整的、工程化的配置：

```nix
# home/nvim.nix —— 作为 home-manager 的一个模块
{ config, pkgs, lib, ... }:

{
  # ============================================
  # 1. Neovim 本体及相关依赖
  # ============================================
  programs.neovim = {
    enable = true;
    defaultEditor = true;

    # Nix 管理的二进制依赖（LSP、linter、formatter、搜索工具）
    extraPackages = with pkgs; [
      # 搜索工具
      ripgrep       # telescope 依赖
      fd            # telescope 依赖

      # LSP servers
      lua-language-server
      nil            # Nix LSP
      nixd           # 另一个 Nix LSP（功能更全）
      rust-analyzer
      pyright
      typescript-language-server

      # Formatter / Linter
      stylua         # Lua
      alejandra      # Nix
      prettierd      # JS/TS/CSS
      shfmt          # Shell
    ];
  };

  # ============================================
  # 2. LazyVim 配置目录 —— 保持可写
  # ============================================
  xdg.configFile."nvim".source =
    config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
  # 结果：
  # ~/.config/nvim → ~/dotfiles/nvim（可写！）
  # lazy.nvim 可以正常 clone 插件、写 lockfile

  # ============================================
  # 3. LazyVim 的插件数据目录（可选声明）
  # ============================================
  # 不声明也行，lazy.nvim 用 vim.fn.stdpath("data") 默认放
  # ~/.local/share/nvim/lazy/
};
```

LazyVim 配置目录结构（`~/dotfiles/nvim/`）：

```
~/dotfiles/nvim/
├── init.lua               # LazyVim 入口
├── lazy-lock.json         # 由 lazy.nvim 自动生成
├── lua/
│   ├── config/
│   │   ├── autocmds.lua
│   │   ├── keymaps.lua
│   │   ├── lazy.lua       # lazy.nvim 的配置
│   │   └── options.lua
│   └── plugins/
│       ├── colorscheme.lua
│       ├── lsp.lua
│       └── ...
└── after/
    └── ftplugin/
```

### 4.3 另一种方案：用 Nix 生成 init.lua

如果你想让 `init.lua` 也受 Nix 管理（比如注入条件化的配置），可以这样：

```nix
programs.neovim = {
  enable = true;
  extraPackages = with pkgs; [ ripgrep fd lua-language-server nil ];

  # 用 Nix 生成 LazyVim 的 bootstrap
  extraLuaConfig = ''
    -- 由 Home Manager 生成，包含 Nix 注入的路径
    vim.g.mapleader = " "
    vim.g.maplocalleader = "\\"

    -- lazy.nvim 的 bootstrap
    local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
    if not vim.loop.fs_stat(lazypath) then
      vim.fn.system({
        "git", "clone", "--filter=blob:none",
        "https://github.com/folke/lazy.nvim.git",
        lazypath,
      })
    end
    vim.opt.rtp:prepend(lazypath)

    require("lazy").setup({
      performance = {
        reset_packpath = false,  -- 保留 Nix 注入的 packpath
      },
      spec = {
        { import = "plugins" },
      },
    })
  '';
};

# 插件配置仍用 mkOutOfStoreSymlink
xdg.configFile."nvim/lua/plugins".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim/lua/plugins";
```

### 4.4 关键注意事项

**1. `reset_packpath = false`**

LazyVim 默认会重置 packpath，这会导致 Nix 安装的 treesitter parser 等插件不可见。如果你的 Nix 配置中有 `programs.neovim.plugins`，务必设置 `reset_packpath = false`。

**2. 不要用 mason.nvim**

在 NixOS 上，mason 下载的 LSP server 二进制是为 FHS Linux 编译的，**无法在 NixOS 上运行**。所有 LSP、linter、formatter 都应通过 Nix 管理：

```lua
-- ❌ 不推荐
{
  "williamboman/mason.nvim",
  -- 它下载的二进制在 NixOS 上大概率跑不起来
}

-- ✅ 正确替代
{
  "neovim/nvim-lspconfig",
  config = function()
    -- lua-language-server 已经由 Nix 安装，直接在 PATH 中
    require("lspconfig").lua_ls.setup({})
  end,
}
```

如果 LazyVim 默认启用了 mason，在你的插件中禁用它：

```lua
return {
  { "williamboman/mason.nvim", enabled = false },
  { "williamboman/mason-lspconfig.nvim", enabled = false },
}
```

**3. Treesitter parser 的处理**

两个选择：

- **Nix 管**：`programs.neovim.plugins = [ pkgs.vimPlugins.nvim-treesitter.withAllGrammars ]`
  - 需要 `reset_packpath = false`
  - 缺点：parser 全部加载，影响启动时间
- **LazyVim 管**：不装 Nix 的 treesitter，让 lazy.nvim 自行管理
  - 需要 Neovim 能访问 C 编译器（`gcc` 在 PATH 中）
  - 在 `extraPackages` 中加 `gcc`

推荐后者（对 LazyVim 用户体验更一致）。

---

## 五、项目结构 —— 一个完整的 Home Manager 配置

### 5.1 目录布局（推荐）

```
~/dotfiles/
├── flake.nix              # 入口：定义 inputs 和 outputs
├── flake.lock             # 锁定依赖版本
├── home/
│   ├── default.nix        # 用户级配置的汇总
│   ├── common.nix         # 跨平台通用配置
│   ├── linux.nix           # Linux 特有配置
│   ├── packages.nix       # home.packages 汇总
│   ├── cli/
│   │   ├── git.nix
│   │   ├── zsh.nix
│   │   ├── tmux.nix
│   │   └── kitty.nix      # Kitty 的声明式配置
│   ├── editors/
│   │   └── nvim.nix       # Neovim + LazyVim 的混合配置
│   └── desktops/
│       ├── hyprland.nix
│       └── waybar.nix
├── nvim/                   # LazyVim 的 Lua 配置（可写）
│   ├── init.lua
│   ├── lazy-lock.json
│   └── lua/
│       ├── config/
│       └── plugins/
└── scripts/                # 辅助脚本
    └── ...
```

### 5.2 flake.nix（入口文件）

```nix
{
  description = "My Home Manager configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      homeConfigurations."alice" = home-manager.lib.homeManagerConfiguration {
        inherit pkgs;
        modules = [
          ./home/common.nix
          ./home/linux.nix
          ./home/packages.nix
          ./home/cli/kitty.nix
          ./home/cli/git.nix
          ./home/cli/zsh.nix
          ./home/editors/nvim.nix
          # ... 更多模块
        ];
      };
    };
}
```

### 5.3 common.nix（跨平台通用）

```nix
{ config, pkgs, lib, ... }:

{
  home = {
    username = "alice";
    homeDirectory = "/home/alice";
    stateVersion = "24.11";
  };

  # 让 home-manager 管理自己的 activation
  programs.home-manager.enable = true;

  # 跨平台通用的环境变量
  home.sessionVariables = {
    EDITOR = "nvim";
    VISUAL = "nvim";
    TERMINAL = "kitty";
  };
}
```

### 5.4 packages.nix（用户级软件包）

```nix
{ config, pkgs, lib, ... }:

{
  home.packages = with pkgs; [
    # 开发工具
    ripgrep
    fd
    fzf
    jq
    delta       # git diff 美化

    # 日常工具
    bat
    eza         # 现代的 ls
    du-dust     # 磁盘使用查看
    bottom      # 系统监控

    # Nix 工具
    nixpkgs-fmt
  ];
}
```

### 5.5 模块化组织（以 git.nix 为例）

```nix
{ config, pkgs, lib, ... }:

{
  programs.git = {
    enable = true;
    userName = "Alice";
    userEmail = "alice@example.com";

    extraConfig = {
      init.defaultBranch = "main";
      pull.rebase = true;
      push.autoSetupRemote = true;
    };
  };
}
```

### 5.6 使用

```bash
# 在 ~/dotfiles 下
home-manager switch --flake .#alice

# 查看会有什么变化
home-manager build --flake .#alice
```

---

## 六、三种 dotfiles 管理模式对比

### 模式 1：纯声明式（修改需要 rebuild）

```nix
# 修改后需要 home-manager switch 才生效
xdg.configFile."kitty/kitty.conf".text = ''
  background_opacity 0.85
'';
```

**适用**：变化不频繁的配置，如 gitconfig、kitty、tmux、zsh。

### 模式 2：mkOutOfStoreSymlink（修改立即生效）

```nix
# 在 ~/dotfiles/nvim/init.lua 中改一行，直接生效
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
```

**适用**：频繁修改的配置，特别是编辑器（nvim、vscode）和仍在调试阶段的配置。

### 模式 3：混合（部分声明式 + 部分 symlink）

```nix
# Kitty 主题色很少改 → 声明式
programs.kitty.settings.background = "#1E1E2E";

# Nvim 插件天天改 → symlink
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
```

**这是推荐的实际使用方式。**

---

## 七、实用技巧与常见问题

### 7.1 快速判断一个程序有没有 Home Manager 模块

```bash
# 方法 1：搜索 options
man home-configuration.nix | grep programs

# 方法 2：在线查询
# https://mynixos.com 或 https://home-manager-options.extranix.com
# 搜索 "programs.kitty" 等

# 方法 3：在 nix repl 中探索
nix-repl> hm = import <home-manager> {}
nix-repl> hm.options.programs.kitty
```

### 7.2 配置文件去了哪里？

`home-manager switch` 后可以检查：

```bash
# 查看最终生成的 kitty.conf
cat ~/.config/kitty/kitty.conf

# 查看符号链接的目标
readlink ~/.config/kitty/kitty.conf
# → /nix/store/abc123-home-manager-files/.config/kitty/kitty.conf

# 查看最近一次 activation 的 generation
home-manager generations
```

### 7.3 回滚

```bash
# 回到上一个 generation
home-manager switch --rollback

# 查看所有 generation
home-manager generations

# 切到指定的 generation
home-manager switch --generation 42
```

### 7.4 跨平台条件配置

```nix
{ config, pkgs, lib, ... }:

{
  # 只在 Linux 上生效
  programs.kitty.enable = lib.mkIf pkgs.stdenv.isLinux true;

  # 区分 Linux 和 macOS
  programs.kitty.font.size =
    if pkgs.stdenv.isLinux then 14
    else if pkgs.stdenv.isDarwin then 16
    else 14;
}
```

### 7.5 调试：看最终生成的配置

```bash
# 用 home-manager 的 activation 脚本看变量
home-manager build --flake .#alice
# 输出在 result/ 中

# 查看生成的具体文件
cat result/home-path/.../kitty.conf
```

### 7.6 常见坑

**坑 1：数值类型不匹配**

```nix
# ❌ Nix 报错：expected string, got float
programs.kitty.settings.background_opacity = 0.85;

# ✅ 加引号
programs.kitty.settings.background_opacity = "0.85";
```

**坑 2：`mkOutOfStoreSymlink` 递归问题**

```nix
# ❌ 如果 ~/dotfiles/nvim 里面有指向 ~/.config/nvim 的符号链接，会形成环
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";

# ✅ 只 symlink 需要的子目录
xdg.configFile."nvim/lua".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim/lua";
```

**坑 3：Flakes 下 `mkOutOfStoreSymlink` 需要绝对路径**

```nix
# ❌ 在 flake 中，相对路径指向 store 中的文件，不能用于 mkOutOfStoreSymlink
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink ./nvim;

# ✅ 使用绝对路径
xdg.configFile."nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
```

**坑 4：`stateVersion` 不要随便改**

```nix
home.stateVersion = "24.11";  # 设为你最初安装 Home Manager 时的版本
```

`stateVersion` 控制某些模块的向后兼容行为。设置后不要随便提升，除非你仔细阅读了 release notes。

---

## 八、总结

| 场景               | 推荐方式                  | 为什么                              |
| ------------------ | ------------------------- | ----------------------------------- |
| **Kitty 终端配置** | `programs.kitty.settings` | 有完整模块，纯声明式，不改动频繁    |
| **LazyVim 配置**   | `mkOutOfStoreSymlink`     | 频繁修改，需要写 lockfile，体验更好 |
| **Git 配置**       | `programs.git`            | 有完整模块，很少改动                |
| **Zsh/Bash**       | `programs.zsh/bash`       | 有完整模块                          |
| **无模块的软件**   | `xdg.configFile`          | 直接管理配置文件                    |
| **二进制工具**     | `home.packages`           | 用户级安装                          |

### 关键心智模型

```
Home Manager = 声明式的用户环境构建器

它不是 stow 的替代品 —— 它是把你整个 $HOME 当成
一个 Nix derivation 来构建的工具。

当软件的 Home Manager 模块足够完善时（如 Kitty），
全部用声明式写。

当软件需要频繁手动调整时（如 LazyVim），
用 mkOutOfStoreSymlink 保持灵活性，
用 Nix 管理底层依赖（LSP、工具）。
```

---

## 参考资源

- [Home Manager 官方手册](https://nix-community.github.io/home-manager/)
- [Home Manager Options 搜索](https://home-manager-options.extranix.com)
- [mynixos.com — 用户友好的 NixOS/Home Manager 选项搜索](https://mynixos.com)
- [Gabriel Volpe — Home Manager: dotfiles management](https://gvolpe.com/blog/home-manager-dotfiles-management/)
- [NixOS Wiki — Kitty](https://wiki.nixos.org/wiki/Kitty)
- [LazyVim Nix Template](https://github.com/psychosis448/lazyvim-nix-template)
- [Neovim with Nix and Lazy.nvim](https://breuer.dev/blog/nix-lazy-neovim)
- [NixOS & Flakes Book](https://nixos-and-flakes.thiscute.world/)
- [Misterio77/nix-starter-configs — 入门模板](https://github.com/Misterio77/nix-starter-configs)
