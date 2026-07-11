# Neovim 配置：macOS → NixOS 迁移指南

> 目标：将 macOS 上的 LazyVim 配置 1:1 克隆到 NixOS，用 Nix 管理插件和 LSP，
> 脱离 lazy.nvim 的网络下载和 Mason，但保留所有 Lua 配置和 LazyVim 的默认行为。

---

## 一、策略总览

| 层面 | macOS 现状 | NixOS 目标 |
|------|-----------|-----------|
| 插件下载 | `lazy.nvim` 从 GitHub clone | `nixCats` 从 Nix store 提供路径 |
| 插件配置 | `lua/plugins/*.lua`（lazy.nvim spec 格式） | **保持不变** |
| 默认行为 | `LazyVim/LazyVim` 框架提供 keymaps、LSP 配置等 | `LazyVim/LazyVim` **作为插件保留**（只提供 config 模块） |
| LSP/Formatter/Linter | `mason.nvim` 下载预编译二进制 | Nix packages，加入 `PATH` |
| Tree-sitter | `nvim-treesitter` 自动下载 parser | `pkgs.vimPlugins.nvim-treesitter.withAllGrammars` |
| macOS 专属代码 | `open`、`osascript`、brew 路径 | `xdg-open`、`gio trash`、Nix 路径 |

**核心思路：nixCats 只负责"把插件放到哪里"，lazy.nvim 继续负责任何时加载、怎样配置。**

---

## 二、目录结构

在 NixOS 上创建以下目录（建议路径：`~/stuff/nvim-nix/`）：

```
nvim-nix/
├── flake.nix                  # nixCats flake（唯一新增的 Nix 文件）
├── init.lua                   # 入口（替代原 lazy.lua 的 bootstrap）
├── lua/
│   ├── config/
│   │   ├── options.lua        # 直接复制，无需修改
│   │   ├── keymaps.lua        # 直接复制
│   │   ├── autocmds.lua       # 复制 + macOS→Linux 适配（见第四节）
│   │   └── neovide.lua        # 直接复制（Linux 下也有 Neovide）
│   └── plugins/
│       ├── colorscheme.lua    # 直接复制
│       ├── lualine.lua        # 直接复制
│       ├── alpha-life.lua     # 直接复制（需要 mini.icons 在依赖中）
│       ├── alpha.lua          # 直接复制
│       ├── telescope.lua      # 直接复制
│       ├── neo-tree.lua       # 复制 + macOS→Linux 适配（见第四节）
│       ├── git.lua            # 直接复制
│       ├── orgmode.lua        # 直接复制
│       ├── markdown-preview.lua # 复制 + build 步骤 Nix 化（见第五节）
│       ├── markdown-format.lua  # 直接复制
│       ├── d2.lua             # 复制 + tree-sitter parser Nix 化（见第五节）
│       ├── latex.lua          # 复制 + 路径适配（见第四节）
│       ├── which-key.lua      # 直接复制
│       ├── bufferline.lua     # 直接复制
│       ├── edgy.lua           # 直接复制
│       └── mini-icons.lua     # 直接复制
└── after/
    └── ftplugin/
        └── org.lua            # 直接复制
```

额外的辅助文件（可选，带过去保持完整）：
- `.neoconf.json`
- `stylua.toml`
- `markdown.css`

---

## 三、flake.nix（完整配置）

这是迁移的核心文件。以下是完整内容及注释：

```nix
{
  description = "Neovim config with nixCats — migrated from macOS LazyVim";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixCats.url = "github:BirdeeHub/nixCats-nvim";
  };

  outputs = { self, nixpkgs, nixCats, ... } @ inputs: let
    inherit (nixCats) utils;
    luaPath = "${./.}";
    forEachSystem = utils.eachSystem nixpkgs.lib.platforms.all;
  in {

    # ===================================================================
    # 1. 可复用的 category 定义（供多个 package 共享）
    # ===================================================================
    overlays.default = (
      final: prev: let
        inherit (prev) vimPlugins;
      in {

        # ── 1a. 所有 Neovim 插件 ──────────────────────────────────────
        nixCats_nvim_plugins = with vimPlugins; [
          # === LazyVim 核心配置框架（不负责下载，只提供默认 keymaps/配置） ===
          LazyVim

          # === 插件管理器 ===
          lazy-nvim         # lazy.nvim（仍然用于 lazy-load 和 spec 格式）

          # === 补全 ===
          blink-cmp
          friendly-snippets

          # === LSP / Lint / Format ===
          nvim-lspconfig
          mason-nvim               # 保留 UI（可手动查看），但 mason-lspconfig 禁用
          mason-lspconfig-nvim     # 在 config 中条件禁用
          conform-nvim
          nvim-lint
          lazydev-nvim

          # === Tree-sitter ===
          (nvim-treesitter.withAllGrammars)
          nvim-treesitter-context
          nvim-treesitter-textobjects
          nvim-ts-autotag

          # === Telescope ===
          telescope-nvim
          telescope-fzf-native-nvim
          telescope-project-nvim
          plenary-nvim             # telescope 依赖

          # === UI / 主题 ===
          tokyonight-nvim
          catppuccin-nvim          # 备用主题
          nvim-web-devicons
          mini-icons
          mini-nvim                # mini.ai / mini.animate / mini.indentscope /
                                   # mini.hipatterns / mini.pairs / mini.starter

          # === 状态栏 / Winbar / Tabline ===
          lualine-nvim
          bufferline-nvim          # 被禁用（enabled = false）
          dressing-nvim
          noice-nvim
          nui-nvim                 # noice 依赖

          # === 文件树 ===
          neo-tree-nvim

          # === Git ===
          gitsigns-nvim
          neogit
          diffview-nvim
          vim-fugitive

          # === 启动页 ===
          alpha-nvim               # goolord/alpha-nvim（在 config 中重命名为 minimal-alpha）
          dashboard-nvim

          # === 编辑器增强 ===
          which-key-nvim
          flash-nvim
          vim-illuminate
          todo-comments-nvim
          ts-comments-nvim
          mini-nvim                # mini.ai, mini.indentscope 等
          smear-cursor-nvim
          persistence-nvim
          indent-blankline-nvim

          # === 窗口布局 ===
          edgy-nvim

          # === 终端 ===
          toggleterm-nvim

          # === Orgmode ===
          orgmode

          # === Markdown ===
          render-markdown-nvim
          markdown-preview-nvim

          # === LaTeX ===
          vimtex

          # === D2 ===
          d2-vim

          # === C/C++ ===
          clangd_extensions-nvim
          cmake-tools-nvim

          # === GitHub ===
          gh-nvim

          # === Python ===
          venv-selector-nvim

          # === AI ===
          claudecode-nvim

          # === 搜索替换 ===
          grug-far-nvim

          # === Snacks（工具集） ===
          snacks-nvim

          # === Trouble（诊断列表） ===
          trouble-nvim

          # === litee.nvim ===
          litee-nvim               # LSP 调用层次等
        ];

        # ── 1b. LSP / Formatter / Linter 二进制（替代 Mason） ─────────
        nixCats_lsp_tools = with prev; [
          # C/C++
          clang-tools              # clangd + clang-format
          cmake-language-server

          # Lua
          lua-language-server
          stylua

          # Python
          pyright
          ruff

          # Nix
          nil                      # Nix LSP
          nixfmt-classic
          statix

          # Markdown
          marksman
          markdownlint-cli2
          markdown-toc

          # LaTeX
          texlab

          # Bash / Shell
          bash-language-server
          shellcheck
          shfmt

          # JS/TS (Volar-based)
          nodePackages.vtsls

          # Web
          nodePackages.prettier

          # Tree-sitter CLI
          tree-sitter

          # 通用工具
          ripgrep                  # telescope live_grep 依赖
          fd                       # telescope find_files 依赖
          gcc                      # tree-sitter 编译 parser 用
        ];

        # ── 1c. 额外运行时依赖 ─────────────────────────────────────────
        nixCats_extra_deps = with prev; [
          xdg-utils               # xdg-open（替代 macOS open）
          glib                    # gio trash（替代 osascript 废纸篓）
        ];

        # ── 1d. Neovim 本身（含所有依赖的 wrapper） ────────────────────
        nixCats_nvim = prev.neovim-unwrapped;
      }
    );

    # ===================================================================
    # 2. 构建输出
    # ===================================================================
    packages = forEachSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ self.overlays.default ];
      };
    in {
      nvim = utils.baseBuilder {
        inherit pkgs system;
        src = luaPath;
        configDirName = "nvim";

        # ── 插件的 Nix 存储路径映射 ─────────────────────────────────
        # nixCats 会将每个 category 中的包路径注入到 Lua 侧的
        # require("nixCats").config.categories 中。
        # lazy.nvim 通过 dev.path 指向这些路径，实现零网络加载。
        categories = {
          plugins = pkgs.nixCats_nvim_plugins;
          lspTools = pkgs.nixCats_lsp_tools;
          extraDeps = pkgs.nixCats_extra_deps;
        };

        # ── 将 lspTools 和 extraDeps 加入最终 Neovim 的 PATH ────────
        extraBuildCommands = ''
          wrapProgram $out/bin/nvim \
            --prefix PATH : ${pkgs.lib.makeBinPath pkgs.nixCats_lsp_tools} \
            --prefix PATH : ${pkgs.lib.makeBinPath pkgs.nixCats_extra_deps}
        '';

        packageNames = {
          plugins = true;   # → require("nixCats").config.categories.plugins
          lspTools = true;  # → require("nixCats").config.categories.lspTools
          extraDeps = true; # → require("nixCats").config.categories.extraDeps
        };

        vi = "vi";
        vimAlias = true;
      };

      default = self.packages.${system}.nvim;
    });

    # ===================================================================
    # 3. devShell（开发/调试用）
    # ===================================================================
    devShells = forEachSystem (system: {
      default = pkgs.mkShell {
        name = "nvim-dev";
        buildInputs = with pkgs; [
          nixCats_nvim
        ] ++ nixCats_lsp_tools ++ nixCats_extra_deps;
      };
    });
  };
}
```

### 关键说明

1. **`LazyVim` 包**：在 nixpkgs 中版本很旧（2023-06-29），但 nixCats 会把它当作普通插件放入 Nix store，`lazy.nvim` 的 `dev` 模式会直接使用本地路径，不检查版本更新。

2. **`mason-nvim` / `mason-lspconfig-nvim`**：插件本身仍加载（因为 `lazy-lock.json` 中有），但在配置中禁用其功能（见第五节第 5 点）。

3. **`nvim-treesitter.withAllGrammars`**：这个函数会编译所有 tree-sitter parser，避免运行时下载。缺点是构建较慢，第一次约 5-10 分钟。

4. **`extraBuildCommands`** 中的 `wrapProgram`：确保所有 LSP/linter/formatter 都在 Neovim 的 `PATH` 中，`nvim-lspconfig` 和 `conform.nvim` 可以直接找到它们。

---

## 四、init.lua（替代原 lazy.lua）

这是 nixCats 配置的 Lua 入口。相比原来的 `lazy.lua`（只负责 clone lazy.nvim + 启动 LazyVim），新版本需要：

1. 接收 nixCats 注入的路径
2. 配置 lazy.nvim 的 `dev.path` 指向 Nix store
3. 启动 LazyVim

```lua
-- ~/stuff/nvim-nix/init.lua
-- nixCats 入口：桥接 Nix 提供的插件路径 → lazy.nvim

-- ============================================================
-- 1. 加载 nixCats（由 Nix flake 自动注入到 package.path）
-- ============================================================
local nixCats_ok, nixCats = pcall(require, "nixCats")
if not nixCats_ok then
  -- 回退：不在 Nix 环境时（如 macOS 上直接编辑），fallback 到原启动逻辑
  vim.opt.rtp:prepend(vim.fn.stdpath("data") .. "/lazy/lazy.nvim")
  require("lazy").setup({
    spec = {
      { "LazyVim/LazyVim", import = "lazyvim.plugins" },
      { import = "plugins" },
    },
    defaults = { lazy = false, version = false },
    install = { colorscheme = { "tokyonight", "habamax" } },
    checker = { enabled = true, notify = false },
    performance = {
      rtp = {
        disabled_plugins = {
          "gzip", "tarPlugin", "tohtml", "tutor", "zipPlugin",
        },
      },
    },
  })
  return
end

-- ============================================================
-- 2. 从 Nix store 获取插件路径，构建 lazy.nvim 的 dev.path
-- ============================================================
local plugin_paths = {}
if nixCats.config.categories and nixCats.config.categories.plugins then
  for _, p in ipairs(nixCats.config.categories.plugins) do
    -- nixCats 注入的每个插件路径形如：
    --   /nix/store/xxx-vimplugin-yyy/share/vim-plugins/plugin-name
    -- lazy.nvim 的 dev.path 会在此目录下查找匹配的插件名
    if p.path then
      plugin_paths[#plugin_paths + 1] = p.path
    end
  end
end

-- 如果有 Nix store 插件目录，追加到 rtp（lazy.nvim 会在 dev 路径中查找）
if #plugin_paths > 0 then
  for _, p in ipairs(plugin_paths) do
    vim.opt.rtp:append(p)
  end
end

-- ============================================================
-- 3. 配置 lazy.nvim，让它从 Nix store 加载插件
-- ============================================================
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
-- 在 Nix 环境中，lazy.nvim 已由 Nix 提供在 rtp 中，但 lazy 本身的 bootstrap
-- 仍需要 lazy.nvim 的 lua 模块在 rtp 上可用。
-- nixCats 已将 lazy-nvim 加入 plugins category，所以它在 rtp 中。

require("lazy").setup({
  spec = {
    -- LazyVim 仍作为配置框架导入（提供默认 keymaps、LSP 自动配置等）
    { "LazyVim/LazyVim", import = "lazyvim.plugins" },
    -- 用户自定义插件配置
    { import = "plugins" },
  },
  defaults = {
    lazy = false,
    version = false,
  },
  install = {
    colorscheme = { "tokyonight", "habamax" },
    -- 关键：安装目录设为 nil，阻止 lazy.nvim 从 GitHub clone
    -- 所有插件已在 Nix store 中
    missing = false, -- 不自动安装缺失的插件
  },
  checker = {
    enabled = false, -- 在 Nix 环境中禁用自动更新检查
  },
  dev = {
    -- 让 lazy.nvim 在 Nix store 路径中查找插件（而非从 git clone）
    path = vim.fn.stdpath("data") .. "/site/pack",
    patterns = {}, -- 空 = 所有插件都用 dev 路径
    fallback = false, -- 不在 Nix store 中时也不回退到 git clone
  },
  performance = {
    rtp = {
      disabled_plugins = {
        "gzip", "tarPlugin", "tohtml", "tutor", "zipPlugin",
      },
    },
  },
})
```

---

## 五、macOS → Linux/NixOS 适配

以下是每个需要修改的 Lua 文件的具体改动（用 `vim.fn.has()` 做条件分支，保证同一份配置在 macOS 和 NixOS 上都可用）。

### 5.1 `lua/config/autocmds.lua`

需要改两处：

**(a) `OpenInFolder` 命令（行 128）**

```lua
-- 原代码：
-- vim.fn.jobstart({ "open", vim.fn.getcwd() }, { detach = true })

-- 改为：
vim.api.nvim_create_user_command("OpenInFolder", function()
  local cwd = vim.fn.getcwd()
  if vim.fn.has("mac") == 1 then
    vim.fn.jobstart({ "open", cwd }, { detach = true })
  else
    -- Linux: xdg-open 打开文件管理器
    vim.fn.jobstart({ "xdg-open", cwd }, { detach = true })
  end
end, {})
```

**(b) 图片文件预览跳转（行 133-145）**

```lua
-- 原代码：
-- vim.fn.jobstart({ "open", file }, { detach = true })

-- 改为：
vim.api.nvim_create_autocmd("BufEnter", {
  pattern = "*.{png,jpg,jpeg,gif,bmp,webp,tiff,svg,heic,ico}",
  callback = function()
    local file = vim.fn.expand("%:p")
    if file == "" then return end
    if vim.fn.has("mac") == 1 then
      vim.fn.jobstart({ "open", file }, { detach = true })
    else
      vim.fn.jobstart({ "xdg-open", file }, { detach = true })
    end
    vim.cmd("bdelete")
  end,
})
```

### 5.2 `lua/plugins/neo-tree.lua`

需要改三处：

**(a) 垃圾桶删除（行 46）**

```lua
-- 原代码（macOS osascript）：
-- local trash_cmd = { "osascript", "-e",
--   string.format('tell app "Finder" to delete POSIX file %q', path) }

-- 改为：
delete = function(state)
  local inputs = require("neo-tree.ui.inputs")
  local node = state.tree:get_node()
  if node:get_depth() == 1 then return end
  local path = node.path
  local msg = "Move " .. node.name .. " to trash?"
  inputs.confirm(msg, function(confirmed)
    if not confirmed then return end
    local trash_cmd
    if vim.fn.has("mac") == 1 then
      trash_cmd = { "osascript", "-e",
        string.format('tell app "Finder" to delete POSIX file %q', path) }
    elseif vim.fn.executable("gio") == 1 then
      trash_cmd = { "gio", "trash", path }
    elseif vim.fn.executable("trash") == 1 then
      trash_cmd = { "trash", path }
    else
      trash_cmd = { "rm", "-rf", path } -- fallback（危险，备用）
    end
    vim.fn.jobstart(trash_cmd, {
      detach = true,
      on_exit = function()
        require("neo-tree.sources.manager").refresh(state.name)
      end,
    })
  end)
end,
```

**(b) PDF 外部打开（行 79-85）**

```lua
-- 原代码：
-- vim.fn.jobstart({ "open", filepath }, { detach = true })

-- 改为：
handler = function(args)
  local filepath = args.path
  if filepath and filepath:match("%.pdf$") then
    if vim.fn.has("mac") == 1 then
      vim.fn.jobstart({ "open", filepath }, { detach = true })
    else
      vim.fn.jobstart({ "xdg-open", filepath }, { detach = true })
    end
    return { handled = true }
  end
end,
```

**(c) `OpenInFinder` 命令（行 91-101）**

```lua
-- 原代码：
-- vim.fn.jobstart({ "open", path }, { detach = true })

-- 改为：
vim.api.nvim_create_user_command("OpenInFinder", function()
  local path = vim.fn.getcwd()
  local ok, manager = pcall(require, "neo-tree.sources.manager")
  if ok then
    local state = manager.get_state("filesystem")
    if state and state.path then path = state.path end
  end
  if vim.fn.has("mac") == 1 then
    vim.fn.jobstart({ "open", path }, { detach = true })
  else
    vim.fn.jobstart({ "xdg-open", path }, { detach = true })
  end
end, { desc = "在文件管理器中打开当前目录" })
```

### 5.3 `lua/plugins/latex.lua`

```lua
-- 原代码（行 35）：
-- command = "/opt/homebrew/bin/latexindent",

-- 改为：
formatters = {
  latexindent = {
    -- NixOS: latexindent 在 PATH 中（由 extraBuildCommands 保证）
    -- 不再硬编码路径，conform.nvim 会自动查找
    -- macOS 保留原逻辑：
    command = vim.fn.has("mac") == 1
      and "/opt/homebrew/bin/latexindent"
      or "latexindent",
  },
},
```

### 5.4 `lua/config/neovide.lua`

Neovide 在 Linux 上也支持，主要差异是字体配置文件的路径：

- macOS: `~/.config/neovide/config.toml`
- Linux: 同上（XDG_CONFIG_HOME 标准），`~/.config/neovide/config.toml`

但字体名称不同（macOS 用 SF Mono 等，Linux 用 Noto Sans Mono 等），这部分不需要在 nvim 配置中处理，只需在 NixOS 上单独配置 `~/.config/neovide/config.toml`。

> **注意**：NixOS 上安装 Neovide 不是通过这个 nvim flake，而是通过 NixOS 的 `environment.systemPackages` 或 Home Manager。Neovide 启动后会自动加载 `~/.config/nvim/init.lua`。

---

## 六、特殊构建步骤的 Nix 化

### 6.1 markdown-preview.nvim

**现状**：`lua/plugins/markdown-preview.lua` 中的 `build` 函数会在插件首次加载时执行 `npm install` + `next build`。在 NixOS 的沙盒构建环境中，网络访问被禁止，`npm install` 会失败。

**方案**：将 build 逻辑从运行时移到 `flake.nix` 的构建阶段，或使用纯 Nix overlay：

在 `flake.nix` 中添加 overlay：

```nix
# 在 overlays.default 中追加：
nixCats_nvim_plugins = with vimPlugins; [
  # ... 其他插件 ...

  # markdown-preview.nvim：使用 nixpkgs 中的预构建版本
  # nixpkgs 中的 markdown-preview-nvim 已包含编译好的 app/
  # 如果 nixpkgs 中的版本也缺少构建产物，则需要 overlay：
  (markdown-preview-nvim.overrideAttrs (old: {
    buildPhase = ''
      cd app
      # 在 Nix 构建时完成 npm install + next build
      export HOME=$TMPDIR
      npm install --production --legacy-peer-deps
      npm install markdown-it-mark --no-save --legacy-peer-deps
      # 注入 markdown-it-mark 补丁到 index.jsx
      sed -i '/markdown-it-deflist/a import markdownItMark from '\''markdown-it-mark'\''' pages/index.jsx
      sed -i '/\.use(markdownDeflist)/a \        .use(markdownItMark)' pages/index.jsx
      npx next build
      npx next export
      cd ..
    '';
  }))
];
```

**注意**：nixpkgs 中的 `markdown-preview-nvim` 可能已经包含预构建的 `app/` 目录。可以先尝试直接用 `pkgs.vimPlugins.markdown-preview-nvim`，如果运行时发现缺少 `app/out/`，再添加上述 overlay。

**Lua 侧修改**：`lua/plugins/markdown-preview.lua` 中删除整个 `build` 函数（或将其包裹在条件中，仅在非 Nix 环境执行）：

```lua
return {
  {
    "iamcco/markdown-preview.nvim",
    ft = { "markdown" },
    -- Nix 环境：build 在 Nix 构建阶段完成，此处跳过
    build = function()
      local nixCats_ok, _ = pcall(require, "nixCats")
      if nixCats_ok then return end  -- Nix 环境跳过
      -- 原始 build 逻辑保持（macOS 非 Nix 环境使用）
      vim.fn["mkdp#util#install"]()
      -- ... 原始 markdown-it-mark 补丁 ...
    end,
    config = function()
      -- ... 原始 config 保持不变（CSS、字体链接等） ...
    end,
  },
}
```

### 6.2 tree-sitter-d2

**现状**：`lua/plugins/d2.lua` 中 `build` 函数用 `cc -shared -fPIC` 编译 `parser.c` → `d2.so`，并复制到 `site/parser/`。

**方案**：使用 `pkgs.vimPlugins.nvim-treesitter.withAllGrammars` 时，Nix 已经编译了所有内置的 tree-sitter parser。但 D2 parser (`tree-sitter-d2`) 不一定在 nixpkgs 的 vimPlugins 列表中。

两个选择：
1. **如果可以找到 `pkgs.vimPlugins.tree-sitter-d2`**：直接加入 plugins 列表
2. **否则用 overlay 自行编译**：

```nix
# 在 flake.nix overlays 中：
nixCats_nvim_plugins = with vimPlugins; [
  # ... 其他插件 ...

  # tree-sitter-d2 解析器（自定义编译）
  (prev.vimUtils.buildVimPluginFrom2Nix {
    pname = "tree-sitter-d2";
    version = "2025-01-01";
    src = prev.fetchFromGitHub {
      owner = "ravsii";
      repo = "tree-sitter-d2";
      rev = "main";
      sha256 = "0000000000000000000000000000000000000000000000000000"; # 首次构建后替换
    };
    buildPhase = ''
      mkdir -p $out/parser
      cc -shared -fPIC -o $out/parser/d2.so \
        -I$src/src $src/src/parser.c
      # 修复 queries 目录结构
      mkdir -p $out/queries/d2
      for f in highlights.scm folds.scm injections.scm locals.scm; do
        if [ -f $src/queries/$f ]; then
          cp $src/queries/$f $out/queries/d2/$f
        fi
      done
    '';
  })
];
```

**Lua 侧修改**：`lua/plugins/d2.lua` 中删除 `build` 函数（Nix 环境跳过），保留 `config` 中的 treesitter 注册和 `:D2Png` 命令：

```lua
return {
  { "terrastruct/d2-vim", ft = "d2" },
  {
    "ravsii/tree-sitter-d2",
    ft = "d2",
    -- Nix 环境：parser 编译在 Nix 阶段完成，跳过 build
    build = function()
      local nixCats_ok, _ = pcall(require, "nixCats")
      if nixCats_ok then return end
      -- 原始 build 逻辑 ...
    end,
    config = function()
      -- ... 原始 config 保持不变 ...
    end,
  },
}
```

### 6.3 telescope-fzf-native

nixpkgs 中已有 `pkgs.vimPlugins.telescope-fzf-native-nvim`，直接加入 plugins 列表即可，不需要 build 函数。

---

## 七、禁用 Mason + 使用 Nix LSP 的配置

### 7.1 禁用 mason-lspconfig 的自动安装

在 `lua/config/` 目录下新增 `mason-disable.lua`（或合并到 options.lua 中）：

```lua
-- lua/config/mason-disable.lua
-- 在 Nix 环境中禁用 Mason 的所有下载功能，
-- LSP 全部由 Nix 包提供（已在 PATH 中）

local nixCats_ok, _ = pcall(require, "nixCats")
if not nixCats_ok then return end

-- 覆盖 mason-lspconfig：不自动安装 LSP
-- mason-lspconfig 的 ensure_installed 由 LazyVim extras 设置，
-- 需要在这里全部清空
return {
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = {},  -- 清空，不安装任何 LSP
      automatic_installation = false,
    },
  },
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {},  -- 清空，不安装任何工具
      PATH = "append",         -- Nix 提供的优先
      ui = {
        border = "rounded",
      },
    },
  },
}
```

### 7.2 确保 nvim-lspconfig 能找到 Nix 提供的 LSP

`nvim-lspconfig` 会自动在 `PATH` 中查找 LSP 可执行文件。只要 `extraBuildCommands` 中的 `wrapProgram` 正确设置了 PATH，就不需要额外配置。

但需要确认 LazyVim 的 `lang.*` extras 中的 `mason = true` 默认值被覆盖：

```lua
-- 在 lua/config/ 中新增 lsp-nix.lua
return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      -- 对每个 LSP 显式禁用 mason
      servers = {
        lua_ls = { mason = false },
        clangd = { mason = false },
        pyright = { mason = false },
        texlab = { mason = false },
        nil_ls = { mason = false },
        marksman = { mason = false },
        bashls = { mason = false },
        cmake = { mason = false },
        vtsls = { mason = false },
      },
    },
  },
}
```

### 7.3 conform.nvim / nvim-lint 配置

`conform.nvim` 和 `nvim-lint` 使用系统 PATH 查找 formatter/linter，不需要额外配置。但 `latex.lua` 中的 `latexindent` 路径适配（见 5.3）需要生效。

---

## 八、LazyVim extras 的展开对照表

LazyVim 的每个 extra 不仅添加插件，还配置它们。以下是每个 extra 的完整插件列表（从 LazyVim 源码确认），确保 flake.nix 中没有遗漏。

| Extra | 包含的插件 |
|-------|-----------|
| `ai.claudecode` | `claudecode-nvim` |
| `editor.illuminate` | `vim-illuminate` |
| `editor.neo-tree` | `neo-tree-nvim` |
| `editor.telescope` | `telescope-nvim`, `telescope-fzf-native-nvim`, `plenary-nvim` |
| `formatting.prettier` | `conform-nvim`（配置 prettier formatter） |
| `lang.clangd` | `nvim-lspconfig`（配置 clangd） |
| `lang.cmake` | `cmake-tools-nvim`, `nvim-lspconfig`（配置 neocmake） |
| `lang.git` | `gitsigns-nvim` |
| `lang.markdown` | `render-markdown-nvim`, `markdownlint-cli2`, `markdown-toc`（通过 Mason） |
| `lang.nix` | `nvim-lspconfig`（配置 nil_ls） |
| `lang.python` | `nvim-lspconfig`（配置 pyright） |
| `lang.tex` | `vimtex`, `nvim-lspconfig`（配置 texlab） |
| `ui.alpha` | `alpha-nvim` |
| `ui.dashboard-nvim` | `dashboard-nvim` |
| `ui.edgy` | `edgy-nvim` |
| `ui.indent-blankline` | `indent-blankline-nvim` |
| `ui.mini-animate` | `mini-nvim`（`mini.animate` 子模块） |
| `ui.mini-indentscope` | `mini-nvim`（`mini.indentscope` 子模块） |
| `ui.mini-starter` | `mini-nvim`（`mini.starter` 子模块） |
| `ui.smear-cursor` | `smear-cursor-nvim` |
| `ui.treesitter-context` | `nvim-treesitter-context` |
| `util.dot` | `d2-vim`（通过 nvim-treesitter D2 parser） |
| `util.gh` | `gh-nvim` |
| `util.mini-hipatterns` | `mini-nvim`（`mini.hipatterns` 子模块） |

加上用户自定义的插件（从 `lazy-lock.json` 不在 extras 中的部分），完整插件列表共约 **50 个**。以上 flake.nix 的 `nixCats_nvim_plugins` 列表已全部涵盖。

---

## 九、已知风险与注意事项

### 9.1 LazyVim 的 nixpkgs 版本滞后

`pkgs.vimPlugins.LazyVim` 停留在 2023-06-29。但这不影响功能：LazyVim 的 Lua 配置模块（keymaps、options、autocmds、LSP 自动配置）自 2023 年以来变化不大，核心 API 仍然兼容 Neovim 0.10+。

如果确实需要最新版 LazyVim（比如新的 extra 或 snack.nvim 集成），可以在 flake.nix 中用 overlay 替换 LazyVim 的 src：

```nix
LazyVim = prev.vimPlugins.LazyVim.overrideAttrs (old: {
  src = prev.fetchFromGitHub {
    owner = "LazyVim";
    repo = "LazyVim";
    rev = "main";  # 或指定 commit
    sha256 = "0000000000000000000000000000000000000000000000000000";  # 首次构建后替换
  };
});
```

### 9.2 `nvim-treesitter.withAllGrammars` 构建时间

首次构建会编译约 150 个 tree-sitter parser，约需 5-10 分钟。后续构建会使用 Nix cache，秒级完成。

### 9.3 `mini.nvim` 的依赖

`pkgs.vimPlugins.mini-nvim` 是一个大包，包含所有 mini 子模块（`mini.ai`, `mini.animate`, `mini.hipatterns`, `mini.icons`, `mini.indentscope`, `mini.pairs`, `mini.starter` 等）。用户也单独声明了 `mini-icons`，在 plugins 列表中只需要 `mini-nvim` 和 `mini-icons` 各一个即可。

### 9.4 markdown-preview.nvim 的 npm build

这是最复杂的一步。如果 nixpkgs 中的 `vimPlugins.markdown-preview-nvim` 构建有问题，备选方案是**放弃在 Nix 中构建，改用 nix-shell 手动构建**：

```bash
cd ~/.local/share/nvim/lazy/markdown-preview.nvim
npm install --production
npm install markdown-it-mark
```

并在 `init.lua` 中添加条件跳过 Nix 构建失败时的处理。

### 9.5 clipboard 支持

NixOS 上 Neovim 需要额外的 clipboard 工具（`wl-clipboard` for Wayland 或 `xclip`/`xsel` for X11），在 `extraDeps` 中加入：

```nix
nixCats_extra_deps = with prev; [
  xdg-utils
  glib        # gio trash
  wl-clipboard  # Wayland 剪贴板
  # 或 xclip / xsel for X11
];
```

---

## 十、部署步骤

### 在 NixOS 上执行：

```bash
# 1. 克隆配置仓库到 NixOS
cd ~/stuff/
git clone <你的 nvim 配置仓库> nvim-nix
cd nvim-nix

# 2. 首次构建（带 tree-sitter 编译，约 10 分钟）
nix build .#nvim

# 3. 验证构建产物
./result/bin/nvim --version
./result/bin/nvim --headless "+checkhealth" +q

# 4. 安装到 profile
nix profile install .#nvim

# 5. 或者集成到 NixOS 系统 flake 中
# 在系统 flake.nix 的 inputs 中添加：
#   nvim-config.url = "path:/home/you/stuff/nvim-nix";
# 在 environment.systemPackages 中：
#   inputs.nvim-config.packages.x86_64-linux.nvim
```

### 验证清单：

- [ ] `:checkhealth` 通过（LSP、treesitter、clipboard 三项关键）
- [ ] 暖纸色主题正常显示（`:colorscheme tokyonight`）
- [ ] lualine 状态栏 + winbar 正常
- [ ] `<space>ff` 查找文件、`<space>fw` 搜索文本
- [ ] `<space>e` 文件树、`<space>gg` Neogit
- [ ] 打开 `.lua` 文件，LSP 补全工作（`:LspInfo`）
- [ ] 打开 `.py` 文件，pyright + ruff 工作
- [ ] 打开 `.tex` 文件，texlab + latexindent 工作
- [ ] 打开 `.md` 文件，render-markdown 增强 + conform format
- [ ] 打开 `.org` 文件，orgmode agenda/capture 工作
- [ ] markdown-preview.nvim `:MarkdownPreview` 正常
- [ ] `:Mason` 打开但列表为空（Mason 已禁用下载）
- [ ] 启动页 Life 动画正常渲染
- [ ] Neo-tree 垃圾桶删除（用 `gio trash`）工作
- [ ] D2 语法高亮 + `:D2Png` 编译正常
- [ ] `OpenInFolder` / `OpenInFinder` 用 xdg-open 打开文件管理器
- [ ] 对比 macOS 上 `<space>?` which-key 菜单，keymaps 一致
