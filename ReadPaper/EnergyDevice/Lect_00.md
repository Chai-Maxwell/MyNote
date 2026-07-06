# 铁电体的物理基础与储能机制

## 一、铁电体概述

铁电体（ferroelectrics）是一类具有**自发极化**（spontaneous polarization）且自发极化方向可在外电场作用下翻转的介电材料。其核心特征包括：

1. **电滞回线**（P-E hysteresis loop）—— 铁电性的实验判据
2. **Ginzburg-Landau 双阱自由能**（G-P 曲线）—— 自发极化的热力学起源
3. **Curie-Weiss 定律**—— 顺电相介电响应的特征标度
4. **晶格参数-温度曲线**—— 自发应变与相变结构特征
5. **BaTiO₃**—— 原型铁电体，以上所有物理概念的实验载体

这些内容共同构成了理解铁电储能行为的物理基础。

## 二、Ginzburg-Landau-Devonshire 理论与自由能双阱

### 2.1 自由能展开

在 Landau 相变理论的框架下，铁电体的自由能（Gibbs 自由能或 Helmholtz 自由能，取决于边界条件）可以按序参量——极化强度 $P$——作多项式展开。对于**一级相变**或**二级相变**的铁电体，一维情形下的自由能密度为：

$$
\mathcal{F}(P; T, E) = \frac{1}{2}\alpha P^{2} + \frac{1}{4}\beta P^{4} + \frac{1}{6}\gamma P^{6} - EP
$$

其中：

- $P$：极化强度（序参量），单位 $\mathrm{C/m^{2}}$
- $E$：外加电场
- $\alpha = \alpha_0(T - T_0)$：介电刚度的温度依赖，$\alpha_0 > 0$
- $T_0$：Curie-Weiss 温度（二级相变时 $T_0 = T_C$，一级相变时 $T_0 < T_C$）
- $\beta$：四阶系数。$\beta < 0$ 对应**一级相变**，$\beta > 0$ 对应**二级相变**
- $\gamma > 0$：六阶系数，保证 $\mathcal{F}$ 在 $P \to \pm\infty$ 时有下界（对一级相变必不可少）

### 2.2 零场下的自发极化（$E = 0$）

零电场时，平衡态极化由自由能极小值决定：

$$
\frac{\partial\mathcal{F}}{\partial P}\bigg|_{E=0} = \alpha P + \beta P^{3} + \gamma P^{5} = 0
$$

**（1）二级相变（$\beta > 0$，六阶项可忽略）**

$$
P(\alpha + \beta P^{2}) = 0 \quad\Rightarrow\quad P = 0 \;\text{或}\; P^{2} = -\frac{\alpha}{\beta}
$$

- $T > T_C$（$\alpha > 0$）：唯一解 $P = 0$，为顺电相（paraelectric phase）
- $T < T_C$（$\alpha < 0$）：$P = 0$ 为极大值（不稳定），稳定解为

$$
\boxed{P_s = \pm\sqrt{-\frac{\alpha}{\beta}} = \pm\sqrt{\frac{\alpha_0(T_C - T)}{\beta}}}
$$

即两个简并的自发极化态 $\pm P_s$，自由能呈**对称双阱**结构。

**（2）一级相变（$\beta < 0$，需保留 $\gamma$ 项）**

令 $\partial\mathcal{F}/\partial P = P(\alpha + \beta P^{2} + \gamma P^{4}) = 0$，非零解满足：

$$
\gamma(P^{2})^{2} + \beta P^{2} + \alpha = 0
$$

$$
P^{2} = \frac{-\beta \pm \sqrt{\beta^{2} - 4\alpha\gamma}}{2\gamma}
$$

相变发生在 $\mathcal{F}(P_s) = \mathcal{F}(0)$ 时，由此确定 Curie 温度 $T_C$：

$$
T_C = T_0 + \frac{3\beta^{2}}{16\alpha_0\gamma}
$$

一级相变的特征：在 $T_C$ 处极化**不连续跳变**，存在热滞。

### 2.3 G-P 能量曲线的形态

自由能 $\mathcal{F}(P)$ 在 $T < T_C$ 时的曲线即为 **G-P 曲线**（Gibbs 自由能-Polarization 曲线）：

```
        F(P)
         ↑
         |    ╲        ╱
         |     ╲      ╱
         |      ╲    ╱
         |       ╲  ╱
         |        ╲╱
         |    ─────●─────
         |       ╱  ╲
         |      ╱    ╲
         |     ╱      ╲
         |    ╱        ╲
         +────────────────→ P
            -Ps   0   +Ps
```

两个极小值位于 $\pm P_s$，中间被势垒 $\Delta\mathcal{F} = \mathcal{F}(0) - \mathcal{F}(P_s)$ 隔开。外加电场 $E$ 使双阱倾斜：

$$
\mathcal{F}(P; E) = \mathcal{F}(P; 0) - EP
$$

当 $E$ 足够大时，一个极小值消失，极化**不可逆地**翻转到与电场同向的阱中——这是电滞回线的热力学根源。

## 三、电滞回线（P-E Hysteresis Loop）

### 3.1 回线的形成机制

将铁电体置于交变电场中，极化强度 $P$ 随电场 $E$ 的变化形成闭合曲线：

```
          P ↑
            |        Ps ┤      ╭───→ 饱和极化
            |           │    ╱
            |        Pr ┤──╱──────→ 剩余极化
            |           │╱
            |          ╱│
     ───────●─────────●─┼────────→ E
    -Ec     │        ╱  │        Ec
            │       ╱   │
            │      ╱    │
            │     ╱     │
            │    ╱      │
            │   ╱       │
            └──●────────┘
              -Pr
```

**关键参数：**

| 参数 | 符号 | 物理含义 |
|||-|
| 饱和极化 | $P_s$（或 $P_{\max}$） | 畴全部沿电场排列时的极化值 |
| 剩余极化 | $P_r$ | 撤去电场后保留的极化 |
| 矫顽场 | $E_c$ | 使极化翻转为零所需的反向电场 |

### 3.2 回线面积的物理意义——能量耗散

这是储能分析中最核心的物理推导之一。

在外电场 $E$ 作用下，单位体积的铁电体做的电功为：

$$
\mathrm{d} W = E\,\mathrm{d} D = E\,\mathrm{d}(\varepsilon_0 E + P) = \varepsilon_0 E\,\mathrm{d} E + E\,\mathrm{d} P
$$

在一个完整周期中：

$$
\oint \mathrm{d} W = \varepsilon_0 \oint E\,\mathrm{d} E + \oint E\,\mathrm{d} P
$$

第一项 $\varepsilon_0 \oint E\,\mathrm{d} E = 0$（全微分积分为零）。因此：

$$
\boxed{W_{\text{loss}} = \oint E\,\mathrm{d} P}
$$

**这就是 P-E 回线所围面积的物理含义：单位体积每个电场周期中耗散的能量密度（能量损耗密度）**。这部分能量以焦耳热形式耗散，来源于畴壁运动的内摩擦和极化翻转的势垒克服。

### 3.3 Rayleigh 律（小场下的回线形状）

低电场下（$E \ll E_c$），畴壁在缺陷钉扎势中的可逆振动给出回线的 Rayleigh 关系：

$$
P = (\varepsilon_{\text{init}} + \alpha_R E_{\max})E \pm \frac{\alpha_R}{2}(E_{\max}^{2} - E^{2})
$$

其中 $\alpha_R$ 为 Rayleigh 常数。回线呈椭圆/透镜形，能量损耗 $\propto E_{\max}^{3}$。

## 四、Curie-Weiss 定律

### 4.1 推导

在顺电相（$T > T_C$），$P = 0$ 为稳定平衡态。加小电场 $E$ 后的极化由 $\partial\mathcal{F}/\partial P = 0$ 给出：

$$
\alpha P + \beta P^{3} + \gamma P^{5} = E
$$

对弱场，$P$ 很小，高阶项可忽略：

$$
\alpha P \approx E \quad\Rightarrow\quad P = \frac{E}{\alpha} = \frac{E}{\alpha_0(T - T_0)}
$$

介电极化率 $\chi = \partial P/\partial E$ 为：

$$
\chi = \frac{1}{\alpha_0(T - T_0)}
$$

相对介电常数（$\varepsilon_r = 1 + \chi \approx \chi$ 对高 $\chi$ 材料）：

$$
\boxed{\varepsilon_r = \frac{C}{T - T_0}}
$$

其中 $C = 1/\alpha_0$ 为 **Curie 常数**。这就是 **Curie-Weiss 定律**。

### 4.2 一级相变的 Curie-Weiss 修正

一级相变中 $T_C > T_0$，Curie-Weiss 行为在 $T_C$ 处被一级相变截断，$\varepsilon_r$ 在 $T_C$ 处有限且不连续。实验上常写为：

$$
\frac{1}{\varepsilon_r} = \frac{T - T_0}{C} \quad (T > T_C)
$$

在 $T_0$ 处 $\varepsilon_r \to \infty$ 但实际不发生——因为在此之前一级相变已发生。

### 4.3 物理含义

Curie-Weiss 定律表明：

- **铁电体在顺电相有极高的介电常数**，且随温度靠近 $T_C$ 而发散
- 这意味着在 $T_C$ 附近，微小的电场即可诱发很大的极化响应——这是铁电储能材料常常工作于 Curie 点附近的物理原因
- Curie 常数 $C$ 的大小反映极化响应的强度，软模（soft mode）理论将其与晶格振动频率的软化联系起来：

$$
\omega_{\text{TO}}^{2} \propto (T - T_C)
$$

即横光学支声子的频率在接近 $T_C$ 时趋于零（"冻结"），导致静态介电常数发散。这一关系由 **Lyddane-Sachs-Teller (LST) 关系**关联：

$$
\frac{\varepsilon(0)}{\varepsilon(\infty)} = \frac{\omega_{\text{LO}}^{2}}{\omega_{\text{TO}}^{2}}
$$

## 五、铁电储能：物理机制与推导

### 5.1 储能密度的基本定义

介质电容器中，单位体积储存的静电能密度为：

$$
U = \int_{0}^{D_{\max}} E\,\mathrm{d} D
$$

其中 $D = \varepsilon_0 E + P$。对高介电常数铁电体，$P \gg \varepsilon_0 E$，故：

$$
\boxed{U = \int_{0}^{P_{\max}} E\,\mathrm{d} P}
$$

这个积分是**充电路径上 P-E 曲线下方的面积**。

### 5.2 可回收能量密度与能量效率

铁电电容器的充电-放电过程对应 P-E 回线的上半支和下半支：

```
          P ↑
            |     ╱ 充电曲线（upper branch）
            |    ╱
        Pmax ┤   ●──────────
            |  ╱ ╲         ↑
            | ╱   ╲ U_rec  │
            |╱     ╲       │
            ●───────╲──────┤
            |   ↑    ╲
            |U_loss   ╲
            |   ↓      ╲
            +───────────────→ E
            0             Emax
```

- **充电能量密度**：$U_{\text{charge}} = \int_{0}^{P_{\max}} E_{\text{up}}(P)\,\mathrm{d} P$（充电支下方面积）
- **可回收能量密度**：$U_{\text{rec}} = \int_{P_r}^{P_{\max}} E_{\text{down}}(P)\,\mathrm{d} P$（放电支下方面积）
  - 等效地：$U_{\text{rec}} = \int_{0}^{P_{\max}} E_{\text{down}}(P)\,\mathrm{d} P$（从 $P_{\max}$ 积分回 $P_r$ 再换方向）
- **能量损耗密度**：$U_{\text{loss}} = U_{\text{charge}} - U_{\text{rec}} = \oint E\,\mathrm{d} P$（回线面积）

**能量效率**：
$$
\boxed{\eta = \frac{U_{\text{rec}}}{U_{\text{charge}}} = \frac{U_{\text{rec}}}{U_{\text{rec}} + U_{\text{loss}}}}
$$

### 5.3 线性介电 vs 铁电储能的物理对比

| | 线性介电 | 铁电体 | 反铁电体 |
|||||
| P-E 关系 | $P = \varepsilon_0(\varepsilon_r - 1)E$ | 电滞回线 | 双电滞回线 |
| $U_{\text{rec}}$ | $\frac{1}{2}\varepsilon_0\varepsilon_r E_{\max}^{2}$ | $\int_{P_r}^{P_{\max}}E\,\mathrm{d} P$ | $\int_{0}^{P_{\max}} E\,\mathrm{d} P$（近零 $P_r$） |
| 能量效率 | ～100%（近无损） | $< 80\%$（显著损耗） | 较高 |
| 储能密度 | 受 $\varepsilon_r E_{\max}$ 限制 | 可达 $100\ \mathrm{J/cm^{3}}$ 量级 | 最高，$P_{\max}$ 大且 $P_r \approx 0$ |

### 5.4 铁电储能优值（Figure of Merit）

从 $U_{\text{rec}}$ 的定义出发，可以分解储能性能的三个独立维度：

**（a）最大极化 $P_{\max}$**

由饱和极化决定。从自由能角度看，在足够大的 $E_{\max}$ 下畴完全取向，$P_{\max}$ 趋近于单晶自发极化值。提高 $P_{\max}$ 的策略：

- 选择 $P_s$ 大的体系（如含 $\mathrm{PbTiO_3}$、$\mathrm{BiFeO_3}$ 等大极化端元）
- 织构化/外延生长使极化沿电场方向

**（b）击穿强度 $E_b$（$E_{\max}$ 的上限）**

储能密度的上限最终由材料能承受的最大电场决定。击穿机制包括：

- 本征击穿（电子雪崩）：$E_b \propto E_g^{3/2}$（$E_g$ 为带隙）
- 热击穿：焦耳热导致的 thermal runaway
- 局部电场增强：晶界、气孔处的场集中

宽禁带材料（如 $\mathrm{BaTiO_3}$ 基、$\mathrm{NaNbO_3}$ 基无铅体系）和致密化烧结是提高 $E_b$ 的主要路径。

**（c）$P_{\max} - P_r$ 差值（极化摆幅 $\Delta P$）**

在给定的 $E_{\max}$ 下，可回收能量密度近似为：

$$
U_{\text{rec}} \approx E_{\max} \cdot (P_{\max} - P_r) \quad \text{（线性放电近似）}
$$

更精确地，如果用直线放电模型 $P = P_r + \varepsilon_0\varepsilon_r^{\text{eff}}E$，则：

$$
U_{\text{rec}} = E_{\max}P_r + \frac{1}{2}\varepsilon_0\varepsilon_r^{\text{eff}}E_{\max}^{2} - \int_{0}^{P_r} E(P)\,\mathrm{d} P
$$

实际优化方向是：**增大 $P_{\max}$、降低 $P_r$（使回线变"瘦"）、提高 $E_b$**。

### 5.5 弛豫铁电体的储能优势——从物理图像理解

弛豫铁电体（relaxor ferroelectrics）在储能中表现优异，物理原因在于：

**（1）极性纳米微区（PNRs）替代宏观畴**

弛豫铁电体中，成分无序破坏了长程铁电序，自发极化以纳米尺度（2-50 nm）的 PNRs 形式存在。PNRs 之间耦合弱，翻转势垒低 → **$P_r$ 大幅降低**。

**（2）弥散相变与频率色散**

Curie 峰宽化，在宽温区内保持高 $\varepsilon_r$：

$$
\frac{1}{\varepsilon_r} = \frac{1}{\varepsilon_m} + \frac{(T - T_m)^{\gamma}}{2\varepsilon_m\delta^{2}}
$$

其中 $\gamma$ 为弥散指数（$1 \leq \gamma \leq 2$，$\gamma=2$ 为完全弛豫态）。

**（3）细瘦回线 → 高效率**

PNRs 对外电场的响应是近乎可逆的（无畴壁运动的不可逆损耗），P-E 回线细长，$U_{\text{loss}}$ 小，$\eta$ 可超过 90%。

### 5.6 从 Landau 理论推导储能性能的温度依赖性

回到 GLD 自由能，在外场 $E$ 下平衡极化由：

$$
\alpha_0(T - T_0)P + \beta P^{3} + \gamma P^{5} = E
$$

确定。对给定 $E_{\max}$，数值求解此方程得到充电支的 $P(E)$，进而得到：

$$
U_{\text{rec}}(T) = \int_{P_r(T)}^{P_{\max}(T)} E(P)\,\mathrm{d} P
$$

定性趋势：

- $T \ll T_C$：$P_r$ 大、$E_c$ 大 → 回线宽 → $\eta$ 低
- $T \to T_C$：自发极化减弱、$E_c$ 降低 → 回线收窄 → $\eta$ 升高，但 $P_{\max}$ 同时下降
- $T > T_C$：进入顺电相 → 线性介电行为 → $\eta \to 100\%$ 但储能密度急剧下降

因此存在一个**最佳工作温度区间**，通常在 $T_C$ 附近或略低于 $T_C$，使得 $P_{\max}$ 与 $\eta$ 的乘积最大化。

## 六、晶格参数-温度曲线与自发应变

### 6.1 铁电相变中的自发应变

铁电相变不仅是极化的出现，同时伴随**晶体对称性的破缺**——从高对称顺电相进入低对称铁电相。这一对称性降低必然导致**自发应变**（spontaneous strain / eigenstrain）的产生。

从 Landau 理论的角度，自由能不仅依赖于极化 $P$，还依赖于应变 $\varepsilon_{ij}$。将自由能按 $P$ 和 $\varepsilon$ 联合展开（一维简化）：

$$
\mathcal{F}(P, \varepsilon; T) = \frac{1}{2}\alpha P^{2} + \frac{1}{4}\beta P^{4} + \frac{1}{2}C\varepsilon^{2} - q\varepsilon P^{2}
$$

其中：
- $C$：弹性常数（elastic constant）
- $q$：**电致伸缩系数**（electrostrictive coupling coefficient），耦合极化和应变

力学平衡条件 $\partial\mathcal{F}/\partial\varepsilon = 0$ 给出：

$$
C\varepsilon - qP^{2} = 0 \quad\Rightarrow\quad \boxed{\varepsilon_s = \frac{q}{C}P_s^{2}}
$$

这就是自发应变的核心结论：**自发应变与自发极化的平方成正比**。

### 6.2 晶格参数的温度依赖

结合 $P_s^{2} = -\alpha/\beta = \alpha_0(T_C - T)/\beta$（二级相变），得到自发应变的温度依赖：

$$
\boxed{\varepsilon_s(T) = \frac{q\alpha_0}{C\beta}(T_C - T) \quad (T < T_C)}
$$

这意味着：

- **$T > T_C$**（顺电相）：$P_s = 0$，$\varepsilon_s = 0$，晶格参数随温度线性变化（正常热膨胀）
- **$T = T_C$**：自发应变开始出现。一级相变时晶格参数**跳跃**（discontinuous jump）；二级相变时连续但斜率改变（kink）
- **$T < T_C$**：$\varepsilon_s \propto (T_C - T)$，晶格参数偏离顺电相外推值

### 6.3 晶格参数-温度曲线的典型形态

以四方相铁电体为例，$a$ 轴和 $c$ 轴随温度的变化：

```
   晶格参数
      ↑
      |        顺电立方相        铁电四方相
      |           a₀              ╲
      |    ·······················●╲ c 轴
      |    ·······················●╱
      |           a₀              ╱
      |                         ╱  a 轴
      |                        ╱
      |                       ╱
      +──────────────────────●────────────────→ T
                             TC
```

**关键特征：**

| 温度区间 | 晶体对称性 | 晶格参数行为 |
|----------|-----------|-------------|
| $T > T_C$ | 立方（cubic） | $a = b = c = a_0$，线性热膨胀 |
| $T < T_C$ | 四方（tetragonal） | $a = b \neq c$，$c/a \neq 1$ |
| $T = T_C$ | 相变点 | 一级：不连续跳变；二级：斜率突变 |

### 6.4 自发应变的物理后果

**（a）热膨胀系数的 $\lambda$ 型反常**

体热膨胀系数 $\alpha_V = \partial(\ln V)/\partial T$。由于 $V$ 中包含自发应变贡献 $\propto (T_C - T)$，$\alpha_V$ 在 $T_C$ 处呈 $\lambda$ 型峰。这对储能器件的热稳定性有直接影响——$T_C$ 附近剧烈的体积变化可能导致陶瓷开裂或电极脱落。

**（b）畴结构的弹性能**

不同取向的畴具有不同的自发应变张量取向。为使相邻畴之间力学兼容，畴壁取向受到严格约束——**力学兼容条件**（mechanical compatibility / domain wall orientation condition）：

$$
\varepsilon_{ij}^{(1)} - \varepsilon_{ij}^{(2)} = \frac{1}{2}(n_i a_j + n_j a_i)
$$

其中 $\mathbf{n}$ 为畴壁法向，$\mathbf{a}$ 为位移矢量。这一条件决定了铁电体中 $90^\circ$ 畴壁和 $180^\circ$ 畴壁的几何排列，进而影响 $P_r$ 和 $E_c$。

**（c）晶格参数曲线作为铁电相变的实验判据**

通过变温 X 射线衍射（VT-XRD）或中子衍射测量 $a(T)$、$c(T)$ 曲线，可以：
- 确定 $T_C$（晶格参数跳变或斜率突变位置）
- 判断相变级数（不连续 → 一级；连续 → 二级）
- 提取自发应变 $\varepsilon_s(T)$，反推 $P_s(T)$ 的温度依赖

---

## 七、BaTiO₃：原型铁电体的相变、结构与储能

### 7.1 晶体结构与相变序列

钛酸钡（$\mathrm{BaTiO_3}$，BT）是**最经典、研究最透彻的钙钛矿铁电体**，属于 $\mathrm{ABO_3}$ 型钙钛矿结构：

```
        A位：Ba²⁺（立方体顶点）
        B位：Ti⁴⁺（立方体体心）
        O²⁻：（面心）

           Ba²⁺
           ●
          ╱ ╲
         ╱   ╲
    O²⁻ ●     ● O²⁻
        │  Ti⁴⁺ │
        │   ●   │
    O²⁻ ●     ● O²⁻
         ╲   ╱
          ╲ ╱
           ●
          Ba²⁺
```

$\mathrm{BaTiO_3}$ 随温度降低经历三次铁电相变：

| 温度 | 晶系 | 空间群 | 极化方向 | 晶格参数关系 |
|------|------|--------|----------|-------------|
| $T > 120\ ^\circ\mathrm{C}$ | 立方（Cubic） | $Pm\bar{3}m$ | 无（顺电） | $a = b = c$ |
| $5\ ^\circ\mathrm{C} < T < 120\ ^\circ\mathrm{C}$ | **四方（Tetragonal）** | $P4mm$ | $[001]$ | $a = b \neq c$，$c/a \approx 1.01$ |
| $-90\ ^\circ\mathrm{C} < T < 5\ ^\circ\mathrm{C}$ | 正交（Orthorhombic） | $Amm2$ | $[011]$（原立方） | $a \neq b \neq c$ |
| $T < -90\ ^\circ\mathrm{C}$ | 三方（Rhombohedral） | $R3m$ | $[111]$（原立方） | $a = b = c$，$\alpha \neq 90^\circ$ |

$T_C = 120\ ^\circ\mathrm{C}$ 是**立方→四方**的顺电-铁电相变温度，这也是通常所说的 Curie 点。

### 7.2 铁电性的微观起源：Ti⁴⁺ 的 d⁰ 位移

$\mathrm{BaTiO_3}$ 中铁电性的微观机制是**二阶 Jahn-Teller 效应**（second-order Jahn-Teller effect, SOJT）：

- $\mathrm{Ti^{4+}}$ 具有 $3d^{0}$ 电子构型（空 d 轨道）
- 空的 Ti $3d$ 轨道与 O $2p$ 轨道发生共价杂化（pd hybridization）
- 当 Ti 偏离氧八面体中心时，$t_{2g}$ 和 $e_g$ 轨道与 O $2p$ 的杂化打破对称性，体系总能量降低
- 这一能量降低超过短程排斥能的增加 → Ti 的偏心位移成为能量有利 → 产生自发极化

**物理图像**：Ti⁴⁺ 沿着 $c$ 轴偏离八面体中心约 $0.05\ \mathrm{Å}$，O²⁻ 在同一方向上也有位移，产生净偶极矩，形成沿 $[001]$ 方向的自发极化 $P_s \approx 26\ \mu\mathrm{C/cm^{2}}$（室温）。

### 7.3 BaTiO₃ 的晶格参数-温度曲线

这是 $\mathrm{BaTiO_3}$ 最经典的实验曲线（最早由 Kay 和 Vousden, 1949 年用 XRD 测定）：

```
   晶格参数 (Å)
      ↑
 4.04 ┤                                          
      │            ·立方·      ·四方·   ·正交· ·三方·
 4.03 ┤         ·····●············●
      │        ╱      ╲          ·╲
 4.02 ┤       ╱        ╲          ·╲
      │      ╱          ╲          ·╲
 4.01 ┤     ╱            ╲           ●────────
      │    ╱              ╲         ╱
 4.00 ┤   ╱   a = c       ╲       ╱   c
      │  ╱                 ╲     ╱
 3.99 ┤ ╱                   ╲   ╱
      │╱                     ╲ ╱
 3.98 ┤                       ● a, c
      │                      ╱ ╲
 3.97 ┤                     ╱   ╲
      │                    ╱     ╲
      └───────────────────┴───────┴──────────→ T (°C)
                        5°C   120°C
                        T₂    T₁=TC
```

**关键观测：**

1. **$T_C = 120\ ^\circ\mathrm{C}$**（一级相变）：晶格参数不连续跳变。立方相 $a_0 \approx 4.00\ \mathrm{Å}$，四方相 $c \approx 4.03\ \mathrm{Å}$、$a \approx 3.99\ \mathrm{Å}$，$c/a \approx 1.01$
2. **$T_2 \approx 5\ ^\circ\mathrm{C}$**（四方→正交）：晶格参数连续但有明显转折
3. **$T_3 \approx -90\ ^\circ\mathrm{C}$**（正交→三方）：进一步的结构变化
4. **热滞**：升温和降温曲线不完全重合，这是一级相变的特征

### 7.4 BaTiO₃ 的 Curie-Weiss 行为

在 $T > T_C$ 的顺电相，$\mathrm{BaTiO_3}$ 的介电常数完美遵循 Curie-Weiss 定律：

$$
\varepsilon_r = \frac{C}{T - T_0}
$$

实验测得：
- Curie 常数 $C \approx 1.5 \times 10^{5}\ \mathrm{K}$
- Curie-Weiss 温度 $T_0 \approx 110\ ^\circ\mathrm{C}$（略低于 $T_C = 120\ ^\circ\mathrm{C}$，这是一级相变的标志）
- $T_C$ 处的 $\varepsilon_r$ 峰值可达 $\sim 10^{4}$

在 $T_C$ 附近，$\varepsilon_r(T)$ 满足：

$$
\frac{1}{\varepsilon_r} = \frac{T - T_0}{C} \quad (T > T_C)
$$

注：一级相变时 $T_C > T_0$，Curie-Weiss 外推在 $T_0$ 处发散但实际在 $T_C$ 处被一级相变截断。

### 7.5 BaTiO₃ 的电滞回线与储能特性

室温下（四方相），$\mathrm{BaTiO_3}$ 单晶沿 $[001]$ 方向的典型 P-E 回线参数：

| 参数 | 典型值 |
|------|--------|
| $P_s$（自发极化） | $\sim 26\ \mu\mathrm{C/cm^{2}}$ |
| $P_r$（剩余极化） | $\sim 15$–$20\ \mu\mathrm{C/cm^{2}}$ |
| $E_c$（矫顽场） | $\sim 1$–$2\ \mathrm{kV/cm}$（单晶）、$\sim 5$–$10\ \mathrm{kV/cm}$（陶瓷） |

**从储能角度看纯 $\mathrm{BaTiO_3}$ 的问题：**

- ✅ **$P_s$ 大**（$26\ \mu\mathrm{C/cm^{2}}$）→ 充放电摆幅的潜力大
- ❌ **$P_r$ 大**（$P_r/P_s \sim 0.6$–$0.8$）→ 回线"胖"，不可逆成分大
- ❌ **$E_c$ 较小** → 储能密度受限于低的 $E_{\max}$（通常 $< 50$–$100\ \mathrm{kV/cm}$）

因此纯 $\mathrm{BaTiO_3}$ 的储能性能（$U_{\text{rec}} \sim 0.5$–$1\ \mathrm{J/cm^{3}}$）并不是最优的，但其**作为基础端元**在固溶体设计中极其重要。

### 7.6 BaTiO₃ 基储能材料的改性策略

**（1）化学掺杂降低 $P_r$、提高 $E_b$**

| 掺杂策略 | 机理 | 效果 |
|----------|------|------|
| $\mathrm{BiMeO_3}$（Me = Zn, Mg, Sc 等）固溶 | 引入 A 位/B 位无序 → PNRs 形成 → 弛豫化 | $P_r \downarrow$，$\eta \uparrow$，$E_b \uparrow$ |
| 稀土掺杂（La³⁺、Nd³⁺ 等） | A 位施主掺杂 → 产生 A 位空位 → 畴壁钉扎减弱 | "软"化 → 回线瘦化 |
| 过渡金属掺杂（Mn⁴⁺、Fe³⁺ 等） | B 位受主掺杂 → 氧空位 → 畴壁钉扎增强 | "硬"化 → $E_c \uparrow$ |

**（2）核-壳结构（core-shell）晶粒工程**

在 $\mathrm{BaTiO_3}$–$\mathrm{BiMeO_3}$ 体系中，通过调控烧结工艺形成**成分梯度**的核-壳晶粒：
- 芯部：富 Ti，保持高铁电性 → 维持 $P_{\max}$
- 壳层：富 Bi/Me，高度弛豫 → 降低 $P_r$、提高 $E_b$

典型体系：$\mathrm{0.7BaTiO_3}$–$\mathrm{0.3BiScO_3}$ 在 $730\ \mathrm{kV/cm}$ 的极高击穿场下实现 $U_{\text{rec}} \sim 5$–$6\ \mathrm{J/cm^{3}}$，$\eta > 80\%$。

**（3）无铅替代的环境意义**

$\mathrm{BaTiO_3}$ 基陶瓷是替代含铅体系（如 $\mathrm{PbZrO_3}$ 基反铁电体）进行**无铅化储能**的核心平台，因其原料廉价、无毒、工艺成熟。

### 7.7 BaTiO₃ 中的畴结构与 $90^\circ$ / $180^\circ$ 畴

四方相 $\mathrm{BaTiO_3}$ 中，极化方向沿 $c$ 轴（$[001]$ 方向），存在两种畴壁：

- **$180^\circ$ 畴壁**：相邻畴的极化方向反平行（$P \uparrow$ vs $P \downarrow$），自发应变相同，畴壁主要由极化梯度贡献，很薄（$\sim 1$–$2$ 个晶胞）
- **$90^\circ$ 畴壁**：相邻畴的极化方向垂直（$[001]$ vs $[100]$），自发应变取向不同。畴壁取向需满足力学兼容条件，宽度较大

$90^\circ$ 畴在外电场下的翻转伴随**晶格应变**和**体积变化**，产生比 $180^\circ$ 翻转更大的内应力。这也是为什么多晶陶瓷中 $P_r < P_s$（受限于晶粒间的力学夹持效应）——这对储能来说反而是有利的，因为它降低了不可逆成分。

**力学夹持效应对储能的启示**：在多晶陶瓷中，晶粒间互约束使 $90^\circ$ 畴翻转不完全 → $P_r$ 低于单晶 → 回线更瘦 → 能量效率可能更高。这种内禀的"自限"效应是陶瓷储能中常被利用但容易被忽视的一个物理机制。

---

## 八、总结：物理图像的统一

铁电储能的所有关键性能都可以追溯到同一个物理框架——**Landau 自由能双阱**：

| 物理量 | Landau 理论中的对应 |
|--||
| 自发极化 $P_s$ | 双阱极小值位置 $\pm\sqrt{-\alpha/\beta}$ |
| 矫顽场 $E_c$ | 使一侧阱消失所需的倾斜场（$\partial^{2}\mathcal{F}/\partial P^{2} = 0$ 处的 $E$） |
| Curie-Weiss 行为 | $\chi = 1/\alpha = 1/[\alpha_0(T - T_0)]$ |
| 能量损耗 | 跨越势垒的不可逆极化翻转 → 回线面积 $\oint E\,\mathrm{d} P$ |
| 储能密度 $U_{\text{rec}}$ | 放电支下方的面积 $\int_{P_r}^{P_{\max}} E\,\mathrm{d} P$ |
| 弛豫体优势 | 成分无序→PNRs→低势垒→细回线→高 $\eta$ |

这一统一图像使得我们可以通过调控自由能展开系数（即通过成分设计、应变工程、尺寸效应等）来系统优化储能性能——这是铁电储能材料设计的核心方法论。

## 参考文献

1. M. E. Lines and A. M. Glass, *Principles and Applications of Ferroelectrics and Related Materials*, Oxford University Press, 1977.
2. K. M. Rabe, C. H. Ahn, and J.-M. Triscone (eds.), *Physics of Ferroelectrics: A Modern Perspective*, Springer, 2007.
3. L. Yang et al., "Novel inorganic ferroelectric materials for energy storage applications," *Chemical Society Reviews*, 2021.
4. A. K. Tagantsev, L. E. Cross, and J. Fousek, *Domains in Ferroic Crystals and Thin Films*, Springer, 2010.
5. G. A. Samara, "The relaxational properties of compositionally disordered ABO₃ perovskites," *J. Phys.: Condens. Matter*, 15, R367 (2003).
