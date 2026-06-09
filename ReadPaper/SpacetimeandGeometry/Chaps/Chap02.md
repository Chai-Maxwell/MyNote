# Chapter 2: Manifolds

## 2.1 Gravity as Geometry

### 等效原理

引力的特殊性来自其**普遍性**，这一物理原理导致了将引力视为弯曲流形几何的数学策略。

**弱等效原理（WEP）**：
- 牛顿力学中，第二定律 $F = m_i a$（$m_i$ 是惯性质量）
- 引力定律 $F_g = -m_g \nabla\Phi$（$m_g$ 是引力质量）
- WEP断言：$m_i = m_g$（已被Eötvös实验以极高精度验证）
- 直接推论：自由下落测试粒子的行为是普适的，与其质量/组成无关：$a = -\nabla\Phi$

**WEP的等价表述**：存在一类优先的轨迹——惯性（自由下落）轨迹，其上无加速粒子运动（"无加速"指"仅受引力"）。

**爱因斯坦等效原理（EEP）**：
在足够小的时空区域内，物理定律还原为狭义相对论；不可能通过局部实验检测引力场的存在。

- 引力红移是EEP的直接推论（不依赖于完整的GR）：
$$\frac{\Delta\lambda}{\lambda_0} = \frac{a_g z}{c^2} = \Delta\Phi$$

**强等效原理（SEP）**：将EEP推广到包括引力定律本身。违反SEP但不违反EEP的理论中，引力结合能对惯性质量和引力质量的贡献不相等。

### 从EEP到弯曲时空

- 不能构造全局惯性系——引力场的非均匀性导致"潮汐力"
- 只能定义**局部惯性系**——在足够小的区域内跟随自由下落粒子
- 不能讨论远处物体的相对速度——不同位置有不同的局部惯性系

**结论**：时空具有弯曲几何，引力是弯曲的表现。适当的数学结构是**微分流形**——局部看起来像平直空间但全局几何可能非常不同的集合。

## 2.2 What Is a Manifold?

### 直观概念

流形是可能弯曲且拓扑复杂但在**局部区域**看起来像 $\mathbb{R}^n$ 的空间。整个流形通过光滑地缝合这些局部区域来构造。

**关键点**：维度 $n$ 在所有patch中必须相同。

**例子**：
- $\mathbb{R}^n$ 本身
- $n$-球面 $S^n = \{x \in \mathbb{R}^{n+1} : \sum_i (x^i)^2 = 1\}$
- $n$-环面 $T^n$（$n$ 维立方体对面粘合）
- 黎曼曲面（$S^2$ 是 genus 0 的黎曼曲面）
- 李群流形（如 $SO(2) \cong S^1$）
- 两个流形的直积

**非流形的例子**：
- 终止于平面的线（连接点不局部像 $\mathbb{R}^n$）
- 在顶点相交的两个锥面
- 线段（含端点）——需推广为"带边流形"（附录D）

### 形式定义

**预备概念**：

- **映射** $\phi : M \to N$：对 $M$ 中每个元素分配 $N$ 中恰好一个元素
- **单射（injective）**：$N$ 中每个元素最多被映射到一次
- **满射（surjective）**：$N$ 中每个元素至少被映射到一次
- **双射（bijective）**：既是单射又是满射，此时存在逆映射 $\phi^{-1}$
- **$C^p$ 映射**：$p$ 阶导数存在且连续的函数；$C^\infty$ 称为**光滑**

**微分同胚**：存在 $C^\infty$ 映射 $\phi : M \to N$ 及其 $C^\infty$ 逆 $\phi^{-1} : N \to M$，则 $M$ 和 $N$ 是**微分同胚**的——作为流形"相同"的最佳概念。

**开球**：$\{x \in \mathbb{R}^n : |x - y| < r\}$（严格不等式）

**开集**：开球的任意（可能无限）并集。

**坐标卡（Chart）**：$(U, \phi)$，其中 $U \subset M$，$\phi : U \to \mathbb{R}^n$ 是一一映射，且 $\phi(U)$ 在 $\mathbb{R}^n$ 中是开集。

**$C^\infty$ 图册（Atlas）**：满足两个条件的坐标卡的指标化集合 $\{(U_\alpha, \phi_\alpha)\}$：

1. **覆盖**：$\bigcup_\alpha U_\alpha = M$
2. **光滑缝合**：若 $U_\alpha \cap U_\beta \neq \emptyset$，则转移映射 $\phi_\alpha \circ \phi_\beta^{-1} : \phi_\beta(U_\alpha \cap U_\beta) \to \phi_\alpha(U_\alpha \cap U_\beta)$ 在其定义域上是 $C^\infty$ 的

**$C^\infty$ $n$ 维流形**：集合 $M$ 连同**极大图册**（包含每个兼容坐标卡的图册）。

**重要性质**：
- 定义不依赖于嵌入更高维欧几里得空间（尽管Whitney嵌入定理保证任何 $n$ 维流形可嵌入 $\mathbb{R}^{2n}$）
- 大多数流形不能由单个坐标卡覆盖（如 $S^1$ 至少需要两个卡覆盖）

**球极投影（Stereographic projection）示例**：
对 $S^2 = \{(x^1,x^2,x^3) : (x^1)^2 + (x^2)^2 + (x^3)^2 = 1\}$：
$$\phi_1(x^1,x^2,x^3) = \left(\frac{2x^1}{1-x^3}, \frac{2x^2}{1-x^3}\right) \quad \text{（从北极投影）}$$
$$\phi_2(x^1,x^2,x^3) = \left(\frac{2x^1}{1+x^3}, \frac{2x^2}{1+x^3}\right) \quad \text{（从南极投影）}$$

重叠区域（$-1 < x^3 < +1$）的转移映射：
$$z^i = \frac{4y^i}{[(y^1)^2 + (y^2)^2]}$$

### 链式法则

对于映射 $f : \mathbb{R}^m \to \mathbb{R}^n$ 和 $g : \mathbb{R}^n \to \mathbb{R}^l$：
$$\frac{\partial}{\partial x^a}(g \circ f)^c = \sum_b \frac{\partial f^b}{\partial x^a}\frac{\partial g^c}{\partial y^b}$$

简写为：
$$\frac{\partial}{\partial x^a} = \frac{\partial y^b}{\partial x^a}\frac{\partial}{\partial y^b}$$

当 $m = n$，矩阵 $\partial y^b/\partial x^a$ 的行列式称为映射的**雅可比行列式**；雅可比行列式非零则映射可逆。

## 2.3 Vectors Again

### 方向导数方法

在流形上，切空间 $T_p$ 可通过曲线定义：

设 $\mathcal{F}$ 为 $M$ 上所有光滑函数的空间。过 $p$ 的每条曲线 $y : \mathbb{R} \to M$ 定义了 $\mathcal{F}$ 上的一个算子——**方向导数**：
$$\frac{d}{d\lambda} : f \mapsto \left.\frac{df}{d\lambda}\right|_p$$

**核心论断**：$T_p$ 可等同于过 $p$ 的曲线对应的方向导数算子的空间。

**第一步——方向导数构成向量空间**：
两个方向导数算子的线性组合仍满足莱布尼茨法则：
$$\left(a\frac{d}{d\lambda} + b\frac{d}{d\eta}\right)(fg) = \left(a\frac{df}{d\lambda} + b\frac{df}{d\eta}\right)g + \left(a\frac{dg}{d\lambda} + b\frac{dg}{d\eta}\right)f$$

**第二步——基**：
在坐标卡 $x^\mu$ 下，偏导数 $\{\partial_\mu\}$ 在 $p$ 处形成 $T_p$ 的一组基。

**证明**：考虑映射的复合：
$$f \circ y = (f \circ \phi^{-1}) \circ (\phi \circ y) : \mathbb{R} \to \mathbb{R}$$

运用链式法则：
$$\frac{d}{d\lambda}f = \frac{d}{d\lambda}(f \circ y) = \frac{d(\phi \circ y)^\mu}{d\lambda} \frac{\partial(f \circ \phi^{-1})}{\partial x^\mu} = \frac{dx^\mu}{d\lambda}\partial_\mu f$$

由于 $f$ 是任意的：
$$\frac{d}{d\lambda} = \frac{dx^\mu}{d\lambda}\partial_\mu$$

因此 $\{\partial_\mu\}$ 确实构成基，切空间是 $n$ 维的。

### 坐标基

$\hat{e}_{(\mu)} = \partial_\mu$ 称为**坐标基**——与坐标轴对齐的基向量。这是形式化"基向量沿坐标轴方向"的方式。

- 坐标基向量通常不是归一化的，也不正交
- 在弯曲流形上，坐标基在曲率非零的任何点的邻域内**永远不可能**处处正交归一
- 可以定义非坐标正交归一基，但坐标基最简单自然

### 向量变换律

基向量在新坐标系 $x^{\mu'}$ 下的变换（通过链式法则）：
$$\partial_{\mu'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\partial_\mu$$

向量分量变换（要求 $V = V^\mu\partial_\mu$ 不变）：
$$V^{\mu'} = \frac{\partial x^{\mu'}}{\partial x^\mu}V^\mu$$

**证明**：$V^\mu\partial_\mu = V^{\mu'}\partial_{\mu'} = V^{\mu'}\frac{\partial x^\mu}{\partial x^{\mu'}}\partial_\mu$，因此系数必须相等。由于 $\frac{\partial x^{\mu'}}{\partial x^\mu}$ 是 $\frac{\partial x^\mu}{\partial x^{\mu'}}$ 的逆，得到所需表达式。

这与 SR 中的洛伦兹变换 $V^{\mu'} = \Lambda^{\mu'}_{\ \nu}V^\nu$ 一致（洛伦兹变换是 $x^{\mu'} = \Lambda^{\mu'}_{\ \nu}x^\nu$ 的特殊坐标变换），但更一般——适用于任意坐标变换。

### 矢量场的对易子

两个矢量场 $X$ 和 $Y$ 的**对易子** $[X,Y]$ 定义为：
$$[X,Y](f) = X(Y(f)) - Y(X(f))$$

对易子本身是矢量场，它的分量：
$$[X,Y]^\mu = X^\lambda\partial_\lambda Y^\mu - Y^\lambda\partial_\lambda X^\mu$$

**证明**：$[X,Y]$ 的线性性和莱布尼茨性质可直接验证：
$$[X,Y](af+bg) = a[X,Y](f) + b[X,Y](g)$$
$$[X,Y](fg) = f[X,Y](g) + g[X,Y](f)$$

分量表达式通过展开 $X(Y(f)) - Y(X(f))$ 并利用 $X = X^\mu\partial_\mu$, $Y = Y^\mu\partial_\mu$ 得到。

**重要性质**：
- 对易子是良好定义的张量——坐标变换时偏导数的非张量部分相互抵消
- 坐标基向量的对易子为零：$[\partial_\mu, \partial_\nu] = 0$（偏导对易）
- 对易子是李导数的特例（附录B）

## 2.4 Tensors Again

### 对偶向量（余切空间）

$T_p^*$ 可视为线性映射 $\omega : T_p \to \mathbb{R}$ 的空间。

**经典例子**：函数 $f$ 的梯度 $df$：
$$df\left(\frac{d}{d\lambda}\right) = \frac{df}{d\lambda}$$

**自然基**：坐标函数 $x^\mu$ 的梯度 $\{dx^\mu\}$ 构成 $T_p^*$ 的基：
$$dx^\mu(\partial_\nu) = \frac{\partial x^\mu}{\partial x^\nu} = \delta^\mu_\nu$$

任意对偶向量：$\omega = \omega_\mu dx^\mu$

### 变换性质

基对偶向量：
$$dx^{\mu'} = \frac{\partial x^{\mu'}}{\partial x^\mu}dx^\mu$$

对偶向量分量：
$$\omega_{\mu'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\omega_\mu$$

### 一般张量

$(k,l)$ 型张量在坐标基下：
$$T = T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l} \partial_{\mu_1} \otimes \cdots \otimes \partial_{\mu_k} \otimes dx^{\nu_1} \otimes \cdots \otimes dx^{\nu_l}$$

分量：
$$T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l} = T(dx^{\mu_1},\ldots,dx^{\mu_k},\partial_{\nu_1},\ldots,\partial_{\nu_l})$$

一般变换律（将洛伦兹变换矩阵 $\Lambda$ 替换为 $\partial x^{\mu'}/\partial x^\mu$）：
$$T^{\mu_1'\ldots\mu_k'}_{\quad\;\nu_1'\ldots\nu_l'} = \frac{\partial x^{\mu_1'}}{\partial x^{\mu_1}}\cdots\frac{\partial x^{\mu_k'}}{\partial x^{\mu_k}}\frac{\partial x^{\nu_1}}{\partial x^{\nu_1'}}\cdots\frac{\partial x^{\nu_l}}{\partial x^{\nu_l'}} T^{\mu_1\ldots\mu_k}_{\quad\;\nu_1\ldots\nu_l}$$

**实用技巧**：通常通过直接代入坐标变换来计算张量分量的变换更方便，例如在二维中：
$$S = (dx)^2 + x^2(dy)^2$$

在 $x' = 2x/y$, $y' = y/2$（逆变换 $x = x'y'$, $y = 2y'$）下：
$$dx = y'dx' + x'dy', \quad dy = 2dy'$$

代入得：
$$S = (y')^2(dx')^2 + 2x'y'(dx')(dy') + [(x')^2 + 4(x'y')^2](dy')^2$$

## 2.5 The Metric

### 度规的定义和性质

度规张量 $g_{\mu\nu}$ 是弯曲空间中最核心的对象：
- 对称 $(0,2)$ 型张量
- 通常非退化（$\det g_{\mu\nu} \neq 0$，允许定义逆度规）
- 逆度规：$g^{\mu\nu}g_{\nu\rho} = \delta^\mu_\rho$

**度规的七大用途**（Sachs & Wu, 1977）：
1. 提供"过去"和"未来"的概念
2. 允许计算路径长度和固有时
3. 决定两点间的"最短距离"（测试粒子的运动）
4. 取代牛顿引力势 $\Phi$
5. 提供局部惯性系的概念，从而给出"无旋转"的意义
6. 通过定义光速决定因果性
7. 取代传统欧几里得点积

**线元**：
$$ds^2 = g_{\mu\nu}dx^\mu dx^\nu$$

（"$ds^2$"不是任何东西的微分或平方，只是度规张量的传统简写。）

**范例——球面坐标中的平直三维空间**：
从笛卡尔坐标 $ds^2 = dx^2 + dy^2 + dz^2$，通过 $x = r\sin\theta\cos\phi$, $y = r\sin\theta\sin\phi$, $z = r\cos\theta$ 得到：
$$ds^2 = dr^2 + r^2d\theta^2 + r^2\sin^2\theta\,d\phi^2$$

尽管度规分量依赖于 $r$ 和 $\theta$，空间仍是平直的——度规分量的非平凡性不等于曲率。

**度规和子流形**：$S^2$ 上的度规可通过令 $r=1$, $dr=0$ 得到：
$$ds^2 = d\theta^2 + \sin^2\theta\,d\phi^2$$

### 标准形（Canonical Form）

度规的标准形：
$$g_{\mu\nu} = \text{diag}(-1,-1,\ldots,-1,+1,+1,\ldots,+1,0,0,\ldots,0)$$

**号差（Signature）**：正负本征值个数的记号：
- 全正：**欧几里得/黎曼**（正定）
- 单个负号：**洛伦兹/伪黎曼**（GR 的时空）
- 有零本征值：退化
- 连续非退化度规的号差在每点相同

### 局部惯性坐标的存在性

**定理**：在任何点 $p \in M$，存在坐标 $x^{\hat{\mu}}$ 使得：
$$g_{\hat{\mu}\hat{\nu}}(p) = \eta_{\hat{\mu}\hat{\nu}}, \quad \partial_{\hat{\sigma}}g_{\hat{\mu}\hat{\nu}}(p) = 0$$

即度规在 $p$ 点为一阶平直。但二阶导数 $\partial_{\hat{\rho}}\partial_{\hat{\sigma}}g_{\hat{\mu}\hat{\nu}}(p)$ 一般不能为零。

**证明概要**（四维洛伦兹情形）：

将变换律 $g_{\hat{\mu}\hat{\nu}} = \frac{\partial x^\mu}{\partial x^{\hat{\mu}}}\frac{\partial x^\nu}{\partial x^{\hat{\nu}}}g_{\mu\nu}$ 在 $p$ 处泰勒展开。设 $x^\mu(p) = x^{\hat{\mu}}(p) = 0$：

$$x^\mu = \left(\frac{\partial x^\mu}{\partial x^{\hat{\mu}_1}}\right)_p x^{\hat{\mu}_1} + \frac{1}{2}\left(\frac{\partial^2 x^\mu}{\partial x^{\hat{\mu}_1}\partial x^{\hat{\mu}_2}}\right)_p x^{\hat{\mu}_1}x^{\hat{\mu}_2} + \frac{1}{6}\left(\frac{\partial^3 x^\mu}{\partial x^{\hat{\mu}_1}\partial x^{\hat{\mu}_2}\partial x^{\hat{\mu}_3}}\right)_p x^{\hat{\mu}_1}x^{\hat{\mu}_2}x^{\hat{\mu}_3} + \cdots$$

展开 $g_{\hat{\mu}\hat{\nu}}$ 到二阶：
$$(g) = \left(\frac{\partial x}{\partial \hat{x}}\right)^2 (g) + \left(\frac{\partial x}{\partial \hat{x}}\right)^2 \left(\frac{\partial^2 x}{\partial \hat{x}^2}\right) (g) (\hat{x}) + \cdots$$

**自由度计数**：
- **零阶** $g_{\hat{\mu}\hat{\nu}}(p)$：10个独立分量。$(\partial x^\mu/\partial x^{\hat{\mu}})_p$ 有 $4\times 4 = 16$ 个自由度 → 足够将10个分量化为标准形，剩余6个恰好是洛伦兹群的参数（保持标准形不变）。
- **一阶** $\partial_{\hat{\sigma}}g_{\hat{\mu}\hat{\nu}}(p)$：$4 \times 10 = 40$ 个数字。$(\partial^2 x^\mu/\partial x^{\hat{\mu}_1}\partial x^{\hat{\mu}_2})_p$ 有 $10 \times 4 = 40$ 个自由度 → 恰好足以使所有一阶导数为零。
- **二阶** $\partial_{\hat{\rho}}\partial_{\hat{\sigma}}g_{\hat{\mu}\hat{\nu}}(p)$：$10 \times 10 = 100$ 个数字。$(\partial^3 x^\mu/\partial x^{\hat{\mu}_1}\partial x^{\hat{\mu}_2}\partial x^{\hat{\mu}_3})_p$ 有 $20 \times 4 = 80$ 个自由度 → **少了20个**！

因此，偏离平直性必须由度规的20个未被消除的二阶导数来刻画——这正是黎曼张量在四维中的20个独立分量。

### 局部惯性系的威力

**典型技巧**：在局部惯性坐标中回答物理问题，然后用张量形式表达答案，使其在任何坐标中成立。

**例子——三维速度**：
在SR中，观察者四维速度 $U^\mu = (1,0,0,0)$ 和火箭四维速度 $V^\mu = (\gamma, v\gamma, 0,0)$。由 $\eta_{00} = -1$：
$$v = \sqrt{1 - (\eta_{\mu\nu}U^\mu V^\nu)^{-2}} = \sqrt{1 - (U_\mu V^\mu)^{-2}}$$

由于这是张量方程，在弯曲时空任何坐标系中都成立。

## 2.6 An Expanding Universe

### Robertson-Walker 度规（平直空间切片）

$$ds^2 = -dt^2 + a^2(t)[dx^2 + dy^2 + dz^2]$$

- $a(t)$：**标度因子**，描述空间膨胀
- 保持 $x^i$ 为常数的世界线是**共动**的
- 共动点之间的物理距离按 $a(t)$ 增长
- $t = 0$ 是奇点（"大爆炸"），应从流形中排除：$0 < t < \infty$

**幂律解**：$a(t) \propto t^q$（$0 < q < 1$）
- $q = 2/3$：物质主导的平直宇宙
- $q = 1/2$：辐射主导的平直宇宙

### 展开宇宙中的光锥

类光路径（$ds^2 = 0$，$y,z$ 固定）：
$$0 = -dt^2 + t^{2q}dx^2 \implies \frac{dx}{dt} = \pm t^{-q}$$

**形式的严格处理**：
$ds^2$ 在切向量 $V = (dx^\mu/d\lambda)\partial_\mu$ 上的作用：
$$dt^2(V,V) = (dt \otimes dt)(V,V) = dt(V) \cdot dt(V) = \left(\frac{dt}{d\lambda}\right)^2$$

因此从 $ds^2(V,V) = 0$ 得到 $-(\frac{dt}{d\lambda})^2 + t^{2q}(\frac{dx}{d\lambda})^2 = 0$，通过一维链式法则 $\frac{dx}{dt} = \frac{dx/d\lambda}{dt/d\lambda}$ 得到所需结果。

**解**：$t = (1-q)^{1/(1-q)}(\pm x - x_0)^{1/(1-q)}$

**关键特征**：光锥在 $t = 0$ 处与奇点相切。两点过去的光锥不一定相交——每个事件定义一个**视界**，其外的事件无法影响该事件。这将在因果性章节（2.7）和宇宙学章节（第8章）中进一步讨论。

## 2.7 Causality

### 因果结构

无信号能快过光速——信息只沿类时或类光轨迹流动。

**定义**：
- **因果曲线**：处处类时或类光的曲线
- **因果未来** $J^+(S)$：可从 $S$ 出发沿未来指向因果曲线到达的点的集合
- **时序未来** $I^+(S)$：可从 $S$ 出发沿未来指向**类时**曲线到达的点的集合
- **因果过去** $J^-(S)$ 和**时序过去** $I^-(S)$ 类似定义
- 一点 $p$ 始终在其自身的 $J^+(p)$ 中，但未必在 $I^+(p)$ 中

**无时（Achronal）集**：没有两点被类时曲线连接的子集。无边界的类空超曲面是无时的。

**依赖域（Domain of Dependence）**：
对闭无时集 $S$：
- **未来依赖域** $D^+(S)$：所有满足"过 $p$ 的每条过去指向不可延伸因果曲线都必须与 $S$ 相交"的点 $p$ 的集合
- **过去依赖域** $D^-(S)$：类似定义（未来变过去）
- **未来柯西视界** $H^+(S) = \partial D^+(S)$
- **过去柯西视界** $H^-(S) = \partial D^-(S)$
- **依赖域** $D(S) = D^+(S) \cup D^-(S)$

**物理意义**：如果 $S$ 上的初始数据已知，$D(S)$ 中所有点处的场值都可以预测。

**柯西面**：满足 $D(\Sigma) = M$（整个流形）的闭无时面 $\Sigma$。

**全局双曲**：存在柯西面的时空。

**部分柯西面**：闭、无时、无边界的集合。可能因为选择"不好"或时空本身的问题而不能成为真正的柯西面。

### 因果性失效的三种方式

1. **选择不好的初始超曲面**：例如在闵可夫斯基空间中选取完全位于某点过去光锥以内的超曲面——但可以选更好的曲面。

2. **闭合类时曲线**：
考虑二维时空 $ds^2 = -\cos(\lambda)dt^2 - \sin(\lambda)[dt\,dx + dx\,dt] + \cos(\lambda)dx^2$，其中 $\lambda = \cot^{-1}t$，拓扑为 $\mathbb{R} \times S^1$（$(t,x) \sim (t,x+1)$）。

当 $t > 0$，$x$ 成为类时坐标，可能沿类时轨迹绕 $S^1$ 一圈回到自身。依赖域在 $t=0$ 处终止。

3. **奇点**：不在流形中但可通过有限距离的测地线到达的点（通常曲率发散）。奇点未来中的点不在其过去类空超曲面的依赖域内——因果曲线在奇点处终止。

## 2.8 Tensor Densities

### Levi-Civita 符号

在 $n$ 维中定义为：
$$\tilde{\epsilon}_{\mu_1\mu_2\ldots\mu_n} = \begin{cases} +1 & \text{偶排列} \\ -1 & \text{奇排列} \\ 0 & \text{否则} \end{cases}$$

**关键**：这不是张量！它被定义为在任何坐标中都有相同的分量。

**变换性质**：利用行列式的性质：
$$\tilde{\epsilon}_{\mu_1'\mu_2'\ldots\mu_n'} = \left|\frac{\partial x^\mu}{\partial x^{\mu'}}\right| \frac{\partial x^{\mu_1}}{\partial x^{\mu_1'}}\frac{\partial x^{\mu_2}}{\partial x^{\mu_2'}}\cdots\frac{\partial x^{\mu_n}}{\partial x^{\mu_n'}} \tilde{\epsilon}_{\mu_1\mu_2\ldots\mu_n}$$

**证明**：对任意 $n \times n$ 矩阵 $M^\mu_{\ \mu'}$，行列式满足：
$$|M|\tilde{\epsilon}_{\nu_1'\nu_2'\ldots\nu_n'} = \tilde{\epsilon}_{\mu_1\mu_2\ldots\mu_n}M^{\mu_1}_{\ \nu_1'}M^{\mu_2}_{\ \nu_2'}\cdots M^{\mu_n}_{\ \nu_n'}$$

令 $M^\mu_{\ \mu'} = \partial x^\mu/\partial x^{\mu'}$。利用 $|\partial x^{\mu'}/\partial x^\mu| = |\partial x^\mu/\partial x^{\mu'}|^{-1}$ 得到变换关系。

### 张量密度

**定义**：按张量变换律乘以雅可比行列式的某次幂变换的对象。

**权（weight）**：雅可比行列式的指数。
- $\tilde{\epsilon}_{\mu_1\ldots\mu_n}$ 是权为 $+1$ 的张量密度
- 度规行列式 $g = \det g_{\mu\nu}$：
  $$g(x^{\mu'}) = \left|\frac{\partial x^{\mu'}}{\partial x^\mu}\right|^{-2} g(x^\mu)$$

  $g$ 是权为 $-2$ 的标量密度。

**证明**：对 $g_{\mu'\nu'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\frac{\partial x^\nu}{\partial x^{\nu'}}g_{\mu\nu}$ 两边取行列式，注意 $|\partial x^{\mu'}/\partial x^\mu|^{-1} = |\partial x^\mu/\partial x^{\mu'}|$。

### 将密度转换为张量

乘以 $|g|^{w/2}$（$w$ 是权），结果按张量变换律变换。

**Levi-Civita 张量**：
$$\epsilon_{\mu_1\mu_2\ldots\mu_n} = \sqrt{|g|}\,\tilde{\epsilon}_{\mu_1\mu_2\ldots\mu_n}$$

这是真正的张量。上指标版本：
$$\epsilon^{\mu_1\mu_2\ldots\mu_n} = \text{sgn}(g)\frac{1}{\sqrt{|g|}}\tilde{\epsilon}^{\mu_1\mu_2\ldots\mu_n}$$

**缩并恒等式**：
$$\epsilon^{\mu_1\mu_2\ldots\mu_{n-p}\alpha_1\ldots\alpha_p}\epsilon_{\mu_1\mu_2\ldots\mu_{n-p}\beta_1\ldots\beta_p} = (-1)^s p!(n-p)!\delta^{[\alpha_1}_{\beta_1}\cdots\delta^{\alpha_p]}_{\beta_p}$$

其中 $s$ 是度规的负本征值个数（洛伦兹号差时 $s=1$）。

最常用情形 $p = n-1$：
$$\epsilon^{\mu_1\mu_2\ldots\mu_{n-1}\alpha}\epsilon_{\mu_1\mu_2\ldots\mu_{n-1}\beta} = (-1)^s(n-1)!\delta^\alpha_\beta$$

## 2.9 Differential Forms

### 基本概念

**$p$-形式**：完全反对称的 $(0,p)$ 型张量。
- 0-形式 = 标量
- 1-形式 = 对偶向量
- $\Lambda^p$ = 某点处所有 $p$-形式的 $n!/(p!(n-p)!)$ 维空间
- 在四维中：1个0-形式，4个1-形式，6个2-形式，4个3-形式，1个4-形式
- $p > n$ 时不存在 $p$-形式

**楔积（Wedge Product）**：
$$(A \wedge B)_{\mu_1\ldots\mu_{p+q}} = \frac{(p+q)!}{p!q!}A_{[\mu_1\ldots\mu_p}B_{\mu_{p+1}\ldots\mu_{p+q}]}$$

两个1-形式的例子：
$$(A \wedge B)_{\mu\nu} = 2A_{[\mu}B_{\nu]} = A_\mu B_\nu - A_\nu B_\mu$$

**性质**：$A \wedge B = (-1)^{pq} B \wedge A$

### 外微分

将 $p$-形式映射为 $(p+1)$-形式：
$$(dA)_{\mu_1\ldots\mu_{p+1}} = (p+1)\partial_{[\mu_1}A_{\mu_2\ldots\mu_{p+1}]}$$

0-形式的外微分就是梯度：$(d\phi)_\mu = \partial_\mu\phi$

**修改的莱布尼茨法则**（对 $p$-形式 $\omega$ 和 $q$-形式 $\eta$）：
$$d(\omega \wedge \eta) = (d\omega) \wedge \eta + (-1)^p \omega \wedge (d\eta)$$

**关键性质**——外微分是张量：即使在弯曲时空中，$dA$ 也是良好定义的张量。

**证明**（对 $p=1$）：对偶向量的偏导数变换为：
$$\partial_{\mu'}\omega_{\nu'} = \frac{\partial x^\mu}{\partial x^{\mu'}}\frac{\partial x^\nu}{\partial x^{\nu'}}\partial_\mu\omega_\nu + \omega_\nu\frac{\partial^2 x^\nu}{\partial x^{\mu'}\partial x^{\nu'}}$$

第二项在 $\mu'$ 和 $\nu'$ 下是对称的（偏导数可交换）。外微分取反对称部分：
$$(d\omega)_{\mu'\nu'} = 2\partial_{[\mu'}\omega_{\nu']}$$

对称表达式的反对称部分为零，因此非张量项消失——外微分是真正的张量算子。

**庞加莱引理**：$d(dA) = 0$（常写为 $d^2 = 0$）。

**证明**：来自 $d$ 的定义和偏导数对易性 $\partial_\alpha\partial_\beta = \partial_\beta\partial_\alpha$。

### 上同调

- **闭形式**：$dA = 0$ 的 $p$-形式
- **恰当形式**：$A = dB$（$B$ 是 $(p-1)$-形式）
- 所有恰当形式都是闭的，但反之不一定

**上同调类**：$H^p(M) = Z^p(M) / B^p(M)$（闭形式模恰当形式）

$H^p(M)$ 的维数只依赖于 $M$ 的拓扑！闵可夫斯基空间拓扑等价于 $\mathbb{R}^4$，$H^0 = \mathbb{R}$，所有 $H^{p>0} = 0$（所有闭形式都是恰当的，0-形式除外）。

### Hodge 对偶

将 $p$-形式映射为 $(n-p)$-形式：
$$(*A)_{\mu_1\ldots\mu_{n-p}} = \frac{1}{p!}\epsilon^{\nu_1\ldots\nu_p}_{\quad\quad\mu_1\ldots\mu_{n-p}}A_{\nu_1\ldots\nu_p}$$

依赖于度规（需要通过度规升降 Levi-Civita 张量的指标）。

**两次 Hodge 对偶**：
$$**A = (-1)^{s+p(n-p)}A$$

其中 $s$ 是度规负本征值个数。

**三维欧几里得空间的叉积**：
$$*(U \wedge V)_{\sigma} = \epsilon_{\mu\nu\sigma}U^\mu V^\nu$$

这正是传统的叉积——解释了为什么叉积只在三维中存在（只有三维中两个1-形式的楔积的对偶是1-形式），以及为什么在宇称变换下改变符号（Levi-Civita 张量的出现）。

### 电磁学中的微分形式

- 场强 $F$ 是2-形式，$dF = 0$（$\partial_{[\mu}F_{\nu\rho]} = 0$）自动意味着 $F = dA$
- 规范变换 $A \to A + d\lambda$ 显然保持 $F$ 不变（因为 $d^2 = 0$）
- 另一对方程：$d(*F) = *J$（$\partial_\nu F^{\mu\nu} = J^\mu$）

## 2.10 Integration

### 体积元

在 $n$ 维流形上，自然体积元由 Levi-Civita 张量提供：
$$\text{volume element} = \epsilon = \sqrt{|g|}\,dx^1 \wedge \cdots \wedge dx^n$$

在坐标变换下：
$$d^nx' = \left|\frac{\partial x'}{\partial x}\right|d^nx$$

而 $\sqrt{|g'|} = \left|\frac{\partial x}{\partial x'}\right|\sqrt{|g|}$，故 $\sqrt{|g'|}d^nx' = \sqrt{|g|}d^nx$ 是不变的积分测度。

**标量函数的积分**：
$$\int f = \int f \sqrt{|g|}\,d^nx$$

### 斯托克斯定理

$$\int_\Sigma d\omega = \int_{\partial\Sigma} \omega$$

这是微积分基本定理、格林定理、高斯定理和传统斯托克斯定理在流形上的统一推广。具体讨论见附录E。

### 子流形上的积分

如果 $\Sigma$ 是 $M$ 的 $k$ 维子流形，带有诱导度规 $\gamma_{ij}$，则 $\Sigma$ 上的体积元为 $\sqrt{|\gamma|}d^k\xi$，其中 $\xi^i$ 是 $\Sigma$ 上的坐标。

张量场的分量可以在 $\Sigma$ 上进行积分，但必须注意积分的几何意义——一般来说，只有在不同点属于同一向量空间的对象才能相加。这意味着对向量场的积分通常需要额外的结构（如平行传播器，附录I）。
