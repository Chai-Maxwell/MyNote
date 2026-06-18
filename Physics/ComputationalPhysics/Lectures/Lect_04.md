# 数值积分

> **参考书目**：(1) NR §4; (2) CMP §5

## 问题的数学表述

给定积分

$$I = \int_{a}^{b} f(x) \, \mathrm{d}x$$

构造**求积公式（Quadrature Rule）**：

$$I \approx \sum_{i=0}^{n} w_i f(x_i)$$

其中 $x_i$ 为**节点（Nodes / Abscissas）**，$w_i$ 为**权重（Weights）**。求积公式设计的核心自由度为：选择节点的位置和数目，选择对应的权重。这些选择决定了方法的精度——即公式对多少阶的多项式是**精确**的。

**代数精度（Degree of Precision / Algebraic Degree of Accuracy）**：一个求积公式的代数精度为 $d$，当且仅当它精确积分所有次数 $\leq d$ 的多项式，但对于 $x^{d+1}$ 不再精确。

## Newton-Cotes 求积公式（Newton-Cotes Rules）

Newton-Cotes 类公式的核心设定是**等距节点**：将 $[a, b]$ 划分为 $n$ 个等距子区间，步长 $h = (b-a)/n$，节点为 $x_i = a + i h$。在这些节点上构造 Lagrange 插值多项式并精确积分。

### 梯形法则（Trapezoidal Rule）

$n = 1$：两个节点 $x_0 = a, x_1 = b$，用线性插值：

$$I \approx \frac{h}{2}\big[f(a) + f(b)\big] = \frac{b-a}{2}\big[f(a) + f(b)\big]$$

**误差分析——单段梯形法则的中值形式推导**：

梯形法则等价于用线性 Lagrange 插值 $p_1(x)$ 替代 $f(x)$ 后精确积分。线性插值的余项（见 Lect_02）为：

$$f(x) - p_1(x) = \frac{f''(\xi(x))}{2}(x - a)(x - b)$$

其中 $\xi(x) \in (a, b)$。积分误差为：

$$I - T = \int_a^b \frac{f''(\xi(x))}{2}(x - a)(x - b)\,\mathrm{d}x$$

利用**积分中值定理（Integral Mean Value Theorem）**：因为 $(x-a)(x-b) \leq 0$ 在 $[a, b]$ 上不变号，存在 $\xi \in (a, b)$ 使得 $f''(\xi(x))$ 可以用其在某点的值替代并提到积分号外：

$$I - T = \frac{f''(\xi)}{2}\int_a^b (x - a)(x - b)\,\mathrm{d}x$$

计算定积分：

$$\int_a^b (x - a)(x - b)\,\mathrm{d}x = \int_a^b \big[x^2 - (a+b)x + ab\big]\,\mathrm{d}x = \left[\frac{x^3}{3} - \frac{a+b}{2}x^2 + abx\right]_a^b$$

代入上下限整理（或作变量代换 $x = a + t(b-a), t \in [0,1]$）：

$$\int_a^b (x-a)(x-b)\,\mathrm{d}x = -(b-a)\int_0^1 t(1-t)\,(b-a)^2\,\mathrm{d}t = -(b-a)^3\int_0^1 (t - t^2)\,\mathrm{d}t = -(b-a)^3\left(\frac{1}{2} - \frac{1}{3}\right) = -\frac{(b-a)^3}{6}$$

代回：

$$I - T = \frac{f''(\xi)}{2}\left(-\frac{(b-a)^3}{6}\right) = -\frac{(b-a)^3}{12}f''(\xi)$$

因此单段梯形法则的误差为：

$$\boxed{I - T = -\frac{(b-a)^3}{12}f''(\xi) = -\frac{h^3}{12}f''(\xi), \quad h = b-a, \;\; \xi \in (a, b)}$$

截断误差为 $O(h^3)$，代数精度 $d = 1$（对线性函数 $f'' \equiv 0$，误差为零）。

**Euler-Maclaurin 展开与偶次幂性质**：通过对各子区间反复分部积分，梯形法则的误差可写成渐近级数：

$$\int_a^b f(x)\,\mathrm{d}x - T(h) = -\frac{B_2}{2!}h^2\big[f'(b) - f'(a)\big] - \frac{B_4}{4!}h^4\big[f'''(b) - f'''(a)\big] - \cdots$$

其中 $B_{2k}$ 为 Bernoulli 数（$B_2 = 1/6, B_4 = -1/30, \ldots$）。因为 $B_{\text{odd } > 1} = 0$，展开式中**只出现 $h$ 的偶次幂**（$h^2, h^4, h^6, \ldots$）——这是梯形法则能通过 Romberg 外推高效提升精度的关键原因。

### 辛普森法则（Simpson's Rule）

$n = 2$：三个等距节点 $x_0 = a, x_1 = (a+b)/2, x_2 = b$，用二次插值。

$$I \approx \frac{h}{3}\big[f(a) + 4f((a+b)/2) + f(b)\big], \quad h = \frac{b-a}{2}$$

权重比 $1:4:1$。尽管只用了二次多项式插值，Simpson 法则的误差分析表明它对**三次多项式也是精确的**（代数精度 $d=3$）——这是由对称性带来的"免费升级"：

**误差分析——Simpson 法则的误差推导**：

将 $f(x)$ 在区间中点 $m = (a+b)/2$ 处作 Taylor 展开到四阶：

$$f(x) = f(m) + f'(m)(x-m) + \frac{f''(m)}{2}(x-m)^2 + \frac{f'''(m)}{6}(x-m)^3 + \frac{f^{(4)}(m)}{24}(x-m)^4 + \cdots$$

精确积分（区间 $[a, b] = [m-h, m+h]$，其中 $h = (b-a)/2$）：

$$I = \int_{m-h}^{m+h} f(x)\,\mathrm{d}x = 2h\,f(m) + 0 + \frac{2h^3}{3}\frac{f''(m)}{2} + 0 + \frac{2h^5}{5}\frac{f^{(4)}(m)}{24} + \cdots$$

奇次项在对称区间上积分为零。整理：

$$I = 2h\,f(m) + \frac{h^3}{3}f''(m) + \frac{h^5}{60}f^{(4)}(m) + O(h^7)$$

现在计算 Simpson 法则对同样的 Taylor 展开给出的结果。Simpson 公式中的三节点为 $x_0 = a = m-h$，$x_1 = m$，$x_2 = b = m+h$。将 $f(a)$ 和 $f(b)$ 也在 $m$ 处展开：

$$
\begin{aligned}
f(m \pm h) &= f(m) \pm h f'(m) + \frac{h^2}{2}f''(m) \pm \frac{h^3}{6}f'''(m) + \frac{h^4}{24}f^{(4)}(m) \pm \cdots
\end{aligned}
$$

Simpson 公式的组合为（$h$ 仍为 $(b-a)/2$）：

$$S = \frac{h}{3}\big[f(m-h) + 4f(m) + f(m+h)\big]$$

代入展开：

$$
\begin{aligned}
f(m-h) + f(m+h) &= 2f(m) + h^2 f''(m) + \frac{h^4}{12}f^{(4)}(m) + O(h^6)
\end{aligned}
$$

（注意 $f'$ 和 $f'''$ 的奇次项因对称性抵消）。因此：

$$
\begin{aligned}
S &= \frac{h}{3}\big[2f(m) + h^2 f''(m) + \frac{h^4}{12}f^{(4)}(m) + 4f(m) + O(h^6)\big] \\
&= \frac{h}{3}\big[6f(m) + h^2 f''(m) + \frac{h^4}{12}f^{(4)}(m) + O(h^6)\big] \\
&= 2h\,f(m) + \frac{h^3}{3}f''(m) + \frac{h^5}{36}f^{(4)}(m) + O(h^7)
\end{aligned}
$$

比较 $I$ 和 $S$ 的展开：

$$I - S = \left(\frac{h^5}{60} - \frac{h^5}{36}\right)f^{(4)}(m) + O(h^7) = \left(\frac{3}{180} - \frac{5}{180}\right)h^5 f^{(4)}(m) = -\frac{h^5}{90}f^{(4)}(m) + O(h^7)$$

用中值定理将余项写成紧凑形式（$h = (b-a)/2$）：

$$\boxed{I - S = -\frac{h^5}{90}f^{(4)}(\xi) = -\frac{(b-a)^5}{2880}f^{(4)}(\xi), \quad \xi \in (a, b)}$$

**为什么对三次多项式精确**：从展开可以看到，$f'''(m)$ 项在 $I$ 和 $S$ 中都因对称性而消去——Simpson 公式在 $m$ 处的展开 $S$ 直到 $h^3 f''(m)$ 项都与 $I$ 精确一致。这意味着任何三次多项式（其四阶导数为零）被 Simpson 法则精确积分——代数精度 $d = 3$，比二次插值本身的阶数多了一级。

### 高阶 Newton-Cotes 公式

| $n$ | 名称 | 权重模式 | 代数精度 $d$ | 误差量级 |
|:---:|:-----|:--------|:------------:|:--------|
| 1 | 梯形 (Trapezoidal) | $1:1$ | 1 | $O(h^3 f'')$ |
| 2 | 辛普森 (Simpson's)  | $1:4:1$ | 3 | $O(h^5 f^{(4)})$ |
| 3 | 辛普森 3/8 (Simpson's 3/8) | $1:3:3:1$ | 3 | $O(h^5 f^{(4)})$ |
| 4 | Boole 法则 (Boole's Rule) | $7:32:12:32:7$ | 5 | $O(h^7 f^{(6)})$ |

高阶 Newton-Cotes 公式的权重会出现负值（$n \geq 8$ 时），这带来数值不稳定性——高阶插值在等距节点的 Runge 现象导致积分误差不降反升。因此单纯增加 Newton-Cotes 的阶数**不是**提高积分精度的正确方法。正确的策略是使用**复合法则（Composite Rules）**。

### 复合法则（Composite Rules）

将 $[a, b]$ 划分为 $N$ 个子区间，在每个子区间上使用低阶 Newton-Cotes 公式。

**复合梯形法则（Composite Trapezoidal Rule）**：

将 $[a, b]$ 划分为 $N$ 个子区间，每个子区间宽度 $h = (b-a)/N$。节点为 $x_k = a + k h$（$k = 0, 1, \ldots, N$）：

$$T_N = \frac{h}{2}\big[f(a) + 2f(a+h) + 2f(a+2h) + \cdots + 2f(b-h) + f(b)\big]$$

**复合梯形法则的误差推导**：将 $N$ 个单段梯形误差相加。每个子区间 $[x_{k-1}, x_k]$ 上的单段梯形误差为 $-\dfrac{h^3}{12}f''(\xi_k)$（$\xi_k$ 为子区间内某点）。总误差为：

$$I - T_N = \sum_{k=1}^{N} \left(-\frac{h^3}{12}f''(\xi_k)\right) = -\frac{h^3}{12}\sum_{k=1}^{N} f''(\xi_k)$$

用 $\bar{f}'' = \dfrac{1}{N}\displaystyle\sum_{k=1}^{N} f''(\xi_k)$ 表示子区间内 $f''$ 的平均值。由中间值定理，若 $f''$ 连续，存在 $\xi \in (a, b)$ 使 $f''(\xi) = \bar{f}''$：

$$I - T_N = -\frac{h^3}{12} \cdot N \cdot f''(\xi) = -\frac{N h^3}{12} f''(\xi) = -\frac{(b-a)h^2}{12}f''(\xi)$$

因此：

$$\boxed{I - T_N = -\frac{(b-a)}{12}h^2 f''(\xi) = O(h^2) = O(N^{-2}), \quad \xi \in (a, b)}$$

随着子区间数 $N$ 翻倍（$h$ 减半），截断误差减少约 4 倍（二阶收敛）。

**复合辛普森法则（Composite Simpson's Rule）**（$N$ 为偶数个子区间，$h = (b-a)/N$）：

将区间分成 $N/2$ 对相邻子区间，每对 $[x_{2k-2}, x_{2k}]$（宽度 $2h$）上应用一次 Simpson 法则：

$$S_N = \frac{h}{3}\big[f(a) + 4f(a+h) + 2f(a+2h) + 4f(a+3h) + \cdots + 4f(b-h) + f(b)\big]$$

系数模式：端点 $1$，内部奇数节点 $4$，内部偶数节点 $2$。

**复合辛普森法则的误差推导**：每对子区间宽度为 $2h$，其 Simpson 法则误差为 $-\dfrac{(2h)^5}{2880}f^{(4)}(\tilde \xi_k)$（注意这里 $(b-a)$ 替换为 $2h$）。对 $N/2$ 个块求和：

$$I - S_N = \sum_{k=1}^{N/2} \left(-\frac{(2h)^5}{2880}f^{(4)}(\tilde \xi_k)\right) = -\frac{32 h^5}{2880} \sum_{k=1}^{N/2} f^{(4)}(\tilde \xi_k)$$

由于 $32/2880 = 1/90$，且由中间值定理（$f^{(4)}$ 连续），存在 $\xi \in (a, b)$ 使平均 $f^{(4)}$ 等于该处的值：

$$I - S_N = -\frac{h^5}{90} \cdot \frac{N}{2} \cdot f^{(4)}(\xi) = -\frac{N h^5}{180} f^{(4)}(\xi) = -\frac{(b-a)}{180}h^4 f^{(4)}(\xi)$$

因此：

$$\boxed{I - S_N = -\frac{(b-a)}{180}h^4 f^{(4)}(\xi) = O(h^4) = O(N^{-4}), \quad \xi \in (a, b)}$$

随着 $N$ 翻倍（$h$ 减半），截断误差减少约 $2^4 = 16$ 倍（四阶收敛）——这就是复合 Simpson 在光滑函数上远比复合梯形高效的根本原因。

**开放性法则（Open Formulas）**：当函数在端点处不可求值（如端点奇异性）时，使用不包括端点的开放 Newton-Cotes 公式。中点法则（Midpoint Rule）是最简单的开放法则：

$$M_N = h \sum_{i=1}^{N} f\!\left(a + (i-\tfrac{1}{2})h\right), \quad h = \frac{b-a}{N}$$

## Romberg 积分（Romberg Integration）

### 动机：梯形法则 + Richardson 外推

Romberg 积分的核心思想已于 Lect_03 中预示：对复合梯形法则的结果进行 Richardson 外推，消去误差展开中的 $h^2, h^4, h^6, \ldots$ 项，从而以极低的额外计算代价获得极高精度的积分结果。

由 Euler-Maclaurin 公式，复合梯形法则 $T(h)$（其中 $h = (b-a)/N$）的误差展开为：

$$T(h) = I + c_2 h^2 + c_4 h^4 + c_6 h^6 + \cdots$$

**注意展开中不存在 $h$ 的奇次幂**——这是梯形法则独有的性质。因此 Richardson 外推中 $p_k = 2, 4, 6, \ldots$，且每次外推跳两级精度。

### 外推递推公式

取步长序列 $h_k = (b-a)/2^k$（即 $N = 1, 2, 4, 8, \ldots$）。第 $k$ 行、第 $0$ 列的元素是 $T(h_k)$：直接使用 $2^k$ 个子区间计算复合梯形法则。

$$R_{k,0} = T(h_k), \quad h_k = \frac{b-a}{2^k}$$

第 $m$ 次外推（$m \geq 1$）的递推公式（与 Lect_03 中的 Richardson 外推一致，此处 $p_m = 2m$）：

$$R_{k,m} = \frac{4^m R_{k-1,m-1} - R_{k,m-1}}{4^m - 1}$$

### 构造 Romberg 表格

```
 k    N=2^k    R_{k,0}          R_{k,1}            R_{k,2}            R_{k,3}
───────────────────────────────────────────────────────────────────────────────
 0     1      T(h_0)
                            (4T(h_1)-T(h_0))/3
 1     2      T(h_1)                             (16R_{1,1}-R_{0,1})/15
                            (4T(h_2)-T(h_1))/3                           (64R_{2,2}-R_{1,2})/63
 2     4      T(h_2)                             (16R_{2,1}-R_{1,1})/15
                            (4T(h_3)-T(h_2))/3
 3     8      T(h_3)
```

### 递推中的计算效率

计算 $T(h_{k+1})$ 时不需要从头算起——可以利用 $T(h_k)$ 已经算出的函数值。新增的 $2^k$ 个节点恰好是上一轮所有子区间的中点，这一性质使 Romberg 积分的函数求值总次数与最细网格上的梯形法则相等，而精度却能达到远超级别。

具体地，若 $T(h_k)$ 用了 $2^k$ 个子区间，$T(h_{k+1})$ 需额外求 $f$ 在 $2^k$ 个中点处的值：

$$T(h_{k+1}) = \frac{1}{2}T(h_k) + h_{k+1} \sum_{j=1}^{2^k} f\!\left(a + (2j-1)h_{k+1}\right)$$

### 收敛判据

随着 $k$ 和 $m$ 的增大，外推表中最右下角的元素 $R_{k,k}$ 通常是当前最优估计。当 $|R_{k,k} - R_{k-1,k-1}|$ 小于预设的容差时停止。注意避免过度外推——当噪声（舍入误差积累）开始主导时，$R_{k,m}$ 的改善会停止或退化。

## 高斯求积（Gaussian Quadrature）

### 动机：放弃等距节点的限制

Newton-Cotes 公式固定了 $n+1$ 个等距节点，有 $n+1$ 个权重作为自由度，因此代数精度最多为 $n$（若 $n$ 为奇数，因对称性可到 $n+1$）。但如果我们允许节点位置也是可调的，则拥有 $2n+2$ 个自由度（$n+1$ 个节点坐标 $+$ $n+1$ 个权重），理论上可以精确积分到 $x^{2n+1}$ 次多项式——**精度翻倍**。

高斯求积正是实现了这个理论极限。

### 正交多项式与节点选择

在带权内积

$$\langle g, h \rangle_w = \int_a^b g(x)h(x) \, w(x) \, \mathrm{d}x$$

下定义一组正交多项式 $\{p_k(x)\}_{k=0}^\infty$，满足 $\langle p_i, p_j \rangle_w = 0$ 对 $i \neq j$。

**核心定理**：$n+1$ 点高斯求积公式的节点 $x_i$ 恰好是 $n+1$ 次正交多项式 $p_{n+1}(x)$ 的零点。这是因为若 $f(x)$ 是任意 $\leq 2n+1$ 次多项式，可写为 $f(x) = q(x)p_{n+1}(x) + r(x)$，其中 $q, r$ 的次数均 $\leq n$。积分中 $\int q p_{n+1} w \, \mathrm{d}x = 0$（正交性），只剩下 $\int r w \, \mathrm{d}x$——而 $n+1$ 个节点的插值型求积公式对任何 $\leq n$ 次多项式 $r$ 都是精确的。

**推导**：令节点为 $p_{n+1}(x)$ 的零点，任意 $\leq 2n+1$ 次多项式 $f$ 可写为：

$$f(x) = q(x)p_{n+1}(x) + r(x), \quad \deg q \leq n, \;\deg r \leq n$$

积分：

$$\int_a^b f(x)w(x)\,\mathrm{d}x = \int_a^b q(x)p_{n+1}(x)w(x)\,\mathrm{d}x + \int_a^b r(x)w(x)\,\mathrm{d}x$$

由于 $p_{n+1}$ 与所有 $\leq n$ 次多项式正交，第一项为零。对第二项，含 $n+1$ 个节点的插值型求积公式精确积分任何 $\leq n$ 次多项式（因为 Lagrange 插值在此情况下是精确的）。因此高斯求积对 $f$ 精确。

### 权重的计算

权重由积分 Lagrange 基函数得到：

$$w_i = \int_a^b L_i^{(n)}(x) \, w(x) \, \mathrm{d}x$$

其中 $L_i^{(n)}$ 是节点为 $\{x_i\}$ 时的 Lagrange 基函数。在数值上，可以用 Golub-Welsch 算法通过正交多项式三项递推的 Jacobi 矩阵的特征值/特征向量高效计算节点和权重——这是 NR 中 `gauleg()` 等方法的基础。

### 常用高斯求积族

| 族 | 区间 | 权函数 $w(x)$ | 正交多项式 |
|:---|:-----|:-------------|:----------|
| **Gauss-Legendre** | $[-1, 1]$ | $1$ | Legendre $P_n(x)$ |
| **Gauss-Chebyshev** | $[-1, 1]$ | $1/\sqrt{1-x^2}$ | Chebyshev $T_n(x)$ |
| **Gauss-Laguerre** | $[0, \infty)$ | $e^{-x}$ | Laguerre $L_n(x)$ |
| **Gauss-Hermite** | $(-\infty, \infty)$ | $e^{-x^2}$ | Hermite $H_n(x)$ |
| **Gauss-Jacobi** | $[-1, 1]$ | $(1-x)^\alpha(1+x)^\beta$ | Jacobi $P_n^{(\alpha,\beta)}(x)$ |

**Gauss-Legendre 求积**是最常用的有限区间高斯求积。区间 $[a, b]$ 上的积分通过线性变换映射到 $[-1, 1]$：

$$\int_a^b f(x)\,\mathrm{d}x = \frac{b-a}{2}\int_{-1}^1 f\!\left(\frac{b-a}{2}t + \frac{a+b}{2}\right)\mathrm{d}t \approx \frac{b-a}{2}\sum_{i=1}^n w_i f(x_i)$$

其中 $x_i$ 和 $w_i$ 是 Gauss-Legendre 的节点和权重（以 $[-1, 1]$ 为基准）。

$n = 2$ 的 Gauss-Legendre 节点和权重：

$$x_{1,2} = \pm \frac{1}{\sqrt{3}}, \quad w_{1,2} = 1$$

$n = 3$：

$$x_{1,3} = \pm\sqrt{\frac{3}{5}}, \quad x_2 = 0, \quad w_{1,3} = \frac{5}{9}, \;\; w_2 = \frac{8}{9}$$

### 误差估计

$n+1$ 点 Gauss-Legendre 求积的误差为：

$$I - I_n = \frac{2^{2n+3}[(n+1)!]^4}{(2n+3)[(2n+2)!]^3} f^{(2n+2)}(\xi)$$

在物理计算中常用的经验法则是：$n$ 点高斯求积通常与 $2n$ 个等距节点的 Newton-Cotes 复合公式精度相当（对于光滑函数）。例如，10 点 Gauss-Legendre 在大多数光滑函数上相当于几十到上百个子区间的 Simpson 法则，但函数求值次数极少——这在高维积分和函数求值昂贵的场景中极为关键。

### Gauss-Kronrod 求积：自带误差估计

纯高斯求积的一个实际缺陷是误差难以估计。**Gauss-Kronrod 求积**通过在高斯节点之间插入新节点（总数约 $2n+1$），构造两套求积规则——一套高精度（Gauss-Kronrod）、一套较低精度（原高斯）。两者之差给出误差估计，且无需额外的函数求值：Kronrod 规则复用了 Gauss 节点的函数值。NR 中的 `qag()` 等自适应积分例程即基于 Gauss-Kronrod 对。

## 反常积分与奇异性处理（Improper Integrals and Singularity Treatment）

### 问题的分类

反常积分（Improper Integral）出现在以下情形：
1. **区间无界**：$\displaystyle\int_a^\infty f(x)\,\mathrm{d}x$ 或 $\displaystyle\int_{-\infty}^\infty f(x)\,\mathrm{d}x$。
2. **被积函数在端点或内部有可积奇点**：如 $\displaystyle\int_0^1 \frac{\mathrm{d}x}{\sqrt{x}}$ 在 $x=0$ 处发散但积分收敛。
3. **两者兼具**。

将反常积分直接输入标准求积程序会导致灾难性的误差或无穷循环。处理策略分为三类：变量代换、奇性消除、和专用求积方法。

### 变量代换（Change of Variables）

**将无限区间映射到有限区间**。标准代换有：

$$t = \frac{x}{1+x} \;\Longleftrightarrow\; x = \frac{t}{1-t}, \quad \mathrm{d}x = \frac{\mathrm{d}t}{(1-t)^2}$$

$[0, \infty)$ 映射到 $[0, 1)$。若被积函数在变换后在 $t=1$ 附近光滑，则标准求积公式可直接使用。

另一个常用的双指数代换将 $(-\infty, \infty)$ 映射到 $[-1, 1]$：

$$x = \tanh\!\left(\frac{\pi}{2}\sinh t\right)$$

此类代换的关键性质是变换后的被积函数在端点处及其所有导数趋向于零——即端点奇异性被完全消除。

**代换 $\displaystyle x = \frac{1}{t}$** 将 $\int_0^a f(x)\,\mathrm{d}x$ 转化为 $\int_{1/a}^\infty f(1/t)/t^2 \,\mathrm{d}t$，有时可将一个难处理的无穷区间积分转化为有限区间上的积分（取决于 $f$ 在无穷远处的渐近行为）。

### 奇性消除（Subtraction of Singularity）

当 $f(x)$ 包含可积奇点时，将奇性部分分离出来。设

$$f(x) = \underbrace{g(x)}_{\text{有解析原函数的奇异部分}} + \underbrace{h(x)}_{\text{光滑部分}}$$

则

$$\int_a^b f(x)\,\mathrm{d}x = \int_a^b g(x)\,\mathrm{d}x + \int_a^b h(x)\,\mathrm{d}x$$

$g$ 的积分用解析法算出，$h$ 的积分用标准数值求积。例如：

$$\int_0^1 \frac{\cos x}{\sqrt{x}}\,\mathrm{d}x = \int_0^1 \frac{1}{\sqrt{x}}\,\mathrm{d}x + \int_0^1 \frac{\cos x - 1}{\sqrt{x}}\,\mathrm{d}x$$

其中第一个积分 $= 2$，第二个积分的被积函数在 $x=0$ 处光滑（分子 $\cos x - 1 \sim -x^2/2$，除以 $\sqrt{x}$ 后 $\sim -x^{3/2}/2$）且取值为 0。

### 基于权函数的高斯求积

最优雅的方案是让正交多项式的权函数 $w(x)$ **吸收**被积函数的奇异性。例如：

- 若被积函数有 $\sim 1/\sqrt{x}$ 型的端点奇异性，使用 **Gauss-Jacobi** 求积（$\alpha = -1/2, \beta = 0$）。
- 若积分区间为 $[0, \infty)$ 且被积函数含 $e^{-x}$ 衰减，使用 **Gauss-Laguerre** 求积。
- 若积分区间为 $(-\infty, \infty)$ 且被积函数含 $e^{-x^2}$ 衰减，使用 **Gauss-Hermite** 求积。

这是处理物理中常见反常积分的标准方案：量子力学中的 $\int_0^\infty e^{-r} r^n f(r)\,\mathrm{d}r$ → Gauss-Laguerre；统计物理中的 $\int_{-\infty}^\infty e^{-x^2} f(x)\,\mathrm{d}x$ → Gauss-Hermite。

### 端点发散的处理：中点开放公式

当函数在被积区间的端点处发散但可积（如 $\int_0^1 dx/\sqrt{x}$），开型 Newton-Cotes 公式（中点法则）天然绕开了端点，可以直接使用——不需要奇异减法。这就是开放公式最典型的应用场景。

### 双指数（tanh-sinh）求积法

**双指数变换（Double Exponential / tanh-sinh Quadrature）** 是处理端点奇异性的另一个强力选择。代换：

$$x = \tanh\!\left(\frac{\pi}{2}\sinh t\right)$$

其导数为：

$$\frac{\mathrm{d}x}{\mathrm{d}t} = \frac{\pi}{2} \cdot \frac{\cosh t}{\cosh^2(\frac{\pi}{2}\sinh t)}$$

当 $t \to \pm\infty$ 时，导数呈**双指数衰减**（$\sim \exp(-c e^{|t|})$），这意味着被积函数在变换后不仅在端点取零，其所有导数也都取零。因此梯形法则在变换后的变量上具有**指数收敛**（而非代数收敛 $O(N^{-p})$），即使被积函数在原始变量中有端点奇异性。这是计算物理中高精度积分的最有力工具之一。

## 多维数值积分（Multidimensional Integration）

### 问题的维度灾难

$d$ 维积分：

$$I = \int_{\Omega} f(\mathbf{x}) \, \mathrm{d}^d x$$

若用单变量求积公式的张量积（Product Rule），每维 $n$ 个节点需要 $N = n^d$ 个节点。$n=30, d=6$ 时 $N \approx 7.3 \times 10^8$——这在绝大多数场景中不可行。这就是数值积分中的**维度灾难（Curse of Dimensionality）**。

### 张量积法则（Tensor Product Rules）

当维度不高（$d \leq 3$ 或 $4$）且函数光滑时，直接使用一维高斯求积的张量积是最简单的方案：

$$\int_{a_d}^{b_d} \cdots \int_{a_1}^{b_1} f(x_1, \ldots, x_d) \,\mathrm{d}x_1 \cdots \mathrm{d}x_d \approx \sum_{i_1=1}^{n} \cdots \sum_{i_d=1}^{n} w_{i_1} \cdots w_{i_d} \, f(x_{i_1}, \ldots, x_{i_d})$$

其代价是指数增长，但实现简单，对于低维问题仍然有效。

### 稀疏网格（Sparse Grids / Smolyak 求积）

稀疏网格法通过保留张量积中最重要的项而丢弃对高精度贡献较小的项，将节点数降低到 $O(n \log^{d-1} n)$ 的量级。Smolyak 算法（1963）系统地构造此类网格。

核心思想：不是所有维度的同等精度都是必要的。将一维求积公式序列 $Q_1^{(1)}, Q_2^{(1)}, \ldots$（递增精度）张量化，只保留满足 $\sum_{j=1}^d i_j \leq q$ 的项（$q$ 为稀疏度参数）。结果是节点数远小于全张量积，而精度仅略低。

稀疏网格特别适合中等维数（$4 \leq d \leq 20$）且被积函数适度光滑的场景。

### Monte Carlo 积分（Monte Carlo Integration）

当维度很高（$d > 10$-$20$）或被积函数不够光滑时，确定性求积方法全部失效。Monte Carlo 积分是此时的标准选择。

基本形式：在积分区域 $\Omega$（体积 $V$）内均匀随机采样 $N$ 个点：

$$I \approx V \cdot \frac{1}{N} \sum_{i=1}^{N} f(\mathbf{x}_i)$$

由中心极限定理，误差的期望量级为：

$$\varepsilon \sim \frac{\sigma_f}{\sqrt{N}}$$

其中 $\sigma_f^2 = \langle f^2 \rangle - \langle f \rangle^2$ 是被积函数的方差。

**关键特性**：收敛速率 $O(1/\sqrt{N})$ 与维度 $d$ **无关**——这是 Monte Carlo 积分在多维空间中击败确定性方法的根本原因。在 $d=1$ 时，Monte Carlo 远不如 Simpson 或 Gauss；在 $d=100$ 时，任何确定性方法都无法运行，而 Monte Carlo 仍然 $\sim 1/\sqrt{N}$ 收敛。

**方差缩减技术（Variance Reduction）**：重要性采样（Importance Sampling）——在函数值大的区域多采样——可使有效 $\sigma_f$ 大幅下降。基本思想是找一个与被积函数 $f(\mathbf{x})$ 形状相似且易于从其中采样的概率密度 $p(\mathbf{x})$：

$$I = \int_\Omega \frac{f(\mathbf{x})}{p(\mathbf{x})} \, p(\mathbf{x}) \,\mathrm{d}^d x \approx \frac{1}{N} \sum_{i=1}^{N} \frac{f(\mathbf{x}_i)}{p(\mathbf{x}_i)}, \quad \mathbf{x}_i \sim p$$

若 $p(\mathbf{x}) \propto |f(\mathbf{x})|$，则 $\sigma \approx 0$——结果精确。当然，找到这样的 $p$ 和从中采样本身并非易事，这是 Metropolis-Hastings 算法等 MCMC 方法存在的价值（后续讲座会详细展开）。

## 数值积分方法的选取指南

| 问题特征 | 推荐方法 | 原因 |
|:---------|:--------|:-----|
| 低维光滑函数 | Romberg 积分或 Gauss-Legendre | 收敛极快、误差可控 |
| 低维、需要自适应 | 自适应 Simpson（NR `qsimp()`）或自适应 Gauss-Kronrod（`qag()`） | 根据函数局部复杂度自动细化 |
| 已知端点奇异性形状 | Gauss-Jacobi 或双指数（tanh-sinh）求积 | 权函数吸收奇异性 |
| 无穷区间含指数衰减 | Gauss-Laguerre / Gauss-Hermite | 权函数匹配渐近行为 |
| 无穷区间、衰减慢 | 变量代换 $t = x/(1+x)$ + 标准求积 | 化为有限区间 |
| $d = 2\sim4$ | 张量积 Gauss-Legendre | 实现简单、精度高 |
| $d = 4\sim20$ | 稀疏网格（Smolyak） | 缓解维度诅咒 |
| $d > 10\sim20$ | Monte Carlo / 重要性采样 | 收敛速率与维度无关 |
| 被积函数非光滑/不连续 | Monte Carlo | 确定型方法假设光滑性 |

## 各算法优缺点总结

### Newton-Cotes 法则（梯形法则、Simpson 法则）

**优点**：
- 公式极简单，等距节点易于在物理格点（均匀网格的模拟输出）上直接使用。
- Simpson 法则在仅使用三点（两个子区间）即达到 $O(h^4)$ 精度，函数求值效率极高。
- 复合法则（用 $N$ 个子区间）的误差系统性地随 $N^{-p}$ 减少——$p=2$（梯形）、$p=4$（Simpson）。
- 梯形法则的误差展开只含 $h$ 的偶次幂——为 Romberg 外推铺垫了数学基础。

**缺点**：
- **Runge 现象的后遗症**——高阶 Newton-Cotes 公式（$n \geq 8$）的权重出现负值，导致数值不稳定。因此不能通过无限增加阶数提高精度——必须使用复合低阶公式。
- **精度瓶颈在 $O(h^4)$**——即使使用复合 Simpson，要获得 12 位精度也需要 $N \sim O(10^3)$ 个子区间（对于光滑函数，Gauss 求积用不到 10 个节点可能就够了）。
- 等距节点对端点奇异性的处理很差——中点法则（开放公式）提供了一定程度的缓解，但不如专门的高斯族。
- 复合梯形法则/Simpson 法则对每个子区间固定了精度要求——自适应能力弱。函数在大部分区域平坦但局部尖峰时，均匀网格大量浪费采样。

### Romberg 积分（Romberg Integration）

**优点**：
- **Richardson 外推 + 梯形法则的完美结合**——$T(h)$ 的误差展开只有偶次幂，每次外推使得截断误差从 $O(h^2)$ 跳到 $O(h^4)$ 跳到 $O(h^6)$……以极少的增量函数求值换来巨大的精度提升。
- $T(h_{k+1})$ 的增量计算——新增的 $2^k$ 个节点恰好是前一轮每个子区间的中点，函数值复用率极高。
- 自带收敛判别——外推表的右下角相邻元素的差值即误差估计。
- 算法结构统一（与 Neville / Richardson 共享递推公式），实现后代码简短。

**缺点**：
- **要求函数光滑**（$C^{2m}$ 对于 $m$ 次外推）——若被积函数有间断或非光滑点，Euler-Maclaurin 展开失效，Romberg 的加速效应消失。
- 在等距节点上求值——若函数在区间内不均匀（部分区域需要细采样而其余平坦），Romberg 的全局等距不高效。
- 外推多次后舍入误差累积——$T(h_k)$ 本身含舍入误差，外推放大了差分中的噪声。双精度下超过 $m=5\sim6$ 次外推往往无益。

### 高斯求积（Gaussian Quadrature）

**优点**：
- **精度密度最高**——$n$ 个节点的代数精度达到 $2n-1$（Newton-Cotes 仅 $n-1$）。对光滑被积函数，10 个节点的 Gauss-Legendre 相当于复合 Simpson 数十到上百个子区间。
- 权函数吸收奇异性——Gauss-Laguerre ($e^{-x}$)、Gauss-Hermite ($e^{-x^2}$)、Gauss-Jacobi ($(1-x)^\alpha(1+x)^\beta$) 优雅地处理了物理中常见的反常积分。
- 所有节点在开区间内，权重始终为正——无 Runge 现象对应的数值不稳定。
- 有成熟的 Golub-Welsch 算法计算任意 $n$ 的节点和权重——不需要解非线性方程或查表。
- Gauss-Kronrod 扩展提供误差估计——Kronrod 节点复用所有 Gauss 节点的函数值，只需额外 $(n+1)$ 个新求值。

**缺点**：
- 节点位置不规则（正交多项式的零点）——若被积函数只在等距网格上已知（如实验数据），无法直接使用。需要先插值到 Gauss 节点。
- 增加节点数时，旧节点的函数值**不能复用**（Gauss 节点完全改变）——与 Newton-Cotes 复合方案形成对比。
- 在函数非光滑时精度优势丧失——高斯求积的高精度依赖于被积函数的高阶可导性。
- 不同权函数族对应不同区间和权——需要预判被积函数的渐近行为来选择正确的族。选择错误等于引入额外的权函数失真。

### 变量代换与奇异性处理

**优点**：
- tanh-sinh（双指数）求积在端点奇异性上具有**指数收敛**而非代数收敛——极为高效。
- 变量代换 $x = t/(1-t)$ 将 $[0,\infty)$ 化为 $[0,1]$，可直接使用 Gauss-Legendre 等标准求积。
- 奇性减法使数值求积只对光滑残差进行——数学上将最难的部分分离出来解析处理。

**缺点**：
- 代换后可能在新区间的端点处引入新的奇异性——需要检查 Jacobian 和行为。
- tanh-sinh 的代换对于振荡型被积函数（$\int_0^\infty \sin x / x \, \mathrm{d}x$）无效——需要专门的高频振荡积分技术（如 Levin 方法）。
- 选择正确的权函数族（Gauss-Laguerre vs Gauss-Hermite vs Jacobi）需要对被积函数的渐近行为有准确理解。

### 多维积分方法

**张量积求积（Tensor Product Gauss）**：
- **优点**：实现简单、在 $d \leq 3$ 且函数光滑的情况下极为高效。
- **缺点**：$N = n^d$ 的指数增长——维度灾难的经典示例。$d > 4$ 后不可行。

**稀疏网格（Smolyak）**：
- **优点**：将复杂度降至 $O(n \log^{d-1} n)$，在 $4 \leq d \leq 20$ 之间是确定型求积的最佳选择。
- **缺点**：需要光滑性；实现复杂度远高于张量积；权重可能变负（虽然量级可控）。

**Monte Carlo 积分**：
- **优点**：收敛速率 $O(1/\sqrt{N})$ 与维度完全无关——高维积分的破局者。不要求被积函数光滑。
- **缺点**：收敛极慢（$10^6$ 个样本仅 3 位有效数字）；误差本身是随机变量（带置信区间而非确定性界）；在低维上远不如确定型方法。

### 使用场景决策树

1. **一维光滑函数 + 固定精度** → Gauss-Legendre（10-20 节点通常足够）。
2. **一维光滑函数 + 需要自适应** → 自适应 Gauss-Kronrod（`qag()`）。
3. **一维 + 不需要光滑性 + 需要误差估计** → Romberg 积分（复合梯形 + 外推）。
4. **一维反常积分（$[0,\infty)$ 含 $e^{-x}$）** → Gauss-Laguerre。
5. **一维反常积分（$(-\infty,\infty)$ 含 $e^{-x^2}$）** → Gauss-Hermite。
6. **二维~四维光滑函数** → 张量积 Gauss-Legendre。
7. **五维~二十维光滑函数** → 稀疏网格（Smolyak）。
8. **高维（$d > 20$）或不光滑被积函数** → Monte Carlo + 重要性采样。
