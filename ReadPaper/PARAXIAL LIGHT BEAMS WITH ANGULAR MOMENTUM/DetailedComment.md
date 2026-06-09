# Detailed Comment: Verification of the Non-collinear RDE Derivations

## 原文献信息

**Bekshaev, A. & Popov, A. (2004).** *Non-collinear rotational Doppler effect.*
I.I. Mechnikov National University, Odessa, Ukraine.

这是对 [NonCollinearRotationalDopplerEffect.md](NonCollinearRotationalDopplerEffect.md) 中推导的逐一验证，基于 2004 年作者本人的原始论文（以下简称"原论文"）。原论文是综述第 7.6 节所引用的参考文献 [174]。

---

## 1. 能量分析推导的验证

### 1.1 频率移动公式

| 项目 | .md 文件 | 原论文 | 验证 |
|------|---------|--------|------|
| 力矩大小 | $|\mathbf{K}| = 2l\hbar c \cos\beta$ (单位光子通量) | $|\mathbf{K}| = 2Nl\hbar c \cos\beta$ (Eq. 前) | ✅ 一致（$\hbar = \hbar$，$N$ 是光子线密度） |
| 能量变化 | $\Delta E = -2l\hbar\Omega \cos^2\beta$ | $\Delta E_{\text{per photon}} = -2l\hbar\Omega \cos^2\beta$ | ✅ 一致 |
| 频率移动 | $\Delta\omega = -2l\Omega\cos^2\beta$ (Eq. 86) | $\Delta\omega = -2l\Omega\cos^2\beta$ (Eq. 7) | ✅ 完全一致 |

**评注**：频率移动式 (86)/(7) 是全文的出发点，两篇文献完全一致。注意这里 $\cos^2\beta$ 是指 $(\cos\beta)^2$。验证：$\beta=0$（镜面不倾斜，共线情形）时 $\Delta\omega = -2l\Omega$，退化为共线 RDE (Eq. 6)；$\beta=\pi/2$ 时 $\Delta\omega = 0$。

### 1.2 相位积累

| 项目 | .md 文件 | 原论文 | 验证 |
|------|---------|--------|------|
| 相位变化 | $\Delta(k\varphi) = -2l\theta\cos^2\beta$ (Eq. 87) | $\Delta\phi = 2l\theta\cos^2\beta$ (Eq. 8) | ⚠️ 符号差异（见评注） |
| 完整一周 | $\Delta\alpha_1 = -4\pi\cos^2\beta$ (Eq. 88) | $|\Delta\varphi| = 4\pi\cos^2\beta$ (Eq. 10) | ✅ 绝对值一致 |

**符号差异的分析**：

原论文 Eq. (8) 使用 $+2l\theta\cos^2\beta$。`.md` 文件中 Eq. (87) 使用 $-2l\theta\cos^2\beta$。差异来源于 $l$ 的符号约定：
- 原论文设定输入光束 $l>0$，相位因子为 $\exp[i(kz + l\phi - \omega t)]$，输出光束的 $l$ 不变（但镜子翻转螺旋手性），反射过程不影响 $l$ 的定义方式。
- 综述设定输入光束 $l>0$，但输出光束具有 azimuthal index $-l$（反射导致手性翻转）。因此输出光束的相位变化带负号。

这纯粹是符号约定的差异，不影响物理结论。两篇文献在完整一周后的相位变化绝对值 $4\pi|l|\cos^2\beta$ 一致。

---

## 2. 两个悖论的验证

### 2.1 悖论一：相位不闭合

原论文 Eq. (9): $\Delta\phi = 4\pi l \cos^2\beta$（完整一周后）。
原论文原文："after a whole cycle of the system revolution, when its configuration returns to the initial state, the output beam phase does not return to its initial value; it experiences the non-integer (in units of 2π) phase shift."

与 `.md` 文件第 3 节描述一致。✅

### 2.2 悖论二：图像旋转的跃变

原论文原文（Sec. 2 末尾）：
- "forward reflection" ($\beta < 45^\circ$): 输出图像转两圈
- "back reflection" ($\beta > 45^\circ$): 输出图像完全不转

与 `.md` 文件第 4 节描述完全一致。✅

---

## 3. 运动学分析与平行输运的验证

### 3.1 光束轴矢量 t(θ)

| 项目 | .md 文件 (Eq. A1) | 原论文 (Eq. 11) | 验证 |
|------|-------------------|-----------------|------|
| $\mathbf{t}(\theta)$ | $(\sin 2\beta\cos\theta, \sin 2\beta\sin\theta, \cos 2\beta)$ | $(-\sin 2\beta\cos\theta, -\sin 2\beta\sin\theta, \cos 2\beta)$ | ⚠️ 差 $\pi$ 相位 |

**分析**：两者的 $x,y$ 分量符号相反，相当于 $\theta \to \theta + \pi$（方位角差 $\pi$）。这对应于不同的初始镜子方位角，不影响平行输运的物理——它只是在同一条纬线上的不同起点。后续所有与 $\theta$ 导数相关的计算结果（如和乐角）不受此影响，因为纬线是闭合的。✅ 物理等价。

### 3.2 平行输运方程

| 项目 | .md 文件 | 原论文 | 验证 |
|------|---------|--------|------|
| 方程 | $\frac{d\mathbf{e}}{d\theta} = -(\frac{d\mathbf{t}}{d\theta} \cdot \mathbf{e})\mathbf{t}$ (Eq. 89) | $\dot{\mathbf{e}} = -(\dot{\mathbf{t}}, \mathbf{e})\mathbf{t}$ (Eq. 18) | ✅ 完全一致 |

原论文从三个自然假设推导出此方程（Sec. 4 的假设 (a)-(c)）：
- (a) $\mathbf{e} \perp \mathbf{t}$：参考轴始终在光束横截面内
- (b) $|\mathbf{e}| = 1$：单位矢量
- (c) $\mathbf{e}$ 在分析平面（光束横截面）中不自转

### 3.3 平行输运的解析解

原论文 Eq. (19) 给出了 $\mathbf{e}$ 在实验室坐标系中的显式解：

$$\begin{aligned}
e_X(\theta) &= \cos 2\beta \cos\theta \cos(\theta\cos 2\beta - \alpha) + \sin\theta \sin(\theta\cos 2\beta - \alpha) \\
e_Y(\theta) &= \cos 2\beta \sin\theta \cos(\theta\cos 2\beta - \alpha) - \cos\theta \sin(\theta\cos 2\beta - \alpha) \\
e_Z(\theta) &= \sin 2\beta \cos(\theta\cos 2\beta - \alpha)
\end{aligned}$$

其中 $\alpha$ 是 $\mathbf{e}$ 的初始方位角参数。

原论文 Eq. (20) 在 $x'y'z(\theta)$ 坐标系中：

$$e'_x = -\cos(\theta - \theta\cos 2\beta + \alpha), \quad e'_y = -\sin(\theta - \theta\cos 2\beta + \alpha)$$

**关键观察**：上述解析解中出现的是 $\cos 2\beta$**而非** $\cos^2\beta$。$\cos 2\beta$ 是 $\cos(2\beta)$，即两倍倾角的余弦。

### 3.4 平行输运微分方程的验证

`.md` 文件第 8.3 节的推导给出了：

$$\frac{d\varphi}{d\theta} = -\cos 2\beta$$

其中 $\varphi$ 是 $\mathbf{e}$ 相对于经线方向 $\hat{\mathbf{e}}_\theta$ 的夹角。

**验证**：对原论文 Eq. (20) 求导——在 $x'y'z(\theta)$ 系中，$\mathbf{e}$ 的角参数为 $\theta - \theta\cos 2\beta + \alpha$，其导数为 $1 - \cos 2\beta$。注意 $x'y'z(\theta)$ 系与 $xyz(\theta)$ 系相差一个角度为 $\theta$ 的旋转（且方向相反，见原论文 Sec. 3），转换到 $xyz(\theta)$ 系（即 `.md` 文件中的经线-纬线标架）时，$\mathbf{e}$ 的角参数变为 $\theta\cos 2\beta - \alpha$，导数为 $\cos 2\beta$。这与 `.md` 文件的 $d\varphi/d\theta = -\cos 2\beta$ **完全一致**（符号取决于 $\varphi$ 的定义方向）。✅ **验证通过**。

### 3.5 和乐（几何相位）的计算

`.md` 文件 Eq. (A13):
$$\Delta\Phi_{\text{holonomy}} = -2\pi\cos 2\beta$$

原论文给出：在 $x'y'z(\theta)$ 系中，完整一周后 $\mathbf{e}$ 偏转 $2\pi(1 - \cos 2\beta) = 4\pi\sin^2\beta$。

**关系验证**：
- 在 $xyz(\theta)$（tangent frame）中：$\Delta\Phi = 2\pi\cos 2\beta$（原论文 Eq. (19)-(20) 推导）
- 在 $x'y'z(\theta)$ 中：$\Delta\Phi' = 2\pi(1 - \cos 2\beta) = 4\pi\sin^2\beta$
- 两者差 $\Delta\Phi' - \Delta\Phi = 2\pi$，这正好是两个坐标系之间的相对旋转（$x'y'z$ 相对 $xyz$ 转过了 $-\theta$，一周 $2\pi$）。
- **重要**：$4\pi\sin^2\beta \equiv -2\pi\cos 2\beta \pmod{2\pi}$（因为 $4\pi\sin^2\beta = 4\pi(1-\cos^2\beta) = 4\pi - 4\pi\cos^2\beta \equiv -4\pi\cos^2\beta$，而 $-2\pi\cos 2\beta = -2\pi(\cos^2\beta-\sin^2\beta) = -4\pi\cos^2\beta + 2\pi \equiv -4\pi\cos^2\beta$，两者模 $2\pi$ 等价）。

✅ **`.md` 文件的平行输运计算在数学上完全正确，且与原论文自洽。**

---

## 4. 发现的差异：综述中"箭头偏转角"公式的问题

这是本次验证最关键的发现。

### 4.1 差异点

| 来源 | 偏转角变化率 | 完整一周后的偏转角 |
|------|------------|------------------|
| 综述（第 7.6 节） | $\Delta\alpha = \Delta\theta\cos^2\beta$ | $2\pi\cos^2\beta$ |
| 原论文 2004 | $d(\text{angle})/d\theta = \cos 2\beta$（在 $xyz$ 系） | $2\pi\cos 2\beta$ 或 $4\pi\sin^2\beta$ |
| `.md` 文件独立推导 | $d\varphi/d\theta = -\cos 2\beta$ | $-2\pi\cos 2\beta$ |

### 4.2 自洽性检验

原论文的关键自洽性论证（Sec. 4 末尾）：
- $\mathbf{e}$ 的偏转：$4\pi\sin^2\beta$
- 光束的"proper"旋转（Eq. 10）：$4\pi\cos^2\beta$
- **合计**：$4\pi(\sin^2\beta + \cos^2\beta) = 4\pi$（整数圈，图案复原！）✅

若使用综述的数值（$2\pi\cos^2\beta$）：
- $\mathbf{e}$ 偏转：$2\pi\cos^2\beta$
- 光束旋转：$4\pi\cos^2\beta$
- **合计**：$6\pi\cos^2\beta \neq 4\pi$（不自洽！）❌

### 4.3 结论

**综述第 7.6 节中"$\Delta\alpha = \Delta\theta\cos^2\beta$"和"偏转角 $2\pi\cos^2\beta$"很可能是一个笔误。**正确的公式应为：

$$\Delta\alpha = \Delta\theta \cos 2\beta$$

即使用 $\cos(2\beta)$（两倍倾角的余弦）而非 $\cos^2\beta$（余弦的平方）。在这个修正下，综述中后续的讨论（如光束旋转 $2\Omega\cos^2\beta$、连续过渡等）都保持正确，因为这些结论使用的是 $1 + \cos 2\beta = 2\cos^2\beta$ 这一恒等式，不依赖于箭头偏转角的具体取值。

### 4.4 为什么这个笔误不影响综述的整体论述？

综述的核心逻辑链中：
1. 能量分析 → $\Delta\omega = -2l\Omega\cos^2\beta$ ✅（正确，用 $\cos^2\beta$）
2. 在自然参考系中光束总角位移 $\Delta\theta(1+\cos 2\beta) = 2\Delta\theta\cos^2\beta$ ✅（正确，恒等式成立）
3. 连续过渡的解释 ✅（正确，$2\Omega\cos^2\beta$ 随 $\beta$ 连续变化）

"箭头偏转角"的具体数值仅在直观解释平行输运时出现，不影响上述核心论证。`.md` 文件第 8 节的独立数学推导给出的是正确的 $\cos 2\beta$ 形式，与原论文一致。

---

## 5. `.md` 文件第 8 节 vs 原论文：逐项核对

### 5.1 正确的部分

| `.md` 文件内容 | 原论文对应 | 验证 |
|---------------|-----------|------|
| 8.1 球面几何设定（余纬 $2\beta$） | Eq. (11), Sec. 3 | ✅ |
| 8.2 切平面正交标架 | $xyz(\theta)$ 系（经线-纬线） | ✅ |
| 8.3 平行输运方程求解（5 步推导） | Eq. (18)-(20), Appendix 2 | ✅ 推导逻辑与原论文一致 |
| $d\varphi/d\theta = -\cos 2\beta$ (Eq. A10) | Eq. (20) 角参数求导 | ✅ |
| Holonomy $= -2\pi\cos 2\beta$ (Eq. A13) | $2\pi\cos 2\beta$（符号差在约定） | ✅ |
| 立体角 $= 2\pi(1-\cos 2\beta)$ (Eq. A14) | $2\pi(1-\cos 2\beta) = 4\pi\sin^2\beta$ | ✅ |
| 光束总角位移 $2\Delta\theta\cos^2\beta$ (Eq. A15) | Eq. (22): $2\Omega\cos^2\beta$ | ✅ |
| 8.6-8.7 悖论的拓扑解释 | Sec. 5 (Conclusions) | ✅ |
| 8.8 拓扑不变性（任意闭合回路） | Sec. 5 末段 | ✅ |
| 8.9 物理类比表 | Sec. 5 (Foucault, Rytov, Berry, Hannay) | ✅ |
| 8.10 实验室系中的抵消 | Sec. 5 末段 | ✅ |

### 5.2 建议修正的部分

在 `.md` 文件的第 5.4 节和 8.5 节中：

**当前文本（第 108-115 行）**：
> 在反射镜旋转过程中，这种相对取向的变化不断积累。完成一周旋转后，箭头相对于其初始位置偏转了：
> $$\Delta\alpha_{\text{total}} = 2\pi\cos^2\beta$$

**建议修正为**：
> 在反射镜旋转过程中，这种相对取向的变化不断积累。完成一周旋转后，箭头相对于其初始位置偏转了：
> $$\Delta\alpha_{\text{total}} = 2\pi\cos 2\beta$$
>
> 注：这里 $\cos 2\beta = \cos(2\beta)$ 是两倍倾角的余弦。在 $x'y'z$ 坐标系（其 $z$ 轴始终与输出光束轴重合，而 $x',y'$ 轴尽可能保持与实验室轴平行）中，等效的偏转角为 $2\pi(1-\cos 2\beta) = 4\pi\sin^2\beta$。两种表述描述同一几何事实，仅因坐标系不同而相差 $2\pi$。

**原因**：原论文 Eq. (19)-(20) 的解明确显示角参数中出现的是 $\cos 2\beta$（余弦函数），且原论文的自洽性检验（$4\pi\sin^2\beta + 4\pi\cos^2\beta = 4\pi$）依赖于 $\mathbf{e}$ 的偏转为 $4\pi\sin^2\beta$ 而非 $2\pi\cos^2\beta$。

---

## 6. 完整的物理图景（基于原论文）

### 6.1 三个角速度

在原论文的锥形扫描系统中，存在三个不同层次的运动：

| 运动 | 角速度 | 所在参考系 | 公式来源 |
|------|--------|-----------|---------|
| 镜面旋转 | $\Omega$ | 实验室系 | 驱动 |
| 光束"proper"旋转 | $\Omega_1 = 2\Omega\cos 2\beta$ | 实验室系 | Eq. (16) |
| 光束在 $x'y'z$ 系中的旋转 | $\Omega' = 2\Omega$ | $x'y'z$ 系 | Eq. (12) |
| 参考矢量 $\mathbf{e}$ 在 $x'y'z$ 系中的旋转 | $2\Omega\sin^2\beta$ | $x'y'z$ 系 | Eq. (21) |
| 光束在"自然"参考系中的旋转 | $2\Omega\cos^2\beta$ | 自然参考系 | Eq. (22) |

### 6.2 实验室系中图案复原的机制

完整一周（$\theta = 2\pi$）后：
- 光束的"proper"旋转：$4\pi\cos^2\beta$（来自 RDE 动力学）
- 参考系 $\mathbf{e}$ 的偏转：$4\pi\sin^2\beta$（来自平行输运和乐）
- **在自然参考系中测量**：光束相对 $\mathbf{e}$ 旋转了 $4\pi\cos^2\beta - 4\pi\sin^2\beta = 4\pi\cos 2\beta$，该值一般不是 $2\pi$ 整数倍（这解释了为什么"自然观察者"看到非整数圈旋转）
- **在实验室系中测量**：$\mathbf{e}$ 的偏转 $+$ 光束的"proper"旋转 $= 4\pi(\sin^2\beta + \cos^2\beta) = 4\pi \equiv 0 \pmod{2\pi}$（图案复原！）

### 6.3 拓扑不变性

原论文 Sec. 5 (Conclusions) 明确指出：
> "the analogous non-integer phase shift and the reference system rotation will take place upon the beam evolution along arbitrary closed contour on the unit sphere (the effect value depends only on the solid angle embraced by the contour)."

这与 `.md` 文件第 8.8 节的推导（Eq. A16：和乐 = 闭合回路所围立体角）完全一致。✅

---

## 7. 总结

| 方面 | 评估 |
|------|------|
| `.md` 文件第 1-7 节（综述整理） | ✅ 忠实于综述原文 |
| `.md` 文件第 8.1-8.4 节（平行输运计算） | ✅ 数学上完全正确，与原论文一致 |
| `.md` 文件第 8.5 节（与文本公式的关系） | ⚠️ 已指出可能的 $\beta$ 定义差异，分析方向正确 |
| `.md` 文件第 8.6-8.10 节（拓扑解释） | ✅ 物理图景正确，与原论文一致 |
| **发现的实质性问题** | 综述原文中 $\Delta\alpha = \Delta\theta\cos^2\beta$ 应为 $\Delta\alpha = \Delta\theta\cos 2\beta$；`.md` 文件在复述综述时继承了此笔误，但在独立推导（第 8.3-8.4 节）中得到了正确的 $\cos 2\beta$ 结果 |

**整体评价**：`.md` 文件对综述第 7.6 节的整理是准确和完整的。特别是第 8 节独立进行的平行输运计算，虽然出发点是为了补充综述中缺失的详细推导，但恰好纠正了综述中关于 $\mathbf{e}$ 偏转角的潜在笔误，得到了与原论文 2004 完全一致的数学结果。这体现了独立推导的价值。

---

## 8. 坐标系设定详解

原论文使用了多个坐标系，它们之间的转换关系是理解运动学分析（Sec. 3）和参考系运动（Sec. 4）的关键。本节给出系统性的整理。

### 8.1 辅助球面（"地球仪"模型）

所有坐标系共享原点 **M**——倾斜反射镜与旋转轴 Z 的交点（图 6, 7）。

以 M 为中心作一个辅助单位球面（"地球仪"）：

| 球面要素 | 符号 | 定义 | 对应地球类比 |
|---------|------|------|------------|
| 北极 | A | +Z 轴与球面的交点 | 北极 |
| 赤道面 | E | 平面 Z = 0 | 赤道面 |
| 经面 | N | 由 Z 轴和当前输出光束轴投影所张的平面 | 经线平面 |
| 纬圈 | P | 球面上纬度 = $\pi/2 - 2\beta$ 的圆，圆心 O | 纬线 |

输入光束沿 +Z 轴传播（从 M 向北极 A）。倾斜反射镜绕 Z 轴旋转时，输出光束轴 $z(\theta)$ 沿纬圈 P 运动，其方向单位矢量为 $\mathbf{t}(\theta)$。"纬度" $\pi/2 - 2\beta$ 意味着 $\mathbf{t}$ 与 Z 轴的夹角（余纬）为 $2\beta$。

**锥面模型**（图 7）：倾斜镜"无滑动地滚动"在一个以 Z 为轴、半顶角为 $\beta$ 的圆锥面上。输出光束"被困在"另一个相同的圆锥面中，该圆锥在第一个圆锥的侧面无滑动地滚动。两个圆锥共享顶点 M。

### 8.2 四个坐标系的定义

#### (0) XYZ —— 实验室坐标系

- **类型**：固定坐标系（不随镜子旋转）
- **原点**：M
- **Z 轴**：旋转轴，输入光束沿 +Z 传播
- **X, Y**：赤道面（Z = 0 平面）内的固定方向
- **用途**：所有矢量最终在此表达

#### (1) $x_i y_i$ —— 镜子关联坐标系

- **类型**：随镜子旋转的二维坐标系
- **所在平面**：赤道面 Z = 0
- $y_i(\theta)$：**平行于镜面**
- $x_i(\theta)$：指向输出光束轴在赤道面上投影的**反方向**
- **旋转角速度**：$\Omega = \dot{\theta}$（与镜子同步）
- **注意**：这不是完整的 3D 坐标系（只有两个轴，均在赤道面内），主要作用是定义经面 N 的方位

#### (2) $xyz(\theta)$ —— 光束关联坐标系（"地球仪"局部坐标）

- **类型**：固定在输出光束上的 3D 坐标系
- $z(\theta)$：输出光束轴方向，即 $\mathbf{t}(\theta)$
- $x(\theta)$：在经面 N 内（即由 $x_i$ 和 Z 张成的平面），沿"向南"（向赤道）方向
- $y(\theta)$：沿纬圈 P 的切线方向（"向东"）
- $x, y$ 平面 = 光束横截面
- **角色**：球面上的**局部地理坐标**——$x$ 相当于经线方向，$y$ 相当于纬线方向

**在实验室坐标系 XYZ 中的表达**：

$$z(\theta) = \mathbf{t}(\theta) = \begin{pmatrix} -\sin 2\beta \cos\theta \\ -\sin 2\beta \sin\theta \\ \cos 2\beta \end{pmatrix} \tag{11}$$

$$x(\theta) = \begin{pmatrix} -\cos 2\beta \cos\theta \\ -\cos 2\beta \sin\theta \\ -\sin 2\beta \end{pmatrix}, \quad y(\theta) = \begin{pmatrix} \sin\theta \\ -\cos\theta \\ 0 \end{pmatrix}$$

这三个矢量构成右手正交归一标架：$x \times y = z$，$y \times z = x$，$z \times x = y$。

#### (3) $x'y'z(\theta)$ —— "自然"参考坐标系

- **类型**：中间坐标系——既不是完全固定在光束上的，也不是实验室固定的
- $z(\theta)$：与 $xyz$ 相同 = 光束轴 $\mathbf{t}(\theta)$
- $x', y'$：**尽可能保持**与实验室固定轴 X, Y 方向一致，但受限于必须在光束横截面（$z = 0$）平面内
- **两种等价构造方式**：
  - **方式 A**：从固定系 XYZ 出发，绕某个轴"以最短路径"旋转，使得 Z 轴对准 $z(\theta)$，再对 $x', y'$ 取反向
  - **方式 B**：从 $xyz(\theta)$ 出发，绕 $z$ 轴旋转角度 $-\theta$（即反向旋转 $\theta$，抵消镜子转动带来的方位角变化）

- **角色**：这是**"自然观察者"所处的坐标系**——该观察者的分析平面始终正交于光束轴，但参考方向"尽可能不随镜子旋转"。在此系中，光束的"proper"旋转具有简单的角速度 $2\Omega$。

**与 $xyz(\theta)$ 的关系**（方式 B 的直接推论）：

$x'y'z$ 系绕 $z$ 轴相对于 $xyz$ 系反向旋转 $\theta$。这意味着：在 $xyz$ 系中一个方位角固定的矢量，在 $x'y'z$ 系中以角速度 $\dot{\theta} = \Omega$ 反向旋转。反之，在 $x'y'z$ 系中方位角固定的矢量，在 $xyz$ 系中以角速度 $\Omega$ 正向旋转。

### 8.3 坐标系之间的转换关系

#### $xyz \leftrightarrow XYZ$（变换矩阵 $T(\theta)$）

$$\begin{pmatrix} X \\ Y \\ Z \end{pmatrix} = T(\theta) \begin{pmatrix} x \\ y \\ z \end{pmatrix}$$

$$T(\theta) = \begin{pmatrix} x(\theta) & y(\theta) & \mathbf{t}(\theta) \end{pmatrix} = \begin{pmatrix} -\cos 2\beta\cos\theta & \sin\theta & -\sin 2\beta\cos\theta \\ -\cos 2\beta\sin\theta & -\cos\theta & -\sin 2\beta\sin\theta \\ -\sin 2\beta & 0 & \cos 2\beta \end{pmatrix} \tag{A.2}$$

**验证**：$T(\theta)$ 的列就是 $x, y, z$ 在 XYZ 中的 Cartesian 分量，因此 $T(\theta)$ 将 $xyz$ 系中的坐标转换为 XYZ 系中的坐标。由于 $T$ 是正交矩阵，$T^{-1} = T^{\mathsf{T}}$。

#### $x'y'z \leftrightarrow XYZ$（变换矩阵 $T'(\theta)$）

$T'(\theta)$ 的结构比 $T(\theta)$ 复杂，因为 $x', y'$ 并非简单地沿经线/纬线方向。$T'(\theta)$ 是**对称矩阵**（$T' = T'^{\mathsf{T}}$），因此同一个矩阵同时用于正变换和逆变换。

$x', y'$ 的关键性质（构造方式 B 的直接推论）：
- 在 $x'y'z$ 系中，实验室 X 轴的单位矢量的像 $\mathbf{R}$ 以角速度 $\Omega' = 2\Omega$ 绕 $z$ 轴旋转（Eq. 12）
- 这意味着：在 $x'y'z$ 系中看到的"固定"实验室参考方向，实际上在以两倍镜子角速度旋转

### 8.4 各坐标系中关键矢量的运动

下表汇总了三个 3D 坐标系中几个关键矢量的角速度（所有角速度均指绕各自 $z$ 轴的旋转，正值表示右手螺旋方向，即从 $+z$ 方向看逆时针）：

| 矢量 | 在 $xyz$ 系中 | 在 $x'y'z$ 系中 | 在 XYZ 系中 | 说明 |
|------|-------------|---------------|-----------|------|
| 实验室 X 轴之像 $\mathbf{R}$ | 角速度 $\Omega$（Eq. 前: $x=\cos\theta,y=\sin\theta$） | $\Omega' = 2\Omega$（Eq. 12） | 见 Eq. (13) | $\mathbf{R}$ 是"被困在"输出光束中的一个标记矢量 |
| $\mathbf{R}$ 的"proper"旋转 | — | — | $\Omega_1 = 2\Omega\cos 2\beta$（Eq. 16） | 这是光束横截面图案在实验室系中的自转 |
| 参考轴 $\mathbf{e}$ | 角速度 $\cos 2\beta$（Eq. 20 的推导） | $2\Omega\sin^2\beta$（Eq. 21） | 见 Eq. (19) | 平行输运：切平面内不自转 |
| 光束在"自然"参考系中 | — | $2\Omega\cos^2\beta$（Eq. 22） | — | "自然观察者"看到的图像旋转 |

### 8.5 各角速度之间的关系

从上述数据可以验证原论文中的关键恒等式：

**(a) 实验室系中 $\mathbf{R}$ 的角速度 $=$ $x'y'z$ 系中 $\mathbf{R}$ 的角速度 $-$ $\mathbf{e}$ 在 $x'y'z$ 系中的角速度**（因为 $\mathbf{e}$ 定义了"自然"参考方向）：

$$2\Omega\cos 2\beta = 2\Omega - 2\Omega\sin^2\beta = 2\Omega(1 - \sin^2\beta) = 2\Omega\cos^2\beta$$

这验证了 Eq. (16) 与 Eqs. (12), (21) 的自洽性。✅ 在 $xyz$ 系（而非 $x'y'z$）中表达时同理。

**(b) 光束在自然参考系中的旋转 $=$ 镜子旋转的"平凡"效应 $+$ 几何相位贡献**：

$$2\Omega\cos^2\beta = \Omega(1 + \cos 2\beta) \quad \text{（因为 } 1 + \cos 2\beta = 2\cos^2\beta\text{）}$$

其中 $\Omega$（即 $\dot{\theta}$）来自镜子旋转的直接传递，$\Omega\cos 2\beta$ 来自平行输运的几何相位累积。

**(c) 完整一周后图案复原的验证：**

参考轴 $\mathbf{e}$ 在 $x'y'z$ 系中一周的偏转角：
$$\Delta\alpha_e = 2\pi \cdot 2\sin^2\beta = 4\pi\sin^2\beta$$

光束"proper"旋转在实验室系中一周的角度：
$$\Delta\alpha_{\text{beam}} = 2\pi \cdot 2\cos 2\beta = 4\pi\cos 2\beta$$

光束在 $x'y'z$ 系中一周的旋转角：
$$\Delta\alpha'_{\text{beam}} = 2\pi \cdot 2 = 4\pi$$

图案复原 = $x'y'z$ 系中的总旋转（$4\pi$）与 $\mathbf{e}$ 偏转（$4\pi\sin^2\beta$）之差：

$$4\pi - 4\pi\sin^2\beta = 4\pi\cos^2\beta$$

另一方面，光束"proper"旋转（实验室系）为 $4\pi\cos 2\beta$。两者的关系：

$$4\pi\cos^2\beta \underbrace{=}_{\text{恒等式}} 4\pi\cos 2\beta + 4\pi\sin^2\beta$$

即：自然观察者看到的光束旋转 = 光束在实验室系中的自转 + 参考系的几何偏转。这正是综述中 "$\Delta\theta(1 + \cos 2\beta) = 2\Delta\theta\cos^2\beta$" 的来源。

### 8.6 坐标系的物理直觉

理解这些坐标系的最简单方式是考虑两个极端情况：

**$\beta = 0$（镜面不倾斜，共线情形）**：
- $\mathbf{t} = (0, 0, 1)$，输出光束沿 +Z 轴
- $xyz$ 和 $x'y'z$ 退化为同一系：$x' = x = X$，$y' = y = Y$，没有实际区别
- $\mathbf{e}$ 不偏转（纬圈退化为北极点，无平行输运）
- 光束"proper"旋转 $= 2\Omega$，图案每圈转两圈 ← 符合共线 RDE

**$\beta = \pi/2$（镜面倾斜 90°，"后向"反射）**：
- $\mathbf{t} = (0, 0, -1)$，输出光束沿 −Z 轴（反射回输入方向）
- $xyz$ 和 $x'y'z$ 再次重合（但方位角约定可能翻转）
- $\mathbf{e}$ 不偏转（纬圈退化为南极点）
- 光束"proper"旋转 $= -2\Omega$（方向反转），但加上参考系效应后图案不转

**$\beta = \pi/4$（镜面倾斜 45°）**：
- $\mathbf{t}$ 在赤道面内（纬度 = 0），光束轴扫过整个赤道大圆
- $xyz$ 系在球面上"翻滚"——$x$ 始终沿经线（指向极点），$y$ 始终沿赤道
- $x'y'z$ 系"尽可能"保持与 XYZ 一致，但无法完全做到（毛球定理）
- 平行输运的和乐 $= 2\pi\cos(\pi/2) = 0$（大圆的平行输运无和乐）← 这里模 $2\pi$ 为零
- 光束在自然系中旋转 $= 2\Omega\cos^2(\pi/4) = \Omega$（每圈转一圈）

这三个极端情形恰好对应图 32 中图像旋转的三种行为：双倍旋转 → 连续过渡 → 零旋转。
