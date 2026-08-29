# 审稿回复信（Response Letter）表述规范审查意见

**审查对象**：`Response Letter_PRL_15th Aug.pdf`（7 页，3 位审稿人共 10 条意见）
**审查日期**：2026-08-24
**审查范围**：回复信的**体裁规范、答复策略与语言表述**。
**配套文件**：正文审查见 `comment.md`；本文件只标注回复信**特有**或**加重**的问题。

> 说明：PDF 连字（ti/ff/fi/fl/tt）提取时被拆出，引文已还原；所有条目均在原文中定位核实。

---

## 分级标准

| 级别 | 含义 | 后果 |
|---|---|---|
| **一级** | 严重违规：答复实质缺失、自相矛盾、编辑残留、体裁要件缺失 | 编辑可直接判定"未认真回应"，**必须重写** |
| **二级** | 明显不规范：语气对抗、过度宣传、术语误用、语法错误 | 显著损害专业印象，**强烈建议修改** |
| **三级** | 轻度瑕疵：格式、大小写、图号、排版 | 润色层面，**建议统一** |

---

# 一级：严重不规范（必须修改）

## 1.1 三处"已全部改正"式空洞答复 —— 回复信最致命的问题

审稿人提出**具体、可核查**的技术问题，回复却完全不落地：

| 位置 | 审稿人提出的具体问题 | 作者答复全文 |
|---|---|---|
| **Referee 1, Q3** | ① Fig. 1b 中 S₃ 量级为 10⁻¹⁶，疑似未用 S₀ 归一化；② S₃ 定义多了因子 2，导致理想 LCP/RCP 应为 ±2，但 Fig. 4b 色标却是 −1~1，**具有误导性**；③ "green channel" 正文写 480–600 nm，Fig. 4 图注写 500–550 nm，**自相矛盾** | "Thanks for these comments. We have rewritten the whole manuscript, and corrected all of the mentioned issues."（**1 句，19 词**） |
| **Referee 2, Q3** | 4 条具体问题（Fig. 1b 标注 "20°±1° deg" 冗余且疑似应为 ±2°；"wavevector matching condition is not satisfied" 缺乏语境；"sporadically" 用词不精确；"cannot account for..." 未说明差异何在） | "Thanks for these comments. We have rewritten the whole manuscript, including all of the issues mentioned above."（**1 句**） |
| **Referee 2, Q2** | 指出三处论证缺陷，其中"These features explain the origin of the photonic SHE"是**循环论证** | "We have revised the whole manuscript strictly, and corrected all descriptions of less rigorous."（**1 句**，且语法不成立） |

**问题性质**：审稿人提出的是**逐条可验证的错误**（数值、定义、波段冲突），要求逐条说明"改成了什么、在哪里"。"整篇重写了、都改了"是回复信中最忌讳的答复方式 —— 审稿人无法核对，编辑会认定作者未认真对待。

**必须改为逐条格式**，例如：

> **(a)** The referee is correct. In the original Fig. 1b, S₃ was plotted without normalization. In the revised manuscript we now plot S₃/S₀, with values in [−1, 1] (revised Fig. 1(b), p. 2).
> **(b)** We have corrected the definition to the conventional S₃ = (I_LCP − I_RCP)/S₀, removing the spurious factor of two. The color bars in all figures are now consistent with this definition (Figs. 1, 4, 5).
> **(c)** The green channel is 480–600 nm throughout; the "500–550 nm" in the old Fig. 4 caption was a typographical error, now corrected (revised Fig. 5 caption, p. 6).

## 1.2 约 400 词整段逐字重复（Referee 1 Q1 ↔ Referee 2 Q1）

经比对，两处回复（含"Thanks…universal effect…"引言段、七个应用领域罗列、以及 Pan / Haefner / Rodríguez-Herrera 三个对比例子）**逐字相同**，仅首句由 "Thanks for this **constructive** comment" 改为 "Thanks for this comment. **As discussed above,**"。

**问题**：整段复制粘贴使回复篇幅虚增、显得敷衍，且两位审稿人的关切点其实**不同**（Referee 1 问"如何与 [19] 区分"，Referee 2 额外质疑"缺乏深层机理解释"）—— 后者的独有关切被复制的文字淹没，**实际未被回应**。

**建议**：Referee 2 处改为 `We have addressed the question of novelty in detail in our response to Referee 1, Comment 1; here we focus on the referee's additional concern regarding mechanistic depth.` 然后**只写针对"缺乏深层机理"的新内容**。

## 1.3 审稿人的直接提问未作答

**Referee 1, Q1b 结尾明确发问**：

> "However, the current work also utilizes a relatively large NA objective (0.8), which is difficult to consider as paraxial. **Do the authors claim to observe photonic SHE even with parallel light incidence?**"

这是一个**需要正面回答的是/否问题**，并附带对"你们用非傍轴条件区分自己工作，但自己也用了 NA=0.8"的**逻辑反驳**。作者的回复通篇讨论 Mie 散射的普适性，**从头到尾没有出现 "NA"、"paraxial"、"parallel light" 任何一词**，等于回避了审稿人的核心质疑。

**必须补充**：明确回答（模拟用平面波；实验用暗场高角度照明，NA 只影响收集，不影响效应存在；并说明为何 NA 不构成与前人工作的混淆）。

## 1.4 实质性数值自相矛盾：相位差 90° vs 45°

同一结论、引用**同一组图（Figs. S18-19）**，两处给出不同数值：

| 位置 | 表述 |
|---|---|
| Referee 2, Q2 | "an equal dipolar moment with a **phase difference of ±π/2**（= 90°）is preferred to generate large angular shift **(Figs. S18-19)**" |
| Referee 3, Q3 | "an equal intensity and a **phase difference of 45 deg** between the electric (pₓ) and magnetic dipoles (m_y/c) will generate a maximum angular shift of 90 deg **(see Figs. S18-19 for details)**" |

审稿人交叉阅读必然发现。**必须核对 SI 后统一**（同时统一使用 `π/2` 或 `90°`，勿混用弧度与角度）。

## 1.5 未替换的文献占位符 `[**]`（2 处）

> "…for example, putting the NP on a substrate or gold nanowire, where a directional transmission can be observed **[**]**."

出现在 Referee 1 Q1 与 Referee 2 Q1 两处（因整段复制而重复）。未填充的引用占位符是**未校对的直接证据**，在回复信中尤其刺眼。

## 1.6 其他编辑残留

- **孤立字母**：Referee 2 Q1 中 "O. Rodrıguez-Herrera et al. **c** demonstrate that…" —— 多出一个无意义的 `c`。
- **重复动词**：Referee 3 Q4 中 "the observed SOI effect **is is** one fundamental properties" —— `is is` 重复，且 `one` 与 `properties` 单复数冲突。

## 1.7 回复信体裁要件全部缺失

| 标准要件 | 本文档 |
|---|---|
| 致编辑称谓（`Dear Dr. ___,` / `Dear Editor,`） | **无**，直接以 "Response to reviewers:" 开始 |
| 稿件编号与标题 | **无** |
| 结尾致谢与敬辞（`We thank the referees… Sincerely,`） | **无**，在 Referee 3 Q5 答复后戛然而止 |
| 署名与日期 | **无** |
| 变更清单（list of changes） | **无** —— 但开篇明确承诺 "…and **lists of changes** are now provided" |
| 修改稿页码/行号定位 | **全篇零处** |
| 引用修改后原文（"The revised text now reads: …"） | **全篇零处** |

其中**"承诺提供变更清单但通篇没有"**与**"零处页码行号定位"**是两项硬伤：审稿人无法定位任何一处修改。

## 1.8 主动承认核心工作未完成

两处向审稿人明示稿件不完整：

> "From this theoretical framework, we can get the relationship between the far-field Stokes parameters and the near-field K-space spectrum. **This is valuable and under analysis now.**"
> "…and **will introduce the model based on the TM surface wave and the momentum matching to the next work.**"

Referee 2 Q2 明确指出作者对 PSHE 起源的解释是**循环论证**，并给出了正确方向（TM 表面波手性 + 动量匹配）。作者答复"这个方向很有价值，正在分析中，留给下一篇文章"—— 等于承认**审稿人指出的核心缺陷未被修复**。这在回复信中足以导致拒稿。

**建议**：或在本稿中补上该分析（哪怕作为 SI 的定性论证），或明确论证"现有连续性方程模型已足以解释观测，TM 表面波视角是等价的另一种描述"，而非推给未来工作。

## 1.9 承诺的修改与稿件实际不符

- Referee 3 Q1 答复："**we remove this term**（IF）, and employ a more appropriate description (SOI effect) in the update manuscript."
  → 但正文中仍保留 "the angular **IF** shift spectra"，结论段仍有 "including the typical **IF** and GH effects"。**承诺删除但未删净**，审稿人核对即发现。
- Referee 3 Q3 答复称 Fig. 1b-c 波长为 "200 nm and **800 nm**"
  → 但正文 Fig. 1 图注写的是 "200 nm (b) and **865 nm** (c)"。**回复信与稿件数值不一致**。

## 1.10 `beyonds` 拼写错误（2 处，因整段复制）

> "…astronomy, materials characterization, **and beyonds**."

与正文同一错误。`beyond` 无复数形式。

---

# 二级：明显不规范（强烈建议修改）

## 2.1 开篇缺乏致谢、直接自我辩护

> "We would like to **explicitly point out** that this is the **first** work to report the universal SOI effect… The reported phenomenon and established model **own broad influences** in optics."

**问题**：回复信开篇的规范做法是先感谢编辑与审稿人的时间与建议，再简述修改要点。本文开篇即以 `explicitly point out`（带质问意味）强调己方首创性，姿态失当；`own broad influences` 语法与用词双错。

**建议改写**：
> We thank the Editor and all three referees for their careful reading and constructive criticism. Guided by their comments, we have substantially revised the manuscript: the scope is now framed around Mie scattering, the theoretical model has been extended to include the OAM continuity equation and a multipole decomposition, and all technical inconsistencies noted by the referees have been corrected. A point-by-point response follows.

## 2.2 对审稿人使用 "Obviously"（2 处）

> "**Obviously**, this model can apply to all of the SOI phenomenon within the framework of Maxwell's theory, and greatly promote **people's** understanding of SOI effects."

对提出质疑的审稿人说"显然"，隐含"这还用说吗"，是回复信中明确应避免的措辞。`people's understanding` 过于口语化，且这是极高的自我评价。

**建议**：`This model applies broadly to SOI phenomena within Maxwell's framework, and we believe it offers a unified microscopic picture of such effects.`

## 2.3 对抗性语气与语义重复

> "**In sharp contrast**, the prior works, **however**, **can't** be summarized as one universal property of Mie scattering."

`In sharp contrast` + `however` 语义重复；`sharp` 带对抗色彩；`can't` 为口语缩写。
→ `In contrast, the effects reported previously are not general properties of Mie scattering.`

## 2.4 过度宣传与无支撑罗列

- **七领域罗列无任何依据**（且因复制出现 2 次）："will also find broad applications in diverse fields, including **atmospheric science, remote sensing, biomedical optics, nanophotonics, environmental monitoring, astronomy, materials characterization**, and beyonds."
  → 建议收缩为 1–2 个能实际支撑的方向。
- **"for the first time"**（2 次）、**"is new"**（多次）、**"greatly promote people's understanding"**、**"own broad influences"** —— booster 密度过高。Referee 1 和 Referee 2 的**首要质疑正是新颖性**，用更多形容词回应新颖性质疑只会加深负面印象；应代之以**可核查的技术差异**。

## 2.5 "偶然发明"表述失当

> "In fact, this is an **accident invention** in one experiment to measure the LCP and RCP scattering patterns from chiral NPs."

- `accident invention` 语法错误且用词错误 → `accidental discovery`（`invention` 指发明创造，不适用）。
- 更重要的是：在审稿人质疑新颖性与机理深度的语境下，主动强调"这是偶然发现的"对稿件评价不利。坦诚可取，但应改为强调**系统性验证**：
  → `The effect was first noticed during measurements of LCP/RCP scattering from chiral nanoparticles, where the S₃ pattern proved almost independent of particle chirality. This prompted a systematic study across particle morphologies (spheres, ultra-spherical particles, nanocubes, and nanodecahedra), which established the effect as general.`

## 2.6 `polarity` 误用（8 处）—— 比正文更严重的术语混乱

回复信中用 **`polarity`（极性，指正负号）** 指代**极化强度 P**：

> "TM surface wave that drives the **polarity** to rotate elliptically"
> "we simplify the complex **polarity** distribution in NP"
> "the elliptically-rotated **polarities** induced on different locations of NP"
> "the **polarity** retardation effect"

叠加正文的 `polarizability` 误用，同一物理量在两份文件中出现了 **`polarizability` / `polarity` / `polarization` 三种叫法**。审稿人会认为作者对基本概念把握不清。

**必须全部改为 `polarization`。**

## 2.7 `own` 误用为"具有"（5 处）

| 原文 | 建议 |
|---|---|
| "the established model **own** broad influences" | `has a broad impact` |
| "which is universal and **own** important influence in Mie region"（2 处） | `and has an important influence in the Mie regime` |
| "different chiral NPs **own** similar S₃ pattern" | `exhibit similar S₃ patterns` |
| "and **owns** a wave-vector k" | `and carries a wave vector k` |

（除用词错误外，`own` 前 3 例还存在主谓不一致。）

## 2.8 主谓一致与单复数错误（12 处以上）

| 原文 | 问题 |
|---|---|
| "we have **construct** one complete model" | 缺 `-ed` |
| "the observed SOI effect **is one fundamental properties**"（2 处） | `one` + 复数 `properties` |
| "the excited magnetic dipole**s** … **is** key" | 主谓不一致 |
| "all of the SOI **phenomenon**"（2 处）、"all of the polarization **phenomenon**"（2 处） | 应为 `phenomena` |
| "the scattering pattern**s** … **is** symmetrical" | 主谓不一致 |
| "the metal film … greatly **suppress**" | 应为 `suppresses` |
| "the tiny symmetry broken in NPs **bring** phase difference" | 应为 `brings`；`symmetry broken` 应为 `symmetry breaking` |
| "also **demonstrate** that almost all…" | 应为 `demonstrates` |
| "the previously-reported polarization scattering usually **require**" | 应为 `requires` |
| "the scattering pattern **change** with the refractive index" | 应为 `changes` |
| "the previous demonstration of photonic SHE **require**"（审稿人转述段） | 应为 `requires` |

## 2.9 介词误用

- `different **with**` → `different **from**`（2 处："inherently different with the SOI effect"）
- `The key difference **with** prior works` → `The key difference **from** prior works`（2 处）
- `independent **on** the chirality` → `independent **of** the chirality`
- `the distance **with** NP` → `the distance **from** the NP`

## 2.10 中式英语句式

| 原文 | 建议 |
|---|---|
| "through **strictly** deriving the continuity equation" | `by rigorously deriving`（`strictly` 系"严格"误译） |
| "We have revised the whole manuscript **strictly**" | `We have thoroughly revised` |
| "corrected all descriptions **of less rigorous**" | 语法不成立 → `corrected all insufficiently rigorous statements` |
| "the **up-date** manuscript"（3 处） | `the revised manuscript` |
| "**imaging** parts of refractive index" | **`imaginary`** —— 术语拼写错误，物理含义完全不同 |
| "**systematical** investigation" | `systematic` |
| "the **finally formed** polarization emission" | `the resulting polarized emission` |
| "is preferred **to generated** large angular shift" | `to generate` |
| "**In experiment**"（4 处） | `Experimentally,` / `In the experiment,` |
| "can cover **lots of** NPs" | `many NPs`（`lots of` 口语） |
| "the focused point is **very large**" | `the illuminated area is much larger than the particle` |
| "propagate to **a long-distance**" | `propagate over long distances` |
| "**For examples,**"（2 处） | `For example,` |
| "the SOI effect reported in our work **works** under…" | 动词重复 → `occurs under` |
| "to **well control** the focused point size" | `to control the focal spot size precisely` |
| "**greatly promote people's understanding**" | `advance the understanding of` |

## 2.11 口语缩写形式（6 处）

`can't`（4 处）、`doesn't`（2 处）→ 学术回复信应写 `cannot` / `does not`。

## 2.12 `one` 代替 `a`（约 12 处，延续正文问题）

`one microscopic electrodynamic model`、`one important property`、`one complete microscopic electromagnetic dynamics model`、`one fundamental property`、`one kind of scattering phenomenon`、`one building block`、`one basic principle`、`one method`、`one experiment`、`one refers to…the other refers to`

→ 除确需强调"单个"外，一律改为 `a` / `an`。

## 2.13 模型名称前后不一致

同一模型在文中出现三种叫法：
- 开篇：`microscopic **electrodynamic** model`
- 正文回复：`complete microscopic **electromagnetic dynamics** model`（5 处以上）
- 与稿件正文用词（`microscopic electrodynamic model`）也不一致

→ 统一为 `microscopic electrodynamic model`（`electromagnetic dynamics model` 非规范搭配）。

## 2.14 未正面回应"循环论证"指控

Referee 2 Q2 第三条指出 "These features explain the origin of the photonic SHE from a NS" 是**循环论证**（"these features" 是 PSHE 的**结果**而非**原因**）。这是一条**逻辑指控**，回复中既未承认、也未反驳，只以"已整篇修订"带过（见 1.1）。

**建议**：明确承认并说明修订后的因果链条 —— 从入射场 → 空间不均匀极化 → 自旋力矩 → 椭圆旋转极化 → 手性发射，指出修订稿中因果方向已理顺。

---

# 三级：轻度瑕疵（建议统一润色）

## 3.1 文献指代方式

- `Deng Pan et al.` → `Pan et al.`（正文引用只用姓氏；此处为作者自己的表述，非审稿人原话时应改）
- `O. Rodrıguez-Herrera et al.`（2 处）→ `Rodríguez-Herrera et al.`；`Rodrıguez` 中的无点 `ı` 为排版错误
- `D. Haefner et al.` → `Haefner et al.`
- 文献格式不统一：`(PRL 117, 166803, 2016)` 用逗号，`(PRL 102, 123903 (2009))` 用括号嵌套
- `[**]` 占位符（见 1.5）

## 3.2 术语拼写与大小写

| 原文 | 应为 |
|---|---|
| `optical **Skeyrmion**` | `optical skyrmion` |
| `Goos-Hänchen **Shi**(ft)` 首字母大写，同句 `Imbert-Fedorov shift` 小写 | 统一小写 |
| `k-space` 与 `K-space`（同一段内） | 统一 `k-space` |
| `wave-vector` 与 `wavevector` | 统一 |
| `nano sphere`（分写，2 处）、`nano cubes`、`nano decahedra` | `nanosphere`、`nanocubes`、`nanodecahedra` |
| `four-piece pattern` 与 `four-leaf pattern` | 与正文一并统一 |
| `orbit momentum` 与 `orbital momentum` | 统一 `orbital` |

## 3.3 副词 -ly 后误加连字符（延续正文问题）

`linearly-polarized`（4 处）、`previously-reported`、`specifically-designed`、`rigorously-derived`、`elliptically-rotated`

→ 全部去掉连字符。

## 3.4 数值与角度表述

- `45 deg` / `90 deg` → 用 `45°` / `90°`
- 同一文档内混用 `±π/2`（弧度）与 `deg`（角度）→ 统一
- `λ /3` 中 `λ` 与 `/3` 之间多余空格（2 处）

## 3.5 图号引用格式

- `(Figs. 4c)` —— 单个图用了复数 `Figs.` → `(Fig. 4c)`
- `(Figs. S18-19)` / `(Figs. S5-6)` / `(Figs. S5-7)` 混用，且未说明这些 SI 图是新增还是原有
- `(see Fig. S22 for details)` 在同一段内重复 2 次
- 审稿人意见中提到的图号（旧稿 `Figure 4b`、`Fig. 1b`）与修订稿图号的**对应关系从未说明** —— 建议加一句 "Note: the former Fig. 4 is now Fig. 5 in the revised manuscript."

## 3.6 排版与结构

- **审稿意见与作者答复无视觉区分**，答复仅以 `>` 开头。建议审稿意见用斜体或灰底，答复用正体加粗前缀 **Response:**，或使用不同颜色。
- **列表层级混乱**：审稿人意见编号混用 `a.` / `b.` / `a)` / `b)` / `-`，转录时应统一。
- **三个对比例子无项目符号**（"Deng Pan et al. …"、"D. Haefner et al. …"、"O. Rodrıguez-Herrera et al. …"），缩进不齐，且句末标点混用分号与句号。
- 部分段落缩进不一致（Referee 1 Q1b、Referee 2 Q2 各条）。

---

# 处理优先级建议

**投稿前必须完成（一级）**

1. **重写 Referee 1-Q3、Referee 2-Q2、Referee 2-Q3 三处答复**，逐条说明改动内容与位置 —— 优先级最高
2. **正面回答 Referee 1-Q1b 的 NA / 傍轴质疑**
3. **消除 Referee 2-Q1 的整段复制**，改为交叉引用 + 针对性新内容
4. **核对并统一相位差 45° / 90° 的矛盾**
5. **删除 `[**]` 占位符、孤立的 `c`、`is is`、`beyonds`**
6. **补齐体裁要件**：致编辑称谓、变更清单、页码行号定位、结尾敬辞与署名
7. **处理"留待下一篇"表述**（TM 表面波模型、K-space 分析）—— 补入本稿或改写论证
8. **核对"已删除 IF"的承诺**与正文实际（正文仍有 IF）、波长 800 nm vs 865 nm 的不一致

**强烈建议完成（二级）**

9. 重写开篇为致谢式；删除全部 `Obviously`
10. `polarity` → `polarization`（8 处），与正文的 `polarizability` 一并统一
11. `own`/`owns` 误用（5 处）、主谓一致错误（12 处以上）、介词误用（6 处）
12. 中式英语句式改写（约 16 处），特别是 **`imaging parts` → `imaginary parts`**
13. 削减 booster、收缩七领域罗列；改写"accident invention"
14. 展开对"循环论证"指控的正面回应

**润色阶段（三级）**

15. 文献指代改姓氏、修正 `Rodrıguez`、统一文献格式
16. 术语拼写（`Skeyrmion` → `skyrmion`）、大小写、nano- 前缀
17. 角度单位、-ly 连字符、图号格式
18. 审稿意见/答复的视觉区分与列表层级

---

## 总体评价

回复信在**技术内容上其实有实质进展**（新增 OAM 连续性方程、多极子分解、Figs. S18-19 的相位-角移关系），但**答复策略与表述质量严重拖累了这些进展的呈现**：

- **最致命的是 1.1 与 1.3** —— 审稿人提出的每一条**具体、可核查**的技术错误，都被"整篇重写了"一句带过；而 Referee 1 唯一的直接提问被完全回避。编辑无需评估物理内容，仅凭这两点即可判定"未充分回应"。
- **1.8 的"留待下一篇"**在回复信中等同于承认审稿人指出的核心缺陷未修复。
- **1.2 的 400 词整段复制**与 **1.5 的 `[**]` 占位符**共同表明文档未经通读校对。

**建议**：本回复信不宜局部修补，应按"逐条对应 + 引用修订原文 + 标注页行"的标准格式**整体重构**，并在提交前与修订稿逐条交叉核对（尤其 IF 术语、波长数值、图号对应关系三项已发现不一致）。语言层面建议与正文一并做母语润色。
