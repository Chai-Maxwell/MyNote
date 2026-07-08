# 复介电常数与 Debye 弛豫

## 一、为什么需要复介电常数

### 1.1 静电场 vs 交变电场的本质区别

在静电场中，介电常数 $\varepsilon_r$ 描述介质对电场的极化响应能力：

$$
D = \varepsilon_0\varepsilon_r E, \quad P = \varepsilon_0(\varepsilon_r - 1)E
$$

但在**交变电场** $E(t) = E_0 e^{i\omega t}$ 中，极化不能瞬时跟随电场变化——介质中存在**弛豫**（relaxation）过程。当电场频率足够高时，某些极化机制（偶极子取向、空间电荷、离子位移）开始"跟不上"电场翻转，表现为：

- 极化幅度下降（介电常数减小）
- 极化响应与电场之间出现相位滞后（介电损耗）

这一相位滞后使得介电常数必须用**复数**来描述。

### 1.2 复介电常数的定义

在频率域中，定义复介电常数：

$$
\boxed{\varepsilon^{*}(\omega) = \varepsilon'(\omega) - i\varepsilon''(\omega)}
$$

其中：

| 符号 | 名称 | 物理含义 |
|------|------|----------|
| $\varepsilon'(\omega)$ | 实部（介电常数） | 储能能力——极化可逆跟随电场部分的幅度，决定电容 |
| $\varepsilon''(\omega)$ | 虚部（介电损耗） | 能量耗散——极化滞后于电场的部分，以焦耳热形式耗散 |
| $\tan\delta = \varepsilon''/\varepsilon'$ | 损耗角正切 | 每个周期耗散能与储存能之比，介质"品质因数"的倒数 |

**交流电导率**与虚部的关系：

$$
\sigma_{\text{ac}}(\omega) = \omega\varepsilon_0\varepsilon''(\omega)
$$

### 1.3 与铁电储能的直接关联

复介电常数的物理图像直接联系到储能中的能量效率（回顾 Lect_00 第 5.2 节）：

- $\varepsilon'(\omega)$ 大 → 储能密度大
- $\varepsilon''(\omega)$ 小 → 能量损耗小、效率 $\eta$ 高
- 弛豫峰（$\varepsilon''$ 极大值）所在频率 → **能量损耗最大**的工作点，储能应用中应避开
- $\tan\delta$ → 直接对应每个充放电周期的损耗比例

---

## 二、Debye 弛豫模型的物理推导

### 2.1 物理图像

Debye（1929）考虑含有**永久偶极矩**的极性分子（如水、硝基苯等极性液体）。在外电场下：

1. 偶极子在电场中受到转动力矩，倾向于沿电场方向排列 → 取向极化
2. 热运动（布朗运动）不断打乱偶极子的有序排列 → 去极化
3. 两种效应竞争，达致动态平衡

当外电场撤去后，极化不会瞬时消失，而是**以指数形式衰减**——这就是 Debye 弛豫的核心假设。

### 2.2 弛豫的微分方程

设 $P(t)$ 为 t 时刻的极化强度，$P_s$ 为静电场下（$t \to \infty$）的平衡极化。Debye 假设极化随时间的变化率正比于偏离平衡的程度：

$$
\boxed{\frac{\mathrm{d}P(t)}{\mathrm{d}t} = -\frac{1}{\tau}\big[P(t) - P_s\big]}
$$

其中 $\tau$ 为**弛豫时间**（relaxation time），表征极化恢复平衡的特征时间尺度。

**弛豫时间的物理意义：**

对于球形偶极子分子在粘性介质中的旋转，按 Stokes-Einstein-Debye 关系：

$$
\tau = \frac{4\pi\eta a^{3}}{k_B T}
$$

- $\eta$：介质的粘度
- $a$：分子的有效流体力学半径
- $k_B T$：热能

这是一个直观的结果：粘度越大、分子越大 → 转动越慢 → 弛豫时间越长；温度越高 → 热运动越强 → 弛豫越快。

**阶跃响应的解：**

撤去外场后（$P_s = 0$），$P(t)$ 的初始条件为 $P(0) = P_0$：

$$
P(t) = P_0\, e^{-t/\tau}
$$

即极化以指数规律衰减——这是 Debye 模型最基本的预言。

### 2.3 频率域中的 Debye 方程

对弛豫微分方程做 Fourier 变换（或考虑正弦稳态解 $P(t) = P^{*}e^{i\omega t}$, $E(t) = E^{*}e^{i\omega t}$）：

$$
i\omega P^{*} = -\frac{1}{\tau}\big(P^{*} - \varepsilon_0(\varepsilon_s - 1)E^{*}\big)
$$

整理得：

$$
P^{*} = \frac{\varepsilon_0(\varepsilon_s - 1)}{1 + i\omega\tau} E^{*}
$$

由此得到复介电常数（计入瞬时极化 $\varepsilon_{\infty}$，见下一节）：

$$
\varepsilon^{*}(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{1 + i\omega\tau}
$$

### 2.4 Debye 色散方程的完整形式

在实际介质中，极化由多个机制叠加形成：

- **瞬时极化**（$\varepsilon_{\infty}$）：电子极化 + 原子极化——$10^{14}$–$10^{15}\ \mathrm{Hz}$（紫外–红外），在微波及以下频段可视为瞬时响应
- **取向极化**（弛豫部分）：偶极子转动——$10^{6}$–$10^{11}\ \mathrm{Hz}$（微波段），这是 Debye 弛豫描述的核心

因此完整的复介电常数为：

$$
\boxed{\varepsilon^{*}(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{1 + i\omega\tau}}
$$

参数说明：

| 符号 | 含义 |
|------|------|
| $\varepsilon_s$ | 静态介电常数（$\omega \to 0$），所有极化机制充分响应 |
| $\varepsilon_{\infty}$ | 高频极限介电常数（$\omega \to \infty$），仅电子+原子极化的贡献 |
| $\Delta\varepsilon = \varepsilon_s - \varepsilon_{\infty}$ | **弛豫强度**（relaxation strength）——取向极化对介电常数的贡献 |
| $\tau$ | 弛豫时间 |

### 2.5 实部与虚部的分离

将 Debye 方程按实部和虚部分离：

$$
\varepsilon^{*} = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{1 + i\omega\tau}
\cdot \frac{1 - i\omega\tau}{1 - i\omega\tau}
$$

$$
\varepsilon^{*} = \varepsilon_{\infty} + \frac{(\varepsilon_s - \varepsilon_{\infty})(1 - i\omega\tau)}{1 + \omega^{2}\tau^{2}}
$$

因此：

$$
\boxed{\varepsilon'(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{1 + \omega^{2}\tau^{2}}}
$$

$$
\boxed{\varepsilon''(\omega) = \frac{(\varepsilon_s - \varepsilon_{\infty})\omega\tau}{1 + \omega^{2}\tau^{2}}}
$$

这就是 **Debye 色散公式**（Debye dispersion equations）。

### 2.6 Debye 弛豫的特征频率行为

```
  ε', ε'' ↑
          │
   ε_s ───┤╲
          │ ╲
          │  ╲            ε'(ω)
          │   ╲        ╱
          │    ╲     ╱
          │     ╲  ╱
          │      ╲╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ ε∞
          │     ╱ ╲
          │   ╱╱   ╲         ε''(ω)
          │ ╱╱      ╲
          │╱         ╲
          └──────────────────────→ log ω
                   ω₀ = 1/τ
```

**关键频率点：**

1. **$\omega \ll 1/\tau$（低频极限）：**
   - $\varepsilon' \to \varepsilon_s$（偶极子充分响应电场）
   - $\varepsilon'' \to \Delta\varepsilon \cdot \omega\tau \to 0$（损耗趋于零）

2. **$\omega = 1/\tau$（特征弛豫频率）：**
   - $\varepsilon' = \varepsilon_{\infty} + \Delta\varepsilon/2$（恰好一半的弛豫强度）
   - $\boxed{\varepsilon''_{\max} = \frac{\varepsilon_s - \varepsilon_{\infty}}{2}}$（损耗达到最大值）
   - 这是 Debye 弛豫峰的峰位

3. **$\omega \gg 1/\tau$（高频极限）：**
   - $\varepsilon' \to \varepsilon_{\infty}$（偶极子完全来不及跟随电场）
   - $\varepsilon'' \to \Delta\varepsilon/(\omega\tau) \to 0$（损耗再次趋于零）

---

## 三、Cole-Cole 图——Debye 弛豫的几何表征

### 3.1 Cole-Cole 图的推导

1941 年，Cole 兄弟发现可以从 Debye 方程中消去 $\omega\tau$，得到复平面上 $\varepsilon''$ 对 $\varepsilon'$ 的参数方程。

从 Debye 方程出发：

$$
\varepsilon' - \varepsilon_{\infty} = \frac{\Delta\varepsilon}{1 + \omega^{2}\tau^{2}}, \quad
\varepsilon'' = \frac{\Delta\varepsilon \cdot \omega\tau}{1 + \omega^{2}\tau^{2}}
$$

两式相除得：

$$
\frac{\varepsilon''}{\varepsilon' - \varepsilon_{\infty}} = \omega\tau
$$

代入 $\varepsilon'$ 的表达式消去 $\omega\tau$：

**推导：**

由 $\varepsilon'' = (\varepsilon' - \varepsilon_{\infty})\omega\tau$ 和 $\varepsilon' - \varepsilon_{\infty} = \Delta\varepsilon/(1 + \omega^{2}\tau^{2})$：

$$
1 + \omega^{2}\tau^{2} = \frac{\Delta\varepsilon}{\varepsilon' - \varepsilon_{\infty}}
$$

$$
\omega^{2}\tau^{2} = \frac{\Delta\varepsilon}{\varepsilon' - \varepsilon_{\infty}} - 1 = \frac{\Delta\varepsilon - \varepsilon' + \varepsilon_{\infty}}{\varepsilon' - \varepsilon_{\infty}}
$$

代入 $\varepsilon'' = (\varepsilon' - \varepsilon_{\infty})\omega\tau = (\varepsilon' - \varepsilon_{\infty})\sqrt{\omega^{2}\tau^{2}}$（取正根）：

$$
\varepsilon'' = (\varepsilon' - \varepsilon_{\infty})\sqrt{\frac{\Delta\varepsilon - \varepsilon' + \varepsilon_{\infty}}{\varepsilon' - \varepsilon_{\infty}}}
$$

$$
\varepsilon''^{2} = (\varepsilon' - \varepsilon_{\infty})(\Delta\varepsilon - \varepsilon' + \varepsilon_{\infty})
$$

$$
\varepsilon''^{2} = (\varepsilon' - \varepsilon_{\infty})(\varepsilon_s - \varepsilon')
$$

整理为标准圆方程：

$$
\boxed{\left(\varepsilon' - \frac{\varepsilon_s + \varepsilon_{\infty}}{2}\right)^{2} + \varepsilon''^{2} = \left(\frac{\varepsilon_s - \varepsilon_{\infty}}{2}\right)^{2}}
$$

### 3.2 Cole-Cole 图的几何形状

这是一个标准的**半圆**（semicircle），圆心在实轴上 $(\varepsilon_s + \varepsilon_{\infty})/2$ 处，半径为 $\Delta\varepsilon/2 = (\varepsilon_s - \varepsilon_{\infty})/2$。

```
  ε'' ↑
      │
      │              ╭───╮
      │            ╱  ●  ╲         ● = ωτ = 1 (峰)
      │          ╱         ╲
Δε/2 ┤·······╱···········╲······
      │     ╱               ╲
      │   ╱                   ╲
      │ ╱ ωτ → 0               ╲ ωτ → ∞
      │╱                         ╲
      ●───────────────────────────●────→ ε'
      ε∞                         εs
            (ε∞+εs)/2
```

- **$\omega \to 0$** 对应圆弧的最右端 $(\varepsilon_s, 0)$
- **$\omega \to \infty$** 对应圆弧的最左端 $(\varepsilon_{\infty}, 0)$
- **$\omega\tau = 1$** 对应圆弧的顶点 $((\varepsilon_s+\varepsilon_{\infty})/2, \Delta\varepsilon/2)$
- 频率沿逆时针方向从低频到高频扫描

### 3.3 Cole-Cole 图的实验价值

Cole-Cole 图是介电谱学中最强大的诊断工具：

- **完美半圆** → 体系遵循单一弛豫时间的 Debye 模型
- **压扁的半圆（depressed semicircle）** → 存在弛豫时间分布，需要 Cole-Cole 或 Havriliak-Negami 修正
- **多个半圆** → 多种弛豫机制共存（如晶粒 + 晶界响应、不同的极化种类）
- **半圆右侧的直线尾（spike / Warburg tail）** → 低频下出现离子扩散/空间电荷效应

---

## 四、Debye 模型的局限性及其修正

### 4.1 为什么实际体系常常偏离 Debye 行为

Debye 模型的**隐含假设**是体系具有**单一、明确的弛豫时间** $\tau$，即所有偶极子处于完全相同的环境中，具有完全相同的转动驰豫行为。

实际情况中：
- 极性聚合物（如 PVDF）的偶极子处于多种局域化学环境中
- 多晶陶瓷的晶粒与晶界弛豫时间不同
- 弛豫铁电体中 PNRs 的尺寸分布导致弛豫时间分布
- 离子-偶极子相互作用导致协同弛豫

这些效应使得体系表现出一**个弛豫时间的分布**，在频谱上表现为弛豫峰的宽化和 Cole-Cole 半圆的压扁。

### 4.2 Cole-Cole 修正（1941）

Cole 兄弟引入参数 $\alpha$（$0 \leq \alpha < 1$）表征弛豫时间分布的宽度：

$$
\boxed{\varepsilon^{*}(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{1 + (i\omega\tau)^{1-\alpha}}}
$$

- $\alpha = 0$：恢复标准 Debye 模型
- $\alpha$ 越大 → 弛豫时间分布越宽 → Cole-Cole 半圆越扁
- Cole-Cole 图仍是圆弧，但圆心位于实轴下方

实部和虚部（分离实数化后的结果）：

$$
\varepsilon'(\omega) = \varepsilon_{\infty} + \frac{\Delta\varepsilon\left[1 + (\omega\tau)^{1-\alpha}\sin(\alpha\pi/2)\right]}{1 + 2(\omega\tau)^{1-\alpha}\sin(\alpha\pi/2) + (\omega\tau)^{2(1-\alpha)}}
$$

$$
\varepsilon''(\omega) = \frac{\Delta\varepsilon \cdot (\omega\tau)^{1-\alpha}\cos(\alpha\pi/2)}{1 + 2(\omega\tau)^{1-\alpha}\sin(\alpha\pi/2) + (\omega\tau)^{2(1-\alpha)}}
$$

### 4.3 Cole-Davidson 修正（1951）

描述非对称弛豫峰（高频侧比低频侧衰减得更快，常见于某些聚合物和玻璃态体系）：

$$
\boxed{\varepsilon^{*}(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{(1 + i\omega\tau)^{\beta}}}
$$

参数 $\beta$（$0 < \beta \leq 1$）控制高频侧的非对称展宽。

### 4.4 Havriliak-Negami (HN) 方程（1966）

Cole-Cole 和 Cole-Davidson 的**统一推广**，同时引入对称展宽 $\alpha$ 和非对称展宽 $\beta$：

$$
\boxed{\varepsilon^{*}(\omega) = \varepsilon_{\infty} + \frac{\varepsilon_s - \varepsilon_{\infty}}{\big[1 + (i\omega\tau)^{1-\alpha}\big]^{\beta}}}
$$

参数含义：

| 参数 | 范围 | 效应 |
|------|------|------|
| $\alpha$ | $0 \leq \alpha < 1$ | 弛豫峰对称展宽（Cole-Cole 贡献） |
| $\beta$ | $0 < \beta \leq 1$ | 弛豫峰非对称展宽（Cole-Davidson 贡献） |
| $\alpha = 0, \beta = 1$ | — | 恢复标准 Debye |
| $\beta = 1$ | — | 恢复 Cole-Cole |
| $\alpha = 0$ | — | 恢复 Cole-Davidson |

HN 方程是实验拟合介电谱最通用的经验公式。

### 4.5 各模型的对比总结

```
                    Cole-Davidson
  Debye ────────────────────────────→ (非对称展宽)
    │                                    │
    │                                    │
    ├──→ Cole-Cole ────→ Havriliak-Negami ←┤
    │    (对称展宽)       (统一模型)        │
    │                                       │
    └───────────────────────────────────────┘
```

| 模型 | 方程 | 参数 | Cole-Cole 图形状 |
|------|------|------|------------------|
| Debye | $\varepsilon_{\infty} + \frac{\Delta\varepsilon}{1 + i\omega\tau}$ | $\tau$ | 完美半圆 |
| Cole-Cole | $\varepsilon_{\infty} + \frac{\Delta\varepsilon}{1 + (i\omega\tau)^{1-\alpha}}$ | $\tau, \alpha$ | 压扁的圆弧（圆心在实轴下） |
| Cole-Davidson | $\varepsilon_{\infty} + \frac{\Delta\varepsilon}{(1 + i\omega\tau)^{\beta}}$ | $\tau, \beta$ | 非对称弧（高频侧倾斜） |
| Havriliak-Negami | $\varepsilon_{\infty} + \frac{\Delta\varepsilon}{[1 + (i\omega\tau)^{1-\alpha}]^{\beta}}$ | $\tau, \alpha, \beta$ | 同时压扁和非对称的弧 |

---

## 五、弛豫时间分布——从物理角度理解偏离 Debye

### 5.1 弛豫时间分布的积分表示

Debye 弛豫的实部和虚部可写为单弛豫时间 $\tau$ 的贡献。对有弛豫时间分布的体系，总响应由分布函数 $g(\ln\tau)$ 加权积分：

$$
\varepsilon'(\omega) = \varepsilon_{\infty} + \Delta\varepsilon \int_{-\infty}^{\infty} \frac{g(\ln\tau)}{1 + \omega^{2}\tau^{2}} \,\mathrm{d}\ln\tau
$$

$$
\varepsilon''(\omega) = \Delta\varepsilon \int_{-\infty}^{\infty} \frac{g(\ln\tau) \cdot \omega\tau}{1 + \omega^{2}\tau^{2}} \,\mathrm{d}\ln\tau
$$

其中 $g(\ln\tau)$ 满足归一化 $\int g(\ln\tau)\,\mathrm{d}\ln\tau = 1$。

### 5.2 Debye 行为的条件

Debye 弛豫对应 $g(\ln\tau) = \delta(\ln\tau - \ln\tau_0)$（单一弛豫时间）。

当弛豫时间有分布宽度时，$g(\ln\tau)$ 展宽 → 不同 $\tau$ 的弛豫峰重叠 → $\varepsilon''(\omega)$ 峰宽化、$\varepsilon'(\omega)$ 台阶平缓化。

### 5.3 弛豫铁电体中的弛豫时间分布

在弛豫铁电体中（回顾 Lect_00 第 5.5 节），PNRs 尺寸从 2 到 50 nm 不等，每个 PNR 有不同的局域环境。PNR 的弛豫时间与尺寸有关：

$$
\tau \sim \tau_0 \exp\left(\frac{E_a V}{k_B T}\right)
$$

PNR 体积 $V$ 的分布 → $\tau$ 的分布 → **偏离 Debye 行为，呈 Cole-Cole 型频谱**。

这正是阻抗谱（Impedance Spectroscopy）区分正常铁电体和弛豫铁电体的实验判据——弛豫铁电体的 Cole-Cole 参数 $\alpha$ 显著大于零（$0.3$–$0.7$），而正常铁电体 $\alpha \to 0$。

---

## 六、在储能器件分析中的应用

### 6.1 阻抗谱学——从复介电常数到器件诊断

复介电常数 $\varepsilon^{*}(\omega)$ 的测量本质上是阻抗谱（EIS, Electrochemical Impedance Spectroscopy）的一种实现方式。通过测量不同频率下的复阻抗，可以提取器件的物理参数：

**（a）纯电容行为**

理想电容的复阻抗为 $Z^{*} = 1/(i\omega C)$。代入 $C = \varepsilon_0\varepsilon^{*}A/d$：

$$
Z^{*} = \frac{d}{i\omega\varepsilon_0\varepsilon^{*}A}
$$

Debye 型介电弛豫在阻抗谱的 Nyquist 图中表现为对应 Cole-Cole 半圆的 RC 弧。

**（b）串联电阻-电容模型**

实际超级电容器/介质电容器的等效电路：

```
   ┌──R_s──┬──R_ct──┬──W──┐
   │       │        │     │
  V~      C_dl     CPE   │
   │       │        │     │
   └───────┴────────┴─────┘

   R_s: 串联电阻（电解液 + 接触）
   R_ct: 电荷转移电阻
   C_dl: 双电层电容
   W: Warburg 扩散阻抗
   CPE: 常相位角元件（非理想电容）
```

### 6.2 $\tan\delta$ 在器件选型中的实践意义

损耗角正切 $\tan\delta = \varepsilon''/\varepsilon'$ 是储能器件最关键的品质指标之一：

| 应用场景 | 典型 $1/\tan\delta$（品质因数 Q）要求 |
|----------|--------------------------------------|
| 微波介质谐振器 | $> 10^{4}$（$\tan\delta < 10^{-4}$） |
| 脉冲功率电容器 | $> 100$（$\tan\delta < 0.01$） |
| 超级电容器 | $1$–$10$（较低的 Q 可接受，追求高能量密度） |
| 电介质储能 | $> 50$（$\eta > 95\%$） |

从 Debye 模型可知，在 $\omega \approx 1/\tau$ 附近 $\tan\delta$ 取极大值——**储能器件的工作频率应远离弛豫峰频率**。

### 6.3 从阻抗谱提取 Debye 参数——实验操作

实际实验中，通过测量复阻抗 $Z^{*}(\omega) = Z'(\omega) - iZ''(\omega)$ 或复电容 $C^{*}(\omega) = C'(\omega) - iC''(\omega)$，拟合等效电路模型提取物理参数：

1. 测量 $Z^{*}(\omega)$ 的实部和虚部
2. 转换为 $\varepsilon^{*}(\omega) = 1/(i\omega C_0 Z^{*})$，其中 $C_0 = \varepsilon_0 A/d$ 为空池电容
3. 绘制 Cole-Cole 图（$\varepsilon''$ vs $\varepsilon'$）
4. 用 Cole-Cole / Havriliak-Negami 方程拟合，提取 $\tau$、$\alpha$、$\beta$、$\Delta\varepsilon$
5. 结合温度依赖测量，从 $\tau(T)$ 的 Arrhenius 行为提取弛豫活化能 $E_a$

---

## 七、总结：Debye 弛豫的物理图像

复介电常数的 Debye 弛豫可以概括为以下物理链条：

```
  偶极子在电场中取向
        │
        ▼
  弛豫微分方程: dP/dt = -(P - P_s)/τ
        │
        ▼
  频率域: ε*(ω) = ε∞ + Δε/(1 + iωτ)
        │
        ▼
  实部: ε'(ω) = ε∞ + Δε/(1 + ω²τ²)
  虚部: ε''(ω) = Δε·ωτ/(1 + ω²τ²)
        │
        ▼
  Cole-Cole 图: 半圆 (ε' - 中心)² + ε''² = (Δε/2)²
        │
        ▼
  偏离 Debye → 弛豫时间分布
  Cole-Cole / Cole-Davidson / Havriliak-Negami
```

Debye 模型虽然是最简单的介电弛豫模型，但它揭示了介电弛豫最本质的物理：**在交变电场中，极化总是以有限的速度（弛豫时间 $\tau$）响应电场变化，导致频率色散和能量损耗**。这一图像是所有更复杂弛豫模型的出发点，也是理解储能器件频率特性的理论基础。

---

## 参考文献

1. P. Debye, *Polar Molecules*, Chemical Catalog Company, 1929.
2. K. S. Cole and R. H. Cole, "Dispersion and absorption in dielectrics I. Alternating current characteristics," *J. Chem. Phys.*, 9(4), 341–351 (1941).
3. D. W. Davidson and R. H. Cole, "Dielectric relaxation in glycerol, propylene glycol, and n-propanol," *J. Chem. Phys.*, 19(12), 1484–1490 (1951).
4. S. Havriliak and S. Negami, "A complex plane representation of dielectric and mechanical relaxation processes in some polymers," *Polymer*, 8, 161–210 (1967).
5. A. K. Jonscher, *Dielectric Relaxation in Solids*, Chelsea Dielectrics Press, 1983.
6. F. Kremer and A. Schönhals (eds.), *Broadband Dielectric Spectroscopy*, Springer, 2003.
7. C. J. F. Böttcher and P. Bordewijk, *Theory of Electric Polarization*, Vol. 2, Elsevier, 1978.
8. E. Barsoukov and J. R. Macdonald (eds.), *Impedance Spectroscopy: Theory, Experiment, and Applications*, 3rd ed., Wiley, 2018.
