# 从 Windows 到 Arch + NixOS 双系统

分两阶段：

1. **Windows 还在的时候**：从 Windows 里缩小分区，腾出空间装 Arch，实现 Win+Arch 双系统
2. **确认 Arch 能用之后**：删掉 Windows 分区，在空出来的空间上装 NixOS，最终是 Arch+NixOS

万一 Arch 装砸了还能回到 Windows 查资料、重来。等 Arch 稳定跑起来再杀 Windows。

每个命令出现时解释它做什么、为什么用这些参数。

---

## 阶段零：动手之前要理解的一件事

UEFI 固件不认"操作系统"。它只认 ESP（EFI System Partition，FAT32 格式的分区）里的 `.efi` 文件。开机时，固件从 NVRAM 中读出启动条目列表（`BootOrder`），按顺序去 ESP 找对应的 `.efi` 文件，找到就加载它。

多系统共存很简单：**所有系统的 `.efi` 文件放同一个 ESP，各在 NVRAM 注册一条启动项，互不干扰。** Windows 已经占用了 ESP 中的 `EFI/Microsoft/` 目录。Arch 和 NixOS 会各建自己的目录，不影响 Windows。

```
ESP 现在（Windows 创建的）：
/EFI/
├── BOOT/BOOTX64.EFI
└── Microsoft/Boot/bootmgfw.efi

装 Arch 之后：
/EFI/
├── BOOT/BOOTX64.EFI
├── Microsoft/Boot/bootmgfw.efi    ← 没动
└── arch/grubx64.efi               ← 新增

最终（删 Windows 装 NixOS 后）：
/EFI/
├── BOOT/BOOTX64.EFI
├── arch/grubx64.efi
└── nixos/                          ← NixOS 内核 + initrd
```

**一个磁盘只需要一个 ESP。不要新建第二个。复用 Windows 已有的 ESP，不格式化，只往里面加文件。**

---

## 阶段一：Windows + Arch 双系统

### 1.1 Windows 上的准备

**关快速启动**：控制面板 → 电源选项 → 选择电源按钮的功能 → 取消"启用快速启动"。快速启动本质是把内核会话 hibernate 到磁盘而非真正关机——这会让 NTFS 分区处于脏状态，Linux 读不了。

**关休眠**：

```powershell
# 管理员 PowerShell
powercfg /h off
```

这会删除 `C:\hiberfil.sys`（休眠文件，通常和内存一样大），释放磁盘空间。

**统一时间标准**：Windows 默认把硬件时钟当本地时间，Linux 默认当 UTC。不改的话切换系统时间差 8 小时：

```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1 /f
```

### 1.2 缩小 Windows 分区

**在 Windows 里操作，不要在 Linux 下缩 NTFS。** NTFS 是微软自家的文件系统，Linux 的 `ntfsresize` 不敢碰某些"不可移动的系统文件"（MFT 镜像、pagefile 等）。Windows 自己的磁盘管理知道怎么处理。

1. `Win + R` → `diskmgmt.msc`
2. 右键 C 盘 → 压缩卷
3. 输入要腾出的空间（MB）。比如腾 500G，输入 `512000`
4. 确定后 C 盘后面出现"未分配"空间

**如果只能缩几百 MB**：MFT 或 pagefile 卡在磁盘尾部。三招：

- 临时禁用 pagefile：系统属性 → 高级 → 性能设置 → 高级 → 虚拟内存 → 无分页文件 → 重启 → 再缩 → 改回来
- 关休眠（`powercfg /h off`）删除休眠文件
- 用 MiniTool Partition Wizard——它对不可移动文件的处理比 Windows 自带磁盘管理更激进

**缩完之后重启一次 Windows**，让它跑 chkdsk 验证 NTFS 完整性。

**不要用 Windows 格式化那块未分配空间。** 留着等 Arch ISO 处理。

### 1.3 BIOS/UEFI 设置

重启进 UEFI 设置（按 F2/Del/Esc，看品牌）。关 Secure Boot（可以以后开，装的过程中关掉省事）。确认 SATA 模式是 AHCI（不是 Intel RST/RAID）。

### 1.4 启动 Arch ISO

做启动盘：用 [Ventoy](https://www.ventoy.net/) 或 `dd`。从 U 盘启动后：

```bash
ping -c 3 archlinux.org   # 确认有网
lsblk -f                  # 看磁盘
```

你应该看到类似：

```
nvme0n1
├─nvme0n1p1  vfat   (Windows 的 ESP —— 100-500M)
├─nvme0n1p2  NTFS   (Microsoft reserved, 16M)
├─nvme0n1p3  NTFS   (C 盘)
├─nvme0n1p4  NTFS   (恢复分区，不一定有)
                 ← 未分配空间（你缩出来的）
```

**记住 ESP 的分区号**——例子里是 `nvme0n1p1`。这个分区**绝对不能格式化**。

### 1.5 在未分配空间中创建分区

```bash
gdisk /dev/nvme0n1
```

`p` 看现状。**不要用 `o`**（会删掉整个分区表，Windows 就没了）。直接在未分配空间上：

```
n → 起始扇区（回车，取默认 = 未分配空间开头）
  → 大小：+500G
  → 类型码：8304（Linux x86-64 root）
w → 写入
```

分区表：

```
nvme0n1p1  EFI System    (ESP，共享——不要碰)
nvme0n1p2  Microsoft reserved
nvme0n1p3  Windows C:
nvme0n1p4  Windows recovery
nvme0n1p5  Linux root    (新)
```

### 1.6 Btrfs subvolume

```bash
mkfs.btrfs -L "Arch" /dev/nvme0n1p5

mount /dev/nvme0n1p5 /mnt
cd /mnt

btrfs subvolume create @           # → /
btrfs subvolume create @home       # → /home
btrfs subvolume create @var_log    # → /var/log
btrfs subvolume create @pkg        # → /var/cache/pacman/pkg
btrfs subvolume create @snapshots  # → /.snapshots

cd /
umount /mnt
```

为什么拆这些：

| subvolume | 挂在 | 独立出来的原因 |
|---|---|---|
| `@` | `/` | 系统根，会被快照 |
| `@home` | `/home` | 回滚系统快照时不动个人文件 |
| `@var_log` | `/var/log` | 日志写操作频繁，丢了也无所谓 |
| `@pkg` | `/var/cache/pacman/pkg` | pacman 缓存几个 G，进了快照浪费 |
| `@snapshots` | `/.snapshots` | 快照子卷不能放在要被快照的子树里 |

### 1.7 挂载

```bash
mount -o noatime,compress=zstd,subvol=@ /dev/nvme0n1p5 /mnt

mkdir -p /mnt/{home,var/log,var/cache/pacman/pkg,.snapshots,boot}
mount -o noatime,compress=zstd,subvol=@home /dev/nvme0n1p5 /mnt/home
mount -o noatime,compress=zstd,subvol=@var_log /dev/nvme0n1p5 /mnt/var/log
mount -o noatime,compress=zstd,subvol=@pkg /dev/nvme0n1p5 /mnt/var/cache/pacman/pkg
mount -o noatime,compress=zstd,subvol=@snapshots /dev/nvme0n1p5 /mnt/.snapshots

# 共享 ESP，只挂载，不格式化
mount /dev/nvme0n1p1 /mnt/boot
```

挂载选项：

- `noatime`：不更新文件的"最后访问时间"。正常 Linux 每次读文件都写磁盘记录访问时间，对 SSD 是无意义磨损。
- `compress=zstd`：Btrfs 透明压缩。写入时自动压，读出时自动解压，应用无感知。默认级别 3，文本类文件省 30-50%，已压缩文件（视频、jpg）Btrfs 试探性放弃，不浪费 CPU。注意：只有**第一个被挂载的 subvolume** 的压缩选项生效（内核限制），后面 `-o compress=zstd` 会被忽略。
- `subvol=@`：指定挂载的不是顶层文件系统，是名为 `@` 的子卷。

### 1.8 `pacstrap` — 装基础系统

```bash
pacstrap -K /mnt base base-devel linux linux-firmware \
    btrfs-progs vim git sudo networkmanager grub efibootmgr os-prober
```

`pacstrap` 是 `arch-install-scripts` 中的脚本，本质在 `/mnt` 下调用 `pacman` 安装指定包，自动处理依赖。

参数：
- `-K`：在目标系统初始化**空的 pacman keyring**，不复制 ISO 的 keyring。如果 ISO 时间不对导致 keyring 损坏，复制过去会让新系统验证不了包签名。用空 keyring，第一次 `pacman -Sy` 时自动 `pacman-key --populate` 填正确的密钥。
- `/mnt`：目标根目录

包说明：

| 包 | 作用 |
|---|---|
| `base` | 最小系统：bash, coreutils, pacman, systemd, glibc |
| `base-devel` | 编译工具链：gcc, make, autoconf。AUR 需要 |
| `linux` | 稳定版内核 |
| `linux-firmware` | 各种硬件固件（WiFi、蓝牙、GPU） |
| `btrfs-progs` | Btrfs 管理工具 |
| `networkmanager` | 网络管理 |
| `grub` | bootloader |
| `efibootmgr` | 管理 UEFI NVRAM 启动项 |
| `os-prober` | 扫描磁盘找其他 OS，`grub-mkconfig` 用它加 Windows 启动项 |

装完后 `/mnt` 下是完整的 Linux 目录结构。

### 1.9 `genfstab` — 生成文件系统表

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

`genfstab` 扫描当前挂载状态（`/proc/mounts`），生成 `/etc/fstab` 条目。

- `-U`：用 UUID 标识分区。UUID 唯一且不变；设备名（`/dev/sda1`）可能因内核初始化顺序漂移。

**⚠️ genfstab 对 Btrfs 的坑**：生成的 Btrfs 条目包含 `subvolid=256`。快照回滚后 subvolume ID 变（旧的 `@` 被改名、快照被 rename 成 `@`），fstab 找不到，系统起不来。

**立即编辑，删掉每行 Btrfs 的 `subvolid=xxx`**：

```bash
# 生成前：
# UUID=abc123... /  btrfs  subvol=@,subvolid=256,...  0 0
# 改成：
# UUID=abc123... /  btrfs  subvol=@,...  0 0
```

### 1.10 `arch-chroot` — 切进新系统

```bash
arch-chroot /mnt
```

增强版 `chroot`。普通 `chroot` 只切换根目录；`arch-chroot` 额外挂载 `/proc`、`/sys`、`/dev`、`/run`、`/tmp` 以及 `/sys/firmware/efi/efivars`（否则 `efibootmgr` 访问不了 NVRAM）。退出时自动卸载。

### 1.11 系统配置

```bash
# 时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc   # 把当前系统时间写入硬件时钟 + 生成 /etc/adjtime

# Locale
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf

# 主机名
echo "archbox" > /etc/hostname

# 用户
passwd
useradd -m -G wheel username
passwd username
echo "%wheel ALL=(ALL:ALL) ALL" >> /etc/sudoers

# 网络
systemctl enable NetworkManager
```

`systemctl enable` 在 `/etc/systemd/system/multi-user.target.wants/` 放符号链接，标记为开机自启。`enable` 不等于 `start`（立刻运行），重启生效。

### 1.12 `grub-install` + `grub-mkconfig`

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=arch
```

参数：
- `--target=x86_64-efi`：告诉 GRUB 编译 64 位 UEFI 镜像。GRUB 支持多平台（`i386-pc` 是 BIOS，`x86_64-efi` 是 UEFI）。
- `--efi-directory=/boot`：ESP 挂载点。GRUB 把 `grubx64.efi` 放到 `/boot/EFI/arch/`。
- `--bootloader-id=arch`：ESP 里的文件夹名 = UEFI 启动项显示名。

GRUB 做了三件事：1) 写 `grubx64.efi` 到 ESP；2) 写模块到 `/boot/grub/`；3) 调 `efibootmgr` 注册 NVRAM 启动项。

**不格式化 ESP、不碰 Windows 的文件**——只是多加了一个 `EFI/arch/` 目录。

```bash
# os-prober 自动发现 Windows 并加进 GRUB 菜单
grub-mkconfig -o /boot/grub/grub.cfg
```

```bash
exit
umount -R /mnt
reboot
```

拔掉 U 盘。重启后 GRUB 菜单两个选项：Arch Linux 和 Windows Boot Manager。

### 1.13 装完马上做的事

```bash
nmtui    # 连网

# 快照
sudo pacman -S snapper snap-pac

sudo umount /.snapshots
sudo rm -r /.snapshots
sudo snapper -c root create-config /
# -c root：配置名 root（约定）。create-config /：告诉 snapper 管理/
# 会自动创建 /.snapshots subvolume

sudo mount -a
sudo chmod 750 /.snapshots

sudo systemctl enable --now snapper-timeline.timer
sudo systemctl enable --now snapper-cleanup.timer
```

`snap-pac` 是 pacman hook——每次 `pacman -Syu` 前后自动创建 pre/post 快照对。更新崩了 `sudo snapper -c root undochange N..0` 回去。

配置文件 `/etc/snapper/configs/root` 里的关键项：

```ini
TIMELINE_MIN_AGE="1800"
TIMELINE_LIMIT_HOURLY="10"
TIMELINE_LIMIT_DAILY="7"
NUMBER_LIMIT="10"
```

### 1.14 系统崩了怎么回滚

从 Arch ISO 启动：

```bash
mount /dev/nvme0n1p5 /mnt         # 不加 subvol=，看到顶层 subvolid=5
# 找可用快照
grep -r '<date>' /mnt/@snapshots/*/info.xml | sort | tail -20
# 回滚
mv /mnt/@ /mnt/@.broken
btrfs subvolume snapshot /mnt/@snapshots/N/snapshot /mnt/@
reboot
# 进系统后删掉坏的：
sudo mount -o subvolid=5 /dev/nvme0n1p5 /mnt
sudo btrfs subvolume delete /mnt/@.broken
sudo umount /mnt
```

---

## 阶段二：删 Windows，装 NixOS

Arch 跑稳了、Windows 没用了，就清掉它。

### 2.1 备份 + 删除

最后一次搬走 Windows 上要留的数据。

```bash
# 看当前分区
lsblk /dev/nvme0n1
# nvme0n1p1 ESP, p2-p4 Windows, p5 Arch

gdisk /dev/nvme0n1
# d → 逐个删 Windows 分区（p2, p3, p4）
# n → 在空出来的空间新建 NixOS 分区
# w → 写入

mkfs.btrfs -L "NixOS" /dev/nvme0n1p6
# 或 mkfs.ext4 -L "NixOS" /dev/nvme0n1p6
```

最终：

```
nvme0n1p1  ESP
nvme0n1p5  Arch
nvme0n1p6  NixOS
```

**清理 ESP 和 NVRAM**：

```bash
# 删 Windows bootloader 文件
sudo rm -rf /boot/EFI/Microsoft

# 删 NVRAM 中的 Windows 启动项
efibootmgr                           # 找到 Windows Boot Manager 的编号
efibootmgr -b 0003 -B                # 删掉
```

### 2.2 Btrfs subvolume for NixOS

```bash
mount /dev/nvme0n1p6 /mnt
btrfs subvolume create /mnt/@nix     # /nix
btrfs subvolume create /mnt/@root    # /
btrfs subvolume create /mnt/@home    # /home
cd /
umount /mnt
```

### 2.3 挂载并安装

从 NixOS ISO 启动：

```bash
mount -o noatime,compress=zstd,subvol=@root /dev/nvme0n1p6 /mnt
mkdir -p /mnt/{home,nix,boot}
mount -o noatime,compress=zstd,subvol=@home /dev/nvme0n1p6 /mnt/home
mount -o noatime,compress=zstd,subvol=@nix /dev/nvme0n1p6 /mnt/nix
mount /dev/nvme0n1p1 /mnt/boot     # 共享 ESP

nixos-generate-config --root /mnt
```

`nixos-generate-config` 产生两个文件：

| 文件 | 作用 |
|---|---|
| `hardware-configuration.nix` | 硬件扫描：分区 UUID、文件系统、内核模块。不要手动改 |
| `configuration.nix` | 系统配置模板，你编辑这个 |

编辑 `/mnt/etc/nixos/configuration.nix`：

```nix
{ config, pkgs, ... }:
{
  boot.loader = {
    efi.canTouchEfiVariables = true;
    efi.efiSysMountPoint = "/boot";
    systemd-boot.enable = true;
    systemd-boot.configurationLimit = 10;  # ESP 不会被旧内核塞满
  };

  networking.hostName = "nixos";
  networking.networkmanager.enable = true;
  time.timeZone = "Asia/Shanghai";

  users.users.username = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" ];
    uid = 1000;   # 和 Arch 一致
  };

  environment.systemPackages = with pkgs; [ vim git curl ];

  system.stateVersion = "25.11";
}
```

```bash
nixos-install       # 过程中设 root 密码
reboot
```

`nixos-install` 干了：1) 复制 Nix 包管理器到 `/mnt/nix/store`；2) 根据 `configuration.nix` 构建系统；3) 下载/编译安装到 `/nix/store`；4) 在共享 ESP 创建 `EFI/nixos/`，放内核和 initrd；5) 注册 NVRAM 启动项。

### 2.4 引导协作

开机按 F12 会看到 `arch` 和 `NixOS` 两个 UEFI 启动项。

想要统一菜单：

```bash
# A：Arch 的 GRUB 检测 NixOS
sudo pacman -S os-prober
sudo grub-mkconfig -o /boot/grub/grub.cfg

# B：换 rEFInd，自动扫描两个系统
sudo pacman -S refind
sudo refind-install

# C：不折腾，开机 F12 选
```

---

## 3. 桌面环境：niri（Arch） + Hyprland（NixOS）

niri 和 Hyprland 都是 Wayland compositor，不依赖 KDE/GNOME。但它们只管窗口和渲染——剩下的组件你选什么装什么。

### 3.1 WM 需要搭配的组件

| 功能 | 做什么 | 选哪个 |
|---|---|---|
| 状态栏 | 时间、网络、音量 | waybar |
| 启动器 | 快捷键弹出搜索框 | fuzzel |
| 通知 | 桌面通知 | mako |
| 锁屏 | 合盖/离开锁定 | swaylock（niri）/ hyprlock（Hyprland） |
| 壁纸 | 桌面背景 | swaybg / hyprpaper |
| polkit agent | GUI 密码框（装软件时弹的） | polkit-kde-agent（不依赖 KDE） |
| 剪贴板 | 复制历史 | cliphist + wl-clipboard |
| 截图 | 快捷键截图 | grim + slurp |
| 输入法 | 中文 | fcitx5 |
| 音频 | 系统音频 | pipewire + wireplumber |

### 3.2 Arch + niri

niri 的特色：**可滚动的水平平铺**——窗口在水平方向无限延伸，滚屏切窗口，上下切工作区。Rust 写的，闲置 ~500MB。

```bash
sudo pacman -S niri fuzzel alacritty waybar mako \
    swaybg wl-clipboard cliphist grim slurp \
    polkit-kde-agent xwayland-satellite

# 如果要登录管理器
sudo pacman -S sddm
sudo systemctl enable sddm
```

`xwayland-satellite` 替代 `xorg-xwayland`，按需启动（只在打开 X11 应用时跑），省资源。

装完 SDDM 选 niri，或 TTY 输入 `niri-session`。空白灰屏，`Mod+D` 出 fuzzel，`Mod+Return` 出终端。

**`~/.config/niri/config.kdl`**（KDL 语法）：

```kdl
prefer-no-csd

input {
    keyboard {
        xkb { layout "us"; }
        repeat-delay 300
        repeat-rate 50
    }
    focus-follows-mouse max-scroll-amount="0%"
}

output "eDP-1" { mode "1920x1080@60"; scale 1.0; }

window-rule {
    geometry-corner-radius 12
    clip-to-geometry true
    open-maximized true
}

layout {
    gaps 8
    border { width 2; }
    focus-ring { off; }
    default-column-width { proportion 0.5; }
    center-focused-column "on-overflow"
    always-center-single-column
}

spawn-at-startup "xwayland-satellite"
spawn-at-startup "waybar"
spawn-at-startup "mako"
spawn-at-startup "/usr/lib/polkit-kde-authentication-agent-1"
spawn-at-startup "wl-paste" "--watch" "cliphist" "store"

binds {
    Mod+Return { spawn "alacritty"; }
    Mod+D { spawn "fuzzel"; }
    Mod+Q { close-window; }
    Mod+F { maximize-column; }
    Mod+Shift+E { quit; }

    Mod+H { focus-column-left; }
    Mod+L { focus-column-right; }
    Mod+J { focus-window-down; }
    Mod+K { focus-window-up; }

    Mod+Shift+H { move-column-left; }
    Mod+Shift+L { move-column-right; }

    Mod+1 { focus-workspace 1; }
    Mod+2 { focus-workspace 2; }
    Mod+3 { focus-workspace 3; }
    Mod+Shift+1 { move-column-to-workspace 1; }

    Mod+Shift+R { spawn "niri" "msg" "reload-config"; }

    Print { screenshot; }
    Ctrl+Print { screenshot-screen; }
    Alt+Print { screenshot-window; }
}
```

验证配置：`niri validate`。

**waybar 最小配置**（`~/.config/waybar/config`）：

```jsonc
{
    "layer": "top", "position": "top", "height": 32,
    "modules-left": ["niri/workspaces"],
    "modules-center": ["clock"],
    "modules-right": ["network", "pulseaudio", "battery", "tray"],
    "niri/workspaces": { "format": "{icon}", "all-outputs": false }
}
```

waybar 需要 >= 0.11.0 才有 `niri/workspaces` 模块。太旧的话换 `waybar-git`（AUR）。

### 3.3 NixOS + Hyprland

Hyprland 动画、圆角、模糊见长。NixOS 上最惯用的方式：flake + Home Manager，因为 nixpkgs stable 的 Hyprland 版本通常滞后，flake 能跟最新。

**启用 flake**（在 `configuration.nix` 中）：

```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
```

`/etc/nixos/flake.nix`：

```nix
{
  description = "NixOS + Hyprland";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    hyprland.url = "github:hyprwm/Hyprland";
  };

  outputs = { nixpkgs, home-manager, hyprland, ... }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    nixosConfigurations.nixos = nixpkgs.lib.nixosSystem {
      inherit system;
      modules = [
        ./configuration.nix
        hyprland.nixosModules.default
        home-manager.nixosModules.home-manager
        {
          home-manager = {
            useGlobalPkgs = true;
            useUserPackages = true;
            users.username = import ./home.nix;
          };
        }
      ];
    };
  };
}
```

在 `configuration.nix` 中加：

```nix
programs.hyprland.enable = true;
```

`/etc/nixos/home.nix`（Home Manager 配置）：

```nix
{ pkgs, ... }: {
  wayland.windowManager.hyprland = {
    enable = true;
    package = null;        # 继承 NixOS 系统模块提供的包
    portalPackage = null;

    settings = {
      "$mod" = "SUPER";

      monitor = [ "eDP-1,1920x1080@60,auto,1" ];

      input = {
        kb_layout = "us";
        follow_mouse = 1;
        touchpad.natural_scroll = true;
      };

      general = {
        gaps_in = 5;
        gaps_out = 10;
        border_size = 2;
        "col.active_border" = "rgb(cba6f7)";
        "col.inactive_border" = "rgb(313244)";
      };

      decoration = {
        rounding = 10;
        blur = { enabled = true; size = 3; passes = 1; };
      };

      animations = {
        enabled = true;
        bezier = "myBezier, 0.05, 0.9, 0.1, 1.05";
        animation = [
          "windows, 1, 7, myBezier"
          "workspaces, 1, 6, default"
        ];
      };

      exec-once = [
        "waybar"
        "mako"
        "/usr/lib/polkit-kde-authentication-agent-1"
        "wl-paste --watch cliphist store"
        "swaybg -m fill -i ~/Pictures/wallpaper.jpg"
      ];

      bind = [
        "$mod, Return, exec, alacritty"
        "$mod, D, exec, fuzzel"
        "$mod, Q, killactive"
        "$mod, F, fullscreen"
        "$mod, H, movefocus, l"
        "$mod, L, movefocus, r"
        "$mod, J, movefocus, d"
        "$mod, K, movefocus, u"
        "$mod SHIFT, H, movewindow, l"
        "$mod SHIFT, L, movewindow, r"
      ] ++ (
        builtins.concatLists (builtins.genList (i: let
          ws = toString (i + 1); key = toString (i + 1);
        in [
          "$mod, ${key}, workspace, ${ws}"
          "$mod SHIFT, ${key}, movetoworkspacesilent, ${ws}"
        ]) 9)
      );

      bindm = [
        "$mod, mouse:272, movewindow"
        "$mod, mouse:273, resizewindow"
      ];
    };
  };

  home.packages = with pkgs; [
    alacritty fuzzel waybar mako swaybg
    wl-clipboard cliphist grim slurp
    libsForQt5.polkit-kde-agent
  ];

  gtk = { enable = true; theme.name = "Adwaita-dark"; };
}
```

应用：

```bash
sudo nixos-rebuild switch --flake /etc/nixos#nixos
```

### 3.4 两个 WM 不冲突

- **不同系统**：一个在 Arch 分区上，一个在 NixOS 分区上，互不可见
- **同一 ESP**：ESP 只管启动，不管用户配置
- **同一显示器**：只有你选择启动的系统里的 WM 在运行

### 3.5 装完后的检查

```bash
echo $XDG_SESSION_TYPE          # 应该输出 wayland
glxinfo | grep "OpenGL renderer" # 看到你的 GPU，不是 llvmpipe
pactl info | grep "Server Name"  # 看到 PulseAudio (on PipeWire)
```

如果 `glxinfo` 输出 `llvmpipe`（软件渲染），GPU 驱动没装对。Intel/AMD 一般不需要额外操作，NVIDIA 需要 `nvidia` 驱动。

---

## 4. 维护

### 4.1 透明压缩效果

```bash
sudo pacman -S compsize
sudo compsize /
# 输出示例：
# Type    Perc   Disk Usage  Uncompressed
# zstd    75%    8.2G        10.8G
```

### 4.2 Swap（Btrfs 交换文件）

Btrfs 上 swap 必须 NOCOW、无压缩、不在被快照的子卷中。最简单用 `btrfs filesystem mkswapfile`：

```bash
sudo btrfs subvolume create /swap
sudo chattr +C /swap
sudo btrfs filesystem mkswapfile --size 8g /swap/swapfile
sudo swapon /swap/swapfile
```

`/etc/fstab` 加：

```
/swap/swapfile  none  swap  defaults  0  0
```

### 4.3 Btrfs scrub — 数据完整性

磁盘可能静默损坏数据（bit rot）。Btrfs 存了校验和，scrub 重新读所有数据、重算校验和、对比：

```bash
sudo btrfs scrub start /
sudo btrfs scrub status /
```

每月自动跑：

```bash
sudo systemctl enable --now btrfs-scrub@-.timer
```

### 4.4 NixOS 垃圾回收

```bash
sudo nix-collect-garbage -d
sudo nix-store --optimise
```

或自动：

```nix
nix.gc = { automatic = true; dates = "weekly"; options = "--delete-older-than 7d"; };
```

---

## 5. 常见坑

| 问题 | 原因 | 解决方法 |
|---|---|---|
| ESP 写满 | NixOS 多代内核积累 | 设 `configurationLimit = 10`，`nix-collect-garbage -d` |
| 启动项丢失 | 某个系统更新覆盖了 BootOrder | `efibootmgr -o 0001,0002`；条目没了就 `efibootmgr --create` |
| fstab 的 subvolid | genfstab 写了 `subvolid=256` | 装完立即编辑 fstab 删掉 |
| 双系统时间差 | 一个用 localtime 一个 UTC | `timedatectl set-local-rtc 0` |
| Windows 删了后 GRUB 还有 Windows 条目 | `/boot/grub/grub.cfg` 缓存 | `sudo grub-mkconfig -o /boot/grub/grub.cfg` |
| 共享分区权限 | 两系统 UID 不同 | 在 NixOS 上设 `users.users.name.uid = 1000` |
| llvmpipe 软件渲染 | GPU 驱动没装 | Intel/AMD 确认装 `mesa`，NVIDIA 装 `nvidia` |

---

## 6. 关键概念速查

| 概念 | 一句话 |
|---|---|
| UEFI | 现代固件标准，从 ESP 的 FAT32 分区加载 .efi 文件 |
| ESP | EFI System Partition，FAT32，所有 OS 共享，放 .efi 文件 |
| NVRAM | 存储 UEFI 启动项和 BootOrder 的非易失性内存 |
| GPT | 现代分区表：128 分区、>2TB、有备份 |
| Btrfs | CoW 文件系统，支持 subvolume、快照、透明压缩 |
| CoW | 写时复制——改文件写新块，旧块保留，是快照的基础 |
| subvolume | Btrfs 分区内逻辑卷，共享物理空间但可独立快照/挂载 |
| snapper | 自动化 Btrfs 快照管理工具 |
| scrub | Btrfs 校验和数据完整性检查 |
| DE vs WM | DE 是全家桶，WM 管窗口和渲染，剩下的你拼 |
| niri | 可滚动水平平铺 WM（Rust） |
| Hyprland | 动画圆角模糊 WM（C++） |

---

## 7. 参考

- [Arch Wiki - Installation Guide](https://wiki.archlinux.org/title/Installation_guide)
- [Arch Wiki - Dual boot with Windows](https://wiki.archlinux.org/title/Dual_boot_with_Windows)
- [Arch Wiki - Btrfs](https://wiki.archlinux.org/title/Btrfs)
- [Arch Wiki - Snapper](https://wiki.archlinux.org/title/Snapper)
- [Arch Wiki - GRUB](https://wiki.archlinux.org/title/GRUB)
- [NixOS Manual](https://nixos.org/manual/nixos/stable/#ch-installation)
- [Hyprland Wiki - Nix](https://wiki.hypr.land/Nix/)
- [niri Getting Started](https://github.com/niri-wm/niri/wiki/Getting-Started)
- [pacstrap(8)](https://man.archlinux.org/man/pacstrap.8.en)
- [efibootmgr(8)](https://man.archlinux.org/man/efibootmgr.8)
- [hallmasonc/snapper-rollback-guide](https://github.com/hallmasonc/snapper-rollback-guide)
- [MateuszMielniczuk/arch-linux-snapshots](https://github.com/MateuszMielniczuk/arch-linux-snapshots)
