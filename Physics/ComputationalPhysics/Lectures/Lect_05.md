# 数据拟合

> **参考书目**：(1) NR §14–§15; (2) CMP §6

## 拟合与插值的区别

插值（Lect_02）要求曲线严格通过每个数据点；拟合（Fitting）接受数据含有噪声，目标是找到一条曲线在一组参数化的模型中"最好地"描述数据的整体趋势。

给定 $m$ 个数据点 $(x_i, y_i)$（$i = 1, \ldots, m$），选择一个含 $n$ 个参数的模型 $y = f(x; \mathbf{a})$，其中 $\mathbf{a} = (a_1, \ldots, a_n)$。通常是**过定问题（Overdetermined）**：$m \gg n$，不存在同时满足所有 $m$ 个方程的精确解。目标变成定义"最佳"的度量，并在此意义下求解 $\mathbf{a}$。

## 最小二乘法（Least Squares）

### 线性最小二乘：正规方程

当模型关于参数是线性的，即

$$f(x; \mathbf{a}) = \sum_{j=1}^{n} a_j \, \phi_j(x)$$

其中 $\phi_j(x)$ 是固定的基函数（可以是 $x^{j-1}$、$\sin(jx)$ 等）。定义残差（Residual）：

$$r_i = y_i - f(x_i; \mathbf{a}) = y_i - \sum_{j=1}^{n} a_j \phi_j(x_i)$$

最小二乘准则：最小化残差的平方和：

$$\chi^2(\mathbf{a}) = \sum_{i=1}^{m} r_i^2 = \sum_{i=1}^{m} \left(y_i - \sum_{j=1}^{n} a_j \phi_j(x_i)\right)^2$$

推导正规方程（Normal Equations）：

$$\frac{\partial \chi^2}{\partial a_k} = -2 \sum_{i=1}^{m} \left(y_i - \sum_{j=1}^{n} a_j \phi_j(x_i)\right) \phi_k(x_i) = 0$$

整理得（$k = 1, \ldots, n$）：

$$\sum_{j=1}^{n} \left(\sum_{i=1}^{m} \phi_k(x_i) \phi_j(x_i)\right) a_j = \sum_{i=1}^{m} y_i \phi_k(x_i)$$

定义**设计矩阵（Design Matrix）** $\mathbf{A}$（$m \times n$）：

$$A_{ij} = \phi_j(x_i)$$

则正规方程写成矩阵形式：

$$(\mathbf{A}^T \mathbf{A}) \,\mathbf{a} = \mathbf{A}^T \mathbf{y}$$

$\mathbf{A}^T\mathbf{A}$ 是 $n \times n$ 的对称正定矩阵（当 $\mathbf{A}$ 列满秩时），称为**正规矩阵（Normal Matrix）**。解为：

$$\mathbf{a} = (\mathbf{A}^T\mathbf{A})^{-1} \mathbf{A}^T \mathbf{y}$$

$(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$ 称为 $\mathbf{A}$ 的**伪逆（Pseudoinverse / Moore-Penrose Inverse）**。

### 加权最小二乘（Weighted Least Squares）

当各数据点的测量误差 $\sigma_i$ 不同时，$\chi^2$ 的定义改为：

$$\chi^2(\mathbf{a}) = \sum_{i=1}^{m} \left(\frac{y_i - f(x_i; \mathbf{a})}{\sigma_i}\right)^2$$

引入权重 $w_i = 1/\sigma_i^2$ 和对角加权矩阵 $\mathbf{W} = \operatorname{diag}(w_1, \ldots, w_m)$，加权正规方程为：

$$(\mathbf{A}^T \mathbf{W} \mathbf{A}) \,\mathbf{a} = \mathbf{A}^T \mathbf{W} \mathbf{y}$$

### 参数的不确定度

在加权最小二乘中，参数 $\mathbf{a}$ 的协方差矩阵由（推导见下方最大似然部分）：

$$\operatorname{Cov}(\mathbf{a}) = (\mathbf{A}^T \mathbf{W} \mathbf{A})^{-1}$$

对角元 $\operatorname{Var}(a_j) = [(\mathbf{A}^T \mathbf{W} \mathbf{A})^{-1}]_{jj}$ 给出每个拟合参数的标准误差。

## 最大似然估计（Maximum Likelihood Estimation, MLE）

### 原理

最大似然估计从概率的角度理解拟合问题。假设数据 $(x_i, y_i)$ 由模型 $f(x; \mathbf{a})$ 加上随机噪声生成。噪声服从某个分布，参数 $\mathbf{a}$ 的最佳估计是使观测到当前数据的概率最大的那组值。

**似然函数（Likelihood Function）**：

$$\mathcal{L}(\mathbf{a}) = P(\text{data} \mid \mathbf{a}) = \prod_{i=1}^{m} p(y_i \mid x_i, \mathbf{a})$$

其中 $p(y_i \mid x_i, \mathbf{a})$ 是在给定 $\mathbf{a}$ 下 $y_i$ 的条件概率密度。最大化 $\mathcal{L}$ 等价于最大化对数似然（Log-Likelihood）：$\ell(\mathbf{a}) = \ln \mathcal{L}(\mathbf{a})$。

### MLE 与最小二乘的等价性

若噪声服从**独立同分布的高斯分布（Independent Identically Distributed Gaussian）**，均值为零、方差为 $\sigma_i^2$：

$$p(y_i \mid x_i, \mathbf{a}) = \frac{1}{\sqrt{2\pi\sigma_i^2}} \exp\!\left(-\frac{(y_i - f(x_i; \mathbf{a}))^2}{2\sigma_i^2}\right)$$

对数似然：

$$\ell(\mathbf{a}) = -\frac{m}{2}\ln(2\pi) - \sum_{i=1}^{m} \ln \sigma_i - \frac{1}{2} \sum_{i=1}^{m} \frac{(y_i - f(x_i; \mathbf{a}))^2}{\sigma_i^2}$$

最大化 $\ell(\mathbf{a})$ 等价于最小化第二项（前两项与 $\mathbf{a}$ 无关）——恰好是加权 $\chi^2$。

$$\boxed{\text{高斯噪声} \;\Longrightarrow\; \text{最大似然} \equiv \text{加权最小二乘}}$$

这桥接了统计学与数值分析——最小二乘不仅是"直观上合理"的代数准则，它在高斯噪声下是统计最优的（最小方差无偏估计，Gauss-Markov 定理）。

### 协方差矩阵的推导

$\mathbf{a}$ 的协方差矩阵来自对数似然的 Hessian（即 Fisher 信息矩阵的逆）：

$$\operatorname{Cov}(\mathbf{a}) = \left[-\nabla_{\mathbf{a}}^2 \ell(\mathbf{a})\right]^{-1}$$

对于线性高斯模型：

$$-\frac{\partial^2 \ell}{\partial a_j \partial a_k} = \sum_{i=1}^{m} \frac{1}{\sigma_i^2} \frac{\partial f(x_i)}{\partial a_j} \frac{\partial f(x_i)}{\partial a_k} = [\mathbf{A}^T \mathbf{W} \mathbf{A}]_{jk}$$

因此 $\operatorname{Cov}(\mathbf{a}) = (\mathbf{A}^T \mathbf{W} \mathbf{A})^{-1}$。

### 拟合优度（Goodness of Fit）

$\chi^2$ 值本身提供了拟合质量的全局检验。若模型正确、噪声为高斯分布，$\chi^2_{\min}$ 应服从自由度为 $\nu = m - n$ 的**卡方分布（Chi-Squared Distribution）**。期望值和方差为：

$$\langle \chi^2 \rangle = \nu = m - n, \quad \operatorname{Var}(\chi^2) = 2\nu$$

**约化卡方（Reduced Chi-Squared）**：

$$\chi^2_\nu = \frac{\chi^2}{\nu} = \frac{\chi^2}{m - n}$$

- $\chi^2_\nu \approx 1$：拟合良好——残差与测量误差的量级一致。
- $\chi^2_\nu \gg 1$：拟合不足（Underfitting）——模型不能充分描述数据；或误差 $\sigma_i$ 被低估。
- $\chi^2_\nu \ll 1$：过拟合（Overfitting）——模型参数太多；或误差 $\sigma_i$ 被高估。

## Hilbert 矩阵与基函数的选择

### 单项式基的病态性

当用自然基 $\phi_j(x) = x^{j-1}$ 拟合多项式 $f(x) = a_1 + a_2 x + \cdots + a_n x^{n-1}$ 时，正规矩阵的元素为：

$$(\mathbf{A}^T\mathbf{A})_{jk} = \sum_{i=1}^{m} x_i^{j+k-2}$$

若数据点密集分布在 $[0, 1]$ 上，$(\mathbf{A}^T\mathbf{A})_{jk} \approx \int_0^1 x^{j+k-2}\,\mathrm{d}x = \frac{1}{j+k-1}$。这正是**Hilbert 矩阵（Hilbert Matrix）** $\mathbf{H}$：

$$H_{jk} = \frac{1}{j+k-1}, \quad j,k = 1, 2, \ldots, n$$

Hilbert 矩阵是数值分析中最著名的病态矩阵之一。$n = 6$ 时条件数 $\kappa(\mathbf{H}) \approx 1.5 \times 10^7$；$n = 12$ 时已达 $\sim 10^{16}$——双精度下完全不可求逆。

**物理后果**：用 $n = 10$ 的单项式基拟合含 1% 噪声的数据，系数 $a_j$ 可能出现数百倍的误差。这就是为什么使用自然多项式基（幂基）作拟合是灾难性的。

### 正交多项式基——解药

将基函数换成在数据点上**离散正交**的函数族。对连续区间上的正交多项式（如 Legendre），连续的正交性近似保证了离散下的良好条件数。

构建在离散点 $\{x_i\}$ 上真正正交的基可通过**Gram-Schmidt 正交化（Gram-Schmidt Orthogonalization）**或直接使用**正交多项式（Orthogonal Polynomials）**：

$$\sum_{i=1}^{m} w_i \,\phi_j(x_i)\,\phi_k(x_i) = 0, \quad j \neq k$$

此时 $\mathbf{A}^T\mathbf{W}\mathbf{A}$ 退化为对角矩阵——条件数为 1，正则方程直接解为 $a_j = (\sum_i w_i y_i \phi_j(x_i)) / (\sum_i w_i \phi_j^2(x_i))$。不仅如此，各参数 $a_j$ 互相独立——增减拟合阶数不影响已确定低阶系数。

NR 中 `svdfit()` 通过对设计矩阵做 SVD（而非直接求解正规方程）来规避 Hilbert 矩阵问题。SVD 能容忍 $\mathbf{A}$ 的列接近共线时的秩亏——这在高阶多项式拟合中几乎是必然的。

### 设计理念总结

$$\boxed{\text{不要用 } \phi_j(x) = x^{j-1} \text{；应该用正交多项式或通过 SVD 求解}}$$

## 非线性最小二乘（Nonlinear Least Squares）

当模型 $f(x; \mathbf{a})$ 关于参数 $\mathbf{a}$ 非线性时，正规方程不再直接给出闭式解。此时需要迭代求解。

### Gauss-Newton 法

将 $f$ 在当前的参数估计 $\mathbf{a}$ 处线性化：

$$f(x_i; \mathbf{a} + \delta\mathbf{a}) \approx f(x_i; \mathbf{a}) + \sum_{j=1}^{n} \frac{\partial f(x_i; \mathbf{a})}{\partial a_j} \,\delta a_j = f(x_i; \mathbf{a}) + [\mathbf{J}\,\delta\mathbf{a}]_i$$

其中 $\mathbf{J}$ 是 $m \times n$ 的 **Jacobi 矩阵（Jacobian Matrix）**：

$$J_{ij} = \frac{\partial f(x_i; \mathbf{a})}{\partial a_j} = \frac{\partial r_i}{\partial a_j}$$

残差向量 $\mathbf{r}(\mathbf{a}) = \mathbf{y} - \mathbf{f}(\mathbf{a})$ 的线性近似：

$$\mathbf{r}(\mathbf{a} + \delta\mathbf{a}) \approx \mathbf{r}(\mathbf{a}) - \mathbf{J}\,\delta\mathbf{a}$$

将线性化后的残差代入 $\chi^2$ 并在 $\delta\mathbf{a}$ 上最小化：

$$\chi^2(\mathbf{a} + \delta\mathbf{a}) \approx \|\mathbf{W}^{1/2}(\mathbf{r} - \mathbf{J}\delta\mathbf{a})\|^2$$

这等价于线性最小二乘问题 $\mathbf{W}^{1/2}\mathbf{J}\,\delta\mathbf{a} \approx \mathbf{W}^{1/2}\mathbf{r}$，正规方程为：

$$(\mathbf{J}^T\mathbf{W}\mathbf{J})\,\delta\mathbf{a} = \mathbf{J}^T\mathbf{W}\,\mathbf{r}$$

迭代：$\mathbf{a}^{\text{new}} = \mathbf{a} + \delta\mathbf{a}$。

**Gauss-Newton 的优势与陷阱**：在接近极小值时（残差小），收敛是近二次的——无需计算 Hessian（二阶导数），只需 Jacobian。但当初始猜测远离极小值时：
- 线性近似可能极差，$\delta\mathbf{a}$ 过大导致越过极小值；
- $\mathbf{J}^T\mathbf{W}\mathbf{J}$ 可能近奇异（线性化后参数间的共线性被放大）。
- **不能保证 $\chi^2$ 在每步都下降**。

## Levenberg-Marquardt 方法（Levenberg-Marquardt Algorithm）

### 动机：在 Gauss-Newton 与梯度下降之间插值

LM 法是求解非线性最小二乘问题的黄金标准。它通过一个阻尼参数 $\lambda$ 将 Gauss-Newton 和梯度下降无缝结合：

$$(\mathbf{J}^T\mathbf{W}\mathbf{J} + \lambda \,\mathbf{D})\,\delta\mathbf{a} = \mathbf{J}^T\mathbf{W}\,\mathbf{r}$$

其中 $\mathbf{D}$ 是对角矩阵，通常取 $\mathbf{D} = \operatorname{diag}(\mathbf{J}^T\mathbf{W}\mathbf{J})$ 或 $\mathbf{D} = \mathbf{I}$。

### $\lambda$ 的两种极限

**$\lambda \to 0$**：方程退化为 Gauss-Newton，近极小值处二次收敛。

**$\lambda \to \infty$**：方程退化为 $\lambda \mathbf{D}\,\delta\mathbf{a} \approx \mathbf{J}^T\mathbf{W}\,\mathbf{r}$。注意 $\mathbf{J}^T\mathbf{W}\,\mathbf{r} = -\frac{1}{2}\nabla\chi^2$，因此：

$$\delta\mathbf{a} \approx -\frac{1}{\lambda} \mathbf{D}^{-1} \nabla\chi^2$$

这是沿负梯度方向、以 $\mathbf{D}^{-1}$ 为度量的一小步——**最速下降（Steepest Descent）**。虽然收敛速率只是线性的，但它几乎总能保证 $\chi^2$ 下降。

### 算法逻辑

LM 算法的自适应策略：

1. **初始**：选取适中的 $\lambda$（如 $\lambda = 10^{-3}$）。
2. **每一步迭代**：解 LM 方程得 $\delta\mathbf{a}$，计算 $\chi^2(\mathbf{a} + \delta\mathbf{a})$。
   - **若 $\chi^2$ 下降**：接受该步，**减小** $\lambda$（如 $\lambda \leftarrow \lambda / 10$）——向 Gauss-Newton 靠近。
   - **若 $\chi^2$ 上升**：拒绝该步，**增大** $\lambda$（如 $\lambda \leftarrow \lambda \times 10$）——向梯度下降靠近，缩短步长。
3. **停止条件**：当 $\chi^2$ 的变化小于预设容差或 $\|\delta\mathbf{a}\|$/$\|\nabla\chi^2\|$ 足够小时停止。

### 几何解释：信赖域（Trust Region）

LM 法等价于在每一步解**信赖域子问题（Trust-Region Subproblem）**：

$$\min_{\delta\mathbf{a}} \|\mathbf{W}^{1/2}(\mathbf{r} - \mathbf{J}\,\delta\mathbf{a})\|^2 \quad \text{s.t.} \quad \|\mathbf{D}^{1/2}\delta\mathbf{a}\| \leq \Delta$$

其中 $\Delta$ 是信赖域半径——线性模型的置信范围。Lagrange 乘子恰好是 $\lambda$：$\lambda$ 是信赖域约束的影子价格。当 $\lambda$ 大，信赖域小，步长保守（局部线性模型不可信）；当 $\lambda$ 小，信赖域大，步长进取（接近 Gauss-Newton 全步）。

### 曲率信息的自动获取

$\mathbf{J}^T\mathbf{W}\mathbf{J}$ 的对角元携带了参数空间的局部曲率信息。LM 中 $\mathbf{D} = \operatorname{diag}(\mathbf{J}^T\mathbf{W}\mathbf{J})$ 的优势在于：沿陡峭方向（对角元素大，曲率大），$\lambda\mathbf{D}$ 的阻尼效应强，步长被抑制；沿平坦方向（对角元素小），阻尼效应弱，步长被允许更大。这意味着 LM 在参数间尺度差异巨大时——物理拟合中极为常见——能自动调整各方向的有效步长。

## 含误差的拟合（Errors-in-Variables）

当 $x_i$ 和 $y_i$ 都有误差时，最小二乘残差 $\sum (y_i - f(x_i))^2$ 是不一致的（低估 $x$ 方向的不确定度）。正确的做法是最小化：

$$\chi^2(\mathbf{a}, \{\hat x_i\}) = \sum_{i=1}^{m} \left[\frac{(x_i - \hat x_i)^2}{\sigma_{x,i}^2} + \frac{(y_i - f(\hat x_i; \mathbf{a}))^2}{\sigma_{y,i}^2}\right]$$

其中 $\hat x_i$ 是"真实"横坐标，也作为待优化变量。问题规模增大——每点引入一个额外的 $\hat x_i$——但在高斯近似下仍可结构化求解。这种方法称为**正交距离回归（Orthogonal Distance Regression, ODR）**或**完全最小二乘（Total Least Squares, TLS）**。

## 拟合实践的要点总结

1. **永远不要用幂基**：使用正交多项式（Legendre / Chebyshev）或通过 SVD 求解。NR 的 `svdfit()` 是稳健的默认方案。

2. **线性问题检验残差**：拟合后检查残差是否呈随机分布（无系统趋势）。若残差呈现模式（如低频波动），则模型欠拟合——需要增加参数或更改模型。

3. **非线性问题使用 LM**：不要自己写梯度下降；LM 已实现了 Gauss-Newton 与梯度下降的自适应平衡。纯梯度下降在非线性最小二乘中几乎总是不可接受地慢。

4. **Jacobian 的计算**：若解析偏导不可得，用中心差分近似 $\partial f(x_i)/\partial a_j$。LM 对 Jacobian 的精度要求不如 Newton 法高——$10^{-4}$ 量级的差分步长通常足够。

5. **参数相关性与条件数**：拟合后检查协方差矩阵的非对角元。若两个参数的相关系数 $\rho_{jk} = \operatorname{Cov}(a_j, a_k)/\sqrt{\operatorname{Var}(a_j)\operatorname{Var}(a_k)}$ 接近 $\pm 1$，说明参数之间存在冗余——模型可简化。

6. **避免过度拟合**：$n$ 增加总是降低 $\chi^2$，但不一定提高模型的预测能力。使用信息准则（AIC / BIC）或交叉验证（Cross-Validation）来平衡拟合精度与模型复杂度。
