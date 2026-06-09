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

**误差分析**：通过 Euler-Maclaurin 求和公式可得，梯形法则的误差具有渐近展开：

$$\int_a^b f(x)\,\mathrm{d}x - T(h) = -\frac{h^2}{12}\big[f'(b) - f'(a)\big] + \frac{h^4}{720}\big[f'''(b) - f'''(a)\big] - \cdots$$

注意展开中**只出现 $h$ 的偶次幂**（$h^2, h^4, h^6, \ldots$）——这是梯形法则能通过 Romberg 外推高效提升精度的关键原因（与中心差分在 Taylor 展开中只含偶次幂的情形完全类似）。

对于单段梯形法则，也可以写成中值形式：

$$I - T = -\frac{(b-a)^3}{12} f''(\xi), \quad \xi \in (a,b)$$

### 辛普森法则（Simpson's Rule）

$n = 2$：三个等距节点 $x_0 = a, x_1 = (a+b)/2, x_2 = b$，用二次插值。

$$I \approx \frac{h}{3}\big[f(a) + 4f((a+b)/2) + f(b)\big], \quad h = \frac{b-a}{2}$$

权重比 $1:4:1$。尽管只用了二次多项式插值，Simpson 法则的误差分析表明它对**三次多项式也是精确的**（代数精度 $d=3$）——这是由对称性带来的"免费升级"：

$$I - S = -\frac{(b-a)^5}{2880} f^{(4)}(\xi) = -\frac{h^5}{90} f^{(4)}(\xi)$$

其中 $h = (b-a)/2$。

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

$$T_N = \frac{h}{2}\big[f(a) + 2f(a+h) + 2f(a+2h) + \cdots + 2f(b-h) + f(b)\big]$$

误差：$O(h^2) = O(N^{-2})$。

**复合辛普森法则（Composite Simpson's Rule）**（$N$ 为偶数个子区间）：

$$S_N = \frac{h}{3}\big[f(a) + 4f(a+h) + 2f(a+2h) + 4f(a+3h) + \cdots + 4f(b-h) + f(b)\big]$$

系数模式：$1, 4, 2, 4, 2, \ldots, 4, 1$。误差：$O(h^4) = O(N^{-4})$。

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
