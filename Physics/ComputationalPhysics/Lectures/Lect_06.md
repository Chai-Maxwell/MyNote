# 随机数生成与 Monte Carlo 方法

> **参考书目**：(1) NR §7; (2) CMP §8

## 伪随机数生成（Pseudo-Random Number Generation, PRNG）

计算机本质上是确定性的。产生"随机数"的方法是执行一个确定性的递推，但其序列在统计性质上仿若随机——这种序列称为**伪随机数（Pseudo-Random Numbers）**。一个好的 PRNG 需满足：长周期、序列中的高维均匀性、统计独立性（无长期关联）、以及计算效率。

### 线性同余生成器（Linear Congruential Generator, LCG）

最经典的 PRNG 递推形式：

$$x_{n+1} = (a x_n + c) \bmod m$$

其中 $a$ 为乘子（Multiplier），$c$ 为增量（Increment），$m$ 为模（Modulus）。初始种子 $x_0$ 称为**种子（Seed）**。

**参数选择的数学约束**：为获得最大周期 $m$，Hull-Dobell 定理给出充要条件：(1) $c$ 与 $m$ 互质；(2) 对 $m$ 的每个质因子 $p$，$a-1$ 被 $p$ 整除；(3) 若 $4 \mid m$，则 $4 \mid (a-1)$。

标准库中的 LCG（如 C `rand()`）通常取 $m = 2^{31}$，$a = 1103515245$，$c = 12345$。这个参数组合的周期为 $2^{31}$，对于物理模拟完全不够——$10^9$ 次采样后序列就循环了，对于现代 Monte Carlo 模拟轻而易举就消耗了全部周期。

**LCG 的高维关联缺陷（Marsaglia 效应）**：若将连续的 LCG 值组成 $d$ 维向量 $(x_n, x_{n+1}, \ldots, x_{n+d-1})$，这些点落在 $d$ 维空间中数量极少的超平面上——这是 LCG 的根本弱点。对于物理中的高维积分，这种超平面的规则性会产生系统偏差。

### 梅森旋转算法（Mersenne Twister, MT19937）

Mersenne Twister（松本真与西村拓士，1998）是现代 Monte Carlo 模拟的默认 PRNG。其名称来源于周期 $2^{19937}-1$（一个 Mersenne 质数）。核心递归基于**扭转广义反馈移位寄存器（Twisted GFSR）**。

基本思想：维护 $n$ 个 $w$ 位整数的状态数组（MT19937 中 $n = 624, w = 32$）。每一步从数组中取两个元素，通过线性递推生成新元素并将其混入数组。每 $n$ 步重新"调质（Tempering）"整个数组以确保等分布性质。

**MT19937 的关键性质**：
- 周期 $2^{19937}-1 \approx 4.3 \times 10^{6001}$——现实中永不会耗尽；
- 在 623 维空间中均匀分布（$k$-分布性质）；
- 通过了 Diehard 和 TestU01 等苛刻的随机性检验套件；
- 速度极快（每生成一个随机数只需少量位运算和数组索引）。

缺点：状态数组（约 2.5 KB）对于嵌入式系统偏大；不适合密码学用途（状态可逆推）。

### 随机数变换：从均匀分布到任意分布

PRNG 输出均匀分布 $U(0, 1)$，物理应用中需要各种非均匀分布的随机变量。标准变换方法有：

**逆变换法（Inverse Transform / Inversion Sampling）**：

若 $u \sim U(0, 1)$，且 $F(x) = \int_{-\infty}^x p(t)\,\mathrm{d}t$ 是目标分布的累积分布函数，则

$$x = F^{-1}(u)$$

服从分布 $p(x)$。这是因为 $P(X \leq x) = P(F^{-1}(U) \leq x) = P(U \leq F(x)) = F(x)$。

典型例子——指数分布 $p(x) = \lambda e^{-\lambda x}$（$x \geq 0$），$F(x) = 1 - e^{-\lambda x}$，$F^{-1}(u) = -\frac{1}{\lambda}\ln(1-u)$。

当 $F^{-1}$ 无解析表达式时（如高斯分布的累积函数），退而使用**拒绝采样法（Rejection Sampling / Acceptance-Rejection Method）**或 **Box-Muller 法**。

**Box-Muller 法**：从两个独立的均匀随机数 $u_1, u_2 \sim U(0, 1)$ 生成一对独立的标准高斯变量：

$$z_1 = \sqrt{-2\ln u_1}\,\cos(2\pi u_2), \quad z_2 = \sqrt{-2\ln u_1}\,\sin(2\pi u_2)$$

两者均服从 $N(0, 1)$。推导基于二维高斯分布的极坐标表示：$r^2 = z_1^2 + z_2^2 \sim \chi_2^2 \equiv \text{Exp}(1/2)$，$\theta \sim U(0, 2\pi)$。Box-Muller 是物理模拟中生成高斯分布随机数的标准方法。

## 准随机数（Quasi-Random Numbers / Low-Discrepancy Sequences）

### 动机：均匀性而非独立性

Monte Carlo 积分的误差 $\sim 1/\sqrt{N}$（见下文），这一收敛速率的根源是随机序列中点的聚散——有些区域采样过密，有些区域空缺。**准随机序列（Quasi-Random Sequences）** 放弃统计独立性，转而**最大化点的均匀分布**（最小化"空隙"）。由此将高维积分的收敛速率提升至 $\sim (\ln N)^d / N$——比 $1/\sqrt{N}$ 快得多。

衡量均匀性的量是**差异度（Discrepancy）**——经验分布与理想均匀分布之间的最大偏离。

### Halton 序列

Halton 序列通过将自然数以不同质数为基展开来构造 $d$ 维低差异序列。第 $i$ 维使用第 $i$ 个质数 $b$，将整数 $n$ 在基 $b$ 下展开后镜像反射到小数位：

$$n = \sum_{k=0}^{L} d_k b^k \quad\Longrightarrow\quad H_b(n) = \sum_{k=0}^{L} d_k b^{-k-1}$$

例如 $n = 6$，$b = 2$：$6 = 110_2$，则 $H_2(6) = 0.011_2 = 3/8$。

Halton 序列在高维（$d > 8$）时出现退化——不同维度（不同质数基）之间产生强相关性，失效为"非均匀"。此时需使用加扰（Scrambling）或换用 Sobol 序列。

### Sobol  序列

Sobol 序列（1967）在每个维度上使用基-2 的线性递推构造方向数，通过按位异或（XOR）生成序列。它在高维（$d$ 到数百维）上保持优异的均匀性，是金融数学和高能物理 Monte Carlo 积分中的标准准随机序列。

### 准随机数 vs 伪随机数

| | 伪随机 (PRNG) | 准随机 (Quasi-Random) |
|:---|:-------------|:--------------------|
| 目标 | 模拟真正的随机性 | 最大化均匀性、最小化差异度 |
| 收敛速率 | $O(1/\sqrt{N})$ | $O((\ln N)^d / N)$ |
| 误差估计 | 可用统计方法（方差） | 难以直接估计（通常用 Kozlov 或 randomized QMC） |
| 适用场景 | MCMC、随机模拟、物理过程采样 | 高维确定性积分 |
| 独立性 | 近似独立 | 不独立——点与点之间有结构 |

## Monte Carlo 积分（Monte Carlo Integration）

### 基本 Monte Carlo 积分

（已在 Lect_04 中简要提及，此处围绕随机数深入展开）

在 $d$ 维单位超立方体 $\Omega = [0, 1]^d$ 上：

$$I = \int_\Omega f(\mathbf{x})\,\mathrm{d}^d x \approx \frac{1}{N} \sum_{i=1}^{N} f(\mathbf{x}_i), \quad \mathbf{x}_i \sim U(\Omega)$$

此为"掷飞镖"求积。由中心极限定理，样本均值 $\bar{f}$ 的标准误差为

$$\varepsilon = \frac{\sigma_f}{\sqrt{N}}, \quad \sigma_f^2 = \frac{1}{N-1}\sum_{i=1}^{N} (f(\mathbf{x}_i) - \bar{f})^2$$

**关键观察**：误差 $\sim 1/\sqrt{N}$ 与维度 $d$ 无关——这是 Monte Carlo 突破维度诅咒的基础。当 $d$ 足够大（实践中 $d > 6\sim10$），Monte Carlo 收敛速率将优于任何确定性求积法则。

### 重要性采样（Importance Sampling）

若被积函数 $f$ 在 $\Omega$ 的某些子区域上贡献远超其余部分，均匀采样将浪费大量采样在函数值几乎为零的区域。重要性采样通过引入与被积函数幅值成比例的采样密度 $p(\mathbf{x})$ 来解决这个问题：

$$I = \int_\Omega \frac{f(\mathbf{x})}{p(\mathbf{x})} \, p(\mathbf{x})\,\mathrm{d}^d x \approx \frac{1}{N} \sum_{i=1}^{N} \frac{f(\mathbf{x}_i)}{p(\mathbf{x}_i)}, \quad \mathbf{x}_i \sim p(\mathbf{x})$$

理想的 $p(\mathbf{x}) \propto |f(\mathbf{x})|$ 可使有效方差趋近于零——但必须满足：(1) 能高效从 $p$ 中采样；(2) $f/p$ 有界。在 $p \propto |f|$ 时，$f/p$ 为常数，方差为零——但 $p$ 的归一化常数本身正是 $I$，形成循环。实践中选择一个在峰区与 $f$ 形状相似且易于采样的分布即可大幅降低方差。

### 分层采样（Stratified Sampling）

将积分域 $\Omega$ 划分为 $K$ 个不重叠的子域（层），每层独立采样。若层 $j$ 有 $N_j$ 个采样且 $\sum N_j = N$，最优分配是令 $N_j \propto \sigma_j$（层内标准差）——在波动大的层多采样。分层采样的误差不会大于同采样量的简单 Monte Carlo。

### 方差缩减方法（Variance Reduction Techniques）

除了重要性和分层，还有：

1. **控制变量法（Control Variates）**：找一个与 $f$ 相关且积分已知的函数 $g$，计算 $\int f = \int g + \int (f-g)$。$f-g$ 的方差应比 $f$ 小。
2. **对偶变量法（Antithetic Variates）**：对偶使用 $\mathbf{x}$ 和 $1-\mathbf{x}$，利用负相关抵消波动。
3. **Rao-Blackwellization**：在条件期望可用解析形式时，用条件期望代替直接采样。

### Buffon 投针实验（Buffon's Needle）——Monte Carlo 方法的历史起源

1777 年，法国博物学家 Comte de Buffon 提出了一个看似属于几何概率的问题：在一张画有间距为 $d$ 的平行线的地板上，随机投下一根长度为 $\ell$ 的针，针与线相交的概率是多少？这个问题的答案惊人地含有 $\pi$——意味着通过反复投针并统计相交频率，可以**实验性地估计 $\pi$**。这比 Metropolis 和 Ulam 的现代 Monte Carlo 早了 170 年，是 Monte Carlo 思想的历史性先声。

#### 问题设定与几何简化为对称域

设平行线沿 $x$ 方向、间距为 $d$。针的中心到最近一条线的距离为 $y$（$0 \leq y \leq d/2$——对称性允许只考虑最近的线）。针与平行线的夹角为 $\theta$（$0 \leq \theta \leq \pi/2$——由对称性，$\theta$ 和 $\pi - \theta$ 等价）。

随机投掷意味着 $(y, \theta)$ 在矩形 $[0, d/2] \times [0, \pi/2]$ 上**均匀分布**：

$$p(y, \theta) = \frac{2}{d} \cdot \frac{2}{\pi} = \frac{4}{\pi d}$$

针在垂直于平行线方向上的投影半长度为 $(\ell/2) \sin \theta$。针与线相交的几何条件是：

$$y \leq \frac{\ell}{2} \sin \theta$$

#### 短针情形（$\ell \leq d$）——经典解

当 $\ell \leq d$ 时，$(\ell/2)\sin \theta \leq d/2$ 对所有 $\theta$ 成立——针在任何角度下最多与一条线相交，不可能同时跨越多条线。

相交概率为 $p(y, \theta)$ 在满足 $y \leq (\ell/2)\sin\theta$ 的区域上的积分：

$$P_{\text{short}} = \int_0^{\pi/2} \int_0^{\frac{\ell}{2}\sin\theta} p(y, \theta)\,\mathrm{d}y\,\mathrm{d}\theta = \frac{4}{\pi d} \int_0^{\pi/2} \frac{\ell}{2}\sin\theta \,\mathrm{d}\theta$$

$$= \frac{2\ell}{\pi d} \int_0^{\pi/2} \sin\theta \,\mathrm{d}\theta = \frac{2\ell}{\pi d} \Big[-\cos\theta\Big]_0^{\pi/2} = \frac{2\ell}{\pi d} (0 - (-1)) = \frac{2\ell}{\pi d}$$

$$\boxed{P_{\text{short}} = \frac{2\ell}{\pi d}}$$

由此反解 $\pi$：

$$\pi = \frac{2\ell}{d \cdot P_{\text{short}}}$$

**Monte Carlo 估计**：投针 $N$ 次，统计相交次数 $N_{\text{cross}}$，则 $\hat P = N_{\text{cross}}/N$，$\hat\pi = 2\ell/(d \cdot \hat P)$。$\hat\pi$ 的标准误差为：

$$\sigma_{\hat\pi} = \frac{2\ell}{d} \cdot \frac{1}{\hat P^2} \cdot \sigma_{\hat P} = \frac{2\ell}{d} \cdot \frac{1}{\hat P^2} \cdot \sqrt{\frac{\hat P(1-\hat P)}{N}} \approx \hat\pi \sqrt{\frac{1-P}{NP}}$$

当 $\ell = d$ 时 $P = 2/\pi \approx 0.637$，$\sigma_{\hat\pi} \approx \hat\pi \sqrt{0.57/N}$。要达到 $\pi$ 的 3 位精度（$\sigma \approx 0.003$），需要 $N \approx 4 \times 10^5$ 次投针——Buffon 投针是和标准 Monte Carlo 一样 $\sim 1/\sqrt{N}$ 收敛的，效率不高但概念深远。

#### 长针情形（$\ell > d$）——扩展解

当 $\ell > d$ 时，$(\ell/2)\sin\theta$ 在 $\theta$ 较大时可以超过 $d/2$。令 $\theta_0$ 为 $(\ell/2)\sin\theta_0 = d/2$ 的临界角：

$$\sin\theta_0 = \frac{d}{\ell}, \quad \theta_0 = \arcsin\!\left(\frac{d}{\ell}\right) \in (0, \pi/2)$$

**物理含义**：当 $\theta \in [\theta_0, \pi/2]$ 时，针在垂直方向上的半投影 $\geq d/2$——无论针的中心落在 $[0, d/2]$ 内的何处，针必然至少与一条线相交。当 $\theta \in [0, \theta_0)$ 时，与短针情形相同，相交条件为 $y \leq (\ell/2)\sin\theta$。

相交概率拆为两段积分：

$$P_{\text{long}} = \underbrace{\int_0^{\theta_0} \int_0^{\frac{\ell}{2}\sin\theta} p(y,\theta)\,\mathrm{d}y\,\mathrm{d}\theta}_{(I)\; \text{小角度：部分相交}} + \underbrace{\int_{\theta_0}^{\pi/2} \int_0^{d/2} p(y,\theta)\,\mathrm{d}y\,\mathrm{d}\theta}_{(II)\; \text{大角度：必然相交}}$$

**段 I**（$\theta \in [0, \theta_0]$，$\sin\theta \leq d/\ell$，与短针相同结构）：

$$P_I = \frac{4}{\pi d} \int_0^{\theta_0} \frac{\ell}{2}\sin\theta \,\mathrm{d}\theta = \frac{2\ell}{\pi d} \Big[-\cos\theta\Big]_0^{\theta_0} = \frac{2\ell}{\pi d} (1 - \cos\theta_0)$$

利用 $\cos\theta_0 = \sqrt{1 - \sin^2\theta_0} = \sqrt{1 - (d/\ell)^2}$：

$$P_I = \frac{2\ell}{\pi d}\left(1 - \sqrt{1 - \frac{d^2}{\ell^2}}\right)$$

**段 II**（$\theta \in [\theta_0, \pi/2]$，$y$ 的上限被 $d/2$ 截断——针必然相交）：

$$P_{II} = \frac{4}{\pi d} \int_{\theta_0}^{\pi/2} \frac{d}{2}\,\mathrm{d}\theta = \frac{2}{\pi} \left(\frac{\pi}{2} - \theta_0\right) = 1 - \frac{2}{\pi}\arcsin\!\left(\frac{d}{\ell}\right)$$

**合并**：

$$\boxed{P_{\text{long}} = \frac{2\ell}{\pi d}\left(1 - \sqrt{1 - \frac{d^2}{\ell^2}}\right) + 1 - \frac{2}{\pi}\arcsin\!\left(\frac{d}{\ell}\right)}$$

#### 一致性检验

**极限 $1$：$\ell \to d^+$（从长针趋于短针边界）**

$\theta_0 = \arcsin(1) = \pi/2$，$\cos\theta_0 = 0$，$P_I = 2\ell/(\pi d) = 2/\pi$，$P_{II} = 1 - 2/\pi \cdot \pi/2 = 0$，$P = 2/\pi$——与短针公式在 $\ell = d$ 时的值一致。✓

**极限 $2$：$\ell \to \infty$（极长针）**

$\theta_0 \to 0$，$\cos\theta_0 \to 1$，$\sqrt{1-d^2/\ell^2} \to 1$，$P_I \to 0$，$P_{II} \to 1$，$P \to 1$——极长的针必然与线相交。✓

**极限 $3$：$d \to 0$（线无限密）**

当 $d/\ell \to 0$，即 $\theta_0 \to 0$，$\arcsin(d/\ell) \to d/\ell$，$\sqrt{1-d^2/\ell^2} \to 1 - d^2/(2\ell^2)$：

$$P_{\text{long}} \to \frac{2\ell}{\pi d}\left(\frac{d^2}{2\ell^2}\right) + 1 - \frac{2}{\pi}\cdot\frac{d}{\ell} = \frac{d}{\pi\ell} + 1 - \frac{2d}{\pi\ell} = 1 - \frac{d}{\pi\ell}$$

当 $d \to 0$ 时 $P \to 1$——线无限密时针必然相交。✓

#### 期望相交次数——短针与长针的统一公式

定义随机变量 $N$ 为一次投针中针与线的相交次数。对于短针，$N \in \{0, 1\}$。对于长针，$N$ 可以 $>1$。**期望相交次数**可以用线密度从 Poisson 过程的视角来推导——沿垂直方向每移动距离 $d$ 遇一条线，针在垂直方向上的投影长度为 $\ell\sin\theta$，因此期望相交次数为 $\ell\sin\theta/d$。对 $\theta$ 积分：

$$\mathbb{E}[N] = \frac{2}{\pi}\int_0^{\pi/2} \frac{\ell\sin\theta}{d}\,\mathrm{d}\theta = \frac{2\ell}{\pi d}\Big[-\cos\theta\Big]_0^{\pi/2} = \frac{2\ell}{\pi d}$$

$$\boxed{\mathbb{E}[N] = \frac{2\ell}{\pi d}, \quad \forall\; \ell, d > 0}$$

这个公式对短针和长针**统一成立**。对于短针（$\ell \leq d$），$N$ 只能是 $0$ 或 $1$，因此 $P_{\text{short}} = \mathbb{E}[N] = 2\ell/(\pi d)$——与前面的推导一致。对于长针（$\ell > d$），$P_{\text{long}} < \mathbb{E}[N]$ 因为存在多次相交的可能（$\mathbb{E}[N] = P(N=1) + 2P(N=2) + \cdots$）。

#### Buffon 投针的数值实现

```python
import numpy as np

def buffon_needle(N, ell, d=1.0):
    """Buffon's needle: estimate pi.
    N: number of throws
    ell: needle length
    d: line spacing (default 1.0)
    """
    # Generate random positions and angles
    y = np.random.uniform(0, d/2, N)      # distance to nearest line
    theta = np.random.uniform(0, np.pi/2, N)  # angle
    
    # Count crossings
    n_cross = np.sum(y <= (ell/2) * np.sin(theta))
    
    P_hat = n_cross / N
    if ell <= d:
        pi_hat = 2 * ell / (d * P_hat)
    else:
        # Use the long-needle formula to estimate pi
        # This requires solving the transcendental equation,
        # or more practically, use E[N] = 2*ell/(pi*d)
        pi_hat = 2 * ell / (d * P_hat)  # P_hat approximates E[N] for long needle
    return pi_hat, P_hat
```

注意对于长针，上述实现统计的是 $N_{\text{cross}}/N$——这是 $\mathbb{E}[N]$ 的估计、而非 $P(N \geq 1)$ 的估计（$N_{\text{cross}}$ 对多次相交针只计一次）。若使用 $P_{\text{long}}$ 公式则需要区分 $\theta < \theta_0$ 与 $\theta \geq \theta_0$ 的贡献。

#### Buffon 投针的物理含义

Buffon 问题表面上是一个几何概率题目，但在更深层次上，它是**几何概率 $\to$ Monte Carlo 积分 $\to$ 随机几何**这一思想链条的起点。在当代，类似的几何概率方法被用于：
- **立体学（Stereology）**：通过随机截面/投影估算三维微结构的几何参数。
- **积分几何（Integral Geometry）**：Crofton 公式将曲线的长度表达为与随机直线的平均相交次数——Buffon 投针的高维推广。
- **图像分析中的随机线采样**：Hough 变换中随机线上的累加在概念上与 Buffon 实验同源。

## 马尔可夫链（Markov Chains）

### 定义与基本性质

随机过程 $\{X_t\}_{t \geq 0}$ 若满足**马尔可夫性质（Markov Property）**，

$$P(X_{t+1} = j \mid X_t = i, \; X_{t-1} = i_{t-1}, \ldots, X_0 = i_0) = P(X_{t+1} = j \mid X_t = i)$$

即未来状态仅取决于当前状态、与历史无关，则称其为**马尔可夫链（Markov Chain）**。这个看似平凡的假设具有深远后果——链的长期行为完全由一步转移概率决定。

### 转移矩阵（Transition Matrix）

对有限状态空间 $\mathcal{S} = \{1, 2, \ldots, K\}$，定义转移矩阵 $\mathbf{P}$（$K \times K$）：

$$P_{ij} = P(X_{t+1} = j \mid X_t = i)$$

$\mathbf{P}$ 是**随机矩阵（Stochastic Matrix）**——每行和为 1（$\sum_j P_{ij} = 1$），所有元素非负。$n$ 步转移概率为 $\mathbf{P}^n$（Chapman-Kolmogorov 方程）。

### 平稳分布（Stationary Distribution）

若存在分布 $\boldsymbol{\pi} = (\pi_1, \ldots, \pi_K)$ 满足

$$\boldsymbol{\pi} = \boldsymbol{\pi} \mathbf{P}, \quad \sum_i \pi_i = 1, \;\; \pi_i \geq 0$$

则 $\boldsymbol{\pi}$ 为链的**平稳分布（Stationary Distribution）**。$\boldsymbol{\pi}$ 是 $\mathbf{P}$ 关于特征值 $1$ 的左特征向量。

若链满足**不可约（Irreducible，从任何状态可达任何其他状态）**和**非周期（Aperiodic，不存在状态的周期循环）**，则从任何初始分布出发，分布将收敛于唯一的平稳分布：

$$\lim_{n \to \infty} \pi^{(0)} \mathbf{P}^n = \boldsymbol{\pi}$$

### 细致平衡（Detailed Balance）

若分布 $\boldsymbol{\pi}$ 满足

$$\pi_i P_{ij} = \pi_j P_{ji}, \quad \forall i, j$$

则称 $\boldsymbol{\pi}$ 关于 $\mathbf{P}$ 满足**细致平衡（Detailed Balance）**。细致平衡是平稳性的**充分条件**（对两边关于 $j$ 求和得 $\pi_i = \sum_j \pi_j P_{ji}$ 即证），且比平稳条件更容易在构造算法时强制满足。Metropolis-Hastings 算法正是通过构造满足细致平衡的转移核来实现采样——这是 MCMC 的核心思想（本讲的后续扩展方向）。

## 随机行走（Random Walk）

### 简单随机行走（Simple Random Walk）

一维简单随机行走：从 $X_0 = 0$ 出发，每步以概率 $p$ 向右 $+1$、概率 $q = 1-p$ 向左 $-1$。$n$ 步后的位置

$$S_n = \sum_{k=1}^{n} Z_k, \quad Z_k \in \{+1, -1\}$$

若 $p = q = 1/2$，则**对称随机行走**：

$$\langle S_n \rangle = 0, \quad \langle S_n^2 \rangle = n$$

关键标度关系：$\sqrt{\langle S_n^2 \rangle} = \sqrt{n}$——位移的 RMS 不是 $\propto n$ 而是 $\propto \sqrt{n}$，这是扩散过程的标志。

### 扩散方程的联系

随机行走与扩散方程之间存在严密对应。在连续极限下（步长 $\Delta x \to 0$，时间步 $\Delta t \to 0$，保持 $D = (\Delta x)^2/(2\Delta t)$ 固定），随机行走的位置概率密度 $P(x, t)$ 满足扩散方程：

$$\frac{\partial P}{\partial t} = D \frac{\partial^2 P}{\partial x^2}$$

这一对应关系在物理中意义深远——从布朗运动到热传导、从 Fick 定律到 Black-Scholes 期权定价方程，随机行走 / Wiener 过程的数学结构是统一的。

### 首次通过问题（First Passage Problem）

首次通过问题关心随机行走首次到达某个边界的时间（或概率）。经典问题：一维对称随机行走从 $x=0$ 出发，两吸收壁在 $x = -a$ 和 $x = +b$。到达左壁（首次通过 $x=-a$）的概率可由鞅论或差分方程得到：

$$P(\text{左壁先于右壁}) = \frac{b}{a+b}$$

这源自随机行走作为鞅（Martingale）的性质。首次通过时间（First Passage Time）的分布具有重尾特征，均值为 $T_{\text{absorb}} = ab$（在对称行走下）。

### 自回避随机行走（Self-Avoiding Walk, SAW）

在聚合物物理和晶格模型中，行走不能重复访问已访问过的位置。自回避行走无简单解析解，采样 SAW 的构型空间本身就是 Monte Carlo 模拟的一个重要课题——通常使用链生长算法（如 Rosenbluth 算法）或基于 MCMC 的 Pivot 算法。

## Monte Carlo 模拟的工作流程

无论应用领域如何，一个 MC 模拟的基本结构如下：

1. **定义状态空间与目标分布**：物理系统中的构型（粒子的位置、自旋的取向等）和对应的 Boltzmann 权重 $p(\mathbf{x}) \propto e^{-E(\mathbf{x})/kT}$。
2. **初始化**：任意初始构型。
3. **提出新状态**：按照提议分布 $q(\mathbf{x}' \mid \mathbf{x})$ 生成候选新状态。
4. **接受 / 拒绝**：依 Metropolis 准则 $\alpha = \min(1, \frac{p(\mathbf{x}')}{p(\mathbf{x})} \frac{q(\mathbf{x} \mid \mathbf{x}')}{q(\mathbf{x}' \mid \mathbf{x})})$ 接受或拒绝。
5. **更新统计**：记录观测量。
6. **重复 3-5** 直到统计量收敛。
7. **分析**：计算均值、标准差，估算自相关时间（见下文）。

### 热化（Thermalization / Burn-in）

马尔可夫链从任意初始状态到达平衡分布需要一定步数——这些初始步称为**热化期（Thermalization / Burn-in Period）**。热化期的数据必须丢弃，不能纳入统计平均。如何判断热化已完成？——监视某些宏观量（能量、磁化强度等）的迹线，当迹线围绕稳定均值无漂移地波动时，可认为链已达到平衡。

### 自相关时间（Autocorrelation Time）

MCMC 样本不是独立的——连续样本之间存在相关性。定义时间滞后 $t$ 的自相关函数：

$$C(t) = \frac{\langle X_{s} X_{s+t} \rangle - \langle X \rangle^2}{\langle X^2 \rangle - \langle X \rangle^2}$$

对物理可观测量，$C(t)$ 通常以指数衰减：$C(t) \sim e^{-t/\tau}$。$\tau$ 即为**自相关时间（Autocorrelation Time）**。有效独立样本量不是 $N$ 而是 $N/(2\tau)$——这是误差估计中必须纳入的修正。

在临界点附近（如 Ising 模型在 $T \to T_c$），$\tau$ 发散（**临界慢化，Critical Slowing Down**）——算法效率急剧退化。此时需要集群算法（Swendsen-Wang、Wolff 等）来规避临界慢化。

## Monte Carlo 方法总览

| 方法 | 采样分布 | 用途 | 收敛速率 | 维数适用范围 |
|:-----|:--------|:-----|:--------|:----------|
| 简单 MC 积分 | 均匀 | 低维积分 | $1/\sqrt{N}$ | 高维（$d > 6$） |
| 重要性采样 | $p(\mathbf{x})$ 指定 | 有先验知识的积分 | 方差缩减 | 中~高维 |
| 准随机数 (QMC) | 低差异序列 | 光滑高维积分 | $\sim 1/N$（对数修正） | $d$ 到数百 |
| MCMC | 平稳分布 $\boldsymbol{\pi}$ | 采样复杂分布 | 问题相关 | 任意维度 |
| 随机行走模拟 | 转移概率 | 扩散、首达问题 | 样本路径 | 低维物理空间 |

## 各算法优缺点总结

### 线性同余生成器（LCG）

**优点**：
- 实现极其简洁——一行递推 $x_{n+1} = (a x_n + c) \bmod m$，状态存储仅需一个整数。
- 速度极快——每个随机数仅需一次乘法和一次加法（加取模），在低端嵌入式系统和历史遗留代码中仍广泛使用。
- 对于非关键应用（如随机洗牌、游戏、简单 Monte Carlo 示例），LCG 的统计质量通常"看起来够用"。

**缺点**：
- **周期短**——即使最优参数也只有 $m \approx 2^{31}$（约 $2.1 \times 10^9$）。现代物理模拟可能在数分钟内消耗这个量级的随机数，序列开始重复。
- **高维关联性灾难（Marsaglia 效应）**——连续 $d$ 个 LCG 输出组成的 $d$ 维向量落在极少的超平面上。对于物理中的 $d$ 维积分和格点模型，这意味着系统的非物理偏置。
- 低位比特的随机性远差于高位比特——$x_n \bmod 2^k$ 的周期仅为 $2^k$。**永远不要用 `rand() % N` 生成范围**——应该用高位的浮点除法。
- 未通过现代随机性检验（TestU01 的 BigCrush 套件）——在科学计算中对统计独立性的要求 LCG 无法满足。

### 梅森旋转（Mersenne Twister, MT19937）

**优点**：
- **天文周期**——$2^{19937}-1 \approx 4.3 \times 10^{6001}$，任何实际模拟都不可能耗尽。这是 MT 相对 LCG 最直观的升级。
- $k$-分布性质：在 623 维空间中均匀分布——没有 LCG 的超平面问题。对于高维积分是安全的。
- 通过了所有标准统计检验（Diehard、TestU01 BigCrush）——满足科学计算对伪随机数的要求。
- 速度很好——大部分时间仅需从状态数组读取和简单位运算。在许多语言中是默认 PRNG。

**缺点**：
- **状态数组大**（624 × 32 bits = 2.5 KB）——在多线程环境中每个线程维护一个 MT 实例会消耗可观内存。对比现代的 xoshiro / PCG 等小状态 PRNG，MT 在并行场景下不经济。
- **不适合密码学**——给定连续 624 个输出，攻击者可完全恢复内部状态并预测所有未来输出。在物理模拟中这通常不重要，但这是密码安全的硬性要求。
- 初始化（种子扩散）速度慢——从单个 32 位种子传播到 624 个状态元素需要完整的生成循环。对于需要频繁重新播种的模拟，开销不小。
- 现代替代方案（如 PCG、xoshiro256++）在质量和速度上已超越 MT 的同时保持更小的状态——但 MT19937 仍是最广泛部署的高质量 PRNG。

### Halton 序列与 Sobol 序列（准随机数）

**Halton 序列**：
- **优点**：构造简单（质数基镜像反射），概念优雅。在一到六维积分中比伪随机 Monte Carlo 收敛快得多（$\sim 1/N$ vs $1/\sqrt{N}$）。
- **缺点**：高维（$d > 8$）时使用大质数的维度之间产生严重退相关——序列不再看似均匀。需要加扰或换用 Sobol。

**Sobol 序列**：
- **优点**：在高维中保持极佳的均匀性——是金融数学和高能物理中高维 QMC 积分的标准选择。方向数的构造确保了多维投影的良好性质。
- **缺点**：构造方向数需要有限域上的本原多项式和初始化数表——实现远非平凡。加扰版本（如 Owen 加扰）虽提升稳健性，但进一步增加实现的复杂度和成本。

### 逆变换法与 Box-Muller 法

**逆变换法（Inverse Transform）**：
- **优点**：数学精确——若 $F^{-1}$ 可用，输出严格服从目标分布。每次生成只需一个均匀样本。
- **缺点**：$F^{-1}$ 对大多数常见分布（如高斯、Gamma、Beta）无解析表达式，需数值求 $F^{-1}$ 或用近似。

**Box-Muller 法**：
- **优点**：从两个均匀随机数精确生成一对标准高斯变量——数学精确（非近似）。对数 + 三角函数 + 开方——计算明确且不难。
- **缺点**：三角函数在早期机器上较慢（在 GPU 和现代 CPU 上已非问题）。对于极端尾部采样（如 $z > 8\sigma$），$\ln u$ 的精度限制使尾部不完全精确——在此区域通常改用 Ziggurat 算法。

### Monte Carlo 积分（基本、重要性、分层）

**基本 Monte Carlo 积分**：
- **优点**：不要求被积函数光滑，维度不变——是克服高维积分维度灾难的标准工具。实现简单到只需一个循环。
- **缺点**：**收敛慢**——$\varepsilon \sim 1/\sqrt{N}$。增加一位有效数字需要 100 倍的样本量。误差是概率性的——每次运行得到不同结果，需要报告置信区间。

**重要性采样**：
- **优点**：在 $p(\mathbf{x}) \propto |f(\mathbf{x})|$ 的极限下可将有效方差降至零。即使只是近似匹配 $f$ 的形状，方差缩减也可达到一个数量级或更多。
- **缺点**：需要设计并实现从 $p$ 中高效采样的方法——这通常比积分本身更困难。错误选择 $p$ 可能**增大**方差（若 $f/p$ 在某些区域非常大）。对于多峰函数，单个 $p$ 可能无法同时覆盖所有峰。

**分层采样**：
- **优点**：误差永不大于同采样量的简单 MC——这是确定性的改进。在低维和中等维度中效率提升显著。
- **缺点**：高维中分层随维数指数增长（要分层 $d$ 维每维 $k$ 层 → $k^d$ 个层）。仅对低维问题实用。

### 马尔可夫链（Markov Chain）

**优点**：
- **仅需要转移核的相对概率**——不需要归一化常数。在统计物理中（$Z$ = 配分函数通常无法直接计算），这是不可替代的优势。
- 收敛于平稳分布（不可约 + 非周期条件下）——理论保证充分长时间后采样分布接近目标。
- 可对极端复杂的空间采样——高维、多峰、带约束的空间，直接采样不可能。

**缺点**：
- **样本相关**——连续采样量之间有关联，有效样本量 $N_{\text{eff}} = N/(2\tau) < N$。误差估计需要自相关时间修正，而 $\tau$ 本身也是被估计的量。
- 热化期（Burn-in）必须丢弃——热化长度未知，需要人工判读迹线。
- **临界慢化**——在相变点附近 $\tau$ 发散，MCMC 实际上停滞。需要专门算法（集群算法等）。
- **永不绝对确定已收敛**——可在伪收敛状态停留极长时间后突然跳入另一模态（多峰分布）。仅凭迹线观察不足以确认链已探索整个分布。

### 随机行走（Random Walk）

**优点**：
- 扩散过程的自然模型——具有直接的物理直觉。
- 标度关系（如 RMS $\sim \sqrt{n}$）提供了可检验的理论预测。
- 容易推广到各类约束（自回避、有偏、多维、不同边界条件）。

**缺点**：
- **收敛到扩散极限的速度慢**——$\sqrt{n}$ 的涨落意味着需要大量步长来获得统计量。
- 自回避行走（SAW）的采样极为困难——传统的链生长算法受到回缩（Attrition）问题困扰（链死胡同的概率随长度指数增加）。
- 首次通过时间的重尾分布——均值为 $ab$ 但方差远大于均值，MC 估计难以稳定。

### 使用场景决策树

1. **低维光滑积分** → 不要用 Monte Carlo，用 Romberg 或 Gauss-Legendre。
2. **高维积分（$d > 6$）+ 有先验知识** → 重要性采样。
3. **高维积分 + 无可用的 $p(\mathbf{x})$** → 基本 Monte Carlo（承担 $1/\sqrt{N}$）。
4. **极致精度的高维积分 + 光滑函数** → 准随机（Sobol 序列）。
5. **从复杂分布中采样（归一化常数未知）** → MCMC（Metropolis-Hastings 或 Gibbs）。
6. **扩散/随机过程模拟** → 随机行走。
