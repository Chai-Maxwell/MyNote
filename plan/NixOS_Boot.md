# NixOS 兼容 Visor-BootManager 分析

## Visor-BootManager 概览

**仓库**: [IO-ZetZor/Visor-BootManager](https://github.com/IO-ZetZor/Visor-BootManager)（⭐ 182）

Visor 是一个用 C 编写的极简 UEFI 图形化启动管理器。它的核心特点：

- **体积极小**：单个 `.efi` 文件约 170KB，无外部依赖，无脚本引擎
- **图形化菜单**：基于 UEFI GOP（Graphics Output Protocol）的双缓冲渲染，支持动画、主题、自定义背景、模糊玻璃效果等
- **支持的启动方式**：
  - Linux：EFI stub kernel（`vmlinuz` + `initrd` + `cmdline`）或 Unified Kernel Image（UKI）
  - Windows：chainload `bootmgfw.efi`
- **自动检测**：若 `boot.conf` 缺失，自动扫描 ESP 上的 Linux UKI 和 Windows Boot Manager
- **无需文件系统驱动**：Visor 不内置 FS 驱动，但支持从 `\EFI\visor\drivers\` 加载第三方 EFI 驱动（如 `btfs_x64.efi`、`ext4_x64.efi`）
- **构建依赖**：gnu-efi、gcc、make、binutils（objcopy）；可选 Python 3 + Pillow（仅重烤字体时需要）
- **日志自修剪**：`boot.log` 仅保留最近 3 次启动记录
- **CLI 工具**：`visor build|install|update|sign|status|config validate|doctor`

## NixOS 启动架构简介

NixOS 在 UEFI 系统上的默认启动方案是 **systemd-boot**，ESP 通常挂载在 `/boot`。

### NixOS 的启动方式

| 方式 | 说明 |
|------|------|
| **systemd-boot** | 默认 UEFI 方案。内核/initrd 放在 `/boot/EFI/nixos/`，入口配置在 `/boot/loader/entries/` |
| **GRUB** | 传统方案，支持多代回滚菜单 |
| **UKI（Unified Kernel Image）** | 将 kernel + initrd + cmdline 打包为单个 `.efi` 文件，放在 `\EFI\Linux\` |
| **直接 EFI stub** | 内核自带 EFI handover 协议，可由任何 EFI boot manager 直接启动 |

NixOS 的内核默认已启用：
```
CONFIG_EFI=y
CONFIG_EFI_STUB=y
```

## 兼容性分析

### ✅ 结论：NixOS **完全兼容** Visor-BootManager

Visor 作为一个独立的 UEFI 启动管理器，与操作系统的用户空间实现无关。它运行在 UEFI 固件层，只需要：

1. 能被编译并安装到 ESP
2. 能找到并加载 NixOS 的内核/UKI

这两个条件 NixOS 都满足。

---

## 推荐方案：UKI 路径（最简单）

### 原理

NixOS 生成 UKI（Unified Kernel Image），输出到 `\EFI\Linux\nixos-*.efi`。Visor 的自动检测功能会自动发现所有 `\EFI\Linux\*.efi` 文件并生成启动菜单。

### NixOS 配置示例

```nix
# /etc/nixos/configuration.nix
{
  # 方案 A：使用 systemd-boot 的 UKI 支持（NixOS ≥ 24.05）
  boot.loader.systemd-boot.enable = true;
  boot.loader.systemd-boot.uki = true;   # 生成 UKI 到 \EFI\Linux\

  # 方案 B：使用 lanzaboote 的 UKI 生成 + Secure Boot 签名
  # boot.loader.systemd-boot.enable = lib.mkForce false;
  # boot.lanzaboote = {
  #   enable = true;
  #   enrollKeys = true;
  # };

  # ESP 挂载点（默认）
  boot.loader.efi.canTouchEfiVariables = true;
  boot.loader.efi.efiSysMountPoint = "/boot";
}
```

执行 `nixos-rebuild switch` 后，UKI 会被写入 `/boot/EFI/Linux/nixos-generation-*.efi`。

Visor 会在启动时自动检测到这些 UKI，无需手动配置 `boot.conf`。

---

## 备选方案：EFI Stub Kernel 路径

适用于需要精细控制内核启动参数的场景。

### NixOS 配置示例

```nix
{
  # 关闭默认 boot loader
  boot.loader.systemd-boot.enable = false;
  boot.loader.grub.enable = false;

  # 确保内核以 EFI stub 方式生成
  # NixOS 默认 CONFIG_EFI_STUB=y，无需额外配置

  boot.loader.efi.canTouchEfiVariables = true;
  boot.loader.efi.efiSysMountPoint = "/boot";
}
```

### Visor boot.conf 配置

NixOS 的 kernel 和 initrd 位于 `/boot/EFI/nixos/` 目录下：

```ini
# \EFI\visor\boot.conf（在 ESP 上）

timeout=5
default=0
show_names=1
background=\EFI\visor\backgrounds\default.png

linux {
    name    = "NixOS"
    type    = linux
    icon    = \EFI\visor\icons\nixos.png
    kernel  = \EFI\nixos\<hash>-linux-<version>.efi
    initrd  = \EFI\nixos\<hash>-initrd-linux-<version>
    cmdline = "init=/nix/var/nix/profiles/system/init loglevel=4"
}
```

**注意**：NixOS 每次 `nixos-rebuild` 都会生成带新 hash 的文件名，因此 `boot.conf` 中的 kernel/initrd 路径需要同步更新。这是该方案的主要痛点。

---

## 构建 Visor on NixOS

### 临时构建（nix-shell）

```bash
nix-shell -p gnu-efi gcc make binutils
make
# 产出: visor_x64.efi
```

### 持久化构建（Nix derivation）

可以写一个 Nix derivation 来构建 Visor，随后通过 `environment.systemPackages` 或自定义 systemd service 管理安装：

```nix
# visor.nix
{ stdenv, gnu-efi, gcc, binutils }:

stdenv.mkDerivation {
  name = "visor-bootmanager";
  src = builtins.fetchGit {
    url = "https://github.com/IO-ZetZor/Visor-BootManager";
    ref = "main";
  };
  buildInputs = [ gnu-efi ];  # 提供 efilib 和 crt0-efi-x86_64.o
  makeFlags = [
    "CC=${stdenv.cc}/bin/cc"
  ];
  installPhase = ''
    mkdir -p $out/bin
    cp visor_x64.efi $out/
    cp assets/ $out/ -r
    cp boot.conf.example $out/
  '';
}
```

---

## 安装到 ESP

Visor 自带 `install.sh` 脚本，也可手动安装：

### 使用自带脚本

```bash
sudo ./install.sh --esp /boot --no-build --boot-entry
```

### 手动安装

```bash
# 1. 复制 Visor 到 ESP
sudo mkdir -p /boot/EFI/visor/{icons,backgrounds,themes,drivers}
sudo cp visor_x64.efi /boot/EFI/visor/
sudo cp assets/icons/*.png /boot/EFI/visor/icons/
sudo cp assets/backgrounds/*.png /boot/EFI/visor/backgrounds/

# 2. 创建配置文件（UKI 方案下可跳过，Visor 自动检测）
# sudo cp boot.conf.example /boot/EFI/visor/boot.conf

# 3. 注册 UEFI 启动项
sudo efibootmgr --create --disk /dev/sdX --part Y \
    --label "Visor" --loader '\EFI\visor\visor_x64.efi'
```

---

## NixOS 特有的注意事项

### 1. Generation 管理

NixOS 最显著的特点是每次系统更新都会创建新的 generation，对应新的内核/initrd。**强烈推荐使用 UKI 方案**，因为：

- 每个 generation 生成一个新的 `\EFI\Linux\nixos-generation-XX.efi`
- Visor 自动检测所有 `\EFI\Linux\*.efi`，自动展示所有可用 generation
- 用户可以在启动时选择任意 generation（相当于 NixOS 的回滚功能）
- 垃圾回收旧 generation 时会自动清理对应的 UKI 文件

### 2. 文件系统驱动

如果 NixOS 的 `/nix/store` 不在 ESP 上（通常在独立分区），且内核/initrd 需要通过非 FAT 文件系统访问，需要加载对应的 EFI 文件系统驱动：

```bash
# 例：如果 /boot 是 ext4
sudo cp /path/to/ext4_x64.efi /boot/EFI/visor/drivers/
```

但实际上，NixOS 的 UKI 方案已将内核和 initrd 打包进单个 `.efi` 文件放在 ESP（FAT 格式）上，**通常不需要额外 FS 驱动**。

### 3. Secure Boot

如果启用了 Secure Boot，Visor 的 `.efi` 二进制和所有 UKI 都需要签名：

```bash
# 使用 sbctl（推荐）
sudo sbctl sign /boot/EFI/visor/visor_x64.efi
sudo sbctl sign /boot/EFI/Linux/nixos-*.efi

# 或使用 Visor 自带的 sign 命令
visor sign --esp /boot
```

NixOS 的 `lanzaboote` 项目可自动化 Secure Boot 签名流程，结合 Visor 使用时，需将 Visor 的 `.efi` 也加入签名列表。

### 4. NixOS 自动化集成

理想情况下，可以在 NixOS 的 `configuration.nix` 中通过 `system.activationScripts` 自动安装/更新 Visor：

```nix
system.activationScripts.visor = ''
  VISOR_EFI="/boot/EFI/visor/visor_x64.efi"
  SRC_EFI="${pkgs.visor}/visor_x64.efi"
  if [ ! -f "$VISOR_EFI" ] || ! cmp -s "$VISOR_EFI" "$SRC_EFI"; then
    mkdir -p /boot/EFI/visor/{icons,backgrounds,themes,drivers}
    cp "$SRC_EFI" "$VISOR_EFI"
    cp -r ${pkgs.visor}/assets/icons/* /boot/EFI/visor/icons/
    cp -r ${pkgs.visor}/assets/backgrounds/* /boot/EFI/visor/backgrounds/
  fi
'';
```

或者将 Visor 打包为一个 NixOS module，在 `nixos-rebuild switch` 时自动同步。

---

## 对比其他 NixOS 启动方案

| 特性 | Visor + UKI | systemd-boot | GRUB | rEFInd |
|------|-----------|-------------|------|--------|
| 体积 | ~170KB | ~200KB | ~10MB+ | ~1MB |
| 图形化 | ✅ 动画/主题/模糊 | ❌ 纯文本 | ✅ 主题支持 | ✅ 图标 |
| 自动检测 UKI | ✅ | ❌ | ❌ | ✅ |
| NixOS 原生集成 | 需自行配置 | ✅ 内建模块 | ✅ 内建模块 | 社区模块 |
| Generation 回滚 | ✅ 多 UKI 菜单 | ✅ 文本列表 | ✅ 子菜单 | ✅ 多图标 |
| Secure Boot | 需自行签名 | lanzaboote 支持 | 需自行签名 | 需自行签名 |
| 多系统共存 | ✅ Linux+Windows | ❌ 需手动配置 | ✅ | ✅ |

---

## 总结

**NixOS 完全可以兼容 Visor-BootManager。** 推荐使用 **UKI（Unified Kernel Image）** 方案：

1. **零配置启动**：Visor 的自动检测功能可直接发现 NixOS 生成的 UKI
2. **Generation 回滚**：所有 UKI generation 自动出现在菜单中
3. **最简单的维护**：`nixos-rebuild switch` 生成新 UKI，Visor 自动感知
4. **美观的启动界面**：Visor 提供动画、主题、背景等丰富的视觉定制

唯一需要注意的是：Visor 没有 NixOS module，安装和更新需要手动或通过 activation script 管理。不过由于 UKI 模式下 Visor 的配置文件几乎不需要改动，这不是一个显著问题。

如果追求"开箱即用"的 NixOS 体验，systemd-boot 仍然是更好的选择；但如果想要一个**轻量、美观、动画流畅**的启动管理器，Visor + NixOS UKI 是一个优秀的组合。

---

## 附录：NixOS 上可用的 Boot 美化工具全景

### A. 图形化 Boot Manager（替代 systemd-boot/GRUB）

#### 1. rEFInd（⭐ NixOS 原生支持）

图标式图形化启动管理器，支持自动检测操作系统、自定义图标和主题。

**nixpkgs 状态**: 完整的 NixOS module

```nix
boot.loader.refind.enable = true;
boot.loader.refind.package = pkgs.refind;
boot.loader.refind.maxGenerations = 50;  # 限制显示的 generation 数量
boot.loader.refind.extraConfig = ''
  # 自定义 refind.conf 内容
  timeout 5
  use_graphics_for linux
  resolution 1920 1080
'';
```

**主题生态**: 大量社区主题（rEFInd-minimal、rEFInd-regular、Darkmini 等），通过 `boot.loader.refind.additionalFiles` 安装。

#### 2. Limine（⭐ NixOS 原生支持）

现代轻量 bootloader，支持图形化主题、背景图片、自定义分辨率。同时支持 BIOS 和 UEFI。

```nix
boot.loader.limine.enable = true;
boot.loader.limine.style = "nixos";  # 使用 NixOS 风格
boot.loader.limine.resolution = "1920x1080";
# Secure Boot 支持
boot.loader.limine.secureBoot = true;
```

**特点**: 内置 NixOS 主题（使用 `nixos-artwork` 作为壁纸），有丰富的测试覆盖（UEFI/BIOS/SecureBoot/checksum)。

#### 3. Visor-BootManager（⭐ 手动集成）

本报告主题，见上文详细分析。无 NixOS module，需自行写 derivation + activationScript。

---

### B. GRUB 美化（NixOS 原生 + 丰富的主题生态）

GRUB 本身不是"美"的代表，但 NixOS 有丰富的 GRUB 主题可用。

**nixpkgs 中的 GRUB 主题**:

| 包名 | 描述 |
|------|------|
| `catppuccin-grub` | Catppuccin 柔和配色（mocha/frappe/latte/macchiato） |
| `minimal-grub-theme` | 极简设计风格 |
| `sleek-grub-theme` | Sleek 现代风格 |
| `nixos-grub2-theme` | NixOS 官方 GRUB2 主题 |

**配置示例**:

```nix
# 示例：使用 Catppuccin GRUB 主题
{pkgs, ...}: {
  boot.loader.grub = {
    enable = true;
    efiSupport = true;
    device = "nodev";
    theme = "${pkgs.catppuccin-grub.override {flavor = "mocha";}}";
    splashImage = ./my-background.png;  # GRUB 背景图
  };
}
```

**Stylix 集成**: 如果使用了 [Stylix](https://github.com/danth/stylix)（NixOS 统一主题框架），可以一键同步 GRUB 主题：

```nix
stylix.targets.grub.enable = true;  # 自动生成与系统配色一致的 GRUB 主题
```

---

### C. Plymouth 启动画面（Boot Splash）

Plymouth 在 kernel 加载到显示管理器之间的阶段显示动画/图片，是"美化"的核心组件之一。

**nixpkgs 中的 Plymouth 主题**（全部在 nixpkgs 中可用）:

| 包名 | 描述 |
|------|------|
| `adi1090x-plymouth-themes` | 🔥 50+ 主题合集（abstract_ring、blockchain、colorful、hexagon 等） |
| `catppuccin-plymouth` | Catppuccin 柔和配色（4 种 variant） |
| `breeze-plymouth` | KDE Plasma 风格（NixOS 默认集成） |
| `nixos-bgrt-plymouth` | 固件 Logo 风格 |
| `plymouth-blahaj-theme` | 🦈 鲨鱼主题 |
| `plymouth-matrix-theme` | 黑客帝国数字雨风格 |
| `plymouth-proxzima-theme` | Proxzima 设计 |
| `plymouth-vortex-ubuntu-theme` | Ubuntu Vortex 移植 |

**配置示例**:

```nix
# 基础 Plymouth
boot.plymouth.enable = true;

# 使用 Catppuccin Plymouth（macchiato 风味）
boot.plymouth.theme = "catppuccin-macchiato";
boot.plymouth.themePackages = [
  (pkgs.catppuccin-plymouth.override {variant = "macchiato";})
];

# 或使用 adi1090x 合集中的一个
boot.plymouth.theme = "hexagon";
boot.plymouth.themePackages = [pkgs.adi1090x-plymouth-themes];

# Stylix 集成
stylix.targets.plymouth.enable = true;

# 自定义 NixOS Logo
boot.plymouth.logo = ./my-nixos-logo.png;
```

**社区 Plymouth 主题（GitHub，需手动集成）**:

| 项目 | ⭐ | 特色 |
|------|---|------|
| [Melkor333/nixos-boot](https://github.com/Melkor333/nixos-boot) | 50 | 动态缩放旋转的 NixOS Logo |
| [paulchambaz/nixos-plymouth](https://github.com/paulchambaz/nixos-plymouth) | 1 | 简洁 NixOS 主题 |
| [FirPic/nix-bloom](https://github.com/FirPic/nix-bloom) | 0 | Nix Bloom 风格 |
| [philippedev101/nixos-snow-landscape](https://github.com/philippedev101/nixos-snow-landscape) | 0 | 雪景主题，密码输入时雪花会飘落 |

---

### D. Stylix — 一键统一美化

[Stylix](https://github.com/danth/stylix) 是 NixOS 的全局主题系统，可以用一个配色方案统一管理所有视觉组件：

```nix
{
  # 选择一个配色方案（来自 base16 生态）
  stylix.base16Scheme = "${pkgs.base16-schemes}/share/themes/catppuccin-mocha.yaml";
  
  # 应用到启动相关组件
  stylix.targets.grub.enable = true;
  stylix.targets.plymouth.enable = true;
}
```

---

### E. 快速决策指南

```text
需要图形化启动菜单？
├── 是
│   ├── 要 NixOS 原生集成
│   │   ├── rEFInd — 图标式，社区主题多
│   │   └── Limine — 简洁现代，内置主题
│   └── 愿意手动集成
│       └── Visor-BootManager — 最小最流畅，动画丰富
│
└── 否（纯文本启动即可，但想要启动画面美化）
    └── systemd-boot + Plymouth
        ├── catppuccin-plymouth — 柔和配色
        ├── adi1090x-plymouth-themes — 50+ 主题任选
        └── breeze-plymouth — KDE 风格（NixOS 默认）
```

| 方案 | NixOS 集成度 | 美观程度 | 维护成本 |
|------|------------|---------|---------|
| **rEFInd** | 🟢 完整 Module | ⭐⭐⭐⭐ 图标+主题 | 低 |
| **Limine** | 🟢 完整 Module | ⭐⭐⭐ 主题+壁纸 | 低 |
| **GRUB + 主题** | 🟢 完整 Module | ⭐⭐⭐ 主题依赖 | 低 |
| **Visor** | 🟡 手动 | ⭐⭐⭐⭐⭐ 动画+模糊 | 中 |
| **systemd-boot + Plymouth** | 🟢 完整 Module | ⭐⭐⭐ 启动画面 | 低 |
| **Stylix 统一管理** | 🟢 完整 Module | ⭐⭐⭐⭐ 自动化统一 | 最低 |
