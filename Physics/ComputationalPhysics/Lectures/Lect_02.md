# 插值法

> **参考书目**：(1) NR §3; (2) CMP §3

## 问题的数学表述

给定 $n+1$ 个互异节点 $x_0 < x_1 < \cdots < x_n$ 上的函数值 $y_i = f(x_i)$，构造一个函数 $P(x)$ 满足

$$P(x_i) = y_i, \quad i = 0, 1, \ldots, n$$

$P(x)$ 称为**插值函数（Interpolant）**，原 $f(x)$ 为**被插值函数**。当 $x$ 在 $[x_0, x_n]$ 内时称为**插值（Interpolation）**，在区间外时称为**外推（Extrapolation）**。

插值在计算物理中的典型应用场景：
- 从离散的实验数据/模拟结果中重建连续函数
- 数值积分的构造块（为求积公式提供函数近似）
- 微分方程数值解中的局部分片近似
- 特殊函数的快速求值（用表 + 插值代替直接计算）

贯穿全讲的核心张力：**高阶多项式插值在均匀节点上可能产生剧烈振荡（Runge 现象），这是样条插值和分段方法的根本动机。**

## 多项式插值的存在唯一性

$n$ 次多项式 $P_n(x) = a_0 + a_1 x + \cdots + a_n x^n$ 有 $n+1$ 个待定系数。插值条件 $P_n(x_i) = y_i$ 构成关于 $a_j$ 的线性方程组：

$$\begin{bmatrix}
1 & x_0 & x_0^2 & \cdots & x_0^n \\
1 & x_1 & x_1^2 & \cdots & x_1^n \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_n & x_n^2 & \cdots & x_n^n
\end{bmatrix}
\begin{bmatrix} a_0 \\ a_1 \\ \vdots \\ a_n \end{bmatrix}
= \begin{bmatrix} y_0 \\ y_1 \\ \vdots \\ y_n \end{bmatrix}$$

系数矩阵是 **Vandermonde 矩阵（Vandermonde Matrix）**，行列式为 $\displaystyle\prod_{0 \leq i < j \leq n} (x_j - x_i)$。当节点互异时行列式非零，插值多项式存在且唯一。

但直接求解 Vandermonde 系统是数值上的灾难——其条件数随 $n$ 指数增长。实际计算中必须使用更巧妙的方法。

## 拉格朗日插值（Lagrange Interpolation）

### 构造：插值基函数（Lagrange Basis / Cardinal Functions）

Lagrange 的出发点是不解线性方程组，而是直接写出满足插值条件的显式表达式。定义 $n+1$ 个 $n$ 次多项式 $L_i^{(n)}(x)$（上标表示使用的总点数，下标表示函数值为 $1$ 的那个节点）：

$$L_i^{(n)}(x) = \prod_{\substack{k=0 \\ k \neq i}}^{n} \frac{x - x_k}{x_i - x_k}$$

$L_i^{(n)}(x)$ 的核心性质是**Kronecker 条件**：

$$L_i^{(n)}(x_j) = \delta_{ij} = \begin{cases} 1, & i = j \\ 0, & i \neq j \end{cases}$$

当 $x = x_i$ 时分子每一项等于分母对应项，乘积为 1；当 $x = x_j \neq x_i$ 时，因子 $(x_j - x_j)/(x_i - x_j) = 0$ 使整项为零。

于是插值多项式为：

$$P_n(x) = \sum_{i=0}^{n} y_i \, L_i^{(n)}(x)$$

### 余项（Interpolation Error）

若 $f \in C^{n+1}[a, b]$，对任意 $x \in [a, b]$ 存在 $\xi \in (a, b)$ 使得

$$f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \, \omega_{n+1}(x)$$

其中 $\omega_{n+1}(x) = \displaystyle\prod_{k=0}^{n} (x - x_k)$ 为**节点多项式（Nodal Polynomial）**。

这个公式的结构非常清晰：误差由三部分乘积决定：
1. **被插值函数的光滑性**：$f^{(n+1)}(\xi)$ 的大小；
2. **多项式阶数**：$1/(n+1)!$ 随 $n$ 增大而快速衰减；
3. **节点分布的几何**：$\omega_{n+1}(x)$ 在区间两端剧烈增长。

当节点均匀分布时，$\omega_{n+1}(x)$ 在区间两端的增长速度快于 $1/(n+1)!$ 的衰减——这就是 Runge 现象的数学根源。

### Runge 现象（Runge's Phenomenon）

考虑经典反例 $f(x) = 1/(1 + 25x^2)$ 在 $[-1, 1]$ 上均匀插值。如下图所示，当 $n$ 增大时，插值多项式在区间两端产生剧烈振荡，且不收敛于 $f(x)$。

**根本原因**：$f(x) = 1/(1+25x^2)$ 在复平面 $x = \pm i/5$ 处有极点。多项式的收敛域是以插值区间中心为圆心的复平面上最大的不含奇点的圆。均匀节点的情况下，区间 $[-1, 1]$ 超出了这个收敛圆，因此插值过程发散。

**解决思路**：
1. **不要等距节点**：使用 Chebyshev 节点 $x_k = \cos\!\big(\frac{2k+1}{2n+2}\pi\big)$（Chebyshev 多项式的零点），可将 $\omega_{n+1}(x)$ 的最大值最小化。
2. **不要用全局高次多项式**：改用分片低次多项式（样条插值）。
3. **使用有理插值（Rational Interpolation）**：对于有极点结构的函数，有理函数插值天然更合适。

### 适用情况

Lagrange 插值的优势在于公式是显式的，不需要求解任何线性方程组。它非常适合以下场景：
- **低次插值（$n \leq 5$）**：此时 Runge 现象不明显，公式简单直接。
- **需要快速评估插值但节点固定**：基函数 $L_i^{(n)}(x)$ 可预先计算和存储。
- **理论推导**：Lagrange 形式是许多数值方法的理论基础（如 Gauss 求积公式的推导）。

不利场景：
- **高次等距节点插值**：Runge 现象导致发散。
- **动态添加新数据点**：每加一个点需要重新计算所有基函数。

## 内维尔算法（Neville's Algorithm）

### 动机：避免 Lagrange 形式的重复计算

Lagrange 形式有一个实用性缺陷：当节点的数量增加时，所有基函数 $L_i^{(n)}(x)$ 都必须重新计算。在物理模拟中，我们常常需要逐步增加节点数量来检验插值的收敛性——此时 Neville 递推方案远为高效。

Neville 算法不显式写出多项式本身（像 Lagrange 那样），而是在特定点 $x$ 处**直接递推计算插值结果**。它是一个求值算法，而非表示算法。

### 核心构造：父子递推关系

**符号约定**：令 $P_{i,i+1,\ldots,i+m}(x)$ 为通过节点 $x_i, x_{i+1}, \ldots, x_{i+m}$ 的 $m$ 次插值多项式（共有 $m+1$ 个点）。特别地，$P_i(x) \equiv y_i$（一个点的插值就是常数）。

关键观察：取两组各有 $m$ 个节点的集合，它们有 $m-1$ 个公共点。考虑：
- $P_{i,\ldots,i+m-1}(x)$：通过 $x_i, \ldots, x_{i+m-1}$ 的 $m-1$ 次插值多项式。
- $P_{i+1,\ldots,i+m}(x)$：通过 $x_{i+1}, \ldots, x_{i+m}$ 的 $m-1$ 次插值多项式。

这两个多项式在公共点 $x_{i+1}, \ldots, x_{i+m-1}$ 上取值相同（都等于 $f$ 在该点的值）。现在构造：

$$P_{i,\ldots,i+m}(x) = \frac{(x - x_i) P_{i+1,\ldots,i+m}(x) - (x - x_{i+m}) P_{i,\ldots,i+m-1}(x)}{x_{i+m} - x_i}$$

### 递推公式的推导

我们需要证明上式确实通过所有 $m+1$ 个节点。

**在公共节点 $x_k$（$i+1 \leq k \leq i+m-1$）上**：

两个低次多项式在 $x_k$ 处都等于 $y_k$，代入上式：

$$\begin{aligned}
P_{i,\ldots,i+m}(x_k) &= \frac{(x_k - x_i) y_k - (x_k - x_{i+m}) y_k}{x_{i+m} - x_i} \\
&= y_k \frac{(x_k - x_i) - (x_k - x_{i+m})}{x_{i+m} - x_i} \\
&= y_k \frac{x_{i+m} - x_i}{x_{i+m} - x_i} = y_k \quad \checkmark
\end{aligned}$$

**在左端点 $x_i$ 上**：$P_{i,\ldots,i+m-1}(x_i) = y_i$，而

$$P_{i+1,\ldots,i+m}(x_i) \neq y_i \text{（一般：} P_{i+1,\ldots,i+m} \text{不经过 } x_i \text{）}$$

但关键是我们再乘以 $(x_i - x_i) = 0$，该项消失：

$$\begin{aligned}
P_{i,\ldots,i+m}(x_i) &= \frac{(x_i - x_i) P_{i+1,\ldots,i+m}(x_i) - (x_i - x_{i+m}) P_{i,\ldots,i+m-1}(x_i)}{x_{i+m} - x_i} \\
&= \frac{0 - (x_i - x_{i+m}) y_i}{x_{i+m} - x_i} = y_i \quad \checkmark
\end{aligned}$$

**在右端点 $x_{i+m}$ 上**：类似地，$P_{i,\ldots,i+m-1}(x_{i+m})$ 的系数 $(x_{i+m} - x_{i+m}) = 0$：

$$\begin{aligned}
P_{i,\ldots,i+m}(x_{i+m}) &= \frac{(x_{i+m} - x_i) P_{i+1,\ldots,i+m}(x_{i+m}) - (x_{i+m} - x_{i+m}) P_{i,\ldots,i+m-1}(x_{i+m})}{x_{i+m} - x_i} \\
&= \frac{(x_{i+m} - x_i) y_{i+m} - 0}{x_{i+m} - x_i} = y_{i+m} \quad \checkmark
\end{aligned}$$

因此递推公式在所有节点上满足插值条件，证毕。

### Neville 表格

递推可以组织为一个上三角表格，每一行从常数插值 $P_i(x) \equiv y_i$ 开始，向右逐步利用更多节点提升插值阶数：

```
 k=0 (m=0)    k=1 (m=1)      k=2 (m=2)        k=3 (m=3)
─────────────────────────────────────────────────────────
P_0 = y_0
               P_{01}(x)
P_1 = y_1                    P_{012}(x)
               P_{12}(x)                        P_{0123}(x)
P_2 = y_2                    P_{123}(x)
               P_{23}(x)
P_3 = y_3
```

任意一列的递推关系统一写成：

$$P_{i,i+1,\ldots,i+k}(x) = \frac{(x - x_i) P_{i+1,\ldots,i+k}(x) - (x - x_{i+k}) P_{i,\ldots,i+k-1}(x)}{x_{i+k} - x_i}$$

其中 $k$ 是插值多项式的次数（即使用了 $k+1$ 个点），$i$ 是起始节点的下标。

### 误差估计：利用 Neville 表格的副产品

Neville 算法的一个巨大优势是它**免费提供误差估计**。表格中相邻两项（使用相同数量节点但不同子集的插值结果）之差可以估计当前阶插值的误差。

对于 $k$ 阶插值结果 $P_{01\ldots k}(x)$，其与 $k-1$ 阶插值 $P_{01\ldots k-1}(x)$ 的差值

$$\Delta_k = |P_{01\ldots k}(x) - P_{01\ldots k-1}(x)|$$

在稳健场合下给出误差的数量级估计。当 $\Delta_k$ 变化不大时，$k$ 阶的结果基本可信；若 $\Delta_k$ 突然剧烈变化，则是 Runge 现象的预警信号。

在 NR 的实现 `polint()` 中，Neville 表格的递推正是核心，而误差 $\Delta_k$ 用来判断插值是否已收敛。

### 适用情况

- **稀疏求值场景**：只在少数点 $x$ 处求插值结果，而非构造一个全局表达式。
- **自适应阶数选择**：递推过程中若 $\Delta_k$ 已经小于目标精度，提前停止——不必每次都用满所有数据点。
- **外推**：Neville 算法也是 Richardson 外推和 Romberg 积分的数学基础（将数值积分结果视为步长 $h \to 0$ 的多项式外推）。
- **实验数据分析**：当节点数动态变化时（例如逐步增加测量点），Neville 的增量式更新非常自然。

不利场景：
- **密集求值场景**：若需要在大量 $x$ 处反复求插值结果，Neville 表格每次重新递推的效率不如预先计算好的样条系数或 Barycentric 形式的 Lagrange 公式。

## 三次样条插值（Cubic Spline Interpolation）

### 动机：Runge 现象的解药

样条插值的哲学是：放弃使用单一全局高次多项式，改用分片（Piecewise）低次多项式——每一段只需要满足局部节点的插值条件，同时在段与段之间的衔接处施加光滑性约束。

最常用的是**三次样条（Cubic Spline）**：分段三次多项式，在节点处保证函数值、一阶导数和二阶导数连续（即 $C^2$ 连续）。

### 数学构造

给定 $n+1$ 个节点 $x_0 < \cdots < x_n$ 和对应的 $y_0, \ldots, y_n$。在每段 $[x_j, x_{j+1}]$ 上构造三次多项式 $S_j(x)$（共 $n$ 段）。每段三次多项式有 4 个系数，共 $4n$ 个自由度。约束条件为：

1. **插值条件**（$2n$ 个）：$S_j(x_j) = y_j$，$S_j(x_{j+1}) = y_{j+1}$。
2. **一阶导数连续**（$n-1$ 个）：$S_{j-1}'(x_j) = S_j'(x_j)$。
3. **二阶导数连续**（$n-1$ 个）：$S_{j-1}''(x_j) = S_j''(x_j)$。

总计 $4n - 2$ 个约束，尚缺 2 个——这由**边界条件（Boundary Conditions）**补足。

设 $S_j''(x_j) = \sigma_j$（未知的二阶导数在节点处的值）。在单段 $[x_j, x_{j+1}]$ 上，二阶导数是线性函数：

$$S_j''(x) = \sigma_j \frac{x_{j+1} - x}{h_j} + \sigma_{j+1} \frac{x - x_j}{h_j}, \quad h_j = x_{j+1} - x_j$$

积分两次（并利用 $S_j(x_j) = y_j$ 和 $S_j(x_{j+1}) = y_{j+1}$ 确定积分常数）：

$$S_j(x) = \sigma_j \frac{(x_{j+1} - x)^3}{6h_j} + \sigma_{j+1} \frac{(x - x_j)^3}{6h_j} + \left(\frac{y_j}{h_j} - \frac{\sigma_j h_j}{6}\right)(x_{j+1} - x) + \left(\frac{y_{j+1}}{h_j} - \frac{\sigma_{j+1} h_j}{6}\right)(x - x_j)$$

还剩一阶导数连续的条件 $S_{j-1}'(x_j) = S_j'(x_j)$。对 $S_j(x)$ 求导后代入 $x = x_j$：

从 $S_{j-1}$ 得到 $S_{j-1}'(x_j)$：

$$S_{j-1}'(x_j) = \frac{y_j - y_{j-1}}{h_{j-1}} + \frac{h_{j-1}}{6}\sigma_{j-1} + \frac{h_{j-1}}{3}\sigma_j$$

从 $S_j$ 得到 $S_j'(x_j)$：

$$S_j'(x_j) = \frac{y_{j+1} - y_j}{h_j} - \frac{h_j}{3}\sigma_j - \frac{h_j}{6}\sigma_{j+1}$$

令两者相等，整理得三对角方程组（Tridiagonal System）：

$$h_{j-1}\sigma_{j-1} + 2(h_{j-1} + h_j)\sigma_j + h_j\sigma_{j+1} = 6\left(\frac{y_{j+1} - y_j}{h_j} - \frac{y_j - y_{j-1}}{h_{j-1}}\right)$$

其中 $j = 1, 2, \ldots, n-1$。这是 $n-1$ 个方程，但有 $n+1$ 个未知量 $\sigma_0, \ldots, \sigma_n$，需补充两个边界条件。

### 边界条件（Boundary Conditions）

三种常见选择：

**自然样条（Natural Spline）**：$\sigma_0 = \sigma_n = 0$（两端二阶导数为零）。物理类比：一根弹性梁在两端自由放置时的形状。适用于不知道边界导数信息的场合。

**固定斜率（Clamped / Complete Spline）**：指定 $S'(x_0) = f'(x_0)$ 和 $S'(x_n) = f'(x_n)$。这在已知边界导数时精度最好。

**非节点条件（Not-A-Knot Condition）**：令 $S_0$ 和 $S_1$ 在 $x_1$ 处的三阶导数连续（即前两段实质上是同一三次多项式），对末端类似。$x_1$ 和 $x_{n-1}$ 不作为"真正的"样条节点——这就是 NR 中 `spline()` 的默认方案。

### 数值求解

系数矩阵是三对角的，可用 **Thomas 算法（Thomas Algorithm / Tridiagonal Matrix Algorithm, TDMA）** 在 $O(n)$ 时间内求解，无需 $O(n^3)$ 的高斯消去。TDMA 的推导如下：

三对角方程组的一般形式为：

$$a_j \sigma_{j-1} + b_j \sigma_j + c_j \sigma_{j+1} = d_j, \quad j = 1, \ldots, n-1$$

前向消去（Forward Elimination）：

$$\tilde c_j = \begin{cases} c_1 / b_1, & j = 1 \\ \displaystyle\frac{c_j}{b_j - a_j \tilde c_{j-1}}, & j = 2, \ldots, n-1 \end{cases}$$

$$\tilde d_j = \begin{cases} d_1 / b_1, & j = 1 \\ \displaystyle\frac{d_j - a_j \tilde d_{j-1}}{b_j - a_j \tilde c_{j-1}}, & j = 2, \ldots, n-1 \end{cases}$$

后向回代（Backward Substitution）：

$$\sigma_{n-1} = \tilde d_{n-1}, \quad \sigma_j = \tilde d_j - \tilde c_j \sigma_{j+1}, \; j = n-2, \ldots, 1$$

已知所有 $\sigma_j$ 后，即可用分段公式 $S_j(x)$ 在任意段求值。

### 适用情况

三次样条是实际中最常用的通用插值工具：

- **高次插值不收敛的场景**：只要有足够多的节点，样条插值在有界区间内收敛于被插值函数，不存在 Runge 现象。
- **需要光滑导数**：三次样条的 $C^2$ 连续性是许多物理应用（轨迹规划、有限元形函数、反应率插值）必须满足的。
- **大规模数据集的密集求值**：一次性建表（解三对角系统）后，每次求值是 $O(1)$ 的对分段定位和多项式求值，远比 Neville 表格高效。

不利场景：
- **数据点极少（$n < 4$）**：三次样条退化为常规多项式插值。
- **数据带有强噪声**：样条会严格通过每个数据点（包括噪声），导致过度摆动。此时应使用光滑样条（Smoothing Spline，对曲率施加罚项）或移动最小二乘（Moving Least Squares）。
- **需要单调性或凸性保持**：标准三次样条可能在数据点之间引入不想要的振荡。此时可选择保形插值（Shape-Preserving Interpolation），如 Steffen 插值或分段三次 Hermite 插值（Piecewise Cubic Hermite Interpolation, PCHIP）。

## 方法对比总结

| 方法 | 全局/分段 | 次数 | 光滑性 | 点数适用 | 求解复杂度 | 适用场景 |
|:-----|:---------|:-----|:------|:--------|:----------|:--------|
| Lagrange | 全局 | $n$ | $C^\infty$ | 少（$\leq 5$） | $O(n^2)$/求值 | 理论推导、低次快速插值 |
| Neville | 全局 | 递增 | $C^\infty$ | 任意 | $O(n^2)$/求值点 | 稀疏求值、收敛检验、外推 |
| Cubic Spline | 分段 | 3 | $C^2$ | 多 | $O(n)$ 建表 + $O(1)$ 求值 | 通用密集求值、光滑导数需求 |
| PCHIP | 分段 | 3 | $C^1$ | 多 | $O(n)$ 建表 | 保单调性的数据插值 |
