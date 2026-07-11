# LazyVim 在 NixOS 上的安装方案

## 问题 1：vimPlugins.LazyVim 是否无人维护、版本落后？

**结论：不是“无人维护”，但本质上不适合在 Nix 中使用。**

### nixpkgs 中的状态

`vimPlugins.LazyVim` 在 nixpkgs 中是一个**通过自动脚本生成的包**，位于 `pkgs/applications/editors/vim/plugins/generated.nix`。它的版本停留在 **2023-06-29**，距离现在（2026年7月）已经超过 3 年没有更新。

```nix
LazyVim = buildVimPluginFrom2Nix {
  pname = "LazyVim";
  version = "2023-06-29";
  src = fetchFromGitHub {
    owner = "LazyVim";
    repo = "LazyVim";
    rev = "0e33010937d9f759d5f6de04c2ef6f2340ff1483";
    sha256 = "034853449qa8shg4i98hazv7azz6q0vam6vgv2mvsh7fm1xi011x";
  };
  meta.homepage = "https://github.com/LazyVim/LazyVim/";
};
```

自动更新脚本 (`vim-plugin-names`) 中确实注册了这个包的 GitHub 地址，理论上可以被自动更新，但实际已经很久没有更新了。

### 但根本问题不在版本

即使版本是最新的，**LazyVim 和 Nix 在哲学上就存在根本冲突**：

1. **LazyVim 本身就是一个插件管理器**（基于 `lazy.nvim`），它设计为在运行时从 GitHub 克隆和安装插件。这与 Nix 的不可变、声明式包管理模型直接冲突。
2. **`lazy.nvim` 会重置 `packpath`**，阻止任何不由它管理的插件加载（包括 Nix 安装的插件）。
3. LazyVim 的维护者 **folke** 在 [GitHub Discussion #853](https://github.com/LazyVim/LazyVim/discussions/853) 中明确表示：
   > "I have no idea. Installing plugins with Nix and lazy is not supported."

### 社区的务实方案

大多数 NixOS 用户并不使用 `vimPlugins.LazyVim`，而是：

| 方案 | 说明 |
|------|------|
| **只用 Nix 提供二进制，lazy.nvim 管理插件** | Neovim 通过 Nix 安装，但插件完全由 lazy.nvim 自行管理（不走 Nix） |
| **nixCats** | Nix 负责下载，Lua 负责配置，支持 LazyVim 模板 |
| **NixVim / nvf** | 完全用 Nix 声明式配置 Neovim |
| **pfassina/lazyvim-nix** | 专门的 HM module，见下文 |

---

## 问题 2：pfassina/lazyvim-nix 解决了 Mason 问题吗？

**结论：是的，它以“禁用 Mason + 用 Nix 替代”的方式解决了 Mason 问题，但并非完美。**

### Mason 问题的本质

`mason.nvim` 下载的是**预编译的 FHS 二进制文件**，它们依赖 `/lib`、`/usr/lib` 等标准路径中的动态链接库。NixOS 没有这些路径，导致 Mason 安装的 LSP、formatter、linter 无法运行。

### pfassina/lazyvim-nix 的方案

项目地址：<https://github.com/pfassina/lazyvim-nix>

核心思路：**用 Nix 的包管理完全替代 Mason**。

具体机制：

1. **默认禁用 Mason**：模块会自动将 `mason.nvim` 和 `mason-lspconfig.nvim` 禁用，LSP 服务器通过系统的 `PATH` 找到（由 Nix 提供）。

2. **`extraPackages`**：用户声明式地指定需要的 LSP、formatter、linter 等工具的 Nix 包名，这些会被加入 Neovim 的包装环境中。

3. **`data/dependencies.json`**：项目维护了一个 LazyVim extras → nixpkgs 包名的映射表。当用户启用 `installDependencies = true` 时，自动安装对应 extra 需要的 Nix 包。

4. **插件管理可选 Nix**：通过 `pluginSource = "nixpkgs"` 选项，可以用 Nix 的 `linkFarm` 创建符号链接农场，配合 `lazy.nvim` 的 `dev.path` 特性，让所有插件也由 Nix 管理。

#### 配置示例

```nix
programs.lazyvim = {
  enable = true;
  pluginSource = "nixpkgs";        # 插件由 Nix 管理
  installCoreDependencies = true;   # 自动安装核心依赖（如 ripgrep, fd 等）

  extras = {
    lang.nix = {
      enable = true;
      installDependencies = true;   # 自动安装 nil, nixfmt, statix 等
    };
  };

  extraPackages = with pkgs; [
    lua-language-server
    stylua
    nixd
    nixfmt-classic
  ];
};
```

#### 已知问题

从项目 issue 可以看到以下已知问题：

- **依赖映射不完整**：[Issue #40](https://github.com/pfassina/lazyvim-nix/issues/40) — `markdown-toc` 等工具缺少 nixpkgs 映射
- **Tree-sitter 问题**：[Issue #37](https://github.com/pfassina/lazyvim-nix/issues/37)、[Issue #64](https://github.com/pfassina/lazyvim-nix/issues/64) — `tree-sitter-cli` 找不到、部分语法插件缺失
- **`dependencies.json` 是自动生成的**：手动 PR 添加映射可能被下一次自动生成覆盖

---

## 各方案对比

| 方案 | Mason 问题 | 插件管理 | 学习成本 | 维护状态 |
|------|-----------|---------|---------|---------|
| **pfassina/lazyvim-nix** | ✅ 已解决（禁用 Mason） | Nix 或 lazy.nvim | 低（接近原生 LazyVim 体验） | 有小问题，仍在维护 |
| **nixCats** | ✅ 已解决（禁用 Mason） | Nix + lz.n/lze | 中（需学习 nixCats 概念） | 活跃维护（2026） |
| **NixVim** | ✅ N/A（不用 Mason） | 纯 Nix 声明式 | 高（需学 NixVim DSL） | 活跃维护 |
| **buildFHSEnv 包装** | ⚠️ 绕过（非解决） | lazy.nvim 原生 | 低 | N/A |
| **vimPlugins.LazyVim** | ❌ 未解决 | Nix（过时） | 低 | 版本停留在 2023 |

---

## 推荐路径

1. **如果你已有成熟的 LazyVim 配置、不想重写** → 用 **pfassina/lazyvim-nix**，配合 `extraPackages` 提供 LSP 等工具。
2. **如果你想保持 Lua 配置、但拥抱 Nix** → 用 **nixCats**（推荐 `lze` 替代 `lazy.nvim`）。
3. **如果你愿意从头学、追求纯 Nix 声明式** → 用 **NixVim** 或 **nvf**。
4. **如果你只想快速让它跑起来** → 用 `buildFHSEnv` 包装 Neovim，但这会部分牺牲 Nix 的可复现性。

### 如果选择 pfassina/lazyvim-nix

关键注意事项：
- 所有 LSP/formatter/linter 必须通过 `extraPackages` 声明，不要指望 Mason
- 需要关注 `data/dependencies.json` 中是否覆盖了你需要的 LazyVim extra
- 如果遇到 tree-sitter 语法问题，可能需要额外配置 `vimPlugins.nvim-treesitter.withAllGrammars`
- `pluginSource = "nixpkgs"` 会让插件也由 Nix 管理，更纯粹但也可能遇到插件版本滞后的问题

---

## 参考资料

- [pfassina/lazyvim-nix](https://github.com/pfassina/lazyvim-nix) — 本文讨论的核心项目
- [LazyVim Discussion #853](https://github.com/LazyVim/LazyVim/discussions/853) — folke 对 NixOS 兼容性的表态
- [nixCats](https://github.com/BirdeeHub/nixCats-nvim) — Nix + Lua 混合方案
- [NixVim](https://github.com/nix-community/nixvim) — 纯 Nix 声明式 Neovim 配置
- [LazyVim Issue #1285](https://github.com/LazyVim/LazyVim/issues/1285) — 社区请求禁用 Mason 的 feature request
- [AciDev/NixOS-Neovim](https://github.com/AciDev/NixOS-Neovim) — nixCats 的 LazyVim 模板
