# 学术写作规范审查意见

**审查对象**：`Photon Spin-Obit Interaction in Mie Scattering_PRL_15th Aug.pdf`
（文内实际标题：*Universal Spin-Orbit Interactions in Mie Scattering*）
**审查日期**：2026-08-24
**审查范围**：仅针对**表述与用词的学术写作规范**，不涉及物理结论本身的正确性判断。

> 说明：PDF 文本提取时连字（ti/ff/fi/fl/tt）被拆出，引文已还原为正常拼写；所有条目均已在原文中定位核实。

---

## 分级标准

| 级别 | 含义 | 后果 |
|---|---|---|
| **一级** | 严重违规：语法破损、术语误用、交叉引用错误、格式硬性违规 | 影响可读性与可信度，编辑/审稿人会直接质疑，**必须修改** |
| **二级** | 明显不规范：中式英语、过度断言、术语前后不一致、冠词系统性缺失 | 显著降低专业观感，**强烈建议修改** |
| **三级** | 轻度瑕疵：连字符、大小写、单位空格、参考文献体例 | 润色层面，**建议统一** |

---

# 一级：严重不规范（必须修改）

## 1.1 语法结构性错误（句子不成立）

以下 11 处属于**语法破损**，非风格问题：

| # | 原文 | 问题 | 建议 |
|---|---|---|---|
| 1 | "a linearly-polarized plane-wave **incidents on** the gold NS" | `incident` 是形容词/名词，**不是动词** | `is incident on` / `impinges on` / `illuminates` |
| 2 | "**These is** obviously not the case observed in Mie scattering." | 主谓数不一致 | `This is not the case…` |
| 3 | "the orbit momentum **can pushes** the NS" | 情态动词后用第三人称单数 | `can push` |
| 4 | "the model **can also works** in all of the SOI phenomenon" | 同上 | `can also work` |
| 5 | "the absolute values of ∇·Σ⃡ and ∇·Λ⃡ **are equals to** each other" | `equals` 误作形容词 | `are equal to` |
| 6 | "one fundamental property that **always accompanying** the Mie scattering" | 定语从句缺谓语 | `that always accompanies` |
| 7 | "the SOI effect …, and **own** a comprehensive influence" | 主谓不一致 + 动词误用 | `and has a broad impact` |
| 8 | "the intensity of magnetic dipole and electric quadrupoles **has been** greatly enhanced" | 复合主语配单数谓语 | `are greatly enhanced` |
| 9 | "the spin torque mainly **drive** the polarizability" | 主谓不一致 | `drives` |
| 10 | "orbit torque τ_orbit on NS, which also **participate** in driving…" | 主谓不一致 | `participates` |
| 11 | "the scattered LCP light **owns** larger M_o" | `own` 为「拥有所有权」，此处系中式直译「具有」 | `exhibits` / `carries` |

## 1.2 结论段最后一句是**残缺句**（sentence fragment）

> "**While** the established microscopic electrodynamic model can also works in all of the SOI phenomenon within the framework of Maxwell's theory, including the typical IF and GH effects [4,23,38], T-spin [38,39], and optical (lateral) forces [40-43]."

`While` 引导的从句**没有主句**，整句语法上不成立。这是全文最后的实质性论断句，出现在此处尤为严重。同句还叠加了 1.1-#4 的语法错误和 `phenomenon`（单数）指代复数对象的错误。

**建议**：改为 `The established microscopic electrodynamic model should also apply to other SOI phenomena within the framework of Maxwell's theory, including the IF and GH effects [4,23,38], transverse spin [38,39], and optical (lateral) forces [40-43].`

## 1.3 "beyonds" 不是英文单词

> "in nanophotonics, plasmonics, and **beyonds**."

→ `and beyond`。此类拼写错误出现在结论段，硬伤。

## 1.4 核心物理术语误用：polarizability ↔ polarization（全文 10+ 处）

这是**最实质的用词问题**。文中反复使用 "the induced **polarizability** P"、"the spinning **polarizability** P"、"the objects **eliminate the polarizability**"。

但从上下文与公式判断：
- P 出现在 `τ_spin = P × E`、`∂t(P × A)`、`S = ½(ε₀E×A + μ₀H×C − P×A + …)` 中；
- 文中称其"随位置变化""在 NS 内部不同位置形成"。

即 **P 是极化强度（polarization density，C·m⁻²）**，而 **polarizability（极化率 α）是标量/张量响应系数，不随位置旋转、也不能"被消除"**。二者是不同物理量，PRL 审稿人必然指出。

**建议全文替换**：
- `induced polarizability P` → `induced polarization P`
- `elliptically rotated polarizability` → `elliptically rotating polarization`
- `the objects eliminate the polarizability` → `the object depolarizes` / `the polarization decays`
- 摘要中 `the polarity retardation effect` → `the retardation of the polarization`（`polarity`＝极性/正负性，此处也是误用）

## 1.5 图表交叉引用错误（2 处）

| 位置 | 原文引用 | 实际内容 | 应为 |
|---|---|---|---|
| 实验段 | "A significant angular shift between LCP and RCP patterns (**Fig. 2b**) is confirmed in the green channel…" | Fig. 2b 是"NS 内部电场与极化"，与实验数据无关 | **Fig. 5b** |
| OAM 段 | "the scattered LCP light owns larger M_o in the first and third quadrants… (**Fig. 3a**)" | Fig. 3a 是"NS 内部时均轨道力"；LCP/RCP 轨道动量在 **3c** | **Fig. 3c** |

注：Fig. 3a 在相邻两段被引用指代两个不同物理量，读者无法对应。

## 1.6 记号自相矛盾：用 ⊥ 下标表示"纵向场"

> "we adopt the **E⊥ = −∇φ** as the **longitudinal** electric field"
> "we adopt **H⊥ = −∇ϕ** as the **longitudinal** magnetic field"

`−∇φ` 是无旋部分，即**纵向场**，标准记法为 `E_∥` 或 `E_L`；而 `⊥` 在光学角动量文献（含本文引用的 Bliokh 等 [34]）中固定表示**横向（∇·E=0）**分量。符号与文字自相矛盾，会直接导致后续所有公式被误读。**建议改用 `E_L` / `H_L`。**

## 1.7 关键推导被推给未发表工作

> "And the detailed derivation process **will be reported in other work**."

正文核心的 SAM/OAM 连续性方程组（全文理论骨架）未给出推导，也未指向 SI，而是指向一篇不存在的文章。PRL 要求可验证性，此句会被编辑直接质疑。**建议**：将推导置于 SI 并改为 `A detailed derivation is provided in the Supplemental Material, Sec. X.`

## 1.8 参考文献区出现**孤立悬挂条目**

`Reference` 标题**之前**独立成行出现：

```
Science 340, 328-330 (2013)
Reference
[1] M. Onoda, ...
```

该条目无编号、无作者、未被正文引用，显系编辑残留。**必须删除或补全并编入序列。**

## 1.9 机构名拼写错误

> "University of **Cambrige**"（下一行却正确写为 `Cambridge, CB3 0HE`）

作者单位名拼错属低级但高可见度的错误。

同段其他问题：
- 单位 3 结尾 "…Technology, **China, 410073, China**" —— `China` 重复，且缺城市名（长沙）。
- `SKLSM` 缩写未给出全称。

## 1.10 摘要长度超 PRL 硬性限制近一倍

实测 **1139 字符 / 167 词**。PRL 规定摘要 **不超过 600 字符**。此为投稿格式硬性违规，**必须压缩至约一半**。

同时，本文设有 `Keywords` 一节 —— **PRL 不使用关键词**，应删除。

---

# 二级：明显不规范（强烈建议修改）

## 2.1 中式英语句式（非母语痕迹明显）

| 原文 | 问题 | 建议 |
|---|---|---|
| "upon the **injection of** linear polarized wave" | `injection` 用于光入射系直译"注入" | `under illumination by a linearly polarized plane wave` |
| "can **bring enormous polarization effect to** the scattering" | `bring…to` 搭配不成立 | `can strongly affect the polarization of the scattering` |
| "**Through constructing** the microscopic model" | 介词误用 | `By constructing` |
| "makes the scattering **as** the superposition of…" | `make…as` 不成立 | `renders the scattering a superposition of…` |
| "spatially inhomogeneous medium **with the feature size of subwavelength**" | 语序直译 | `with subwavelength feature sizes` |
| "**From the perspective of averaging time**, the influence of τ¹ vanishes" | 直译"从时间平均的角度" | `On time average, τ¹ vanishes` |
| "the time-averaged conversion **keeps unchanged**" | `keep` 误作系动词 | `remains unchanged` |
| "the retardation effect always **makes** twisted currents" | `make` 泛用 | `induces` / `produces` |
| "P **operates like** a circular dipole" | 搭配生硬 | `acts as` |
| "the **light-focused point**" | 语序 | `the focal point` |
| "which makes analysis of the SOI effect **subtle**" | `subtle`＝细微，非"困难" | `challenging` / `nontrivial` |
| "the SOI is **not yet involved in** Mie scattering **to date**" | `involved in` 误用 + `not yet`/`to date` 语义重复 | `SOI has not been considered in the context of Mie scattering` |
| "This supports **creative** future applications" | `creative` 修饰 applications 不当 | `enables emerging applications` |
| "pushes the NS **going forwards**" | 冗余 | `pushes the NS forward` |
| "**still remains** in z-direction" | 语义重复 | `remains` |
| "the **origination** of four-leaf pattern" (2 处) | 应为名词 `origin` | `the origin of the four-leaf pattern` |

## 2.2 冠词系统性缺失（全文数十处）

`inside NS`, `on NS`, `near NP`, `outside NS`, `from NP`, `in Mie region`, `in object`, `Putting NS on metal film`, `the intensity of magnetic dipole`…

英语中可数单数名词前必须有限定词。**建议全文统一为** `inside the NS`, `near the NP`, `in the Mie region`, `Putting the NS on a metal film` 等。这是全文出现频率最高的单一问题。

## 2.3 过度断言与情绪化措辞（booster 堆叠）

学术写作忌用主观强化词。本文密集出现：

- **规模类**：`giant`（3×）、`enormous`、`universal`、`ubiquitous`、`widespread`、`striking`、`drastic`
- **确定性类**：`strictly explain`、`unambiguously reveal`、`unambiguously demonstrate`、`rigorously describe`、`obviously`（3×）、`always`
- **口语化实证主张**：`visible to naked eyes`（摘要）、`directly seen by eyes`（引言）、`easily detected even with eyes`（实验段）—— **同一主张以口语方式重复 3 次**，且 `naked eyes` 应为 `the naked eye`

**建议**：
- `Obviously, …` 全部删除或改为 `Note that…`；
- `strictly explain` → `rigorously describe`（`strictly` 系"严格"的误译）；
- "visible to naked eyes" 类表述保留 **1 处**并改写为 `the effect is large enough to be observed directly with a conventional imaging system`；
- `Thus, the observed SOI in Mie scattering is a new effect.` 断言过强 → `Thus, the SOI reported here is distinct from previously described mechanisms.`

## 2.4 拟人化表述

> "LCP and RCP **prefer to** scatter to the spaces of x·y>0…"
> "a circular dipole that **prefers to** emit LCP light…"

光不会"偏好"。**建议**：`is predominantly scattered into` / `preferentially emits`（作副词可接受，作动词 `prefer` 不宜）。

## 2.5 核心术语前后不一致

| 概念 | 文中出现的多种写法 | 建议统一 |
|---|---|---|
| 核心现象名 | 标题 `Universal` / 摘要 `widespread` / 引言 `ubiquitous` | 统一为 `universal` |
| 散射花样 | `four-piece`（4×） vs `four-leaf`（4×） | 择一，建议 `four-lobed` |
| 效应名 | 全文 `SOI` vs 关键词与 Fig.5 图注 `photonic SHE` | 统一；若用 SHE 须在正文定义 |
| 角动量复数 | 摘要 `angular momentums` vs 正文 `angular momenta` | 统一为 `momenta`（`momentums` 不规范） |
| 轨道动量 | `orbit momentum` vs `orbital momentum` | 统一为 `orbital` |
| 力/力矩符号 | `f²_orb` vs `f³_orbit` | 统一下标 |
| 关键词内部 | `Spin Orbital Interaction`（与标题 `Spin-Orbit` 不一致）、`Nano Particles` | `Spin-Orbit Interaction`、`Nanoparticles` |

## 2.6 缩写使用不规范

- **NS 先用后定义**：`the gold NS of 80 nm` 出现在同句稍后的 `nano-sphere (NS)` 定义**之前**。
- **NP 从未定义**：全文多处使用 `NP`，与 `NS` 混用且含义不清。
- **IF / GH / SHE / T-spin / SKLSM 均未给出全称**（Imbert–Fedorov / Goos–Hänchen / spin Hall effect / transverse spin）。
- **SOI 重复定义**：引言首句已定义，正文第 2 段再次写 `spin-orbit interaction (SOI)`。
- 缩写密度过高：`NS, NP, NSoG, NSoM, SAM, OAM, LCP, RCP, SOI, IF, GH, DF, QWP, BS, P` —— 建议精简。

## 2.7 文献指代方式不规范

> "**Deng Pan** et al. report…"、"**D. Haefner** et al. demonstrate…"、"**O. Rodrıguez-Herrera** et al. show…"

正文引用应**只用姓氏**：`Pan et al.`、`Haefner et al.`、`Rodríguez-Herrera et al.`。
其中 `Rodrıguez`（无点 ı）为排版错误，与文献 [6] 的 `Rodríguez` 不一致。

## 2.8 图注中"力矩/力"与单位不符

- Fig. 2 图注："Maximum **torque** is ~3.6×10⁻¹² **N m⁻²**" —— N·m⁻² 是**力矩密度**（每单位体积），力矩单位应为 N·m。→ 应写 `torque density`。
- Fig. 3 图注："Maximum **force** is ~6.8×10⁻⁵ **N m⁻³**" —— 同理，应为 `force density`。
- Fig. 2c 的 SAM 密度为 `kg m⁻¹ s⁻¹`（角动量密度，正确），而 Fig. 3c 的 "orbital **momenta**" 为 `kg m⁻² s⁻¹`（**线**动量密度）。二者不可能同为角动量密度，**命名与量纲需自洽**。

## 2.9 时态使用混乱

同一篇内混用：`we report` / `we construct` / `we strictly explain`（现在时）、`we have verified`（现在完成）、`has been greatly enhanced`（被动完成）。
**建议**：描述本文工作统一用现在时（`we show`, `we construct`），描述实验操作用过去时（`patterns were recorded`），描述他人已有工作用现在时。

## 2.10 非正式表达

- **缩写形式** `doesn't`（学术写作应写 `does not`）。
- **句首连词**：`But the SOI is not yet…`、`And control simulations using…`、`And the detailed derivation…`。
- **`etc.` 与 `including` 并用**：`including nanophotonic devices, plasmonic circuits, directional chiral emission, **etc.**` —— `including` 已含"非穷举"义，`etc.` 冗余且不正式，应删。
- **`in fact` / `very`**：`The interaction between light and NSs is **in fact very** complex.` → `The light–NS interaction is complex.`

## 2.11 潜在利益冲突声明不一致

> Notes: "The authors declare no competing financial interest."
> Acknowledgment: "…financial support from **Cambridge Display Technology Ltd.**"

接受商业实体资助的同时声明"无竞争性经济利益"，需说明或调整措辞。另 `interest` 应为 `interests`。

---

# 三级：轻度瑕疵（建议统一润色）

## 3.1 副词 -ly 后误加连字符（10 处）

英语规则：**-ly 副词修饰形容词时不加连字符**。

`linearly-polarized`(3×)、`previously-reported`(2×)、`highly-symmetrical`、`extremely-small`、`circularly-polarized`、`carefully-calibrated`、`specifically-designed`

→ 全部去掉连字符：`linearly polarized`、`previously reported`…

## 3.2 nano- 前缀连字符不统一

`nano-sphere` vs `nanosphere`；`nano-photonics` vs `nanophotonics`；`nano-rod`；关键词 `Nano Particles`（分写）vs 正文 `nanoparticle`。

→ 统一为**不加连字符**：`nanosphere`, `nanorod`, `nanophotonics`, `nanoparticle`。

## 3.3 坐标轴与数学记号

- `along the **Z-** direction`、`in **z-** direction` —— 连字符后带空格，格式破损 → `along the z direction`。
- 轴名大小写不一致：`Z-` vs `z axis` vs `x z plane` vs `xy plane` → 统一小写斜体，`xz plane`。
- `x ∙ y > 0` 用点乘号表示坐标乘积 → 直接写 `xy > 0`。
- `Δ_conversion` 与 `∆_conversion` 使用了两个不同的 Delta 字符 → 统一。
- `τ spin`（带空格）vs `τspin` → 统一下标排版。
- `f¹_orbit = 2∂t[P·(∇)A]` 与上式 `½{2∂t[…]}` 相比疑似漏掉 ½ 系数，请核对。

## 3.4 数值与单位排版

- 乘号用 `*`：`~3.6*10⁻¹²`、`~5*10⁻³³` → 应用 `×`。
- 上标不统一：`10−12`（真上标）与 `Nm-2`（连字符，非上标）混排 → 统一为 `N m⁻²`。
- 数字与单位间缺空格：`1Vm-1` → `1 V m⁻¹`。
- `±` 前后空格不一致：`20° ± 2°`（有空格）vs `600±10 nm`（无空格）→ 统一。
- `20° ± 2°` 未说明 ±2° 的含义（拟合误差？标准差？）→ 建议在图注或正文注明。

## 3.5 图表引用格式不统一

- `Figure 1(a)` vs `Fig. 1(b-c)` → PRL 统一用 `Fig. 1(a)`。
- `(Figs. S12 and Movie S1)` —— 单个图用了复数 `Figs.` → `(Fig. S12 and Movie S1)`。
- `(S12 and Movie S1)` —— 完全缺少 `Fig.` 前缀。
- `(Figs. S1-2,4)` —— 逗号后缺空格。

## 3.6 参考文献体例混乱

**同一刊名三种写法**：
- `Physical Review Letters` [1] / `Physical review letters` [2,30] / `Phys Rev Lett` [19]
- `Nature Photonics` [14,23,39] / `Nature photonics` [40]
- `Nature Communications` [11] / `Nature communications` [42]
- `Science Advances` [38] / `Science advances` [41]

**其他问题**：
| 问题 | 位置 |
|---|---|
| 作者名拼写错误 `M. **Padge**` → `M. J. Padgett` | [40] |
| 缺变音符 `M. **Kall**` → `M. Käll` | [11] |
| 同一作者两种转写 `Zel'dovich` [3] vs `Zeldovich` [17] | [3][17] |
| 同一作者变音符不一致 `Rodríguez` [6] vs `Rodriguez` [24] | [6][24] |
| 多余字段 `Nature Communications 2, **5**, 387 (2011)`、`Physical Review A 103, **8**, 013520 (2021)` | [11][18] |
| 页码疑似有误 `Physical Review A 82, **19438** (2010)`（PRA 无此页码） | [16] |
| 页码格式不一 `328-330`（范围）vs 其余均为首页 | 悬挂条目 |
| `et al.` 使用不一致（[38][41] 用，其余列全部作者） | [38][41] |
| 全部条目缺 DOI | 全部 |

**标题**：`Reference` → `References`。

## 3.7 其他体例问题

- `# These authors **contribute** equally.` → `contributed equally`（惯用过去时）。
- `ACKNOWLEDGMENT` → `ACKNOWLEDGMENTS`；且与同级标题 `Notes`（首字母大写）大小写风格不一致。
- 单位 2 `NanoPhotonics Centre, Cavendish Laboratory, Department of Physics` —— Cavendish Laboratory 即该校物理系，三者并列冗余。
- 文件名 `Photon Spin-**Obit** Interaction…`（PDF 元数据标题同）拼写错误，且与文内标题 `Universal Spin-Orbit Interactions in Mie Scattering` 不一致。投稿前请统一。
- `S₃ = I_LCP − I_RCP **in this work**` —— 以"本文如此定义"方式引入非标准约定，建议说明与标准 Stokes 约定的关系，或直接采用标准定义。

---

# 处理优先级建议

**投稿前必须完成（一级，约 20 处）**
1. 修正 11 处语法破损 + 结论段残缺句
2. 全文 `polarizability` → `polarization`（最影响专业判断）
3. 修正 2 处图表交叉引用错误（Fig. 2b→5b，Fig. 3a→3c）
4. 修正 `E⊥` 纵向场记号矛盾
5. 摘要压缩至 600 字符内，删除 Keywords 节
6. 删除悬挂参考文献条目，修正 `Cambrige`、`beyonds`
7. 补上推导（移入 SI）或删除"另文报道"表述

**强烈建议完成（二级）**
8. 中式英语句式改写（约 16 处）
9. 全文补齐冠词
10. 削减 booster 与口语化实证主张（"naked eyes" 三处合并为一）
11. 统一核心术语（four-piece/four-leaf、SOI/SHE、momenta 等）
12. 规范缩写定义顺序、文献姓氏引用
13. 图注 torque/force → torque density/force density，核对 Fig. 3c 量纲

**润色阶段（三级）**
14. -ly 连字符、nano- 前缀、坐标轴记号
15. 乘号与单位排版
16. 参考文献体例全面统一 + 补 DOI

---

**总体评价**：物理内容与图表组织具备 PRL 投稿的完整度，但**语言质量距离期刊标准有明显差距**。一级问题中的语法破损（尤其结论段残缺句）与 `polarizability/polarization` 术语误用，会直接影响审稿人对稿件严谨性的判断；摘要超限与 Keywords 节则可能在技术审查阶段即被退回。**建议在投稿前进行一次系统性的母语润色（native-speaker editing），而非仅做局部修补。**
