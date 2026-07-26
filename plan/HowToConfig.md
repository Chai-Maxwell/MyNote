# CachyOS + niri + 终端环境配置指南

> ThinkPad T14s Gen 3 · Intel i7-1270P · Iris Xe Graphics · CachyOS Rolling

---

## 目录

1. [系统概览](#1-系统概览)
2. [CachyOS 系统配置](#2-cachyos-系统配置)
3. [niri 窗口管理器](#3-niri-窗口管理器)
4. [终端模拟器 (kitty)](#4-终端模拟器-kitty)
5. [Shell 配置 (fish)](#5-shell-配置-fish)
6. [Starship 提示符](#6-starship-提示符)
7. [桌面 Shell (noctalia)](#7-桌面-shell-noctalia)
8. [输入法 (fcitx5)](#8-输入法-fcitx5)
9. [Wayland 环境变量](#9-wayland-环境变量)
10. [字体与主题](#10-字体与主题)
11. [Steam / Proton 游戏](#11-steam--proton-游戏)
12. [Fastfetch 配置](#12-fastfetch-配置)
13. [GTK / Qt 外观](#13-gtk--qt-外观)
14. [常见问题排查](#14-常见问题排查)

---

## 1. 系统概览

| 组件 | 详情 |
|------|------|
| **硬件** | ThinkPad T14s Gen 3 (21BSS31H00) |
| **CPU** | Intel Core i7-1270P (8P+8E) @ 4.80 GHz |
| **GPU** | Intel Iris Xe Graphics (i915 驱动) |
| **内存** | 31 GiB |
| **磁盘** | 928 GiB, btrfs |
| **屏幕** | 1920×1200 @ 60Hz, 1.25× 缩放 |
| **OS** | CachyOS Linux (Arch-based, rolling) |
| **内核** | linux-cachyos (7.1.3-2-cachyos) |
| **显示协议** | Wayland |
| **混成器** | niri 26.04 (scrollable-tiling) |
| **XWayland** | xwayland-satellite 0.8.1 |
| **Shell** | fish (登录 shell) |
| **终端** | kitty |
| **Locale** | zh_CN.UTF-8 |

---

## 2. CachyOS 系统配置

### 2.1 软件包管理

CachyOS 在 Arch 仓库基础上增加了 `cachyos-extra-v3`（x86_64_v3 优化包）。AUR 助手使用 `paru`。

```bash
# 系统更新（务必用 -Syu 而非 -Sy，避免包数据库过期）
sudo pacman -Syu

# paru（自动检测代理）
paru <package>

# 清理孤儿包
sudo pacman -Rns $(pacman -Qtdq)
```

### 2.2 关键系统包

```
cachyos-niri-noctalia 1.1.2-1    # CachyOS 集成包（niri + noctalia）
niri 26.04-1.1                    # 窗口管理器
noctalia-qs 0.0.12-1.1            # noctalia CLI 接口
noctalia-shell 4.7.7-3            # 桌面 Shell
xwayland-satellite 0.8.1-2        # XWayland 兼容层
proton-cachyos-slr 1:11.0         # CachyOS 定制 Proton
```

### 2.3 指纹识别 (fprintd)

```bash
# CachyOS 默认已安装 fprintd，PAM 自动配置无需手动修改
# 注册指纹
fprintd-enroll -f right-index-finger maxwell

# 验证
fprintd-verify maxwell

# 列出已注册
fprintd-list maxwell

# 支持的手指名称: left-thumb, left-index-finger, left-middle-finger,
#   left-ring-finger, left-little-finger（及 right-* 系列）
```

### 2.4 fish 脚本中的 paru 代理封装

`~/.config/fish/config.fish` 中的 `paru` 函数自动检测本地 SOCKS5 代理 (`127.0.0.1:7897`)：

```fish
function paru
    if ss -tln | grep -q ':7897'
        set -gx ALL_PROXY socks5://127.0.0.1:7897
        command paru $argv
        set -e ALL_PROXY
    else
        command paru $argv
    end
end
```

---

## 3. niri 窗口管理器

### 3.1 配置文件结构

```
~/.config/niri/
├── config.kdl          # 入口（include 子文件）
└── cfg/
    ├── animation.kdl   # 动画
    ├── autostart.kdl   # 自启动
    ├── display.kdl     # 显示器
    ├── input.kdl       # 输入设备
    ├── keybinds.kdl    # 快捷键
    ├── layout.kdl      # 布局
    ├── misc.kdl        # 杂项（环境变量、光标、调试）
    └── rules.kdl       # 窗口规则
```

### 3.2 主配置 (`config.kdl`)

```kdl
include "./cfg/animation.kdl"
include "./cfg/autostart.kdl"
include "./cfg/keybinds.kdl"
include "./cfg/input.kdl"
include "./cfg/display.kdl"
include "./cfg/layout.kdl"
include "./cfg/rules.kdl"
include "./cfg/misc.kdl"

environment{
    GTK_IM_MODULE "fcitx"
    QT_IM_MODULE "fcitx"
    XMODIFIERS "@im=fcitx"
    INPUT_METHOD "fcitx"
    SDL_IM_MODULE "fcitx"
}

spawn-at-startup "fcitx5" "-d"
```

### 3.3 自启动 (`autostart.kdl`)

```kdl
spawn-sh-at-startup "qs -c noctalia-shell"
```

### 3.4 布局 (`layout.kdl`)

```kdl
layout {
    gaps 16
    center-focused-column "never"
    background-color "transparent"  # 让 noctalia-shell 绘制壁纸
    preset-column-widths {
        proportion 0.33333
        proportion 0.5
        proportion 0.66667
    }
    focus-ring {
        width 2
        active-color "#c35e0a"  # 橙色，匹配 Gruvbox Material 主题
    }
    struts {}
}
```

### 3.5 输入设备 (`input.kdl`)

```kdl
input {
    keyboard {
        xkb { /* layout 留空，默认 us */ }
        numlock
    }
    touchpad {
        tap                  # 点击即点按
        natural-scroll       # macOS 风格自然滚动
    }
    focus-follows-mouse
    workspace-auto-back-and-forth
}
```

### 3.6 快捷键 (`keybinds.kdl`) — 完整速查表

#### 应用启动

| 快捷键 | 动作 |
|--------|------|
| `Mod+Return` | 打开终端 (kitty) |
| `Mod+Space` | 应用启动器 (noctalia) |
| `Mod+B` | 浏览器 (Firefox) |
| `Mod+E` | 文件管理器 (Nautilus) |
| `Mod+Alt+L` | 锁屏 |
| `Mod+Shift+Q` | 会话菜单（关机/重启/休眠） |
| `Mod+Shift+Escape` | 显示快捷键覆盖层 |

#### 窗口聚焦

| 快捷键 | 动作 |
|--------|------|
| `Mod+H` / `Mod+Left` | 聚焦左侧列 |
| `Mod+L` / `Mod+Right` | 聚焦右侧列 |
| `Mod+K` / `Mod+Up` | 聚焦上方窗口 |
| `Mod+J` / `Mod+Down` | 聚焦下方窗口 |
| `Mod+Home` | 聚焦第一列 |
| `Mod+End` | 聚焦最后一列 |

#### 窗口移动

| 快捷键 | 动作 |
|--------|------|
| `Mod+Ctrl+H` / `Mod+Ctrl+Left` | 向左移动列 |
| `Mod+Ctrl+L` / `Mod+Ctrl+Right` | 向右移动列 |
| `Mod+Ctrl+K` / `Mod+Ctrl+Up` | 向上移动窗口 |
| `Mod+Ctrl+J` / `Mod+Ctrl+Down` | 向下移动窗口 |

#### 显示器导航

| 快捷键 | 动作 |
|--------|------|
| `Mod+Shift+方向键` | 聚焦相邻显示器 |
| `Mod+Shift+Ctrl+方向键` | 移动列到相邻显示器 |

#### 工作区

| 快捷键 | 动作 |
|--------|------|
| `Mod+1..9` | 切换到工作区 1–9 |
| `Mod+Tab` | 切换到上一个工作区 |
| `Mod+Ctrl+1..9` | 移动列到工作区 1–9 |
| `Mod+滚轮上/下` | 工作区切换 (150ms 冷却) |
| `Mod+Ctrl+滚轮上/下` | 移动列到相邻工作区 |

#### 布局控制

| 快捷键 | 动作 |
|--------|------|
| `Mod+F` | 最大化列 |
| `Mod+C` | 居中当前列 |
| `Mod+Ctrl+C` | 居中所有可见列 |
| `Mod+Minus` / `Mod+Equal` | 列宽 -10% / +10% |
| `Mod+Shift+Minus` / `Mod+Shift+Equal` | 窗口高度 -10% / +10% |

#### 模式切换

| 快捷键 | 动作 |
|--------|------|
| `Mod+Q` | 关闭窗口 |
| `Mod+T` | 切换浮动窗口 |
| `Mod+Ctrl+F` | 全屏 |
| `Mod+W` | 切换标签页显示 |
| `Mod+O` | 概览模式 |

#### 截图

| 快捷键 | 动作 |
|--------|------|
| `Ctrl+Shift+1` | 区域截图 |
| `Ctrl+Shift+2` | 全屏截图 |
| `Ctrl+Shift+3` | 窗口截图 |

#### 媒体与亮度 (通过 noctalia IPC)

| 快捷键 | 动作 |
|--------|------|
| `XF86AudioRaiseVolume` | 音量+ |
| `XF86AudioLowerVolume` | 音量- |
| `XF86AudioMute` | 静音 |
| `XF86AudioMicMute` | 麦克风静音 |
| `XF86AudioNext/Prev` | 上/下一首 |
| `XF86AudioPlay/Pause` | 播放/暂停 |
| `XF86MonBrightnessUp/Down` | 亮度+/- |

#### 电源 / 紧急

| 快捷键 | 动作 |
|--------|------|
| `Mod+Shift+P` | 关闭显示器 |
| `Ctrl+Alt+Delete` | 退出 niri |
| `Mod+Escape` | 切换快捷键禁用（用于全屏程序劫持快捷键时恢复控制） |

### 3.7 窗口规则 (`rules.kdl`)

```kdl
window-rule {
    geometry-corner-radius 8   # 所有窗口圆角 8px
    clip-to-geometry true
}

# Steam 好友列表等子窗口浮出
window-rule {
    match app-id="steam"
    exclude title=r#"^[Ss]team$"#
    open-floating true
}

# Steam 通知弹窗（右下角）
window-rule {
    match app-id="steam" title=r#"^notificationtoasts_\d+_desktop$"#
    default-floating-position x=10 y=10 relative-to="bottom-right"
    open-focused false
}

# noctalia 壁纸层置入背景
layer-rule {
    match namespace="^noctalia-wallpaper*"
    place-within-backdrop true
}
```

### 3.8 杂项 (`misc.kdl`)

```kdl
prefer-no-csd                                       # 优先无客户端装饰
screenshot-path null                                # 截图不自动保存到磁盘

environment {
    ELECTRON_OZONE_PLATFORM_HINT "auto"             # Electron 应用自动选择 Wayland
    QT_QPA_PLATFORM "wayland"                       # Qt 应用使用 Wayland
    QT_QPA_PLATFORMTHEME "gtk3"                     # Qt 使用 GTK3 主题
    QT_WAYLAND_DISABLE_WINDOWDECORATION "1"         # Qt 禁用自绘标题栏
    XDG_CURRENT_DESKTOP "niri"
    XDG_SESSION_TYPE "wayland"
}

cursor {
    xcursor-theme "capitaine-cursors"
    xcursor-size 24
}

debug {
    honor-xdg-activation-with-invalid-serial        # 允许 noctalia 通知和窗口激活
}

hotkey-overlay {
    skip-at-startup                                 # 启动时不显示快捷键覆盖层
}
```

### 3.9 显示器 (`display.kdl`)

```kdl
# 内置屏幕（1920×1200）由 niri 自动检测
/- output "DP-1" {
    mode "2560x1440@359.979"    # 外接显示器示例（已注释）
    scale 1
}
```

### 3.10 动画 (`animation.kdl`)

| 动画 | 类型 | 参数 |
|------|------|------|
| 工作区切换 | spring | damping 1.0, stiffness 1000 |
| 窗口打开 | curve | 200ms ease-out-quad |
| 窗口关闭 | curve | 200ms ease-out-cubic |
| 视图水平移动 | spring | damping 1.0, stiffness 900 |
| 窗口移动 | spring | damping 1.0, stiffness 800 |
| 窗口缩放 | spring | damping 1.0, stiffness 1000 |
| 配置通知 | spring | damping 0.6, stiffness 1200 |
| 截图 UI | curve | 300ms ease-out-quad |
| 概览模式 | spring | damping 1.0, stiffness 900 |

### 3.11 重载配置

```bash
# 正确的重载命令（不是 reload-config）
niri msg action load-config-file
```

---

## 4. 终端模拟器 (kitty)

**配置文件:** `~/.config/kitty/kitty.conf`

kitty 配置几乎全部保持默认，仅自定义了以下 6 项：

```conf
font_family      JetBrainsMono Nerd Font Mono
bold_font        auto
italic_font      auto
bold_italic_font auto
font_size 8.0
background #fcf6e5
foreground #000000
```

### 4.1 实用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+C` | 复制 |
| `Ctrl+Shift+V` | 粘贴 |
| `Ctrl+Shift++` | 增大字号 |
| `Ctrl+Shift+-` | 减小字号 |
| `Ctrl+Shift+Backspace` | 恢复默认字号 |
| 选中文本 + 中键 | 粘贴选中内容 |

### 4.2 选字体

```bash
# 运行 kitten 交互式选字体
kitty +kitten choose-fonts
```

---

## 5. Shell 配置 (fish)

**配置文件:** `~/.config/fish/config.fish`

```fish
# 载入 CachyOS 分发的 fish 配置
source /usr/share/cachyos-fish-config/cachyos-config.fish

# Starship 提示符 (gruvbox-rainbow)
starship init fish | source

# paru 代理自动检测
function paru
    if ss -tln | grep -q ':7897'
        set -gx ALL_PROXY socks5://127.0.0.1:7897
        command paru $argv
        set -e ALL_PROXY
    else
        command paru $argv
    end
end
```

### 5.1 PATH 配置

`~/.config/fish/fish_variables` 中自动维护的用户路径：

```
/home/maxwell/.cargo/bin
/home/maxwell/.local/bin
```

### 5.2 注意事项

- **登录 shell 是 fish 而非 zsh**。之前配置 starship 时在 `.zshrc` 中修改无效，因为系统用的是 fish。
- CachyOS 的 zsh 配置 (`/usr/share/cachyos-zsh-config/cachyos-config.zsh`) 硬编码了 Powerlevel10k，如果切换到 zsh 需手动覆盖。

---

## 6. Starship 提示符

**安装:** `sudo pacman -S starship`

**配置文件:** `~/.config/starship.toml`

- 使用 **gruvbox_dark** 调色板
- Powerline 风格分隔符 (`` / ``)
- 多语言版本显示（C, C++, Rust, Go, Node.js, Bun, PHP, Java, Kotlin, Haskell, Python）
- 显示 Docker context、Conda/Pixi 环境

### 6.1 可用的预设主题

```bash
starship preset gruvbox-rainbow -o ~/.config/starship.toml --force
starship preset catppuccin-powerline -o ~/.config/starship.toml --force
starship preset tokyo-night -o ~/.config/starship.toml --force
starship preset pastel-powerline -o ~/.config/starship.toml --force
```

### 6.2 当前 gruvbox_dark 调色板

| 颜色 | 色值 |
|------|------|
| fg0 (前景) | `#fbf1c7` |
| bg1 (背景1) | `#3c3836` |
| bg3 (背景3) | `#665c54` |
| blue | `#458588` |
| aqua | `#689d6a` |
| green | `#98971a` |
| orange | `#d65d0e` |
| purple | `#b16286` |
| red | `#cc241d` |
| yellow | `#d79921` |

---

## 7. 桌面 Shell (noctalia)

### 7.1 基础架构

noctalia-shell 是 niri 的 QML 桌面 Shell，提供面板、启动器、锁屏、壁纸、系统托盘等功能。

**启动方式:** 由 `autostart.kdl` 中的 `spawn-sh-at-startup "qs -c noctalia-shell"` 拉起。

**IPC 接口:** 所有交互通过 `qs -c noctalia-shell ipc call <子系统> <动作>` 完成。

### 7.2 配置文件

```
~/.config/noctalia/
├── settings.json       # 完整设置（22KB+, 59 配置版本）
├── colors.json         # 当前配色覆盖
├── colorschemes/       # 可选配色方案
└── plugins/
```

### 7.3 当前配色 (Gruvbox Material Light)

`~/.config/noctalia/colors.json`:

| 语义色 | 色值 | 用途 |
|--------|------|------|
| `mSurface` | `#f2e5bc` | 表面背景 |
| `mSurfaceVariant` | `#ebdbb2` | 变体表面（选中态） |
| `mPrimary` | `#6c782e` | 主色调（橄榄绿） |
| `mSecondary` | `#c35e0a` | 次色调（橙色） |
| `mTertiary` | `#4c7a5d` | 第三色调（苔绿） |
| `mError` | `#c14a4a` | 错误/警告 |
| `mHover` | `#45707a` | 悬停态 |
| `mOnSurface` | `#4f3829` | 表面文字色 |
| `mOutline` | `#d5c4a1` | 边框色 |

### 7.4 关键设置

**应用启动器图标模式:**
- `tabler` → 所有应用使用 Tabler 图标字体（无应用专属图标）
- `native` → 从系统图标主题（Adwaita → hicolor）解析 `.desktop` Icon= 字段
- **当前: `native`**

**面板配置:**
- 位置: 左侧 (`"position": "left"`)
- 类型: 带框 (`"barType": "framed"`)
- 密度: mini
- 圆角: 12px (`"frameRadius": 12`)
- 半透明: 93% 不透明度

**dock:**
- 位置: 右侧
- 模式: 自动隐藏

**暗色模式:**
- 当前: 关闭（Light 模式）
- 配色方案: `"predefinedScheme": "Gruvbox Material"`
- 色温自动调整: 开启（日间 6500K → 夜间 4000K）

### 7.5 已启用的 noctalia 功能

- 应用启动器（应用/窗口/设置/会话搜索）
- 左侧 Bar（启动器、时钟、系统监控、壁纸选择、暗色模式）
- 右侧 Dock（自动隐藏）
- 锁屏（倒计时、会话按钮）
- 会话菜单（锁屏/挂起/休眠/重启/关机/UEFI）
- 通知历史
- 天气（深圳）
- 夜间色温
- 剪贴板（文本 + 图片，wl-clipboard + cliphist）

---

## 8. 输入法 (fcitx5)

### 8.1 基本配置

**启动:** niri `spawn-at-startup "fcitx5" "-d"`

**配置目录:** `~/.config/fcitx5/`

**输入方案:** 默认 us 键盘 + pinyin（中文拼音）

### 8.2 主题 — Gruvbox Material

**主题目录:** `~/.local/share/fcitx5/themes/gruvbox-dark/`

```
gruvbox-dark/
├── theme.conf     # 颜色映射到 Gruvbox Material 色值
├── panel.svg      # 候选窗背景（rx="8" 圆角）
├── highlight.svg  # 选中项背景（rx="8" 圆角）
├── arrow.png      # 菜单箭头（从 catppuccin 复制）
└── radio.png      # 菜单单选按钮（从 catppuccin 复制）
```

**颜色映射:**

| 元素 | 色值 | Gruvbox 语义 |
|------|------|-------------|
| 候选窗背景 | `#f2e5bc` | Surface |
| 候选文字 | `#4f3829` | OnSurface |
| 选中候选背景 | `#ebdbb2` | SurfaceVariant |
| 拼音输入文字 | `#6c782e` | Primary |
| 拼音背景 | `#fbf1c7` | SurfaceDim |
| 菜单悬停 | `#45707a` | Hover |
| 分隔线 | `#d5c4a1` | Outline |

**圆角实现:** fcitx5 的圆角通过 SVG 文件中的 `rx="8"` 属性实现，**与 niri compositor 的 `geometry-corner-radius` 无关**（niri 不支持为 input-method popup 设置 `layer-rule` 圆角）。

### 8.3 主题切换

```bash
# 编辑 ~/.config/fcitx5/conf/classicui.conf
# Theme=gruvbox-dark

# 重启 fcitx5
fcitx5 -r -d
```

### 8.4 安装的主题

- catppuccin-fcitx5-git（AUR）— 多口味多色调主题
- gruvbox-dark（手动创建）— 匹配 Noctalia Gruvbox Material

---

## 9. Wayland 环境变量

### 9.1 XDG_DATA_DIRS 修复

niri session 默认不设置 `XDG_DATA_DIRS`，导致应用图标无法解析。需要**三个位置**都设置：

**1) systemd user 环境 drop-in (`~/.config/environment.d/xdg.conf`):**
```
XDG_DATA_DIRS=/usr/local/share:/usr/share
```

**2) Shell profile (`~/.profile`):**
```bash
export XDG_DATA_DIRS="/usr/local/share:/usr/share"
```

**3) 立即可用（不重启 session）:**
```bash
systemctl --user set-environment XDG_DATA_DIRS=/usr/local/share:/usr/share
```

### 9.2 完整环境变量总和

以下是运行 niri session 时生效的关键环境变量：

| 变量 | 值 |
|------|-----|
| `XDG_SESSION_TYPE` | `wayland` |
| `XDG_CURRENT_DESKTOP` | `niri` |
| `XDG_DATA_DIRS` | `/usr/local/share:/usr/share` |
| `WAYLAND_DISPLAY` | `wayland-1` |
| `QT_QPA_PLATFORM` | `wayland` |
| `QT_QPA_PLATFORMTHEME` | `gtk3` |
| `QT_WAYLAND_DISABLE_WINDOWDECORATION` | `1` |
| `ELECTRON_OZONE_PLATFORM_HINT` | `auto` |
| `XCURSOR_THEME` | `capitaine-cursors` |
| `XCURSOR_SIZE` | `24` |
| `GTK_IM_MODULE` | `fcitx` |
| `QT_IM_MODULE` | `fcitx` |
| `XMODIFIERS` | `@im=fcitx` |
| `SDL_IM_MODULE` | `fcitx` |

### 9.3 niri session 启动链

```
SDDM → /usr/share/sddm/scripts/wayland-session
     → niri-session → systemd user services → niri.service
```

---

## 10. 字体与主题

### 10.1 字体

| 用途 | 字体 | 字号 |
|------|------|------|
| 终端 | JetBrainsMono Nerd Font Mono | 8pt |
| GTK3 界面 | Noto Sans | 10pt |
| noctalia 默认 | Adwaita Sans | 0.75× scale |
| noctalia 等宽 | monospace | 1× scale |

Nerd Font 字体安装在 `~/.local/share/fonts/` 下。

### 10.2 光标

- 主题: `capitaine-cursors`
- 大小: 24px
- 配置位置: niri `misc.kdl` 的 `cursor {}` 块

### 10.3 GTK 主题

**配置文件:** `~/.config/gtk-3.0/settings.ini`

```ini
[Settings]
gtk-application-prefer-dark-theme=true
gtk-cursor-theme-name=capitaine-cursors
gtk-font-name=Noto Sans 10
gtk-theme-name=adw-gtk3
```

### 10.4 图标主题

- 默认: Adwaita（由 `gsettings` 设置）
- Noctalia 原生图标模式通过图标主题链解析: Adwaita → AdwaitaLegacy → hicolor
- 更新图标缓存:
  ```bash
  for dir in /usr/share/icons/*/; do
    sudo gtk-update-icon-cache -f "$dir" 2>/dev/null
  done
  sudo update-desktop-database
  ```

---

## 11. Steam / Proton 游戏

### 11.1 关键兼容性信息

| 事项 | 说明 |
|------|------|
| Proton 版本 | 使用 `proton-cachyos-slr` 或 Proton 9.0+ |
| XWayland | 使用默认 XWayland 路径，不要设 `PROTON_ENABLE_WAYLAND=1` |
| fifo-v1 | niri 不支持该协议，开启 Wayland 原生会导致游戏冻结 |
| GPU | Intel Iris Xe 核显 — Gamescope 可用 |
| NVIDIA + niri | Gamescope 不可用（DMA-BUF 不兼容） |

### 11.2 Steam 客户端修复

```bash
# 临时修复（禁用 GPU 加速渲染）
steam -cef-disable-gpu

# 永久修复：Steam → 设置 → 界面 → 禁用"在 Web 视图中启用 GPU 加速渲染"
```

### 11.3 XWayland 剪贴板 Bug

xwayland-satellite 的剪贴板可能干扰游戏启动：

```bash
# 启动游戏前清空剪贴板
wl-copy --clear
# 然后启动游戏

# 永久修复：安装 git 版
paru -S xwayland-satellite-git
```

### 11.4 Rootful XWayland 回退方案

当 xwayland-satellite 不兼容时可以手动启动独立 Xwayland：

```bash
# 启动独立 Xorg server
Xwayland :1 &

# 在其中启动 i3（或任何 X11 WM）
env DISPLAY=:1 i3 &

# 在 X11 环境中启动 Steam
env DISPLAY=:1 steam
```

然后用 `Mod+Ctrl+F` 将 Xwayland 窗口全屏。

---

## 12. Fastfetch 配置

**配置文件:** `~/.config/fastfetch/config.jsonc`

```
logo: kitty 协议载入 ~/.config/fastfetch/omori.png (高度 32)
```

### 12.1 切换 Logo

```jsonc
// 使用 CachyOS 内置小 Logo
"logo": { "source": "CachyOS_small" }

// 可选内置 Logo: CachyOS, CachyOS_small, CachyOS_old_small

// 使用自定义 ASCII Logo 文件
"logo": { "type": "file", "source": "~/.config/fastfetch/my_logo.txt" }
```

### 12.2 生成默认配置

```bash
# 直接生成到 ~/.config/fastfetch/config.jsonc
fastfetch --gen-config-force
```

### 12.3 当前显示的模块

os, host, kernel, uptime, packages, shell, display, de, wm, wmtheme, theme, icons, font, cursor, terminal, terminalfont, cpu, gpu, memory, swap, disk, localip, battery, poweradapter, locale, colors

---

## 13. GTK / Qt 外观

### 13.1 MIME 关联 (`~/.config/mimeapps.list`)

```
inode/directory=org.gnome.Nautilus.desktop
x-scheme-handler/clash=clash-verge.desktop
x-scheme-handler/clash-verge=clash-verge.desktop
x-scheme-handler/claude-cli=claude-code-url-handler.desktop
```

**注意:** `inode/directory` 从 `kitty-open.desktop` 改为 `org.gnome.Nautilus.desktop`，修复 Steam "浏览本地文件" 功能。

```bash
xdg-mime default org.gnome.Nautilus.desktop inode/directory
```

### 13.2 COMSOL 桌面入口

`~/.local/share/applications/comsol-multiphysics-6.4.desktop`:
- 通过 kitty 启动以保留 URL 启动器检测
- `Terminal=false`（由 kitty 管理终端）

---

## 14. 常见问题排查

### 14.1 应用图标不显示

**症状:** noctalia 启动器中所有应用显示为通用图标。

**原因:** `XDG_DATA_DIRS` 未在 niri session 中设置。

**修复:** 参考 [第 9.1 节](#91-xdg_data_dirs-修复) 设置 `XDG_DATA_DIRS`，并确认 noctalia 的 `iconMode` 为 `"native"`。

### 14.2 Starship 提示符不生效

**症状:** 配置了 `.zshrc` 但提示符没有变化。

**原因:** 登录 shell 是 `fish` 而非 `zsh`。检查 `/etc/passwd`。

**修复:** 在 `~/.config/fish/config.fish` 中添加 `starship init fish | source`。

### 14.3 Steam 游戏黑屏/崩溃

**症状:** 通过 Steam 启动游戏后黑屏或异常退出。

**原因:** 旧版 Proton 与 xwayland-satellite 不兼容；或启用了 `PROTON_ENABLE_WAYLAND=1`。

**修复:**
1. 使用 `proton-cachyos-slr` 或 Proton 9.0+
2. 确保未设置 `PROTON_ENABLE_WAYLAND=1`
3. 禁用 Steam GPU 加速渲染
4. 启动前 `wl-copy --clear`
5. 如仍不兼容，使用 rootful XWayland 回退方案

### 14.4 pacman 包数据库过期

**症状:** `pacman -Sy <pkg>` 报 404。

**原因:** 仅同步数据库 (`-Sy`) 但未升级系统，导致包版本已被镜像移除。

**修复:** 始终使用 `sudo pacman -Syu` 而非 `sudo pacman -Sy`。

### 14.5 niri 快捷键被全屏应用劫持

**症状:** 全屏游戏/应用中无法使用 niri 快捷键。

**修复:** 按 `Mod+Escape`（`allow-inhibiting=false`）强制恢复快捷键控制。

### 14.6 fcitx5 候选窗无圆角

**原因:** niri 不支持为 input-method popup 设置 `layer-rule`。

**修复:** 通过 fcitx5 主题的 SVG 文件设置 `rx="8"` 实现圆角。

---

> 最后更新: 2026-07-22
> 基于 Claude Code 对话历史整理
