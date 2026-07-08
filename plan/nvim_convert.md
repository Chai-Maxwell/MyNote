# LazyVim → 纯 Neovim 迁移计划

## Context

当前配置是基于 LazyVim v8 的高度定制化配置，核心依赖链为 `init.lua → config.lazy → import LazyVim/LazyVim (lazyvim.plugins)`。LazyVim 提供了约 50+ 核心插件、23 个 extras、默认 keymaps/options/autocmds、以及 LSP/formatting/linting 的集成层。用户想去除 LazyVim 框架依赖，转为纯 Neovim（仍用 lazy.nvim 作为插件管理器），同时保留所有自定义配置效果。

**关键事实**：
- 用户的 16 个 `lua/plugins/*.lua` 自定义插件配置**不需要改动**，它们已经以独立的 lazy.nvim spec 方式存在
- 用户的自定义 `autocmds.lua`、`options.lua`、`neovide.lua` **不需要改动**
- 核心改动只有两个文件：`lazy.lua`（重写）和新增 LSP 集成文件
- 一些自定义插件 spec 中引用了 `LazyVim` API（如 `LazyVim.has()`, `LazyVim.pick()`），需要替换
- 配置文件本身是一个 git 仓库（`github.com/Chai-Maxwell/NvimConfigRepo`），可以安全地在新分支上操作

---

## 迁移概览

```
现在:  init.lua → lazy.lua → import LazyVim/LazyVim (lazyvim.plugins + extras)
                              → import plugins/ (用户自定义)

目标:  init.lua → lazy.lua → 显式声明所有插件 spec
                              → import plugins/ (用户自定义，不变)
```

---

## Step 0: 安全保障

### 0.1 备份当前状态

```bash
cd ~/.config/nvim
git checkout -b migration/remove-lazyvim  # 在新分支上工作
git status                                 # 确认干净
```

**万一出问题的回退方案**：
- `git checkout main` 即可回到 LazyVim 版本
- 也可以用 `NVIM_APPNAME=nvim-test nvim` 在隔离环境中测试新配置

### 0.2 记录 LazyVim 提供的默认 keymaps

在迁移前，打开 nvim 运行以下命令导出当前所有 keymaps（这样迁移后可以对比）：
```vim
:lua vim.cmd('redir! > /tmp/lazyvim-keymaps.txt | silent map | redir END')
```

这是**非常重要**的一步，因为 LazyVim 的 keymaps 是隐含的，一旦移除就没法回头看了。

---

## Step 1: 分析 LazyVim 提供了什么、你需要保留什么

### 1.1 你失去的（LazyVim 默认的）

| 类别 | 具体内容 | 影响评估 |
|------|----------|----------|
| **vim options** | number, relativenumber, signcolumn=yes, mouse=a, clipboard=unnamedplus, expandtab, shiftwidth=2, tabstop=2, scrolloff=4, sidescrolloff=8, splitright, splitbelow, undofile, cursorline 等约 20 个选项 | **需要显式设置** |
| **keymaps** | Space leader, `<leader>ff/fg/fb` (telescope), `K`/`gd`/`gr`/`[d`/`]d`/`<leader>ca` (LSP), `<C-hjkl>` (窗口导航), `<leader>bd` (关闭 buffer), `<leader>e` (neo-tree), `<leader>xx` (trouble), `<leader>/` (grug-far), `<leader>ft` (terminal), `<leader>gg`/`<leader>gB`/`<leader>gb` (lazygit/git) 等约 50 个映射 | **大部分需要保留**，可以逐步精简 |
| **autocmds** | auto-format on save (conform), auto-lint (nvim-lint), auto-checktime, terminal 设置, 大文件优化, 自动创建缺失目录, `laststatus=3` 等约 10 个 | **需要保留核心的**（format/lint/term/checktime） |
| **LSP 集成** | mason + mason-lspconfig + nvim-lspconfig + blink.cmp 之间的自动桥接 | **必须重建**（最关键的集成逻辑） |
| **plugin 默认配置** | LazyVim 对每个核心插件的默认 `opts`（如 telescope 的 layout、blink.cmp 的 keymap 等） | **需要提取/重建** |

### 1.2 你保留的（不需要动）

所有 `/lua/plugins/*.lua` 文件继续工作，因为它们输出的是 lazy.nvim 原生 spec。但需要注意：

- `colorscheme.lua` 引用 `tokyonight` — 需要确保 `tokyonight.nvim` 已在 spec 中声明
- `latex.lua` 引用 `nvim-lspconfig`、`mason`、`conform` — 需要确保这些 plugin 已在 spec 中声明
- `markdown-format.lua` 引用 `conform` — 同上
- `edgy.lua` 通过 monkey-patch 覆盖 edgy — 不需要改
- `alpha-life.lua` 引用 `alpha-nvim` — 需要确保 alpha-nvim 在 spec 中

**检查是否有 `LazyVim.*` API 调用**：
在 `lua/plugins/` 中搜索 `LazyVim`：
```bash
grep -r "LazyVim" ~/.config/nvim/lua/plugins/ ~/.config/nvim/lua/config/
```

如果发现有引用（很可能是 colorscheme.lua 或 alpha-life.lua），需要替换为原生 Neovim API。例如：
- `LazyVim.has("plugin")` → 在 spec 中用 `optional = true` + 条件判断
- `LazyVim.pick("files")` → `require("telescope.builtin").find_files` 或 `Snacks.picker.files()`

---

## Step 2: 重写 `lua/config/lazy.lua`

当前的 `lazy.lua` 只有一行核心逻辑：`{ "LazyVim/LazyVim", import = "lazyvim.plugins" }`。需要将其替换为所有 LazyVim 核心插件的显式声明。

### 2.1 完整插件清单（需要在 lazy.lua 中显式声明）

以下是 LazyVim 提供的每个插件的 spec，按功能分组：

#### 包管理器
```lua
{ "folke/lazy.nvim", version = "*" }  -- 已由 bootstrap 处理
```

#### 核心工具
```lua
{ "folke/snacks.nvim", opts = {} }
{ "nvim-lua/plenary.nvim", lazy = true }
{ "MunifTanjim/nui.nvim", lazy = true }
{ "nvim-tree/nvim-web-devicons", lazy = true }
```

#### Colorscheme（LazyVim 的默认，你的 colorscheme.lua 会覆盖）
```lua
{
  "folke/tokyonight.nvim",
  lazy = true,
  opts = { style = "night" },
}
```

#### Treesitter
```lua
{
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  main = "nvim-treesitter.configs",
  opts = {
    ensure_installed = { "bash", "c", "cpp", "diff", "html", "javascript", "jsdoc", "json", "jsonc", "lua", "luadoc", "luap", "markdown", "markdown_inline", "python", "query", "regex", "toml", "tsx", "typescript", "vim", "vimdoc", "xml", "yaml" },
    auto_install = true,
    highlight = { enable = true },
    indent = { enable = true },
  },
}
{
  "nvim-treesitter/nvim-treesitter-textobjects",
  lazy = true,
}
```

#### UI
```lua
{ "nvim-neo-tree/neo-tree.nvim", opts = {} }  -- 你的 neo-tree.lua 会覆盖
{ "nvim-lualine/lualine.nvim", opts = {} }    -- 你的 lualine.lua 会覆盖
{
  "folke/noice.nvim",
  event = "VeryLazy",
  opts = {
    lsp = { override = { ["vim.lsp.util.convert_input_to_markdown_lines"] = true, ["vim.lsp.util.stylize_markdown"] = true } },
    presets = { bottom_search = true, command_palette = true, long_message_to_split = true },
  },
  dependencies = { "MunifTanjim/nui.nvim", "rcarriga/nvim-notify" },
}
{
  "rcarriga/nvim-notify",
  lazy = true,
}
{
  "folke/which-key.nvim",
  event = "VeryLazy",
}
{
  "stevearc/dressing.nvim",
  lazy = true,
  init = function()
    vim.ui.select = function(...) require("lazy").load({ plugins = { "dressing.nvim" } }) return vim.ui.select(...) end
    vim.ui.input = function(...) require("lazy").load({ plugins = { "dressing.nvim" } }) return vim.ui.input(...) end
  end,
}
{
  "folke/noice.nvim",
  opts = function(_, opts)
    table.insert(opts.routes, {
      filter = { event = "notify", find = "No information available" },
      opts = { skip = true },
    })
    local focused = true
    vim.api.nvim_create_autocmd("FocusGained", { callback = function() focused = true end })
    vim.api.nvim_create_autocmd("FocusLost", { callback = function() focused = false end })
    table.insert(opts.routes, 1, {
      filter = { cond = function() return not focused end, min_height = 2 },
      view = "mini",
    })
  end,
}
{
  "akinsho/bufferline.nvim",
  enabled = false,  -- 你已禁用
}
{
  "nvimdev/dashboard-nvim",
  event = "VimEnter",
  opts = function()
    -- 你的 alpha-life.lua 已经提供了 dashboard
    -- 如果不想要 dashboard-nvim 可以和 alpha-nvim 一起管理
  end,
}
```

#### 编辑器增强
```lua
{
  "folke/flash.nvim",
  event = "VeryLazy",
  opts = {},
  keys = {
    { "s", mode = { "n", "x", "o" }, function() require("flash").jump() end, desc = "Flash" },
    { "S", mode = { "n", "x", "o" }, function() require("flash").treesitter() end, desc = "Flash Treesitter" },
    { "r", mode = "o", function() require("flash").remote() end, desc = "Remote Flash" },
    { "R", mode = { "o", "x" }, function() require("flash").treesitter_search() end, desc = "Treesitter Search" },
    { "<c-s>", mode = { "c" }, function() require("flash").toggle() end, desc = "Toggle Flash Search" },
  },
}
{
  "folke/trouble.nvim",
  opts = {},
  cmd = { "Trouble" },
  keys = {
    { "<leader>xx", "<cmd>Trouble diagnostics toggle<cr>", desc = "Diagnostics (Trouble)" },
    { "<leader>xX", "<cmd>Trouble diagnostics toggle filter.buf=0<cr>", desc = "Buffer Diagnostics (Trouble)" },
    { "<leader>cs", "<cmd>Trouble symbols toggle<cr>", desc = "Symbols (Trouble)" },
    { "<leader>cl", "<cmd>Trouble lsp toggle<cr>", desc = "LSP Definitions / references / ... (Trouble)" },
    { "<leader>xL", "<cmd>Trouble loclist toggle<cr>", desc = "Location List (Trouble)" },
    { "<leader>xQ", "<cmd>Trouble qflist toggle<cr>", desc = "Quickfix List (Trouble)" },
  },
}
{
  "folke/todo-comments.nvim",
  event = "BufReadPost",
  opts = {},
}
{
  "MagicDuck/grug-far.nvim",
  cmd = "GrugFar",
  keys = {
    { "<leader>/", function() require("grug-far").open() end, desc = "Grug Far (Search/Replace)" },
  },
}
```

#### Coding
```lua
{
  "echasnovski/mini.pairs",
  event = "VeryLazy",
  opts = {},
}
{
  "echasnovski/mini.ai",
  event = "VeryLazy",
  opts = function()
    local ai = require("mini.ai")
    return { n_lines = 500, custom_textobjects = { o = ai.gen_spec.treesitter({ a = "@block.outer", i = "@block.inner" }, {}), f = ai.gen_spec.treesitter({ a = "@function.outer", i = "@function.inner" }, {}), c = ai.gen_spec.treesitter({ a = "@class.outer", i = "@class.inner" }, {}) } }
  end,
}
{
  "JoosepAlviste/nvim-ts-context-commentstring",
  lazy = true,
}
{
  "folke/ts-comments.nvim",
  event = "VeryLazy",
  opts = {},
}
{
  "windwp/nvim-ts-autotag",
  event = "BufReadPost",
  opts = {},
}
{
  "folke/lazydev.nvim",
  ft = "lua",
  opts = { library = { { path = "${3rd}/luv/library", words = { "vim%.uv" } } } },
}
```

#### Session / Util
```lua
{
  "folke/persistence.nvim",
  event = "BufReadPre",
  opts = {},
  keys = {
    { "<leader>qs", function() require("persistence").load() end, desc = "Restore Session" },
    { "<leader>ql", function() require("persistence").load({ last = true }) end, desc = "Restore Last Session" },
    { "<leader>qd", function() require("persistence").stop() end, desc = "Don't Save Current Session" },
  },
}
```

#### Git
```lua
-- 你的 git.lua 已处理 vim-fugitive + gitsigns + neogit
-- 但 LazyVim 还有 diffview.nvim 需要显式声明
{
  "sindrets/diffview.nvim",
  cmd = { "DiffviewOpen", "DiffviewFileHistory" },
}
```

#### 格式化 / Linting
```lua
{
  "stevearc/conform.nvim",
  event = "BufWritePre",
  cmd = "ConformInfo",
  keys = {
    { "<leader>cf", function() require("conform").format() end, desc = "Format" },
  },
  opts = {
    formatters_by_ft = {
      lua = { "stylua" },
      python = { "ruff_format" },
      c = { "clang_format" },
      cpp = { "clang_format" },
    },
    format_on_save = function(bufnr)
      if vim.g.disable_autoformat or vim.b[bufnr].disable_autoformat then return end
      return { timeout_ms = 500, lsp_fallback = true }
    end,
  },
}
{
  "mfussenegger/nvim-lint",
  event = "BufWritePost",
  opts = {
    linters_by_ft = {
      python = { "ruff" },
    },
  },
}
```

#### LSP / Mason（最关键部分）
```lua
{
  "williamboman/mason.nvim",
  cmd = "Mason",
  keys = { { "<leader>cm", "<cmd>Mason<cr>", desc = "Mason" } },
  build = ":MasonUpdate",
  opts = {
    ui = {
      icons = {
        package_installed = "✓",
        package_pending = "→",
        package_uninstalled = "✗",
      },
    },
  },
}
{
  "williamboman/mason-lspconfig.nvim",
  event = "BufReadPre",
  dependencies = { "williamboman/mason.nvim" },
  opts = {
    ensure_installed = {
      "bashls", "clangd", "cmake", "lua_ls", "marksman",
      "pyright", "texlab", "vtsls",
    },
  },
}
{
  "neovim/nvim-lspconfig",
  event = "BufReadPre",
  dependencies = {
    "williamboman/mason-lspconfig.nvim",
    "saghen/blink.cmp",
  },
  config = function()
    -- LSP keymaps 需要在 on_attach 中设置
    vim.api.nvim_create_autocmd("LspAttach", {
      group = vim.api.nvim_create_augroup("UserLspConfig", {}),
      callback = function(ev)
        local opts = { buffer = ev.buf }
        vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
        vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
        vim.keymap.set("n", "gi", vim.lsp.buf.implementation, opts)
        vim.keymap.set("n", "K", vim.lsp.buf.hover, opts)
        vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, opts)
        vim.keymap.set("n", "<leader>cr", vim.lsp.buf.rename, opts)
        vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, opts)
        vim.keymap.set("n", "]d", vim.diagnostic.goto_next, opts)
      end,
    })
  end,
}
```

#### 补全
```lua
{
  "saghen/blink.cmp",
  event = "InsertEnter",
  version = "*",
  dependencies = { "rafamadriz/friendly-snippets", "L3MON4D3/LuaSnip" },
  opts = {
    keymap = { preset = "default" },
    completion = { documentation = { auto_show = false } },
    sources = {
      default = { "lsp", "path", "snippets", "buffer" },
    },
  },
}
{
  "rafamadriz/friendly-snippets",
  lazy = true,
}
{
  "L3MON4D3/LuaSnip",
  lazy = true,
  build = "make install_jsregexp",
}
```

#### LazyVim Extras → 显式声明

从 `lazyvim.json` 启用的 extras，你需要决定保留哪些：

```lua
-- ai.claudecode
{ "greggh/claudecode.nvim", opts = {} }

-- editor.illuminate
{ "RRethy/vim-illuminate", event = "BufReadPost", opts = {} }

-- editor.telescope
{
  "nvim-telescope/telescope.nvim",
  cmd = "Telescope",
  version = false,
  dependencies = {
    "nvim-telescope/telescope-fzf-native.nvim",
    build = "make",
  },
  keys = {
    { "<leader>ff", "<cmd>Telescope find_files<cr>", desc = "Find Files" },
    { "<leader>fg", "<cmd>Telescope live_grep<cr>", desc = "Live Grep" },
    { "<leader>fb", "<cmd>Telescope buffers<cr>", desc = "Buffers" },
    { "<leader>fh", "<cmd>Telescope help_tags<cr>", desc = "Help Tags" },
    { "<leader>fr", "<cmd>Telescope oldfiles<cr>", desc = "Recent Files" },
    { "<leader>fk", "<cmd>Telescope keymaps<cr>", desc = "Keymaps" },
  },
}
{ "nvim-telescope/telescope-fzf-native.nvim", build = "make", lazy = true }

-- formatting.prettier (conform 已处理, 这是一个 formatter 不是 plugin)

-- lang.clangd
{ "p00f/clangd_extensions.nvim", lazy = true }

-- lang.cmake
{ "Civitasv/cmake-tools.nvim", lazy = true }

-- lang.markdown
{ "MeanderingProgrammer/render-markdown.nvim", ft = "markdown", opts = {} }
{ "artempyanykh/marksman", ft = "markdown" }  -- mason 会安装 LSP

-- lang.python
{ "linux-cultist/venv-selector.nvim", opts = {} }

-- lang.tex
{ "lervag/vimtex", ft = "tex", lazy = true }

-- ui.indent-blankline
{ "lukas-reineke/indent-blankline.nvim", main = "ibl", opts = {} }

-- ui.mini-animate
{ "echasnovski/mini.animate", event = "VeryLazy", opts = {} }

-- ui.mini-indentscope
{ "echasnovski/mini.indentscope", event = "BufReadPost", opts = { draw = { animation = require("mini.indentscope").gen_animation.none() } } }

-- ui.mini-starter (你不需要，alpha-life.lua 已处理)
-- ui.smear-cursor
{
  "sphamba/smear-cursor.nvim",
  event = "VeryLazy",
  cond = vim.g.neovide == nil,  -- 你的 neovide.lua 已禁用
  opts = { hide_target_hack = true, cursor_color = "none" },
}

-- ui.treesitter-context
{ "nvim-treesitter/nvim-treesitter-context", opts = {} }

-- util.mini-hipatterns
{ "echasnovski/mini.hipatterns", event = "BufReadPost", opts = {} }
```

### 2.2 新的 `lazy.lua` 结构

```lua
-- ~/.config/nvim/lua/config/lazy.lua

-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Lazy.nvim setup
require("lazy").setup({
  -- 显式声明的所有插件 spec（从上面复制）
  -- ===== 核心工具 =====
  { "folke/snacks.nvim", opts = {} },

  -- ===== Colorscheme =====
  {
    "folke/tokyonight.nvim",
    lazy = true,
    opts = { style = "day" },
  },

  -- ===== Treesitter =====
  -- ... (列表中的所有 treesitter 相关)

  -- ===== UI =====
  -- ... (noice, which-key, dressing, etc.)

  -- ===== 编辑器增强 =====
  -- ... (flash, trouble, todo-comments, grug-far)

  -- ===== Coding =====
  -- ... (mini.pairs, mini.ai, ts-comments, etc.)

  -- ===== Git =====
  -- ... (diffview)

  -- ===== LSP/Mason =====
  -- ... (mason, mason-lspconfig, lspconfig, blink.cmp)

  -- ===== 格式化/Linting =====
  -- ... (conform, nvim-lint)

  -- ===== Extras（从 lazyvim.json 转换） =====
  -- ... (telescope, illuminate, claudecode, etc.)

  -- ===== 用户自定义 =====
  { import = "plugins" },  -- 保持原样！

}, {
  -- 以下保持不变
  root = vim.fn.stdpath("data") .. "/lazy",
  defaults = { lazy = false, version = false },
  install = { colorscheme = { "tokyonight", "habamax" } },
  checker = { enabled = true, notify = false },
  performance = {
    rtp = {
      disabled_plugins = { "gzip", "tarPlugin", "tohtml", "tutor", "zipPlugin" },
    },
  },
})
```

---

## Step 3: 补充 LazyVim 的默认 options/keymaps/autocmds

### 3.1 `options.lua` — 新增 LazyVim 的默认选项

```lua
-- 保留你的自定义
vim.opt.showtabline = 0

-- 新增：LazyVim 默认选项
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.signcolumn = "yes"
vim.opt.mouse = "a"
vim.opt.clipboard = "unnamedplus"
vim.opt.expandtab = true
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.softtabstop = 2
vim.opt.scrolloff = 4
vim.opt.sidescrolloff = 8
vim.opt.splitright = true
vim.opt.splitbelow = true
vim.opt.undofile = true
vim.opt.cursorline = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.updatetime = 250
vim.opt.timeoutlen = 300
vim.opt.inccommand = "split"
vim.opt.sessionoptions = { "buffers", "curdir", "tabpages", "winsize", "help", "globals", "skiprtp", "folds" }
vim.opt.termguicolors = true
vim.opt.list = true
vim.opt.listchars = { tab = "» ", trail = "·", nbsp = "␣" }
vim.opt.fillchars = { eob = " " }
vim.opt.laststatus = 3

-- Statuscolumn: 由 snacks.nvim 管理（statuscolumn = { enabled = true }）
-- 不手动设置 statuscolumn，避免和 snacks 冲突

-- ⚠️ 必须删除这一行（LazyVim 专用）:
-- vim.opt.formatexpr = "v:lua.LazyVim.format.formatexpr()"
-- gq 操作会 fallback 到 Neovim 内置的 formatexpr
```

### 3.2 `keymaps.lua` — 完整复制 LazyVim 的默认 keymaps

**策略：完整复制方案**。LazyVim 提供了约 100 个 keymaps。所有 keymaps 将显式声明在 `keymaps.lua` 中。实现时以 Step 0.2 中导出的 `/tmp/lazyvim-keymaps.txt` 为主要参考源。

需要注意：哪些 keymap 来自 LazyVim 核心（keymaps.lua），哪些来自 extras（telescope、lsp、git 等），哪些来自 plugin 各自的 keys 声明。**plugin spec 中的 keys 字段已经包含了该插件的 keymaps，不需要在 keymaps.lua 中重复定义。**

组织方式：
1. **全局编辑器 keymaps** — 来自 `lazyvim/config/keymaps.lua`：buffer 操作、窗口导航/调整、搜索、保存、缩进、移动行、注释、诊断跳转、quickfix、toggle 选项
2. **Plugin 自带的 keymaps** — 在各 plugin spec 的 `keys` 字段中（不需在 keymaps.lua 重复）：
   - Telescope（`<leader>ff/fg/fb/fr/fh/fk`等）
   - Flash（`s/S/r/R/<c-s>`）
   - Trouble（`<leader>xx/xX/cs/cl/xL/xQ`）
   - Grug-far（`<leader>/`）
   - neo-tree（`<leader>e/E/fe`）
   - Persistence（`<leader>qs/ql/qd`）
   - Conform（`<leader>cf`）
   - Mason（`<leader>cm`）
   - LSP（`gd/gr/gi/K/gI/gy/gD/<leader>ca/cr/cR/cl`等）
   - Git（`<leader>gg/gb/gl/gs` 等你自定义的）
   - Claudecode（`<leader>a*`）
3. **Snacks.nvim toggle keymaps** — 在 snacks opts 的 `toggle` 配置中定义（`<leader>u*` 系列）

```lua
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- ===== Buffer 操作 =====
vim.keymap.set("n", "<S-h>", "<cmd>bprevious<cr>", { desc = "Prev Buffer" })
vim.keymap.set("n", "<S-l>", "<cmd>bnext<cr>", { desc = "Next Buffer" })
vim.keymap.set("n", "<leader>bb", "<cmd>e #<cr>", { desc = "Switch to Other Buffer" })
vim.keymap.set("n", "<leader>`", "<cmd>e #<cr>", { desc = "Switch to Other Buffer" })

-- ===== 窗口导航 =====
vim.keymap.set("n", "<C-h>", "<C-w>h", { desc = "Go to Left Window" })
vim.keymap.set("n", "<C-j>", "<C-w>j", { desc = "Go to Lower Window" })
vim.keymap.set("n", "<C-k>", "<C-w>k", { desc = "Go to Upper Window" })
vim.keymap.set("n", "<C-l>", "<C-w>l", { desc = "Go to Right Window" })

-- ===== 窗口大小调整 =====
vim.keymap.set("n", "<C-Up>", "<cmd>resize +2<cr>", { desc = "Increase Window Height" })
vim.keymap.set("n", "<C-Down>", "<cmd>resize -2<cr>", { desc = "Decrease Window Height" })
vim.keymap.set("n", "<C-Left>", "<cmd>vertical resize -2<cr>", { desc = "Decrease Window Width" })
vim.keymap.set("n", "<C-Right>", "<cmd>vertical resize +2<cr>", { desc = "Increase Window Width" })

-- ===== 窗口分割 =====
vim.keymap.set("n", "<leader>-", "<C-w>s", { desc = "Split Window Below" })
vim.keymap.set("n", "<leader>|", "<C-w>v", { desc = "Split Window Right" })
vim.keymap.set("n", "<leader>wd", "<C-w>c", { desc = "Delete Window" })

-- ===== 移动行 =====
vim.keymap.set("n", "<A-j>", "<cmd>m .+1<cr>==", { desc = "Move Down" })
vim.keymap.set("n", "<A-k>", "<cmd>m .-2<cr>==", { desc = "Move Up" })
vim.keymap.set("i", "<A-j>", "<esc><cmd>m .+1<cr>==gi", { desc = "Move Down" })
vim.keymap.set("i", "<A-k>", "<esc><cmd>m .-2<cr>==gi", { desc = "Move Up" })
vim.keymap.set("v", "J", ":m '>+1<cr>gv=gv", { desc = "Move Down" })
vim.keymap.set("v", "K", ":m '<-2<cr>gv=gv", { desc = "Move Up" })

-- ===== 搜索 =====
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<cr>", { desc = "Clear Search Highlight" })
vim.keymap.set("n", "<leader>ur", "<cmd>nohlsearch<cr><cmd>diffupdate<cr><cmd>normal! <C-L><cr>", { desc = "Redraw / Clear hlsearch / Diff Update" })

-- ===== 保存/编辑 =====
vim.keymap.set({ "i", "x", "n", "s" }, "<C-s>", "<cmd>w<cr><esc>", { desc = "Save File" })
vim.keymap.set("n", "<leader>fn", "<cmd>enew<cr>", { desc = "New File" })
vim.keymap.set("n", "gco", "o<esc>", { desc = "Add Comment Below" })
vim.keymap.set("n", "gcO", "O<esc>", { desc = "Add Comment Above" })

-- ===== 诊断/Quickfix =====
vim.keymap.set("n", "[q", "<cmd>cprevious<cr>", { desc = "Previous Quickfix" })
vim.keymap.set("n", "]q", "<cmd>cnext<cr>", { desc = "Next Quickfix" })
vim.keymap.set("n", "<leader>xl", "<cmd>lopen<cr>", { desc = "Location List" })
vim.keymap.set("n", "<leader>xq", "<cmd>copen<cr>", { desc = "Quickfix List" })

-- ===== 代码注释 =====
vim.keymap.set("n", "gco", "o<esc>Vcx<esc><cmd>normal gcc<cr>fxa<bs>", { desc = "Add Comment Below" })
vim.keymap.set("n", "gcO", "O<esc>Vcx<esc><cmd>normal gcc<cr>fxa<bs>", { desc = "Add Comment Above" })

-- ===== Lazy 管理 =====
vim.keymap.set("n", "<leader>l", "<cmd>Lazy<cr>", { desc = "Lazy" })

-- ===== 退出 =====
vim.keymap.set("n", "<leader>qq", "<cmd>qa<cr>", { desc = "Quit All" })
```

**注意**：snacks.nvim 的 toggle 系统配置在 `snacks.nvim` 的 opts 中，不在 keymaps.lua。以下 toggle keymaps 通过 snacks 配置自动生成：
- `<leader>uf/F` format toggle
- `<leader>us` spell toggle
- `<leader>uw` wrap toggle
- `<leader>uL` relativenumber toggle
- `<leader>ud` diagnostics toggle
- `<leader>ul` number toggle
- `<leader>uc` conceal toggle
- `<leader>ub` background toggle
- `<leader>uh` inlay hints toggle
- `<leader>ug` indent toggle
- `<leader>um` render-markdown toggle
- `<leader>ux` illuminate toggle
- `<leader>ut` treesitter-context toggle
- `<leader>uz` zen toggle
- `<leader>uZ` zoom toggle
- `<leader>ue/E` edgy toggle/select
- `<leader>ua` mini-animate toggle

### 3.3 `autocmds.lua` — 补充 LazyVim 默认 autocmds

在你的自定义 autocmds **之前或之后**追加：

```lua
local augroup = vim.api.nvim_create_augroup
local autocmd = vim.api.nvim_create_autocmd
local general = augroup("General", { clear = true })

-- 保留你的自定义
-- (KaTeX macro expansion, image preview)

-- Auto checktime
autocmd({ "FocusGained", "TermClose", "TermLeave" }, {
  group = general,
  callback = function()
    if vim.o.buftype ~= "nofile" then
      vim.cmd("checktime")
    end
  end,
})

-- Terminal settings
autocmd("TermOpen", {
  group = general,
  callback = function()
    vim.opt_local.number = false
    vim.opt_local.relativenumber = false
    vim.opt_local.signcolumn = "no"
  end,
})

-- Resize splits on window resize
autocmd("VimResized", {
  group = general,
  callback = function()
    vim.cmd("tabdo wincmd =")
  end,
})

-- Auto-create missing directories on save
autocmd("BufWritePre", {
  group = general,
  callback = function(ev)
    if vim.bo[ev.buf].buftype ~= "" then return end
    local dir = vim.fn.fnamemodify(vim.loop.fs_realpath(ev.file) or ev.file, ":h")
    vim.fn.mkdir(dir, "p")
  end,
})
```

---

## Step 4: LSP 集成（最关键步骤）

LazyVim 的 LSP 集成是最复杂的部分——它将 mason、mason-lspconfig、nvim-lspconfig、blink.cmp 桥接在一起。你需要显式地建立这个桥接。

### 新建 `lua/config/lsp.lua`

```lua
-- LSP 集成：mason → mason-lspconfig → nvim-lspconfig + blink.cmp

-- 1. Mason 自动安装 LSP servers
require("mason").setup({
  ui = { border = "rounded", icons = { package_installed = "✓", package_pending = "→", package_uninstalled = "✗" }, },
})

-- 2. mason-lspconfig 桥接
require("mason-lspconfig").setup({
  ensure_installed = {
    "bashls", "clangd", "cmake", "lua_ls", "marksman",
    "pyright", "texlab", "vtsls",
  },
  automatic_installation = true,
})

-- 3. 配置每个 LSP Server
local lspconfig = require("lspconfig")
local capabilities = require("blink.cmp").get_lsp_capabilities()

-- lua_ls（已在 .neoconf.json 中有 neodev 配置）
lspconfig.lua_ls.setup({
  capabilities = capabilities,
  settings = {
    Lua = {
      runtime = { version = "LuaJIT" },
      workspace = { checkThirdParty = false, library = { vim.env.VIMRUNTIME } },
      completion = { callSnippet = "Replace" },
    },
  },
})

-- clangd
lspconfig.clangd.setup({ capabilities = capabilities })

-- pyright
lspconfig.pyright.setup({ capabilities = capabilities })

-- texlab
lspconfig.texlab.setup({ capabilities = capabilities })

-- marksman
lspconfig.marksman.setup({ capabilities = capabilities })

-- bashls
lspconfig.bashls.setup({ capabilities = capabilities })

-- cmake
lspconfig.cmake.setup({ capabilities = capabilities })

-- vtsls (TypeScript)
lspconfig.vtsls.setup({ capabilities = capabilities })

-- LSP keymaps (on LspAttach)
vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("UserLspAttach", { clear = true }),
  callback = function(ev)
    local opts = { buffer = ev.buf }
    vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
    vim.keymap.set("n", "gr", vim.lsp.buf.references, opts)
    vim.keymap.set("n", "gi", vim.lsp.buf.implementation, opts)
    vim.keymap.set("n", "K", vim.lsp.buf.hover, opts)
    vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, opts)
    vim.keymap.set("n", "<leader>cr", vim.lsp.buf.rename, opts)
    vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, opts)
    vim.keymap.set("n", "]d", vim.diagnostic.goto_next, opts)
    vim.keymap.set("n", "<leader>cd", vim.diagnostic.open_float, opts)
  end,
})
```

然后在 `init.lua` 中加载它：
```lua
require("config.lazy")
require("config.lsp")     -- 新增
require("config.neovide")
```

### 注意：需要延迟加载顺序

lsp.lua 中的 `require("mason")` 等调用依赖 plugin 已被 lazy.nvim 加载。确保在 `lazy.lua` 中将 mason、mason-lspconfig、lspconfig、blink.cmp 的 `lazy` 设置为 `false`（默认就是 `false`），这样它们在 Neovim 启动时就已可用。

但更安全的做法是将 lsp.lua 的逻辑移到 lazy.nvim 的 `config` 回调中，或者使用 `after` 钩子。简化方案：保持 `defaults = { lazy = false }`（已在 lazy.lua 中设置），这样所有未标记 `lazy = true` 的插件都会在启动时加载。

---

## Step 5: 需要修改的现有文件

### 5.1 `init.lua`

```lua
-- 原来
require("config.lazy")
require("config.neovide")

-- 改为
require("config.lazy")   -- lazy.nvim setup + 所有 plugin spec
require("config.lsp")    -- LSP 集成（新增）
require("config.neovide") -- Neovide 配置
```

### 5.2 检查 `lua/plugins/*.lua` 中的 `LazyVim.*` 引用

```bash
grep -rn "LazyVim" ~/.config/nvim/lua/plugins/ ~/.config/nvim/lua/config/
```

如果有引用（如 `LazyVim.root()` 等），替换方案：

| LazyVim API | 替换为 |
|-------------|--------|
| `LazyVim.root()` | `vim.fn.getcwd()` 或 `vim.fs.root(0, ".git")` |
| `LazyVim.root.get()` | `vim.fs.root(0, { ".git", "package.json" })` |
| `LazyVim.pick("files")` | 直接调用 `require("telescope.builtin").find_files()` 或 `Snacks.picker.files()` |
| `LazyVim.has("plugin")` | 不需要了（已显式声明所有 plugin） |
| `LazyVim.opts("plugin")` | 不需要了（opts 在 spec 中直接指定） |
| `LazyVim.json` | 不再需要 |

### 5.3 删除不再需要的文件

- `lazyvim.json` — 删除（不再需要 LazyVim extras 系统）
- `example.lua` — 删除（LazyVim 模板文件）

---

## Step 6: 清理

### 6.1 清理 LazyVim 缓存

迁移完成后（验证一切正常后）：
```bash
# 清理 LazyVim 本体的缓存
rm -rf ~/.local/share/nvim/lazy/LazyVim
rm -rf ~/.local/state/nvim/lazy/readme/

# 清理 nvim 缓存
rm -rf ~/.cache/nvim/luac/
rm -rf ~/.cache/nvim/mason-registry-update
```

### 6.2 重新同步插件

```bash
nvim --headless "+Lazy! sync" +qa
```

---

## Step 7: 验证清单

### 7.1 启动验证
- [ ] `nvim` 能正常启动（无报错）
- [ ] `:checkhealth` 各项基本通过
- [ ] `:Lazy` 显示所有插件状态正常

### 7.2 核心功能验证
- [ ] Warm Paper 主题正常加载
- [ ] Game of Life dashboard 正常显示
- [ ] `:Telescope find_files` 正常
- [ ] `:Lazy` 正常打开插件管理
- [ ] `:Mason` 正常显示已安装 LSP
- [ ] `:LspInfo` 显示 lspconfig 正常

### 7.3 LSP 验证
- [ ] 打开 `.lua` 文件 → `:LspInfo` 显示 lua_ls 已 attach
- [ ] 打开 `.py` 文件 → pyright 已 attach
- [ ] 打开 `.tex` 文件 → texlab 已 attach
- [ ] 打开 `.md` 文件 → marksman 已 attach
- [ ] 打开 `.c`/`.cpp` 文件 → clangd 已 attach
- [ ] `K` (hover)、`gd` (go to definition)、`gr` (references) 正常工作
- [ ] blink.cmp 自动补全正常

### 7.4 自定义功能验证
- [ ] KaTeX macro autocmd 在 `.md` 保存时正常工作
- [ ] 图片文件自动在 Preview.app 打开
- [ ] Org-mode agenda 和 capture 正常
- [ ] D2 语法高亮和 `:D2Png` 正常
- [ ] Markdown 预览（markdown-preview.nvim）正常
- [ ] Neo-tree 的 macOS Trash 删除正常工作
- [ ] Git fugitive/gitsigns/neogit 正常
- [ ] Edgy 窗口布局正常

### 7.5 Keymaps 验证
- [ ] `<leader>ff` / `<leader>fg` 正常工作
- [ ] `<C-hjkl>` 窗口导航正常
- [ ] `gd` / `gr` / `K` / `[d` / `]d` 正常工作
- [ ] `<leader>e` neo-tree 切换正常

---

## Step 8: 可能会遇到的实际问题及解决

| 问题 | 症状 | 解决 |
|------|------|------|
| `module 'lazyvim' not found` | 启动报错 | 某个 plugin spec 或 autocmd 中有 `LazyVim.*` 引用，grep 找到替换 |
| blink.cmp 不工作 | 无补全弹窗 | 确认 `blink.cmp` 的 `opts` 中 `keymap.preset = "default"` 正确设置 |
| Mason LSP 不自动 attach | `:LspInfo` 显示无 client | 确认 `mason-lspconfig` + `nvim-lspconfig` 的 `config` 回调中调用了各 server 的 `.setup()` |
| conform 不自动格式化 | 保存时无反应 | 确认 `conform.nvim` 的 `format_on_save` 和 `formatters_by_ft` 配置正确 |
| nvim-lint 不工作 | 无 lint 提示 | 确认 `nvim-lint` 的 `linters_by_ft` 配置了对应文件类型 |
| which-key 位置不对 | 在左下角而非右上角 | 你的 `which-key.lua` 已经配置了位置，确认文件未被改动 |
| 某些 keymap 不生效 | 按下无反应 | 检查 keymap 是否在正确的作用域/mode 中定义；对比 Step 0.2 导出的 LazyVim 默认 keymaps |
| 启动速度明显变慢 | 启动慢 | 检查 `lazy = true` 设置是否合理；用 `:Lazy profile` 分析 |

---

## 关键决策

已确认的迁移策略：
- **Keymaps**: 完整复制方案 — LazyVim 的所有默认 keymaps 全部显式声明
- **Extras**: 全部保留 — 23 个 lazyvim.json extras 全部转为显式 plugin spec
- **Statuscolumn**: Snacks 方案 — 用 `snacks.nvim` 的 statuscolumn 功能，和 LazyVim 效果最接近
- **LSP**: 传统 lspconfig 方案 — 用 `lspconfig[server].setup()` 而非 Neovim 0.11+ 的 `vim.lsp.config()` API

---

## 回滚方案

如果迁移过程中出问题，一步回滚：

```bash
cd ~/.config/nvim
git checkout main           # 回到 LazyVim 版本
git branch -D migration/remove-lazyvim  # 删除迁移分支
rm -rf ~/.cache/nvim/luac/  # 清理可能残留的缓存
nvim                        # 一切恢复原样
```

---

## 执行顺序

1. **Step 0** — 创建分支、备份、导出 keymaps
2. **Step 5.3** — 先检查 `lazyvim.json` 和 `LazyVim.*` 引用
3. **Step 2** — 重写 `lazy.lua`（这是最大的改动）
4. **Step 3** — 补充 options/keymaps/autocmds
5. **Step 4** — 创建 `lsp.lua`、改 `init.lua`
6. **Step 6** — 清理
7. **Step 7** — 逐项验证
8. 验证通过后 commit

```bash
git add -A && git commit -m "migrate: remove LazyVim, switch to standalone nvim config"
```
