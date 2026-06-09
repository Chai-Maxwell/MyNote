# Goos–Hänchen 和 Imbert–Fedorov 光束位移：综述

> **原文**: K Y Bliokh and A Aiello, *J. Opt.* **15**, 014001 (2013)
>
> **DOI**: [10.1088/2040-8978/15/1/014001](https://doi.org/10.1088/2040-8978/15/1/014001)

---

## 1. 问题背景与物理图像

### 1.1 从平面波到有限宽度光束

光在平面介质界面上的反射和折射是光学中最基本的过程。对于**平面波**，问题由 Snell 定律和 Fresnel 公式完全描述——它们分别给出波矢方向和偏振振幅。

但对于真实的、具有**有限宽度**的光束（即具有展宽的平面波谱），情况更复杂。在波长尺度上，反射和透射光束并不严格遵循几何光学的路径。忽略次级光束的形状变形后，可以引入相对于几何光学预期的**四种基本偏离**：

| | 空间位移 (spatial shift) | 角度偏转 (angular shift) |
|---|---|---|
| **面内 (in-plane, x)** | Goos–Hänchen (GH) 空间位移 | Goos–Hänchen 角度偏转 |
| **面外 (out-of-plane, y)** | Imbert–Fedorov (IF) 空间位移 | Imbert–Fedorov 角度偏转 |

- **空间位移**: 光束质心位置 $\langle X^a \rangle$、$\langle Y^a \rangle$ 的偏移
- **角度偏转**: 光束传播方向的角度改变 $\Theta_X^a = \langle P_X^a \rangle / k^a$、$\Theta_Y^a = \langle P_Y^a \rangle / k^a$

其中 $a = r, t$ 分别代表反射 (reflected) 和透射 (transmitted) 光束。入射面为 $(x, z)$ 平面。

**关键物理要点**：
- **GH 位移**的起源是 Fresnel 反射/透射系数随角度的变化（空间色散），其本征模式是 TM (p) 和 TE (s) 线偏振
- **IF 位移**的起源更深层，与光的自旋-轨道相互作用、Berry 几何相位和角动量守恒相关，其本征模式是圆偏振

### 1.2 历史脉络

- **1947年**: Goos 和 Hänchen 发现全内反射中的空间 GH 位移
- **1948年**: Artmann 用 Fresnel 系数的色散解释了 GH 效应
- **1955年**: Fedorov 首次预测 IF 位移
- **1965年**: Schilling 首次基于平面波分解推导了 IF 位移的正确表达式
- **1972年**: Imbert 实验验证
- **1992年**: Liberman 和 Zel'dovich 引入"光的自旋-轨道相互作用"概念
- **2004年**: Onoda 等人将 IF 位移描述为光的自旋霍尔效应，与 Berry 几何相位联系
- **2006–2007年**: Bliokh 和 Bliokh 给出了 IF 位移的完整理论处理
- **2008年**: Hosten 和 Kwiat 用弱测量技术实验验证

---

## 2. 基本概念

### 2.1 场的表示与旋转

#### 平面波展开

单色光束的复电场 $E(\mathbf{r})$ 可由其 Fourier 谱 $\tilde{E}(\mathbf{k})$ 表示：

$$E(\mathbf{r}) \propto \int \tilde{E}(\mathbf{k}) \, e^{i\mathbf{k}\cdot\mathbf{r}} \, d^2 k_\perp$$

其中 $k_z(k_\perp) = \sqrt{k^2 - k_x^2 - k_y^2}$，$k = \omega$（文章使用自然单位 $\hbar = c = 1$）。

#### 横波条件与动量空间球面

Maxwell 方程 $\nabla \cdot \mathbf{E} = 0$ 导致横波条件：

$$\mathbf{k} \cdot \tilde{\mathbf{E}} = 0$$

这意味着**平面波的电场必须与波矢 $\mathbf{k}$ 正交**——在动量空间中，电场矢量必须切于单位方向球面 $S^2 = \{\boldsymbol{\kappa}\}$（$\boldsymbol{\kappa} = \mathbf{k}/k$）。这正是**自旋-轨道相互作用的几何根源**：偏振与动量被横波条件耦合在一起。

#### 坐标旋转

需要在三种坐标架之间变换：
1. **实验室坐标架** $(x, y, z)$ — 与界面固连
2. **光束坐标架** $(X^a, y, Z^a)$ — 随光束传播方向旋转
3. **球坐标架** $(\theta, \varphi)$ — 描述各平面波分量的 p/s 偏振本征模

**实验室圆偏振基** $(u_{+}^0, u_{-}^0, u_z)$:

$$u_{\pm}^0 = \frac{u_x \pm i u_y}{\sqrt{2}}, \quad |E\rangle_C = \hat{V}|E\rangle_L$$

$$\hat{V} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & -i & 0 \\ 1 & i & 0 \\ 0 & 0 & \sqrt{2} \end{pmatrix}$$

**球坐标基** $(u_\theta, u_\varphi, u_k)$ 由旋转 $\hat{U}_S = \hat{R}_y(\theta)\hat{R}_z(\varphi)$ 联系到实验室坐标架。

**螺旋度基** (helicity basis):

$$u_\sigma = \frac{u_\theta + i\sigma u_\varphi}{\sqrt{2}}, \quad \sigma = \pm 1$$

在傍轴极限 $\theta \to 0$ 下，$u_\sigma \to u_\sigma^0 e^{-i\sigma\varphi}$。

### 2.2 几何相位 (Berry Phase)

#### 基本思想

不同平面波的偏振定义在 $\boldsymbol{\kappa}$-球面的不同切平面上。要比较不同 $\mathbf{k}$ 的波的相位和偏振，必须将电场沿球面**平行移动**到同一平面。

在球坐标中，坐标架绕 $\boldsymbol{\kappa}$ 的局部旋转产生了几何相位。对螺旋度基 $u_\sigma$，微分的几何相位为：

$$-\sigma \, d\Phi = i\, u_\sigma^* \cdot du_\sigma = i \sum_j \left(u_\sigma^*(\mathbf{k}) \cdot \frac{\partial}{\partial k_j} u_\sigma(\mathbf{k})\right) dk_j$$

对动量空间中沿轮廓 $C$ 的演化，累积的 Berry 相位为：

$$|\tilde{E}'\rangle_H = \exp(-i\hat{\sigma}\Phi_B)|\tilde{E}\rangle_H$$

$$\Phi_B(C) = \int_C \mathbf{A}_B(\mathbf{k}) \cdot d\mathbf{k} = -\int_C \cos\theta \, d\varphi$$

其中 **Berry 联络**（Berry connection）：

$$\mathbf{A}_B = -i\sigma^{-1} u_\sigma^* \cdot \frac{\partial}{\partial \mathbf{k}} u_\sigma = -k^{-1}\cot\theta \, u_\varphi$$

**关键结果**：在固定极角 $\theta$ 上，方位角从 $0$ 到 $\varphi$ 的波之间的 Berry 相位差为：

$$\boxed{\Phi_B = -\varphi \cos\theta}$$

沿闭合轮廓 $C = \{\theta = \text{const}, \varphi \in (0, 2\pi)\}$ 的 Berry 相位为 $\Phi_B = -2\pi \cos\theta$。

#### 动力学解释

Berry 相位可以理解为**自旋-旋转耦合**效应——类似于 Coriolis 效应：

$$\sigma\Phi_B = -\sigma \int \boldsymbol{\kappa} \cdot \boldsymbol{\Omega}_\tau \, d\tau$$

其中 $\boldsymbol{\Omega}_\tau$ 是坐标架相对于参数 $\tau$ 的旋转角速度。具有固定 $\theta$ 但不同 $\varphi$ 的波通过绕 $z$ 轴旋转角度 $\varphi$ 相联系：$\boldsymbol{\Omega}_\varphi = u_z$，$\Phi_B = -\int \cos\theta \, d\varphi$。

#### 两类 Berry 相位情形

1. **连续非平面传播方向变化** — 多次反射/折射、弯曲光纤中等
2. **同时干涉涉及多个不同 $\mathbf{k}$ 的波** — 强聚焦、散射等 → **这正是 IF 位移（光的自旋霍尔效应）的基础**

### 2.3 坐标、动量和角动量

使用**量子力学算符形式**描述光束的积分特征。

#### 算符

| 物理量 | 算符（动量表示） |
|--------|----------------|
| 坐标 | $\hat{\mathbf{r}} = i\,\partial/\partial\mathbf{k}$ |
| 动量 | $\hat{\mathbf{p}} = \mathbf{k}$ |
| 能量 | $\hat{w} = \omega$ |
| 轨道角动量 | $\hat{\mathbf{L}} = -i\,\mathbf{k} \times \partial/\partial\mathbf{k}$ |
| 自旋角动量 | $(\hat{S}_\alpha)_{ij} = -i\varepsilon_{\alpha ij}$ |

#### 期望值与光束特征量

沿 $z$ 轴传播的光束，其**每单位 $z$ 长度的归一化线性密度**由期望值给出：

$$\langle \mathbf{R} \rangle = \mathcal{N}^{-1} \langle\tilde{E}|\hat{\mathbf{r}}|\tilde{E}\rangle_L, \quad \langle \mathbf{P} \rangle = \mathcal{N}^{-1} \langle\tilde{E}|\mathbf{k}|\tilde{E}\rangle_L$$

$$\langle \mathbf{L} \rangle = \mathcal{N}^{-1} \langle\tilde{E}|\hat{\mathbf{L}}|\tilde{E}\rangle_L, \quad \langle \mathbf{S} \rangle = \mathcal{N}^{-1} \langle\tilde{E}|\hat{\mathbf{S}}|\tilde{E}\rangle_L$$

其中 $\mathcal{N} = \langle\tilde{E}|\tilde{E}\rangle_L$ 是每单位 $z$ 长度的光子数。

#### 三种光学角动量

轨道角动量可分解为**外部**（extrinsic）和**内部**（intrinsic）贡献：

$$\langle \mathbf{L}^{\text{ext}} \rangle = \langle \mathbf{R} \rangle \times \langle \mathbf{P} \rangle, \quad \langle \mathbf{L}^{\text{int}} \rangle = \langle \mathbf{L} \rangle - \langle \mathbf{L}^{\text{ext}} \rangle$$

因此光有三种角动量：

| 类型 | 物理来源 | 每光子值 |
|------|---------|---------|
| **自旋 AM** $\langle \mathbf{S} \rangle$ | 圆偏振 | $\sigma \mathbf{K}$ |
| **内禀轨道 AM** $\langle \mathbf{L}^{\text{int}} \rangle$ | 光学涡旋 | $\ell \mathbf{K}$ |
| **外部轨道 AM** $\langle \mathbf{L}^{\text{ext}} \rangle$ | 光束质心运动 | $\langle\mathbf{R}\rangle \times \langle\mathbf{P}\rangle$ |

其中 $\mathbf{K} = \langle\mathbf{P}\rangle/|\langle\mathbf{P}\rangle|$ 是传播方向，$\sigma = \pm 1$ 是螺旋度，$\ell = 0, \pm 1, \pm 2, \ldots$ 是涡旋拓扑荷。

#### 傍轴涡旋光束示例

圆偏振 Laguerre-Gaussian 涡旋光束的场为：

$$|\tilde{E}_\ell^\sigma(\mathbf{k})\rangle_{\perp C} = |e^\sigma\rangle_\perp |\tilde{E}_\ell(\mathbf{k})\rangle$$

$$|\tilde{E}_\ell(\mathbf{k})\rangle = \theta^{|\ell|} G(\theta) e^{i\ell\varphi + ik(1-\theta^2/2)z}$$

其中 $G(\theta) \propto \exp[-(kw_0)^2\theta^2/4]$ 是高斯包络。

期望值：$\langle \mathbf{R} \rangle = z\mathbf{K}$，$\langle \mathbf{P} \rangle = k\mathbf{K}$，$\langle \mathbf{L} \rangle = \ell\mathbf{K}$，$\langle \mathbf{S} \rangle = \sigma\mathbf{K}$。

#### Stokes 矢量与偏振表征

任意均匀偏振态由 **Jones 矢量** $|e\rangle_{\perp C} = (e_+, e_-)^T$ 描述，平均螺旋度 $\bar{\sigma} = |e_+|^2 - |e_-|^2$。完整表征需要 **Stokes 矢量**：

$$\mathbf{S} = \langle\tilde{e}|\hat{\boldsymbol{\sigma}}|\tilde{e}\rangle_{\perp C}$$

其中 $\hat{\boldsymbol{\sigma}} = (\hat{\sigma}_1, \hat{\sigma}_2, \hat{\sigma}_3)$ 是 Pauli 矩阵。$\mathbf{S}$ 在 Poincaré 球上表示偏振态，$S_3 = \bar{\sigma}$ 给出平均螺旋度。

---

## 3. 介质界面上的偏振变换与光束位移

### 3.1 Snell–Fresnel 几何光学框架

考虑傍轴光束在 $(x, z)$ 平面内以角度 $\vartheta$ 入射到 $z=0$ 平面界面上。界面两侧介质的相对折射率为 $n$，相对阻抗为 $\zeta$。

**中心平面波**的波矢为：

$$\mathbf{k}_c^a = k^a (\sin\vartheta^a, 0, \cos\vartheta^a)$$

其中 $\vartheta^i = \vartheta$（入射角），$\vartheta^r = \pi - \vartheta$，$\vartheta^t = \sin^{-1}(n^{-1}\sin\vartheta) \equiv \vartheta'$（Snell 定律）。

**Fresnel 反射/透射** 在光束坐标架 $(X^a, y, Z^a)$ 中由有效 Jones 矩阵描述：

$$|E^a\rangle_{\perp B} = \hat{F}^a |E\rangle_{\perp B}, \quad \hat{F}^a = \begin{pmatrix} f_p^a & 0 \\ 0 & f_s^a \end{pmatrix}$$

其中 $f_p^a, f_s^a$ 是 p(TM) 和 s(TE) 偏振的 Fresnel 系数（$f^{i,r,t} \equiv 1, R, T$）。能量系数满足能量守恒：

$$Q_r + Q_t = Q = 1, \quad Q^a = \zeta^a \frac{\cos\vartheta^a}{\cos\vartheta} \, \mathcal{Q}^a$$

其中 $\mathcal{Q}^a = |f_p^a|^2|e_X|^2 + |f_s^a|^2|e_y|^2$。

### 3.2 光束场变换——界面的有效 Jones 矩阵

这是文章**最核心的技术部分**。具有有限谱宽的光束必须处理**非中心平面波分量**。

#### 波矢偏转的刻画

非中心波矢 $\mathbf{k} = \mathbf{k}_c + \boldsymbol{\chi}$，小的正交偏转为：

$$\boldsymbol{\chi} \simeq k(\mu\, u_X + \nu\, u_y)$$

- $\mu$: **面内偏转**（改变入射角）
- $\nu$: **面外偏转**（改变入射面）

Snell 定律给出各光束中偏转的关系：

$$\mu^a = \frac{k^a}{k}\gamma \mu, \quad \nu^a = \frac{k^a}{k}\nu$$

其中 $\gamma^a = \cos\vartheta/\cos\vartheta^a$ 是**椭圆变形系数**（$\gamma^i = 1$，$\gamma^r = -1$，$\gamma^t = \cos\vartheta/\cos\vartheta'$）。

#### 到球坐标 (p/s 模基) 的旋转变换

将光束坐标架的场变换到全局球坐标架（p/s 模基）需要复合旋转 $\hat{U}_\vartheta = \hat{R}_y(\theta^a)\hat{R}_z(\varphi^a)\hat{R}_y(-\vartheta^a)$。

在 $\boldsymbol{\chi}$ 的一阶近似下：

$$\theta^a \simeq \vartheta^a + \mu^a, \quad \varphi^a \simeq \frac{\nu^a}{\sin\vartheta^a}$$

得到 $2 \times 2$ 的横向旋转变换（在线偏振基中）：

$$\hat{U}_{\vartheta\perp} \simeq \begin{pmatrix} 1 & -\Phi_B^a \\ \Phi_B^a & 1 \end{pmatrix}$$

其中 $\Phi_B^a = -\nu^a \cot\vartheta^a = -\varphi^a \cos\vartheta^a$ **正是 Berry 几何相位！**

在圆偏振基中，此矩阵对角化：

$$\hat{V}_\perp \hat{U}_{\vartheta\perp} \hat{V}_\perp^\dagger \simeq \begin{pmatrix} e^{-i\Phi_B^a} & 0 \\ 0 & e^{i\Phi_B^a} \end{pmatrix} = \exp(-i\hat{\sigma}_3 \Phi_B^a)$$

**这是自旋-轨道相互作用的有效 Jones 矩阵！** 正是这个从光束坐标架到全局球坐标架的自由空间旋转变换，导致了横向 IF 位移（光的自旋霍尔效应）。

#### Fresnel 边界条件在球坐标基中

在球坐标基（p/s 模）中，Fresnel 条件需要考虑入射角的微小变化 $\mu$：

$$\hat{F}^a \simeq \begin{pmatrix} f_p^a\left(1 + \mu\frac{\partial \ln f_p^a}{\partial\vartheta}\right) & 0 \\ 0 & f_s^a\left(1 + \mu\frac{\partial \ln f_s^a}{\partial\vartheta}\right) \end{pmatrix}$$

Fresnel 系数对角度的导数 $\partial\ln f_{p,s}^a/\partial\vartheta$ 正是 GH 位移的来源。

#### 完整界面的 Jones 矩阵

将旋转和 Fresnel 条件组合，得到界面在光束坐标架中的完整 Jones 矩阵 $\hat{T}_\perp^a$：

$$\boxed{\hat{T}_\perp^a \simeq \begin{pmatrix} f_p^a(1 + \mu X_p^a) & f_p^a \nu Y_p^a \\ -f_s^a \nu Y_s^a & f_s^a(1 + \mu X_s^a) \end{pmatrix}}$$

其中：

$$\boxed{X_{p,s}^a = \frac{\partial \ln f_{p,s}^a}{\partial\vartheta}, \quad Y_{p,s}^a = \left(1 - \gamma^{a-1} \frac{f_{s,p}^a}{f_{p,s}^a}\right)\cot\vartheta}$$

**这是本文的核心结果。** 它描述了傍轴光束在介质界面反射/折射时的所有一阶场变换。

**关键观察**：
- $X_{p,s}^a$ 项（对角，$\mu$ 依赖）→ **面内 GH 位移**
- $Y_{p,s}^a$ 项（非对角，$\nu$ 依赖）→ **面外 IF 位移**
- GH 项在线偏振基下对角，IF 项在圆偏振基下对角 → **不存在全局偏振本征模，界面总是产生偏振混合**

### 3.3 高斯光束的位移

取入射高斯光束（束腰 $w_0$，在 $Z=0$ 处）：$|\tilde{E}\rangle_{\perp B} = |e\rangle_{\perp B} \, G(\mu, \nu)$，其中 $G = \frac{w_0^2}{2\pi} \exp[-(kw_0)^2(\mu^2+\nu^2)/4]$。

通过 $\hat{T}_\perp^a$ 变换后，计算期望值得到：

#### 部分反射/透射情况 ($\sin\vartheta < n$，Fresnel 系数为实数)

**面内 GH 位移（X 方向）**：

$$\boxed{\langle X^a \rangle = 0, \quad \langle P_X^a \rangle = \frac{\gamma^a}{kw_0^2}\frac{d\ln Q^a}{d\vartheta}}$$

- 空间 GH 位移为零（对于无损耗界面上的高斯光束）
- 角度 GH 偏转（Fresnel 滤波效应）非零，来自 Fresnel 系数的**振幅**对角度的依赖

**面外 IF 位移（Y 方向）**：

$$\boxed{\langle Y^a \rangle = -\frac{\bar{\sigma}}{2k}\, \frac{f_p^{a2} Y_p^a + f_s^{a2} Y_s^a}{Q^{a2}}}$$

$$\boxed{\langle P_Y^a \rangle = \frac{\bar{\rho}}{kw_0^2}\, \frac{f_p^{a2} Y_p^a - f_s^{a2} Y_s^a}{Q^{a2}}}$$

其中：
- $\bar{\sigma} = 2\,\text{Im}(e_X^* e_y)$ — **平均螺旋度**（Stokes 参数 $S_3$）
- $\bar{\rho} = 2\,\text{Re}(e_X^* e_y)$ — **45°线偏振度**（Stokes 参数 $S_2$）

**关键物理**：
- **空间 IF 位移** $\langle Y^a \rangle$ 的本征模式是**圆偏振** $\bar{\sigma} = \pm 1$，位移正比于入射波的螺旋度 → **光的自旋霍尔效应**
- **角度 IF 偏转** $\langle P_Y^a \rangle$ 的本征模式是**45°线偏振** $\bar{\rho} = \pm 1$

#### 全内反射情况 ($\sin\vartheta > n$)

反射系数变为复数 $f_{p,s}^r = \exp(i\delta_{p,s})$，相位差 $\delta = \delta_s - \delta_p$。

$$\boxed{\langle X_{\text{tot}}^r \rangle = \frac{1}{k}\left(|e_X|^2 \text{Im}X_p^r + |e_y|^2 \text{Im}X_s^r\right), \quad \langle P_{X\,\text{tot}}^r \rangle = 0}$$

$$\boxed{\langle Y_{\text{tot}}^r \rangle = -\frac{1}{2k}\left[\bar{\sigma}\,\text{Re}(Y_p^r + Y_s^r) + \bar{\rho}\,\text{Im}(Y_p^r - Y_s^r)\right], \quad \langle P_{Y\,\text{tot}}^r \rangle = 0}$$

- 全内反射时有非零的空间 GH 位移（来自 Fresnel 系数**相位**对角度的依赖）
- 角度偏转消失

### 3.4 动量和角动量守恒

#### 角动量守恒 → 空间 IF 位移

介质绕 $z$ 轴的旋转对称性意味着总角动量的 $z$ 分量守恒。从 Fresnel 边界条件可得各光束中的自旋 AM：

$$\langle S_z^a \rangle = \bar{\sigma} \cos\vartheta^a \frac{f_p^a f_s^a}{Q^{a2}}$$

（全内反射时 $\langle S_z^{\text{tot }r} \rangle = -(\bar{\sigma}\cos\delta + \bar{\rho}\sin\delta)\cos\vartheta$）

IF 位移产生的外部轨道 AM 为：

$$\langle L_z^{\text{ext }a} \rangle = [\langle \mathbf{R}^a \rangle \times \langle \mathbf{P}^a \rangle]_z = -\langle Y^a \rangle k \sin\vartheta$$

角动量守恒方程：

$$\boxed{Q_r\left[\langle S_z^r \rangle - \langle Y^r \rangle k\sin\vartheta\right] + Q_t\left[\langle S_z^t \rangle - \langle Y^t \rangle k\sin\vartheta\right] = \langle S_z \rangle}$$

**自旋 AM 在 Fresnel 反射/折射中的变化必须由次级光束的非零外部轨道 AM 来补偿。** 这正是为什么至少需要一个横向位移（$\langle Y^r \rangle$ 或 $\langle Y^t \rangle$）非零。

特别地，全内反射时 $Q_t = 0, Q_r = 1$：

$$\boxed{\langle Y_{\text{tot}}^r \rangle = \frac{\langle S_z^{\text{tot }r} \rangle - \langle S_z \rangle}{k\sin\vartheta}}$$

这表明全内反射时的 IF 位移**非常鲁棒**，几乎不依赖于入射光束的细节形状。

#### 线动量守恒 → 角度偏转

切向动量分量的平衡给出：

$$-Q_r\langle P_X^r \rangle \cos\vartheta + Q_t\langle P_X^t \rangle \cos\vartheta' = 0$$

$$Q_r\langle P_Y^r \rangle + Q_t\langle P_Y^t \rangle = 0$$

角度 GH 和 IF 偏转必须满足这些关系。

**重要结论**："微观"的平面波干涉结果（3.17-3.20 式）与"宏观"的守恒律论据（3.23-3.25 式）**完全一致**。

---

## 4. 涡旋光束的 GH 和 IF 位移

### 4.1 轨道角动量的 Fresnel 边界条件

入射涡旋光束（$\ell \neq 0$）在界面处其内禀轨道 AM 因光束椭圆变形而改变：

$$\langle \mathbf{L}^{\text{int }a} \rangle = \frac{\ell}{2}\left(\gamma^a + \frac{1}{\gamma^a}\right) \mathbf{u}_Z^a$$

具体地：

$$\langle L_z^{\text{int }r} \rangle = -\ell, \quad \langle L_z^{\text{int }t} \rangle = \frac{\ell}{2}\left(\frac{\cos\vartheta}{\cos\vartheta'} + \frac{\cos\vartheta'}{\cos\vartheta}\right)$$

### 4.2 标量轨道霍尔效应

由轨道 AM 守恒导出的纯 $\ell$ 依赖横向位移（与偏振无关，可视为标量波的位移）：

$$\boxed{\langle Y^a \rangle = \frac{\langle L_z^{\text{int }a} \rangle - \langle L_z^{\text{int}} \rangle}{k\sin\vartheta}}$$

即：

$$\boxed{\langle Y^r \rangle = 0, \quad \langle Y^t \rangle = \frac{\ell}{2k}\tan\vartheta\,(1 - n^{-2})}$$

这是**光的轨道霍尔效应**——内禀和外禀轨道 AM 之间的轨道-轨道相互作用。注意其 $\propto k^{-1}\tan\vartheta$ 的行为，与 IF 位移的 $\propto k^{-1}\cot\vartheta$ 完全不同。

### 4.3 偏振-涡旋耦合位移

涡旋结构还会与偏振依赖的角度偏转耦合，产生额外的 $\ell$ 依赖位移。

引入**复位移**概念：

$$\delta X^a = \langle X^a \rangle - i\gamma^{a-1}\frac{w_0^2}{2}\langle P_X^a \rangle, \quad \delta Y^a = \langle Y^a \rangle - i\frac{w_0^2}{2}\langle P_Y^a \rangle$$

涡旋结构 $[\gamma^a X^a + i\,\text{sgn}(\ell)\,y]^{|\ell|}$ 将虚部位移转化为正交方向的实部位移。结果是：

$$\boxed{\langle X^a \rangle = \ell\gamma^{a-1}\frac{w_0^2}{2}\langle P_y^a \rangle|_{\ell=0}}$$

$$\boxed{\langle Y^a \rangle = -\ell\gamma^{a-1}\frac{w_0^2}{2}\langle P_X^a \rangle|_{\ell=0}}$$

而角度偏转（对于 Laguerre-Gaussian 光束）被涡旋放大：

$$\langle P_X^a \rangle = |\ell| \langle P_X^a \rangle|_{\ell=0}, \quad \langle P_Y^a \rangle = |\ell| \langle P_Y^a \rangle|_{\ell=0}$$

### 4.4 总结：涡旋光束的总位移

涡旋光束的总位移 = **三类贡献之和**：

1. **偏振依赖的 GH 和 IF 位移**（3.17-3.20 式，$\ell = 0$ 情况）
2. **标量轨道霍尔效应**（4.2 式）— 仅透射光束，$\propto \ell$
3. **偏振-涡旋耦合位移**（4.4-4.5 式）— 来自角度偏转与涡旋结构的耦合

**重要特征**：
- 圆偏振高斯光束的 IF 位移是**完美的平移**（无变形）
- 涡旋光束的位移伴随着**显著的强度分布变形**（涡旋分裂为 $|\ell|$ 个单位强度的涡旋星座）
- 全内反射时**无** $\ell$ 依赖位移（反射光束的 $\ell$ 因 $\gamma^r = -1$ 而有效翻转）

---

## 5. 扩展与相关问题

### 5.1 量子弱测量

GH 和 IF 位移的典型量级为 $k^{-1}$（亚波长量级），直接测量很困难。**量子弱测量**技术利用几乎正交的预选择/后选择偏振器，可将位移放大到光束宽度的量级。

**原理**：弱测量得到的 beam shift 实际上测量的是界面 Jones 矩阵（3.14 式）的对应矩阵元，可被解释为偏振-动量耦合的等效 Hamiltonian。

### 5.2 高阶变形（像差）

光束质心位移只是强度分布的一阶矩。反射/透射光束还会经历**高阶变形（像差）**。涡旋光束的 $\ell = 1$ 涡旋分裂为 $|\ell|$ 个单位强度涡旋的星座，表征了界面性质。

### 5.3 特殊角度

- **Brewster 角**附近：IF 位移（自旋霍尔效应）发散 → **已被理论和实验充分研究**
- **临界角**附近：GH 位移发散，IF 位移的理论与实验尚未完全吻合（实验值约为 Schilling 公式预测的 1.5 倍）→ **需要进一步研究**

### 5.4 复杂入射光束

- 非高斯光束（Bessel、高阶 Laguerre-Gaussian、Hermite-Gaussian 等）
- 部分相干光束 → 理论争议已由实验解决

### 5.5 复杂介质

金属、损耗介质、半导体、各向异性（手性）介质、多层结构、超材料、光子晶体、薄膜、谐振腔、等离子体系统、弯曲界面（透镜）、非线性介质等均已被研究。

### 5.6 相关效应

- **梯度折射率介质中的 Hall 效应**：可作为多个低对比度界面 IF 位移的连续极限
- **几何 Hall 效应**：倾斜截面中观察到的光束位移（与轨道霍尔效应类似，$\propto \ell\tan\vartheta/2k$）
- **相对论 Hall 效应**：在运动参考系中观察光束时的类似位移

---

## 6. 主要结论

### 核心物理机制

1. **GH 位移**源于 Fresnel 系数的**空间色散**（对角度的依赖），可在线偏振基下对角化，也可发生于标量波。

2. **IF 位移**（光的自旋霍尔效应）源于**几何 Berry 相位**——光束中不同方位角的平面波分量之间因坐标旋转而产生的相位差。它在圆偏振基下对角化，**必须用三维几何**（而非仅入射面内的二维几何）来理解。

### 界面的有效 Jones 矩阵

$$\hat{T}_\perp^a \simeq \begin{pmatrix} f_p^a(1 + \mu X_p^a) & f_p^a \nu Y_p^a \\ -f_s^a \nu Y_s^a & f_s^a(1 + \mu X_s^a) \end{pmatrix}$$

- 对角项（$\mu X_{p,s}$）→ 面内 GH 效应
- 非对角项（$\nu Y_{p,s}$）→ 面外 IF 效应
- GH 项在线偏振基下对角，IF 项在圆偏振基下对角 → **界面总是产生偏振混合**

### 守恒律

- **角动量守恒** ↔ 空间 IF 位移（自旋 AM 变化由外禀轨道 AM 补偿）
- **线动量守恒** ↔ 角度 GH/IF 偏转

"微观"干涉计算与"宏观"守恒律论据完全一致。

### 涡旋光束

- 存在极化无关的**轨道霍尔效应**（$\propto \ell\tan\vartheta$）
- 偏振与涡旋耦合产生额外位移
- 自旋霍尔效应是**完美平移**，涡旋位移伴随**光束变形**

### 普适性

文中描述的 Jones 矩阵方法具有很高的普适性，可直接推广到金属、损耗、各向异性、层状结构等各类复杂界面。GH 和 IF 位移几乎是**每个光学系统中都存在**的基本现象。

---

## 附录：关键公式速查表

| 公式 | 物理含义 | 表达式 |
|------|---------|--------|
| Berry 相位 | 球坐标中方位角旋转产生的几何相位 | $\Phi_B = -\varphi\cos\vartheta$ |
| 旋转变换参数 | 光束偏转对应的球坐标变化 | $\theta^a \simeq \vartheta^a + \mu^a,\ \varphi^a \simeq \nu^a/\sin\vartheta^a$ |
| $X_{p,s}^a$ | GH 色散参数（面内） | $\partial\ln f_{p,s}^a/\partial\vartheta$ |
| $Y_{p,s}^a$ | IF 几何参数（面外） | $(1 - \gamma^{a-1}f_{s,p}^a/f_{p,s}^a)\cot\vartheta$ |
| $\langle Y^a \rangle$ | 空间 IF 位移 | $\propto \bar{\sigma}/k$，本征模式为圆偏振 |
| $\langle P_Y^a \rangle$ | 角度 IF 偏转 | $\propto \bar{\rho}/kw_0^2$，本征模式为45°线偏振 |
| $\langle X^a \rangle$ | 空间 GH 位移 | $\propto \text{Im}(\partial\ln f/\partial\vartheta)/k$，全内反射时非零 |
| $\langle P_X^a \rangle$ | 角度 GH 偏转 | $\propto d\ln Q^a/d\vartheta$，部分反射/透射时非零 |
| 轨道霍尔效应 | 涡旋导致的横向位移 | $\langle Y^t \rangle = \frac{\ell}{2k}\tan\vartheta(1-n^{-2})$ |
| AM 守恒 | 自旋变化+外禀轨道补偿 | $\Delta\langle S_z \rangle = \Delta(\langle Y \rangle k\sin\vartheta)$ |
