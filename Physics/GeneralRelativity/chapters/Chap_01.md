# 微分几何初步

## 基本概念

### 基本拓扑知识

<blockquote>

==$n$维线性空间(linear space of $n$ dimension)== 最多可有$n$个元素线性无关的集合, 对加法和数乘保持封闭. 定义有加法的交换律、数乘的结合律和分配律. 含有加法和数乘的恒元.

==度量空间(metric space)== 对于一个抽象空间$\mathcal{S}=\{a,b,\cdots\}$, 对其中任意两点$a,b$, 若能建立一个实函数$\rho$满足:

1. 正定性: $\rho(a,b)\geq0\quad\text{iff.}\quad a=b,\,\rho(a,b)=0$.
2. 对称性: $\rho(a,b)=\rho(b,a)$.
3. 三角恒等式: $\rho(a,c)+\rho(b,c)\geq\rho(a,b),\,\forall c\in\mathcal{S}$.

则称$(\mathcal{S},\rho)$为度量空间.

==度量空间一点的邻域(neighbourhood)== 直接定义为$(\mathcal{S},\rho)$上一点的开球(open ball):
$$B_{\varepsilon}(a)=\{b\in\mathcal{S}:\rho(a,b)<\varepsilon,\,\varepsilon>0\}.$$

==度量空间的开集(open set)== 取$\mathcal{U}\subset\mathcal{S}$, 定义其开集$\dot{\mathcal{U}}=\{a\in\mathcal{U}:\exists\varepsilon>0\ \text{s.t.}\ B_{\varepsilon}(a)\subset\mathcal{U}\}$.

==度量空间的边缘(boundary)== $\partial\mathcal{U}=\{b\not\in\dot{\mathcal{U}}:\forall\varepsilon>0,\,B_{\varepsilon}(b)\cap\dot{\mathcal{U}}\neq\varnothing\}$.

==度量空间的闭集(closed set)== $\bar{\mathcal{U}}=\dot{\mathcal{U}}\cup\partial\mathcal{U}$.

==度量空间的通常拓扑(usual topology)== $\tau=\{\dot{\mathcal{U}}\mid\mathcal{U}\subset\mathcal{S}\}$. 通常拓扑$\tau$满足三个性质:

1. 对任意并封闭: $\bigcup\limits_{\alpha\in I}\dot{\mathcal{U}}_{\alpha}\in\tau$, $I$是任意用于标号的指标集合.
2. 对有限步交封闭: $\bigcap\limits_{i=1}^{n}\dot{\mathcal{U}}_{i}\in\tau$.
3. $\varnothing,\mathcal{S}\in\tau$. 因为空真成立(vacuously true), 所以空集是开集; 因为开球在定义中明确是$\mathcal{S}$的子集, 所以$\mathcal{S}$是开集($\dot{\mathcal{S}}=\mathcal{S}$).

==拓扑空间(topological space)== 对于集合$\mathcal{S}=\{a,b,\cdots\}$若能选出满足三个性质的子集族(collection of subset)$\tau$:

1. $\varnothing,\mathcal{S}\in\tau$.
2. $\bigcup\limits_{\alpha\in I}\mathcal{U}_{\alpha}\in\tau,\,\forall\mathcal{U}_{\alpha}\in\tau$.
3. $\bigcap\limits_{i=1}^{n}\mathcal{U}_{i}\in\tau,\,\forall\mathcal{U}_{i}\in\tau$.

那么将$\tau$称为拓扑(topology), 其元素称为开集, $(\mathcal{S},\tau)$称为拓扑空间. $\tau=\{\varnothing,\mathcal{S}\}$时称为平庸拓扑(trivial topology).

==连续映射(continuous mapping)== 在两个拓扑空间$(\mathcal{X},\tau_{\mathcal{X}})$和$(\mathcal{Y},\tau_{\mathcal{Y}})$之间若存在映射$f:\mathcal{X}\to\mathcal{Y}$满足
$$f^{-1}[\mathcal{V}]=\{\mathcal{U}\in\mathcal{X}:f(\mathcal{U})=\mathcal{V}\}\in\tau_{\mathcal{X}},\,\forall\mathcal{V}\in\tau_{\mathcal{Y}},$$
则称$f$为连续映射.

==邻域== 对于$\mathcal{S}$其中一点$a$, 若其属于某个开集$\mathcal{A}$, 而若对于$\mathcal{S}$的子集$\mathcal{N}$, 只要其包括$\mathcal{A}$便可称为$a$的邻域.

==闭集族== 引入补集运算后, 可定义闭集族$\sigma=\{\mathcal{S}\setminus\mathcal{U}\mid\mathcal{U}\in\tau\}$, 其元素称为闭集.

==闭包(closure)== 定义集合$\mathcal{U}$的闭包$\bar{\mathcal{U}}=\bigcap\limits_{\mathcal{C}_{\alpha}\in\sigma}\mathcal{C}_{\alpha},\,\forall\mathcal{C}_{\alpha}\supset\mathcal{U}$.

==内部(interior)== 定义集合$\mathcal{U}$的内部$\dot{\mathcal{{U}}}=\bigcup\limits_{\mathcal{O}_{\alpha}\in\tau}\mathcal{O}_{\alpha},\,\forall\mathcal{O}_{\alpha}\subset\bar{\mathcal{U}}$.

</blockquote>

<blockquote type="sidenote">

[评论] (1)从度量空间的通常拓扑出发, 摘取其性质定义了抽象空间的拓扑, 目的是为在抽象空间上, 不依赖于$\varepsilon-\delta$语言定义连续性建立基础. (2)注意将闭集族与$\sigma$-代数区分开.
</blockquote>

### 流形及其拓扑结构

<blockquote>

==流形(manifold)== $n$维流形$\mathcal{M}$是这样一个*Hausdorff*空间, 其每一点处都能找到一个含有该点的开集, 使得此开集与$\mathbb{R}^{n}$同胚.
</blockquote>

<blockquote>

==同胚映射(homeomorphic mapping)==

==拓扑性质==

<blockquote type="sidenote">

<mark type="thm">紧致性(compact)</mark>

==开覆盖==
</blockquote>

<blockquote type="sidenote">

<mark type="thm">连通性(connectedness)</mark>
</blockquote>

<blockquote type="sidenote">

<mark type="thm">可分性(separation)</mark>
</blockquote>

</blockquote>

### 张量代数

<blockquote>

==矢量== 矢量空间(线性空间)$\mathcal{V}$的元素. 一个几何对象, 可以被抽象观点和分量观点描述.

==对偶矢量/1-形式(dual vector/1-form)== 对偶矢量空间$\mathcal{V}^{*}$的元素. 接受一个矢量输出一个标量的线性设备(linear device).

==基和对偶基== 矢量空间的基$\{\bm{e}_{\mu}\}$和对偶空间的对偶基$\{\bm{e}^{\mu}\}$满足$\bm{e}^{\nu}(\bm{e}_{\mu})=\braket{\bm{e}^{\nu},\bm{e}_{\mu}}=\delta^{\nu}_{\mu}$. 根据这一点对偶矢量可被对偶基表示:
$$\bm{u}(\bm{v})=v^{\mu}\braket{\bm{u},\bm{e}_{\mu}}=v^{\mu}u_{\nu}\braket{\bm{e}^{\nu},\bm{e}_{\mu}}=v^{\mu}u_{\mu}\Longrightarrow\bm{u}=\bm{e}^{\mu}\braket{\bm{u},\bm{e}_{\mu}}.$$

==张量(tensor)== 空间$(\mathcal{V}_{1}\times\cdots\times\mathcal{V}_{m})\times(\mathcal{V}^{*}_{1}\times\cdots\times\mathcal{V}^{*}_{n})$的元素. 在抽象观点下, 此$(m,n)$阶张量是一个多线性(multilinear)函数:
$$
\begin{aligned}
&T:(\mathcal{V}^{*}_{1}\times\cdots\times\mathcal{V}^{*}_{m})\times(\mathcal{V}_{1}\times\cdots\times\mathcal{V}_{n})\to\mathbb{F},\\
&T(a\bm{u}_{1}+b\bm{u}_{2},\dots;c\bm{v}_{1}+d\bm{v}_{2},\dots)=acT(\bm{u}_{1},\dots;\bm{v}_{1},\dots)+adT(\bm{u}_{1},\dots;\bm{v}_{2},\dots)\\
  &\quad+bcT(\bm{u}_{2},\dots;\bm{v}_{1},\dots)+bdT(\bm{u}_{2},\dots;\bm{v}_{2},\dots).
\end{aligned}
$$
在分量观点下, 此$(m,n)$阶张量是一个分量遵循特定变换规则的对象
$$
\begin{aligned}
T^{s'_{1}\cdots s'_{m}}_{r'_{1}\cdots r'_{n}}&=T(\bm{e}^{s'_{1}},\dots,\bm{e}^{s'_{m}};\bm{e}_{r'_{1}},\dots,\bm{e}_{r'_{n}})\\
&=T(\Lambda^{s'_{1}}_{s_{1}}\bm{e}^{s_{1}},\dots,\Lambda^{s'_{m}}_{s_{m}}\bm{e}^{s_{m}};\Lambda_{r'_{1}}^{r_{1}}\bm{e}_{r_{1}},\dots,\Lambda_{r'_{n}}^{r_{n}}\bm{e}_{r_{n}})\\
  &=\Lambda^{s'_{1}}_{s_{1}}\cdots\Lambda^{s'_{m}}_{s_{m}}\Lambda_{r'_{1}}^{r_{1}}\cdots\Lambda_{r'_{n}}^{r_{n}}T^{s_{1}\cdots s_{m}}_{r_{1}\cdots r_{n}}.
\end{aligned}
$$

==度规张量(metric tensor)== 一个$(0,2)$阶张量, 定义为
$$g(\bm{v}_{1},\bm{v}_{2})=\bm{v}_{1}\cdot\bm{v}_{2}\Longrightarrow g_{\mu\nu}=\bm{e}_{\mu}\cdot\bm{e}_{\nu}.$$
其逆是一个$(2,0)$阶张量, 定义为
$$g^{-1}(\bm{u}_{1},\bm{u}_{2})=\bm{u}_{1}\cdot\bm{u}_{2}\Longrightarrow g^{\mu\nu}=\bm{e}^{\mu}\cdot\bm{e}^{\nu}.$$
度规张量重要的功能是将矢量转化为对偶矢量
$$\tilde{\bm{v}}=g(\bm{v},\cdot)=g_{\mu\nu}v^{\mu}\bm{e}^{\nu},\quad\tilde{\bm{u}}=g^{-1}(\bm{u},\cdot)=g^{\mu\nu}u_{\mu}\bm{e}_{\nu}.$$
且有分量关系
$$\bm{v}=\tilde{\tilde{\bm{v}}}=g_{\mu\nu}v^{\mu}\tilde{\bm{e}}^{\nu}=g_{\mu\nu}g^{\nu\sigma}u_{\mu}\bm{e}_{\sigma}\Longrightarrow g_{\mu\nu}g^{\nu\sigma}=\delta_{\mu}^{\sigma}.$$

</blockquote>

### 微分流形及其微分结构(流形上的张量场)

<blockquote>

==微分流形(differential manifold)== $\bigsqcup$

==切空间(tangent space)==

==切丛(tangent bundle)==

==坐标基(coordinate basis)==

==余切空间(cotangent space)==

==余切丛(cotangent bundle)==
</blockquote>
