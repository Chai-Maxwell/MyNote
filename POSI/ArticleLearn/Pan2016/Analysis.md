# Pan et al. (2016) 分析：等离激元结构中的光自旋-轨道相互作用

## 文章逻辑

核心问题：光子自旋-轨道相互作用（SOI）通常极弱（需弱测量才能观测），但在金属纳米结构中显著增强。为什么？能不能用？

逻辑链：**SOI增强机制（Dirac形式理论）→ 近场角动量演化（纳米球、纳米线计算）→ 实验应用（Y形分支自旋分选）**。

三个层次：

1. **金纳米球散射**：圆偏振光照射，近场轨道动量密度流线绕球螺旋旋转，同时圆偏振度 $C$ 急剧下降 → SAM通过SOI转化为OAM。
2. **金纳米线尖端**：横向轨道动量流导致自旋依赖的定向SP传播，两种波导模式叠加形成周期性zigzag图案。
3. **Y形分支纳米电路**：主干长度 = 半周期，不同圆偏振在分叉处不对称分布相反 → 实验上6:1分束比的自旋分选。

理解这一切的起点是**光场Dirac表示**。

---

## 光场Dirac表示：推导与含义

### 1. Maxwell方程的Dirac化

出发点：单色场（频率 $\omega$）Maxwell方程（非磁性介质 $\mu = \mu_0$）：

$$
\nabla \times \bm{E} = i\omega\mu_0\bm{H}, \quad \nabla \times \bm{H} = -i\omega\varepsilon_0\varepsilon(\bm{r})\bm{E}
$$

$$
\nabla \cdot \bm{E} = 0, \quad \nabla \cdot \bm{H} = 0
$$

构造六分量波函数（归一化使 $|\Phi|^2$ = 能量密度）：

$$
\Phi = \frac{1}{\sqrt{4\omega}} \begin{pmatrix} \sqrt{\varepsilon_0}\,\bm{E} \\ \sqrt{\mu_0}\,\bm{H} \end{pmatrix}
$$

引入光学势 $V = \omega[1-\varepsilon(\bm{r})]$，将Maxwell方程重写为Dirac形式：

$$
c(\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}})\Phi + \hat{\beta}V\Phi = i\frac{\partial}{\partial t}\Phi \tag{1}
$$

其中 $\hat{\bm{p}} = -i\nabla$，$\hat{\alpha}_i$（i=1,2,3）和 $\hat{\beta}$ 是 $6\times 6$ Dirac矩阵，块对角结构，每个块内为 $3\times 3$ 自旋-1矩阵，满足：

$$
[\alpha_i, \alpha_k] = -i\varepsilon_{ikl}\alpha_l
$$

**为什么是自旋-1矩阵？** 光子螺旋度取 $0, \pm 1$，对应的角动量代数由 $3\times 3$ 矩阵表示——将自旋-1/2的 $2\times 2$ Pauli矩阵推广到自旋-1。历史上Mignani-Recami-Baldo (1974) 首次用 $\boldsymbol{\psi} = \bm{E} - i\bm{H}$ 和 $3\times 3$ $\boldsymbol{\alpha}$ 矩阵写出了 $(W + \boldsymbol{\alpha}\cdot\bm{p})\boldsymbol{\psi}=0$。

**与电子Dirac方程的对比**：

|  | 电子 | 光子 |
|---|---|---|
| 方程 | $c(\boldsymbol{\alpha}\cdot\hat{\bm{p}})\psi + \beta mc^2\psi = i\partial_t\psi$ | $c(\hat{\boldsymbol{\alpha}}\cdot\hat{\bm{p}})\Phi + \hat{\beta}V\Phi = i\partial_t\Phi$ |
| 质量项 | $mc^2$ | $V = \omega[1-\varepsilon(\bm{r})]$ |
| 自旋 | 1/2 | 1 |
| SOI媒介 | $\nabla V_{\text{electric}}$ | $\nabla\varepsilon(\bm{r})$ |

方程(1)和电子Dirac方程代数同构——都有 $(\text{自旋矩阵}\cdot\text{动量算符})$ 耦合项，耦合强度由"势"的空间梯度控制。对光子，$\nabla V = -\omega\nabla\varepsilon$，在金属-介质界面处极大（金的 $\varepsilon$ 在光频为很大负数，介质 $\varepsilon \sim 2.25$），直接导致强SOI。Onoda等 (2004) 首次指出PSHE来源于 $\nabla\varepsilon$ 引入的SOI；Leary & Smith (2014) 严格推导了两者的数学相似性。

---

### 2. SAM：Dirac期望值 → 场叉积

SAM密度 = $\hat{\boldsymbol{\alpha}}$ 的期望值：

$$
\bm{s} = \langle\Phi|\hat{\boldsymbol{\alpha}}|\Phi\rangle
$$

代入 $\Phi$，利用 $\hat{\boldsymbol{\alpha}}$ 的块对角自旋-1矩阵结构，作用在场分量上给出叉积形式：

$$
\boxed{\bm{s} = \frac{1}{4\omega}\operatorname{Im}\left[\varepsilon_0 \bm{E}^* \times \bm{E} + \mu_0 \bm{H}^* \times \bm{H}\right]} \tag{2}
$$

**验证**：沿z轴传播的圆偏振平面波 $\bm{E} = E_0(\hat{\bm{x}} \pm i\hat{\bm{y}})e^{ikz}$：

$$
\bm{E}^* \times \bm{E} = \mp 2i|E_0|^2\hat{\bm{z}}, \quad \operatorname{Im}(\bm{E}^* \times \bm{E}) = \mp 2|E_0|^2\hat{\bm{z}}
$$

方向沿传播方向，符号取决于手性。$\bm{H}$ 贡献同理——电场和磁场对SAM贡献平权（electric-magnetic democracy）。

**圆偏振度**（单位能量密度中的SAM幅度）：

$$
C = \frac{|\varepsilon_0 \bm{E}^* \times \bm{E} + \mu_0 \bm{H}^* \times \bm{H}|}{\varepsilon_0|\bm{E}|^2 + \mu_0|\bm{H}|^2}
$$

$C=1$ 纯圆偏振，$C=0$ 线偏振。纳米球表面近场区 $C$ 急剧下降 → SAM被消耗，转化为OAM。

**与dual形式SAM密度的关系**：常见的dual-symmetric SAM密度写为

$$
\bm{s}_{\text{dual}} = \frac{1}{2}(\varepsilon_0 \bm{E} \times \bm{A} + \mu_0 \bm{H} \times \bm{C})
$$

其中 $\bm{A}$ 是磁矢势（$\bm{B} = \nabla \times \bm{A}$），$\bm{C}$ 是电矢势（$\bm{D} = -\nabla \times \bm{C}$，dual-symmetric框架下的对偶量）。这个形式来自Noether定理应用于dual-symmetric Lagrangian，给出的是**瞬时的**（operator-valued）自旋密度，用势而非场强表达。

Pan等人的式子(2)和它**等价**，但做了两步转化：

**(1) 场强化**：对单色场，辐射规范下 $\bm{E} = -\partial_t\bm{A} = i\omega\bm{A}$（phasor），所以

$$
\varepsilon_0 \bm{E}^* \times \bm{A} = \varepsilon_0 \bm{E}^* \times \frac{\bm{E}}{i\omega} = -\frac{i}{\omega}\varepsilon_0 \bm{E}^* \times \bm{E}
$$

**(2) 时间平均**：$\bm{s}_{\text{dual}}$ 是瞬时密度，物理可观测量是周期平均。对时谐场 $\bm{E}(t) = \operatorname{Re}[\bm{E}e^{-i\omega t}]$，$\bm{A}(t) = \operatorname{Re}[\bm{A}e^{-i\omega t}]$：

$$
\langle \varepsilon_0 \bm{E}(t) \times \bm{A}(t) \rangle = \frac{\varepsilon_0}{2}\operatorname{Re}[\bm{E}^* \times \bm{A}] = \frac{\varepsilon_0}{2}\operatorname{Re}[-\frac{i}{\omega}\bm{E}^* \times \bm{E}] = \frac{\varepsilon_0}{2\omega}\operatorname{Im}[\bm{E}^* \times \bm{E}]
$$

但 $\bm{s}_{\text{dual}}$ 前面有系数 $1/2$，所以时间平均后：

$$
\langle \bm{s}_{\text{dual}} \rangle = \frac{1}{2} \cdot \frac{\varepsilon_0}{2\omega}\operatorname{Im}[\bm{E}^* \times \bm{E}] + (\bm{H},\bm{C}\text{同理}) = \frac{1}{4\omega}\operatorname{Im}[\varepsilon_0 \bm{E}^* \times \bm{E} + \mu_0 \bm{H}^* \times \bm{H}] = \bm{s}_{\text{Dirac}}
$$

**总结差异来源**：

| | dual形式 | Dirac形式（Pan文） |
|---|---|---|
| 变量 | 势 $\bm{A}, \bm{C}$ | 场强 $\bm{E}, \bm{H}$ |
| 时间 | 瞬时值 | 周期平均 |
| 系数 | $1/2$（来自Lagrangian对称性） | $1/4\omega$（来自时间平均 + $\bm{A} = \bm{E}/(i\omega)$） |
| 规范依赖性 | 依赖（需要dual-symmetric框架保证不变性） | 不依赖（只用场强） |
| 适用范围 | 任意时变场 | 单色场 |

两者在单色场下完全等价。Dirac形式用场强表达的优点在于：不需要引入矢势，直接可算，且自动规范不变。

---

### 3. OAM：轨道动量密度的分解

轨道动量密度 = 动量算符期望值：

$$
\bm{p}_o = \langle\Phi|-i\nabla|\Phi\rangle
$$

展开：

$$
\boxed{\bm{p}_o = \frac{1}{4\omega}\operatorname{Im}\left[\varepsilon_0 \bm{E}^*(\nabla)\bm{E} + \mu_0 \bm{H}^*(\nabla)\bm{H}\right]} \tag{3}
$$

$\bm{E}^*(\nabla)\bm{E}$ 表示梯度只作用在右侧 $\bm{E}$，分量形式 $E_i^*\nabla E_i$。轨道角动量密度：$\bm{l} = \bm{r} \times \bm{p}_o$。

**为什么不用Poynting矢量？** 总动量密度的分解是（Berry 2009）：

$$
\bm{p} = \frac{1}{c^2}\bm{S} = \bm{p}_o + \bm{p}_s, \quad \bm{p}_s = \frac{1}{2}\nabla \times \bm{s}
$$

$\bm{p}_s$ 是自旋动量密度，满足 $\nabla \cdot \bm{p}_s = \nabla \cdot (\nabla \times \bm{s})/2 = 0$——散度恒为零，不参与能量输运，不是真实的"光子轨迹"。$\bm{p}_o$ 才是物理轨迹，已被Kocsis等 (2011) 的量子弱测量实验直接验证。

三者关系：

- $\bm{p}_o$ 流线 → 光子轨迹（轨道运动）
- $\bm{s}$ → 自旋指向（偏振手性）
- $\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}}$ → 耦合项

---

### 4. SOI的耦合机制

回到方程(1)，核心是交叉项 $\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}}$。

**均匀介质**（$\nabla\varepsilon=0$，$V$ 为常数）：$\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}}$ 的本征态是螺旋度确定的平面波——圆偏振光沿直线传播，螺旋度守恒，SOI可忽略。

**金属结构近场**（$\nabla\varepsilon$ 极大）：$V(\bm{r})$ 的梯度驱动了非平庸的自旋-轨道耦合：

**(a) SAM → OAM转化**：光在金属表面被剧烈散射，轨迹大幅弯曲 → 几何相位（Berry相位）积累 → $\bm{s}$ 减小（$C$ 下降），同时 $\bm{p}_o$ 获得角向分量（流线螺旋旋转）。能量从自旋自由度流向轨道自由度。

**(b) 自旋依赖的传播方向**：$\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}}$ 意味着自旋方向（$\hat{\boldsymbol{\alpha}}$ 的本征值）和动量方向（$\hat{\bm{p}}$ 的作用方向）被锁定。在纳米线尖端，近场SOI产生的横向 $\bm{p}_o$ 决定了SP耦合到哪个传播方向——翻转圆偏振手性，耦合方向逆转。

SOI增强的两个来源：(1) $\nabla\varepsilon$ 大（金属-介质界面）；(2) 几何相位大（轨迹剧烈弯曲，非傍轴散射）。两者叠加使得金属纳米结构中的SOI比自由空间强多个数量级。

---

### 5. 向非均匀介质的推广

Pan文用 $V = \omega[1-\varepsilon(\bm{r})]$ 引入空间变化的介电常数，这在Dirac框架中是最简推广——只处理了**标量、无色散、spin-degenerate**（$\mu=\mu_0$，只有 $\varepsilon$ 变化，$\bm{E}$ 和 $\bm{H}$ 贡献仍对称）的情况。更一般的非均匀介质（各向异性、有色散、$\varepsilon \neq \mu$）需要更系统的推导，已有多篇工作：

**Feng & Wu (2022)** 做了最系统的推广 [arXiv:2203.14664]。从含源Maxwell方程出发，将 $\bm{D}_\perp$ 和 $\bm{B}_\perp$ 在螺旋度基 $\bm{e}_\pm = (\bm{e}_1 \pm i\bm{e}_2)/\sqrt{2}$ 中投影，构造四分量光子波函数：

$$
\bm{\Psi}_\perp = (\bm{\Psi}_+, \bm{\Psi}_-)^T, \quad \bm{\Psi}_\pm = \bm{D}_\perp \pm i\sigma_3 \bm{B}_\perp
$$

得到的四矢量光Dirac方程为：

$$
i\frac{\partial\bm{\Psi}_\perp}{\partial t} = \left[\gamma_0(\hat{m}_+ + \gamma_5\hat{m}_-) + \bm{\gamma}_\perp \cdot (\hat{\bm{p}}_+ + \gamma_5\hat{\bm{p}}_-)\right]\bm{\Psi}_\perp
$$

关键区别在于 $\gamma_5$ 项：

- **Spin-degenerate**（$\varepsilon = \mu$）：$\gamma_5$ 项消失，回到类Pan文的形式（非厄米但PT对称），有效哈密顿量为 $H_{\text{eff}} = \gamma_0(\hat{k}_z + \bm{\Omega}\cdot\bm{J}) + \cdots$，其中 $\bm{\Omega}\cdot\bm{J} = \bm{\Omega}\cdot\bm{L} + \bm{\Omega}\cdot\bm{\Sigma}$ 直接展示SAM-OAM耦合
- **Non-spin-degenerate**（$\varepsilon \neq \mu$）：$\gamma_5$ 项存活，等效于Dirac粒子的反常磁矩耦合 $\sim \delta\mu_a \sigma^{\mu\nu}F_{\mu\nu}$，产生手性依赖的SAM-OAM转换

**Yang & Feng (2025)** [arXiv:2502.01016] 进一步推广到螺旋坐标（Frenet-Serret标架），将介电张量做多极展开（单极/自旋-0、偶极/自旋-1、四极/自旋-2），对应的算符 $\hat{m}_\pm, \hat{\bm{p}}_\pm$ 直接编码了介质各向异性和手性。光子的自旋霍尔效应和轨道霍尔效应作为Heisenberg运动方程的自然推论出现。

**Khan & Jagannathan (2024)** [*Results in Optics* 17, 100747] 走另一条路——用Riemann-Silberstein-Weber矢量 $\bm{F}^\pm = (\sqrt{\varepsilon}\bm{E} \pm i\bm{B}/\sqrt{\mu})/\sqrt{2}$ 构造8D矩阵表示，将非均匀性视为微扰，用Foldy-Wouthuysen变换处理。

**Yang, Feng & Zhang (2026)** [arXiv:2606.23016] 完成了二次量子化，将频率色散通过 $\varepsilon(\omega), \mu(\omega)$ 引入多极算符。

总结来说：Pan文的形式是"标量极限"下的特例——$\varepsilon(\bm{r})$ 只有空间依赖，没有张量结构也没有色散。推广到一般非均匀介质的要点是：(1) 介电响应从标量升级为张量（多极展开）；(2) 引入 $\gamma_5$ 描述 $\varepsilon \neq \mu$ 的手性破缺；(3) 色散通过频率依赖的介电函数进入。

---

## 总结

Dirac形式体系给出了光SOI的统一描述：

- **SAM**：$\bm{s} = \langle\Phi|\hat{\boldsymbol{\alpha}}|\Phi\rangle = (4\omega)^{-1}\operatorname{Im}[\varepsilon_0\bm{E}^*\times\bm{E} + \mu_0\bm{H}^*\times\bm{H}]$
- **OAM**：$\bm{l} = \bm{r} \times \langle\Phi|-i\nabla|\Phi\rangle$，核心是剔除 $\bm{p}_s$ 的轨道动量密度 $\bm{p}_o$
- **耦合**：$\hat{\boldsymbol{\alpha}} \cdot \hat{\bm{p}}$ 项，媒介为 $\nabla\varepsilon$，在金属结构中因界面 $\varepsilon$ 反差巨大而极大增强

从物理上看，金属纳米结构中的强SOI本质上和电子系统中的LS耦合是同一种数学结构——都是自旋矩阵与动量算符的点积，由势的梯度驱动。区别仅在于光子的"势"是光学位势 $V = \omega[1-\varepsilon(\bm{r})]$。这套框架最终使得SOI从"需要弱测量"变为"近场中直接可见"，并支撑了等离激元纳米电路中光子自旋分选的实验实现。

## 参考文献

1. Pan, D., Wei, H., Gao, L., & Xu, H. (2016). *Phys. Rev. Lett.* 117, 166803.
2. Mignani, R., Recami, E., & Baldo, M. (1974). *Lett. Nuovo Cimento* 11, 568–572.
3. Berry, M. V. (2009). *J. Opt. A* 11, 094001.
4. Bliokh, K. Y., Bekshaev, A. Y., & Nori, F. (2014). *Nat. Commun.* 5, 3300.
5. Onoda, M., Murakami, S., & Nagaosa, N. (2004). *Phys. Rev. Lett.* 93, 083901.
6. Leary, C. C., & Smith, K. H. (2014). *Phys. Rev. A* 89, 023831.
7. Kocsis, S., et al. (2011). *Science* 332, 1170–1173.
8. Feng, L., & Wu, Y. (2022). Four-Vector Optical Dirac Equation and Spin-Orbit Interaction of Structured Light. arXiv:2203.14664.
9. Yang, L., & Feng, L. (2025). Induced Berry Connection and Photonic Spin Hall Effect in Optical Dirac Theory. arXiv:2502.01016.
10. Khan, S. A., & Jagannathan, R. (2024). A new matrix representation of the Maxwell equations based on the RSW vector for a linear inhomogeneous medium. *Results in Optics*, 17, 100747.
11. Yang, L., Feng, L., & Zhang, Y. (2026). Photons in Media: A Second-Quantization Scheme Based on the Optical Dirac Equation. arXiv:2606.23016.
