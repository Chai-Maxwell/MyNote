# NixOS 上运行和打包 FHS 软件 —— 新手指南

> 传统 Linux 软件的目录结构（FHS）和 NixOS 的 `/nix/store` 哲学互不兼容。
> 本指南从新手视角，由易到难介绍各种解决方案。

---

## 一、背景：为什么"直接运行"会失败

### 1.1 传统 Linux 的 FHS 布局

```
/usr/bin/neovim        # 可执行文件
/usr/lib/libc.so.6     # 共享库（动态链接库）
/lib64/ld-linux-x86-64.so.2  # 动态链接器（interpreter）
/usr/share/...         # 数据文件
/etc/...               # 配置文件
```

当你在普通 Linux 上 `./my-binary`，操作系统会：
1. 读取 ELF 头，找到 `interpreter` 路径（如 `/lib64/ld-linux-x86-64.so.2`）
2. 由 interpreter 加载 binary，在 `/usr/lib` 等路径搜索 `.so` 依赖
3. 全部找到 → 运行成功

### 1.2 NixOS 上发生了什么

```bash
$ ./my-binary
bash: ./my-binary: cannot execute: required file not found
```

为什么？**没有 `/lib64/ld-linux-x86-64.so.2`，没有 `/usr/lib`**。

NixOS 把一切放在 `/nix/store/<hash>-<name>/` 下：

```
/nix/store/abc123-glibc-2.39/lib/ld-linux-x86-64.so.2  # 动态链接器在这
/nix/store/def456-openssl-3.0/lib/libssl.so.3           # 库在这
```

下载的二进制根本不知道去哪里找这些路径。

### 1.3 先确认你的二进制是什么情况

```bash
# 查看一个二进制需要什么 interpreter
readelf -l ./my-binary | grep interpreter
# 输出示例：[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

# 查看需要哪些共享库
patchelf --print-needed ./my-binary
# 输出示例：
# libc.so.6
# libssl.so.3
# libgtk-3.so.0

# 或者用 ldd（注意：NixOS 上没有 /usr/bin/ldd，要用：
nix-shell -p glibc --run "ldd ./my-binary"
# "not found" 的就是你要解决的
```

---

## 二、决策树：我该用哪种方法？

```
目标：在 NixOS 上运行/打包一个非 Nix 的软件
│
├─ 🧪 只是想临时试一下？
│   ├─ 大概率能跑 → steam-run ./binary
│   └─ 差几个库 → nix-alien ./binary
│
├─ 🏠 想长期使用，但不想写 derivation？
│   └─ 启用 nix-ld（系统级透明方案）
│
├─ 📦 想正式打包，写进 configuration.nix/flake？
│   ├─ 单个静态链接二进制 → 最简单的 mkDerivation
│   ├─ 有动态链接依赖 → autoPatchelfHook
│   └─ 需要完整 FHS 环境（下载插件、检查自身完整性等）
│       └─ buildFHSEnv
│
└─ 🧱 以上都不行？
    └─ distrobox（用容器跑一个真正的 Ubuntu/Arch）
```

---

## 三、方法一：nix-ld（系统级，最省心）

### 原理

在 `/lib64/ld-linux-x86-64.so.2` 放一个 shim（垫片），当任何二进制找这个 interpreter 时，shim 读取环境变量 `NIX_LD`（指向 NixOS 真正的 glibc dynamic linker）和 `NIX_LD_LIBRARY_PATH`（额外的库搜索路径），然后透明地转发。

### 配置（NixOS 系统级）

```nix
# /etc/nixos/configuration.nix
{
  programs.nix-ld.enable = true;

  # 预声明你需要的常用库（可选但推荐）
  programs.nix-ld.libraries = with pkgs; [
    stdenv.cc.cc.lib    # 提供 libstdc++, libgcc_s
    zlib
    openssl
    xz
    bzip2
    # 根据需要继续添加...
  ];
}
```

```bash
sudo nixos-rebuild switch
# 重新登录后生效
```

### 在 shell.nix 中使用（项目级）

```nix
# shell.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  NIX_LD = "${pkgs.stdenv.cc.bintools.dynamicLinker}";
  # 或者用 lib.fileContents 读取文件内容：
  # NIX_LD = builtins.readFile "${pkgs.stdenv.cc}/nix-support/dynamic-linker";

  NIX_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
    pkgs.stdenv.cc.cc.lib
    pkgs.zlib
    pkgs.openssl
    pkgs.xz
  ];

  # 然后就可以直接 shellHook 里运行了
  shellHook = ''
    echo "nix-ld environment ready"
  '';
}
```

```bash
nix-shell --run './my-binary'
```

### 优缺点

| 优点 | 缺点 |
|---|---|
| 配置一次，所有二进制受益 | 需要手动添加缺失的库 |
| 不需要写 derivation | 不创建完整 FHS（只有 linker + lib） |
| 性能无损 | 对 32-bit 二进制不生效 |

---

## 四、方法二：steam-run（临时试一下，最快）

### 使用

```bash
# 一次性运行
nix-shell -p steam-run --run "steam-run ./my-binary"

# 进入一个 FHS 环境
steam-run bash
# 此时 /usr/lib, /usr/bin 等都存在了
./my-binary
```

### 原理

`steam-run` 是一个预先打包好的 `buildFHSEnv`，内含 Steam 运行时所需的大量常见库。尽管名字带 "steam"，它跟 Steam 平台无关，可以运行任何二进制。

### 适用场景

- 临时测试一个下载的 AppImage 或二进制
- 快速验证"这玩意在 NixOS 上到底能不能跑"
- 不想写任何配置

### 不适用场景

- 需要长期使用（每次都要 `steam-run` 包裹）
- 缺少某些特定库（steam-run 的库集合是固定的）

---

## 五、方法三：nix-alien（自动找库，全程零配置）

### 使用

```bash
# 直接运行（会自动下载依赖并构建 FHS 环境）
nix run nixpkgs#nix-alien -- ./my-binary

# 首次使用需要先构建索引（较慢，只需一次）
nix run nixpkgs#nix-index-database --Extra-Commands --update
```

### 原理

- `nix-index` 维护了一个"哪个包提供哪个文件"的数据库
- `nix-alien` 运行二进制 → 报 missing lib 错误 → 查 `nix-index` 数据库 → 自动找到对应包 → 构建临时 FHS → 运行

### 适用场景

- 临时运行一个不知道依赖什么的二进制
- 懒得手动 `ldd` + `nix-locate` 排查
- 配合 `nixGL` 运行 OpenGL 程序：
  ```bash
  nix run --impure github:guibou/nixGL -- \
    nix run nixpkgs#nix-alien -- ./opengl-app
  ```

### 注意

- 首次运行需下载 nix-index 数据库（~200MB）
- 可能弹出多个候选包让你选择
- 结果会被缓存

---

## 六、方法四：autoPatchelfHook（正式打包，最常用）

### 这是什么

`autoPatchelfHook` 是一个 Nix 构建钩子，在 `fixupPhase` 阶段自动扫描所有 ELF 文件，找到它们 `NEEDED` 的 `.so`，然后去 `buildInputs` 中查找对应的 Nix store 路径，写入 `RPATH`。

**一句话：你告诉它"这个二进制需要哪些库"，它自动把 RPATH 写对。**

### 最简示例：打包一个静态链接的二进制

```nix
# default.nix
{ stdenv, fetchurl }:

stdenv.mkDerivation rec {
  pname = "myapp";
  version = "1.0.0";

  src = fetchurl {
    url = "https://github.com/xxx/myapp/releases/download/v${version}/myapp-linux-amd64";
    hash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    # ↑ 用 nix-prefetch-url 获取
  };

  # 不需要 unpack
  dontUnpack = true;

  installPhase = ''
    install -Dm755 $src $out/bin/myapp
  '';
}
```

### 完整示例：打包一个有动态链接依赖的二进制

以打包一个典型的闭源 GUI 应用为例：

```nix
{ stdenv
, lib
, fetchurl
, autoPatchelfHook   # 自动修补 ELF
, makeWrapper        # 用于创建 wrapper 脚本
, dpkg               # 如果源文件是 .deb
, xorg
, gtk3
, glib
, alsa-lib
, libpulseaudio
, libGL
, udev               # 很多 GUI 应用需要，容易被忽略！
}:

stdenv.mkDerivation rec {
  pname = "my-gui-app";
  version = "1.2.3";

  # 1. 获取源码/二进制
  src = fetchurl {
    url = "https://example.com/${pname}_${version}_amd64.deb";
    hash = "sha256-...";  # nix-prefetch-url 获取
  };

  # 2. autoPatchelfHook 放 nativeBuildInputs（构建时运行）
  nativeBuildInputs = [
    autoPatchelfHook
    dpkg                  # 用于解压 .deb
    makeWrapper           # 用于创建启动脚本
  ];

  # 3. 所有运行时依赖放 buildInputs
  buildInputs = [
    stdenv.cc.cc.lib      # libstdc++, libgcc_s（几乎总是需要）
    xorg.libX11
    xorg.libXrandr
    xorg.libXext
    xorg.libXfixes
    xorg.libXcursor
    gtk3
    glib
    alsa-lib
    libpulseaudio
    libGL
    udev                  # 很多 Electron/GUI 应用静默依赖！
  ];

  # 4. 解压
  unpackPhase = ''
    dpkg-deb -x $src .
  '';

  # 5. 安装
  installPhase = ''
    mkdir -p $out/bin $out/share
    cp -r usr/bin/* $out/bin/
    cp -r usr/share/* $out/share/ 2>/dev/null || true
    # 有些 .deb 的文件在 opt/ 下
    cp -r opt/ $out/ 2>/dev/null || true
  '';

  # 6. 可选：额外设置运行时环境变量
  postFixup = ''
    wrapProgram $out/bin/my-gui-app \
      --prefix LD_LIBRARY_PATH : ${lib.makeLibraryPath buildInputs}
  '';

  meta = with lib; {
    description = "A GUI app packaged for NixOS";
    license = licenses.unfree;
    platforms = [ "x86_64-linux" ];
  };
}
```

### 关键概念解释

| 概念 | 含义 | 放哪 |
|---|---|---|
| `nativeBuildInputs` | 构建时需要的工具（在构建机上运行） | `autoPatchelfHook`, `dpkg`, `makeWrapper` |
| `buildInputs` | 运行时需要的库（在目标机上链接） | `gtk3`, `glib`, `libGL` 等 |
| `$out` | 构建产物的根目录，最终在 `/nix/store/<hash>-pname-version/` | 安装文件到这里 |
| `RPATH` | 可执行文件中硬编码的库搜索路径 | `autoPatchelfHook` 自动设置 |

### 如果 autoPatchelfHook 报错了……

```
error: auto-patchelf could not satisfy dependency libfoo.so.2
wanted by /nix/store/.../bin/myapp
```

这就告诉你缺了什么库。用以下方法找到对应的包：

```bash
# 查找哪个包提供了 libfoo.so.2
nix-locate --top-level -w lib/libfoo.so.2
# 输出：pkgs.foolib.out  /nix/store/...-foolib-1.0/lib/libfoo.so.2

# 把 pkgs.foolib 加到 buildInputs，重新构建
```

`nix-locate` 需要 `nix-index`：
```bash
nix-shell -p nix-index --run "nix-index"   # 首次构建索引
nix-locate lib/libfoo.so.2                 # 之后查找
```

---

## 七、方法五：buildFHSEnv（终极兜底方案）

### 什么时候需要它

前面 `autoPatchelfHook` 解决了"库在哪"的问题。但有些软件做更多的事：

- **运行时下载/运行其他二进制**（如 IDE 插件系统、游戏启动器）
- **硬编码了 `/usr/lib` 等路径**（不是通过动态链接，而是代码里写死了路径字符串）
- **检查自身完整性**（校验可执行文件的 hash 或目录结构）
- **需要 `/etc`、`/usr/share` 等标准 FHS 路径**

这时 `autoPatchelfHook` 不够用 —— 你需要一个**假的 FHS 根文件系统**。

### 原理

`buildFHSEnv` 使用 Linux namespace（底层是 bubblewrap）创建一个轻量级沙箱：

```
沙箱内部的假 root 文件系统：
/usr/lib      → 来自你在 targetPkgs 中声明的包
/usr/bin      → 同上
/lib          → symlink → /usr/lib
/bin          → symlink → /usr/bin
/etc          → 可选的 profile 脚本
/nix/store    → 绑定挂载宿主机的 /nix/store（只读）
其他一切      → 来自宿主机
```

**它不是 Docker 那样的安全隔离** —— 它只做文件系统层面的视图调整，没有网络/进程隔离。

### 基本用法

```nix
# fhs-env.nix
{ pkgs ? import <nixpkgs> {} }:

(pkgs.buildFHSEnv {
  name = "my-fhs-env";

  # targetPkgs：主架构的包（包含二进制和库）
  targetPkgs = pkgs: with pkgs; [
    # 核心库
    stdenv.cc.cc.lib
    glibc

    # 各色依赖
    glib
    gtk3
    alsa-lib
    libpulseaudio
    udev                 # GUI 应用几乎必加
    libGL

    # 开发工具（如果需要的话）
    pkg-config
    ncurses
  ];

  # 可选的 profile 脚本
  profile = ''
    export MY_APP_CONFIG_DIR="$HOME/.config/myapp"
  '';

  # 进入环境后执行的命令
  runScript = "bash";
}).env
```

使用：

```bash
nix-shell fhs-env.nix
# 此时已经在 FHS 沙箱中，/usr/lib 可用
./my-binary
```

### 作为系统包安装

```nix
# /etc/nixos/configuration.nix
environment.systemPackages = [
  (pkgs.buildFHSEnv {
    name = "myapp";
    targetPkgs = pkgs: with pkgs; [ glib gtk3 alsa-lib udev libGL ];
    runScript = "/path/to/myapp/bin/myapp";
  })
];

# nixos-rebuild switch 后直接输入 myapp 即可运行
```

### 32-bit 支持（multiPkgs / multiArch）

很多老游戏或闭源软件是 32 位的。在 64 位 NixOS 上需要额外声明 32 位库：

```nix
pkgs.buildFHSEnv {
  name = "old-game";

  targetPkgs = pkgs: with pkgs; [
    # 64-bit 依赖
    vulkan-loader
    libGL
  ];

  # multiPkgs：在 64 位系统上提供 32 位库
  multiPkgs = pkgs: with pkgs; with pkgs.xorg; [
    # 注意：这里默认只安装库文件，不安装二进制
    libGL
    libX11
    libXcursor
    libXrandr
    libXext
    libXi
    alsa-lib
    freetype
    fontconfig
  ];

  multiArch = true;  # 默认就是 true，显式写出来更清晰
  runScript = "./old-game-bin";
}
```

### targetPkgs vs multiPkgs 的区别

| | targetPkgs | multiPkgs |
|---|---|---|
| 用途 | 主架构（如 x86_64） | 多架构支持（如 32-bit on 64-bit） |
| 二进制 | ✅ 会安装到 /bin | ❌ 默认只安装库 |
| 什么时候需要 | 总是需要 | 只有 32-bit 二进制才需要 |

---

## 八、附加技巧：makeWrapper

当你的程序需要特殊的运行时环境变量时（比如 `LD_LIBRARY_PATH`、`PATH`、`XDG_*` 等），用 `makeWrapper` / `wrapProgram` 创建启动脚本。

### wrapProgram 常用选项

```nix
nativeBuildInputs = [ makeWrapper ];

postFixup = ''
  wrapProgram $out/bin/myapp \
    --set VAR_NAME value \              # 设置环境变量
    --unset VAR_TO_REMOVE \             # 删除环境变量
    --prefix PATH : ${lib.makeBinPath [ curl jq ]} \  # PATH 前面加东西
    --suffix LD_LIBRARY_PATH : /extra/lib/path \      # 后面加东西
    --add-flags "--enable-feature" \    # 添加命令行参数
    --argv0 "expected-name"             # 设置 argv[0]（程序看到的自己的名字）
'';
```

### 实用 helper

```nix
# lib.makeBinPath [ pkg1 pkg2 ]  →  "pkg1/bin:pkg2/bin"
# lib.makeLibraryPath [ pkg1 pkg2 ]  →  "pkg1/lib:pkg2/lib"
```

### Electron 应用添加 Wayland 支持的例子

```nix
postFixup = ''
  wrapProgram $out/bin/electron-app \
    --add-flags "--ozone-platform-hint=auto" \
    --add-flags "--enable-wayland-ime"
'';
```

---

## 九、调试工作流

### 标准排查流程

```
1. readelf -l ./binary | grep interpreter
   → 确认需要什么 interpreter（大概率 /lib64/ld-linux-x86-64.so.2）

2. nix-shell -p glibc --run "ldd ./binary"
   → 列出所有 "not found" 的库

3. 对于每个 "not found"：
   nix-locate lib/libfoo.so.1
   → 找到提供该库的包

4. 把找到的包加到 buildInputs

5. 重新 nix-build

6. 如果还是不行，用 strace 看运行时到底在哪找文件：
   nix-shell -p strace --run "strace -e openat -f ./binary 2>&1 | grep ENOENT"
```

### 预先获取 hash

```bash
# 方法 1：用 nix-prefetch-url
nix-prefetch-url https://example.com/myapp.tar.gz
# 输出 SRI 格式的 hash，直接复制到 derivation

# 方法 2：用 nix flake prefetch
nix flake prefetch --json https://example.com/myapp.tar.gz | jq -r .hash

# 方法 3：留空 hash，nix-build 会报错并告诉你正确的 hash
# （仅限你信任该 URL 的情况）
```

---

## 十、常见坑

### 坑 1：忘记添加 `stdenv.cc.cc.lib`

几乎所有 C++ 程序都需要 `libstdc++.so.6` 和 `libgcc_s.so.1`，它们来自 `stdenv.cc.cc.lib`。

```nix
buildInputs = [
  stdenv.cc.cc.lib  # ← 几乎总是需要！
  # ...其他依赖
];
```

### 坑 2：忘记 `udev`

很多 GUI 应用、Electron 应用在启动时静默依赖 `libudev.so.1`，不声明的话报错很不明确。

```nix
buildInputs = [
  udev  # ← GUI 应用容易漏掉！
];
```

### 坑 3：`buildInputs` vs `nativeBuildInputs` 搞反

| | 什么时候用 |
|---|---|
| `nativeBuildInputs` | 构建**时**需要的工具：如编译器、`autoPatchelfHook`、`makeWrapper`、`pkg-config` |
| `buildInputs` | 运行**时**需要的库：如 `gtk3`、`glib`、`openssl` |

简单记忆：**库放 buildInputs，工具放 nativeBuildInputs。**

### 坑 4：运行时 `dlopen()` 的库

`autoPatchelfHook` 只能处理 ELF 文件中**声明了的 NEEDED 依赖**。如果程序通过 `dlopen()` 运行时加载库（比如插件系统），autoPatchelfHook 看不到它。

解决：在 `wrapProgram` 中手动添加 `LD_LIBRARY_PATH`。

```nix
postFixup = ''
  wrapProgram $out/bin/myapp \
    --prefix LD_LIBRARY_PATH : ${lib.makeLibraryPath [
      pkgs.libfoo  # 这个库是被 dlopen 的，autoPatchelfHook 看不到
    ]}
'';
```

### 坑 5：AppImage 特殊处理

AppImage 自带了 FHS 环境，但在 NixOS 上它的 fuse 挂载可能失败。

```bash
# 方法 1：直接提取
./MyApp.AppImage --appimage-extract
cd squashfs-root
./AppRun

# 方法 2：用 appimage-run
nix-shell -p appimage-run --run "appimage-run ./MyApp.AppImage"
```

### 坑 6：`buildFHSEnv` 不是安全沙箱

它只隔离文件系统视图，不隔离网络、进程。不要用它运行不信任的代码。

### 坑 7：32-bit 二进制在 64-bit NixOS 上

需要在 `multiPkgs` 中提供 32 位版本的库。如果没有提供，报错通常是 segfault 或者找不到 .so。

---

## 十一、总结：方法速查表

| 方法 | 难度 | 适用场景 | 是否需要 rebuild |
|---|---|---|---|
| **nix-ld** | ⭐ | 日常使用，希望"下载的二进制能跑" | 配一次，终身受益 |
| **steam-run** | ⭐ | 临时测试一个二进制 | 不需要 |
| **nix-alien** | ⭐ | 临时测试，自动找依赖 | 不需要 |
| **autoPatchelfHook** | ⭐⭐ | 正式打包，写入 flake/configuration.nix | 需要（`nix-build`） |
| **buildFHSEnv** | ⭐⭐⭐ | 需要完整 FHS 环境的复杂软件 | 需要 |
| **distrobox** | ⭐⭐ | 以上都不行，跑一个完整容器 | 不需要 |

### 推荐学习路径（新手）

```
1. 先用 steam-run / nix-alien 快速验证软件能不能跑
2. 确认要长期使用 → 用 autoPatchelfHook 写一个 derivation
3. 如果 autoPatchelfHook 不够（运行时 dlopen、检查自身路径等）
   → 升级到 buildFHSEnv
4. 日常开发环境 → 启用 nix-ld，配合 shell.nix 设置 NIX_LD_LIBRARY_PATH
```

---

## 参考资源

- [NixOS & Flakes Book — 运行下载的二进制文件](https://nixos-and-flakes.thiscute.world/best-practices/run-downloaded-binaries-on-nixos)
- [nixpkgs Manual — FHS Environments](https://spectrum-os.org/git/nixpkgs/tree/doc/builders/special/fhs-environments.section.md)
- [nix-ld GitHub](https://github.com/nix-community/nix-ld)
- [nix-alien GitHub](https://github.com/thiagokokada/nix-alien)
- [How I Packaged a .deb for NixOS with Flakes (新手友好的完整教程)](https://dev.to/oxcl/how-i-packaged-a-deb-file-for-nixos-with-flakes-5dn)
- [NixOS Discourse — Packaging prebuilt binaries](https://discourse.nixos.org/t/packaging-prebuilt-binaries/64365)
- [nix.dev FAQ — Running non-Nix executables](https://nix.dev/guides/faq)
