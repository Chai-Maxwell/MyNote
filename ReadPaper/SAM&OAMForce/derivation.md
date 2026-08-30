# SAM & OAM 光力分解：完整推导与 Nabla 符号约定

> 基于 Durach & Noginova (2017): *Spin Angular Momentum Transfer and Plasmogalvanic Phenomena*, Phys. Rev. B **96**, 195411 (arXiv: 1703.05628)
>
> 推导综合自原文 Supplementary Material Parts 1-5 及正文。

---

## 1. 完整推导

### 1.1 出发点与场定义

采用*双对称(dual-symmetric)* 表述（Bliokh, Bekshaev, Nori, 2013），以 $\bm{E}$ 和 $\bm{H}$ 为基本场量。物质响应通过极化 $\bm{P}$ 和磁化 $\bm{M}$ 引入：

$$
\boxed{\bm{D} = \epsilon_0 \bm{E} + \bm{P}, \qquad \bm{B} = \mu_0 \bm{H} + \bm{M}} \tag{D1}
$$

这两个关系是**定义**而非本构假设——$\bm{P}$ 和 $\bm{M}$ 包含了所有对真空的偏离（束缚 + 自由电荷贡献、线性 + 非线性响应）。

Maxwell 方程在物质中（无自由电流时，或将其吸收进 $\partial_t \bm{P}$）：

$$
\nabla \times \bm{E} = -\partial_t \bm{B} = -\mu_0 \partial_t \bm{H} - \partial_t \bm{M} \tag{D2a}
$$

$$
\nabla \times \bm{H} = \partial_t \bm{D} = \epsilon_0 \partial_t \bm{E} + \partial_t \bm{P} \tag{D2b}
$$

由此解出时间导数：

$$
\partial_t \bm{E} = \frac{1}{\epsilon_0}\left(\nabla \times \bm{H} - \partial_t \bm{P}\right) \tag{D3a}
$$

$$
\partial_t \bm{H} = -\frac{1}{\mu_0}\left(\nabla \times \bm{E} + \partial_t \bm{M}\right) \tag{D3b}
$$

### 1.2 电磁动量连续性方程

电磁线动量密度（双对称形式）：

$$
\bm{G} = \frac{1}{c^2}(\bm{E} \times \bm{H}) \tag{D4}
$$

取时间导数，使用指标记号（$\epsilon_{ijk}$ 为 Levi-Civita 张量）：

$$
\partial_t G_i = \frac{1}{c^2}\epsilon_{ijk}\left(\partial_t E_j \cdot H_k + E_j \cdot \partial_t H_k\right) \tag{D5}
$$

代入 (D3) 并利用 $c^2 = 1/(\epsilon_0\mu_0)$，即 $1/(c^2\epsilon_0) = \mu_0$，$1/(c^2\mu_0) = \epsilon_0$：

$$
\begin{aligned}
\partial_t G_i = &\;\mu_0\epsilon_{ijk}(\nabla \times \bm{H})_j H_k - \mu_0\epsilon_{ijk}(\partial_t P)_j H_k \\
&- \epsilon_0\epsilon_{ijk}E_j(\nabla \times \bm{E})_k - \epsilon_0\epsilon_{ijk}E_j(\partial_t M)_k
\end{aligned} \tag{D6}
$$

### 1.3 分离应力张量散度

处理含旋度的项。利用恒等式 $\epsilon_{ijk}\epsilon_{jlm} = \delta_{kl}\delta_{im} - \delta_{km}\delta_{il}$：

**电场旋度项**（第三项）：

$$
\begin{aligned}
\epsilon_0\epsilon_{ijk}E_j(\nabla \times \bm{E})_k &= \epsilon_0\epsilon_{ijk}\epsilon_{klm}E_j\partial_l E_m \\
&= \epsilon_0(\delta_{il}\delta_{jm} - \delta_{im}\delta_{jl})E_j\partial_l E_m \\
&= \epsilon_0(E_j\partial_i E_j - E_j\partial_j E_i) \\
&= \epsilon_0\left[\frac{1}{2}\partial_i(\bm{E} \cdot \bm{E}) - (\bm{E} \cdot \nabla)E_i\right]
\end{aligned} \tag{D7a}
$$

**磁场旋度项**（第一项）：

$$
\begin{aligned}
\mu_0\epsilon_{ijk}(\nabla \times \bm{H})_j H_k &= \mu_0\left[(\bm{H} \cdot \nabla)H_i - \frac{1}{2}\partial_i(\bm{H} \cdot \bm{H})\right]
\end{aligned} \tag{D7b}
$$

**含时极化/磁化项**（第二、四项）产生 Abraham 型贡献：

$$
f_{A,i} = \frac{1}{c^2}\partial_t(\bm{P} \times \bm{H} + \bm{E} \times \bm{M})_i \tag{D8}
$$

将所有项合并，得到动量连续性方程的标准形式：

$$
\boxed{\partial_t \bm{G} + \nabla \cdot \hat{\boldsymbol{\sigma}} = -\bm{f}} \tag{D9}
$$

其中 $\hat{\boldsymbol{\sigma}}$ 为 Maxwell 应力张量（包含 $\frac{1}{2}(E^2 + H^2)$ 的对角项和场分量乘积的非对角项），$\bm{f}$ 为作用于物质的力体密度。

### 1.4 力体密度的分解

将力密度中的梯度项重新组织。利用恒等式：

$$
(E_j\partial_i E_j) = \partial_i(\bm{E} \cdot \bm{E})/2 \quad \text{归入应力张量}
$$

$$
E_j\partial_j E_i = (\bm{E} \cdot \nabla)\bm{E} \quad \text{留在力密度中}
$$

同时，极化项 $\partial_t \bm{P}$ 的贡献可借助 $\bm{D} = \epsilon_0\bm{E} + \bm{P}$ 重写。经过 Supplementary Material Part 3 中的完整代数运算，力体密度分解为五部分：

$$
\boxed{\bm{f} = \bm{f}_A + \bm{f}_{OE} + \bm{f}_{OM} + \bm{f}_{SE} + \bm{f}_{SM}} \tag{D10}
$$

各部分（单色场时间平均形式，复振幅记号）为：

| | 表达式 | 梯度作用于 |
|---|---|---|
| $\bm{f}_A$ | $\frac{1}{c^2}\frac{\partial}{\partial t}(\bm{E} \times \bm{H})$ | （脉冲包络，单色场 = 0） |
| $\bm{f}_{OE}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{E}^*) \cdot \bm{P}\}$ | **场** $\bm{E}$ |
| $\bm{f}_{OM}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{H}^*) \cdot \bm{M}\}$ | **场** $\bm{H}$ |
| $\bm{f}_{SE}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{P}) \cdot \bm{E}^*\}$ | **物质响应** $\bm{P}$ |
| $\bm{f}_{SM}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{M}) \cdot \bm{H}^*\}$ | **物质响应** $\bm{M}$ |

### 1.5 轨道-自旋分离的物理依据

力分解为「轨道」和「自旋」两类的判据是 $\nabla$ 所作用的**对象**：

- **轨道力** $\bm{f}_{OE}, \bm{f}_{OM}$：$\nabla$ 作用于**电磁场**（$\bm{E}, \bm{H}$），对应 Berry (2009) 中 Poynting 矢量的轨道部分。相关的扭矩为 $\bm{r} \times \bm{f}_{\text{orbital}}$，即 OAM 传递。

- **自旋力** $\bm{f}_{SE}, \bm{f}_{SM}$：$\nabla$ 作用于**物质响应**（$\bm{P}, \bm{M}$），对应 Berry (2009) 中 Poynting 矢量的自旋部分。相关的扭矩为 $\bm{P} \times \bm{E}^* + \bm{M} \times \bm{H}^*$，即 SAM 传递。

这一分类的自然性可从以下恒等式看出。对轨道电力：

$$
(\nabla \bm{E}^*) \cdot \bm{P} \;\equiv\; P_j \partial_i E_j^* = \partial_i(P_j E_j^*) - E_j^* \partial_i P_j = \nabla(\bm{E}^* \cdot \bm{P}) - (\nabla \bm{P}) \cdot \bm{E}^*
$$

取实部后，第一项 $\nabla(\bm{E}^* \cdot \bm{P})$ 为梯度（保守力），第二项 $(\nabla \bm{P}) \cdot \bm{E}^*$ 正是自旋力结构。两者通过一次分部积分相互转换，体现了轨道与自旋自由度之间的耦合。

### 1.6 轨道力的 Strictive-Pressure 分解 (推导 Eq. 9)

对轨道电力 $\bm{f}_{OE}$，利用矢量恒等式将其分为保守和非保守两部分。关键恒等式（对任意矢量场 $\bm{A}, \bm{B}$）：

$$
\boxed{\operatorname{Re}\{B_j \partial_i A_j^*\} = \frac{1}{2}\partial_i\operatorname{Re}\{\bm{A}^* \cdot \bm{B}\} + \frac{1}{2}\operatorname{Re}\{[\nabla \times (\bm{A}^* \times \bm{B})]_i\}} \tag{D11}
$$

**推导**：从 $\epsilon_{ijk}\partial_j(\epsilon_{klm}A_l^* B_m) = \epsilon_{ijk}\epsilon_{klm}\partial_j(A_l^* B_m)$ 出发，用 $\epsilon_{ijk}\epsilon_{klm} = \delta_{il}\delta_{jm} - \delta_{im}\delta_{jl}$，展开后得到 $\partial_j(A_i^* B_j) - \partial_j(A_j^* B_i)$，再结合 $\partial_i(A_j^* B_j)$ 的展开即可得到 (D11)。

应用到 $\bm{f}_{OE}$（设 $\bm{A} = \bm{E}$，$\bm{B} = \bm{P}$）：

$$
\begin{aligned}
\bm{f}_{OE} &= \frac{1}{2}\operatorname{Re}\{(\nabla \bm{E}^*) \cdot \bm{P}\} \\
&= \underbrace{\frac{1}{4}\operatorname{Re}\{\nabla(\bm{E}^* \cdot \bm{P})\}}_{\bar{\bm{f}}_{OE}^{\text{strict}}} + \underbrace{\frac{1}{4}\operatorname{Re}\{\nabla \times (\bm{E}^* \times \bm{P})\}}_{\bar{\bm{f}}_{OE}^{\text{strict}}}
\end{aligned}
$$

论文中将旋度形式定义为 strictive，但更合理的物理分类是将**压力力**分离出来。利用 $\bm{P} = (\epsilon - \epsilon_0)\bm{E}$（这是本推导中**首次引入的本构假设**）：

$$
\begin{aligned}
\bar{\bm{f}}_{OE}^{\text{strict}} &= \frac{1}{4}\operatorname{Re}\{\nabla \times [\bm{E}^* \times \bm{P}]\} = \frac{1}{4}\nabla(\bm{E}^* \cdot \bm{P}) \\[4pt]
\bar{\bm{f}}_{OE}^{\text{press}} &= \frac{1}{4}\operatorname{Re}\{\nabla \times [\bm{E} \times \bm{P}^*]\} = \frac{1}{4}\operatorname{Im}\{\nabla \times [\bm{E} \times \bm{P}^*]\}
\end{aligned}
$$

**压力力** $\propto \nabla \times (\bm{E} \times \bm{P}^*)$ 对类平面波场正比于波矢 $\bm{k}$，是 PLDE 的驱动力。**压缩力**为梯度形式 $\propto \nabla(\cdots)$，其闭合回路的积分为零——仅重新分布电荷密度，不产生净电流。

同理，轨道磁力的分解只需将 $(\bm{E}, \bm{P}) \to (\bm{H}, \bm{M})$。

### 1.7 自旋力的整流形式 (推导 Eq. 11)

对自旋电力 $\bm{f}_{SE}$，利用与 (D11) 对称的恒等式：

$$
\boxed{\operatorname{Re}\{E_j^* \partial_i P_j\} = \frac{1}{2}\partial_i\operatorname{Re}\{\bm{E}^* \cdot \bm{P}\} + \frac{1}{2}\operatorname{Re}\{[\nabla \times (\bm{E}^* \times \bm{P})]_i\}} \tag{D12}
$$

注意 (D11) 与 (D12) 的右边形式**完全相同**（都是 $\partial_i(\bm{E}^* \cdot \bm{P})$ 与 $\nabla \times (\bm{E}^* \times \bm{P})$ 的组合），但左边不同——一个是梯度作用于场，一个是梯度作用于极化。这正是轨道力和自旋力可以互相转换的数学体现。

由此得到整流自旋力的三种等价形式：

$$
\boxed{\bar{\bm{f}}_{SE} = \frac{1}{4}\operatorname{Re}\{\nabla \times (\bm{E}^* \times \bm{P})\} = \frac{1}{4}\operatorname{Im}\{\nabla \times (\bm{E} \times \bm{P}^*)\} = \frac{1}{4}\operatorname{Re}\{\nabla(\bm{E}^* \cdot \bm{P})\}}
$$

**物理意义**：

- 第一种形式 $\frac{1}{4}\operatorname{Re}\{\nabla \times (\bm{E}^* \times \bm{P})\}$ 直接来自自旋 Poynting 流（Berry, 2009 中的 $\bm{P}_{\text{sp}}$），表示对自旋角动量流的**吸收**
- 第二种形式 $\frac{1}{4}\operatorname{Im}\{\nabla \times (\bm{E} \times \bm{P}^*)\}$ 突出耗散贡献（$\operatorname{Im}$ 反映吸收），仅在 $\operatorname{Im}\{\epsilon\} \neq 0$ 时非零
- 第三种形式 $\frac{1}{4}\operatorname{Re}\{\nabla(\bm{E}^* \cdot \bm{P})\}$ 强调其梯度结构，解释了为何自旋力整体积分为零

### 1.8 表面力密度 (推导 Eq. 8)

在两种介质的界面处，$\epsilon$ 发生突变，体积极化散度 $\nabla \cdot \bm{P}$ 产生面电荷。将力体密度跨越界面（法向 $\hat{\bm{n}}$，从介质指向外）积分：

$$
\bm{F} = \int_{0^-}^{0^+} \bm{f} \, dz
$$

对于包含 $\nabla \bm{P}$ 的项，分部积分：

$$
\int_{0^-}^{0^+} (\nabla \bm{P}) \cdot \bm{E}^* \, dz = (\bm{P} \cdot \hat{\bm{n}})\bm{E}^*\Big|_{0^-}^{0^+} - \int_{0^-}^{0^+} \bm{P} \cdot (\nabla \bm{E}^*) \, dz
$$

界面两侧 $\bm{P}$ 的跳变给出表面力。对于金属-介质界面（$\bm{P}_{\text{out}} \approx 0$）：

$$
\boxed{\bm{F}_{SE} = \frac{1}{2}\operatorname{Re}\{(\bm{P} \cdot \hat{\bm{n}}) \bm{E}^*\}} \tag{D13}
$$

$$
\boxed{\bm{F}_{SM} = \frac{1}{2}\operatorname{Re}\{(\bm{M} \cdot \hat{\bm{n}}) \bm{H}^*\}} \tag{D14}
$$

### 1.9 扭矩-自旋力积分恒等式 (推导 Eqs. 10)

从自旋力体密度出发，计算其产生的扭矩：

$$
\begin{aligned}
\int_V (\bm{r} \times \bm{f}_{SE}) \, dV &= \frac{1}{2}\operatorname{Re}\int_V \bm{r} \times [(\nabla \bm{P}) \cdot \bm{E}^*] \, dV
\end{aligned}
$$

在指标记号中：

$$
\begin{aligned}
\int_V \epsilon_{ijk} r_j (\partial_k P_l) E_l^* \, dV &= \int_V \partial_k(\epsilon_{ijk} r_j P_l E_l^*) \, dV - \int_V \epsilon_{ijk} \delta_{jk} P_l E_l^* \, dV - \int_V \epsilon_{ijk} r_j P_l \partial_k E_l^* \, dV
\end{aligned}
$$

第一项用 Gauss 定理转为面积分，第二项因 $\epsilon_{ijk}\delta_{jk} = 0$ 消失，第三项为剩余体积分。最终得到：

$$
\boxed{\int_V (\bm{r} \times \bm{f}_{SE}) \, dV = \oint_S (\bm{r} \times \bm{F}_{SE}) \, dS + \frac{1}{2}\operatorname{Re}\int_V (\bm{P} \times \bm{E}^*) \, dV} \tag{D15}
$$

最后一项 $\frac{1}{2}\operatorname{Re}\{\bm{P} \times \bm{E}^*\}$ 正是 SAM 吸收扭矩密度 $\bar{\boldsymbol{\tau}}_E$（Eq. 5）。同理可得磁对应部分。这证明了：**自旋力的力学扭矩 = 表面自旋力扭矩 + SAM 吸收扭矩**。

### 1.10 各推导步骤假设汇总

| 推导步骤 | 新增假设 |
|----------|----------|
| (D1)-(D9)：动量连续性方程与力的出现 | 无（仅 Maxwell 方程 + 定义 D1） |
| (D10)：力分解为 $f_A + f_{OE} + f_{OM} + f_{SE} + f_{SM}$ | 无（纯代数重排） |
| 时间平均形式（带 $1/2$ 和 $\operatorname{Re}$） | **单色场** $e^{-i\omega t}$ |
| Eq. (9)：strictive/pressure 分解 | **无**（仅矢量恒等式，不需要本构关系） |
| Eq. (9) 中 pressure $\propto \bm{k}$ 的物理解释 | $P = (\epsilon - \epsilon_0)E$ 且场近似为平面波 |
| Eq. (11)：自旋力整流形式 | **无**（仅矢量恒等式，与 Eq. 9 对称） |
| Eq. (8)/(D13-D14)：表面力 | **无**（仅界面法向积分 + 分部积分） |
| Eq. (6)：扭矩用 $\operatorname{Im}\{\epsilon\}, \operatorname{Im}\{\mu\}$ 表示 | $D = \epsilon E$, $B = \mu H$（局域、线性、各向同性） |
| Eq. (13)：SPP 中的自旋力 | $P = (\epsilon-\epsilon_0)E$ + SPP 场形式 (Eq. 12) |

> **核心结论**：力的轨道/自旋分解 (Eqs. 7-8) 本身**不需要任何关于 $\epsilon(\bm{r})$ 空间分布的假设**——它对任意非均匀、有损耗、各向同性介质严格成立。界面处的 $\nabla\epsilon$ 奇异性通过分部积分自然转化为表面力项。

---

## 2. Nabla 符号约定

Durach & Noginova (2017) 沿用了 Berry (2009) 的 $\nabla$ 符号体系。该体系的核心约定是：**$\nabla$ 作用于其「点乘」的对象，且结果保留一个自由矢量指标**。

### 2.1 基础约定：$(\nabla \bm{A}) \cdot \bm{B}$

文中最基本的 $\nabla$ 结构。在指标记号中：

$$
\boxed{[(\nabla \bm{A}) \cdot \bm{B}]_i \equiv B_j \, \partial_i A_j} \tag{N1}
$$

- $\bm{A}$ 和 $\bm{B}$ 为矢量场，指标 $j$ 求和（Einstein 约定）
- $\partial_i \equiv \partial/\partial x_i$ 为对空间坐标的偏导数
- 结果是一个**矢量**（自由指标 $i$ 表示力的方向）
- **$\nabla$ 作用于 $\bm{A}$（场或物质响应），$\bm{B}$ 仅做标量权重**

### 2.2 轨道力 $(\nabla \bm{E}^*) \cdot \bm{P}$

$$
[(\nabla \bm{E}^*) \cdot \bm{P}]_i = P_j \, \partial_i E_j^* \tag{N2}
$$

- $\nabla$ 作用于**电磁场** $\bm{E}^*$
- $\bm{P}$ 的每个分量 $P_j$ 加权到对应的场梯度分量上
- 物理上表示：空间变化的电场对极化电荷施加的力

### 2.3 自旋力 $(\nabla \bm{P}) \cdot \bm{E}^*$

$$
[(\nabla \bm{P}) \cdot \bm{E}^*]_i = E_j^* \, \partial_i P_j \tag{N3}
$$

- $\nabla$ 作用于**物质响应** $\bm{P}$（极化强度）
- 与 (N2) 的**唯一区别**是 $\nabla$ 作用的对象从场换成了物质响应
- 这就是「轨道」与「自旋」之分的数学本质

### 2.4 标量梯度 $\nabla(\bm{E}^* \cdot \bm{P})$

$$
[\nabla(\bm{E}^* \cdot \bm{P})]_i = \partial_i(E_j^* P_j) \tag{N4}
$$

- 标准的标量场梯度
- 保守力形式：其闭合回路积分为零
- 在有损耗介质中可为复数，通常取实部

### 2.5 旋度-叉积组合 $\nabla \times (\bm{E}^* \times \bm{P})$

$$
[\nabla \times (\bm{E}^* \times \bm{P})]_i = \epsilon_{ijk}\,\partial_j(\epsilon_{klm}E_l^* P_m) \tag{N5}
$$

- $\epsilon_{ijk}$ 为三维 Levi-Civita 张量
- 先计算叉积 $\bm{E}^* \times \bm{P}$（矢量），再取旋度
- 展开后：$\partial_j(E_i^* P_j) - \partial_j(E_j^* P_i)$

### 2.6 「点乘」方向约定 $(E_z^* \nabla)\bm{E}$ (Eq. 13)

$$
[(E_z^* \nabla)\bm{E}]_i \equiv E_z^* \, \partial_z E_i \tag{N6}
$$

- 这是**标准矢量记号** $(A \cdot \nabla)B$ 的特殊情况
- 仅沿 $z$ 方向求导（因 SPP 场仅在 $z$ 方向不均匀）
- $\nabla$ 作用于其右侧的 $\bm{E}$

### 2.7 旋度-矢量组合 $\nabla \times \bar{\bm{S}}$ (Eq. 13)

$$
[\nabla \times \bar{\bm{S}}]_i = \epsilon_{ijk}\,\partial_j \bar{S}_k \tag{N7}
$$

- 标准的矢量旋度
- $\bar{\bm{S}} = \frac{1}{2}\operatorname{Re}\{\bm{E} \times \bm{H}^*\}$ 为时间平均 Poynting 矢量

### 2.8 表面力中的法向分量 $(\bm{P} \cdot \hat{\bm{n}})\bm{E}^*$

$$
[(\bm{P} \cdot \hat{\bm{n}})\bm{E}^*]_i = (P_j n_j) E_i^* \tag{N8}
$$

- $\bm{P} \cdot \hat{\bm{n}} = P_j n_j$ 为标量（极化强度的法向分量）
- 乘以矢量 $\bm{E}^*$，结果仍为矢量
- 表示作用于界面处的表面力密度

### 2.9 矢量恒等式速查

文中用到以下关键恒等式（均在三维 Euclid 空间，使用 Einstein 求和约定）：

| 恒等式 | 指标形式 |
|--------|----------|
| $\epsilon_{ijk}\epsilon_{klm} = \delta_{il}\delta_{jm} - \delta_{im}\delta_{jl}$ | 双重旋度展开 |
| $(\nabla \bm{A}^*) \cdot \bm{B} = \nabla(\bm{A}^* \cdot \bm{B}) - (\nabla \bm{B}) \cdot \bm{A}^*$ | 分部积分（轨道 ↔ 自旋转换） |
| $\nabla \times (\bm{A} \times \bm{B}) = \bm{A}(\nabla \cdot \bm{B}) - \bm{B}(\nabla \cdot \bm{A}) + (\bm{B} \cdot \nabla)\bm{A} - (\bm{A} \cdot \nabla)\bm{B}$ | 旋度-叉积展开 |
| $\operatorname{Re}\{z_1 z_2^*\} = \operatorname{Re}\{z_1^* z_2\}$ | 时间平均中的共轭对称性 |

### 2.10 与 Berry (2009) 记号的对应关系

Berry (2009) 中的核心表达式为：

$$
\bm{P}_{\text{orb}} = \frac{c^2}{2\omega}\epsilon_0\,\operatorname{Im}[\bm{E}^* \cdot (\nabla)\bm{E}]
$$

$$
\bm{P}_{\text{sp}} = \frac{c^2}{2}\epsilon_0\,\nabla \times \operatorname{Im}[\bm{E}^* \times \bm{E}]
$$

Durach & Noginova (2017) 的记号与 Berry 的对应：

| Berry (2009) | Durach & Noginova (2017) | 含义 |
|-------------|--------------------------|------|
| $\bm{E}^* \cdot (\nabla)\bm{E}$ | $(\nabla \bm{E}) \cdot \bm{E}^*$ 的复共轭 | 轨道流（省略常数因子） |
| $\operatorname{Im}[\bm{E}^* \times \bm{E}]$ | — | 自旋密度（偏振椭圆法向量） |
| $\nabla \times \operatorname{Im}[\bm{E}^* \times \bm{E}]$ | $\frac{1}{4}\operatorname{Re}\{\nabla \times (\bm{E}^* \times \bm{P})\}$ | 自旋流（推广到有物质时 $\bm{E} \to \bm{P}$） |

两者的核心区别：Berry 处理的是**自由空间**中的光流（$\bm{E}$ 既是场也是「源」），而 Durach & Noginova 将 $\bm{E}$ 和 $\bm{P}$ 分离，使得 $\nabla$ 作用于 $\bm{E}$ 的项（轨道）和作用于 $\bm{P}$ 的项（自旋）成为独立的物理实体。

---

## 3. 结论

### 3.1 最终力表达式一览

#### 力体密度（单色场时间平均）

$$
\boxed{\bm{f} = \bm{f}_A + \bm{f}_{OE} + \bm{f}_{OM} + \bm{f}_{SE} + \bm{f}_{SM}}
$$

| 分量 | 表达式 | 分类 |
|------|--------|------|
| $\bm{f}_A$ | $\frac{1}{c^2}\frac{\partial}{\partial t}(\bm{E} \times \bm{H})$ | Abraham（脉冲） |
| $\bm{f}_{OE}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{E}^*) \cdot \bm{P}\}$ | 轨道（OAM） |
| $\bm{f}_{OM}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{H}^*) \cdot \bm{M}\}$ | 轨道（OAM） |
| $\bm{f}_{SE}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{P}) \cdot \bm{E}^*\}$ | 自旋（SAM） |
| $\bm{f}_{SM}$ | $\frac{1}{2}\operatorname{Re}\{(\nabla \bm{M}) \cdot \bm{H}^*\}$ | 自旋（SAM） |

#### 轨道力：Strictive-Pressure 分解

$$
\boxed{\bar{\bm{f}}_{OE} = \bar{\bm{f}}_{OE}^{\text{strict}} + \bar{\bm{f}}_{OE}^{\text{press}}}
$$

$$
\bar{\bm{f}}_{OE}^{\text{strict}} = \frac{1}{4}\operatorname{Re}\{\nabla \times [\bm{E}^* \times \bm{P}]\} = \frac{1}{4}\nabla(\bm{E}^* \cdot \bm{P}) \quad \text{（保守力，不产生电流）}
$$

$$
\bar{\bm{f}}_{OE}^{\text{press}} = \frac{1}{4}\operatorname{Re}\{\nabla \times [\bm{E} \times \bm{P}^*]\} = \frac{1}{4}\operatorname{Im}\{\nabla \times [\bm{E} \times \bm{P}^*]\} \quad \text{（非保守力，驱动 PLDE）}
$$

#### 自旋力：三种等价形式

$$
\boxed{\bar{\bm{f}}_{SE} = \frac{1}{4}\operatorname{Re}\{\nabla \times (\bm{E}^* \times \bm{P})\} = \frac{1}{4}\operatorname{Im}\{\nabla \times (\bm{E} \times \bm{P}^*)\} = \frac{1}{4}\operatorname{Re}\{\nabla(\bm{E}^* \cdot \bm{P})\}}
$$

#### 表面力密度（界面处）

$$
\boxed{\bm{F}_{SE} = \frac{1}{2}\operatorname{Re}\{(\bm{P} \cdot \hat{\bm{n}}) \bm{E}^*\}, \qquad \bm{F}_{SM} = \frac{1}{2}\operatorname{Re}\{(\bm{M} \cdot \hat{\bm{n}}) \bm{H}^*\}}
$$

#### SAM 吸收-能量关系

$$
\boxed{\bar{\boldsymbol{\tau}} = \frac{\sigma}{\omega}\,\bar{Q}}
$$

其中 $\sigma = \frac{\operatorname{Im}\{\bm{E} \times \bm{H}^*\}}{\operatorname{Re}\{\bm{E} \times \bm{H}^*\}}$ 为 Stokes 螺旋度参数，$\bar{Q} = \frac{1}{2}\operatorname{Im}\{\epsilon\}|\bm{E}|^2$ 为能量吸收率。

### 3.2 物理结论

| 力类型 | 物理角色 |
|--------|----------|
| **轨道力** (OAM) $\bm{f}_{OE} + \bm{f}_{OM}$ | 线动量传递、OAM 传递；压力分量 $\propto \bm{k}$ 驱动 PLDE |
| **自旋力** (SAM) $\bm{f}_{SE} + \bm{f}_{SM}$ | SAM 传递、扭矩产生；净力为零（$\oint \bm{f}_{SE}\,dV = 0$）但重分布力 |
| **表面自旋力** $\bm{F}_{SE} + \bm{F}_{SM}$ | 界面处 SAM 吸收；将 drag 钉扎在原子层（$\sim 2$ Å） |
| **Abraham 力** $\bm{f}_A$ | 脉冲包络变化；单色场为零 |

### 3.3 OAM vs SAM

| | **OAM (轨道角动量)** | **SAM (自旋角动量)** |
|---|---|---|
| 来源 | 波前相位螺旋结构 | 偏振状态（圆偏振） |
| 相关力 | $\bm{f}_{OE}$, $\bm{f}_{OM}$ | $\bm{f}_{SE}$, $\bm{f}_{SM}$, $\bm{F}_{SE}$, $\bm{F}_{SM}$ |
| 力的积分 | 非零（产生净推力） | 为零（不产生净推力） |
| 产生的扭矩 | $\bm{r} \times \bm{f}_{\text{orbital}}$ | $\bm{P} \times \bm{E} + \bm{M} \times \bm{H}$ |
| 在 PLDE 中的角色 | 压力力驱动电流 | 将动量沉积钉扎在表面 |

### 3.4 关于非均匀介质

**推导对非均匀介质不需要额外假设。**Eqs. (7)-(8) 的力分解仅依赖 Maxwell 方程和定义 $D = \epsilon_0 E + P$，$B = \mu_0 H + M$，全过程不需要 $D = \epsilon E$ 等本构关系。当引入 $P = (\epsilon(\bm{r}) - \epsilon_0)\bm{E}$ 后：

$$
f_{SE} = \frac{1}{2}\operatorname{Re}\{\underbrace{(\nabla\epsilon)E \cdot E^*}_{\propto\,\nabla\epsilon} + (\epsilon - \epsilon_0)(\nabla E) \cdot E^*\}
$$

$\nabla\epsilon$ 项在界面处自然给出表面力——不需要单独添加表面项。唯一实质性约束是**局域性**（无空间色散/非局域效应）。

---

## 参考文献

1. **Berry (2009)**: *Optical currents*, J. Opt. A: Pure Appl. Opt. **11**, 094001 — Poynting 矢量的轨道/自旋分解
2. **Bliokh, Bekshaev, Nori (2013)**: *Dual electromagnetism*, NJP **15**, 033026 — 双对称 Lagrangian 与 SAM 定义
3. **Bliokh, Dressel, Nori (2014)**: *Conservation of SAM and OAM*, NJP **16**, 093037 — SAM/OAM 分立守恒定律
4. **Durach, Rusina, Stockman (2009)**: *Giant SPIDER*, PRL **103**, 186801 — strictive/pressure 分解与自旋电力初现
5. **Durach & Noginova (2016)**: *On Nature of PLDE*, PRB **93**, 161406(R) — PLDE 微观理论
6. **Durach & Noginova (2017)**: *SAM Transfer and Plasmogalvanic Phenomena*, PRB **96**, 195411 — 完整电-磁对称力分解
7. **Barnett & Loudon (2006)**: J. Phys. B **39**, S671 — Lorentz/Einstein-Laub 力对比
8. **Mansuripur (2008)**: Opt. Express **16**, 14821 — 物质中电磁力与扭矩
