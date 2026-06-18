# 最小二乘拟合与最大似然方法

> **参考书目**：(1) NR §15; (2) CMP §6; (3) Cowan, *Statistical Data Analysis* §4–§6

## 问题的数学表述

（本讲是 Lect_05 的深化——Lect_05 覆盖了拟合的全貌，此处聚焦 LSF 与 MLM 两种核心方法论，并展开正态分布和 Poisson 分布下的具体推导。）

给定 $m$ 个独立测量值 $(x_i, y_i)$（$i = 1, \ldots, m$），其中 $y_i$ 的测量误差由概率密度 $p(y_i \mid \lambda_i)$ 描述，$\lambda_i = f(x_i; \mathbf{a})$ 是模型预测。**中心问题**：在给定的统计模型下，找到最佳参数 $\mathbf{a} = (a_1, \ldots, a_n)$ 并量化其不确定度。

LSF 和 MLM 分别从两个角度——代数（最小化残差）和概率（最大化似然）——回答这个问题。它们在特定条件下等价，但适用范围和前提假设有本质不同。

## 最小二乘拟合（Least Squares Fitting, LSF）

### 从残差最小化到正规方程

最小二乘的出发点不涉及任何概率假设：我们仅仅认为，一组"好"的参数应使模型预测与数据之间的加权差方和最小：

$$\chi^2(\mathbf{a}) = \sum_{i=1}^{m} w_i \big(y_i - f(x_i; \mathbf{a})\big)^2, \quad w_i = \frac{1}{\sigma_i^2}$$

其中 $\sigma_i$ 是第 $i$ 个数据点的测量不确定度。**注意**：$\sigma_i$ 在此阶段是一个"凭经验指定的权重因子"——它是否来自真实的测量误差分布并不影响 LSF 的代数推导（但会影响结果的统计解释）。

对线性模型 $f(x; \mathbf{a}) = \sum_{j=1}^{n} a_j \phi_j(x)$，定义设计矩阵 $\mathbf{A}$（$m \times n$）：$A_{ij} = \phi_j(x_i)$。$\chi^2$ 写成矩阵形式：

$$\chi^2(\mathbf{a}) = (\mathbf{y} - \mathbf{A}\mathbf{a})^T \mathbf{W} (\mathbf{y} - \mathbf{A}\mathbf{a})$$

其中 $\mathbf{W} = \operatorname{diag}(w_1, \ldots, w_m)$。对 $\mathbf{a}$ 求梯度并设为零：

$$\nabla_{\mathbf{a}} \chi^2 = -2\mathbf{A}^T\mathbf{W}(\mathbf{y} - \mathbf{A}\mathbf{a}) = 0$$

$$\mathbf{A}^T\mathbf{W}\mathbf{A}\,\mathbf{a} = \mathbf{A}^T\mathbf{W}\mathbf{y}$$

这是**加权正规方程（Weighted Normal Equations）**。$n \times n$ 矩阵 $\mathbf{H} = \mathbf{A}^T\mathbf{W}\mathbf{A}$ 是正定的（若 $\mathbf{A}$ 列满秩）。解为：

$$\boxed{\mathbf{a} = (\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}\mathbf{A}^T\mathbf{W}\mathbf{y}}$$

$\mathbf{A}^\dagger = (\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}\mathbf{A}^T\mathbf{W}$ 是 $\mathbf{A}$ 在 $\mathbf{W}$ 度量下的**广义逆（Generalized / Weighted Pseudoinverse）**。

### 参数协方差——从误差传播推导

若数据 $\mathbf{y}$ 有协方差矩阵 $\mathbf{V}_y = \mathbf{W}^{-1} = \operatorname{diag}(\sigma_1^2, \ldots, \sigma_m^2)$（数据点独立），参数 $\mathbf{a} = \mathbf{A}^\dagger \mathbf{y}$ 作为线性变换的输出，其协方差由误差传播公式给出：

$$\mathbf{V}_a = \mathbf{A}^\dagger \mathbf{V}_y (\mathbf{A}^\dagger)^T = (\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}\mathbf{A}^T\mathbf{W} \cdot \mathbf{W}^{-1} \cdot \mathbf{W}\mathbf{A}(\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}$$

中间 $\mathbf{A}^T\mathbf{W} \cdot \mathbf{W}^{-1} \cdot \mathbf{W}\mathbf{A}$ 三项化简为 $\mathbf{A}^T\mathbf{W}\mathbf{A}$（因为 $\mathbf{W}\mathbf{W}^{-1}\mathbf{W} = \mathbf{W}$），因此：

$$\boxed{\mathbf{V}_a = (\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}}$$

参数 $a_j$ 的标准误差为 $\sigma_{a_j} = \sqrt{(\mathbf{V}_a)_{jj}}$，参数 $a_j$ 与 $a_k$ 的相关系数为：

$$\rho_{jk} = \frac{(\mathbf{V}_a)_{jk}}{\sqrt{(\mathbf{V}_a)_{jj}(\mathbf{V}_a)_{kk}}}$$

当 $\rho_{jk} \to \pm 1$ 时，两个参数实质上冗余——这是模型简化的信号。

### Gauss-Markov 定理（Gauss-Markov Theorem）

在以下三个条件下：(1) 数据独立，(2) 模型关于参数线性，(3) 误差具有相同的有限方差——LSF 估计在所有线性无偏估计中具有**最小方差**（BLUE: Best Linear Unbiased Estimator）。注意这一结论不要求误差服从高斯分布——它只是最优的**线性**无偏估计。若误差确实是高斯的，则 LSF 在**所有**无偏估计中（包括非线性的）具有最小方差。

## 最大似然方法（Maximum Likelihood Method, MLM）

### 似然函数的构造

与 LSF 的代数出发点不同，MLM 从**数据生成机制的概率模型**出发。设测量值 $y_i$ 服从参数为 $\lambda_i = f(x_i; \mathbf{a})$ 的概率密度（或概率质量函数）$p(y_i \mid \lambda_i)$。由于各次测量独立，联合概率为乘积：

$$\mathcal{L}(\mathbf{a}) = \prod_{i=1}^{m} p(y_i \mid f(x_i; \mathbf{a}))$$

$\mathcal{L}(\mathbf{a})$ 即**似然函数（Likelihood Function）**——在给定数据下，$\mathcal{L}(\mathbf{a})$ 度量了参数 $\mathbf{a}$ 的"合理性"。MLM 的原则是选择使 $\mathcal{L}$ 最大化的 $\mathbf{a}$：

$$\hat{\mathbf{a}}_{\text{MLE}} = \arg\max_{\mathbf{a}} \mathcal{L}(\mathbf{a})$$

由于 $\ln$ 单调递增且乘积化为求和——数值上远更稳定——实际中一律最大化**对数似然（Log-Likelihood）**：

$$\ell(\mathbf{a}) = \ln \mathcal{L}(\mathbf{a}) = \sum_{i=1}^{m} \ln p(y_i \mid f(x_i; \mathbf{a}))$$

最大化问题等价于求解：

$$\frac{\partial \ell}{\partial a_j} = 0, \quad j = 1, \ldots, n$$

### 参数不确定度——Fisher 信息与 Cramér-Rao 下界

MLM 提供了一条系统性的路径来量化参数的不确定度——不需要像 LSF 那样依赖"权重 $\sigma_i$"的外部指定。**Fisher 信息矩阵（Fisher Information Matrix）** 定义为对数似然关于参数的曲率期望：

$$\mathcal{I}_{jk}(\mathbf{a}) = -\mathbb{E}\left[\frac{\partial^2 \ell}{\partial a_j \partial a_k}\right]$$

在适当的正则条件下，MLE 的渐近协方差为 Fisher 信息的逆：

$$\mathbf{V}_a^{\text{ML}} \approx \mathcal{I}^{-1}(\hat{\mathbf{a}})$$

更常用的是**观测的 Fisher 信息（Observed Fisher Information）**——直接在对数似然的最大值处计算 Hessian（不需要期望）：

$$\mathbf{V}_a^{\text{ML}} \approx \left(-\frac{\partial^2 \ell}{\partial a_j \partial a_k}\bigg|_{\hat{\mathbf{a}}}\right)^{-1}$$

**Cramér-Rao 下界**：任何无偏估计的方差不可能低于 Fisher 信息的逆——MLM 估计在大样本极限下达到这一理论下界（渐近有效）。

### MLM 的渐近性质

在大样本极限 $m \to \infty$ 下，MLE 具有三个核心性质：
1. **一致性（Consistency）**：$\hat{\mathbf{a}} \xrightarrow{p} \mathbf{a}_{\text{true}}$。
2. **渐近正态性（Asymptotic Normality）**：$\hat{\mathbf{a}} \sim N(\mathbf{a}_{\text{true}}, \mathcal{I}^{-1})$。
3. **渐近有效性（Asymptotic Efficiency）**：达到 Cramér-Rao 下界。

这三条保证了大样本下 MLM 是统计最优的拟合方法。小样本时（如 $m \sim 10$）这些渐近性质不成立，MLE 可能有显著偏差。

## MLM 实例一：正态（高斯）分布——与 LSF 的等价性

### 模型设定

假设 $y_i$ 独立地服从正态分布，均值为模型预测 $f(x_i; \mathbf{a})$，方差 $\sigma_i^2$ 已知（通常来自测量系统的标定）：

$$p(y_i \mid \mathbf{a}) = \frac{1}{\sqrt{2\pi\sigma_i^2}} \exp\!\left(-\frac{(y_i - f(x_i; \mathbf{a}))^2}{2\sigma_i^2}\right)$$

### 对数似然与 $\chi^2$ 的等价性

对数似然为：

$$\ell(\mathbf{a}) = \sum_{i=1}^{m} \left[-\frac{1}{2}\ln(2\pi\sigma_i^2) - \frac{(y_i - f(x_i; \mathbf{a}))^2}{2\sigma_i^2}\right]$$

第一项与 $\mathbf{a}$ 无关，因此最大化 $\ell(\mathbf{a})$ 等价于最小化：

$$\sum_{i=1}^{m} \frac{(y_i - f(x_i; \mathbf{a}))^2}{\sigma_i^2} = \chi^2(\mathbf{a})$$

$$\boxed{\text{正态误差} \; \Longrightarrow \; \hat{\mathbf{a}}_{\text{ML}} = \hat{\mathbf{a}}_{\text{LS}}}$$

不仅如此，由于 $\mathcal{I}_{jk} = \sum_i \frac{1}{\sigma_i^2}\frac{\partial f}{\partial a_j}\frac{\partial f}{\partial a_k} = (\mathbf{A}^T\mathbf{W}\mathbf{A})_{jk}$（对线性模型），MLM 的参数协方差也退化为 $(\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}$——与 LSF 的误差传播结果完全一致。

### $\chi^2$ 的统计分布与拟合优度

在正态假设下，$\chi^2_{\min}$ 统计量服从自由度为 $\nu = m - n$ 的卡方分布：

$$\chi^2_{\min} \sim \chi^2_\nu, \quad \langle \chi^2_{\min} \rangle = \nu = m - n, \quad \operatorname{Var}(\chi^2_{\min}) = 2\nu$$

这一定量预测允许对拟合质量做严格的假设检验——LSF 自身无法提供这类信息（因为它不假设误差分布）。约化卡方值 $\chi^2_\nu = \chi^2_{\min}/\nu$ 是评判拟合质量的第一道关口：

- $\chi^2_\nu \approx 1$：残差与 $\sigma_i$ 的量级一致——拟合良好。
- $\chi^2_\nu \gg 1$：数据波动超出了 $\sigma_i$ 的解释范围——模型欠拟合或 $\sigma_i$ 被低估。
- $\chi^2_\nu \ll 1$：$\sigma_i$ 可能被高估，或参数过多（过拟合）。

### 置信区间——从 $\Delta\chi^2$ 到参数误差

对于线性模型、正态误差，参数 $\mathbf{a}$ 的置信区域由 $\Delta\chi^2 = \chi^2(\mathbf{a}) - \chi^2_{\min}$ 的分布确定。单参数 $a_j$ 的 $1\sigma$（约 68.3%）置信区间由 $\Delta\chi^2 = 1$ 的等值线给出——这正是 $(\mathbf{V}_a)_{jj}$ 的平方根。

## MLM 实例二：Poisson 分布——计数物理实验的标准模型

### 为什么 Poisson 而非正态

在高能物理、天体物理、核物理等计数实验中，观测值是离散的事件数 $n_i$（而非连续量），且计数率可能极低（$\sim 1$ 个事件 / bin）。当每 bin 内期望计数 $\lambda_i < 10\sim20$ 时，正态近似严重失准——必须使用 Poisson 统计。

Poisson 分布描述固定时间/空间内独立随机事件的发生次数：

$$p(n_i \mid \lambda_i) = \frac{\lambda_i^{n_i} e^{-\lambda_i}}{n_i!}, \quad \lambda_i = f(x_i; \mathbf{a}) > 0$$

其中 $\lambda_i$ 是模型预测的期望计数，$n_i$ 是观测到的实际计数。Poisson 的核心特征是方差等于均值：$\mathbb{E}[n_i] = \operatorname{Var}(n_i) = \lambda_i$——"误差"不独立于信号，无法像正态假设那样预先指定固定的 $\sigma_i$。

### Poisson 对数似然

$$\ell(\mathbf{a}) = \sum_{i=1}^{m} \big[n_i \ln \lambda_i(\mathbf{a}) - \lambda_i(\mathbf{a}) - \ln(n_i!)\big]$$

最后一项 $\ln(n_i!)$ 与 $\mathbf{a}$ 无关，可省略。最大化 $\ell$ 等价于最小化 **Cash 统计量（Cash Statistic / C-statistic）**：

$$C(\mathbf{a}) = -2\ln\mathcal{L} = 2\sum_{i=1}^{m} \big[\lambda_i(\mathbf{a}) - n_i \ln \lambda_i(\mathbf{a})\big]$$

因子 $2$ 的引入使 $C$ 的渐近分布与 $\chi^2$ 一致（Wilks 定理——见下文）。当 $n_i$ 值较大（$\gtrsim 20$），Stirling 近似 $\ln(n!) \approx n\ln n - n$ 将 $C$ 退化为 $\chi^2$。

### Poisson MLM 中的正规方程

对参数 $a_j$ 求导：

$$\frac{\partial \ell}{\partial a_j} = \sum_{i=1}^{m} \left(\frac{n_i}{\lambda_i} - 1\right)\frac{\partial \lambda_i}{\partial a_j} = 0, \quad j = 1, \ldots, n$$

这组方程**对参数 $\mathbf{a}$ 是非线性的**（因为 $\lambda_i/\partial a_j$ 中出现 $\lambda_i$ 在分母），即使 $f(x; \mathbf{a})$ 关于 $\mathbf{a}$ 线性。因此 Poisson MLM 一般需要迭代求解——用 Gauss-Newton 或 Levenberg-Marquardt（Lect_05）来最小化 $C(\mathbf{a})$。

### Poisson MLM 的迭代解——Newton-Raphson 步骤

设 $\mathbf{a}^{(k)}$ 是第 $k$ 次迭代的参数。计算梯度 $\mathbf{g}$（$n \times 1$）和 Hessian $\mathbf{H}$（$n \times n$）：

$$g_j = \frac{\partial \ell}{\partial a_j} = \sum_i \frac{n_i - \lambda_i}{\lambda_i} \frac{\partial \lambda_i}{\partial a_j}$$

$$H_{jk} = \frac{\partial^2 \ell}{\partial a_j \partial a_k} = \sum_i \left[-\frac{n_i}{\lambda_i^2} \frac{\partial \lambda_i}{\partial a_j} \frac{\partial \lambda_i}{\partial a_k} + \frac{n_i - \lambda_i}{\lambda_i} \frac{\partial^2 \lambda_i}{\partial a_j \partial a_k}\right]$$

取 Hessian 的期望（Fisher 信息）来简化——$\mathbb{E}[n_i] = \lambda_i$，因此第二项的期望为零：

$$\mathcal{I}_{jk} \approx \sum_i \frac{1}{\lambda_i} \frac{\partial \lambda_i}{\partial a_j} \frac{\partial \lambda_i}{\partial a_k}$$

Newton-Raphson 迭代（使用 Fisher 信息而非完整 Hessian 即 Fisher Scoring）：

$$\mathbf{a}^{(k+1)} = \mathbf{a}^{(k)} + \mathcal{I}^{-1}(\mathbf{a}^{(k)}) \,\mathbf{g}(\mathbf{a}^{(k)})$$

### 置信区间——Wilks 定理

在 MLM 框架下，无论误差分布为何，**Wilks 定理**给出了似然比检验的渐近分布。以 Poisson 为例：定义

$$\Delta C = C(\mathbf{a}) - C(\hat{\mathbf{a}})$$

在 $\mathbf{a} = \mathbf{a}_{\text{true}}$ 的假设下，$\Delta C$ 渐近服从自由度为 $n$（感兴趣的参数个数）的 $\chi^2$ 分布。单参数的 $1\sigma$ 置信区间由 $\Delta C = 1$ 确定——这与正态假设下 $\Delta\chi^2 = 1$ 的形式相同，但来源于普适的似然比性质，不依赖正态假设。

### Poisson MLM 的物理应用场景

- **能谱拟合**：X 射线/$\gamma$ 射线探测器记录的每能量道计数服从 Poisson——这是 `XSPEC` 等天文光谱拟合软件的标准统计模型。
- **稀有事件搜索**：暗物质直接探测中的 WIMP 反冲谱每 bin 可能只有个位数事件——正态近似完全失效。
- **粒子产额分析**：对撞实验中某种末态的产额按运动学变量分 bin——bin 内容为整数计数，低统计区需要 Poisson 似然。
- **寿命测量**：指数衰减 $N(t) = N_0 e^{-t/\tau}$，每时间 bin 的事件数走 Poisson 似然拟合得到 $\tau$ 和 $\hat{N}_0$。

## LSF 与 MLM 的对比

| | 最小二乘 (LSF) | 最大似然 (MLM) |
|:--|:-------------|:-------------|
| 出发点 | 代数最小化（残差平方和） | 概率最大化（数据生成模型） |
| 需要的输入 | $y_i$, $\sigma_i$（人为指定权重） | $y_i$ + 完整的概率分布 $p(y \mid \lambda)$ |
| 正态误差假设 | 非必需（但统计解释依赖它） | 若假设正态则退化为 LSF |
| 小计数场景 | 失效（$\sigma_i \approx \sqrt{n_i}$ 假设不成立） | 正确（Poisson / Binomial 等） |
| 参数不确定度 | 误差传播公式 $(\mathbf{A}^T\mathbf{W}\mathbf{A})^{-1}$ | Fisher 信息矩阵的逆 |
| 拟合优度 | $\chi^2_\nu$（仅在正态假设下有意义） | 似然比检验（Wilks 定理，普适） |
| 非线性模型扩展 | Levenberg-Marquardt | Fisher Scoring / 通用数值优化 |
| 计算复杂度 | 低（线性情况一步到位） | 较高（需迭代，似然函数可能非凸） |
| 模型误指定的稳健性 | 对离群值敏感（$\ell_2$ 惩罚放大偏差） | 可通过选择分布控制尾部行为 |

### 推荐的使用策略

1. **大计数（每 bin $\gtrsim 30$）+ 正态误差合理** → LSF（简便、快速、一步到位）。
2. **低计数 / Poisson 数据 / 任何非正态误差** → Poisson MLM（或相应的似然）。
3. **误差分布不确定** → 做系统误差分析，比较 LSF 与不同 MLM 假设的结果差异。
4. **需要严格的统计推断（误差棒、置信区间、假设检验）** → 使用 MLM——其渐近性质为误差棒提供了坚实理论基础，而 LSF 的误差传播公式仅在正态假设和线性模型下才有严格的统计意义。
