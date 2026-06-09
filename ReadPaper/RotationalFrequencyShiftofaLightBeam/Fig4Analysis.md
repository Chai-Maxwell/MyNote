# Fig. 4 深度物理解析

## 零、$E_x = A\cos(l\phi),\; E_y = -A\sigma\sin(l\phi)$ 为什么成立？

这是理解 Fig. 4 最基础也最容易出错的一步。下面从圆偏振 LG 模的复电场出发严格推导，并解释当 $\sigma = -1$ 时电场矢量的旋转方向。

### 0.1 复电场到实部的严格推导

圆偏振 LG 模在柱坐标 $(r,\phi)$ 下的**复电场**为轨道角动量相位与圆偏振基矢的张量积：

$${\bf E}_{\rm complex}(r,\phi) = A(r) \cdot e^{il\phi} \cdot \frac{\hat{\bf x} + i\sigma\hat{\bf y}}{\sqrt{2}}$$

其中：
- $A(r) = (r/w_0)^{|l|} e^{-r^2/w_0^2}$ 是径向振幅包络
- $e^{il\phi} = \cos(l\phi) + i\sin(l\phi)$ 是螺旋相位（$l>0$ 表示沿逆时针方向相位递增）
- $(\hat{\bf x} + i\sigma\hat{\bf y})/\sqrt{2}$ 是**圆偏振单位基矢**（$\sigma=+1$ 为 RCP，$\sigma=-1$ 为 LCP）

物理上可观测的是复电场的**实部**（取 $t=0$ 时刻）：

$$
\begin{aligned}
{\bf E}_{\rm real} &= A(r) \cdot {\rm Re}\Bigl[(\cos l\phi + i\sin l\phi)(\hat{\bf x} + i\sigma\hat{\bf y})\Bigr] \;\Big/\; \sqrt{2} \\[4pt]
&= A(r) \cdot {\rm Re}\Bigl[\cos l\phi\,\hat{\bf x} + i\sigma\cos l\phi\,\hat{\bf y} + i\sin l\phi\,\hat{\bf x} + i^2\sigma\sin l\phi\,\hat{\bf y}\Bigr] \;\Big/\; \sqrt{2} \\[4pt]
&= A(r) \cdot {\rm Re}\Bigl[(\cos l\phi\,\hat{\bf x} - \sigma\sin l\phi\,\hat{\bf y}) + i(\sin l\phi\,\hat{\bf x} + \sigma\cos l\phi\,\hat{\bf y})\Bigr] \;\Big/\; \sqrt{2}
\end{aligned}
$$

取实部（忽略常数因子 $1/\sqrt{2}$）：

$$\boxed{E_x(r,\phi) = A(r)\cos(l\phi), \qquad E_y(r,\phi) = -A(r)\,\sigma\sin(l\phi)}$$

**这就是代码中公式的来源。** 注意 $E_y$ 表达式中有一个**负号**，它来自 $i^2 = -1$ 这一步，对理解电场旋转方向至关重要。

### 0.2 电场矢量方向随 $\phi$ 如何旋转？

用复数简洁表示电场矢量方向：$E_c(\phi) \equiv E_x + iE_y$。

将上面的 $E_x, E_y$ 代入：

$$
\begin{aligned}
E_c(\phi) &= A(r)\bigl[\cos(l\phi) + i(-\sigma\sin(l\phi))\bigr] \\
          &= A(r)\bigl[\cos(l\phi) - i\sigma\sin(l\phi)\bigr]
\end{aligned}
$$

分两种偏振讨论：

**情况一：$\sigma = -1$（LCP，左旋圆偏振）**

$$E_c(\phi) = A(r)\bigl[\cos(l\phi) + i\sin(l\phi)\bigr] = A(r)\,e^{+il\phi}$$

电场复振幅的相位角 $\psi = {\rm Arg}(E_c) = l\phi$。沿 $\phi$ 逆时针增加时，$\psi$ **逆时针**增大，与轨道相位 $e^{il\phi}$ 的方向**一致**。

**情况二：$\sigma = +1$（RCP，右旋圆偏振）**

$$E_c(\phi) = A(r)\bigl[\cos(l\phi) - i\sin(l\phi)\bigr] = A(r)\,e^{-il\phi}$$

电场复振幅的相位角 $\psi = {\rm Arg}(E_c) = -l\phi$。沿 $\phi$ 逆时针增加时，$\psi$ **顺时针**减小，与轨道相位 $e^{il\phi}$ 的方向**相反**。

### 0.3 旋向的物理图像

| $\sigma$ | $E_c(\phi)$ | 电场矢量旋向（$\phi$↑） | 与轨道相位旋向 |
|----------|-------------|------------------------|--------------|
| $-1$ (LCP) | $A\,e^{+il\phi}$ | **逆时针** | 一致 |
| $+1$ (RCP) | $A\,e^{-il\phi}$ | **顺时针** | 相反 |

**关键结论**：$l>0$ 规定的逆时针螺旋相位 $e^{il\phi}$ 是标量相位因子，它只决定"复振幅在复平面中逆时针转 $l$ 圈"。但 $E_x, E_y$ 是复振幅分别在 $\hat{\bf x}, \hat{\bf y}$ 两个方向上的投影的实部。圆偏振基矢 $(\hat{\bf x}+i\sigma\hat{\bf y})$ 本身携带着一个"隐藏的转角"——当 $\sigma = -1$ 时，这个转角与轨道相位**同向叠加**，得到 $e^{+il\phi}$；当 $\sigma = +1$ 时，这个转角与轨道相位**反向竞争**，得到 $e^{-il\phi}$。

用更物理的语言说：**自旋角动量（SAM）的 $\sigma$ 和轨道角动量（OAM）的 $l$ 各自对电场矢量的空间分布有贡献。** 它们不总是"相加"——在实空间的投影中，两者通过 $i^2 = -1$ 产生了一个相对负号，这个负号导致 $\sigma = -1$ 时 OAM 和 SAM 的效应同向（$E_c \propto e^{+il\phi}$），而 $\sigma = +1$ 时反向（$E_c \propto e^{-il\phi}$）。

### 0.4 为什么这个旋向直接关系到 $J = l + \sigma$？

总角动量量子数 $J = l + \sigma$，但 $E_c(\phi)$ 的相位因子是 $e^{\pm il\phi} = e^{i(l\phi)}$（$\sigma=-1$）或 $e^{-il\phi}$（$\sigma=+1$），**相位因子中出现的始终是 $l$，而不是 $J$。**

那 $J = l+\sigma$ 体现在哪里？体现在**矢量场的旋转对称性**上，而不是标量相位的旋转次数上。这就是 Fig. 4 用矢量箭头而不是等相位线来展示电场的原因——必须考虑矢量在旋转坐标变换下的行为（见第三节），才能看出 $|J|$ 重对称性。

直观上：
- 对于 $\sigma = -1$, $J = l-1$：电场矢量沿 $\phi$ 转 $l$ 圈，但径向分量随 $\phi$ 的调制使得整体矢量场的对称性为 $|l-1| = |J|$ 重
- 对于 $\sigma = +1$, $J = l+1$：电场矢量沿 $\phi$ 反向转 $l$ 圈，矢量场对称性为 $|l+1| = |J|$ 重

---

## 一、Fig. 4 展示的是同一 t 时刻的电场分布吗？

**是的。** Fig. 4 中全部 8 个子图都是在同一时刻（t=0）的横向电场快照。每个子图对应一组 (l, σ) 参数，展示了圆偏振拉盖尔-高斯（LG）光束在固定时刻的电场矢量空间分布。取 t=0 的实部：

$$E_x(r,\phi) = A(r) \cos(l\phi), \quad E_y(r,\phi) = -A(r)\,\sigma \sin(l\phi)$$

不同 t 时刻的分布只需将所有矢量绕光轴旋转一个全局角度即可得到（详见第三节）。

---

## 二、如何从 Fig. 4 理解 $\Omega t$ 导致 $(l+\sigma)\Omega t$ 的频移相位积累？

### 2.1 实验室系中的光场

圆偏振 LG 光束在实验室系中的复电场为：

$${\bf E}_{\rm lab}(r, \phi, t) = A(r)\, e^{il\phi}\, e^{-i\omega t}\, \frac{\hat{\bf x} + i\sigma\hat{\bf y}}{\sqrt{2}}$$

其中 $e^{il\phi}$ 是轨道角动量的螺旋相位，$\hat{\bf x} + i\sigma\hat{\bf y}$ 是圆偏振基矢（$\sigma = +1$ 为 RCP，$\sigma = -1$ 为 LCP）。

### 2.2 观察者旋转的效应

设观察者相对于实验室以角速度 $\Omega$ 逆时针旋转。经过时间 $t$，观察者转过的角度为 $\theta = \Omega t$。在旋转观察者看来，**坐标和偏振基矢都发生了旋转**：

- **坐标变换**：实验室中位于 $\phi$ 的点，在旋转坐标系中出现在 $\phi' = \phi - \Omega t$
- **偏振基矢变换**：圆偏振基矢 $\hat{\bf x} + i\sigma\hat{\bf y}$ 旋转 $\Omega t$ 后获得额外相位因子 $e^{i\sigma\Omega t}$

### 2.3 旋转坐标系中的有效光场

在旋转观察者的坐标系中：

$$
\begin{aligned}
{\bf E}'(r, \phi', t) &= e^{i\sigma\Omega t} \cdot A(r)\, e^{il(\phi' + \Omega t)}\, e^{-i\omega t}\, \frac{\hat{\bf x}' + i\sigma\hat{\bf y}'}{\sqrt{2}} \\[4pt]
&= A(r)\, e^{il\phi'}\, e^{i(l+\sigma)\Omega t}\, e^{-i\omega t}\, \frac{\hat{\bf x}' + i\sigma\hat{\bf y}'}{\sqrt{2}} \\[4pt]
&= A(r)\, e^{il\phi'}\, e^{-i[\omega - (l+\sigma)\Omega]t}\, \frac{\hat{\bf x}' + i\sigma\hat{\bf y}'}{\sqrt{2}}
\end{aligned}
$$

### 2.4 频移相位角的线性积累

定义 $J \equiv l + \sigma$（总角动量量子数），则：

$$\Delta\omega = J\Omega = (l+\sigma)\Omega$$

**频移相位角** $\Delta\Phi(t) = J\Omega t = (l+\sigma)\Omega t$ 随时间**线性增长**，比例系数正是总角动量 $J$。

这完全类比于平移多普勒效应中 $\Delta\Phi(t) = {\bf k}\cdot{\bf v}t$，只不过线动量 $\hbar {\bf k}$ 换成了角动量 $\hbar J$，线速度 ${\bf v}$ 换成了角速度 $\Omega$。

---

## 三、为什么这一现象反映了 $(l+\sigma)$ 重旋转对称性？

### 3.1 对称性的定义

一个矢量场具有 **$n$ 重旋转对称性**，意味着将整个场绕中心旋转 $2\pi/n$ 后，与原场完全重合。即：

$${\bf R}(2\pi/n) \cdot {\bf E}(r, \phi - 2\pi/n) = {\bf E}(r, \phi)$$

其中 ${\bf R}(\alpha)$ 是角度 $\alpha$ 的旋转矩阵。

### 3.2 圆偏振 LG 模的对称性证明

将实验室系中 $t=0$ 的电场 ${\bf E} = A(r)[\cos(l\phi)\,\hat{\bf x} - \sigma\sin(l\phi)\,\hat{\bf y}]$ 代入对称性条件。

用复表示 $E_c \equiv E_x + iE_y$：

$$E_c(\phi) = A(r)\bigl[\cos(l\phi) - i\sigma\sin(l\phi)\bigr]$$

对于 $\sigma = -1$：$E_c(\phi) = A(r)\,e^{il\phi}$，具有 $|l-1| = |J|$ 重对称性（$J=0$ 时为径向对称）

对于 $\sigma = +1$：$E_c(\phi) = A(r)\,e^{-il\phi}$，具有 $|l+1| = |J|$ 重对称性

统一结论：**电场分布具有 $|J| = |l+\sigma|$ 重旋转对称性。**

### 3.3 对称性与频移的物理联系

这是整个论文最深刻的一步推理：

| 步骤 | 结论 |
|------|------|
| 静态电场有 $|J|$ 重对称性 | 每旋转 $2\pi/|J|$，场恢复原状 |
| 观察者以 $\Omega$ 旋转 | 每秒经历 $\Omega/(2\pi/|J|) = |J|\Omega/2\pi$ 个完整周期 |
| 每个周期对应 $2\pi$ 相位 | 频移 $= |J|\Omega/2\pi \times 2\pi = |J|\Omega$ |

换一种更直观的说法：**观察者旋转一周（$2\pi$），经历了 $|J|$ 次“电场图案重复”——这意味着观察者看到的光场相位累计变化了 $2\pi|J|$，对应的频率偏移就是 $|J|\Omega$。**

---

## 四、如何从固定 t 的静态电场图中“读出”频移相位角？

虽然 Fig. 4 是静止快照，但 **$J = l + \sigma$ 的值可以从图中直接辨识**，进而推出任意旋转角 $\theta$ 对应的频移相位积累 $\Delta\Phi = J\theta$。方法如下：

### 4.1 数对称轴（确定 $|J|$）

图中用虚线标出的对称轴数量 $= |J|$：
- $l=1, \sigma=-1$：0 条对称轴（$J=0$，全场径向对称）
- $l=1, \sigma=+1$：2 条对称轴（$J=2$）
- $l=2, \sigma=-1$：1 条对称轴（$J=1$）
- $l=2, \sigma=+1$：3 条对称轴（$J=3$）

### 4.2 看矢量旋转方向（确定 $J$ 的符号）

沿 $\phi$ 增加方向（逆时针）追踪电场矢量方向的旋转：
- 若矢量方向**逆时针**旋转：$J > 0$（频移为正，即观察者看到频率增加）
- 若矢量方向**顺时针**旋转：$J < 0$（频移为负）
- 若矢量方向不变（纯径向）：$J = 0$（无频移）

### 4.3 从 $J$ 到频移相位

一旦从图中读出了 $J$，观察者旋转任意角度 $\theta_{\rm obs}$ 后，频移相位积累为：

$$\Delta\Phi = J \cdot \theta_{\rm obs}$$

若旋转是匀速的（$\theta_{\rm obs} = \Omega t$），则：

$$\Delta\Phi(t) = J\Omega t = (l+\sigma)\Omega t$$

这就是**旋转多普勒频移的相位起源**——它完全编码在静止电场分布的空间对称性之中。

### 4.4 直观类比

可以这样理解：把 Fig. 4 想象成一个“星形轮”。让观察者绕这个轮子转一圈——具有 $|J|$ 重对称性的图案意味着观察者每圈会经历 $|J|$ 次“图案复原”，等效于光波多振荡了 $|J|$ 个周期，即频移 $|J|\Omega$。
