# 7.6 非共线旋转多普勒效应 (Non-collinear Rotational Doppler Effect)

## 1. 问题背景

在第 7.1 节中，旋转多普勒效应（RDE）的观测条件是光源（光束）或观察者（探测系统）绕**光束轴**旋转。然而，更一般的情况是光束轴与旋转轴不重合，即"非共线"情形。

一个典型的例子是**锥形扫描**（conical scanning）方案（图 31）：输入光束经倾斜反射镜反射后形成输出光束，反射镜绕输入光束轴以角速度 $\Omega$ 旋转。由于反射镜倾斜角度 $\beta$，输出光束轴在一个圆锥面上运动。其他实现锥形扫描的系统也可以类似描述。

在这种非共线情形下，仍然存在一种旋转多普勒效应，即"非共线 RDE"。

---

## 2. 能量分析推导（与第 7.2 节类比）

### 2.1 基本假设

设输入光束为圆螺旋（CS）光束，具有方位角指数 $l$，即每个光子携带的轨道角动量（OAM）为 $l\hbar$。

### 2.2 力矩计算

参考图 31，光束受到的力矩大小为：

$$|\mathbf{K}| = 2|\mathbf{L}|c \cos\beta = 2l\hbar \cos\beta \quad (\text{单位光子通量})$$

其中因子 2 来源于反射过程（动量改变量为入射的两倍），$\cos\beta$ 来自倾斜角度的投影。

### 2.3 能量变化

光束能量的变化为力矩与角速度的点积：

$$\Delta E = (\mathbf{K} \cdot \mathbf{\Omega}) = -2l\hbar\Omega \cos^2\beta$$

即**每个光子**的能量变化为：

$$\Delta E_{\text{per photon}} = -2l\hbar\Omega \cos^2\beta$$

### 2.4 频率移动

由光子能量与频率的关系 $\Delta E = \hbar \Delta\omega$，可得输出光束的频率移动为：

$$\boxed{\Delta\omega = -2l\Omega \cos^2\beta} \tag{86}$$

---

## 3. 第一个悖论：相位不自洽

### 3.1 相位积累

由频率移动 (86)，螺旋光束在反射镜转过角度 $\theta = \Omega t$ 后的相位变化为：

$$\Delta(k\varphi) = \Delta\omega \, t = -2l\Omega t \cos^2\beta = -2l\theta \cos^2\beta \tag{87}$$

### 3.2 悖论

当反射镜完成**完整一周旋转**（$\theta = 2\pi$）后，系统恢复到初始几何构型，但相位增量为：

$$\Delta(k\varphi) = -4\pi l \cos^2\beta$$

这**不是** $2\pi$ 的整数倍（除非 $\beta$ 取特定值）。

### 3.3 对光束横截面的影响

由于螺旋光束的相位与其方位角取向直接相关（第 7.1、7.3 节），如果输入光束包含形如式 (80) 的螺旋谐波叠加，那么相位增量 (87) 意味着：反射镜完成完整一周旋转后，输出光束的横向轮廓**并不复原**，而是旋转了一个角度：

$$\boxed{\Delta\alpha_1 = -4\pi\cos^2\beta} \tag{88}$$

这个结论与日常经验严重矛盾——机械系统回到初始位置时，光束图像理应也回到初始状态。

---

## 4. 第二个悖论：图像旋转次数的跃变

在锥形扫描中（图 32）：

- **"前向"反射**（$\beta < 45^\circ$）：反射镜每转一圈，输出图像转**两圈**。
- **"后向"反射**（$\beta > 45^\circ$）：输出图像**完全不转**。

（这个事实很容易用手持镜子亲自验证。）

通过连续改变反射镜倾斜角 $\beta$，可以连续地从第一种情形过渡到第二种情形。然而，在任何可想象的观测中，反射镜转一圈期间只能看到**整数**圈图像旋转——从"两圈"到"零圈"的连续过渡是不可想象的。

---

## 5. 悖论的解决：参考系的选择

### 5.1 核心问题

在共线情形中，光束轴固定，观察者自然地也是固定的，参考系选择不构成问题。但在非共线情形中，根据第 7.1 节末尾的讨论，观察者"附着"在与光束轴正交的平面上（图 24），因此观察者被迫运动。观察者的**运动方式**成为关键问题。

### 5.2 "地球仪"模型（图 33）

- 输入光束沿 $Z$ 轴向上传播。
- 倾斜反射镜位于点 $M$。
- 输出光束轴的单位方向矢量 $\mathbf{t}(\theta)$ 在单位球面上沿一条"纬线"运动，该纬线的"纬度"为 $\pi/2 - 2\beta$。
- 探测系统位于与球面相切的平面内，其参考轴单位矢量 $\mathbf{e}(\theta)$ 始终正交于 $\mathbf{t}(\theta)$。

### 5.3 参考系的"自然"运动方程

在锥形扫描过程中，参考系从某种"内禀"角度看保持不变，但相对于实验室系，参考系可能绕 $\mathbf{t}$ 旋转。"自然"的参考系运动由以下方程决定：

$$\boxed{\frac{d\mathbf{e}}{d\theta} = -\left(\frac{d\mathbf{t}}{d\theta} \cdot \mathbf{e}\right)\mathbf{t}} \tag{89}$$

**物理图像**：这个运动类似于一个平衡箭头，自由地（无摩擦地）"钉"在输出光束轴 $\mathbf{t}$ 上。当轴无限缓慢地移动时，箭头试图保持其位置，但移动的轴会"牵扯"它产生某种运动。

### 5.4 几何相位的积累

设箭头的初始位置与经线重合（图 33 中的点 A）。当轴在球面上移动一小段路径后，箭头的所有点移动相同的路径；但由于经线向极点"汇聚"，在路径终点 B 处，箭头与当前经线之间形成一个夹角：

$$\Delta\alpha = \Delta\theta \cos^2\beta \quad \text{（综述原文表述）}$$

> **注**：2004 年原论文和本文第 8 节的独立推导表明，正确的偏转率应为 $d\varphi/d\theta = -\cos 2\beta$（$xyz$ 系中）。综述此处的 $\Delta\alpha = \Delta\theta \cos^2\beta$ 在函数形式（$\cos^2\beta$ vs $\cos 2\beta$）和符号上均有误。详见第 8.5 节。以下按综述原文的数值继续叙述，物理结论（图案复原、连续过渡）不受此笔误影响。

这个角度来自球面上平行输运的几何性质（经线不平行）。

在反射镜旋转过程中，这种相对取向的变化不断积累。完成一周旋转后，箭头相对于其初始位置偏转了：

$$\Delta\alpha_{\text{total}} = 2\pi\cos^2\beta \quad \text{（综述原文表述；正确值见第 8.4 节 } \Delta\Phi_{\text{holonomy}} = -2\pi\cos 2\beta \text{）}$$

---

## 6. 在自然参考系中重新理解现象

### 6.1 光束轮廓的旋转

在自然参考系中，反射镜转过 $\Delta\theta$ 后，光束横向轮廓的角位移为：

$$\Delta\theta (1 + \cos 2\beta) = 2\Delta\theta \cos^2\beta$$

这意味着：

- 光束轮廓以角速率 $2\Omega \cos^2\beta$ 旋转，与频率移动 (86) 一致。
- 这确实允许从 $\beta = 0$（"前向"反射，双倍旋转）到 $\beta = \pi/2$（"后向"反射，零旋转）的**连续过渡**。

### 6.2 表观"跃变"的解释

图 32 中光束轮廓行为的表观"跃变"，是因为人们试图**固定参考系**（或以阶跃方式改变参考系）而人为造成的。

---

## 7. 拓扑本质与几何相位

### 7.1 纯几何起源

上述现象具有**纯几何本质**，来源于绕非共线轴旋转的组合规则。其类似现象存在于物理学的多个分支：

- 式 (89) 描述了矢量 $\mathbf{e}$ 在单位球面上的**平行输运**（parallel transport）。平行输运沿闭合回路一周后，矢量不会恢复初始取向，而是偏转一个角度，该角度等于回路所张的**立体角**。
- 同样的方程 (89) 表达了扭曲光线偏振面旋转的 **Rytov 定律**。
- 自然参考系相对于"地球仪"经线的运动与著名的 **Foucault 摆**的摆动平面运动完全一致。

### 7.2 Hannay 几何相位与 Berry 相位

这些现象是 **Hannay 几何相位**的体现，是 **Berry 拓扑相位**在非完整（non-holonomic）系统绝热演化中的特例。拓扑本质使得这些效应**不依赖于光束扫描的具体方式**——只要光束轴在单位球面上描出任意闭合回路，就会产生类似的非整数相移和参考系旋转。

### 7.3 螺旋光束的附加相位和旋转

式 (75) 中的附加相位和式 (76) 中的光束旋转也是几何相位的体现，但这些**仅在"自然"观察者看来**才可见。

### 7.4 实验室系中的抵消

在**实验室参考系**中：
- 与参考系运动相关的几何相位
- 与光束相对于该参考系运动相关的几何相位

两者**恰好相互抵消**。这就是为什么在实验室中这两者分别都不可观测。然而，它们的存在**隐含地**体现在光束横向图案旋转随反射镜倾斜角变化的特殊图像中（图 32）。

---

## 8. 几何相位的完整计算与拓扑本质

本节对非共线 RDE 中的几何相位进行完整、严格的数学计算，并在此基础上阐明两个悖论的拓扑本质。

### 8.1 球面几何设定

输出光束轴方向的单位矢量 $\mathbf{t}(\theta)$ 在单位球面 $S^2$ 上运动。由锥形扫描的几何关系（图 31），反射镜倾角为 $\beta$ 时，输出光束轴与输入光束轴（$Z$ 轴）的夹角为 $2\beta$。因此 $\mathbf{t}(\theta)$ 描出一条**余纬** $\alpha = 2\beta$ 的纬线（图 33），其参数方程为：

$$\mathbf{t}(\theta) = \begin{pmatrix} \sin 2\beta \cos\theta \\ \sin 2\beta \sin\theta \\ \cos 2\beta \end{pmatrix}, \quad \theta \in [0, 2\pi] \tag{A1}$$

其中 $\theta = \Omega t$ 是反射镜绕 $Z$ 轴的转角。该纬线的"地理纬度"为 $\lambda = \pi/2 - 2\beta$。

### 8.2 切平面上的正交标架

参考矢量 $\mathbf{e}$ 必须时刻与 $\mathbf{t}$ 正交，即 $\mathbf{e}$ 位于 $\mathbf{t}$ 处的切平面 $T_{\mathbf{t}}S^2$ 中。在每一点 $\mathbf{t}(\theta)$ 处构造正交归一标架 $\{\hat{\mathbf{e}}_\theta, \hat{\mathbf{e}}_\phi\}$：

$$\hat{\mathbf{e}}_\theta(\theta) = \begin{pmatrix} \cos 2\beta \cos\theta \\ \cos 2\beta \sin\theta \\ -\sin 2\beta \end{pmatrix} \quad \text{(沿经线向南)} \tag{A2}$$

$$\hat{\mathbf{e}}_\phi(\theta) = \begin{pmatrix} -\sin\theta \\ \cos\theta \\ 0 \end{pmatrix} \quad \text{(沿纬线向东)} \tag{A3}$$

验证：$\hat{\mathbf{e}}_\theta \cdot \mathbf{t} = \hat{\mathbf{e}}_\phi \cdot \mathbf{t} = \hat{\mathbf{e}}_\theta \cdot \hat{\mathbf{e}}_\phi = 0$，且 $|\hat{\mathbf{e}}_\theta| = |\hat{\mathbf{e}}_\phi| = 1$。三元组 $\{\hat{\mathbf{e}}_\theta, \hat{\mathbf{e}}_\phi, \mathbf{t}\}$ 构成右手正交标架。

将 $\mathbf{e}(\theta)$ 在此标架中展开：

$$\mathbf{e}(\theta) = \cos\varphi(\theta) \,\hat{\mathbf{e}}_\theta(\theta) + \sin\varphi(\theta) \,\hat{\mathbf{e}}_\phi(\theta) \tag{A4}$$

其中 $\varphi(\theta)$ 是 $\mathbf{e}$ 相对于经线方向 $\hat{\mathbf{e}}_\theta$ 的夹角。

### 8.3 平行输运方程的显式求解

方程 (89) 即 $S^2$ 上的**平行输运方程**：

$$\frac{d\mathbf{e}}{d\theta} = -\left(\frac{d\mathbf{t}}{d\theta} \cdot \mathbf{e}\right)\mathbf{t} \tag{89}$$

其几何意义是：$d\mathbf{e}/d\theta$ 在切平面上的分量为零，即 $\mathbf{e}$ 沿路径的协变导数为零。

**第 1 步：计算 $\mathbf{t}$ 的导数**

$$\frac{d\mathbf{t}}{d\theta} = \begin{pmatrix} -\sin 2\beta \sin\theta \\ \sin 2\beta \cos\theta \\ 0 \end{pmatrix} = \sin 2\beta \;\hat{\mathbf{e}}_\phi \tag{A5}$$

**第 2 步：计算 $\mathbf{e}$ 的导数**

由 (A4) 求导：

$$\frac{d\mathbf{e}}{d\theta} = -\sin\varphi \frac{d\varphi}{d\theta}\hat{\mathbf{e}}_\theta + \cos\varphi \frac{d\hat{\mathbf{e}}_\theta}{d\theta} + \cos\varphi \frac{d\varphi}{d\theta}\hat{\mathbf{e}}_\phi + \sin\varphi \frac{d\hat{\mathbf{e}}_\phi}{d\theta}$$

需要计算基矢量的导数：

$$\frac{d\hat{\mathbf{e}}_\theta}{d\theta} = \begin{pmatrix} -\cos 2\beta\sin\theta \\ \cos 2\beta\cos\theta \\ 0 \end{pmatrix} = \cos 2\beta \;\hat{\mathbf{e}}_\phi \tag{A6}$$

$$\frac{d\hat{\mathbf{e}}_\phi}{d\theta} = \begin{pmatrix} -\cos\theta \\ -\sin\theta \\ 0 \end{pmatrix} = -\cos 2\beta \;\hat{\mathbf{e}}_\theta - \sin 2\beta \;\mathbf{t} \tag{A7}$$

（(A7) 的推导：将 $(\cos\theta, \sin\theta, 0)$ 在 $\{\hat{\mathbf{e}}_\theta, \hat{\mathbf{e}}_\phi, \mathbf{t}\}$ 中展开，其在 $\hat{\mathbf{e}}_\theta$ 上的投影为 $\cos 2\beta$，在 $\hat{\mathbf{e}}_\phi$ 上的投影为 $0$，在 $\mathbf{t}$ 上的投影为 $\sin 2\beta$。）

**第 3 步：代入并整理**

代入 (A6)、(A7)：

$$\frac{d\mathbf{e}}{d\theta} = \left[-\frac{d\varphi}{d\theta}\sin\varphi - \sin\varphi\cos 2\beta\right]\hat{\mathbf{e}}_\theta + \left[\frac{d\varphi}{d\theta}\cos\varphi + \cos\varphi\cos 2\beta\right]\hat{\mathbf{e}}_\phi + \left[-\sin\varphi\sin 2\beta\right]\mathbf{t} \tag{A8}$$

**第 4 步：与方程 (89) 的右端比较**

由 (A5)：$d\mathbf{t}/d\theta = \sin 2\beta\,\hat{\mathbf{e}}_\phi$，因此：

$$\frac{d\mathbf{t}}{d\theta} \cdot \mathbf{e} = \sin 2\beta \,(\hat{\mathbf{e}}_\phi \cdot \mathbf{e}) = \sin 2\beta \sin\varphi$$

方程 (89) 的右端为：

$$-\left(\frac{d\mathbf{t}}{d\theta} \cdot \mathbf{e}\right)\mathbf{t} = -\sin 2\beta \sin\varphi \;\mathbf{t} \tag{A9}$$

比较 (A8) 与 (A9)，切平面分量（$\hat{\mathbf{e}}_\theta$ 和 $\hat{\mathbf{e}}_\phi$ 方向）的系数必须为零：

$$\begin{cases} -\frac{d\varphi}{d\theta}\sin\varphi - \sin\varphi\cos 2\beta = 0 \\ \frac{d\varphi}{d\theta}\cos\varphi + \cos\varphi\cos 2\beta = 0 \end{cases}$$

两个方程给出相同的结果：

$$\boxed{\frac{d\varphi}{d\theta} = -\cos 2\beta} \tag{A10}$$

$\mathbf{t}$ 方向的分量自动满足，这是对推导自洽性的验证。

**第 5 步：积分求解**

方程 (A10) 的解为：

$$\varphi(\theta) = \varphi_0 - \theta \cos 2\beta \tag{A11}$$

初始条件：在 $\theta = 0$ 处，"箭头的初始位置与经线重合"（第 5.4 节），即 $\varphi(0) = 0$，故 $\varphi_0 = 0$：

$$\varphi(\theta) = -\theta \cos 2\beta \tag{A12}$$

### 8.4 几何相位（Holonomy）

反射镜完成完整一周旋转 $(\theta: 0 \to 2\pi)$ 后：

- $\mathbf{t}(2\pi) = \mathbf{t}(0)$：光束轴回到初始方向
- $\hat{\mathbf{e}}_\theta(2\pi) = \hat{\mathbf{e}}_\theta(0)$，$\hat{\mathbf{e}}_\phi(2\pi) = \hat{\mathbf{e}}_\phi(0)$：切平面标架复原
- $\mathbf{e}$ 的角参数：$\varphi(2\pi) = -2\pi \cos 2\beta$

由于标架 $\{\hat{\mathbf{e}}_\theta, \hat{\mathbf{e}}_\phi\}$ 已复原，$\mathbf{e}(2\pi)$ 相对于 $\mathbf{e}(0)$ 的偏转角即 $\varphi(2\pi) - \varphi(0)$：

$$\boxed{\Delta\Phi_{\text{holonomy}} = -2\pi \cos 2\beta} \tag{A13}$$

这就是 $S^2$ 上平行输运沿闭合回路一周产生的**和乐**（holonomy）。其绝对值等于纬线所围球冠的立体角：

$$\Omega_{\text{solid}} = \int_0^{2\pi}\int_0^{2\beta} \sin\theta'\,d\theta'\,d\phi = 2\pi(1 - \cos 2\beta) \equiv -2\pi\cos 2\beta \pmod{2\pi} \tag{A14}$$

### 8.5 与综述公式的对比：符号与函数形式的差异

将以上严格推导的结果与综述第 7.6 节的公式对比：

| 量 | 综述 7.6 节 | 本推导 (8.3–8.4) | 2004 原论文 |
|----|-----------|-----------------|-----------|
| $\mathbf{e}$ 偏转率（$xyz$ 系中） | $\Delta\alpha/\Delta\theta = \cos^2\beta$ | $d\varphi/d\theta = -\cos 2\beta$ | $d\psi/d\theta = -\cos 2\beta$（由 Eq. (20)） |
| 一周累积偏转角 | $2\pi\cos^2\beta$ | $-2\pi\cos 2\beta$ | $2\pi\cos 2\beta$（$xyz$ 系）或 $4\pi\sin^2\beta$（$x'y'z$ 系） |

存在两处差异：

1. **函数形式**：$\cos^2\beta$ vs $\cos 2\beta$。这是两种不同的函数——例如 $\beta = \pi/4$ 时 $\cos^2(\pi/4) = 0.5$，而 $\cos(\pi/2) = 0$。2004 年原论文（Eq. 20）的解中出现的角参数明确为 $\cos 2\beta$（即 $\cos(2\beta)$），验证了 $\cos 2\beta$ 是正确的函数形式。

2. **符号**：综述给出正值（$\cos^2\beta \ge 0$），本推导给出 $-\cos 2\beta$（在 $0 < \beta < \pi/4$ 时 $< 0$）。下面论证负号是正确的。

#### 8.5.1 符号的物理验证

**物理图像**：反射镜绕 $+Z$ 轴以角速度 $\Omega = d\theta/dt > 0$（逆时针，从 $+Z$ 向下看）旋转。输出光束轴 $\mathbf{t}(\theta)$ 沿纬线逆时针（向东）运动。经面 N（由 Z 轴和 $\mathbf{t}$ 的投影所张）同样逆时针推进——这意味着 $\hat{\mathbf{e}}_\theta$（沿经线向南的基矢）在切平面中逆时针转动。

平行输运定义要求参考矢量 $\mathbf{e}$ **在切平面内不自转**。它只随球面弯曲而自然调整，因此 $\mathbf{e}$ 在绝对空间中"尽量保持不动"。

既然经线基矢 $\hat{\mathbf{e}}_\theta$ 逆时针转动，而 $\mathbf{e}$ 尽量不动，则在 $\hat{\mathbf{e}}_\theta$（经线）的参照下，$\mathbf{e}$ 应表现为**顺时针旋转**——即 $\varphi$（从 $\hat{\mathbf{e}}_\theta$ 到 $\mathbf{e}$ 的角）应当**减小**。

因此正确的符号为：

$$\frac{d\varphi}{d\theta} < 0 \quad \text{（对 } \beta < \pi/4 \text{，即北半球纬线）}$$

本推导的结果 $d\varphi/d\theta = -\cos 2\beta$ 满足这一要求（$\cos 2\beta > 0$ 当 $\beta < \pi/4$）。

综述的 $\Delta\alpha = \Delta\theta\cos^2\beta > 0$ 意味着 $\mathbf{e}$ 在经线参照下**逆时针**旋转——即 $\mathbf{e}$ 比经线转得**更快**，这与"尽量保持不动"的平行输运定义矛盾。

**Foucault 摆的旁证**：Foucault 摆的物理与平行输运完全一致。在北半球，摆动面**顺时针**进动（从上向下看）——在本地经线（固定在地球上，随地球逆时针自转）的参照下，摆动面表现为顺时针旋转。这对应于 $d\varphi/d\theta < 0$。

**2004 年原论文的独立验证**：原论文 Eq. (20) 在 $x'y'z$ 系中给出 $\mathbf{e}$ 的角参数为 $\theta - \theta\cos 2\beta + \alpha$。转换到 $xyz$（经纬）系（$\phi_{xyz} = \phi_{x'y'z} - \theta$，见 DetailedComment.md 第 8.7 节）后，角参数为 $-\theta\cos 2\beta + \alpha$，导数 $d\phi/d\theta = -\cos 2\beta$。与本推导**完全一致**（含符号）。

**结论**：综述第 7.6 节中 $\Delta\alpha = \Delta\theta\cos^2\beta$ 在符号和函数形式上均有误。正确的几何相位累积率为 $d\varphi/d\theta = -\cos 2\beta$，一周和乐为 $\Delta\Phi_{\text{holonomy}} = -2\pi\cos 2\beta$（在 $xyz$ 系中）。

#### 8.5.2 光束横向轮廓在自然参考系中的总角位移

尽管 $\mathbf{e}$ 的偏转公式有误，综述中关于光束旋转的核心结论是正确的——因为这些结论依赖于的是 $\mathbf{e}$ 偏转**与光束"proper"旋转之和**，而在自洽的计算中这个和不受上述笔误的影响。

在 $x'y'z$（自然观察者）系中（见 DetailedComment.md 第 8 节坐标系详解），$\mathbf{e}$ 的角速度为 $2\Omega\sin^2\beta$（2004 年原论文 Eq. 21），光束（矢量 $\mathbf{R}$）的角速度为 $2\Omega$（Eq. 12）。自然观察者看到的光束旋转为两者之差：

$$\omega_{\text{beam}} = 2\Omega - 2\Omega\sin^2\beta = 2\Omega\cos^2\beta$$

对应的角位移（反射镜转过 $\Delta\theta$ 时）：

$$\Delta\alpha_{\text{beam}} = 2\Delta\theta\cos^2\beta = \Delta\theta(1 + \cos 2\beta) \tag{A15}$$

这正是综述中"$\Delta\theta(1 + \cos 2\beta) = 2\Delta\theta\cos^2\beta$"的来源——**综述在这一点上是正确的**，因为恒等式 $1 + \cos 2\beta = 2\cos^2\beta$ 保证了两侧等价，且无论 $\mathbf{e}$ 偏转的具体数值如何，只要自洽地计算 $\mathbf{e}$ 偏转与光束自转之和，图案复原（每圈 $4\pi$ 总旋转）的结论始终成立。

### 8.6 悖论一的拓扑解释：相位为什么不闭合

**悖论回顾**：反射镜完成完整一周 $(\theta = 2\pi)$ 后，系统几何构型复原，但由能量分析导出的光束相位增量 $\Delta(k\varphi) = -4\pi l\cos^2\beta$ 不是 $2\pi$ 的整数倍（式 88）。

**拓扑解释**：

这一"反常"相位的根源来自平行输运的和乐。在自然参考系（$x'y'z$ 系）中，参考矢量 $\mathbf{e}$ 沿闭合纬线平行输运一周后，并不回到初始方向。在 $xyz$（经纬）系中，$\mathbf{e}$ 的偏转角（和乐）为 $\Delta\Phi_{\text{holonomy}} = -2\pi\cos 2\beta$（Eq. A13）。在 $x'y'z$ 系中，等效偏转角为 $2\pi(1 - \cos 2\beta) = 4\pi\sin^2\beta$。

这意味着**"自然观察者"的坐标系在闭合路径走完后发生了不可约化的旋转**。光束相位在这个旋转了的坐标系中被测量，因此看起来"不闭合"。这不是光束本身的非单值性，而是**参考系的非单值性**——是 $S^2$ 曲率导致的必然结果。

从自洽性角度：光束的"proper"旋转（Eq. 88 的物理来源）为 $4\pi\cos^2\beta$，$\mathbf{e}$ 的偏转为 $4\pi\sin^2\beta$。两者之和为 $4\pi(\sin^2\beta + \cos^2\beta) = 4\pi$——恰好是整数圈，图案在实验室系中复原。综述中"不闭合"的表观悖论来自只看了光束旋转（$4\pi\cos^2\beta$）而忽略了参考系自身的偏转（$4\pi\sin^2\beta$）——两者之和才是完整的物理观测结果。

用纤维丛的语言：$\mathbf{e}$ 是 $S^2$ 上切丛的一个截面，平行输运定义了一个联络（connection），其曲率（curvature）正比于球面面积元。沿闭合回路的和乐 $\oint d\varphi = \int \text{curvature}$ 就是 Gauss-Bonnet 定理在纬线回路上的体现。

### 8.7 悖论二的拓扑解释：为什么连续过渡成为可能

**悖论回顾**：在锥形扫描中（图 32），$\beta < 45^\circ$ 时图像每圈转两圈，$\beta > 45^\circ$ 时图像不转。若固定参考系，两者之间似乎只能有**整数**圈的跃变，不存在连续过渡。

**拓扑解释**：

在自然参考系（平行输运参考系）中，光束横向轮廓的旋转角速率由 (A15) 给出：

$$\omega_{\text{beam}} = 2\Omega \cos^2\beta$$

此函数在 $\beta \in [0, \pi/2]$ 上**连续变化**：
- $\beta = 0$（余纬 $= 0$，光束轴在北极）：$\omega_{\text{beam}} = 2\Omega$——双倍旋转
- $\beta = \pi/4$（余纬 $= \pi/2$，光束轴在赤道）：$\omega_{\text{beam}} = \Omega$——单倍旋转
- $\beta = \pi/2$（余纬 $= \pi$，光束轴在南极）：$\omega_{\text{beam}} = 0$——零旋转

连续过渡在自然参考系中**完全自然**！表观"跃变"（图 32）产生的原因是人为主观地**固定了参考系**（或以阶跃方式切换参考系），而固定的参考系无法适应 $S^2$ 曲率带来的非平凡平行输运效应。

从拓扑视角看：$S^2$ 上的切丛是**非平凡丛**（不能全局平凡化——"毛球定理"）。任何试图全局固定参考系的做法必然在球面上某处出现奇点（跃变）。平行输运虽然也不能消除非平凡性，但它提供了**最光滑（无奇点）的局部参考系演化方式**，使得所有物理量（如光束旋转速率）连续依赖于几何参数 $\beta$。

### 8.8 拓扑不变性：不依赖于扫描路径

上述推导虽然针对特定的纬线路径（$\mathbf{t}$ 在球面上描出固定纬度的圆），但拓扑本质使得结论具有普适性：

**推广定理**：若光束轴 $\mathbf{t}$ 在单位球面上描出**任意**闭合回路 $\mathcal{C}$，则平行输运的和乐角等于 $\mathcal{C}$ 所围的立体角 $\Omega(\mathcal{C})$：

$$\Delta\Phi_{\text{holonomy}}(\mathcal{C}) = \Omega(\mathcal{C}) = \int_{\Sigma} \sin\theta\, d\theta\, d\phi \pmod{2\pi} \tag{A16}$$

其中 $\Sigma$ 是 $\mathcal{C}$ 所围的球面区域。这是由于 $S^2$ 上联络的曲率 2-形式为 $\mathcal{F} = \sin\theta\, d\theta \wedge d\phi$（即面积元），和乐由 Stokes 定理给出：

$$\oint_{\mathcal{C}} \mathcal{A} = \int_{\Sigma} \mathcal{F} = \Omega(\mathcal{C})$$

这就是为什么该效应被称为**拓扑的**：和乐仅依赖于回路 $\mathcal{C}$ 在球面上围出的**立体角**这一整体几何量，而与扫描速度、路径的局部细节无关。

### 8.9 物理类比与统一图景

| 物理系统 | 参数空间 | 和乐表现 |
|---------|---------|---------|
| 非共线 RDE | $S^2$（光束轴方向） | $\mathbf{e}$ 的偏转角 = 立体角 |
| Foucault 摆 | $S^2$（地球表面） | 摆动面进动 = $2\pi\sin\lambda$ |
| Rytov 偏振旋转 | $S^2$（光线方向） | 偏振面旋转 = 立体角 |
| Berry 相位 | 参数流形 | 绝热演化后的相位 = 参数空间曲率的面积分 |
| Hannay 角 | 经典作用-角变量空间 | 角变量的非闭合漂移 = 参数空间曲率的面积分 |

所有这些现象具有统一的数学结构：**联络的曲率在闭合回路上的积分产生非零和乐**。在非共线 RDE 中，参数空间是光束轴方向的单位球面 $S^2$，联络是球面上的 Levi-Civita 联络，和乐就是参考系 $\mathbf{e}$ 绕闭合纬线一周后的偏转角。

### 8.10 实验室系中的抵消

在**实验室参考系**中，上述几何相位不会直接显现。这是因为存在**两种**几何相位的贡献：

1. **参考系运动的几何相位**：平行输运的 $\mathbf{e}$ 绕闭合回路一周的和乐 $\Delta\Phi_{\text{holonomy}}$
2. **光束相对于参考系运动的几何相位**：来自式 (75)-(76) 描述的 RDE 动力学相位

这两种相位在实验室系中**恰好相互抵消**。这就是为什么在日常经验中，镜子转一圈后光束图像总看起来恢复了原状——并非没有几何相位，而是两种几何相位的效果在实验室观测中抵消了。然而它们的存在通过以下方式间接显现：
- 光束横向图案旋转对镜子倾角 $\beta$ 的连续依赖（图 32 的连续过渡在自然参考系中才可见）
- 不同 $\beta$ 下频率移动 $\Delta\omega = -2l\Omega\cos^2\beta$ 的连续变化

---

## 9. 推导与逻辑总结

非共线 RDE 的完整逻辑链：

1. **能量-力矩分析** → 频率移动 $\Delta\omega = -2l\Omega\cos^2\beta$
2. **频率移动积分** → 相位增量 $\Delta(k\varphi) = -2l\theta\cos^2\beta$
3. **完整一周后** → 相位非 $2\pi$ 整数倍 → **表观悖论**（光束不恢复原状）
4. **关键洞察**：在非共线情形下，观察者必须运动，"自然"参考系的选择至关重要
5. **地球仪模型 + 平行输运方程 (89)** → 参考系自身也积累几何偏转（在 $xyz$ 系中 $\Delta\Phi_{\text{holonomy}} = -2\pi\cos 2\beta$，在 $x'y'z$ 系中等效为 $4\pi\sin^2\beta$）
6. **在自然参考系中**：
   - 光束相对于参考系旋转 $2\theta\cos^2\beta$（含 $\theta=2\pi$ 时正好是连续可调的值 $\omega_{\text{beam}}=2\Omega\cos^2\beta$）
   - 从"双倍旋转"到"零旋转"可以连续过渡
7. **在实验室系中**：参考系几何偏转（$4\pi\sin^2\beta$）与光束"proper"旋转（$4\pi\cos^2\beta$）之和为 $4\pi$（整数圈）→ 图案复原，符合日常经验
8. **深层本质**：这是 Hannay/Berry 几何相位在非完整系统绝热演化中的体现，是**拓扑效应**，与扫描路径的具体形式无关
