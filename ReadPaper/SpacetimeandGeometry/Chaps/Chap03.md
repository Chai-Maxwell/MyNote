# Chapter 3: Curvature

## 3.1 Overview

曲率是GR的核心概念。本章涵盖四个关键方程：

1. **Christoffel 符号**（联络系数）：
$$\Gamma^\mu_{\nu\lambda} = \frac{1}{2}g^{\mu\rho}(\partial_\nu g_{\lambda\rho} + \partial_\lambda g_{\rho\nu} - \partial_\rho g_{\nu\lambda})$$

2. **协变导数**（向量场）：
$$\nabla_\mu V^\nu = \partial_\mu V^\nu + \Gamma^\nu_{\mu\lambda}V^\lambda$$

3. **测地线方程**：
$$\frac{d^2x^\mu}{d\lambda^2} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}\frac{dx^\sigma}{d\lambda} = 0$$

4. **黎曼曲率张量**：
$$R^\rho_{\ \sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}$$

## 3.2 Covariant Derivatives

### 动机

偏导数在弯曲时空中不是良好定义的张量算子。我们需要**协变导数** $\nabla_\mu$，满足：
- 在平直时空惯性坐标中还原为 $\partial_\mu$
- 在任意流形上变换为张量

### 公理化定义

$\nabla$ 是从 $(k,l)$ 型张量场到 $(k,l+1)$ 型张量场的映射，满足：

1. **线性性**：$\nabla(T + S) = \nabla T + \nabla S$
2. **莱布尼茨（乘积）法则**：$\nabla(T \otimes S) = (\nabla T) \otimes S + T \otimes (\nabla S)$
3. **与缩并交换**：$\nabla_\mu(T^\lambda_{\ \lambda\rho}) = (\nabla T)_\mu^{\ \lambda}_{\ \ \lambda\rho}$
4. **对标量还原为偏导数**：$\nabla_\mu\phi = \partial_\mu\phi$

前两条是向量空间的线性性和莱布尼茨法则。第三条等价于要求 Kronecker delta 协变常定：$\nabla_\mu\delta^\lambda_\rho = 0$。第四条将协变导数锚定到偏导数。

### 联络系数

由公理1和2，协变导数可写为偏导数加线性修正。对向量场 $V^\nu$：
$$\nabla_\mu V^\nu = \partial_\mu V^\nu + \Gamma^\nu_{\mu\lambda}V^\lambda$$

$\Gamma^\nu_{\mu\lambda}$（$n \times n$ 个矩阵，每个 $\mu$ 对应一个矩阵）称为**联络系数**。在四维中 $\Gamma^\nu_{\mu\lambda}$ 有 $4 \times 4 \times 4 = 64$ 个独立分量。

**联络系数的变换律**：
$$\Gamma^{\nu'}_{\mu'\lambda'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\frac{\partial x^\lambda}{\partial x^{\lambda'}}\frac{\partial x^{\nu'}}{\partial x^\nu}\Gamma^\nu_{\mu\lambda} + \frac{\partial x^{\nu'}}{\partial x^\nu}\frac{\partial^2 x^\nu}{\partial x^{\mu'}\partial x^{\lambda'}}$$

**证明**：写出 $\nabla_{\mu'}V^{\nu'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\frac{\partial x^{\nu'}}{\partial x^\nu}\nabla_\mu V^\nu$，展开两边：
$$\partial_{\mu'}V^{\nu'} + \Gamma^{\nu'}_{\mu'\lambda'}V^{\lambda'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\frac{\partial x^{\nu'}}{\partial x^\nu}(\partial_\mu V^\nu + \Gamma^\nu_{\mu\lambda}V^\lambda)$$

将 $\partial_{\mu'}V^{\nu'}$ 用链式法则展开，化简得到所需结果。

**关键观察**：第二项（齐次项）破坏了张量变换律——联络系数**不是**张量。它们被特意构造成非张量的，以使 $\nabla_\mu V^\nu$ 的组合变换为张量。因此不应随意升降联络系数的指标。

### 对偶向量的协变导数

通过对 $\omega_\lambda V^\lambda$（标量）作用协变导数：
$$\nabla_\mu(\omega_\lambda V^\lambda) = (\nabla_\mu\omega_\lambda)V^\lambda + \omega_\lambda(\nabla_\mu V^\lambda)$$
$$= (\nabla_\mu\omega_\lambda)V^\lambda + \omega_\lambda\partial_\mu V^\lambda + \omega_\lambda\Gamma^\lambda_{\mu\rho}V^\rho$$

由于 $\nabla_\mu(\omega_\lambda V^\lambda) = \partial_\mu(\omega_\lambda V^\lambda) = (\partial_\mu\omega_\lambda)V^\lambda + \omega_\lambda\partial_\mu V^\lambda$，必须有：
$$(\nabla_\mu\omega_\lambda)V^\lambda + \omega_\lambda\Gamma^\lambda_{\mu\rho}V^\rho = (\partial_\mu\omega_\lambda)V^\lambda$$

重命名哑指标，利用 $\omega_\sigma$ 和 $V^\rho$ 的任意性：
$$\nabla_\mu\omega_\nu = \partial_\mu\omega_\nu - \Gamma^\lambda_{\mu\nu}\omega_\lambda$$

**一般公式**（对任意张量）：
$$\nabla_\sigma T^{\mu_1\mu_2\ldots\mu_k}_{\quad\;\nu_1\nu_2\ldots\nu_l} = \partial_\sigma T^{\mu_1\mu_2\ldots\mu_k}_{\quad\;\nu_1\nu_2\ldots\nu_l}$$
$$+ \Gamma^{\mu_1}_{\sigma\lambda}T^{\lambda\mu_2\ldots\mu_k}_{\quad\;\nu_1\nu_2\ldots\nu_l} + \Gamma^{\mu_2}_{\sigma\lambda}T^{\mu_1\lambda\ldots\mu_k}_{\quad\;\nu_1\nu_2\ldots\nu_l} + \cdots$$
$$- \Gamma^\lambda_{\sigma\nu_1}T^{\mu_1\mu_2\ldots\mu_k}_{\quad\;\lambda\nu_2\ldots\nu_l} - \Gamma^\lambda_{\sigma\nu_2}T^{\mu_1\mu_2\ldots\mu_k}_{\quad\;\nu_1\lambda\ldots\nu_l} - \cdots$$

每个上指标贡献 $+\Gamma$ 项，每个下指标贡献 $-\Gamma$ 项。

**记号**：$\nabla_\mu V^\nu = V^\nu_{\ ;\mu}$（分号表示协变导数，正如逗号表示偏导数）。

### 联络的差是张量

对两个联络 $\Gamma^\lambda_{\mu\nu}$ 和 $\hat{\Gamma}^\lambda_{\mu\nu}$：
$$S^\lambda_{\ \mu\nu} = \Gamma^\lambda_{\mu\nu} - \hat{\Gamma}^\lambda_{\mu\nu}$$

是 $(1,2)$ 型张量。

**证明**：对任意向量场 $V^\lambda$，$\nabla_\mu V^\lambda$ 和 $\hat{\nabla}_\mu V^\lambda$ 都是张量，它们的差：
$$\nabla_\mu V^\lambda - \hat{\nabla}_\mu V^\lambda = S^\lambda_{\ \mu\nu}V^\nu$$

也是张量。由于 $V^\lambda$ 是任意的，$S^\lambda_{\ \mu\nu}$ 必须是张量。

**推论**：任何联络都可表示为某一基准联络加张量修正：
$$\Gamma^\lambda_{\mu\nu} = \hat{\Gamma}^\lambda_{\mu\nu} + S^\lambda_{\ \mu\nu}$$

### 挠率张量

给定联络 $\Gamma^\lambda_{\mu\nu}$，交换下指标得到另一组联络 $\Gamma^\lambda_{\nu\mu}$（偏导数 $\partial^2 x^\nu/\partial x^{\mu'}\partial x^{\lambda'}$ 可对易，所以这仍然是有效联络）。**挠率张量**：
$$T^\lambda_{\ \mu\nu} = \Gamma^\lambda_{\mu\nu} - \Gamma^\lambda_{\nu\mu} = 2\Gamma^\lambda_{[\mu\nu]}$$

挠率为零的联络称为**无挠**（torsion-free，$\Gamma^\lambda_{\mu\nu} = \Gamma^\lambda_{(\mu\nu)}$）。

### 度规适配的 Christoffel 联络

引入两个额外性质以选择唯一联络：

5. **无挠**：$\Gamma^\lambda_{\mu\nu} = \Gamma^\lambda_{\nu\mu}$
6. **度规适配（metric compatibility）**：$\nabla_\rho g_{\mu\nu} = 0$

度规适配的推论：
- Levi-Civita 张量和逆度规也协变常定：$\nabla_\lambda\epsilon_{\mu\nu\rho\sigma} = 0$，$\nabla_\rho g^{\mu\nu} = 0$
- 协变导数与升降指标可交换：$g^{\mu\lambda}\nabla_\rho V_\lambda = \nabla_\rho V^\mu$

**唯一性定理**：给定度规 $g_{\mu\nu}$ 的流形上存在**恰好一个**无挠度规适配联络。

### Christoffel 符号的推导

展开 $\nabla_\rho g_{\mu\nu} = 0$（三个指标轮换）：
$$\begin{align}
\partial_\rho g_{\mu\nu} - \Gamma^\lambda_{\rho\mu}g_{\lambda\nu} - \Gamma^\lambda_{\rho\nu}g_{\mu\lambda} &= 0 \\
\partial_\mu g_{\nu\rho} - \Gamma^\lambda_{\mu\nu}g_{\lambda\rho} - \Gamma^\lambda_{\mu\rho}g_{\nu\lambda} &= 0 \\
\partial_\nu g_{\rho\mu} - \Gamma^\lambda_{\nu\rho}g_{\lambda\mu} - \Gamma^\lambda_{\nu\mu}g_{\rho\lambda} &= 0
\end{align}$$

第一式减第二、三式，利用无挠性 $\Gamma^\lambda_{\mu\nu} = \Gamma^\lambda_{\nu\mu}$：
$$\partial_\rho g_{\mu\nu} - \partial_\mu g_{\nu\rho} - \partial_\nu g_{\rho\mu} + 2\Gamma^\lambda_{\mu\nu}g_{\lambda\rho} = 0$$

乘以 $g^{\sigma\rho}$：
$$\Gamma^\sigma_{\mu\nu} = \frac{1}{2}g^{\sigma\rho}(\partial_\mu g_{\nu\rho} + \partial_\nu g_{\rho\mu} - \partial_\rho g_{\mu\nu})$$

这就是 **Christoffel 符号**（又称 Levi-Civita 联络、黎曼联络）。它完全由度规及其一阶导数决定。

**命名**：$g_{\mu\nu}$ → Christoffel 符号 $\Gamma^\lambda_{\mu\nu}$ → 黎曼张量 $R^\rho_{\ \sigma\mu\nu}$ → 里奇张量 $R_{\mu\nu}$ → 里奇标量 $R$ → 爱因斯坦张量 $G_{\mu\nu}$

### 例：极坐标中的平直平面

度规 $ds^2 = dr^2 + r^2d\theta^2$（$g_{rr} = 1$, $g_{\theta\theta} = r^2$），非零 Christoffel 符号：
$$\Gamma^r_{\theta\theta} = -r, \quad \Gamma^\theta_{r\theta} = \Gamma^\theta_{\theta r} = \frac{1}{r}$$

### 协变导数的其它性质

- 在平直空间的笛卡尔坐标中，$\Gamma^\lambda_{\mu\nu} = 0$，故 $\nabla_\mu = \partial_\mu$。
- 在曲线坐标中（即使空间平直），$\Gamma^\lambda_{\mu\nu} \neq 0$（例如极坐标中的上述 $\Gamma^r_{\theta\theta} = -r$）。
- 两个协变导数不对称（与偏导数不同）——这是曲率的来源。

## 3.3 Parallel Transport and Geodesics

### 平行移动

在平直空间中，向量平移无需改变分量。在弯曲空间中，由于联络的非平凡性，"保持向量不变"的概念需要推广。

**定义**：向量 $V^\mu$ 沿曲线 $x^\mu(\lambda)$ **平行移动**如果：
$$\frac{D V^\mu}{d\lambda} \equiv \frac{d V^\mu}{d\lambda} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}V^\sigma = 0$$

这里 $D/d\lambda$ 是**沿路径的协变导数**。平行移动的向量在曲线每点满足 $\frac{dx^\rho}{d\lambda}\nabla_\rho V^\mu = 0$。

**重要**：平行移动定义的"恒定性"是路径依赖的。沿闭合回路平行移动一个向量，回到起点时通常不会得到相同的向量——这是曲率的表现。

### 测地线

平直空间的直线满足：（1）方向不变；（2）是两点间最短距离。在弯曲空间中这两个概念分离了。

**测地线**是"方向不变的路径"——其切向量沿自身平行移动：
$$\frac{D}{d\lambda}\left(\frac{dx^\mu}{d\lambda}\right) = 0$$

展开得**测地线方程**：
$$\frac{d^2x^\mu}{d\lambda^2} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}\frac{dx^\sigma}{d\lambda} = 0$$

这是三个耦合的二阶非线性常微分方程组。给定初值 $x^\mu(\lambda_0)$ 和 $\frac{dx^\mu}{d\lambda}(\lambda_0)$，存在唯一解。

**参数化**：测地线的参数 $\lambda$ 是**仿射参数**。如果 $\lambda$ 是仿射参数，则任何 $\tilde{\lambda} = a\lambda + b$（$a,b$ 为常数）也是仿射参数。在仿射参数下测地线方程形式不变。

**证明**：$\frac{dx^\mu}{d\tilde{\lambda}} = \frac{1}{a}\frac{dx^\mu}{d\lambda}$，$\frac{d^2x^\mu}{d\tilde{\lambda}^2} = \frac{1}{a^2}\frac{d^2x^\mu}{d\lambda^2}$，代入测地线方程得 $\frac{1}{a^2}[\frac{d^2x^\mu}{d\lambda^2} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}\frac{dx^\sigma}{d\lambda}] = 0$ ✓

**类时测地线**：对类时路径，可将固有时 $\tau$ 取为仿射参数。此时 $U^\mu = dx^\mu/d\tau$ 是四维速度，测地线方程写为：
$$\frac{dU^\mu}{d\tau} + \Gamma^\mu_{\rho\sigma}U^\rho U^\sigma = 0 \quad \text{或} \quad U^\nu\nabla_\nu U^\mu = 0$$

**类光测地线**：对类光路径，$ds = 0$，不能使用 $\tau$。必须选择其它仿射参数。

**度规适配联络中测地线是最短路径**：对类时测地线，固有时 $\tau = \int\sqrt{-g_{\mu\nu}\frac{dx^\mu}{d\lambda}\frac{dx^\nu}{d\lambda}}d\lambda$ 取极值。变分原理 $\delta\tau = 0$ 给出测地线方程（将 $\sqrt{-g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu}$ 代入欧拉-拉格朗日方程）。

### 局部惯性系的构造

Christoffel 符号在局部惯性坐标中为零。要构造这样的坐标，可以从 $p$ 点出发的所有测地线上定义坐标。

**黎曼法坐标**：在 $p$ 点选择正交归一基，沿从 $p$ 出发通过各方向的每条测地线以仿射距离为坐标。在该坐标系中，$p$ 点的 Christoffel 符号为零。

在 $p$ 的邻域内，度规可写为：
$$g_{\mu\nu}(x) = \eta_{\mu\nu} + \frac{1}{3}R_{\mu\rho\nu\sigma}x^\rho x^\sigma + O(x^3)$$

二阶项中出现黎曼张量，体现了局部惯性系极限（度规至多能在一阶为平直）。

## 3.4 Properties of Geodesics

### 测地线作为极值路径

**类空测地线**：两点间距离的极值（通常极小值）
**类时测地线**：两点间固有时的极值（通常**极大值**——这是闵可夫斯基度规的负号导致的）

**证明**（对类时情况）：

作用量 $S = \int d\tau = \int\sqrt{-g_{\mu\nu}\frac{dx^\mu}{d\lambda}\frac{dx^\nu}{d\lambda}}d\lambda$。定义"拉格朗日量"：
$$L = \sqrt{-g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu}$$

欧拉-拉格朗日方程：
$$\frac{d}{d\lambda}\left(\frac{\partial L}{\partial\dot{x}^\mu}\right) - \frac{\partial L}{\partial x^\mu} = 0$$

取仿射参数化使 $L = 1$（即 $g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu = -1$），则：
$$\frac{\partial L}{\partial\dot{x}^\mu} = -\frac{1}{2L}\cdot 2g_{\mu\nu}\dot{x}^\nu = -g_{\mu\nu}\dot{x}^\nu$$
$$\frac{\partial L}{\partial x^\mu} = -\frac{1}{2L}\partial_\mu g_{\rho\sigma}\dot{x}^\rho\dot{x}^\sigma = -\frac{1}{2}\partial_\mu g_{\rho\sigma}\dot{x}^\rho\dot{x}^\sigma$$

代入欧拉-拉格朗日方程并乘以 $g^{\lambda\mu}$，缩并整理后得到测地线方程。

### 测地线的首积分

如果度规不依赖于某个坐标 $x^\sigma$（即 $\partial_\sigma g_{\mu\nu} = 0$），则相应的协变速度分量为常数：
$$\frac{d}{d\lambda}(g_{\sigma\mu}\dot{x}^\mu) = 0$$

这对应于每一条测地线上的**守恒量**（与 Killing 向量相关，见3.8节）。

### 用拉格朗日方法计算 Christoffel 符号

很多时候，从拉格朗日量 $L = \frac{1}{2}g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu$（注意：是 $\frac{1}{2}g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu$ 而非平方根——这简化了计算且给出相同的测地线方程）出发，读出的欧拉-拉格朗日方程直接给出 Christoffel 符号。

这对实际计算是最方便的方法。

## 3.5 The Expanding Universe Revisited

将协变导数形式应用于平直 Robertson-Walker 度规 $ds^2 = -dt^2 + a^2(t)(dx^2 + dy^2 + dz^2)$。

### Christoffel 符号

非零分量（用上标表示第一个指标为 $t$ 或 $i$）：
$$\Gamma^t_{ij} = a\dot{a}\,\delta_{ij}$$
$$\Gamma^i_{jt} = \Gamma^i_{tj} = \frac{\dot{a}}{a}\,\delta^i_j$$

其中 $\dot{a} = da/dt$。

### 测地线

**共动观测者**（$x^i = \text{const}$，$\tau = t$）：
$U^\mu = (1,0,0,0)$ → $\frac{dU^\mu}{d\tau} + \Gamma^\mu_{\rho\sigma}U^\rho U^\sigma = \Gamma^\mu_{tt} = 0$ ✓

共动观测者是自由下落的（满足测地线方程）。

**物理动量**：对在弯曲时空中运动的大质量粒子，$p^\mu = mU^\mu$ 满足：
$$\frac{dp^\mu}{d\tau} + \Gamma^\mu_{\rho\sigma}p^\rho p^\sigma = 0$$

在 RW 时空中：
$$\frac{dp^i}{d\tau} = -2\frac{\dot{a}}{a}p^t p^i$$

由于 $p^\mu p_\mu = -m^2$，$-(p^t)^2 + a^2\delta_{ij}p^ip^j = -m^2$。

$p^t$ 可用此关系消去。对 $i$ 方向：
$$\frac{dp^i}{dt} + 2\frac{\dot{a}}{a}p^i = 0 \implies p^i \propto a^{-2}$$

物理动量按 $a^{-1}$ 衰减（因为测量到的空间分量是 $p^i_{\text{phys}} = p^i/a$，按 $a^{-2}$ 衰减）。这是宇宙学红移的表现——粒子在膨胀宇宙中减速。

## 3.6 The Riemann Curvature Tensor

### 动机

曲率应该衡量沿闭合回路平行移动向量时的非平凡变化。在最简单的层面，这涉及协变导数的对易子。

### 协变导数的对易子

对向量场 $V^\rho$：
$$[\nabla_\mu, \nabla_\nu]V^\rho = \nabla_\mu\nabla_\nu V^\rho - \nabla_\nu\nabla_\mu V^\rho$$

展开计算：
$$\nabla_\nu V^\rho = \partial_\nu V^\rho + \Gamma^\rho_{\nu\sigma}V^\sigma$$

$$\nabla_\mu\nabla_\nu V^\rho = \partial_\mu(\partial_\nu V^\rho + \Gamma^\rho_{\nu\sigma}V^\sigma) + \Gamma^\rho_{\mu\lambda}(\partial_\nu V^\lambda + \Gamma^\lambda_{\nu\sigma}V^\sigma) - \Gamma^\lambda_{\mu\nu}(\partial_\lambda V^\rho + \Gamma^\rho_{\lambda\sigma}V^\sigma)$$

反对称化 $\mu \leftrightarrow \nu$：
$$[\nabla_\mu, \nabla_\nu]V^\rho = (\partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma})V^\sigma - T^\lambda_{\ \mu\nu}\nabla_\lambda V^\rho$$

对无挠联络，$T^\lambda_{\ \mu\nu} = 0$，得到：

$$[\nabla_\mu, \nabla_\nu]V^\rho = R^\rho_{\ \sigma\mu\nu}V^\sigma$$

其中 **黎曼曲率张量**：
$$R^\rho_{\ \sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}$$

### 黎曼张量的基本性质

1. **是张量**：左边 $[\nabla_\mu, \nabla_\nu]V^\rho$ 是张量，$V^\sigma$ 是任意向量，故 $R^\rho_{\ \sigma\mu\nu}$ 必须是 $(1,3)$ 型张量。

2. **平行移动解释**：向量 $V^\mu$ 沿无穷小平行四边形（边 $\delta a^\mu$, $\delta b^\nu$）平行移动一圈的变化为：
$$\delta V^\rho = R^\rho_{\ \sigma\mu\nu}V^\sigma\delta a^\mu\delta b^\nu$$

这是曲率是平行移动路径依赖性的表现。

3. **平直空间的判据**：$R^\rho_{\ \sigma\mu\nu} = 0$ 处处成立是度规为平直的**充要条件**（即存在坐标系使 $g_{\mu\nu}$ 处处为常数）。

### 计算例：$S^2$

$S^2$ 度规 $ds^2 = a^2(d\theta^2 + \sin^2\theta\,d\phi^2)$（$a$ 为半径）。

非零 Christoffel 符号：
$$\Gamma^\theta_{\phi\phi} = -\sin\theta\cos\theta, \quad \Gamma^\phi_{\theta\phi} = \Gamma^\phi_{\phi\theta} = \cot\theta$$

非零黎曼张量分量：
$$R^\theta_{\ \phi\theta\phi} = \sin^2\theta, \quad R^\phi_{\ \theta\theta\phi} = -1$$

（其他分量由对称性给出。）

里奇标量：$R = 2/a^2$，与 $\theta, \phi$ 无关——反映了 $S^2$ 的均匀性。

## 3.7 Properties of the Riemann Tensor

### 代数恒等式

用全协变形式 $R_{\rho\sigma\mu\nu} = g_{\rho\lambda}R^\lambda_{\ \sigma\mu\nu}$：

1. **$R_{\rho\sigma\mu\nu} = -R_{\sigma\rho\mu\nu}$**（反对称于前两个指标）
2. **$R_{\rho\sigma\mu\nu} = -R_{\rho\sigma\nu\mu}$**（反对称于后两个指标）
3. **$R_{\rho\sigma\mu\nu} = R_{\mu\nu\rho\sigma}$**（交换前后对是对称的）
4. **$R_{\rho\sigma\mu\nu} + R_{\rho\mu\nu\sigma} + R_{\rho\nu\sigma\mu} = 0$**（第一 Bianchi 恒等式，与挠率为零相关）

**第一 Bianchi 恒等式证明**（对无挠联络）：
在局部惯性系中 $\Gamma^\lambda_{\mu\nu}(p) = 0$，$\partial_\sigma\Gamma^\lambda_{\mu\nu}(p) \neq 0$。则：
$$R_{\rho\sigma\mu\nu} = \frac{1}{2}(\partial_\mu\partial_\sigma g_{\rho\nu} - \partial_\mu\partial_\rho g_{\nu\sigma} - \partial_\nu\partial_\sigma g_{\rho\mu} + \partial_\nu\partial_\rho g_{\mu\sigma})$$

对指标轮换直接验证 Bianchi 恒等式成立。由于它是张量方程，在局部惯性系中成立意味着在任何坐标系中成立。

**独立分量计数**（$n$ 维）：
$R_{\rho\sigma\mu\nu}$ 可视为 $n \times n$ 反对称矩阵的 $n \times n$ 对称矩阵（因为性质1和2，以及交换对称性3），另有 Bianchi 恒等式4）。

独立分量数 = $\frac{1}{12}n^2(n^2-1)$

在四维（$n=4$）：**20 个独立分量**，与局部惯性系中不可消除的二阶导数自由度完全匹配。

在二维：1个独立分量（$R_{1212}$，所有分量由它决定）。

### 第二 Bianchi 恒等式

$$\nabla_{[\lambda}R_{\rho\sigma]\mu\nu} = 0$$

**证明**：在局部惯性系中，$\nabla_{[\lambda}R_{\rho\sigma]\mu\nu} = \partial_{[\lambda}R_{\rho\sigma]\mu\nu}$。代入 $R_{\rho\sigma\mu\nu}$ 用 $\partial\Gamma$ 和 $\Gamma\Gamma$ 的表达式，在局部惯性系中后者为零。直接计算可验证恒等式成立。由于是张量方程，处处成立。

**重要性**：第二 Bianchi 恒等式是爱因斯坦方程左边 $\nabla^\mu G_{\mu\nu} = 0$ 的几何起源（见第4章）。

### 里奇张量和里奇标量

**里奇张量**（黎曼张量的缩并）：
$$R_{\mu\nu} = R^\lambda_{\ \mu\lambda\nu}$$

里奇张量是对称的：$R_{\mu\nu} = R_{\nu\mu}$（从黎曼张量的对称性得到）。

**里奇标量**：
$$R = R^\mu_{\ \mu} = g^{\mu\nu}R_{\mu\nu}$$

**爱因斯坦张量**：
$$G_{\mu\nu} = R_{\mu\nu} - \frac{1}{2}Rg_{\mu\nu}$$

由第二 Bianchi 恒等式可得：
$$\nabla^\mu G_{\mu\nu} = 0$$

这是广义相对论中爱因斯坦方程一致性的关键。

**Weyl 张量**：黎曼张量中不被里奇张量捕获的部分——"无迹"部分：
$$C_{\rho\sigma\mu\nu} = R_{\rho\sigma\mu\nu} - \frac{2}{n-2}(g_{\rho[\mu}R_{\nu]\sigma} - g_{\sigma[\mu}R_{\nu]\rho}) + \frac{2}{(n-1)(n-2)}R\,g_{\rho[\mu}g_{\nu]\sigma}$$

Weyl 张量的所有缩并都为零（"完全无迹"）。在 $n = 4$ 时，Weyl 张量有 10 个独立分量（加上里奇张量的 10 个 = 黎曼张量的 20 个）。

**物理意义**：Weyl 张量描述"非局部"曲率——真空中 ($R_{\mu\nu} = 0$) 可以存在引力波和非平凡曲率，这些由 Weyl 张量编码。

## 3.8 Symmetries and Killing Vectors

### 对称性概念

度规的对称性（等距变换）是保持度规不变的微分同胚。无穷小版本由 **Killing 向量场** 生成。

### Killing 方程

向量场 $K = K^\mu\partial_\mu$ 生成等距变换当且仅当：
$$\nabla_\mu K_\nu + \nabla_\nu K_\mu = 0$$

或等价地：
$$\mathcal{L}_K g_{\mu\nu} = 0$$

其中 $\mathcal{L}_K$ 是沿 $K$ 的李导数。

**推导**：度规在坐标变换 $x^\mu \to x^\mu + \epsilon K^\mu$（$\epsilon$ 无穷小）下的变换律给出：
$$g'_{\mu\nu}(x) = g_{\mu\nu}(x) - \epsilon(\partial_\mu K^\lambda g_{\lambda\nu} + \partial_\nu K^\lambda g_{\mu\lambda} + K^\lambda\partial_\lambda g_{\mu\nu}) + O(\epsilon^2)$$

要求 $g'_{\mu\nu} = g_{\mu\nu}$ 意味着括号内的表达式为零。用协变导数重写：
$$\nabla_\mu K_\nu + \nabla_\nu K_\mu = \partial_\mu K_\nu + \partial_\nu K_\mu - 2\Gamma^\lambda_{\mu\nu}K_\lambda = \mathcal{L}_K g_{\mu\nu} = 0$$

**Killing 方程的坐标形式**：
$$\partial_\mu K_\nu + \partial_\nu K_\mu - 2\Gamma^\lambda_{\mu\nu}K_\lambda = 0$$

### Killing 向量的性质

1. **Killing 向量构成李代数**：两个 Killing 向量的对易子仍是 Killing 向量。最大等距变换群的维数在 $n$ 维中 ≤ $n(n+1)/2$。

2. **沿测地线的守恒量**：如果 $K^\mu$ 是 Killing 向量且 $x^\mu(\lambda)$ 是测地线（切向量 $U^\mu = dx^\mu/d\lambda$），则：
$$K_\mu U^\mu = \text{const}$$

**证明**：
$$\frac{d}{d\lambda}(K_\mu U^\mu) = U^\nu\nabla_\nu(K_\mu U^\mu) = U^\nu U^\mu\nabla_\nu K_\mu + K_\mu U^\nu\nabla_\nu U^\mu$$

第一项中 $U^\nu U^\mu$ 是对称的，收缩 $\nabla_\nu K_\mu$ 的 Killing 方程（$\nabla_{(\nu}K_{\mu)} = 0$）给出零。第二项因测地线方程 $U^\nu\nabla_\nu U^\mu = 0$ 也为零。

**物理意义**：每个 Killing 向量对应度规的一个连续对称性，因而对应物理系统的一个守恒量。例如：
- 时间平移对称 → 能量守恒
- 空间平移对称 → 动量守恒
- 旋转对称 → 角动量守恒

### Killing 向量的积分曲线

Killing 向量的积分曲线是满足 $dx^\mu/ds = K^\mu(x(s))$ 的曲线。沿这些曲线度规"不变"。

### 例：闵可夫斯基空间

闵可夫斯基空间有 10 个 Killing 向量（4个平移 + 6个洛伦兹变换 = $4(4+1)/2 = 10$，达到最大可能数）：
- 4 个平移：$K_{(\alpha)}^\mu = \delta^\mu_\alpha$（$\alpha = 0,1,2,3$）
- 3 个旋转：$K_{(ij)}^\mu = x_i\delta^\mu_j - x_j\delta^\mu_i$
- 3 个 boost：$K_{(0i)}^\mu = x^0\delta^\mu_i + x_i\delta^{\mu0}$

## 3.9 Maximally Symmetric Spaces

### 定义

拥有最大可能数目的 Killing 向量的空间（$n$ 维中 $n(n+1)/2$ 个）。

**性质**：最大对称空间是**齐性**（任意两点可被等距变换关联）和**迷向**（过任意点的所有方向等价）的。

### 最大对称空间的曲率

在最大对称空间中，黎曼张量必须完全由度规决定。唯一可能的张量结构（满足黎曼张量的所有对称性）是：
$$R_{\rho\sigma\mu\nu} = \frac{R}{n(n-1)}(g_{\rho\mu}g_{\sigma\nu} - g_{\rho\nu}g_{\sigma\mu})$$

其中 $R$（里奇标量）在整个流形上是常数。

**证明思路**：黎曼张量在局部惯性系中必须是对称的且尊重空间的对称性。唯一具有所需对称性的张量是度规与自身的反对称组合。比例常数通过两次缩并确定为 $R/n(n-1)$。

### 最大对称空间分类

按 $R$ 的符号：
- $R > 0$：正曲率空间（如 $S^n$，de Sitter 空间）
- $R = 0$：平直空间（$\mathbb{R}^n$，闵可夫斯基空间）
- $R < 0$：负曲率空间（如 $H^n$，anti-de Sitter 空间）

### 常曲率空间的度规

可通过超曲面嵌入 $\mathbb{R}^{n+1}$（或 $\mathbb{R}^{n,1}$）获得：

**$S^n$**（正曲率）：$\sum_{i=1}^{n+1}(x^i)^2 = a^2$ 在 $\mathbb{R}^{n+1}$ 中，$ds^2 = \sum dx^i{^2}$
**$H^n$**（负曲率）：$-(x^0)^2 + \sum_{i=1}^n(x^i)^2 = -a^2$ 在 $\mathbb{R}^{n,1}$ 中

最大对称空间在宇宙学中很重要——它们是 RW 度规的空间截面（第8章）。

## 3.10 Geodesic Deviation

### 物理动机

潮汐力是引力场非均匀性的表现——在不同位置自由下落的粒子有不同的加速度趋势。从几何观点，这是邻近测地线相对加速度的表现。

### 测地线偏差方程

考虑一族测地线 $x^\mu(s,\lambda)$，其中 $s$ 标记不同的测地线，$\lambda$ 是每条测地线上的仿射参数。

切向量：$T^\mu = \partial x^\mu/\partial\lambda$
偏差向量：$S^\mu = \partial x^\mu/\partial s$（连接相邻测地线上具有相同 $\lambda$ 的点）

**测地线偏差方程**：
$$\frac{D^2 S^\mu}{d\lambda^2} = R^\mu_{\ \nu\rho\sigma}T^\nu T^\rho S^\sigma$$

或更简洁地：
$$A^\mu = R^\mu_{\ \nu\rho\sigma}T^\nu T^\rho S^\sigma$$

其中 $A^\mu = \frac{D^2 S^\mu}{d\lambda^2}$ 是相对加速度。

**推导**：

1. 从 $T^\mu$ 和 $S^\mu$ 的定义出发，注意 $[T, S] = 0$（$s,\lambda$ 坐标的参数化），即：
$$T^\nu\nabla_\nu S^\mu = S^\nu\nabla_\nu T^\mu$$

2. 计算 $\frac{D^2 S^\mu}{d\lambda^2} = T^\rho\nabla_\rho(T^\sigma\nabla_\sigma S^\mu)$：
$$= T^\rho\nabla_\rho(S^\sigma\nabla_\sigma T^\mu) \quad \text{（利用对易性）}$$
$$= (T^\rho\nabla_\rho S^\sigma)(\nabla_\sigma T^\mu) + T^\rho S^\sigma\nabla_\rho\nabla_\sigma T^\mu$$
$$= (S^\rho\nabla_\rho T^\sigma)(\nabla_\sigma T^\mu) + T^\rho S^\sigma(\nabla_\sigma\nabla_\rho T^\mu + R^\mu_{\ \nu\rho\sigma}T^\nu) \quad \text{（利用对易子和黎曼定义）}$$
$$= S^\rho\nabla_\rho(T^\sigma\nabla_\sigma T^\mu) - S^\rho T^\sigma\nabla_\rho\nabla_\sigma T^\mu + T^\rho S^\sigma\nabla_\sigma\nabla_\rho T^\mu + R^\mu_{\ \nu\rho\sigma}T^\nu T^\rho S^\sigma$$

第一项因测地线方程 $T^\sigma\nabla_\sigma T^\mu = 0$ 而为零。第二、三项抵消（重命名哑指标 $\rho \leftrightarrow \sigma$），留下所需结果。

### 潮汐力的意义

在局部惯性系中（$\Gamma^\lambda_{\mu\nu} = 0$），测地线偏差方程简化为：
$$\frac{d^2 S^\mu}{dt^2} = R^\mu_{\ 00\nu}S^\nu$$

这直接联系了黎曼张量的分量与潮汐加速度。在牛顿极限下：
$$\frac{d^2 S^i}{dt^2} = -R^i_{\ 0j0}S^j = -\partial_i\partial_j\Phi \, S^j$$

其中 $R_{i0j0} \approx \partial_i\partial_j\Phi$（$\Phi$ 是牛顿引力势）。因此潮汐力就是引力势的二阶导数。

### 测地线偏差的物理应用

- **引力波探测**：引力波通过使邻近自由粒子之间的测地线分离振荡来表现——这是 LIGO 等探测器的工作原理。
- **奇点定理**：如果物质满足某些正能量条件，测地线偏差方程意味着邻近测地线将聚焦——这是 Hawking-Penrose 奇点定理的关键要素。
- **Raychaudhuri 方程**：测地线偏差的迹给出测地线汇的膨胀、剪切和旋转的演化方程（附录F）。

### 方程总结

本章引入的四个核心方程构成了弯曲时空几何的完整数学框架：

1. $\Gamma^\lambda_{\mu\nu} = \frac{1}{2}g^{\lambda\rho}(\partial_\mu g_{\nu\rho} + \partial_\nu g_{\rho\mu} - \partial_\rho g_{\mu\nu})$ — 度规 → 联络

2. $\nabla_\mu V^\nu = \partial_\mu V^\nu + \Gamma^\nu_{\mu\lambda}V^\lambda$ — 联络 → 协变微分

3. $\frac{d^2x^\mu}{d\lambda^2} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}\frac{dx^\sigma}{d\lambda} = 0$ — 联络 → 自由粒子运动

4. $R^\rho_{\ \sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}$ — 联络 → 曲率

以及曲率通过测地线偏差方程的物理表现：
$$\frac{D^2 S^\mu}{d\lambda^2} = R^\mu_{\ \nu\rho\sigma}T^\nu T^\rho S^\sigma$$
