# Chapter 1: Special Relativity and Flat Spacetime

## 1.1 Prelude

广义相对论(GR)是爱因斯坦关于空间、时间和引力的理论。其核心思想：

- **引力是时空弯曲的表现**。大多数自然力由定义在时空上的场表示（如电磁场），而引力内在于时空本身。
- 牛顿引力理论包含两个要素：（1）物质如何产生引力场（泊松方程 $\nabla^2\Phi = 4\pi G\rho$）；（2）物质如何响应引力场（$\mathbf{a} = -\nabla\Phi$）。
- GR 用两个方程替换它们：
  - **爱因斯坦方程**：$R_{\mu\nu} - \frac{1}{2}Rg_{\mu\nu} = 8\pi G T_{\mu\nu}$（曲率与能量的关系）
  - **测地线方程**：$\frac{d^2 x^\mu}{d\lambda^2} + \Gamma^\mu_{\rho\sigma}\frac{dx^\rho}{d\lambda}\frac{dx^\sigma}{d\lambda} = 0$（自由粒子沿"最短路径"运动）

**引力的普遍性**是GR的深刻特征。带电粒子在电场中受加速度偏离直线；而引力场中的粒子沿最接近直线的路径运动——自由下落。这解释了为什么我们站在地面上感受到力（被推离测地线），而空中飞行的球更接近"无加速度"状态。

**度规张量** $g_{\mu\nu}$ 描述时空弯曲，它编码了毕达哥拉斯定理的偏离：
$$(\Delta l)^2 = (\Delta x)^2 + (\Delta y)^2$$
在弯曲空间中不再成立。从度规可导出黎曼曲率张量和测地线方程。

## 1.2 Space and Time, Separately and Together

### 牛顿时空 vs 狭义相对论时空

- **牛顿时空**：存在绝对的"同时性"——所有空间在固定时刻的切片是明确定义的。时间与空间不能"旋转"到一起。
- **SR时空**：不存在明确定义的"同时性"概念。替代绝对时间切片的是光锥规则：物理粒子不能超过光速。光锥的局部结构定义了允许的轨迹。

### 闵可夫斯基时空

**坐标系构造（惯性系）**：
- 空间坐标 $(x,y,z)$ 由自由移动的刚性杆构成的标准笛卡尔系统
- 时间坐标 $t$ 由相对于空间坐标静止的时钟定义
- 时钟同步：$t_2 = \frac{1}{2}(t_1 + t_1')$（通过光束往返）

**时空间隔**（不变量）：
$$(\Delta s)^2 = -(\Delta t)^2 + (\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2$$

在惯性坐标变换下保持不变。这是将SR视为四维时空理论的基础。

**符号约定**：
- $x^\mu$：$\mu = 0,1,2,3$，希腊字母上标
  - $x^0 = t$, $x^1 = x$, $x^2 = y$, $x^3 = z$（设 $c = 1$）
- 拉丁字母上标 $i = 1,2,3$ 仅表示空间分量

**度规**（闵可夫斯基度规）：
$$\eta_{\mu\nu} = \begin{pmatrix} -1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

使用求和约定（爱因斯坦求和约定），间隔写为：
$$(\Delta s)^2 = \eta_{\mu\nu} \Delta x^\mu \Delta x^\nu$$

**分类**：
- $\eta_{\mu\nu} V^\mu V^\nu < 0$：类时（timelike）
- $\eta_{\mu\nu} V^\mu V^\nu = 0$：类光/零（lightlike/null）
- $\eta_{\mu\nu} V^\mu V^\nu > 0$：类空（spacelike）

**固有时**：$(\Delta \tau)^2 = -(\Delta s)^2 = -\eta_{\mu\nu}\Delta x^\mu \Delta x^\nu$

固有时由沿世界线运动的时钟测量，是不变量。

### 线元和路径长度

**无穷小线元**：
$$ds^2 = \eta_{\mu\nu} dx^\mu dx^\nu$$

对于参数化曲线 $x^\mu(\lambda)$：

- 类空路径：$\Delta s = \int \sqrt{\eta_{\mu\nu} \frac{dx^\mu}{d\lambda}\frac{dx^\nu}{d\lambda}} d\lambda$
- 类时路径：$\Delta \tau = \int \sqrt{-\eta_{\mu\nu} \frac{dx^\mu}{d\lambda}\frac{dx^\nu}{d\lambda}} d\lambda$

### 孪生子悖论

非直线路径的固有时比直线路径的固有时**更短**。在空间中直线最短，在时空中直线最长（最大固有时）：
$$\Delta\tau_{AB'C} = \sqrt{1-v^2}\Delta t < \Delta t = \Delta\tau_{ABC}$$

这是闵可夫斯基度规中类时分量的负号导致的直接后果。这强调了坐标时间 $t$ 只是方便的坐标，真正流逝的时间依赖于路径。

**重要**：SR完全能够处理加速轨迹，不需要GR。GR只在引力存在、时空弯曲时才需要。

## 1.3 Lorentz Transformations

### 定义

洛伦兹变换是保持间隔不变的坐标变换。对于线性变换 $x^{\mu'} = \Lambda^{\mu'}_{\ \nu} x^\nu$（加上平移构成庞加莱变换）：

$$(\Delta s)^2 = (\Delta x)^T \eta (\Delta x) = (\Delta x')^T \eta (\Delta x') = (\Delta x)^T \Lambda^T \eta \Lambda (\Delta x)$$

因此：
$$\Lambda^T \eta \Lambda = \eta$$
或写成指标形式：
$$\eta_{\rho\sigma} = \Lambda^{\mu'}_{\ \rho} \Lambda^{\nu'}_{\ \sigma} \eta_{\mu'\nu'}$$

**证明**：这是要求间隔不变性的直接结果。利用矩阵记号，$(\Delta x')^T\eta(\Delta x') = (\Delta x)^T\Lambda^T\eta\Lambda(\Delta x)$ 必须等于 $(\Delta x)^T\eta(\Delta x)$，对所有 $\Delta x$ 成立，故 $\Lambda^T\eta\Lambda = \eta$。

### 洛伦兹群

与 $SO(3)$ 的比较：
- 旋转群：$R^T 1 R = 1$，其中 $1$ 是 $3\times 3$ 单位阵（$O(3)$）
- 洛伦兹群：$\Lambda^T \eta \Lambda = \eta$，其中 $\eta$ 是 $4\times 4$ 对角阵 diag$(-1,1,1,1)$（$O(3,1)$）

洛伦兹群的分类：
- $|\Lambda| = 1$：proper（正常）洛伦兹群 $SO(3,1)$
- $\Lambda^{0'}_{\ 0} \geq 1$：orthochronous（正时）洛伦兹群
- 两者兼具：restricted（受限）洛伦兹群 $SO(3,1)^\uparrow$

洛伦兹群是非阿贝尔的，庞加莱群是十参数非阿贝尔群（加上四个平移）。

### 显式形式

**空间旋转**（$x$-$y$ 平面）：
$$\Lambda^{\mu'}_{\ \nu} = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & \cos\theta & \sin\theta & 0 \\ 0 & -\sin\theta & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

**Boost**（$x$ 方向）：
$$\Lambda^{\mu'}_{\ \nu} = \begin{pmatrix} \cosh\phi & -\sinh\phi & 0 & 0 \\ -\sinh\phi & \cosh\phi & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

其中 $\phi$ 是快度参数（boost parameter），$-\infty < \phi < \infty$。

**速度参数化**：令 $v = \tanh\phi$，$\gamma = 1/\sqrt{1-v^2}$，则：
$$t' = \gamma(t - vx)$$
$$x' = \gamma(x - vt)$$

这恢复了传统的洛伦兹变换公式。

**重要推论**：Boost 是空间和时间之间的"旋转"，但它们以"剪刀"方式合拢而非保持传统欧几里得正交。光锥 $x = \pm t$ 在 boost 下保持不变，表明光速在任何惯性系中相同。

## 1.4 Vectors

### 切空间

- 每个向量位于时空中的特定点 $p$
- 点 $p$ 处的所有可能向量的集合称为**切空间** $T_p$
- 在弯曲空间中，不能随意将向量从一个点滑动到另一个点

**向量空间**：一组可以线性相加和乘以实数的对象的集合。对于任意向量 $V, W$ 和实数 $a, b$：
$$(a+b)(V+W) = aV + bV + aW + bW$$

**基向量**：一组既能张成向量空间又线性无关的向量集合 $\hat{e}_{(\mu)}$。任何向量可写为：
$$A = A^\mu \hat{e}_{(\mu)}$$

其中 $A^\mu$ 是 $A$ 在基 $\hat{e}_{(\mu)}$ 下的分量。

### 曲线的切向量

参数化曲线 $x^\mu(\lambda)$ 的切向量 $V(\lambda)$ 有分量：
$$V^\mu = \frac{dx^\mu}{d\lambda}$$

### 变换性质

在洛伦兹变换下：
- 向量分量：$V^{\mu'} = \Lambda^{\mu'}_{\ \nu} V^\nu$
- 基向量：$\hat{e}_{(\nu')} = \Lambda^{\mu}_{\ \nu'} \hat{e}_{(\mu)}$（由 $\Lambda^{\mu}_{\ \nu'} \Lambda^{\nu'}_{\ \rho} = \delta^\mu_\rho$ 通过逆变换连接）
- 向量本身 $V = V^\mu \hat{e}_{(\mu)}$ 是不变量

## 1.5 Dual Vectors (One-Forms)

**对偶向量空间** $T_p^*$（余切空间）：从 $T_p$ 到 $\mathbb{R}$ 的所有线性映射的空间。

对偶向量 $\omega$ 的作用：
$$\omega(aV + bW) = a\omega(V) + b\omega(W) \in \mathbb{R}$$

**基对偶向量** $\hat{\theta}^{(\mu)}$：
$$\hat{\theta}^{(\mu)}(\hat{e}_{(\nu)}) = \delta^\mu_\nu$$

任意对偶向量：$\omega = \omega_\mu \hat{\theta}^{(\mu)}$

**对偶向量的作用**（用分量表示）：
$$\omega(V) = \omega_\mu V^\mu$$

向量也可被视为对偶向量上的线性映射：$V(\omega) = \omega(V) = \omega_\mu V^\mu$

这确立了 $T_p$ 和 $T_p^*$ 的对偶关系。

### 变换性质

- 对偶向量分量：$\omega_{\mu'} = \Lambda^{\nu}_{\ \mu'} \omega_\nu$
- 基对偶向量：$\hat{\theta}^{(\mu')} = \Lambda^{\mu'}_{\ \nu} \hat{\theta}^{(\nu)}$

### 梯度的例子

标量函数 $\phi$ 的梯度：
$$d\phi = \frac{\partial\phi}{\partial x^\mu} \hat{\theta}^{(\mu)}$$

使用链式法则，偏导数按对偶向量变换：
$$\frac{\partial\phi}{\partial x^{\mu'}} = \frac{\partial x^\mu}{\partial x^{\mu'}} \frac{\partial\phi}{\partial x^\mu} = \Lambda^{\mu}_{\ \mu'} \frac{\partial\phi}{\partial x^\mu}$$

**记号**：$\partial_\mu \phi = \phi_{,\mu} = \frac{\partial\phi}{\partial x^\mu}$

沿曲线的方向导数：
$$\frac{d\phi}{d\lambda} = \frac{\partial\phi}{\partial x^\mu} \frac{dx^\mu}{d\lambda} = \partial_\mu\phi \, V^\mu$$

## 1.6 Tensors

### 定义

一个 $(k, l)$ 型张量是从 $k$ 个对偶向量和 $l$ 个向量的集合到 $\mathbb{R}$ 的多线性映射：

$$T : \underbrace{T_p^* \times \cdots \times T_p^*}_{k\text{ times}} \times \underbrace{T_p \times \cdots \times T_p}_{l\text{ times}} \to \mathbb{R}$$

- 标量：$(0,0)$ 型
- 向量：$(1,0)$ 型
- 对偶向量：$(0,1)$ 型

### 张量积

若 $T$ 是 $(k,l)$ 型，$S$ 是 $(m,n)$ 型，则 $T \otimes S$ 是 $(k+m, l+n)$ 型：

$$T \otimes S(\omega^{(1)},\ldots,\omega^{(k+m)}, V^{(1)},\ldots,V^{(l+n)}) =$$
$$T(\omega^{(1)},\ldots,\omega^{(k)}, V^{(1)},\ldots,V^{(l)}) \times S(\omega^{(k+1)},\ldots,\omega^{(k+m)}, V^{(l+1)},\ldots,V^{(l+n)})$$

注意：张量积一般不交换，$T \otimes S \neq S \otimes T$。

### 基展开

$(k,l)$ 型张量的基由基向量和对偶基向量的张量积构成：

$$\hat{e}_{(\mu_1)} \otimes \cdots \otimes \hat{e}_{(\mu_k)} \otimes \hat{\theta}^{(\nu_1)} \otimes \cdots \otimes \hat{\theta}^{(\nu_l)}$$

在四维时空中，共有 $4^{k+l}$ 个基张量。

任意张量：
$$T = T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l} \hat{e}_{(\mu_1)} \otimes \cdots \otimes \hat{e}_{(\mu_k)} \otimes \hat{\theta}^{(\nu_1)} \otimes \cdots \otimes \hat{\theta}^{(\nu_l)}$$

分量可通过让张量作用于基向量和基对偶向量获得：
$$T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l} = T(\hat{\theta}^{(\mu_1)},\ldots,\hat{\theta}^{(\mu_k)},\hat{e}_{(\nu_1)},\ldots,\hat{e}_{(\nu_l)})$$

### 变换律

$$T^{\mu_1'\ldots\mu_k'}_{\quad\;\nu_1'\ldots\nu_l'} = \Lambda^{\mu_1'}_{\ \mu_1}\cdots\Lambda^{\mu_k'}_{\ \mu_k}\Lambda^{\nu_1}_{\ \nu_1'}\cdots\Lambda^{\nu_l}_{\ \nu_l'} T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l}$$

每个上指标像向量一样变换，每个下指标像对偶向量一样变换。

### 例子

**度规** $\eta_{\mu\nu}$：$(0,2)$ 型张量，定义内积：
$$\eta(V,W) = \eta_{\mu\nu} V^\mu W^\nu = V \cdot W$$

内积为标量，在洛伦兹变换下不变。两个内积为零的向量称为**正交**。

**Kronecker delta** $\delta^\mu_\nu$：$(1,1)$ 型张量，即恒等映射。无论坐标如何选择，分量始终相同。

**逆度规** $\eta^{\mu\nu}$：$(2,0)$ 型张量，满足：
$$\eta^{\mu\nu}\eta_{\nu\rho} = \eta_{\rho\nu}\eta^{\nu\mu} = \delta^\mu_\rho$$

在惯性笛卡尔坐标中，$\eta^{\mu\nu}$ 与 $\eta_{\mu\nu}$ 有相同的分量（仅对平直时空成立）。

**Levi-Civita 符号** $\tilde{\epsilon}_{\mu\nu\rho\sigma}$：$(0,4)$ 型张量：
$$\tilde{\epsilon}_{\mu\nu\rho\sigma} = \begin{cases} +1 & \text{偶排列} \\ -1 & \text{奇排列} \\ 0 & \text{其它} \end{cases}$$

（实际上不是真正的张量，而是张量密度——见第2章。）

**电磁场强张量** $F_{\mu\nu}$：
$$F_{\mu\nu} = \begin{pmatrix} 0 & -E_1 & -E_2 & -E_3 \\ E_1 & 0 & B_3 & -B_2 \\ E_2 & -B_3 & 0 & B_1 \\ E_3 & B_2 & -B_1 & 0 \end{pmatrix} = -F_{\nu\mu}$$

这统一了电场向量 $\mathbf{E}$ 和磁场向量 $\mathbf{B}$。

**重要性质**：$\eta_{\mu\nu}$、$\eta^{\mu\nu}$、$\delta^\mu_\nu$ 和 $\tilde{\epsilon}_{\mu\nu\rho\sigma}$ 在任何惯性系中分量保持不变——它们是平直时空中仅有的具有此性质的张量。

## 1.7 Manipulating Tensors

### 缩并

将 $(k,l)$ 型张量变为 $(k-1,l-1)$ 型张量，通过对一个上指标和一个下指标求和：
$$S^{\mu_1\ldots\mu_{k-1}}_{\quad\;\nu_1\ldots\nu_{l-1}} = T^{\mu_1\ldots\rho\ldots\mu_{k-1}}_{\quad\;\nu_1\ldots\rho\ldots\nu_{l-1}}$$

**重要**：只能缩并上指标和下指标（不能缩并两个同类型指标），否则结果不是良好定义的张量。缩并的顺序重要。

### 指标升降

使用度规和逆度规升降指标：

$$T^{\alpha\beta}_{\quad\mu} = \eta_{\mu\nu} T^{\alpha\beta\nu}$$
$$T_\mu^{\ \beta\gamma} = \eta_{\mu\alpha} T^{\alpha\beta\gamma}$$
$$T_{\mu\nu\rho\sigma} = \eta_{\mu\alpha}\eta_{\nu\beta}\eta_{\rho\gamma}\eta_{\sigma\delta} T^{\alpha\beta\gamma\delta}$$

指标升降不改变指标相对于其它指标的位置。自由指标（不求和）在方程两边必须相同，哑指标（求和的）只出现在一边。

**重要**：三维平直欧几里得空间中度规为 diag$(1,1,1)$，分量数值不变，梯度和向量看起来相同。但在洛伦兹时空中：
$$\partial^\mu = (- \partial_0, \partial_1, \partial_2, \partial_3) \neq \partial_\mu$$

在弯曲时空中差异更大。更深层的原因是：张量通常有独立于度规的"自然"定义。

### 对称化与反对称化

**对称化**（圆括号）：
$$T_{(\mu_1\mu_2\ldots\mu_n)\rho}^{\quad\sigma} = \frac{1}{n!}\left(T_{\mu_1\mu_2\ldots\mu_n\rho}^{\quad\sigma} + \text{所有置换的和}\right)$$

**反对称化**（方括号）：
$$T_{[\mu_1\mu_2\ldots\mu_n]\rho}^{\quad\sigma} = \frac{1}{n!}\left(T_{\mu_1\mu_2\ldots\mu_n\rho}^{\quad\sigma} + \text{交错和}\right)$$

"交错和"指奇数次交换的置换带负号：
$$T_{[\mu\nu\rho]\sigma} = \frac{1}{6}(T_{\mu\nu\rho\sigma} - T_{\mu\rho\nu\sigma} + T_{\rho\mu\nu\sigma} - T_{\nu\mu\rho\sigma} + T_{\nu\rho\mu\sigma} - T_{\rho\nu\mu\sigma})$$

**竖线记号**：$T_{(\mu|\nu|\rho)} = \frac{1}{2}(T_{\mu\nu\rho} + T_{\rho\nu\mu})$，竖线内的指标不参与对称化。

**性质**：
- 如果缩并一对对称的上指标，只有下指标的对称部分有贡献：$X^{\mu\nu}Y_{\mu\nu} = X^{(\mu\nu)}Y_{(\mu\nu)}$
- 对于任意两个指标，张量可分解为对称和反对称部分：$T_{\mu\nu\rho\sigma} = T_{(\mu\nu)\rho\sigma} + T_{[\mu\nu]\rho\sigma}$
- 对于三个或更多指标，这不成立：$T_{\mu\nu\rho\sigma} \neq T_{(\mu\nu\rho)\sigma} + T_{[\mu\nu\rho]\sigma}$
- $(1,1)$ 型张量的迹：$X = X^\mu_{\ \mu}$
- $(0,2)$ 型张量的迹：$Y = Y^\mu_{\ \mu} = g^{\mu\lambda}Y_{\lambda\mu}$

### 偏导数

在平直时空惯性坐标中，$(k,l)$ 型张量的偏导数是 $(k,l+1)$ 型张量：
$$S_\mu^{\ \nu} = \partial_\mu V^\nu \text{ (仅在平直时空惯性坐标中变换为张量)}$$

在更一般的时空中，偏导数不再产生张量——需要引入**协变导数**（第3章）。例外：标量的偏导数 $\partial_\mu\phi$ 在任何时空中都是良好张量（梯度）。

偏导数的一个重要性质是它们对易：
$$\partial_\mu\partial_\nu = \partial_\nu\partial_\mu$$

## 1.8 Maxwell's Equations

### 传统形式

$$\nabla \times \mathbf{B} - \partial_t \mathbf{E} = \mathbf{J}$$
$$\nabla \cdot \mathbf{E} = \rho$$
$$\nabla \times \mathbf{E} + \partial_t \mathbf{B} = 0$$
$$\nabla \cdot \mathbf{B} = 0$$

### 协变形式

定义场强张量 $F_{\mu\nu}$，则麦克斯韦方程可写为：

$$\partial_\nu F^{\mu\nu} = J^\mu$$
$$\partial_{[\mu}F_{\nu\rho]} = 0$$

**第二种形式的等价表达**：由于 $F_{\mu\nu}$ 的反对称性，$\partial_{[\mu}F_{\nu\rho]} = 0$ 等价于：
$$\partial_\mu F_{\nu\rho} + \partial_\nu F_{\rho\mu} + \partial_\rho F_{\mu\nu} = 0$$

**证明思路**：从分量形式出发，
$$F^{0i} = E^i, \quad F^{ij} = \epsilon^{ijk}B_k$$

第一对方程 $\nabla \times \mathbf{B} - \partial_t \mathbf{E} = \mathbf{J}$ 和 $\nabla \cdot \mathbf{E} = \rho$ 结合为 $\partial_\nu F^{\mu\nu} = J^\mu$。第二对方程结合为 $\partial_{[\mu}F_{\nu\rho]} = 0$。

**规范不变性**：$F_{\mu\nu}$ 可用矢势 $A_\mu$ 表达：
$$F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$$

规范变换 $A_\mu \to A_\mu + \partial_\mu \lambda$ 使 $F_{\mu\nu}$ 不变，因为偏导数对易。

## 1.9 Energy and Momentum

### 四维速度和动量

**四维速度**（用固有时参数化）：
$$U^\mu = \frac{dx^\mu}{d\tau}$$

自动归一化：
$$\eta_{\mu\nu}U^\mu U^\nu = -1$$

**四维动量**：
$$p^\mu = m U^\mu$$

其中 $m$ 是静质量（固定量，独立于惯性系）。

**能量**：$E = p^0$。在粒子静止系中，$p^0 = m$，恢复了著名的 $E = mc^2$（设 $c=1$）。

**一般参考系中**（沿 $x$ 轴以速度 $v$ 运动）：
$$p^\mu = (\gamma m, v\gamma m, 0, 0)$$

其中 $\gamma = 1/\sqrt{1-v^2}$。

小 $v$ 展开：$p^0 = m + \frac{1}{2}mv^2$（静能+动能），$p^1 = mv$（牛顿动量）。

**质壳条件**：
$$p_\mu p^\mu = -m^2 \quad \text{或} \quad E = \sqrt{m^2 + \mathbf{p}^2}$$

### 四维力

牛顿第二定律的推广：
$$f^\mu = m\frac{d^2x^\mu}{d\tau^2} = \frac{dp^\mu}{d\tau}$$

**电磁洛伦兹力**的张量形式（唯一可能的协变推广）：
$$f^\mu = q F^{\mu\nu} U_\nu$$

此式在小速度极限下还原为牛顿形式 $\mathbf{f} = q(\mathbf{E} + \mathbf{v} \times \mathbf{B})$。

### 能量-动量张量（应力-能量张量）

**定义**：$T^{\mu\nu}$ 是"通过恒定 $x^\nu$ 面的四维动量 $p^\mu$ 的通量"。

在流体静止系中：
- $T^{00}$ = 能量密度 $\rho$
- $T^{0i} = T^{i0}$ = 动量密度
- $T^{ij}$ = 应力（动量通量）
- 对角项 $T^{ii}$ = $i$ 方向的压强
- 非对角项 $T^{ij}$（$i \neq j$）= 剪切应力

**尘埃（Dust）**：静止系中无压力，$T^{\mu\nu} = \rho U^\mu U^\nu$

**完美流体**：由静止系能量密度 $\rho$ 和各向同性压力 $p$ 完全刻画。在静止系中：
$$T^{\mu\nu} = \begin{pmatrix} \rho & 0 & 0 & 0 \\ 0 & p & 0 & 0 \\ 0 & 0 & p & 0 \\ 0 & 0 & 0 & p \end{pmatrix}$$

一般协变形式：
$$T^{\mu\nu} = (\rho + p)U^\mu U^\nu + p\eta^{\mu\nu}$$

**推导**：从所需形式反推。首先猜测 $(\rho+p)U^\mu U^\nu$ 给出 diag$(\rho+p,0,0,0)$，与目标差 diag$(-p,p,p,p) = p\eta^{\mu\nu}$。

**守恒**：$\partial_\mu T^{\mu\nu} = 0$

- $\nu = 0$：能量守恒
- $\nu = k$：$k$ 方向动量守恒

**完美流体的守恒方程**：

投影到 $U_\nu$（能量方程）：
$$U_\nu \partial_\mu T^{\mu\nu} = -\partial_\mu(\rho U^\mu) - p\partial_\mu U^\mu = 0$$

非相对论极限（$\rho \gg p$，小速度）下还原为连续性方程：
$$\partial_t\rho + \nabla\cdot(\rho\mathbf{v}) = 0$$

垂直投影 $P^\sigma_\nu = \delta^\sigma_\nu + U^\sigma U_\nu$（动量方程）：
非相对论极限下还原为欧拉方程：
$$\rho[\partial_t\mathbf{v} + (\mathbf{v}\cdot\nabla)\mathbf{v}] = -\nabla p$$

**真空能**：$T^{\mu\nu}_{\text{vac}} = -\rho_{\text{vac}}\eta^{\mu\nu}$，对应 $p_{\text{vac}} = -\rho_{\text{vac}}$。

## 1.10 Classical Field Theory

### 拉格朗日力学回顾

对单粒子 $q(t)$：
$$S = \int dt \, L(q, \dot{q})$$

最小作用量原理给出欧拉-拉格朗日方程：
$$\frac{\partial L}{\partial q} - \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right) = 0$$

例如 $L = \frac{1}{2}\dot{q}^2 - V(q)$ 给出 $\ddot{q} = -dV/dq$。

### 场论推广

将 $q(t)$ 替换为时空依赖的场 $\Phi^i(x^\mu)$。

**拉格朗日密度** $\mathcal{L}$：
$$L = \int d^3x \, \mathcal{L}(\Phi^i, \partial_\mu\Phi^i)$$

作用量：
$$S = \int dt \, L = \int d^4x \, \mathcal{L}(\Phi^i, \partial_\mu\Phi^i)$$

$\mathcal{L}$ 是洛伦兹标量。

**自然单位**：$c = \hbar = k_B = 1$，有 $[\text{能量}] = [\text{质量}] = [\text{长度}^{-1}] = [\text{时间}^{-1}]$。

作用量无量纲：$[S] = M^0$，体积元 $[d^4x] = M^{-4}$，故 $[\mathcal{L}] = M^4$。

### 欧拉-拉格朗日方程（场论版）

作用量在 $\Phi^i \to \Phi^i + \delta\Phi^i$ 下的变分：
$$\delta\mathcal{L} = \frac{\partial\mathcal{L}}{\partial\Phi^i}\delta\Phi^i + \frac{\partial\mathcal{L}}{\partial(\partial_\mu\Phi^i)}\partial_\mu(\delta\Phi^i)$$

积分并分部积分（忽略边界项）：
$$\delta S = \int d^4x \left[\frac{\partial\mathcal{L}}{\partial\Phi^i} - \partial_\mu\left(\frac{\partial\mathcal{L}}{\partial(\partial_\mu\Phi^i)}\right)\right]\delta\Phi^i$$

泛函导数定义为：
$$\delta S = \int d^4x \frac{\delta S}{\delta\Phi^i}\delta\Phi^i$$

因此欧拉-拉格朗日方程：
$$\frac{\delta S}{\delta\Phi^i} = \frac{\partial\mathcal{L}}{\partial\Phi^i} - \partial_\mu\left(\frac{\partial\mathcal{L}}{\partial(\partial_\mu\Phi^i)}\right) = 0$$

### 实标量场

最简单的场 $\phi(x^\mu) : \text{spacetime} \to \mathbb{R}$。

**拉格朗日密度**（"动能减势能"的推广）：
$$\mathcal{L} = -\frac{1}{2}\eta^{\mu\nu}\partial_\mu\phi\partial_\nu\phi - V(\phi)$$

第一项结合了动能和梯度能量，是洛伦兹不变的（常记为 $-\frac{1}{2}(\partial\phi)^2$）。

**推导欧拉-拉格朗日方程**：
$$\frac{\partial\mathcal{L}}{\partial\phi} = -\frac{dV}{d\phi}$$

对 $\partial_\mu\phi$ 求导需要仔细处理指标：
$$\frac{\partial}{\partial(\partial_\mu\phi)}\left[-\frac{1}{2}\eta^{\rho\sigma}(\partial_\rho\phi)(\partial_\sigma\phi)\right] = -\eta^{\mu\rho}\partial_\rho\phi = -\partial^\mu\phi$$

**证明**：使用重命名哑指标和 $\frac{\partial V_\alpha}{\partial V_\beta} = \delta^\beta_\alpha$：
$$\frac{\partial}{\partial(\partial_\mu\phi)}\eta^{\rho\sigma}(\partial_\rho\phi)(\partial_\sigma\phi) = \eta^{\rho\sigma}[\delta^\mu_\rho(\partial_\sigma\phi) + (\partial_\rho\phi)\delta^\mu_\sigma] = 2\eta^{\mu\sigma}\partial_\sigma\phi$$

**运动方程**：
$$\Box\phi - \frac{dV}{d\phi} = 0$$

其中 $\Box = \eta^{\mu\nu}\partial_\mu\partial_\nu = -\partial_t^2 + \nabla^2$ 是 d'Alembert 算子。

**克莱因-戈登方程**（$V(\phi) = \frac{1}{2}m^2\phi^2$）：
$$\Box\phi - m^2\phi = 0$$

或显式地：
$$-\frac{\partial^2\phi}{\partial t^2} + \nabla^2\phi - m^2\phi = 0$$

这是线性微分方程，解可叠加。

### 电磁场

**矢势**：$A_\mu$（$A_0$ 是静电势 $\Phi$，$A_i$ 是传统矢势 $\mathbf{A}$）

场强张量：
$$F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$$

**规范变换**：$A_\mu \to A_\mu + \partial_\mu\lambda$

$F_{\mu\nu}$ 在规范变换下不变，因为 $\partial_\mu\partial_\nu\lambda - \partial_\nu\partial_\mu\lambda = 0$（偏导数对易）。

**拉格朗日密度**：
$$\mathcal{L} = -\frac{1}{4}F_{\mu\nu}F^{\mu\nu} + A_\mu J^\mu$$

**推导麦克斯韦方程**：
$$\frac{\partial\mathcal{L}}{\partial A_\nu} = J^\nu$$

对动量的知识项求导：
$$\frac{\partial}{\partial(\partial_\mu A_\nu)}(F_{\alpha\beta}F^{\alpha\beta}) = 4F^{\mu\nu}$$

**证明步骤**：
1. 写 $F_{\alpha\beta}F^{\alpha\beta} = \eta^{\alpha\rho}\eta^{\beta\sigma}F_{\alpha\beta}F_{\rho\sigma}$
2. 利用 $F_{\alpha\beta} = \partial_\alpha A_\beta - \partial_\beta A_\alpha$，得 $\frac{\partial F_{\alpha\beta}}{\partial(\partial_\mu A_\nu)} = \delta^\mu_\alpha\delta^\nu_\beta - \delta^\mu_\beta\delta^\nu_\alpha$
3. 代入求导得到 $4F^{\mu\nu}$

因此：
$$\frac{\partial\mathcal{L}}{\partial(\partial_\mu A_\nu)} = -F^{\mu\nu}$$

欧拉-拉格朗日方程给出（注意符号和指标顺序）：
$$\partial_\mu F^{\mu\nu} = J^\nu$$

另一对方程 $\partial_{[\mu}F_{\nu\rho]} = 0$ 自动满足，因为 $F = dA$ 且 $d^2 = 0$。

### 拉格朗日形式的价值

1. 简洁性：一个标量函数 $\mathcal{L}$ 代替多个张量方程
2. 对称性：要求作用量在对称变换下不变自动确保动力学尊重对称性
3. 能量-动量张量：通过对度规的泛函导数可导出唯一的 $T^{\mu\nu}$（第4章）

### 能量-动量张量（来自拉格朗日形式）

对度规变分作用量可推导 $T_{\mu\nu}$（将在第4章详细讨论）。结果是：

**标量场**：
$$T_{\mu\nu} = \partial_\mu\phi\partial_\nu\phi - \frac{1}{2}\eta_{\mu\nu}(\eta^{\rho\sigma}\partial_\rho\phi\partial_\sigma\phi + 2V(\phi))$$

或等价地（使用运动方程后）：
$$T^{\mu\nu} = \partial^\mu\phi\partial^\nu\phi - \eta^{\mu\nu}\mathcal{L}$$

**电磁场**：
$$T^{\mu\nu} = F^{\mu\rho}F^\nu_{\ \rho} - \frac{1}{4}\eta^{\mu\nu}F^{\rho\sigma}F_{\rho\sigma}$$

两者都满足守恒律 $\partial_\mu T^{\mu\nu} = 0$。

### 有效场论

为什么拉格朗日量取特定形式（例如标量场中不包含 $\lambda\phi^6$ 项）？

量子场论中，高能虚过程会"重正化"耦合常数。高阶项 $(\lambda\phi^6)$ 的耦合常数 $\lambda$ 具有负质量量纲 $[\lambda] = M^{-2}$，因此被高能标度 $\mu$ 压低：$\lambda \sim \mu^{-2}$。

在低能有效场论中，只有最低阶项（无量纲或正质量量纲的耦合常数）是相关的——这极大地简化了可能的模型。

**GR作为经典场论**：GR是度规张量 $g_{\mu\nu}$ 作为动力学场的场论。与其他场论不同，GR中的度规决定了时空本身的几何，而非依赖于预先存在的时空结构。
