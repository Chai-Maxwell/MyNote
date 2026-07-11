# 从 Windows 删除 Visor 并恢复 GRUB

## 背景

安装了 [Visor-BootManager](https://github.com/IO-ZetZor/Visor-BootManager)，但 Visor 不识别 Ubuntu 的 GRUB，导致重启后只能进 Windows。现在决定删除 Visor，全部操作在 Windows 上完成。

## 操作步骤（全程在 Windows 上执行）

### 第 1 步: 下载 EasyUEFI

下载 [EasyUEFI](https://www.easyuefi.com/index-us.html) 免费版并安装。这个工具可以直接管理 UEFI 固件中的启动项（bcdedit 只能管理 Windows Boot Manager 内部的菜单，管不到 UEFI 固件层面）。

### 第 2 步: 恢复 Ubuntu 为默认启动项

打开 EasyUEFI → **"管理 EFI 启动项"**：

你会看到类似这样的列表：

```
Boot0001  Windows Boot Manager
Boot0002  ubuntu
Boot0003  Visor          ← 这是 Visor 加的
```

**情况 A: 能看到 "ubuntu" 条目**

1. 选中 **ubuntu** → 点 **"上移"** 移到第一位
2. 选中 **Visor** → 点 **"删除"**（红色按钮）
3. 重启，应该直接进入 GRUB 菜单正常启动 Ubuntu

**情况 B: 没有 "ubuntu" 条目（被 Visor 覆盖了）**

1. 点 **"创建新条目"**，类型选 **"Linux 或其他操作系统"**
2. 目标分区选择 **ESP**（通常是 100-500MB 的 FAT32 分区）
3. 点 **"浏览"**，找到 `\EFI\ubuntu\shimx64.efi`（因为你的 Secure Boot 开着）
4. 命名为 **"ubuntu"**，确定
5. 将新建的 ubuntu 条目**上移到第一位**
6. 选中 Visor → **删除**

### 第 3 步: 删除 Visor 文件

以管理员身份打开终端，选以下任一方法：

**方法 A: PowerShell（推荐）**

```powershell
mountvol Z: /s
Remove-Item -Path Z:\EFI\visor -Recurse -Force
```

**方法 B: 文件资源管理器（最简单）**

1. `mountvol Z: /s` 之后，打开文件资源管理器
2. 在地址栏输入 `Z:\EFI\`
3. 右键 `visor` 文件夹 → 删除（如果提示需要管理员权限，点继续）

**方法 C: del + rmdir**

```cmd
mountvol Z: /s
del /f /s /q Z:\EFI\visor\*.*
rmdir /s /q Z:\EFI\visor
```

确认 Visor 已删除：

```cmd
dir Z:\EFI\
```

不应该再看到 `visor` 目录。

### 第 4 步: 重启验证

```cmd
shutdown /r /t 0
```

重启后应该看到 GRUB 菜单，正常进入 Ubuntu。

---

## 备选：纯命令行方案（不用 EasyUEFI）

如果你不想装第三方工具，可以用 bcdedit。但 bcdedit **只能管理 Windows Boot Manager 内部的菜单**，无法直接操作 UEFI 固件的启动顺序。所以思路是：在 Windows Boot Manager 里临时加一个 Ubuntu 的入口，重启后通过它进 Ubuntu，然后在 Ubuntu 里用 `efibootmgr` 完成最终清理。

管理员终端执行：

```cmd
mountvol Z: /s

REM 添加 Ubuntu 链式加载项
bcdedit /copy {bootmgr} /d "Ubuntu"
```

记下输出的 GUID（如 `{abc-def-123}`），然后：

```cmd
bcdedit /set {你的GUID} path \EFI\ubuntu\shimx64.efi
bcdedit /set {fwbootmgr} displayorder {你的GUID} /addfirst
bcdedit /timeout 5
```

重启，在 Windows Boot Manager 蓝色菜单中选 "Ubuntu" 进入系统后，执行：

```bash
sudo rm -rf /boot/efi/EFI/visor
sudo efibootmgr | grep visor   # 记下编号
sudo efibootmgr -b 编号 -B
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ubuntu
```

---

## 总结

| 步骤 | 操作 |
|------|------|
| 1 | 下载 EasyUEFI |
| 2 | 把 ubuntu 移到第一位，删除 Visor 条目 |
| 3 | `mountvol Z: /s` → `rmdir /s Z:\EFI\visor` |
| 4 | 重启 |

推荐 EasyUEFI 方案，全程 Windows 上 5 分钟搞定，不需要任何 Linux 命令行。

---

## 附加知识: 让 Ubuntu 生成 UKI（如果以后还想用 Visor）

### 为什么 UKI 方案更好

Visor 的自动检测会扫描 `\EFI\Linux\*.efi`，如果你的 Ubuntu 内核以 UKI（Unified Kernel Image）形式放在这个路径，Visor **不需要任何配置就能直接识别**。UKI 把内核、initrd、命令行参数打包成单个 `.efi` 文件，Visor 看到它就像一个自带说明书的启动镜像。

Visor 的设计哲学就是推荐 UKI 路线——README 里明确写:

> *"A UKI on the FAT ESP at \EFI\Linux\*.efi is the simplest and most portable setup — prefer it."*

### 方案 A: systemd-ukify（推荐，Ubuntu 24.04+）

这是 systemd 官方提供的 UKI 生成工具。

```bash
# 安装
sudo apt install systemd-ukify

# 一次性生成 UKI
sudo ukify build \
    --linux=/boot/vmlinuz-$(uname -r) \
    --initrd=/boot/initrd.img-$(uname -r) \
    --cmdline="$(cat /proc/cmdline)" \
    --output=/boot/efi/EFI/Linux/ubuntu.efi
```

注意 `--cmdline` 里需要用你实际的启动参数。你可以从 `/proc/cmdline` 直接读：

```bash
cat /proc/cmdline
# 示例输出: BOOT_IMAGE=/boot/vmlinuz-6.8.0-31-generic root=UUID=xxx ro quiet splash
```

**每次内核更新后自动重新生成 UKI**：

创建 `/etc/kernel/postinst.d/zz-ukify`:

```bash
#!/bin/sh
# 每次内核更新后自动生成 UKI
set -e
KERNEL_VERSION="$1"
ESP="/boot/efi"

if [ -f /boot/vmlinuz-"${KERNEL_VERSION}" ]; then
    ukify build \
        --linux=/boot/vmlinuz-"${KERNEL_VERSION}" \
        --initrd=/boot/initrd.img-"${KERNEL_VERSION}" \
        --cmdline="$(cat /proc/cmdline)" \
        --output="${ESP}/EFI/Linux/ubuntu-${KERNEL_VERSION}.efi"
fi
```

```bash
sudo chmod +x /etc/kernel/postinst.d/zz-ukify
```

之后每次 `apt upgrade` 安装新内核时，UKI 会自动更新。

### 方案 B: objcopy 手动方法（兼容所有 Ubuntu 版本）

不需要装任何额外软件，纯手动。原理是把 kernel + initrd + cmdline 以 PE section 的方式打包成一个 `.efi` 文件。

```bash
# 安装 systemd-boot（提供 EFI stub）
sudo apt install systemd-boot

# 准备 cmdline 文件
cat /proc/cmdline | tr -d '\n' > /tmp/cmdline.txt

# 打包 UKI
sudo objcopy \
    --add-section .osrel=/etc/os-release \
    --change-section-vma .osrel=0x20000 \
    --add-section .cmdline=/tmp/cmdline.txt \
    --change-section-vma .cmdline=0x30000 \
    --add-section .linux=/boot/vmlinuz-$(uname -r) \
    --change-section-vma .linux=0x2000000 \
    --add-section .initrd=/boot/initrd.img-$(uname -r) \
    --change-section-vma .initrd=0x3000000 \
    /usr/lib/systemd/boot/efi/linuxx64.efi.stub \
    /boot/efi/EFI/Linux/ubuntu.efi
```

### 方案 C: dracut 生成 UKI

如果你的 Ubuntu 使用 dracut 作为 initramfs 生成器：

```bash
sudo apt install dracut
sudo dracut --uefi \
    --kernel-image /boot/vmlinuz-$(uname -r) \
    --kver $(uname -r) \
    /boot/efi/EFI/Linux/ubuntu.efi
```

### Secure Boot 注意事项

你的 Secure Boot 是开启的。生成的 UKI 默认**没有签名**，需要通过以下方式签名：

```bash
# 安装 sbctl
sudo apt install sbctl

# 将自定义密钥注册到固件（仅首次）
sudo sbctl enroll-keys -m

# 签名 UKI
sudo sbctl sign -s /boot/efi/EFI/Linux/ubuntu.efi
```

### UKI 方案的目录结构

生成后的 ESP 布局：

```
Z:\EFI\
├── Microsoft\        ← Windows
├── ubuntu\           ← GRUB（保留不动，作为备份）
├── visor\            ← Visor（会自动检测下面的 UKI）
├── Linux\            ← UKI 目录 ★ Visor 会自动扫描这里
│   └── ubuntu.efi
└── ...
```

之后即使删掉 `boot.conf`，Visor 的自动检测也能发现 `\EFI\Linux\ubuntu.efi`，直接在菜单里显示 Ubuntu。
