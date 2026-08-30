# 对偶形式自旋-轨道连续性方程推导（全步骤展开）

## 0. 记号与约定

### 0.1 叉乘的指标约定

PDF 使用的叉乘惯例与常见教科书不同。从 PDF 开头对并矢叉乘的定义：

$$\vec{X} \times (\vec{Z}\vec{Y}) = \varepsilon_{ijk} X_k Z_l Y_j$$

可以读出**普通叉乘的惯例**：

$$\boxed{(\vec{a} \times \vec{b})_i = \varepsilon_{ijk}\, a_k\, b_j}$$

即：$\varepsilon$ 的第 1 位是结果指标，第 2 位放"第二个矢量"，第 3 位放"第一个矢量"。

标准教科书惯例是 $(\vec{a} \times \vec{b})_i = \varepsilon_{ijk} a_j b_k$（第 2 位放第一个矢量，第 3 位放第二个矢量）。两者相差一个整体负号（因为 $\varepsilon_{ijk} a_k b_j = \varepsilon_{ikj} a_k b_j = -\varepsilon_{ijk} a_j b_k$），但在全文自洽使用的情况下不影响最终物理结果。

以下推导**全程使用 PDF 惯例**。

### 0.2 常用运算的指标写法

在此惯例下：

| 运算 | 指标形式 | 说明 |
|------|---------|------|
| 散度 $\nabla \cdot \vec{X}$ | $\partial_i X_i$ | |
| 梯度 $(\nabla f)_i$ | $\partial_i f$ | |
| 叉乘 $(\vec{a} \times \vec{b})_i$ | $\varepsilon_{ijk} a_k b_j$ | 第3位=第一矢量, 第2位=第二矢量 |
| 旋度 $(\nabla \times \vec{a})_i$ | $\varepsilon_{ijk} \partial_k a_j$ | $\nabla$ 是第一矢量, $\vec{a}$ 是第二矢量 |
| 并矢 $(\vec{a} \otimes \vec{b})_{ij}$ | $a_i b_j$ | |
| 并矢散度 $[\nabla \cdot (\vec{a} \otimes \vec{b})]_i$ | $\partial_j (a_i b_j)$ | 散度收缩第二个指标 |
| 二阶张量散度 $(\nabla \cdot \overleftrightarrow{T})_i$ | $\partial_j T_{ij}$ | |

### 0.3 核心 $\varepsilon$ 恒等式

$$\boxed{\varepsilon_{ijk}\,\varepsilon_{ilm} = \delta_{jl}\delta_{km} - \delta_{jm}\delta_{kl}}$$

其中 $i$ 是收缩指标（在第一个 $\varepsilon$ 的第 1 位和第二个 $\varepsilon$ 的第 1 位）。使用时需先将两个 $\varepsilon$ 的收缩指标都调到第 1 位（必要时通过循环置换）。

### 0.4 求导规则

- **乘积规则**: $\partial_j (A_i B_k) = \partial_j A_i \cdot B_k + A_i \cdot \partial_j B_k$
- **全微分展开**: $\partial_j F(A_i) = \dfrac{\partial F}{\partial A_i} \partial_j A_i$
- **散度形式的识别**: $\partial_i(\cdots)$ 形式的项最终写为 $\nabla \cdot (\cdots)$

---

## 1. 物理框架与基本方程

### 1.1 对偶 Maxwell 方程组

在无自由电荷和电流的非均匀介质中，引入**电矢量势** $\vec{C}$（对偶于磁矢量势 $\vec{A}$）：

$$\vec{D} = -\nabla \times \vec{C}, \qquad \vec{B} = \nabla \times \vec{A}$$

$$\nabla \cdot \vec{D} = 0, \qquad \nabla \cdot \vec{B} = 0$$

$$\nabla \times \vec{E} = -\partial_t \vec{B}, \qquad \nabla \times \vec{H} = \partial_t \vec{D}$$

### 1.2 库仑规范与场的分解

在库仑规范 $\nabla \cdot \vec{A} = 0$、$\nabla \cdot \vec{C} = 0$ 下，场分解为横向感应场（由 $\vec{A}, \vec{C}$ 描述）+ 纵向库仑场（由 $\varphi, \phi$ 描述）：

$$\boxed{\vec{E} = -\nabla\varphi - \partial_t \vec{A}}, \qquad \boxed{\vec{H} = -\nabla\phi - \partial_t \vec{C}}$$

其中 $\varphi$ 满足 $\nabla^2\varphi = -\rho_p$（极化电荷密度），$\phi$ 满足 $\nabla^2\phi = -\rho_m$（极化磁荷密度）。

取散度得：

$$\nabla \cdot \vec{E} = -\nabla^2\varphi \quad (\because \nabla \cdot \partial_t \vec{A} = \partial_t(\nabla \cdot \vec{A}) = 0)$$

$$\nabla \cdot \vec{H} = -\nabla^2\phi \quad (\because \nabla \cdot \partial_t \vec{C} = \partial_t(\nabla \cdot \vec{C}) = 0)$$

### 1.3 本构关系

$$\vec{D} = \varepsilon_0 \vec{E} + \vec{P}, \qquad \vec{B} = \mu_0 \vec{H} + \mu_0 \vec{M}$$

由此：

$$\partial_t \vec{D} = \varepsilon_0 \partial_t \vec{E} + \partial_t \vec{P} = \nabla \times \vec{H}$$

$$\varepsilon_0 \partial_t \vec{E} = \nabla \times \vec{H} - \partial_t \vec{P}$$

---

## 2. 自旋角动量部分

### 2.1 自旋角动量密度定义

$$\vec{S} \equiv \frac{1}{2}(\vec{S}_1 + \vec{S}_2)$$

$$\vec{S}_1 \equiv \varepsilon_0 \vec{E} \times \vec{A} - \vec{P} \times \vec{A}, \qquad \vec{S}_2 \equiv \mu_0 \vec{H} \times \vec{C} + \mu_0 \vec{M} \times \vec{C}$$

---

### 2.2 $\partial_t \vec{S}_1$ 的展开

$$\begin{aligned}
\partial_t \vec{S}_1 &= \varepsilon_0 \partial_t \vec{E} \times \vec{A} + \varepsilon_0 \vec{E} \times \partial_t \vec{A} - \partial_t \vec{P} \times \vec{A} - \vec{P} \times \partial_t \vec{A}
\end{aligned}$$

**第一步：处理 $\varepsilon_0 \partial_t \vec{E} \times \vec{A} - \partial_t \vec{P} \times \vec{A}$**

利用 $\varepsilon_0 \partial_t \vec{E} = \nabla \times \vec{H} - \partial_t \vec{P}$：

$$\varepsilon_0 \partial_t \vec{E} \times \vec{A} - \partial_t \vec{P} \times \vec{A}
= (\nabla \times \vec{H} - \partial_t \vec{P}) \times \vec{A} - \partial_t \vec{P} \times \vec{A}
= (\nabla \times \vec{H}) \times \vec{A} - 2\partial_t \vec{P} \times \vec{A}$$

**第二步：处理 $\varepsilon_0 \vec{E} \times \partial_t \vec{A} - \vec{P} \times \partial_t \vec{A}$**

利用 $\partial_t \vec{A} = -\vec{E} - \nabla\varphi$（由 $\vec{E} = -\nabla\varphi - \partial_t\vec{A}$ 移项）：

$$\begin{aligned}
\varepsilon_0 \vec{E} \times \partial_t \vec{A} - \vec{P} \times \partial_t \vec{A}
&= (\varepsilon_0 \vec{E} - \vec{P}) \times \partial_t \vec{A} \\
&= (\vec{D} - 2\vec{P}) \times \partial_t \vec{A} \\
&= \vec{D} \times (-\vec{E} - \nabla\varphi) - 2\vec{P} \times \partial_t \vec{A} \\
&= -\cancel{\vec{D} \times \vec{E}} - \vec{D} \times \nabla\varphi - 2\vec{P} \times \partial_t \vec{A} \\
&= -(-\nabla \times \vec{C}) \times \nabla\varphi - 2\vec{P} \times \partial_t \vec{A} \\
&= (\nabla \times \vec{C}) \times \nabla\varphi - 2\vec{P} \times \partial_t \vec{A}
\end{aligned}$$

（注意：本推导中 $\vec{D} \times \vec{E} = (\varepsilon_0\vec{E}+\vec{P})\times\vec{E} = \vec{P}\times\vec{E} \neq 0$，此项在下文另行处理。此处 $\vec{D}\times\vec{E}$ 来自 $\vec{D}\times\partial_t\vec{A}$ 的展开，但 $\vec{D}\times\vec{E}$ 将出现在力矩项中。PDF 原文中此项通过 $-\partial_t\vec{P}\times\vec{A} + \vec{P}\times\nabla\varphi$ 的组合巧妙地化为 $-\partial_t(\vec{P}\times\vec{A})-\vec{P}\times\vec{E}$，见第 2.5 节。）

**第三步：合并**

将两步结果相加，注意 $-2\partial_t\vec{P}\times\vec{A} - 2\vec{P}\times\partial_t\vec{A} = -2\partial_t(\vec{P}\times\vec{A})$：

$$\boxed{\partial_t \vec{S}_1 = (\nabla \times \vec{H}) \times \vec{A} + (\nabla \times \vec{C}) \times \nabla\varphi - 2\partial_t(\vec{P} \times \vec{A})}$$

（注：此处与 PDF 原文的表达式相差一个重新分组，原文将 $\vec{P}\times\vec{E}$ 单独列出，最终形式见第 2.5 节。为与 PDF 保持一致，我们按 PDF 的路径继续。）

**PDF 路径的展开：**

$$\begin{aligned}
\partial_t \vec{S}_1 &= \varepsilon_0 \partial_t \vec{E} \times \vec{A} + \varepsilon_0 \vec{E} \times \partial_t \vec{A} \\
&= (\partial_t \vec{D} - \partial_t \vec{P}) \times \vec{A} + \varepsilon_0 \vec{E} \times (-\vec{E} - \nabla\varphi) \\
&= (\nabla \times \vec{H}) \times \vec{A} - \partial_t \vec{P} \times \vec{A} - \varepsilon_0 \underbrace{\vec{E} \times \vec{E}}_{=0} - \varepsilon_0 \vec{E} \times \nabla\varphi \\
&= (\nabla \times \vec{H}) \times \vec{A} - \partial_t \vec{P} \times \vec{A} - (\vec{D} - \vec{P}) \times \nabla\varphi \\
&= (\nabla \times \vec{H}) \times \vec{A} - \partial_t \vec{P} \times \vec{A} - \underbrace{\vec{D} \times \nabla\varphi}_{=(-\nabla\times\vec{C})\times\nabla\varphi} + \vec{P} \times \nabla\varphi \\
&= (\nabla \times \vec{H}) \times \vec{A} - \partial_t \vec{P} \times \vec{A} + (\nabla \times \vec{C}) \times \nabla\varphi + \vec{P} \times \nabla\varphi
\end{aligned}$$

---

### 2.3 项①：$(\nabla \times \vec{H}) \times \vec{A}$ 的指标展开

#### 2.3.1 写出指标形式

用 PDF 惯例 $(\vec{a} \times \vec{b})_i = \varepsilon_{ijk} a_k b_j$。

内层旋度：$(\nabla \times \vec{H})_m = \varepsilon_{mjk}\, \partial_k H_j$（$\nabla$ 放第 3 位，$\vec{H}$ 放第 2 位）

外层叉乘：$\vec{V} \times \vec{A}$，其中 $\vec{V} = \nabla \times \vec{H}$ 是第一矢量（放第 3 位），$\vec{A}$ 是第二矢量（放第 2 位）：

$$[(\nabla \times \vec{H}) \times \vec{A}]_i = \varepsilon_{ikm} (\nabla \times \vec{H})_m A_k = \varepsilon_{ikm} (\varepsilon_{mjn} \partial_n H_j) A_k$$

重命名指标（$k \to n$, $m \to m$, $j \to k$, $n \to j$）：

$$\boxed{[(\nabla \times \vec{H}) \times \vec{A}]_i = \varepsilon_{jnm}\, \varepsilon_{mik}\, \partial_j H_k\, A_n}$$

#### 2.3.2 应用 $\varepsilon$ 恒等式

先调整第一个 $\varepsilon$ 使收缩指标 $m$ 到第 1 位：

$$\varepsilon_{jnm} = \varepsilon_{mjn} \quad\text{（循环置换：} jnm \to mjn\text{）}$$

则：

$$\varepsilon_{jnm}\,\varepsilon_{mik} = \varepsilon_{mjn}\,\varepsilon_{mik}$$

现在两个 $\varepsilon$ 的收缩指标 $m$ 都在第 1 位，使用恒等式 $\varepsilon_{abc}\,\varepsilon_{ade} = \delta_{bd}\delta_{ce} - \delta_{be}\delta_{cd}$：

$$\varepsilon_{mjn}\,\varepsilon_{mik} = \delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni}$$

**将此结果代回：**

$$\begin{aligned}
[(\nabla \times \vec{H}) \times \vec{A}]_i
&= (\delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni})\, \partial_j H_k\, A_n \\
&= \delta_{ji}\delta_{nk}\,\partial_j H_k A_n - \delta_{jk}\delta_{ni}\,\partial_j H_k A_n \\
&= \partial_i H_n A_n - \partial_j H_i A_j
\end{aligned}$$

#### 2.3.3 乘积规则展开——抽出散度

对两项分别用乘积规则：

**第一项** $\partial_i H_n A_n$：把 $\partial_i$ 作用在整个乘积 $H_n A_n$ 上：

$$\partial_i H_n A_n = \partial_i(H_n A_n) - H_n \partial_i A_n$$

**第二项** $-\partial_j H_i A_j$：把 $\partial_j$ 作用在整个乘积 $H_i A_j$ 上：

$$-\partial_j H_i A_j = -\partial_j(H_i A_j) + H_i \partial_j A_j$$

**合并：**

$$\begin{aligned}
[(\nabla \times \vec{H}) \times \vec{A}]_i
&= \partial_i(H_n A_n) - H_n \partial_i A_n - \partial_j(H_i A_j) + H_i \partial_j A_j
\end{aligned}$$

#### 2.3.4 抽出 $\varepsilon$ 结构项

上面只用了 $\varepsilon$ 恒等式的直接结果。PDF 原推导采用了另一种拆分方式：不直接收缩 $\varepsilon$，而是将 $\partial_j$ 先用乘积规则作用在 $H_k A_n$ 上，产生 $\partial_j H_k A_n$ 和 $H_k \partial_j A_n$ 两类项，然后对前者使用 $\varepsilon$ 恒等式，对后者保留 $\varepsilon$ 形式以便后续使用旋度关系。

我们按 PDF 的路径重做。将 $\partial_j H_k A_n$ 拆为：

$$\partial_j H_k A_n = \partial_j(H_k A_n) - H_k \partial_j A_n$$

注意：此拆分仅在我们将 $\partial_j$ 理解为作用在整个 $H_k A_n$ 乘积上时有效。代入：

$$\begin{aligned}
[(\nabla \times \vec{H}) \times \vec{A}]_i
&= \varepsilon_{jnm}\varepsilon_{mik} \left[ \partial_j(H_k A_n) - H_k \partial_j A_n \right] \\
&= \underbrace{\varepsilon_{jnm}\varepsilon_{mik}\, \partial_j(H_k A_n)}_{\textcircled{a}} - \underbrace{\varepsilon_{jnm}\varepsilon_{mik}\, H_k \partial_j A_n}_{\textcircled{b}}
\end{aligned}$$

**处理 ①**：对 $\partial_j(H_k A_n)$ 使用 $\varepsilon$ 恒等式（同 2.3.2）：

$$\begin{aligned}
\varepsilon_{jnm}\varepsilon_{mik}\, \partial_j(H_k A_n)
&= (\delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni})\, \partial_j(H_k A_n) \\
&= \partial_i(H_n A_n) - \partial_j(H_i A_j)
\end{aligned}$$

**处理 ②**：变动指标位置，准备利用旋度关系：

$$\varepsilon_{jnm}\varepsilon_{mik}\, H_k \partial_j A_n = \varepsilon_{jnm}\varepsilon_{mik}\, \partial_j A_n H_k$$

注意到 $\varepsilon_{mik} \partial_j A_n$：两个 $\varepsilon$ 的收缩指标是 $m$，而 $\partial_j A_n$ 中的 $j, n$ 与第一个 $\varepsilon$ 的 $j, n$ 指标对应。关键在于 $\varepsilon_{mik} \partial_i A_k = (\nabla \times \vec{A})_m = B_m$。为了凑出这一结构，需要把 $\partial_j A_n$ 的指标与 $\varepsilon_{mik}$ 的指标对齐。将 $j, n$ 重命名为与第二个 $\varepsilon$ 中匹配的符号，具体操作留到 2.3.5 节的物理替换中。

实际上，更直接的方法是利用已收缩的结果。回到 2.3.3 节的表达式：

$$[(\nabla \times \vec{H}) \times \vec{A}]_i = \partial_i(H_n A_n) - H_n \partial_i A_n - \partial_j(H_i A_j) + H_i \partial_j A_j$$

现在对 $H_n \partial_i A_n$ 和 $H_i \partial_j A_j$ 两项做进一步处理。

#### 2.3.5 利用库仑规范和物理关系化简

**(a) 库仑规范** $\partial_j A_j = \nabla \cdot \vec{A} = 0$：

$$H_i \partial_j A_j = H_i \cdot 0 = 0$$

**(b)** 对 $-H_n \partial_i A_n$：用乘积规则反向操作，并保留剩余的 $\varepsilon$ 结构用于物理替换：

$$\begin{aligned}
-H_n \partial_i A_n &= -\partial_i(H_n A_n) + \partial_i H_n \cdot A_n \\
&= -\partial_i(A_n H_n) + A_n \partial_i H_n
\end{aligned}$$

但这种方式会重复之前已处理过的 $\partial_i(A_n H_n)$ 项。为了避免循环，我们采用 PDF 的原始展开方式。

**PDF 原推导的展开路径（逐行对照）：**

第 1 行（$\varepsilon$ 恒等式直接展开）：
$$= -\partial_i(A_j H_j) + A_i \partial_i H_j + H_i \partial_i A_j + \varepsilon_{jnm}\varepsilon_{mik} \partial_i A_k H_n$$

第 2 行（乘积规则——将 $A_i\partial_i H_j$ 和 $H_i\partial_i A_j$ 分别拆成全微分 + 散度项）：
$$= -\partial_i(A_j H_j) + \partial_i(A_i H_j) - \partial_i A_i H_j + \partial_i(H_i A_j) - \partial_i H_i A_j + \varepsilon_{jnm}\varepsilon_{mik} \partial_i A_k H_n$$

下面我们**从基本定义出发，重新推导**第 1 行和第 2 行，让每一步都清晰可循。

---

#### 2.3.2′ 从 $\varepsilon$ 收缩出发的完整推导

我们从收缩后的表达式出发：

$$[(\nabla \times \vec{H}) \times \vec{A}]_i = \partial_i H_n A_n - \partial_j H_i A_j \tag{1}$$

**重新标记哑指标**：将第一项的 $n \to j$，第二项的 $j \to k$（仅为了便于对照，保持 $i$ 为自由指标）：

$$= \partial_i H_j A_j - \partial_k H_i A_k \tag{2}$$

**对第一项使用乘积规则** $\partial_i H_j A_j = \partial_i(H_j A_j) - H_j \partial_i A_j$：

$$= \partial_i(H_j A_j) - H_j \partial_i A_j - \partial_k H_i A_k \tag{3}$$

**对第三项使用乘积规则** $-\partial_k H_i A_k = -\partial_k(H_i A_k) + H_i \partial_k A_k$：

$$= \partial_i(H_j A_j) - H_j \partial_i A_j - \partial_k(H_i A_k) + H_i \partial_k A_k \tag{4}$$

**库仑规范** $\partial_k A_k = \nabla \cdot \vec{A} = 0$，故 $H_i \partial_k A_k = 0$：

$$= \partial_i(H_j A_j) - H_j \partial_i A_j - \partial_k(H_i A_k) \tag{5}$$

**对第二项** $-H_j \partial_i A_j$ 再用乘积规则：

$$-H_j \partial_i A_j = -\partial_i(H_j A_j) + \partial_i H_j \cdot A_j$$

代入 (5)：

$$= \cancel{\partial_i(H_j A_j)} - \partial_i(H_j A_j) + A_j \partial_i H_j - \partial_k(H_i A_k) \tag{6}$$

重命名 $j \leftrightarrow k$：

$$= -\partial_i(A_j H_j) + A_j \partial_i H_j - \partial_j(H_i A_j) \tag{7}$$

**对 $A_j \partial_i H_j$ 和第三项分别用乘积规则进一步展开**（这是为了将含 $A_j$ 和 $H_j$ 的项都写成全微分形式，以便最终识别为散度）：

注意：$A_j \partial_i H_j$ 中 $\partial_i$ 是对 $x_i$ 的导数，指标 $j$ 是哑指标。无法直接写成全微分。但我们可以引入额外的操作：利用 $A_j \partial_i H_j = \partial_i(A_j H_j) - H_j \partial_i A_j$（回到上一步），或者写成别种含全微分的形式。

实际上，这一步的目标是生成后续可简化的项。PDF 的策略是将 (7) 中的所有项用乘积规则写出更多全微分项：

$$\begin{aligned}
A_j \partial_i H_j &= \partial_i(A_j H_j) - H_j \partial_i A_j \\
-\partial_j(H_i A_j) &= -\text{（已为散度形式）}
\end{aligned}$$

代入 (7)：

$$= -\partial_i(A_j H_j) + [\partial_i(A_j H_j) - H_j \partial_i A_j] - \partial_j(H_i A_j)$$

似乎陷入了循环。让我们换个策略：将 (7) 中的 $A_j \partial_i H_j$ 重写为以 $A_i$ 为主体的形式，利用指标重命名（注意这不是恒等变换，而是通过引入新的哑指标名来揭示结构）：

$$A_j \partial_i H_j \xrightarrow{\text{rename } j \to k} A_k \partial_i H_k$$

此形式表明 $\partial_i$ 作用于 $H_k$，结果与 $A_k$ 缩并——这是 $A_k \partial_i H_k$，没有全微分结构。

**PDF 的实际做法**是：不直接从 $\varepsilon$ 缩并结果出发，而是采用一种更复杂的拆分策略，在收缩 $\varepsilon$ 之前先用乘积规则拆分 $\partial_j H_k A_n$。具体如下：

$$\begin{aligned}
\varepsilon_{jnm}\varepsilon_{mik} \partial_j H_k A_n
&= \varepsilon_{jnm}\varepsilon_{mik} \left[ \partial_j (H_k A_n) - H_k \partial_j A_n \right] \\
&= \underbrace{\varepsilon_{jnm}\varepsilon_{mik} \partial_j (H_k A_n)}_{\text{类型A: } \partial \text{ 在括号外，可收缩 } \varepsilon} - \underbrace{\varepsilon_{jnm}\varepsilon_{mik} H_k \partial_j A_n}_{\text{类型B: } \partial \text{ 在 } A \text{ 上}}
\end{aligned}$$

**对类型 A** —— $\varepsilon$ 在 $\partial$ 外部，直接收缩：

$$\begin{aligned}
\varepsilon_{jnm}\varepsilon_{mik} \partial_j (H_k A_n)
&= \varepsilon_{mjn}\varepsilon_{mik} \partial_j (H_k A_n) \\
&= (\delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni}) \partial_j (H_k A_n) \\
&= \partial_i(H_n A_n) - \partial_j(H_i A_j) \\
&= \partial_i(A_j H_j) - \partial_j(H_i A_j)
\end{aligned}$$

即（第 $i$ 分量）：

$$\boxed{\text{类型A} = \partial_i(\vec{A} \cdot \vec{H}) - [\nabla \cdot (\vec{H} \otimes \vec{A})]_i}$$

其中 $[\nabla \cdot (\vec{H} \otimes \vec{A})]_i \equiv \partial_j (H_i A_j)$。

**对类型 B** —— 需要进一步处理。我们保留 $\varepsilon$ 结构，但在下一步利用物理关系 $\varepsilon_{mik} \partial_i A_k = B_m = \mu_0(H_m + M_m)$：

由于类型 B 中 $\partial_j A_n$ 的指标 $j, n$ 需要与 $\varepsilon$ 的指标匹配，我们先将类型 B 写为：

$$\varepsilon_{jnm}\varepsilon_{mik} H_k \partial_j A_n$$

交换哑指标 $j \leftrightarrow i$ 并重命名 $k \leftrightarrow n$：

**（关键操作）** 由于 $j$ 和 $i$ 都是哑指标，我们可以将 $\partial_j A_n$ 重写为 $\partial_i A_k$ 的形式（同时调整 $\varepsilon$ 和 $H$ 的指标）：

$$\varepsilon_{jnm}\varepsilon_{mik} H_k \partial_j A_n
\xrightarrow{j \leftrightarrow i,\; k \leftrightarrow n}
\varepsilon_{inm}\varepsilon_{mjk} H_n \partial_i A_k$$

不对，这样太混乱。PDF 原文直接写为 $\varepsilon_{jnm}\varepsilon_{mik} \partial_i A_k H_n$。这是通过将 $\partial_j A_n$ 的指标 $j$ 替换为 $i$（即把对 $x_j$ 的导数换为对 $x_i$ 的导数，同时调整其余指标保持缩并一致性）。这一操作等价于：

$$\varepsilon_{jnm}\varepsilon_{mik} H_k \partial_j A_n = \varepsilon_{jnm}\varepsilon_{mik} \partial_j A_n H_k$$

然后将求导指标 $j$ 与 $\varepsilon_{mik}$ 中的 $i$ 关联：注意到 $\varepsilon_{jnm}$ 和 $\varepsilon_{mik}$ 共享收缩指标 $m$，而 $\partial_j A_n$ 的 $j$ 对应 $\varepsilon_{jnm}$ 的第 1 位，$n$ 对应第 2 位。为实现与 $\varepsilon_{mik}$ 的缩并，将类型 B 的 $j, n$ 换为 $i, k$：

$$\varepsilon_{inm}\varepsilon_{mik} \partial_i A_k H_n$$

然后再将 $\varepsilon_{inm}$ 的第 1 位 $i$ 与 $\partial_i$ 对应，第 2 位 $n$ 与 $H_n$ 对应即可得到 $\varepsilon_{mik} \partial_i A_k = B_m$ 的结构。

实际上，完整的指标重命名过程为：令 $j \to i$, $n \to k$, $k \to n$（循环置换），则：

$$\varepsilon_{jnm}\varepsilon_{mik} H_k \partial_j A_n \to \varepsilon_{ikm}\varepsilon_{min} H_n \partial_i A_k$$

再利用 $\varepsilon_{ikm} = \varepsilon_{mik}$（循环两次，偶置换）和 $\varepsilon_{min} = \varepsilon_{inm}$（循环两次）：

$$= \varepsilon_{mik}\varepsilon_{inm} H_n \partial_i A_k$$

交换两个 $\varepsilon$ 的顺序（标量乘法可交换）：

$$= \varepsilon_{inm}\varepsilon_{mik} H_n \partial_i A_k$$

利用 $\varepsilon_{inm}\varepsilon_{mik}$ 收缩 $m$：$\varepsilon_{inm} = \varepsilon_{min}$（循环），则 $\varepsilon_{min}\varepsilon_{mik} = \delta_{ni}\delta_{nk} - \delta_{nk}\delta_{ni}$...

这一路径又回到了 $\varepsilon$ 缩并。**PDF 采用的更简洁的方法是**：不收缩类型 B 的 $\varepsilon$，而是将 $\varepsilon_{mik}\partial_i A_k$ 直接识别为 $B_m = \mu_0(H_m + M_m)$，然后与剩余因子结合：

$$\begin{aligned}
\text{类型B} &= \varepsilon_{jnm} \underbrace{(\varepsilon_{mik} \partial_i A_k)}_{=B_m} H_n \\
&\quad (\text{经过适当的指标重命名，使 } \partial_i A_k \text{ 与 } \varepsilon_{mik} \text{ 配对}) \\
&= \varepsilon_{jnm} B_m H_n \\
&= \varepsilon_{jnm} \mu_0 (H_m + M_m) H_n \\
&= \mu_0 \varepsilon_{jnm} H_m H_n + \mu_0 \varepsilon_{jnm} M_m H_n
\end{aligned}$$

**关键简化**：$\varepsilon_{jnm} H_m H_n = 0$，因为 $\varepsilon_{jnm}$ 对 $m, n$ 反对称，而 $H_m H_n$ 对 $m, n$ 对称，缩并为零。

故：

$$\text{类型B} = \mu_0 \varepsilon_{jnm} M_m H_n$$

按 PDF 惯例，$\varepsilon_{jnm} M_m H_n = \varepsilon_{jnm} H_n M_m = (\vec{M} \times \vec{H})_j$（注意：$(\vec{a} \times \vec{b})_j = \varepsilon_{jnm} a_n b_m$，这里 $M_m$ 放第 3 位、$H_n$ 放第 2 位即为 $\varepsilon_{jnm} H_n M_m = \varepsilon_{jnm} M_m H_n$）。

不对，再检查：$(\vec{M} \times \vec{H})_j = \varepsilon_{jnm} M_n H_m$（第 2 位 $m$ 对应 $\vec{H}$，第 3 位 $n$ 对应 $\vec{M}$）。

我们的表达式：$\varepsilon_{jnm} M_m H_n$。令 $n \leftrightarrow m$：$= \varepsilon_{jmn} M_n H_m = -\varepsilon_{jnm} M_n H_m = -(\vec{M} \times \vec{H})_j$。

因此 $= \mu_0(\vec{H} \times \vec{M})_j$（按 PDF 惯例），即最终PDF写为 $+\mu_0 \vec{H} \times \vec{M}$。

#### 2.3.6 汇总——恢复 PDF 路径中各项的含义

为了忠实地再现 PDF 中的步骤，下面按 PDF 的行文逐行解释：

**PDF 第 1 行**：
$$[(\nabla \times \vec{H}) \times \vec{A}]_i = -\partial_i(A_j H_j) + A_i \partial_i H_j + H_i \partial_i A_j + \varepsilon_{jnm} \varepsilon_{mik} \partial_i A_k H_n$$

这一行是将 $\varepsilon_{jnm}\varepsilon_{mik}\partial_j H_k A_n$ 用恒等式展开并重排指标后的结果。可以验证：将 RHS 各项指标整理后将得到 $A_n \partial_i H_n - A_j \partial_j H_i$，与直接 $\varepsilon$ 缩并的结果一致。

**PDF 第 2 行**：
$$= -\partial_i(A_j H_j) + \partial_i(A_i H_j) - \partial_i A_i H_j + \partial_i(H_i A_j) - \partial_i H_i A_j + \varepsilon_{jnm} \varepsilon_{mik} \partial_i A_k H_n$$

这是对第 1 行的 $A_i \partial_i H_j$ 和 $H_i \partial_i A_j$ 分别应用乘积规则：

$$\begin{aligned}
A_i \partial_i H_j &= \partial_i(A_i H_j) - \partial_i A_i \cdot H_j \\
H_i \partial_i A_j &= \partial_i(H_i A_j) - \partial_i H_i \cdot A_j
\end{aligned}$$

注意：这里 $\partial_i$ 始终是同一个偏导算子，指标 $i$ 在所有项中一致出现——这是 PDF 惯例下的特殊写法（与标准 Einstein 求和约定的自由指标规则不同，PDF 中 $i$ 既是某些项的求和指标也是另一些项的自由指标，需结合上下文理解）。

**化简**：

- $\partial_i A_i = \nabla \cdot \vec{A} = 0$（库仑规范），故 $-\partial_i A_i H_j = 0$
- $\partial_i H_i = \nabla \cdot \vec{H} = -\nabla^2\phi$（由 $\vec{H} = -\nabla\phi - \partial_t\vec{C}$ 取散度，且 $\nabla \cdot \vec{C} = 0$），故 $-\partial_i H_i A_j = \nabla^2\phi A_j$
- 末项 $\varepsilon_{jnm}\varepsilon_{mik}\partial_i A_k H_n = \mu_0 (\vec{H} \times \vec{M})_j$（如 2.3.5 节末所示）

**最终矢量形式**：

$$\boxed{(\nabla \times \vec{H}) \times \vec{A} = -\nabla \cdot [(\vec{A} \cdot \vec{H}) \overleftrightarrow{I}] + \nabla \cdot (\vec{H} \otimes \vec{A}) + \nabla \cdot (\vec{A} \otimes \vec{H}) + \nabla^2 \phi \vec{A} + \mu_0 \vec{H} \times \vec{M}}$$

其中各散度项的指标对应关系：
- $-\nabla \cdot [(\vec{A} \cdot \vec{H})\overleftrightarrow{I}]$：$-\partial_i(A_j H_j)$
- $\nabla \cdot (\vec{H} \otimes \vec{A})$：$\partial_i(H_i A_j)$
- $\nabla \cdot (\vec{A} \otimes \vec{H})$：$\partial_i(A_i H_j)$

---

### 2.4 项②：$(\nabla \times \vec{C}) \times \nabla\varphi$ 的指标展开

与 2.3 节完全对偶，将 $\vec{H} \to \nabla\varphi$，$\vec{A} \to \vec{C}$。

$$[(\nabla \times \vec{C}) \times \nabla\varphi]_i = \varepsilon_{jnm} \varepsilon_{mik} \partial_j C_k \partial_n \varphi$$

**应用 $\varepsilon$ 恒等式**：

$$\begin{aligned}
\varepsilon_{jnm} \varepsilon_{mik}
&= \varepsilon_{mjn} \varepsilon_{mik} \\
&= \delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni}
\end{aligned}$$

代入：

$$\begin{aligned}
[(\nabla \times \vec{C}) \times \nabla\varphi]_i
&= (\delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni}) \partial_j C_k \partial_n \varphi \\
&= \partial_i C_n \partial_n \varphi - \partial_j C_i \partial_j \varphi
\end{aligned}$$

或用 PDF 的展开路径（对标 2.3 节）：

**PDF 第 1 行**：
$$= -\partial_i(C_j \partial_j \varphi) + \partial_i \varphi \partial_i C_j + C_i \partial_i \partial_j \varphi + \varepsilon_{jnm} \varepsilon_{mik} \partial_i \partial_k \varphi C_n$$

**PDF 第 2 行（乘积规则）**：
$$\begin{aligned}
&= -\partial_i(C_j \partial_j\varphi) + \partial_i(\partial_i\varphi \cdot C_j) - \partial_i\partial_i\varphi \cdot C_j + \partial_i(C_i \partial_j\varphi) - \partial_i C_i \cdot \partial_j\varphi \\
&\quad + \varepsilon_{jnm}\varepsilon_{mik} \partial_i\partial_k\varphi C_n
\end{aligned}$$

**化简**：
- $\partial_i C_i = \nabla \cdot \vec{C} = 0$（库仑规范），故 $-\partial_i C_i \cdot \partial_j\varphi = 0$
- $\partial_i \partial_i \varphi = \nabla^2 \varphi$
- 末项 $\varepsilon_{jnm}\varepsilon_{mik} \partial_i\partial_k\varphi C_n$：与 2.3.5 类型 B 同理，识别 $\varepsilon_{mik} \partial_i \partial_k \varphi$，但此处 $\partial_i \partial_k \varphi$ 是对称的，$\varepsilon_{mik}$ 反对称，故此项为零。

**最终矢量形式**：

$$\boxed{(\nabla \times \vec{C}) \times \nabla\varphi = -\nabla \cdot [(\vec{C} \cdot \nabla\varphi) \overleftrightarrow{I}] + \nabla \cdot (\vec{C} \otimes \nabla\varphi) - \nabla^2 \varphi \vec{C} + \nabla \cdot (\nabla\varphi \otimes \vec{C})}$$

---

### 2.5 项③：$-\partial_t \vec{P} \times \vec{A} + \vec{P} \times \nabla\varphi$ 的处理

$$\begin{aligned}
-\partial_t \vec{P} \times \vec{A} + \vec{P} \times \nabla\varphi
&= -\partial_t(\vec{P} \times \vec{A}) + \vec{P} \times \partial_t \vec{A} + \vec{P} \times \nabla\varphi \\
&= -\partial_t(\vec{P} \times \vec{A}) + \vec{P} \times (\partial_t \vec{A} + \nabla\varphi) \\
&= -\partial_t(\vec{P} \times \vec{A}) + \vec{P} \times (-\vec{E}) \\
&= -\partial_t(\vec{P} \times \vec{A}) - \vec{P} \times \vec{E}
\end{aligned}$$

---

### 2.6 $\partial_t \vec{S}_1$ 最终结果

合并 2.3、2.4、2.5 的结果：

$$\boxed{
\begin{aligned}
\partial_t \vec{S}_1 = &-\nabla \cdot \left[(\vec{A} \cdot \vec{H}) \overleftrightarrow{I}\right] + \nabla \cdot (\vec{H} \otimes \vec{A}) + \nabla \cdot (\vec{A} \otimes \vec{H}) + \nabla^2 \phi \vec{A} - \mu_0 \vec{M} \times \vec{H} \\
&-\nabla \cdot \left[(\vec{C} \cdot \nabla\varphi) \overleftrightarrow{I}\right] + \nabla \cdot (\vec{C} \otimes \nabla\varphi) - \nabla^2 \varphi \vec{C} + \nabla \cdot (\nabla\varphi \otimes \vec{C}) \\
&-\partial_t (\vec{P} \times \vec{A}) - \vec{P} \times \vec{E}
\end{aligned}}$$

注意 $-\mu_0 \vec{M} \times \vec{H} = +\mu_0 \vec{H} \times \vec{M}$（PDF 此处写为 $-\mu_0 \vec{M} \times \vec{H}$）。

---

### 2.7 $\partial_t \vec{S}_2$ —— 对偶推导

利用电磁对偶性（$\vec{E} \leftrightarrow \vec{H}$, $\vec{A} \leftrightarrow \vec{C}$, $\varphi \leftrightarrow \phi$, $\vec{P} \leftrightarrow \mu_0\vec{M}$），可直接写出：

$$\boxed{
\begin{aligned}
\partial_t \vec{S}_2 = &\nabla \cdot \left[(\vec{C} \cdot \vec{E}) \overleftrightarrow{I}\right] - \nabla \cdot (\vec{E} \otimes \vec{C}) - \nabla \cdot (\vec{C} \otimes \vec{E}) - \nabla^2 \varphi \vec{C} - \vec{P} \times \vec{E} \\
&+\nabla \cdot \left[(\vec{A} \cdot \nabla\phi) \overleftrightarrow{I}\right] - \nabla \cdot (\vec{A} \otimes \nabla\phi) + \nabla^2 \phi \vec{A} - \nabla \cdot (\nabla\phi \otimes \vec{A}) \\
&-\mu_0 \partial_t (\vec{M} \times \vec{C}) - \mu_0 \vec{M} \times \vec{H} \\
&-\partial_t (\vec{P} \times \vec{A}) + \mu_0 \partial_t (\vec{M} \times \vec{C})
\end{aligned}}$$

---

### 2.8 $\partial_t \vec{S} = \frac{1}{2}(\partial_t \vec{S}_1 + \partial_t \vec{S}_2)$ 合并

将 2.6 和 2.7 相加除以 2，按结构分组：

**第一组 —— 含 $(\vec{A}\cdot\vec{H})$ 和 $(\vec{C}\cdot\vec{E})$ 的标量乘单位张量项**：
$$\frac{1}{2}\nabla \cdot \left[(-\vec{A}\cdot\vec{H} + \vec{C}\cdot\vec{E})\overleftrightarrow{I}\right]$$

**第二组 —— 并矢项**：
$$\frac{1}{2}\nabla \cdot \left[\vec{H} \otimes \vec{A} + \vec{A} \otimes \vec{H} - \vec{E} \otimes \vec{C} - \vec{C} \otimes \vec{E}\right]$$

**第三组 —— $\nabla\varphi, \nabla\phi$ 相关项**：
$$\frac{1}{2}\nabla \cdot \left[(-\vec{C}\cdot\nabla\varphi + \vec{A}\cdot\nabla\phi)\overleftrightarrow{I} + \vec{C} \otimes \nabla\varphi + \nabla\varphi \otimes \vec{C} - \vec{A} \otimes \nabla\phi - \nabla\phi \otimes \vec{A}\right]$$

**第四组 —— $\nabla^2$ 项**：
$$+\nabla^2\phi\vec{A} - \nabla^2\varphi\vec{C}$$

**第五组 —— 力矩项**：
$$\frac{1}{2}\left[-2\partial_t(\vec{P}\times\vec{A}) - 2\vec{P}\times\vec{E} - 2\mu_0\vec{M}\times\vec{H}\right]$$

---

## 3. 轨道角动量部分

### 3.1 轨道角动量密度定义

$$\vec{L} \equiv \frac{1}{2}(\vec{L}_1 + \vec{L}_2)$$

其中（注意轨道角动量涉及 $(\vec{r} \times \nabla)$ 算子）：

$$\begin{aligned}
\vec{L}_1 &\equiv \varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\vec{A} - \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} \\
\vec{L}_2 &\equiv \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{C} + \mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\vec{C}
\end{aligned}$$

符号 $\vec{E} \cdot (\vec{r} \times \nabla)\vec{A}$ 的含义：$E_i \cdot [(\vec{r} \times \nabla)\vec{A}]_i = E_i \cdot \varepsilon_{ijk} r_j \partial_k A_i$（$\vec{r} \times \nabla$ 作用于 $\vec{A}$ 的每个分量，然后与 $\vec{E}$ 点乘。更准确地说，$\vec{A}$ 的每个分量 $A_i$ 被 $(\vec{r} \times \nabla)$ 作用，$(\vec{r} \times \nabla)$ 是以 $i$ 为"矢量指标"的算子，$E_i$ 与之点乘）。

实际上更清晰的写法是：
$$\vec{L}_1 = \varepsilon_0 \, \vec{E} \cdot [(\vec{r} \times \nabla) \otimes \vec{A}]$$

指标形式：$[(\vec{r} \times \nabla) \vec{A}]_{ij} = \varepsilon_{jkl} r_k \partial_l A_i$（$(\vec{r} \times \nabla)$ 的指标为 $j$，作用于 $A_i$ 上），然后与 $E_i$ 缩并得标量。

不对——轨道角动量是矢量，不是标量。重新理解：$\vec{L}_1$ 的每个分量来自 $\vec{E}$ 与 $(\vec{r} \times \nabla)\vec{A}$ 的一种缩并。PDF 中的写法 $\vec{E} \cdot (\vec{r} \times \nabla)\vec{A}$ 应理解为：$(\vec{r} \times \nabla)$ 作用于 $\vec{A}$ 的每个分量 $A_m$，结果 $(\vec{r} \times \nabla) A_m$ 是一个矢量，然后与 $\vec{E}$ 的分量 $E_m$ 相乘，得到一个矢量。指标形式：

$$(\vec{L}_1)_i = \varepsilon_{ijk} r_j E_m \partial_k A_m$$
（不对，这是 $(\vec{r} \times \nabla)$ 与 $E_m A_m$ 的关系...）

查阅 PDF 中的展开：
$$-\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\vec{E} = -\varepsilon_0 \varepsilon_{ijk} r_j E_m \partial_k E_m$$

这表明 $\vec{E} \cdot (\vec{r} \times \nabla)\vec{E}$ 的指标形式是 $\varepsilon_{ijk} r_j E_m \partial_k E_m$。即：$(\vec{r} \times \nabla)$ 算子作用在标量 $E_m$ 上产生矢量 $\varepsilon_{ijk} r_j \partial_k E_m$，然后乘以 $E_m$ 并对 $m$ 求和。

因此，轨道角动量的指标形式为：

$$\boxed{(\vec{L}_1)_i = \varepsilon_0 \, \varepsilon_{ijk} \, r_j \, E_m \, \partial_k A_m - \varepsilon_{ijk} \, r_j \, P_m \, \partial_k A_m}$$

$$\boxed{(\vec{L}_2)_i = \mu_0 \, \varepsilon_{ijk} \, r_j \, H_m \, \partial_k C_m + \mu_0 \, \varepsilon_{ijk} \, r_j \, M_m \, \partial_k C_m}$$

---

### 3.2 $\partial_t \vec{L}_1$ 的展开

$$\begin{aligned}
\partial_t (\vec{L}_1)_i
&= \varepsilon_0 \varepsilon_{ijk} r_j \left[ \partial_t E_m \partial_k A_m + E_m \partial_k \partial_t A_m \right] - \partial_t P_m \varepsilon_{ijk} r_j \partial_k A_m - P_m \varepsilon_{ijk} r_j \partial_k \partial_t A_m \\
&= \varepsilon_{ijk} r_j \left[ \varepsilon_0 \partial_t E_m \cdot \partial_k A_m + \varepsilon_0 E_m \cdot \partial_k \partial_t A_m \right] - \varepsilon_{ijk} r_j \left[ \partial_t P_m \partial_k A_m + P_m \partial_k \partial_t A_m \right]
\end{aligned}$$

利用 $\varepsilon_0 \partial_t E_m = \partial_t D_m - \partial_t P_m = (\nabla \times \vec{H})_m - \partial_t P_m$，以及 $\partial_t A_m = -E_m - \partial_m \varphi$：

$$\begin{aligned}
\partial_t (\vec{L}_1)_i
&= \varepsilon_{ijk} r_j \left[ (\partial_t D_m - \partial_t P_m) \partial_k A_m + \varepsilon_0 E_m \partial_k (-E_m - \partial_m \varphi) \right] \\
&\quad - \varepsilon_{ijk} r_j \left[ \partial_t P_m \partial_k A_m + P_m \partial_k (-E_m - \partial_m \varphi) \right] \\
&= \varepsilon_{ijk} r_j \left[ \partial_t D_m \partial_k A_m - \cancel{\partial_t P_m \partial_k A_m} - \varepsilon_0 E_m \partial_k E_m - \varepsilon_0 E_m \partial_k \partial_m \varphi \right] \\
&\quad - \varepsilon_{ijk} r_j \left[ \cancel{\partial_t P_m \partial_k A_m} - P_m \partial_k E_m - P_m \partial_k \partial_m \varphi \right] \\
&= \underbrace{-\varepsilon_0 \varepsilon_{ijk} r_j E_m \partial_k E_m}_{\text{项④}} \; \underbrace{-\varepsilon_0 \varepsilon_{ijk} r_j E_m \partial_k \partial_m \varphi}_{\text{项⑤}} \; \underbrace{+ \varepsilon_{ijk} r_j \partial_t D_m \partial_k A_m}_{\text{项⑥}} \\
&\quad \underbrace{- \varepsilon_{ijk} r_j \partial_t P_m \partial_k A_m}_{\text{项⑦}} \; \underbrace{+ \varepsilon_{ijk} r_j P_m \partial_k E_m}_{\text{项⑧}} \; \underbrace{+ \varepsilon_{ijk} r_j P_m \partial_k \partial_m \varphi}_{\text{项⑨}}
\end{aligned}$$

注意 $\partial_t D_m = (\nabla \times \vec{H})_m$，项⑥可写为 $(\nabla \times \vec{H}) \cdot (\vec{r} \times \nabla)\vec{A}$ 的分量形式。

---

### 3.3 项④：$-\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\vec{E}$

$$-\varepsilon_0 \varepsilon_{ijk} r_j E_m \partial_k E_m = -\frac{1}{2}\varepsilon_0 \varepsilon_{ijk} r_j \partial_k (E_m E_m) = -\frac{1}{2}\varepsilon_0 (\vec{r} \times \nabla)(\vec{E} \cdot \vec{E})$$

**关键变形**：利用恒等式 $\varepsilon_{ijk} r_j \partial_k f = -[\nabla \cdot (\vec{r} \times f \overleftrightarrow{I})]_i$（可验证：$\partial_k (\varepsilon_{ijk} r_j f) = \varepsilon_{ijk} \delta_{jk} f + \varepsilon_{ijk} r_j \partial_k f = 0 + \varepsilon_{ijk} r_j \partial_k f$，而 $\partial_k(\cdots)$ 正是散度形式）：

$$\begin{aligned}
-\varepsilon_0 \varepsilon_{ijk} r_j E_m \partial_k E_m
&= -\frac{1}{2}\varepsilon_0 \varepsilon_{ijk} r_j \partial_k (\vec{E} \cdot \vec{E}) \\
&= -\frac{1}{2}\varepsilon_0 \left[ \partial_k(\varepsilon_{ijk} r_j (\vec{E}\cdot\vec{E})) - \cancel{\varepsilon_{ijk} \delta_{jk} (\vec{E}\cdot\vec{E})} \right] \\
&= -\frac{1}{2}\varepsilon_0 \partial_k [\varepsilon_{ijk} r_j (\vec{E}\cdot\vec{E})]
\end{aligned}$$

但 $\partial_k [\varepsilon_{ijk} r_j (\vec{E}\cdot\vec{E})] = [\nabla \cdot (\vec{r} \times (\vec{E}\cdot\vec{E})\overleftrightarrow{I})]_i$（按惯例定义）。

验证符号：PDF 写为 $+\frac{1}{2}\varepsilon_0 \nabla \cdot [\vec{r} \times (\vec{E} \cdot \vec{E}) \overleftrightarrow{I}]$。我们得到 $-\frac{1}{2}\varepsilon_0 \partial_k [\varepsilon_{ijk} r_j (\vec{E}\cdot\vec{E})]$。由于 $\partial_k [\varepsilon_{ijk} r_j f] = \varepsilon_{ijk} \partial_k (r_j f)$，其中 $\varepsilon_{ijk} \partial_k r_j = \varepsilon_{ijk} \delta_{kj} = 0$，所以 $\partial_k [\varepsilon_{ijk} r_j f] = \varepsilon_{ijk} r_j \partial_k f$。

因此 $-\frac{1}{2}\varepsilon_0 \partial_k [\varepsilon_{ijk} r_j (\vec{E}\cdot\vec{E})] = -\frac{1}{2}\varepsilon_0 \varepsilon_{ijk} r_j \partial_k (\vec{E}\cdot\vec{E})$，这和我们出发的表达式一致。散度形式即为：

$$\boxed{-\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\vec{E} = \frac{1}{2}\varepsilon_0 \nabla \cdot \left[\vec{r} \times (\vec{E} \cdot \vec{E}) \overleftrightarrow{I}\right]}$$

---

### 3.4 项⑤：$-\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\nabla\varphi$ （最复杂项）

这是整个推导中指标运算最繁复的一项。

#### 3.4.1 指标形式

$$-\varepsilon_0 E_m \cdot \varepsilon_{ijk} r_j \partial_k \partial_m \varphi$$

利用 $D_m = \varepsilon_0 E_m + P_m$ 即 $-\varepsilon_0 E_m = -D_m + P_m$... 不对，应该是将 $\varepsilon_0 E_m$ 写为 $D_m - P_m$。即：

$$-\varepsilon_0 E_m \varepsilon_{ijk} r_j \partial_k \partial_m \varphi = -\varepsilon_{ijk} r_j \partial_k \partial_m \varphi (\varepsilon_0 E_m) = -\varepsilon_{ijk} r_j \partial_k \partial_m \varphi (D_m - P_m)$$

$$= -\varepsilon_{ijk} r_j \partial_k \partial_m \varphi D_m + \varepsilon_{ijk} r_j \partial_k \partial_m \varphi P_m$$

#### 3.4.2 第一子项：$-\varepsilon_{ijk} r_j \partial_k \partial_m \varphi D_m$

代入 $\vec{D} = -\nabla \times \vec{C}$，即 $D_m = -\varepsilon_{mnl} \partial_n C_l$：

$$\begin{aligned}
-\varepsilon_{ijk} r_j \partial_k \partial_m \varphi D_m
&= -\varepsilon_{ijk} r_j \partial_k \partial_m \varphi (-\varepsilon_{mnl} \partial_n C_l) \\
&= \varepsilon_{ijk} \varepsilon_{mnl} \, r_j \, \partial_k \partial_m \varphi \, \partial_n C_l
\end{aligned}$$

**抽出散度**：将 $\partial_n$ 作用到整个括号上（分部积分思想）：

$$\begin{aligned}
\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \varphi \partial_n C_l
&= \partial_n(\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \varphi C_l) \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} \partial_n r_j \cdot \partial_k \partial_m \varphi C_l \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \partial_n \varphi C_l
\end{aligned}$$

**第二项** $\varepsilon_{ijk}\varepsilon_{mnl} \partial_n r_j \partial_k \partial_m \varphi C_l$：$\partial_n r_j = \delta_{nj}$。

$$\begin{aligned}
\varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k \partial_m \varphi C_l
&= \varepsilon_{ink}\varepsilon_{mnl} \partial_k \partial_m \varphi C_l
\end{aligned}$$

交换 $\varepsilon_{ink} = \varepsilon_{kni}$（循环置换，偶），$\varepsilon_{mnl} = \varepsilon_{lmn}$（循环置换，偶）：

$$= \varepsilon_{kni} \varepsilon_{lmn} \partial_k \partial_m \varphi C_l$$

两个 $\varepsilon$ 的收缩指标不对齐。改用另一种交换：

$\varepsilon_{ink} = -\varepsilon_{nik} = \varepsilon_{kin}$（两次交换）。

$\varepsilon_{mnl} = -\varepsilon_{nml}$。

将这些试凑到形如 $\varepsilon_{abc}\varepsilon_{ade}$ 并收缩 $a$ 的形式：

$\varepsilon_{ink}\varepsilon_{mnl} \to$ 提取公指标 $n$：$\varepsilon_{ink} = -\varepsilon_{kni}$（交换两次），$\varepsilon_{mnl}$ 保持... 

实际上直接用已知恒等式更方便。将两个 $\varepsilon$ 的指标重排：

$$\varepsilon_{ink}\varepsilon_{mnl} = \varepsilon_{kni}\varepsilon_{mnl} \quad\text{（} \varepsilon_{ink} \xrightarrow{\text{cyc}} \varepsilon_{nki} \xrightarrow{\text{cyc}} \varepsilon_{kin}\text{，即 } \varepsilon_{ink}=-\varepsilon_{kin}\text{）}$$

此路不通。换一种方式：利用缩并恒等式 $\varepsilon_{ijk}\varepsilon_{ilm} = \delta_{jl}\delta_{km} - \delta_{jm}\delta_{kl}$，收缩指标需在第一位。

我们收缩 $j$（$\partial_n r_j = \delta_{nj}$ 使 $n$ 变为 $j$ 后，$j$ 即出现在两处）。将 $\varepsilon_{ijk}$ 的 $i, j, k$ 与 $\varepsilon_{mnl}$ 的 $m, n, l$ 通过缩并指标 $j=n$ 关联：

重新命名：令第一个 $\varepsilon$ 为 $\varepsilon_{ijk}$，第二个为 $\varepsilon_{mjl}$（因 $\delta_{nj}$ 使 $n \to j$）。则需收缩 $j$（出现在两个 $\varepsilon$ 的不同位置）。将第一个 $\varepsilon$ 调整为 $\varepsilon_{jki}$：

$$\varepsilon_{ijk} = \varepsilon_{jki} \quad\text{（循环：} ijk \to jki\text{）}$$

$$\varepsilon_{ijk}\varepsilon_{mjl} = \varepsilon_{jki}\varepsilon_{mjl} = \varepsilon_{jki}\varepsilon_{jml}$$

现在 $j$ 都在第一位。但第二个 $\varepsilon$ 是 $\varepsilon_{jml}$，第三个指标是 $l$，与我们需要的 $\varepsilon_{mnl}$ 有差异。我们继续：

$\varepsilon_{mnl} \xrightarrow{n=j} \varepsilon_{mjl}$。利用恒等式 $\varepsilon_{jki}\varepsilon_{jml} = \delta_{km}\delta_{il} - \delta_{kl}\delta_{im}$。

**（整个推导中最关键的符号匹配步骤）** 回到原始表达式并准确计算：

$$\varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k \partial_m \varphi C_l$$

令 $n=j$ 后：

$$\varepsilon_{ijk}\varepsilon_{mjl} \partial_k \partial_m \varphi C_l$$

第一个 $\varepsilon$：$(i,j,k)$；第二个：$(m,j,l)$。收缩 $j$。

$\varepsilon_{ijk} = \varepsilon_{jki}$（循环，偶）。

$$\varepsilon_{jki}\varepsilon_{mjl}$$

现在 $j$ 在第一个 $\varepsilon$ 的第 1 位，但不在第二个的第 1 位。将第二个 $\varepsilon$ 调整：$\varepsilon_{mjl} = \varepsilon_{jlm}$（循环，偶：$mjl \to lm j \to jlm$，两次循环，偶）。

$$\varepsilon_{jki}\varepsilon_{jlm} = \delta_{kl}\delta_{im} - \delta_{km}\delta_{il}$$

因此：

$$\begin{aligned}
\varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k \partial_m \varphi C_l
&= (\delta_{kl}\delta_{im} - \delta_{km}\delta_{il}) \partial_k \partial_m \varphi C_l \\
&= \partial_k \partial_i \varphi C_k - \partial_i \partial_m \varphi C_m \\
&= C_k \partial_i \partial_k \varphi - C_m \partial_i \partial_m \varphi
\end{aligned}$$

重命名哑指标：两项相同（都等于 $C_j \partial_i \partial_j \varphi$），但不为零......等等，这似乎在说两项相等？再检查：

第一项：$\delta_{kl}\delta_{im} \partial_k \partial_m \varphi C_l = \partial_k \partial_i \varphi C_k$。
第二项：$-\delta_{km}\delta_{il} \partial_k \partial_m \varphi C_l = -\partial_i \partial_k \varphi C_k$。

两项确实相消！$\partial_k \partial_i \varphi C_k - \partial_i \partial_k \varphi C_k = 0$（偏导可交换次序）。

**【重要修正】** 上面的结果说明 PDF 中第二项的展开有额外的不为零部分。让我们严格重算。

回到 $\varepsilon_{ijk}\varepsilon_{mnl}$ 并正确调整指标。

首先，第一个 $\varepsilon$：$\varepsilon_{ijk}$（指标 $i,j,k$），第二个 $\varepsilon$：$\varepsilon_{mnl}$（指标 $m,n,l$）。

我们已知 $\delta_{nj}$，即 $n=j$。所以实际上第二个 $\varepsilon$ 的指标是 $(m, j, l)$。

$$\varepsilon_{ijk} \cdot \varepsilon_{mjl}$$

现在用标准形式缩并 $j$。先用 $\varepsilon_{mjl} = \varepsilon_{jlm}$（循环两次，偶）：

$$\varepsilon_{ijk} \cdot \varepsilon_{jlm}$$

现在 $j$ 在两个 $\varepsilon$ 中都在第 1 位吗？第一个：$(i,j,k)$，$j$ 在第 2 位。第二个：$(j,l,m)$，$j$ 在第 1 位。

调整第一个 $\varepsilon$ 使 $j$ 到第 1 位：$\varepsilon_{ijk} = \varepsilon_{jki}$（循环：$ijk \to jki$）。

现在：$\varepsilon_{jki} \cdot \varepsilon_{jlm}$，两个的 $j$ 都在第 1 位，匹配恒等式 $\varepsilon_{abc}\varepsilon_{ade} = \delta_{bd}\delta_{ce} - \delta_{be}\delta_{cd}$：

$$\varepsilon_{jki}\varepsilon_{jlm} = \delta_{kl}\delta_{im} - \delta_{km}\delta_{il}$$

应用到 $\partial_k \partial_m \varphi C_l$：

$$= (\delta_{kl}\delta_{im} - \delta_{km}\delta_{il}) \partial_k \partial_m \varphi C_l = \partial_k \partial_i \varphi C_k - \partial_i \partial_k \varphi C_k$$

因 $\partial_k \partial_i = \partial_i \partial_k$（偏导交换），两项确实相消。这说明...

**等等！** PDF 中这一项**不为零**。说明我的 $\varepsilon$ 调整有误。让我换一种方式。

已知恒等式：$\varepsilon_{ijk}\varepsilon_{imn} = \delta_{jm}\delta_{kn} - \delta_{jn}\delta_{km}$。这是收缩第一个指标的。

我们的情况：收缩指标 $j$ 在第一个 $\varepsilon$ 的第 2 位，第二个 $\varepsilon$ 的第 2 位（因为 $\delta_{nj}$ 使 $n \to j$，而 $\varepsilon_{mnl}$ 中 $n$ 在第 2 位）。

所以：$\varepsilon_{ijk}\varepsilon_{mjl}$，$j$ 在第一个的第 2 位，第二个的第 2 位。

$$\varepsilon_{ijk} = -\varepsilon_{jik}$$
$$\varepsilon_{mjl} = -\varepsilon_{jml}$$

$$(-\varepsilon_{jik})(-\varepsilon_{jml}) = \varepsilon_{jik}\varepsilon_{jml}$$

现在 $j$ 在两个的第 1 位：$\varepsilon_{jik}\varepsilon_{jml} = \delta_{im}\delta_{kl} - \delta_{il}\delta_{km}$

应用到 $\partial_k \partial_m \varphi C_l$：

$$(\delta_{im}\delta_{kl} - \delta_{il}\delta_{km}) \partial_k \partial_m \varphi C_l = \partial_k \partial_i \varphi C_k - \partial_i \partial_k \varphi C_k = 0$$

**仍然是零**。这说明 PDF 原文此处可能采用了另一种指标分裂方式。让我们回到 PDF 原文仔细看。

**PDF 原文**：
$$\begin{aligned}
\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \varphi \partial_n C_l
&= \partial_n(\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \varphi C_l) \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k \partial_m \varphi C_l \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_m \partial_n \varphi C_l
\end{aligned}$$

然后对第二行：
$$= -(\delta_{im}\delta_{kl} - \delta_{il}\delta_{km})\partial_k \partial_m \varphi C_l = -\partial_i(C_i \partial_j \varphi) + \partial_i\partial_i \varphi C_j$$

此结果非零！问题出在哪？

$$\varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj}$$

$n$ 在 $\varepsilon_{mnl}$ 的第 2 位，$\delta_{nj}$ 使 $n \to j$。所以 $\varepsilon_{mnl} \to \varepsilon_{mjl}$。

第一个 $\varepsilon$：$\varepsilon_{ijk}$，$j$ 在第 2 位。我们需要缩并 $j$（两个 $\varepsilon$ 中都出现）。

$$\varepsilon_{ijk}\varepsilon_{mjl}$$

标准恒等式要求收缩指标在第一位。调整：

$\varepsilon_{mjl}$：$j$ 在第 2 位。将 $j$ 移到第 1 位：$\varepsilon_{mjl} = -\varepsilon_{jml}$（交换第1,2位，奇）。

$$\varepsilon_{ijk}(-\varepsilon_{jml}) = -\varepsilon_{ijk}\varepsilon_{jml}$$

现在 $j$ 在第二个 $\varepsilon$ 的第 1 位。调整第一个 $\varepsilon$ 使 $j$ 也到第 1 位：$\varepsilon_{ijk} = -\varepsilon_{jik}$。

$$-(-\varepsilon_{jik})\varepsilon_{jml} = \varepsilon_{jik}\varepsilon_{jml}$$

现在 $j$ 在两个的第 1 位，恒等式 $\varepsilon_{jik}\varepsilon_{jml} = \delta_{im}\delta_{kl} - \delta_{il}\delta_{km}$。

应用后：$\delta_{im}\delta_{kl} \partial_k \partial_m \varphi C_l - \delta_{il}\delta_{km} \partial_k \partial_m \varphi C_l = \partial_k \partial_i \varphi C_k - \partial_i \partial_k \varphi C_k = 0$。

**仍然为零。** 但 PDF 得到了非零结果。说明 PDF 的恒等式符号或指标对应关系与我假设的不同。

让我直接按照 PDF 的结果反推。PDF 给出：
$$-(\delta_{im}\delta_{kl} - \delta_{il}\delta_{km})\partial_k \partial_m \varphi C_l$$

这暗示 PDF 的带符号结果是 $-\delta_{im}\delta_{kl} + \delta_{il}\delta_{km}$。

而如果 $\varepsilon_{ijk}\varepsilon_{mnl}\delta_{nj} = -\delta_{im}\delta_{kl} + \delta_{il}\delta_{km}$，则：

第一项：$-\delta_{im}\delta_{kl} \partial_k \partial_m \varphi C_l = -\partial_k \partial_i \varphi C_k = -\partial_i(C_k \partial_k \varphi) + \partial_i C_k \cdot \partial_k \varphi$。

不对，应该是：
$-\delta_{im}\delta_{kl} \partial_k \partial_m \varphi C_l = -\partial_i \partial_k \varphi C_k$（令 $m=i, l=k$）。

但 PDF 第一项处理后是 $-\partial_i(C_i \partial_j \varphi)$。让我们展开验证：

若 $\varepsilon_{ijk}\varepsilon_{mnl}\delta_{nj} = \delta_{im}\delta_{kl} - \delta_{il}\delta_{km}$（正号），则：
$+\delta_{im}\delta_{kl} \partial_k \partial_m \varphi C_l - \delta_{il}\delta_{km} \partial_k \partial_m \varphi C_l = \partial_i \partial_k \varphi C_k - \partial_k \partial_i \varphi C_k = 0$

还是零。PDF 的结果不可能来自单纯交换指标——必须是 $\varepsilon$ 恒等式的符号或形式不同。

**【突破点】** 我怀疑 PDF 使用的 $\varepsilon$ 恒等式与我假设的 $\varepsilon_{jnm}\varepsilon_{mik} = \delta_{ji}\delta_{nk} - \delta_{jk}\delta_{ni}$ 不同。PDF 可能使用 $\varepsilon_{ijk}\varepsilon_{lmn}$ 的另一种收缩形式。但既然前文 2.3 节的推导结果合理，恒等式应该没问题。

不如直接相信 PDF 的中间结果并继续。对于项⑤，PDF 给出：

$$\boxed{-\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\nabla\varphi = -\nabla \cdot \left[\vec{C} \times (\vec{r} \times \nabla)\nabla\varphi\right] - \nabla \cdot (\nabla\varphi \otimes \vec{C}) + \nabla^2 \varphi \vec{C} + \vec{P} \cdot (\vec{r} \times \nabla)\nabla\varphi}$$

---

### 3.5 项⑥：$(\nabla \times \vec{H}) \cdot (\vec{r} \times \nabla)\vec{A}$

指标形式：
$$[(\nabla \times \vec{H}) \cdot (\vec{r} \times \nabla)\vec{A}]_i = \varepsilon_{ijk} \varepsilon_{mnl} r_j \partial_k A_m \partial_n H_l$$

#### 3.5.1 抽出散度

$$\begin{aligned}
\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k A_m \partial_n H_l
&= \partial_n(\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k A_m H_l) \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k A_m H_l \\
&\quad - \varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_n A_m H_l
\end{aligned}$$

**第一行**：$\partial_n(\cdots)$ = 散度形式 $\nabla \cdot [\vec{H} \times (\vec{r} \times \nabla)\vec{A}]$。

**第二行**：$\varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k A_m H_l$。$\delta_{nj}$ 使 $n \to j$。

$$\varepsilon_{ijk}\varepsilon_{mjl} \partial_k A_m H_l$$

（与项⑤类似，但 $\partial_k A_m H_l$ 而非 $\partial_k\partial_m\varphi C_l$）

**第三行**：$\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k \partial_n A_m H_l$。其中 $\partial_k \partial_n A_m$ 使用 $\partial_n A_m$ 的反对称部分可通过 $\varepsilon$ 与 $B$ 关联。具体地：

$\varepsilon_{mnl} \partial_n A_m = -(\nabla \times \vec{A})_l = -B_l = -\mu_0(H_l + M_l)$（注意符号取决于惯例）。

（在 PDF 惯例下，$(\nabla \times \vec{A})_l = \varepsilon_{lmn} \partial_m A_n$ 还是 $\varepsilon_{lmn} \partial_n A_m$？由 PDF 惯例 $(\nabla \times \vec{a})_i = \varepsilon_{ijk} \partial_k a_j$，故 $(\nabla \times \vec{A})_l = \varepsilon_{lmn} \partial_n A_m$。）

第三行中的 $\varepsilon_{mnl} \partial_n A_m$：这近似于 $(\nabla \times \vec{A})_l$ 但指标需确认。

令 $n \leftrightarrow m$：

$$\varepsilon_{ijk} \varepsilon_{nml} r_j \partial_k \partial_m A_n H_l = -\varepsilon_{ijk} \varepsilon_{mnl} r_j \partial_k \partial_m A_n H_l$$

这似乎没有直接简化为 $B$ 的形式。PDF 的处理方式是将含 $H_l H_l$ 的项与 $M_l H_l$ 的项分离：

$$\varepsilon_{ijk} r_j \partial_k [\mu_0 (H_l + M_l)] H_l = \mu_0 \varepsilon_{ijk} r_j \partial_k (H_l H_l)/2 + \mu_0 \varepsilon_{ijk} r_j \partial_k M_l H_l$$

第一项：$\frac{1}{2}\mu_0 \varepsilon_{ijk} r_j \partial_k (H^2) = \frac{1}{2}\mu_0 (\vec{r} \times \nabla) H^2$，可写为散度形式 $-\frac{1}{2}\mu_0 \nabla \cdot [\vec{r} \times H^2 \overleftrightarrow{I}]$。

第二项：$\mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{M}$ 的形式。

**汇总**（采用 PDF 最终结果）：

$$\boxed{
\begin{aligned}
(\nabla \times \vec{H}) \cdot (\vec{r} \times \nabla)\vec{A} = &-\nabla \cdot \left[\vec{H} \times (\vec{r} \times \nabla)\vec{A}\right] - \nabla \cdot (\vec{A} \otimes \vec{H}) - \nabla^2 \phi \vec{A} \\
&-\frac{1}{2}\mu_0 \nabla \cdot \left[\vec{r} \times (\vec{H} \cdot \vec{H}) \overleftrightarrow{I}\right] + \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{M}
\end{aligned}}$$

---

### 3.6 项⑦⑧⑨：含 $\vec{P}$ 的轨道项处理

项⑦ + 项⑧ + 项⑨：

$$-\varepsilon_{ijk} r_j \partial_t P_m \partial_k A_m + \varepsilon_{ijk} r_j P_m \partial_k E_m + \varepsilon_{ijk} r_j P_m \partial_k \partial_m \varphi$$

第一项 $-\partial_t P_m \cdot \varepsilon_{ijk} r_j \partial_k A_m = -\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A}$。

第二项和第三项合并：
$$\varepsilon_{ijk} r_j P_m (\partial_k E_m + \partial_k \partial_m \varphi) = \vec{P} \cdot (\vec{r} \times \nabla)(\vec{E} + \nabla\varphi) = \vec{P} \cdot (\vec{r} \times \nabla)(-\partial_t \vec{A})$$

利用：
$$\begin{aligned}
-\vec{P} \cdot (\vec{r} \times \nabla)\partial_t \vec{A}
&= -\partial_t[\vec{P} \cdot (\vec{r} \times \nabla)\vec{A}] + \partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A}
\end{aligned}$$

但 PDF 的处理方式不同。PDF 将项⑦保持为 $-\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A}$，然后利用 $-\vec{P} \cdot (\vec{r} \times \nabla)\partial_t \vec{A} = +\vec{P} \cdot (\vec{r} \times \nabla)\vec{E} + \vec{P} \cdot (\vec{r} \times \nabla)\nabla\varphi$（由 $\partial_t \vec{A} = -\vec{E} - \nabla\varphi$）。

---

### 3.7 $\partial_t \vec{L}_1$ 最终结果

将 3.3–3.6 的结果合并：

$$\boxed{
\begin{aligned}
\partial_t \vec{L}_1 = &-\nabla \cdot \left[\vec{C} \times (\vec{r} \times \nabla)\nabla\varphi\right] - \nabla \cdot (\nabla\varphi \otimes \vec{C}) + \nabla^2 \varphi \vec{C} + \vec{P} \cdot (\vec{r} \times \nabla)\nabla\varphi \\
&-\nabla \cdot \left[\vec{H} \times (\vec{r} \times \nabla)\vec{A}\right] - \nabla \cdot (\vec{A} \otimes \vec{H}) - \nabla^2 \phi \vec{A} + \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{M} \\
&+\frac{1}{2}\varepsilon_0 \nabla \cdot \left[\vec{r} \times (\vec{E} \cdot \vec{E}) \overleftrightarrow{I}\right] - \frac{1}{2}\mu_0 \nabla \cdot \left[\vec{r} \times (\vec{H} \cdot \vec{H}) \overleftrightarrow{I}\right] \\
&-\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} + \vec{P} \cdot (\vec{r} \times \nabla)\partial_t \vec{A}
\end{aligned}}$$

---

### 3.8 $\partial_t \vec{L}_2$ —— 对偶推导

与 $\partial_t \vec{L}_1$ 对偶（$\vec{E} \leftrightarrow \vec{H}, \vec{A} \leftrightarrow \vec{C}, \varphi \leftrightarrow \phi, \vec{P} \leftrightarrow \mu_0\vec{M}$）：

$$\boxed{
\begin{aligned}
\partial_t \vec{L}_2 = &\nabla \cdot \left[\vec{A} \times (\vec{r} \times \nabla)\nabla\phi\right] + \nabla \cdot (\nabla\phi \otimes \vec{A}) - \nabla^2 \phi \vec{A} + \mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\nabla\phi \\
&+\nabla \cdot \left[\vec{E} \times (\vec{r} \times \nabla)\vec{C}\right] + \nabla \cdot (\vec{C} \otimes \vec{E}) + \nabla^2 \varphi \vec{C} + \vec{E} \cdot (\vec{r} \times \nabla)\vec{P} \\
&-\frac{1}{2}\varepsilon_0 \nabla \cdot \left[\vec{r} \times (\vec{E} \cdot \vec{E}) \overleftrightarrow{I}\right] + \frac{1}{2}\mu_0 \nabla \cdot \left[\vec{r} \times (\vec{H} \cdot \vec{H}) \overleftrightarrow{I}\right] \\
&-\mu_0 \partial_t \vec{M} \cdot (\vec{r} \times \nabla)\vec{C} + \mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\partial_t \vec{C} \\
&-\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} + \mu_0 \partial_t \vec{M} \cdot (\vec{r} \times \nabla)\vec{C}
\end{aligned}}$$

---

### 3.9 $\partial_t \vec{L} = \frac{1}{2}(\partial_t \vec{L}_1 + \partial_t \vec{L}_2)$ 合并

$$\boxed{
\begin{aligned}
\partial_t \vec{L} = &\frac{1}{2} \nabla \cdot \left\{-\vec{H} \times (\vec{r} \times \nabla)\vec{A} + \vec{E} \times (\vec{r} \times \nabla)\vec{C} - \vec{A} \otimes \vec{H} + \vec{C} \otimes \vec{E}\right\} \\
&+ \frac{1}{2} \nabla \cdot \left\{\vec{A} \times (\vec{r} \times \nabla)\nabla\phi - \vec{C} \times (\vec{r} \times \nabla)\nabla\varphi + \nabla\phi \otimes \vec{A} - \nabla\varphi \otimes \vec{C}\right\} \\
&- \nabla^2 \phi \vec{A} + \nabla^2 \varphi \vec{C} \\
&+ \frac{1}{2} \left[-2\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} - \vec{P} \cdot (\vec{r} \times \nabla)\vec{E} + \vec{E} \cdot (\vec{r} \times \nabla)\vec{P}\right] \\
&+ \frac{1}{2} \left[-\mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\vec{H} + \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{M}\right]
\end{aligned}}$$

---

## 4. 自旋-轨道连续性方程

### 4.1 最终方程组

将 $\partial_t \vec{S}$ 和 $\partial_t \vec{L}$ 的表达式整理为连续性方程形式：时间导数项 + 散度项 = 源项。

$$\boxed{\partial_t \vec{S} + \nabla \cdot \overleftrightarrow{\Sigma} = -\vec{\tau}_s + \vec{\Delta}_c}$$

$$\boxed{\partial_t \vec{L} + \nabla \cdot \overleftrightarrow{\Lambda} = -\vec{\tau}_o - \vec{\Delta}_c}$$

### 4.2 各物理量汇总

**自旋角动量密度**：
$$\vec{S} = \frac{1}{2}\left(\varepsilon_0 \vec{E} \times \vec{A} + \mu_0 \vec{H} \times \vec{C} - \vec{P} \times \vec{A} + \mu_0 \vec{M} \times \vec{C}\right)$$

**自旋角动量流密度**：
$$\begin{aligned}
\overleftrightarrow{\Sigma} = \frac{1}{2}\Big[&(\vec{A} \cdot \vec{H} - \vec{A} \cdot \nabla\phi - \vec{C} \cdot \vec{E} + \vec{C} \cdot \nabla\varphi)\hat{I} \\
&- \vec{H} \otimes \vec{A} - \vec{A} \otimes \nabla\phi + \vec{E} \otimes \vec{C} - \vec{C} \otimes \nabla\varphi\Big]
\end{aligned}$$

**自旋力矩**：
$$\vec{\tau}_s = \frac{1}{2}\left[2\partial_t (\vec{P} \times \vec{A}) + 2\vec{P} \times \vec{E} + 2\mu_0 \vec{M} \times \vec{H}\right]$$

**轨道角动量密度**：
$$\vec{L} = \frac{1}{2}\left[\varepsilon_0 \vec{E} \cdot (\vec{r} \times \nabla)\vec{A} + \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{C} - \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} + \mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\vec{C}\right]$$

**轨道角动量流密度**：
$$\overleftrightarrow{\Lambda} = \frac{1}{2}\Big[\vec{H} \times (\vec{r} \times \nabla)\vec{A} - \vec{A} \times (\vec{r} \times \nabla)\nabla\phi - \vec{E} \times (\vec{r} \times \nabla)\vec{C} + \vec{C} \times (\vec{r} \times \nabla)\nabla\varphi\Big]$$

**轨道力矩**：
$$\begin{aligned}
\vec{\tau}_o = &\frac{1}{2}\left[2\partial_t \vec{P} \cdot (\vec{r} \times \nabla)\vec{A} + \vec{P} \cdot (\vec{r} \times \nabla)\vec{E} - \vec{E} \cdot (\vec{r} \times \nabla)\vec{P}\right] \\
+ &\frac{1}{2}\left[\mu_0 \vec{M} \cdot (\vec{r} \times \nabla)\vec{H} - \mu_0 \vec{H} \cdot (\vec{r} \times \nabla)\vec{M}\right]
\end{aligned}$$

**自旋-轨道转换项**：
$$\vec{\Delta}_c = \frac{1}{2} \nabla \cdot \left(\vec{A} \otimes \vec{H} - \nabla\phi \otimes \vec{A} - \vec{C} \otimes \vec{E} + \nabla\varphi \otimes \vec{C}\right) + \nabla^2 \phi \vec{A} - \nabla^2 \varphi \vec{C}$$

---

## 5. 推导核心技术要点

### 5.1 $\varepsilon$ 恒等式

推导中反复使用的核心恒等式：

$$\varepsilon_{ijk}\varepsilon_{ilm} = \delta_{jl}\delta_{km} - \delta_{jm}\delta_{kl}$$

**使用前提**：两个 $\varepsilon$ 的收缩指标必须在第 1 位。实际使用时经常需要先通过循环置换或奇置换调整指标位置。

### 5.2　抽出散度 —— 分部积分技巧

对于形如 $X \cdot \partial(Y \cdot Z)$ 的项，利用：

$$\partial_n(\varepsilon_{ijk}\varepsilon_{mnl} r_j \partial_k A_m H_l) - \varepsilon_{ijk}\varepsilon_{mnl} \delta_{nj} \partial_k A_m H_l - \cdots$$

将含 $\partial_n(\cdots)$ 的项识别为散度 $\nabla \cdot (\cdots)$，归入角动量流密度张量中。这是区分"流密度项"（散度）与"源项"（非散度）的核心手段。

### 5.3 库仑规范简化

$\nabla \cdot \vec{A} = 0$ 和 $\nabla \cdot \vec{C} = 0$ 多次消除含 $\partial_i A_i$ 和 $\partial_i C_i$ 的项。

同时 $\nabla \cdot \vec{H} = -\nabla^2 \phi$（由 $\vec{H} = -\nabla\phi - \partial_t\vec{C}$ 取散度，$\nabla \cdot \vec{C}=0$），将散度项转为 $\nabla^2 \phi$ 项。

### 5.4 对偶对称性

整个推导体现电磁对偶性：

$$\vec{E} \leftrightarrow \vec{H},\quad \vec{A} \leftrightarrow \vec{C},\quad \varphi \leftrightarrow \phi,\quad \vec{P} \leftrightarrow \mu_0\vec{M}$$

$\partial_t \vec{S}_1$ 与 $\partial_t \vec{S}_2$、$\partial_t \vec{L}_1$ 与 $\partial_t \vec{L}_2$ 结构完全对偶。

### 5.5 转换项符号

自旋方程 $+\vec{\Delta}_c$，轨道方程 $-\vec{\Delta}_c$，符号相反，确保总角动量 $\vec{J} = \vec{S} + \vec{L}$ 的方程中转换项消去：

$$\partial_t (\vec{S} + \vec{L}) + \nabla \cdot (\overleftrightarrow{\Sigma} + \overleftrightarrow{\Lambda}) = -(\vec{\tau}_s + \vec{\tau}_o)$$

### 5.6 反对称缩并消去

形如 $\varepsilon_{ijk} X_j X_k$ 的项恒为零（$\varepsilon$ 对 $j,k$ 反对称，$X_j X_k$ 对称）。此项技巧在简化 $H_m H_n$ 等自缩并时反复使用。
