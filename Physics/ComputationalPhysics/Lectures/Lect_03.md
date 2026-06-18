# 数值微分与外推

> **参考书目**：(1) NR §5.7; (2) CMP §4

## 问题的数学表述

给定函数 $f(x)$——它可能以解析形式存在，或仅在一个离散网格上已知——计算导数 $f'(x)$。数值微分（Numerical Differentiation）的动机来自：

- 函数太复杂，解析求导不可行或过于冗长；
- 函数仅在离散格点上已知（实验数据、前步数值解）；
- 与求根、优化、ODE 求解等算法的耦合（需要 Jacobian、Hessian 等信息）。

与数值积分不同，数值微分是**病态（Ill-Conditioned）**的操作：当数据含有微小扰动时，微分结果会被剧烈放大。理解这一点的定量机制是本章的核心。

## 有限差分近似（Finite Difference Approximations）

所有有限差分公式都基于 Taylor 展开：

$$f(x + h) = f(x) + h f'(x) + \frac{h^2}{2!}f''(x) + \frac{h^3}{3!}f'''(x) + \frac{h^4}{4!}f^{(4)}(x) + \cdots$$

通过组合不同点的函数值，我们消去高阶项以获得所需导数的近似。差分格式的核心特征是两点：**差分阶数**（用到了几个点）和**截断误差阶数**（首项被消去的 $h$ 的幂次）。

### 前向差分（Forward Difference）

从 Taylor 展开直接解出 $f'(x)$ 得到一阶前向差分（两点格式，$O(h)$）：

$$f'(x) = \frac{f(x + h) - f(x)}{h} - \frac{h}{2}f''(x) - \frac{h^2}{6}f'''(x) + \cdots$$

取前两项作为近似：

$$f'(x) \approx \frac{f(x + h) - f(x)}{h}, \quad \text{截断误差 } O(h)$$

**高阶前向差分**（通过多点取消更多低阶项）：

三点前向差分（$O(h^2)$）：

$$f'(x) \approx \frac{-3f(x) + 4f(x+h) - f(x+2h)}{2h}$$

推导方法：在 $x$ 处设待定系数 $\alpha f(x) + \beta f(x+h) + \gamma f(x+2h) = h f'(x) + O(h^3)$，将 Taylor 展开代入并逐阶匹配系数：

$$
\begin{cases}
\alpha + \beta + \gamma = 0 & (h^0 \text{ 项：} f(x)) \\
\beta h + \gamma \cdot 2h = h & (h^1 \text{ 项：} h f'(x)) \\
\beta \frac{h^2}{2} + \gamma \frac{(2h)^2}{2} = 0 & (h^2 \text{ 项：消去})
\end{cases}
$$

解得 $\alpha = -3/(2h)$，$\beta = 4/(2h)$，$\gamma = -1/(2h)$。

### 后向差分（Backward Difference）

与前向差分对称，一阶后向差分（两点格式，$O(h)$）：

$$f'(x) \approx \frac{f(x) - f(x-h)}{h}, \quad \text{截断误差 } O(h)$$

三点后向差分（$O(h^2)$）：

$$f'(x) \approx \frac{3f(x) - 4f(x-h) + f(x-2h)}{2h}$$

**三点后向差分的详细推导**（待定系数法）：

设近似形式为 $f'(x) \approx \dfrac{\alpha f(x) + \beta f(x-h) + \gamma f(x-2h)}{h}$，目标：选择 $\alpha, \beta, \gamma$ 使得截断误差量级为 $O(h^2)$。

将 $f(x-h)$ 和 $f(x-2h)$ 在 $x$ 处 Taylor 展开：

$$
\begin{aligned}
f(x-h) &= f(x) - h f'(x) + \frac{h^2}{2!}f''(x) - \frac{h^3}{3!}f'''(x) + \frac{h^4}{4!}f^{(4)}(x) + \cdots \\
f(x-2h) &= f(x) - 2h f'(x) + \frac{(2h)^2}{2!}f''(x) - \frac{(2h)^3}{3!}f'''(x) + \frac{(2h)^4}{4!}f^{(4)}(x) + \cdots
\end{aligned}
$$

代入组合 $\alpha f(x) + \beta f(x-h) + \gamma f(x-2h)$，按 $h$ 的幂次合并同类项：

$$
\begin{aligned}
&(\alpha + \beta + \gamma) f(x) \\
&+ (-\beta - 2\gamma) \, h f'(x) \\
&+ \left(\frac{\beta}{2} + 2\gamma\right) h^2 f''(x) \\
&+ \left(-\frac{\beta}{6} - \frac{4\gamma}{3}\right) h^3 f'''(x) \\
&+ O(h^4)
\end{aligned}
$$

我们希望此组合等于 $h f'(x) + O(h^3)$（除以 $h$ 后给出 $f'(x) + O(h^2)$）。因此建立匹配方程，逐阶消去不希望出现的项：

$$
\begin{cases}
\alpha + \beta + \gamma = 0 & \text{消去 } h^0 f(x) \text{ 项} \\
-\beta - 2\gamma = 1 & \text{匹配 } h^1 f'(x) \text{ 的系数为 } 1 \\
\dfrac{\beta}{2} + 2\gamma = 0 & \text{消去 } h^2 f''(x) \text{ 项}
\end{cases}
$$

从第三个方程：$\beta = -4\gamma$。代入第二个：$-(-4\gamma) - 2\gamma = 2\gamma = 1$，得 $\gamma = 1/2$。回代得 $\beta = -2$，再从第一个得 $\alpha = -\beta - \gamma = 2 - 1/2 = 3/2$。

因此：

$$\frac{\frac{3}{2}f(x) - 2f(x-h) + \frac{1}{2}f(x-2h)}{h} = f'(x) + \left(-\frac{\beta}{6} - \frac{4\gamma}{3}\right) \frac{h^3}{h} f'''(x) + \cdots$$

截断误差首项：$-\dfrac{\beta}{6} - \dfrac{4\gamma}{3} = -\dfrac{-2}{6} - \dfrac{4 \cdot (1/2)}{3} = \dfrac{1}{3} - \dfrac{2}{3} = -\dfrac{1}{3}$。因此 $\displaystyle f'(x) - \frac{3f(x) - 4f(x-h) + f(x-2h)}{2h} = \frac{h^2}{3}f'''(x) + O(h^3)$，即截断误差为 $O(h^2)$。乘以 2 得标准形式：

$$\boxed{f'(x) \approx \frac{3f(x) - 4f(x-h) + f(x-2h)}{2h}, \quad \text{截断误差 } O(h^2)}$$

### 中心差分（Central Difference）

中心差分利用 $x$ 两侧对称的点。Taylor 展开的组合中，所有奇数阶项的系数天然为零，因此两点中心差分的截断误差跃升为 $O(h^2)$——只用了两个函数值就达到了二阶精度：

$$f(x+h) = f(x) + h f'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + \frac{h^4}{24}f^{(4)}(x) + \cdots$$

$$f(x-h) = f(x) - h f'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x) + \frac{h^4}{24}f^{(4)}(x) - \cdots$$

相减消去所有偶次项：

$$f(x+h) - f(x-h) = 2h f'(x) + \frac{h^3}{3}f'''(x) + \frac{h^5}{60}f^{(5)}(x) + \cdots$$

解得两点中心差分（$O(h^2)$）：

$$f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}, \quad \text{截断误差 } O(h^2)$$

四点中心差分（更高精度，$O(h^4)$）：

$$f'(x) \approx \frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}$$

系数 $(-1, 8, -8, 1)/12$ 的推导：设 $f'(x) \approx [\alpha f(x+2h) + \beta f(x+h) + \gamma f(x-h) + \delta f(x-2h)]/h$，利用对称性 $\gamma = -\beta, \delta = -\alpha$，再与 Taylor 展开逐项匹配 $h^3$ 的消去条件得到 $\alpha/\beta$ 的比值。

### 二阶及高阶导数

二阶导数的三点中心差分（$O(h^2)$）由 Taylor 展开相加得到：

$$f(x+h) + f(x-h) = 2f(x) + h^2 f''(x) + \frac{h^4}{12}f^{(4)}(x) + \cdots$$

解得：

$$f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}, \quad \text{截断误差 } O(h^2)$$

更高阶格式（$O(h^4)$ 五点中心差分）：

$$f''(x) \approx \frac{-f(x+2h) + 16f(x+h) - 30f(x) + 16f(x-h) - f(x-2h)}{12h^2}$$

**$O(h^4)$ 五点中心二阶差分的详细推导**（待定系数法）：

设对称模版上的近似形式为

$$f''(x) \approx \frac{a f(x+2h) + b f(x+h) + c f(x) + b f(x-h) + a f(x-2h)}{h^2}$$

其中利用对称性：$f(x+h)$ 与 $f(x-h)$ 系数相等（均为 $b$），$f(x+2h)$ 与 $f(x-2h)$ 系数相等（均为 $a$）。三个待定系数 $a, b, c$ 需要消去 $h^0 f(x)$ 项、$h^4 f^{(4)}(x)$ 项，并匹配 $h^2 f''(x)$ 的系数。

将 $f(x \pm h)$ 和 $f(x \pm 2h)$ 在 $x$ 处 Taylor 展开到 $h^6$ 项（因为目标是 $O(h^4)$ 截断误差，$h^4$ 的项需被消去，留下 $h^6$ 项为首项误差）：

$$
\begin{aligned}
f(x \pm h) &= f(x) \pm h f'(x) + \frac{h^2}{2!}f''(x) \pm \frac{h^3}{3!}f'''(x) + \frac{h^4}{4!}f^{(4)}(x) \pm \frac{h^5}{5!}f^{(5)}(x) + \frac{h^6}{6!}f^{(6)}(x) + \cdots \\[4pt]
f(x \pm 2h) &= f(x) \pm 2h f'(x) + \frac{(2h)^2}{2!}f''(x) \pm \frac{(2h)^3}{3!}f'''(x) + \frac{(2h)^4}{4!}f^{(4)}(x) \pm \frac{(2h)^5}{5!}f^{(5)}(x) + \frac{(2h)^6}{6!}f^{(6)}(x) + \cdots
\end{aligned}
$$

由于模版对称，$f(x+h)$ 与 $f(x-h)$ 成对相加、$f(x+2h)$ 与 $f(x-2h)$ 成对相加，所有含奇数阶导数（$f', f''', f^{(5)}$）的项**自动抵消**。利用这一性质，只需展开偶次项：

$$
\begin{aligned}
f(x+h) + f(x-h) &= 2f(x) + h^2 f''(x) + \frac{2h^4}{4!}f^{(4)}(x) + \frac{2h^6}{6!}f^{(6)}(x) + O(h^8) \\
&= 2f(x) + h^2 f''(x) + \frac{h^4}{12}f^{(4)}(x) + \frac{h^6}{360}f^{(6)}(x) + O(h^8) \\[6pt]
f(x+2h) + f(x-2h) &= 2f(x) + (2h)^2 f''(x) + \frac{2(2h)^4}{4!}f^{(4)}(x) + \frac{2(2h)^6}{6!}f^{(6)}(x) + O(h^8) \\
&= 2f(x) + 4h^2 f''(x) + \frac{4h^4}{3}f^{(4)}(x) + \frac{8h^6}{45}f^{(6)}(x) + O(h^8)
\end{aligned}
$$

将这三组（近邻对、次近邻对、中心点）按系数组合：

$$
\begin{aligned}
&b\big[f(x+h)+f(x-h)\big] + a\big[f(x+2h)+f(x-2h)\big] + c f(x) \\
&= \; (2b + 2a + c)\,f(x) \\
&\quad + \;(b + 4a)\,h^2 f''(x) \\
&\quad + \;\Big(\frac{b}{12} + \frac{4a}{3}\Big)\,h^4 f^{(4)}(x) \\
&\quad + \;\Big(\frac{b}{360} + \frac{8a}{45}\Big)\,h^6 f^{(6)}(x) + O(h^8)
\end{aligned}
$$

除以 $h^2$ 后，要求等于 $f''(x) + O(h^4)$。建立三阶匹配方程：

$$
\begin{cases}
2a + 2b + c = 0 & \text{消去 } h^0 f(x)/h^2 \text{ 项（否则趋于无穷）} \\[4pt]
4a + b = 1 & \text{匹配 } h^2 f''(x) \text{ 的系数为 } 1 \\[4pt]
\dfrac{4a}{3} + \dfrac{b}{12} = 0 & \text{消去 } h^4 f^{(4)}(x) \text{ 项}
\end{cases}
$$

从第三个方程：乘以 12 得 $16a + b = 0$，即 $b = -16a$。代入第二个方程：

$$4a + (-16a) = -12a = 1 \quad\Longrightarrow\quad a = -\frac{1}{12}$$

回代：$b = -16 \times (-\frac{1}{12}) = \frac{16}{12} = \frac{4}{3}$。从第一个方程：

$$c = -2a - 2b = -2\!\left(-\frac{1}{12}\right) - 2\!\left(\frac{4}{3}\right) = \frac{2}{12} - \frac{8}{3} = \frac{1}{6} - \frac{16}{6} = -\frac{15}{6} = -\frac{5}{2}$$

将 $a, b, c$ 代入公式并乘 12 以消除分母（分子分母同乘—原公式分母为 $h^2$，系数乘 12 后分母变为 $12h^2$）：

$$\boxed{f''(x) \approx \frac{-f(x+2h) + 16f(x+h) - 30f(x) + 16f(x-h) - f(x-2h)}{12h^2}}$$

**截断误差**：$h^6 f^{(6)}(x)$ 的系数给出首项误差。代入 $a, b$：

$$\frac{b}{360} + \frac{8a}{45} = \frac{4/3}{360} + \frac{-8/12}{45} = \frac{4}{1080} - \frac{8}{540} = \frac{1}{270} - \frac{2}{135} = \frac{1}{270} - \frac{4}{270} = -\frac{1}{90}$$

因此除以 $h^2$ 后的截断误差（即 $h^4 f^{(6)}$ 项）为：

$$f''(x) - \frac{-f(x+2h) + \cdots - f(x-2h)}{12h^2} = -\frac{h^4}{90}f^{(6)}(\xi) = O(h^4)$$

截断误差为 $O(h^4)$，对四阶多项式精确。

混合偏导数（Mixed Partials）在二维格点上用中心差分：

$$\frac{\partial^2 f}{\partial x \partial y} \approx \frac{f(x+h, y+k) - f(x+h, y-k) - f(x-h, y+k) + f(x-h, y-k)}{4hk}$$

### 差分格式总结（一阶导数）

| 格式 | 公式 | 点数 | 截断误差 |
|:-----|:-----|:----|:--------|
| 前向差分 (Forward) | $(f(x+h) - f(x))/h$ | 2 | $O(h)$ |
| 后向差分 (Backward) | $(f(x) - f(x-h))/h$ | 2 | $O(h)$ |
| 中心差分 (Central) | $(f(x+h) - f(x-h))/(2h)$ | 2 | $O(h^2)$ |
| 三点前向 (3-pt Forward) | $(-3f(x)+4f(x+h)-f(x+2h))/(2h)$ | 3 | $O(h^2)$ |
| 三点后向 (3-pt Backward) | $(3f(x)-4f(x-h)+f(x-2h))/(2h)$ | 3 | $O(h^2)$ |
| 五点中心 (5-pt Central) | $(-f(x+2h)+8f(x+h)-8f(x-h)+f(x-2h))/(12h)$ | 4 | $O(h^4)$ |

## 差分阶数与模版（Stencil）

差分公式涉及的格点集合称为**模版（Stencil）**。模版的选择取决于实际约束：

- **一阶前向/后向差分**：一端偏置的模版，用于 PDE 的对流项（迎风格式，Upwind Scheme）和边界处不能使用中心模版的场合。
- **中心差分**：对称模版，在函数光滑时以最少点数获得最优精度，是大多数数值微分和 PDE 离散的默认选择。
- **高阶模版**：在函数极光滑（$C^\infty$）时能以 $O(h^k)$ 级别的截断误差逼近导数，但代价是需要更多邻点——在边界处难以实施，且范数可能受到 Runge 型振荡的影响。

构造任意阶差分公式的系统方法可通过**待定系数法（Method of Undetermined Coefficients）** 或 **Forberg 递推（Forberg's Algorithm）** 完成。后者的思想与 Neville 递推极为相似——从低阶格式递推出高阶格式。

## 舍入误差与截断误差的博弈：最佳步长

这是数值微分中最深刻也最具实际意义的结果——**步长 $h$ 并非越小越好**。当 $h$ 太小，舍入误差会主导结果。

### 中心差分的误差分析

以中心差分 $D(h) = \dfrac{f(x+h) - f(x-h)}{2h}$ 为例。设 $\tilde f(x \pm h)$ 是实际计算的（含舍入误差的）函数值：

$$\tilde f(x \pm h) = f(x \pm h) + \varepsilon_{\pm},\quad |\varepsilon_{\pm}| \leq \varepsilon_f$$

$\varepsilon_f$ 是函数值中的绝对误差——若 $f$ 本身以机器精度 $\epsilon_M$ 被计算，则 $\varepsilon_f \approx |f(x)| \, \epsilon_M$。

将含误差的值代入中心差分公式：

$$\tilde D(h) = \frac{\tilde f(x+h) - \tilde f(x-h)}{2h} = D(h) + \frac{\varepsilon_+ - \varepsilon_-}{2h}$$

误差的绝对值为

$$|\tilde D(h) - f'(x)| \leq \underbrace{\frac{h^2}{6}|f'''(x)|}_{\text{截断误差 } E_{\text{trunc}}} + \underbrace{\frac{\varepsilon_f}{h}}_{\text{舍入误差 } E_{\text{round}}}$$

两项随 $h$ 的趋势恰好相反：
- **截断误差** $E_{\text{trunc}} \propto h^2$：$h$ 越小越好。
- **舍入误差** $E_{\text{round}} \propto 1/h$：$h$ 越小越糟，因为差分除以 $h$ 放大了函数值的噪声。

### 最佳步长的推导

总误差

$$E_{\text{total}}(h) \approx \frac{h^2}{6}|f'''(x)| + \frac{\varepsilon_f}{h}$$

对 $h$ 求导并令导数为零：

$$\frac{\mathrm d E_{\text{total}}}{\mathrm d h} = \frac{h}{3}|f'''(x)| - \frac{\varepsilon_f}{h^2} = 0$$

解得

$$h_{\text{opt}} = \left(\frac{3\varepsilon_f}{|f'''(x)|}\right)^{1/3} \propto \varepsilon_f^{1/3}$$

代入 $E_{\text{total}}$ 得到最小可达误差：

$$E_{\text{min}} \approx \frac{3}{2}\left(\frac{\varepsilon_f^2 |f'''(x)|}{3}\right)^{1/3} \propto \varepsilon_f^{2/3}$$

**双精度下的实际取值**：若 $|f(x)| \sim O(1)$、$|f'''(x)| \sim O(1)$，$\varepsilon_f \approx \epsilon_M \approx 10^{-16}$，则

$$h_{\text{opt}} \approx (3 \times 10^{-16})^{1/3} \approx 7 \times 10^{-6}$$

确实，实践中数值微分的双精度步长通常取 $h \sim 10^{-5}$ 到 $10^{-6}$。

### 不同差分格式的最佳步长

对于 $p$ 阶截断误差的格式（$E_{\text{trunc}} \propto h^p$）：

$$E_{\text{total}}(h) \approx C h^p + \frac{\varepsilon_f}{h} \quad\Longrightarrow\quad h_{\text{opt}} = \left(\frac{\varepsilon_f}{p C}\right)^{1/(p+1)}$$

| 差分格式 | 截断阶 $p$ | $h_{\text{opt}} \propto$ | $E_{\text{min}} \propto$ |
|:--------|:----------|:------------------------|:------------------------|
| 前向/后向 (2-pt) | 1 | $\varepsilon_f^{1/2}$ | $\varepsilon_f^{1/2}$ |
| 中心差分 (2-pt) | 2 | $\varepsilon_f^{1/3}$ | $\varepsilon_f^{2/3}$ |
| 五点中心 (4-pt) | 4 | $\varepsilon_f^{1/5}$ | $\varepsilon_f^{4/5}$ |

关键观察：**更高阶的格式有更平坦的最优点**（因为 $h_{\text{opt}} \propto \varepsilon_f^{1/(p+1)}$ 指数更小，最优窗口更宽），且**最小误差更接近机器精度**（$E_{\text{min}} \propto \varepsilon_f^{p/(p+1)}$，$p$ 越大指数越接近 1）。

数值上：
- 前向差分 $E_{\text{min}} \sim 10^{-8}$——仅 8 位有效数字
- 中心差分 $E_{\text{min}} \sim 10^{-11}$——约 11 位
- 五点中心 $E_{\text{min}} \sim 10^{-13}$——约 13 位

这就是即使计算代价相同、也优先选择中心差分（对称模版）而非前向差分的数学原因。

### 实际代码中的步长选择

NR 推荐的经验公式（基于双精度的分析）：

$$h_{\text{opt}} \approx \sqrt{\epsilon_M} \, x_c$$

其中 $x_c$ 是 $x$ 的特征尺度（对一阶导数，NR 建议 $h \approx \epsilon_M^{1/3} \approx 10^{-5}$；对二阶导数，$h \approx \epsilon_M^{1/4} \approx 10^{-4}$）。这个 $\epsilon_M^{1/3}$ 正是上面推导结果的量级。

如果使用**复数步长法（Complex Step Method）**——将 $f(x+ih)$ 的虚部除以 $h$ 来近似 $f'(x)$——可以消除减法带来的灾难性抵消，由此可使用极小的步长（$h \sim 10^{-100}$）达到机器精度级导数近似。但需要函数 $f$ 支持复数运算。

## Richardson 外推（Richardson Extrapolation）

### 核心思想

Richardson 外推的本质是：如果我们知道某个近似值 $\phi(h)$ 的误差展开有规律的形式，可以通过组合不同 $h$ 值的结果来消去首项误差，从而获得更高阶精度的估计——而不需要知道被估计量的真实值。

### 数学推导

设 $\phi(h)$ 是某个量 $\Phi$（这个量可以是一阶导数 $f'(x)$，也可以是数值积分的值）的 $h$ 步长近似。假设截断误差在 $h$ 上有已知的幂展开：

$$\phi(h) = \Phi + c_1 h^{p_1} + c_2 h^{p_2} + \cdots, \quad 0 < p_1 < p_2 < \cdots$$

其中 $p_k$ 是已知的——对中心差分，$p_k = 2, 4, 6, \ldots$（无奇数次项）；对前向/后向差分，$p_k = 1, 2, 3, \ldots$；对 Romberg 积分中的梯形法，$p_k = 2, 4, 6, \ldots$（Euler-Maclaurin 公式）。

第一步：在 $h$ 和 $h/2$ 处求值：

$$\begin{aligned}
\phi(h) &= \Phi + c_1 h^{p_1} + c_2 h^{p_2} + \cdots \\
\phi(h/2) &= \Phi + c_1 \left(\frac{h}{2}\right)^{p_1} + c_2 \left(\frac{h}{2}\right)^{p_2} + \cdots
\end{aligned}$$

用第二个方程乘以 $2^{p_1}$ 减去第一个方程，消去 $c_1$ 项：

$$2^{p_1}\phi(h/2) - \phi(h) = (2^{p_1} - 1)\Phi + c_2' h^{p_2} + \cdots$$

解出 $\Phi$ 到 $O(h^{p_2})$ 精度：

$$\Phi = \frac{2^{p_1}\phi(h/2) - \phi(h)}{2^{p_1} - 1} + O(h^{p_2}) \equiv \phi^{(1)}(h)$$

这就是一阶外推——现在首项误差是 $O(h^{p_2})$ 而非 $O(h^{p_1})$。

### 递推公式与 Neville 形式的统一

这个过程可以迭代。二阶外推消去 $c_2'$ 项，获得 $O(h^{p_3})$ 精度。一般地，第 $m$ 阶外推值 $\phi^{(m)}(h)$ 由已算出的 $\phi^{(m-1)}(h)$ 和 $\phi^{(m-1)}(h/2)$ 递推得到：

$$\phi^{(m)}(h) = \frac{2^{p_m} \phi^{(m-1)}(h/2) - \phi^{(m-1)}(h)}{2^{p_m} - 1}$$

**与 Neville 算法的深度联系**：注意这个递推公式的形式与 Neville 递推

$$P_{i,\ldots,i+m}(x) = \frac{(x - x_i) P_{i+1,\ldots,i+m}(x) - (x - x_{i+m}) P_{i,\ldots,i+m-1}(x)}{x_{i+m} - x_i}$$

**完全同构**。在 Richardson 外推中，自变量是 $h$，目标极限是 $h \to 0$（对应于 Neville 中 $x \to$ 目标值）。$h_k$ 序列对应节点 $x_i$，$\phi(h_k)$ 对应函数值 $y_i$。当 $p_k = k$（前向/后向差分）或 $p_k = 2k$（中心差分、Romberg 积分）时，Richardson 递推就是 Neville 递推的一个实例。

这种思想上的统一非常深刻：**插值和外推在数学上是一回事——都是在已知节点上用多项式近似，然后求中间（插值）或节点外（外推）的值**。Richardson 外推是将 $h$ 视为变量，在 $h=0$ 处做外推。

### 制作外推表格（Extrapolation Table）

外推表格与 Neville 表格结构相同。以中心差分为例（$p_k = 2, 4, 6, \ldots$），用步长序列 $h, h/2, h/4, \ldots$：

**步骤**：
1. 计算最左列的裸近似值 $\phi(h), \phi(h/2), \phi(h/4), \phi(h/8), \ldots$
2. 每向右一列，用左边的两个值递推，消去当前阶的截断误差。

```
           m=0                  m=1                    m=2                    m=3
────────────────────────────────────────────────────────────────────────────────────────
h:    φ(h) = φ_0^{(0)}
                         φ_1^{(1)} = (4φ(h/2) - φ(h))/3
h/2:  φ(h/2) = φ_1^{(0)}                              φ_2^{(2)} = (16φ_1^{(1)} - φ_0^{(1)})/15
                         φ_2^{(1)} = (4φ(h/4) - φ(h/2))/3                                       φ_3^{(3)}
h/4:  φ(h/4) = φ_2^{(0)}                              φ_3^{(2)} = (16φ_2^{(1)} - φ_1^{(1)})/15
                         φ_3^{(1)} = (4φ(h/8) - φ(h/4))/3
h/8:  φ(h/8) = φ_3^{(0)}
```

递推公式（$m \geq 1$）：

$$\phi_k^{(m)} = \frac{4^m \phi_{k-1}^{(m-1)} - \phi_k^{(m-1)}}{4^m - 1}$$

这里 $4^m = (2^2)^m = 2^{2m}$ 对应 $2^{p_m}$（因为 $p_m = 2m$）。

### 误差估计与收敛判断

外推表格与 Neville 表格一样自带误差估计：相邻两项之差

$$\Delta_k^{(m)} = |\phi_k^{(m)} - \phi_k^{(m-1)}|$$

可用于判断是否继续添加步长。当 $\Delta$ 不再显著减小或出现不规则波动时，说明已达到舍入误差主导的区域，继续外推无益。

### Richardson 外推的应用范围

它在数值分析中的使用极其广泛：

1. **数值微分**：Romberg 微分（中心差分 + 外推消去 $O(h^2), O(h^4), \ldots$ 误差）。
2. **数值积分**：Romberg 积分（梯形法 + Richardson 外推）。
3. **ODE 求解**：Gragg 的外推法（Bulirsch-Stoer 方法的核心——在 $h \to 0$ 外推）。
4. **极限计算**：在物理中递推求解某些无量纲参数在连续极限下的值。

## 数值微分的实践建议

1. **首选中心差分**：对一阶导数，中心差分在仅仅两个函数求值下获得 $O(h^2)$ 精度。除非边界条件限制无法使用中心模版（如 PDE 边界的迎风格式），否则不要用前向/后向差分。

2. **不要用太小的 $h$**：$h \sim 10^{-5}$ 到 $10^{-6}$ 是双精度下一个安全的默认值（对于 $O(1)$ 尺度的函数）。如果你的函数在计算过程中本身就有数值噪声，$h$ 需要更大。

3. **优先使用 Richardson 外推做精度提升**：与其直接使用更高阶的模版（需要更多函数求值），不如用中心差分配合外推——同样的函数求值量、更灵活的精度控制、外加免费误差估计。

4. **当函数求值昂贵且需要极高一阶导数精度时**：考虑复步法（如果函数支持复数参数）或自动微分（Automatic Differentiation, AD）。AD 提供机器精度级的导数，且计算量仅是原函数的常数倍（而非差分法随参数数目线性增长）。

## 各算法优缺点总结

### 前向差分（Forward Difference）

**优点**：
- 在边界点处可用——不需要对称的格点结构，自然用于 PDE 边界的迎风格式和左侧边界的导数计算。
- 公式极简单，仅需当前点和下一个点——在实时系统中计算开销最小。
- 因果性（Causality）——只使用 $x$ 和 $x+h$，不涉及"未来"信息。在时间推进的初值问题中（时间不能"倒流"），前向差分是时间导数的自然选择。

**缺点**：
- 仅一阶收敛 $O(h)$——三种格式中精度最差。在双精度下最优误差 $\sim 10^{-8}$（只有中心差分 $10^{-11}$ 的千分之一），不适合高精度需求。
- 模版只在一端——不对称导致截断误差更大，且误差的渐近展开中 $h$ 的奇次幂全部存在（不同于中心差分的偶次幂性质），Richardson 外推的效率因此打折。
- $h_{\text{opt}} \propto \varepsilon_f^{1/2}$——最优步长相对中心差分的 $\varepsilon_f^{1/3}$ 更敏感于舍入误差的微小变化，最优窗口更窄。

### 后向差分（Backward Difference）

**优点**：
- 与前向差分对称，在右边界和终值条件处是唯一选择。
- 同样极简单——在嵌入式系统或 GPU 内核中实现成本最低。
- 在隐式 ODE 求解器（如 BDF，后向差分公式）中用作时间导数的离散模式。

**缺点**：
- 除几何方向相反外，与一阶前向差分的所有缺陷相同：$O(h)$ 精度、不对称模版、$h_{\text{opt}}$ 敏感。
- 在时间推进问题中，后向差分需要"过去"信息——适用于边界条件但不适用于从初值出发的步进。

### 中心差分（Central Difference）

**优点**：
- **一个模版、两个函数值、$O(h^2)$ 精度**——效率远超前向/后向的 $O(h)$。对称性自动消去 $h^2$ 项，使截断误差跃升至 $h^3$ 项主导。
- 误差展开中只有 $h$ 的**偶次幂**——与 Richardson 外推的 $p_k = 2,4,6,\ldots$ 完美配合，每次外推跳两级精度。
- $h_{\text{opt}} \propto \varepsilon_f^{1/3}$——最优步长窗口较宽，对舍入误差的变化不敏感。双精度下 $E_{\text{min}} \sim 10^{-11}$（约 11 位有效数字）。
- 作为多数数值离散方案（PDE、ODE、数值积分的基础模版）的默认选择——在光滑函数上以最小代价获得最优精度。

**缺点**：
- 物理域边界不可用——$x \pm h$ 在域的边缘有一侧不存在。边界附近需要与前向/后向差分混合使用。
- 假设函数在 $[x-h, x+h]$ 上充分光滑（至少 $C^3$）。若函数有间断或尖角（如激波、相边界），中心差分在跨间断处给出无意义的导数。
- 对于主导的对流方向的 PDE（平流方程），中心差分在空间离散上不提供**迎风性（Upwinding）**——会引入非物理的数值振荡，需额外的数值耗散来压制。

### 五点中心差分（5-pt Central）

**优点**：
- 仅用 4 个函数值即达到 $O(h^4)$ 精度——$h_{\text{opt}} \propto \varepsilon_f^{1/5}$，双精度下 $E_{\text{min}} \sim 10^{-13}$（13 位有效数字）。
- 最优点处的误差窗口最宽——$\varepsilon_f^{1/5}$ 使最优步长对 $\varepsilon_f$ 的变化最不敏感。
- 在光谱学、流体力学 DNS（直接数值模拟）等需要高精度导数的场景中是标准工具。

**缺点**：
- 需要 4 个邻点——在离边界 2 个格点以内无法直接使用，需要降阶到中心差分或偏置模版。
- 对于非光滑数据——系数 $(-1, 8, -8, 1)/12$ 的放大效应：小的函数值噪声在高阶差分中被放大（系数的绝对值之和 ÷ 分子 $h$ 约 $18/h$）。
- 有时不必使用——若 Richardson 外推已经可用，用两点中心差分配合两次外推比直接用四点中心差分更灵活（且自带误差估计）。

### Richardson 外推（Richardson Extrapolation）

**优点**：
- **以软件代替硬件——用已知步长的两个低精度近似获得等效的高阶精度**，不需要推导更高阶的模版系数。
- 自带误差估计——外推表格的相邻项之差即当前阶的误差估计。这比单次高精度差分计算后猜测误差要可靠得多。
- **与 Neville 算法完全统一的递推结构**——学一次，多处用（数值微分 / Romberg 积分 / Bulirsch-Stoer ODE）。
- 可灵活选择步长序列——$h_k = h_0 / 2^k$ 是标准方案，但也可针对特定问题设计更高效的序列。
- 外推阶数可动态决定——只需生成足够多的裸近似值，根据 $\Delta_k$ 是否再下降决定继续还是停止。

**缺点**：
- 需要多次计算裸近似 $\phi(h_k)$——对昂贵的函数求值（如每次需要求解一个子问题），额外开销不可忽略。
- 过度外推引入**噪声放大**——外推公式的分母 $4^m-1$ 随 $m$ 快速增大，差的噪声被 (大因子 / 小分母) 放大。在 $\phi(h_k)$ 含舍入误差时，外推超过 $m=4\sim5$ 通常无益。
- 依赖于误差展开的具体形式（$p_k$ 序列已知）——若 $p_k$ 与预设不符（如函数非光滑导致展开中有非整数幂项），外推不准甚至产生假收敛。
- 外推到 $h=0$ 不总是合理——若函数本身具有一个有限的特征尺度（如网格的 Nyquist 尺度），$h \to 0$ 的外推在该尺度以下无物理意义。

### 使用场景决策树

1. **默认选择** → 中心差分（$O(h^2)$）- 光滑函数、非边界、精度要求适中。
2. **极高精度需求** → 中心差分 + Richardson 外推（2-3 次外推）。
3. **边界 / 初值问题的时间导数** → 前向差分（$O(h)$），如有精度需求用三点前向（$O(h^2)$）。
4. **函数含噪声 / 非光滑** → 加大 $h$，用低阶差分（不要试图用高阶模版外推）。
5. **函数求值极其昂贵** → 用最低阶的中心差分（2 个函数值），容忍较少的有效数字。
