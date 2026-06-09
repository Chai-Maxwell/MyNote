# 角动量算符 $\hat{L}_{z}$ 的性质与矩阵表示

## 1. 态矢量的基矢展开

设体系的态矢量用二分量的旋量表示：

$$
|\psi\rangle = \begin{pmatrix} |\uparrow\rangle \\ |\downarrow\rangle \end{pmatrix}
$$

更明确地，将态矢量在正交归一基 $\{|\uparrow\rangle, |\downarrow\rangle\}$ 下展开：

$$
|\psi\rangle = a|\uparrow\rangle + b|\downarrow\rangle
\quad \longleftrightarrow \quad
|\psi\rangle \doteq \begin{pmatrix} a \\ b \end{pmatrix}
$$

其中 $a = \langle\uparrow|\psi\rangle$, $b = \langle\downarrow|\psi\rangle$ 为复系数，满足归一化条件 $|a|^2 + |b|^2 = 1$。

## 2. $\hat{L}_z$ 的本征值方程

设 $|\uparrow\rangle$ 与 $|\downarrow\rangle$ 是 $\hat{L}_z$ 的本征态（在自旋 $s = 1/2$ 的语境下），对应的本征值分别为 $+\hbar/2$ 与 $-\hbar/2$：

$$
\hat{L}_z |\uparrow\rangle = +\frac{\hbar}{2} |\uparrow\rangle,
\qquad
\hat{L}_z |\downarrow\rangle = -\frac{\hbar}{2} |\downarrow\rangle
$$

## 3. 算符对任意态的作用

将 $\hat{L}_z$ 作用在任意态 $|\psi\rangle = a|\uparrow\rangle + b|\downarrow\rangle$ 上，利用线性性：

$$
\begin{aligned}
\hat{L}_z |\psi\rangle
&= \hat{L}_z \bigl( a|\uparrow\rangle + b|\downarrow\rangle \bigr) \\[4pt]
&= a\,\hat{L}_z |\uparrow\rangle + b\,\hat{L}_z |\downarrow\rangle \\[4pt]
&= a\left( +\frac{\hbar}{2} |\uparrow\rangle \right) + b\left( -\frac{\hbar}{2} |\downarrow\rangle \right) \\[4pt]
&= +\frac{\hbar}{2}a\,|\uparrow\rangle \;-\; \frac{\hbar}{2}b\,|\downarrow\rangle
\end{aligned}
$$

在列向量表示下，上式等价于：

$$
\hat{L}_z \begin{pmatrix} a \\ b \end{pmatrix}
= \frac{\hbar}{2} \begin{pmatrix} a \\ -b \end{pmatrix}
$$

## 4. 矩阵元计算

在基 $\{|\uparrow\rangle, |\downarrow\rangle\}$ 下，算符的矩阵元定义为：

$$
(L_z)_{ij} = \langle i | \hat{L}_z | j \rangle,
\qquad i,j \in \{\uparrow, \downarrow\}
$$

逐项计算：

$$
\begin{aligned}
(L_z)_{\uparrow\uparrow} &= \langle\uparrow| \hat{L}_z |\uparrow\rangle
= \langle\uparrow| \left( +\frac{\hbar}{2} |\uparrow\rangle \right)
= +\frac{\hbar}{2} \langle\uparrow|\uparrow\rangle = +\frac{\hbar}{2} \\[6pt]
(L_z)_{\uparrow\downarrow} &= \langle\uparrow| \hat{L}_z |\downarrow\rangle
= \langle\uparrow| \left( -\frac{\hbar}{2} |\downarrow\rangle \right)
= -\frac{\hbar}{2} \langle\uparrow|\downarrow\rangle = 0 \\[6pt]
(L_z)_{\downarrow\uparrow} &= \langle\downarrow| \hat{L}_z |\uparrow\rangle
= \langle\downarrow| \left( +\frac{\hbar}{2} |\uparrow\rangle \right)
= +\frac{\hbar}{2} \langle\downarrow|\uparrow\rangle = 0 \\[6pt]
(L_z)_{\downarrow\downarrow} &= \langle\downarrow| \hat{L}_z |\downarrow\rangle
= \langle\downarrow| \left( -\frac{\hbar}{2} |\downarrow\rangle \right)
= -\frac{\hbar}{2} \langle\downarrow|\downarrow\rangle = -\frac{\hbar}{2}
\end{aligned}
$$

这里用到了基矢的正交归一性：$\langle\uparrow|\uparrow\rangle = \langle\downarrow|\downarrow\rangle = 1$, $\langle\uparrow|\downarrow\rangle = \langle\downarrow|\uparrow\rangle = 0$。

## 5. 矩阵表示

将四个矩阵元按行 $(\uparrow, \downarrow)$ 和列 $(\uparrow, \downarrow)$ 排列，得到 $\hat{L}_z$ 在该基下的 $2 \times 2$ 矩阵表示：

$$
\hat{L}_z \doteq
\begin{pmatrix}
\langle\uparrow|\hat{L}_z|\uparrow\rangle & \langle\uparrow|\hat{L}_z|\downarrow\rangle \\[4pt]
\langle\downarrow|\hat{L}_z|\uparrow\rangle & \langle\downarrow|\hat{L}_z|\downarrow\rangle
\end{pmatrix}
= \frac{\hbar}{2}
\begin{pmatrix}
1 & 0 \\
0 & -1
\end{pmatrix}
$$

## 6. 验证

用矩阵直接作用在态矢量上，看是否与第 3 节的结果一致：

$$
\frac{\hbar}{2}
\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
\begin{pmatrix} a \\ b \end{pmatrix}
= \frac{\hbar}{2}
\begin{pmatrix} a \\ -b \end{pmatrix}
$$

与 $\hat{L}_z |\psi\rangle$ 的分量形式一致。同时可以看出该矩阵是 Hermite 矩阵（$L_z^\dagger = L_z$），且本征值为 $\pm\hbar/2$，与第 2 节的本征值方程自洽。

## 7. 连续测量对概率分布的影响

### 7.1 预备：$\hat{L}_x$ 的矩阵表示与 eigenstates

为讨论"其他方向"的测量，需要 $\hat{L}_x$ 的矩阵表示。由角动量对易关系 $[\hat{L}_i, \hat{L}_j] = i\hbar\varepsilon_{ijk}\hat{L}_k$ 及升降算符关系可导出（此处不展开推导），在 $\{|\uparrow\rangle, |\downarrow\rangle\}$ 基下：

$$
\hat{L}_x \doteq \frac{\hbar}{2}
\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}
$$

解本征值方程 $\hat{L}_x |\pm\rangle_x = \pm\frac{\hbar}{2} |\pm\rangle_x$，得 eigenstates：

$$
|+\rangle_x = \frac{1}{\sqrt{2}}\bigl(|\uparrow\rangle + |\downarrow\rangle\bigr)
\doteq \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix},
\qquad
|-\rangle_x = \frac{1}{\sqrt{2}}\bigl(|\uparrow\rangle - |\downarrow\rangle\bigr)
\doteq \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}
$$

由此可写出基变换关系（$z$ 基与 $x$ 基之间的转换）：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}\bigl(|+\rangle_x + |-\rangle_x\bigr),
\qquad
|\downarrow\rangle = \frac{1}{\sqrt{2}}\bigl(|+\rangle_x - |-\rangle_x\bigr)
$$

### 7.2 实验一：连续两次 $z$ 方向测量

设初态为任意态 $|\psi\rangle = a|\uparrow\rangle + b|\downarrow\rangle$，满足 $|a|^2 + |b|^2 = 1$。

**第一次 $\hat{L}_z$ 测量：**

$$
\begin{aligned}
P(+\tfrac{\hbar}{2}) &= |\langle\uparrow|\psi\rangle|^2 = |a|^2, &\text{测量后态} &\to |\uparrow\rangle \\
P(-\tfrac{\hbar}{2}) &= |\langle\downarrow|\psi\rangle|^2 = |b|^2, &\text{测量后态} &\to |\downarrow\rangle
\end{aligned}
$$

态矢量以相应概率坍缩到 $|\uparrow\rangle$ 或 $|\downarrow\rangle$。

**第二次 $\hat{L}_z$ 测量：**

关注第一次得到 $+\hbar/2$ 的分支（另一分支同理）。此时系统处于 $|\uparrow\rangle$，再次测量 $\hat{L}_z$：

$$
\begin{aligned}
P(+\tfrac{\hbar}{2} \mid \text{态为 }|\uparrow\rangle) &= |\langle\uparrow|\uparrow\rangle|^2 = 1 \\
P(-\tfrac{\hbar}{2} \mid \text{态为 }|\uparrow\rangle) &= |\langle\downarrow|\uparrow\rangle|^2 = 0
\end{aligned}
$$

第二次测量**确定性地**给出与第一次相同的结果。两次测量 $z$ 分量的联合概率：

$$
\begin{aligned}
P(+\text{ then }+) &= |a|^2 \times 1 = |a|^2 \\
P(+\text{ then }-) &= |a|^2 \times 0 = 0 \\
P(-\text{ then }-) &= |b|^2 \times 1 = |b|^2 \\
P(-\text{ then }+) &= |b|^2 \times 0 = 0
\end{aligned}
$$

**结论：** 第一次测量已使态坍缩为 $\hat{L}_z$ 的本征态，第二次测量不对态造成进一步改变——结果与第一次完全一致。$\hat{L}_z$ 的本征态在 $z$ 方向测量下是"稳定的"。

### 7.3 实验二：$z \to x \to z$ 三次测量

仍从初态 $|\psi\rangle = a|\uparrow\rangle + b|\downarrow\rangle$ 出发，关注第一次 $\hat{L}_z$ 测量得到 $+\hbar/2$ 的分支（态坍缩为 $|\uparrow\rangle$，发生概率 $|a|^2$）。

**第一步（已完成）：** 第一次 $\hat{L}_z$ 测量 $\to$ 态为 $|\uparrow\rangle$。

**第二步：$\hat{L}_x$ 测量。**

将 $|\uparrow\rangle$ 在 $\hat{L}_x$ 的 eigenbasis 下展开：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}|+\rangle_x + \frac{1}{\sqrt{2}}|-\rangle_x
$$

测量 $\hat{L}_x$ 的结果与概率：

$$
\begin{aligned}
P_x(+\tfrac{\hbar}{2}) &= |{}_x\langle+|\uparrow\rangle|^2 = \left|\frac{1}{\sqrt{2}}\right|^2 = \frac{1}{2},
\quad \text{态} \to |+\rangle_x \\[4pt]
P_x(-\tfrac{\hbar}{2}) &= |{}_x\langle-|\uparrow\rangle|^2 = \left|\frac{1}{\sqrt{2}}\right|^2 = \frac{1}{2},
\quad \text{态} \to |-\rangle_x
\end{aligned}
$$

**第三步：再次测量 $\hat{L}_z$。**

需考虑第二步的两个分支。

*分支 A：第二步得到 $+\hbar/2$，态为 $|+\rangle_x$。*

将 $|+\rangle_x$ 用 $z$ 基展开：$|+\rangle_x = \frac{1}{\sqrt{2}}|\uparrow\rangle + \frac{1}{\sqrt{2}}|\downarrow\rangle$。

$$
\begin{aligned}
P_z(+\tfrac{\hbar}{2} \mid |+\rangle_x) &= |\langle\uparrow|+\rangle_x|^2 = \frac{1}{2} \\[4pt]
P_z(-\tfrac{\hbar}{2} \mid |+\rangle_x) &= |\langle\downarrow|+\rangle_x|^2 = \frac{1}{2}
\end{aligned}
$$

*分支 B：第二步得到 $-\hbar/2$，态为 $|-\rangle_x$。*

$|-\rangle_x = \frac{1}{\sqrt{2}}|\uparrow\rangle - \frac{1}{\sqrt{2}}|\downarrow\rangle$。

$$
\begin{aligned}
P_z(+\tfrac{\hbar}{2} \mid |-\rangle_x) &= |\langle\uparrow|-\rangle_x|^2 = \frac{1}{2} \\[4pt]
P_z(-\tfrac{\hbar}{2} \mid |-\rangle_x) &= |\langle\downarrow|-\rangle_x|^2 = \frac{1}{2}
\end{aligned}
$$

**汇总三步测量的联合概率：**

$$
\begin{aligned}
P(z\!+\!, x\!+\!, z\!+) &= |a|^2 \times \frac{1}{2} \times \frac{1}{2} = \frac{|a|^2}{4} \\[4pt]
P(z\!+\!, x\!+\!, z\!-) &= |a|^2 \times \frac{1}{2} \times \frac{1}{2} = \frac{|a|^2}{4} \\[4pt]
P(z\!+\!, x\!-\!, z\!+) &= |a|^2 \times \frac{1}{2} \times \frac{1}{2} = \frac{|a|^2}{4} \\[4pt]
P(z\!+\!, x\!-\!, z\!-) &= |a|^2 \times \frac{1}{2} \times \frac{1}{2} = \frac{|a|^2}{4}
\end{aligned}
$$

（若第一次测量得到 $-\hbar/2$，态坍缩为 $|\downarrow\rangle$，后续概率结构相同，只需将 $|a|^2$ 换为 $|b|^2$。）

### 7.4 对比与物理解释

| | 实验一 $(z \to z)$ | 实验二 $(z \to x \to z)$ |
|---|---|---|
| 末次 $z$ 测量 $P(+)$ | $1$（若首次为 $+$） | $1/2$ |
| 末次 $z$ 测量 $P(-)$ | $0$（若首次为 $+$） | $1/2$ |
| 第二次 $z$ 测量是否确定 | 是 | 否 |

**物理图像：**

- **实验一**：第一次 $\hat{L}_z$ 测量使态坍缩到本征态 $|\uparrow\rangle$。该本征态在后续 $\hat{L}_z$ 测量下不再改变——$\hat{L}_z$ 与自身对易（$[\hat{L}_z, \hat{L}_z] = 0$），重复测量同一 observable 不带来新扰动。

- **实验二**：中间的 $\hat{L}_x$ 测量强制系统坍缩到 $\hat{L}_x$ 的本征态（$|+\rangle_x$ 或 $|-\rangle_x$），而这两个态**不是** $\hat{L}_z$ 的本征态——它们都是 $|\uparrow\rangle$ 与 $|\downarrow\rangle$ 的等权重叠加。因此当再次测量 $\hat{L}_z$ 时，结果回归为 50-50 的概率分布，**原先第一次 $z$ 测量获得的信息被中间的 $x$ 测量完全抹除**。

这体现了非对易 observable 之间的互补性：$[\hat{L}_z, \hat{L}_x] = i\hbar\hat{L}_y \neq 0$，测量其中一个必然破坏另一个的确定性。不存在一个量子态能同时使 $\hat{L}_z$ 和 $\hat{L}_x$ 的测量结果都具有确定性。

## 8. 从实验事实反推矩阵表示

第 7 节是从已知的矩阵表示出发，计算测量结果的概率分布。本节反过来——**以实验结果为唯一输入，推导 $\hat{L}_z$ 和 $\hat{L}_x$ 的矩阵表示**。这更接近量子力学建立的历史逻辑：先有实验事实，再构造能复现这些事实的数学结构。

### 8.1 从实验中提炼的已知条件

从第 7 节的两个实验中，提炼出以下不依赖于矩阵表示的"裸"实验事实：

**(F1)** $\hat{L}_z$ 的测量只有两个可能结果，记为 $+\hbar/2$ 和 $-\hbar/2$。对应的测量后态分别记为 $|\uparrow\rangle$ 和 $|\downarrow\rangle$。它们是正交归一的：

$$
\langle\uparrow|\uparrow\rangle = \langle\downarrow|\downarrow\rangle = 1,\qquad
\langle\uparrow|\downarrow\rangle = 0
$$

**(F2)** 连续两次测量 $\hat{L}_z$，第二次的结果与第一次**完全相同**（实验一）。

**(F3)** 从 $|\uparrow\rangle$ 出发测量 $\hat{L}_x$，得到 $\pm\hbar/2$ 的概率各为 $1/2$（实验二第二步）。

**(F4)** $\hat{L}_x$ 测量后若得到 $+\hbar/2$（态记为 $|+\rangle_x$），再测量 $\hat{L}_z$，得到 $\pm\hbar/2$ 的概率各为 $1/2$。$|-\rangle_x$ 分支同理（实验二第三步）。

### 8.2 推导 $\hat{L}_z$ 的矩阵表示

由 (F1) 和 (F2)，$|\uparrow\rangle$ 和 $|\downarrow\rangle$ 是 $\hat{L}_z$ 的本征态：

$$
\hat{L}_z |\uparrow\rangle = +\frac{\hbar}{2} |\uparrow\rangle,\qquad
\hat{L}_z |\downarrow\rangle = -\frac{\hbar}{2} |\downarrow\rangle
$$

算符可用本征值与本征投影子写为谱分解：

$$
\hat{L}_z = \frac{\hbar}{2}\,|\uparrow\rangle\langle\uparrow| \;-\; \frac{\hbar}{2}\,|\downarrow\rangle\langle\downarrow|
$$

在 $\{|\uparrow\rangle, |\downarrow\rangle\}$ 基下取矩阵元，直接得到对角矩阵：

$$
\boxed{\hat{L}_z \doteq \frac{\hbar}{2} \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}}
$$

这一步是平凡的——我们**选** $\hat{L}_z$ 的本征态作为工作基，$\hat{L}_z$ 在此基下自然是对角矩阵。

### 8.3 推导 $\hat{L}_x$ 的矩阵表示

这是非平凡的一步。我们不知道 $\hat{L}_x$ 的本征态在 $z$ 基下长什么样，需要从实验事实反推。

**Step 1：用实验概率确定 $|\langle+_x|\uparrow\rangle|$。**

由 (F3)，从 $|\uparrow\rangle$ 出发测量 $\hat{L}_x$ 得 $+$ 的概率为 $1/2$：

$$
|{}_x\langle+|\uparrow\rangle|^2 = \frac{1}{2}
\quad\Longrightarrow\quad
{}_x\langle+|\uparrow\rangle = \frac{1}{\sqrt{2}}\,e^{i\alpha}
$$

同理 ${}_x\langle-|\uparrow\rangle = \frac{1}{\sqrt{2}}e^{i\beta}$。可观测量是概率，只约束模长，相位 $\alpha, \beta$ 暂不确定。

由归一性，将 $|\uparrow\rangle$ 在 $\hat{L}_x$ 的 eigenbasis 下展开：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}e^{-i\alpha}|+\rangle_x + \frac{1}{\sqrt{2}}e^{-i\beta}|-\rangle_x
$$

约定 $|\uparrow\rangle$ 的整体相位使 $\alpha = 0$（物理上无影响），并记 $\beta = \delta$：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}|+\rangle_x + \frac{1}{\sqrt{2}}e^{-i\delta}|-\rangle_x
\tag{8.1}
$$

**Step 2：用 (F4) 确定 $|+\rangle_x$ 的 $z$ 基展开。**

由 (F4)，从 $|+\rangle_x$ 出发测量 $\hat{L}_z$ 得 $+$ 的概率为 $1/2$：

$$
|\langle\uparrow|+\rangle_x|^2 = \frac{1}{2}
\quad\Longrightarrow\quad
\langle\uparrow|+\rangle_x = \frac{1}{\sqrt{2}}\,e^{i\gamma}
$$

约定 $|+\rangle_x$ 的整体相位使 $\gamma = 0$（即 $\langle\uparrow|+\rangle_x = 1/\sqrt{2}$ 为实数正数）。同时由 (F4) 知 $|\langle\downarrow|+\rangle_x|^2 = 1/2$，故：

$$
|+\rangle_x = \frac{1}{\sqrt{2}}|\uparrow\rangle + \frac{1}{\sqrt{2}}e^{i\phi}|\downarrow\rangle
\tag{8.2}
$$

**Step 3：用正交性确定 $|-\rangle_x$。**

$|+\rangle_x$ 和 $|-\rangle_x$ 是 Hermite 算符 $\hat{L}_x$ 的、属于不同本征值的本征态，必须正交：

$$
{}_x\langle+|-\rangle_x = 0
$$

设 $|-\rangle_x = a|\uparrow\rangle + b|\downarrow\rangle$，由正交性：

$$
\frac{1}{\sqrt{2}}a^* + \frac{1}{\sqrt{2}}e^{-i\phi}b^* = 0 \;\Longrightarrow\; a^* = -e^{-i\phi}b^*
$$

结合归一化 $|a|^2 + |b|^2 = 1$ 及整体相位约定，取：

$$
|-\rangle_x = \frac{1}{\sqrt{2}}|\uparrow\rangle - \frac{1}{\sqrt{2}}e^{i\phi}|\downarrow\rangle
\tag{8.3}
$$

**Step 4：在 $z$ 基下计算 $\hat{L}_x$ 的矩阵元。**

$\hat{L}_x$ 在其自身 eigenbasis 下的谱分解为：

$$
\hat{L}_x = \frac{\hbar}{2}\,|+\rangle_x{}_x\langle+| \;-\; \frac{\hbar}{2}\,|-\rangle_x{}_x\langle-|
$$

将 (8.2)(8.3) 代入，在 $z$ 基下写出矩阵：

$$
\begin{aligned}
(L_x)_{\uparrow\uparrow} &= \langle\uparrow|\hat{L}_x|\uparrow\rangle
= \frac{\hbar}{2}\Bigl(|\langle\uparrow|+\rangle_x|^2 - |\langle\uparrow|-\rangle_x|^2\Bigr)
= \frac{\hbar}{2}\Bigl(\frac{1}{2} - \frac{1}{2}\Bigr) = 0 \\[6pt]
(L_x)_{\uparrow\downarrow} &= \langle\uparrow|\hat{L}_x|\downarrow\rangle
= \frac{\hbar}{2}\Bigl(\langle\uparrow|+\rangle_x{}_x\langle+|\downarrow\rangle - \langle\uparrow|-\rangle_x{}_x\langle-|\downarrow\rangle\Bigr) \\
&= \frac{\hbar}{2}\Bigl(\frac{1}{\sqrt{2}}\cdot\frac{1}{\sqrt{2}}e^{-i\phi} - \frac{1}{\sqrt{2}}\cdot(-\frac{1}{\sqrt{2}}e^{-i\phi})\Bigr)
= \frac{\hbar}{2} e^{-i\phi} \\[6pt]
(L_x)_{\downarrow\downarrow} &= \langle\downarrow|\hat{L}_x|\downarrow\rangle
= \frac{\hbar}{2}\Bigl(|\langle\downarrow|+\rangle_x|^2 - |\langle\downarrow|-\rangle_x|^2\Bigr)
= \frac{\hbar}{2}\Bigl(\frac{1}{2} - \frac{1}{2}\Bigr) = 0
\end{aligned}
$$

由 Hermite 性，$(L_x)_{\downarrow\uparrow} = (L_x)_{\uparrow\downarrow}^* = \frac{\hbar}{2}e^{i\phi}$。汇总：

$$
\hat{L}_x \doteq \frac{\hbar}{2}
\begin{pmatrix}
0 & e^{-i\phi} \\[2pt]
e^{i\phi} & 0
\end{pmatrix}
$$

**Step 5：相位约定。**

相位 $\phi$ 是实验概率（只依赖 $|\cdot|^2$）所无法确定的。不同的 $\phi$ 对应 $x$ 轴在 $xy$ 平面内的不同取向。标准约定取 $\phi = 0$（即 $x$ 轴与 $z$ 轴的相对相位为零），得到：

$$
\boxed{\hat{L}_x \doteq \frac{\hbar}{2} \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}}
$$

**Step 6：一致性验证——$|\uparrow\rangle$ 的 $x$ 基展开必须自洽。**

由 (8.2)(8.3) 反解（取 $\phi = 0$）：

$$
|+\rangle_x = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix},\qquad
|-\rangle_x = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\-1\end{pmatrix}
$$

代回 (8.1)（取 $\alpha=0$）检查一致性：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}|+\rangle_x + \frac{1}{\sqrt{2}}e^{-i\delta}|-\rangle_x
= \frac{1}{2}\begin{pmatrix}1+e^{-i\delta}\\1-e^{-i\delta}\end{pmatrix}
\stackrel{!}{=} \begin{pmatrix}1\\0\end{pmatrix}
$$

要求 $1-e^{-i\delta}=0 \;\Longrightarrow\; \delta=0$。因此自洽性强制 $\delta=0$，(8.1) 化为：

$$
|\uparrow\rangle = \frac{1}{\sqrt{2}}\bigl(|+\rangle_x + |-\rangle_x\bigr)
$$

与第 7 节所用的展开一致。所有相位自由度被自洽性消除。

### 8.4 用推导出的矩阵回验实验事实

至此，我们从 (F1)–(F4) 四条实验事实出发，唯一确定了 $\hat{L}_z$ 和 $\hat{L}_x$ 的 $2\times2$ 矩阵表示。反过来可以验证：

- **实验一**：$\hat{L}_z$ 是对角矩阵，$|\uparrow\rangle$ 是其本征态，再次作用 $\hat{L}_z$ 不改变态。
- **实验二**：$\hat{L}_x$ 作用在 $|\uparrow\rangle$ 上得到 $|\downarrow\rangle$（叠加），测量概率 $|\langle\pm_x|\uparrow\rangle|^2 = 1/2$；之后再测 $\hat{L}_z$，从 $|\pm_x\rangle$ 出发各得 $1/2$。

推导闭环。这展示了量子力学形式理论的典型建构方式：**实验 → 代数约束 → 矩阵表示**。
