# 群的基本概念和群的线性表示理论

## 线性代数回顾

### 线性空间

¶设对于*Hamilton*算符$\hat{H},$ 作用于$m$个线性无关的态${\bm{\psi}_{\mu}},\,\mu=1,\dots,m,$ 得到本征值能量$E,$

$$
\hat{H}{\bm{\psi}_{\mu}}=E{\bm{\psi}_{\mu}},
$$

那么${\bm{\phi}}={\bm{\psi}_{\mu}}a^{\mu}$的线性组合仍是本征态.

$$
{\bm{\psi}_{\mu}}a^{\mu}\in\operatorname{span}\{{\bm{\psi}_{\mu}}\}\equiv\mathcal{L},\,\operatorname{dim}\mathcal{L}=m.
$$

设$\mathcal{L}^{(1)},\mathcal{L}^{(2)}\subset\mathcal{L},$ 当

$$
\mathcal{L}=\mathcal{L}^{(1)}+\mathcal{L}^{(2)},
$$

且三个等价条件(1)$\mathcal{L}^{(1)}\cap\mathcal{L}^{(2)}=\bm{0},$
(2)$\operatorname{dim}\mathcal{L}=\operatorname{dim}\mathcal{L}^{(1)}+\operatorname{dim}\mathcal{L}^{(2)},$ (3)对于${\bm{\phi}}\in\mathcal{L},$ $!\exist{\bm{\phi}^{(1)}}\in\mathcal{L}^{(1)},\,{\bm{\phi}^{(2)}}\in\mathcal{L}^{(2)}\ \text{s.t.}\ {\bm{\phi}}={\bm{\phi}^{(1)}}+{\bm{\phi}^{(2)}}$满足之一, 则称$\mathcal{L}$为$\mathcal{L}^{(1)}$和$\mathcal{L}^{(2)}$的直和, 记$\mathcal{L}=\mathcal{L}^{(1)}\oplus\mathcal{L}^{(2)}.$

### 线性算符

¶线性算符$\hat{T}$描述$\mathcal{L}$上的线性变换, 满足

$$
\hat{T}(c^{(1)}{\bm{\phi}^{(1)}}+c^{(2)}{\bm{\phi}^{(2)}})=c^{(1)}\hat{T}({\bm{\phi}^{(1)}})+c^{(2)}\hat{T}({\bm{\phi}^{(2)}}),
$$

因为这种性质, $\hat{T}$在固定基后可被矩阵表示$[\hat{T}]_{\bm{\psi}}=T^{\mu}_{\nu}.$ 那么$\hat{T}(\bm{\psi}_{\mu}a^{\mu})$在$\bm{\psi}_{\nu}$上的分量

$$
[\hat{T}(\bm{\psi}_{\mu}a^{\mu})]^{\nu}=[\hat{T}(\bm{\psi}_{\mu})a^{\mu}]^{\nu}=[\bm{\psi}_{\nu}T^{\nu}_{\mu}a^{\mu}]^{\nu}=T^{\nu}_{\mu}a^{\mu}.
$$

¶如果算符$\hat{R}$与$\hat{H}$对易, 则

$$
\hat{H}(\hat{R}\bm{\psi}_{\mu})=E\hat{R}\bm{\psi}_{\mu},
$$

即$\hat{R}(\bm{\psi}_{\mu})\in\mathcal{L}.$

### 相似变换(Similarity Transformation)

¶设两个基之间有如下变换关系

$$
e'_{\mu}=\bm{e}_{\nu}S^{\nu}_{\mu},
$$

则同一线性算符$\hat{R}$在不同基下的矩阵表示存在关系

$$
\left\{\begin{aligned}
&\hat{R}(e'_{\mu})=e'_{\nu}R^{\nu}_{\mu}=\bm{e}_{\sigma}S^{\sigma}_{\nu}(R')^{\nu}_{\mu},\\
&\hat{R}(e'_{\mu})=\hat{R}(\bm{e}_{\nu}S^{\nu}_{\mu})=\bm{e}_{\sigma}R^{\sigma}_{\nu}S^{\nu}_{\mu},
\end{aligned}\right.
\Longrightarrow \bm{R}'=\bm{S}^{-1}\bm{R}\bm{S}.
$$

相似变换不改变$\hat{R}$的作用效果

$$
b'^{\mu}=(R')^{\mu}_{\nu}a'^{\nu}=(S^{-1}RS)^{\mu}_{\nu}(S^{-1}a)^{\nu}=(S^{-1})^{\mu}_{\nu}b^{\nu}.
$$

¶称拥有如下性质的空间$\mathcal{K}$为算子$\hat{R}$的不变空间(invariant space)

$$
\hat{R}(\bm{a})\in\mathcal{K},\ \forall \bm{a}\in\mathcal{K}.
$$

设$\mathcal{L}^{(1)}$是$\hat{R}$的不变空间, 而$\mathcal{L}^{(2)}$是其互补子空间, 取
$\bm{e}_{\mu}\in\mathcal{L}^{(1)},\,\mu=1,\dots,n;\ \bm{e}_{\nu}\in\mathcal{L}^{(2)},\,\nu=n+1,\dots,m,$则$\hat{R}$在基下表示为上三角矩阵

$$
\bm{R}=\left(
\begin{matrix}
\bm{R}^{(1)}&\bm{M}\\\bf{0}&\bm{R}^{(2)}.
\end{matrix}
\right)
$$

### 对角化

¶设$\hat{R}$有$m$个本征矢量$\bm{v}^{(i)}$（非简并）构成了$m$个一维的不变子空间, 则在特定基下

$$
\bm{V}\bm{\Lambda}\equiv
(\bm{v}^{(1)}\dots\bm{v}^{(m)})
\left(\begin{matrix}
\lambda^{(1)}\\&\ddots\\&&\lambda^{(m)}
\end{matrix}\right)=\bm{R}(\bm{v}^{(1)}\dots\bm{v}^{(m)}),
$$

则

$$
\bm{R}=\bm{V}\bm{\Lambda}\bm{V}^{-1}.
$$

### 内积

¶内积$\braket{\cdot|\cdot}$满足以下性质（注意物理中更常采用右线性）

$$
\begin{aligned}
&\braket{\bm{\psi}|c^{(1)}\bm{\phi}^{(1)}+c^{(2)}\bm{\phi}^{(2)}}=c^{(1)}\braket{\bm{\psi}|\bm{\phi}^{(1)}}+c^{(2)}\braket{\bm{\psi}|\bm{\phi}^{(2)}},\\
&\braket{\bm{\phi}|\bm{\psi}}=\braket{\bm{\psi}|\bm{\phi}}^{*},\\
&\braket{\bm{\phi}|\bm{\phi}}=|\bm{\phi}|^2\geq0.
\end{aligned}
$$

规定度规

$$
g_{\mu\nu}=\braket{\bm{e}_{\mu}|\bm{e}_{\nu}},
$$

则内积用度规表示

$$
\braket{\bm{\phi}|\bm{\psi}}=(\phi^{\mu})^{*}g_{\mu\nu}\psi^{\nu}.
$$

¶共轭算符$\hat{R}^{\dag}$定义为满足

$$
\braket{\hat{R}\bm{\phi}|\bm{\psi}}=\braket{\bm{\phi}|\hat{R}^{\dag}\bm{\psi}},
$$

在内积的矩阵乘法定义下

$$
\braket{\bm{R}\bm{\phi}|\bm{\psi}}=\bm{\phi}^{\dag}\bm{R}^{\dag}\bm{\psi}=\braket{\bm{\phi}|\bm{R}^{\dag}\bm{\psi}},
$$

此时共轭算符的矩阵表示正是算符矩阵表示的共轭转置.

### 张量积

¶定义张量积

$$
\bm{A}_{m\times n}\otimes\bm{B}_{r\times s}=
\left(\begin{matrix}
a_{11}\bm{B}_{r\times s}&\cdots&a_{1n}\bm{B}_{r\times s}\\
\vdots&&\vdots\\
a_{m1}\bm{B}_{r\times s}&\cdots&a_{mn}\bm{B}_{r\times s}
\end{matrix}\right)_{mr\times ns},
$$

可以证明

$$
\begin{aligned}
&\operatorname{tr}(\bm{A}\otimes\bm{B})=\operatorname{tr}(\bm{A})\operatorname{tr}(\bm{B}),\\
&[(\bm{A}_{1})_{m\times n}\otimes(\bm{B}_{1})_{r\times s}][(\bm{A}_{2})_{n\times m}\otimes(\bm{B}_{2})_{s\times r}]=(\bm{A}_{1}\bm{A}_{2})\otimes(\bm{B}_{1}\bm{B}_{2}),\\
&(\bm{A}\otimes\bm{B})^{-1}=\bm{A}^{-1}\otimes\bm{B}^{-1},\\
&\det(\bm{A}_{n}\bm{B}_{m})=(\det\bm{A})^{n}(\det\bm{B})^{m}.
\end{aligned}
$$

## 群的基本概念

### 群的定义和乘法表

>==群== 称保持系统不变的变换为系统的对称变换, 研究一个系统的对称变换集合$\mathcal{G}$总结出群的概念：
>一个满足以下性质的系统$(\mathcal{G},\cdot),$ 一个配有复合乘法$(\cdot)$的非空集合$\mathcal{G}$
>
>1. 封闭性
>$$rs\in \mathcal{G},\quad\forall r,s\in \mathcal{\mathcal{G}}.$$
>2. 结合律
>$$r(st)=(rs)t,\quad\forall r,s,t\in \mathcal{G}.$$
>3. 存在左乘法元
>$$\exist e'\in \mathcal{G}\ \text{s.t.}\ \forall r\in \mathcal{G},\ e'r=r.$$
>4. 每个元素都存在左逆
>$$\forall r\in \mathcal{G},\ \exist r'\in \mathcal{G}\ \text{s.t.}\ r'r=e'.$$
>定义群元素的个数为群的阶(order), 无限群的阶记为$\infty.$

¶设$r'$的左逆为$r''$则

$$
rr'=(r''r')rr'=r''r'=e',
$$

即左逆与右逆相同. 再设$r$还存在左逆$l$

$$
r'=(lr)r'=l,
$$

即左逆唯一. 且

$$
r=e'r=(rr')r=re',
$$

说明左乘法元就是右乘法元.

>==复元素==将群$\mathcal{G}$的子集视为整体, 称作复元素. 复元素逐元素参与运算（如复合乘法、求逆和共轭运算）.
>
><mark type="thm">重排定理</mark> 设$t\in\mathcal{G},$ 则$t\cdot\mathcal{G}=\mathcal{G}\cdot{t}=\mathcal{G}^{-1}=\mathcal{G}$
>
>[证明] 证明两个集合相等就是证明互为子集. 以$t\cdot\mathcal{G}$为例, 因为
>$$t\cdot\mathcal{G}=\{t\cdot{e},t\cdot{r},t^2,\dots\}\subset\mathcal{G},$$
>又
>$$\mathcal{G}=t^{-1}\cdot(t\cdot\mathcal{G})\subset t\cdot\mathcal{G},$$
>故
>$$t\cdot\mathcal{G}=\mathcal{G}.$$
>如果事先为$\mathcal{G}$的元素标号, 那么$(t\cdot),(\cdot t),(\mathcal{G}^{-1})$这些操作不过改变了标号的顺序, 故称重排定理.

¶对于*有限大*的群, 可以制作群的乘法表以便利查阅. 以$\mathcal{D}_{4}$(Dihedral Group of the Square)为例, 记置换

$$
e=
\left(\begin{matrix}
1&2&3&4\\
1&2&3&4
\end{matrix}\right),
\,r=
\left(\begin{matrix}
1&2&3&4\\
4&1&2&3
\end{matrix}\right),
\,s=
\left(\begin{matrix}
1&2&3&4\\
1&4&3&2
\end{matrix}\right).
$$

<figure class="table-caption th-center td-center">

<div class="dual-header">

| $\mathcal{D}_{4}$ | $e$ | $r$ | $r^2$ | $r^3$ | $s$ | $sr$ | $sr^2$ | $sr^3$ |
| ------ | ----- | ----- | ------- | ------- | ----- | ------ | -------- | -------- |
| $e$ | $e$ | $r$ | $r^2$ | $r^3$ | $s$ | $sr$ | $sr^2$ | $sr^3$ |
| $r$ | $r$ | $r^2$ | $r^3$ | $e$ | $sr^3$ | $s$ | $sr$ | $sr^2$ |
| $r^2$ | $r^2$ | $r^3$ | $e$ | $r$ | $sr^2$ | $sr^3$ | $s$ | $sr$ |
| $r^3$ | $r^3$ | $e$ | $r$ | $r^2$ | $sr$ | $sr^2$ | $sr^3$ | $s$ |
| $s$ | $s$ | $sr$ | $sr^2$ | $sr^3$ | $e$ | $r$ | $r^2$ | $r^3$ |
| $sr$ | $sr$ | $sr^2$ | $sr^3$ | $s$ | $r^3$ | $e$ | $r$ | $r^2$ |
| $sr^2$ | $sr^2$ | $sr^3$ | $s$ | $sr$ | $r^2$ | $r^3$ | $e$ | $r$ |
| $sr^3$ | $sr^3$ | $s$ | $sr$ | $sr^2$ | $r$ | $r^2$ | $r^3$ | $e$ |

</div>

<figcaption>

$\mathcal{D}_{4}$ 群乘法表</figcaption>
</figure>

¶研究$\mathcal{D}_{N},$ 将正$N$边形放在$xy$平面上, 其几何中心取为原点, 标号$1$的点置于$x$轴上, 编号逆时针增大. 令$s_{j},\, j=0,\dots,N-1$代表将正$N$边关于与$x$轴成$2\pi j/N$夹角的轴做对称操作, 那么$s_{j+1}=rs_{j}=r^{j+1}s_{0}.$ 总结得到三条有利计算的规则

$$
\left\{\begin{aligned}
&r^{N}=s_{j}^2=e,\\
&r^{m}s_{j}=s_{\operatorname{mod}(j+m,N)}
\end{aligned}\right.\Longrightarrow
s_{j}r^{m}=(r^{N-m}s_{j})^{-1}=s_{\operatorname{mod}(j-m,N)}.
$$

### 群的各种子集

>==元素的阶== 若对于$r\in\mathcal{G},$ 存在一个最小的非负整数使得$r^{n}=e$成立, 则称$r$的阶为$n,$ 若这样的$n$不存在, 则记$r$的阶为$\infty.$ 容易知道, 有限群的元素阶也有限.
>
>==子群== 对于群$(\mathcal{G},\cdot)$若其子集$(\mathcal{H},\cdot)$也构成群, 则称$(\mathcal{H},\cdot)$为子群, 记为$\mathcal{H}\leq\mathcal{G}.$
>
>==循环子群== 包含$e$和指定元素$r$的最小子群. 对于有限阶元素, 循环子群可以只用正幂表示. 一般起见, $r$的循环子群表示为
>$$\braket{r}=\{r^{k}\mid k\in\mathbb{Z}\}.$$
>==陪集== 对于群$(\mathcal{G},\cdot)$和子群$(\mathcal{H},\cdot),$ 取$r\in\mathcal{G}\setminus\mathcal{H},$ 定义左陪集和右陪集(left and right coset)
>$$r\cdot\mathcal{H},\quad\mathcal{H}\cdot r,$$
>由反证法可证陪集与$\mathcal{H}$没有公共元素, 且陪集也没有重复元素.
>
><mark type="thm">Lagrange定理</mark> 构造两个左陪集$r_{j}\cdot\mathcal{H}$和$r_{k}\cdot\mathcal{H}\ (r_{j}\neq r_{k}),$ 则要么两个陪集相同, 要么没有公共元素, 这是因为
>$$\exist h_{\mu},h_{\nu}\ \text{s.t.} \ r_{j}h_{\mu}=r_{k}h_{\nu}\Longrightarrow r_{j}\cdot\mathcal{H}=r_{k}\cdot[(h_{\nu}h_{\mu}^{-1})\cdot{H}]=r_{k}\cdot\mathcal{H},$$
>于是群可按如下步骤分解
>$$\mathcal{G}=\mathcal{H}\cup(r_{1}\cdot\mathcal{H})\cup\dots\cup(r_{d}\cdot\mathcal{H}),\ r_{k+1}\in[(\mathcal{G}\setminus\mathcal{H})\setminus\dots]\setminus(r_{k}\cdot\mathcal{H}),$$
>其中$d$称为子群$\mathcal{H}$的==指数(index)==, 得到群与子群的阶的倍数关系$\#\mathcal{G}=d\#\mathcal{H}$（素指数的群只有平庸子群）.
>
>==正规子群== 任何左陪集和右陪集均相同的子群称为正规子群(normal subgroup),
>$$r_{j}\cdot\mathcal{H}=\mathcal{H}\cdot r_{j},\forall j=1,\dots,(\#\mathcal{G}-\#\mathcal{H}),$$
>记为$\mathcal{H}\trianglelefteq\mathcal{G}.$ 显然, 指数为$2$的子群都是正规子群.
>
>==商群== 将正规子群$\mathcal{H}$和其指数个互不相交的陪集$r_{j}\mathcal{H}$视为复元素组成集合, 复元素乘法规定$\mathcal{K}\mathcal{R}=\{kr\mid k\in\mathcal{K},r\in\mathcal{H}\},$ 对于子群$\mathcal{H}\mathcal{H}=\mathcal{H}.$ $\mathcal{H}$的正规性使此集合成为群, 称为商群(quotient group), 记为$\mathcal{G}/\mathcal{H}.$
>
>==共轭元素== 对任意$s\in\mathcal{G},$ 若$r'=srs^{-1}$则称$r'$与$r$相互共轭(conjugate), 共轭是一种关系, 具有反身性、对称性和传递性.
>
>==类== 类(class)是所有互相共轭元素的集合, 记为
>$$\mathcal{C}_{\alpha}=\{r_{k}\mid r_{k}=sr_{j}s^{-1},s\in\mathcal{G}\},$$
>其中下角标$\alpha$用于索引类. 由共轭的传递性, 两个类要么无公共元素, 要么全等. 因此, 除$\{e\}$类, 其余类不构成子群.
>
>==相逆类== 对于共轭关系$r'=srs^{-1}$取逆, 逆元也保持共轭$(r')^{-1}=sr^{-1}s^{-1},$ 定义相逆类(reciprocal class)
>$$\mathcal{C}_{\alpha}^{-1}=\{r_{k}^{-1}\mid r_{k}\in\mathcal{C}_{\alpha}\},$$
>若$\mathcal{C}_{\alpha}^{-1}=\mathcal{C}_{\alpha},$ 称这样的类为自逆类.

¶以$\mathcal{D}_{4}$为例

<figure class="table-caption">

|概念|说明|
|-----|-----|
|子群|$\mathcal{R}_{4}=\{e,r,r^2,r^3\},\,\mathcal{R}_{2}=\{e,r^2\},\,\mathcal{D}_{2}=\{e,r^2,s,sr^2\},\,\mathcal{D}_{2}'=\{e,r^2,sr,sr^3\},\,\mathcal{D}_{4}$|
|陪集分解|$\mathcal{D}_{4}=\mathcal{R}_{4}\cup(s\cdot\mathcal{R}_{4}),\,d=2$|
|正规子群|$\mathcal{R}_{2}\trianglelefteq\mathcal{R}_{4},\mathcal{D}_{2},\mathcal{D}_{2}'\trianglelefteq \mathcal{D}_{4}$|
|商群|$\mathcal{D}_{4}/\mathcal{R}_{4}=\{\mathcal{R}_{4},s\cdot\mathcal{R}_{4}\}$|
|类|$\mathcal{C}_{0}=\{e\},\mathcal{C}_{1}=\{r,r^3\},\mathcal{C}_{2}=\{r^2\},\mathcal{C}_{3}=\{s,sr^2\},\mathcal{C}_{4}=\{sr,sr^3\}$|
|相逆类|五个类均自逆|

<figcaption>

$\mathcal{D}_{4}$的子集
</figcaption>
</figure>

### 群的作用

>==轨道== 假定$\mathcal{G}$中的元素作用于集合$X,$ 取$x\in X,$ 定义轨道(orbit)
>$$\mathcal{O}_{x}=\{gx\mid g\in\mathcal{G}\}.$$
>
>==稳定化子== 假定$\mathcal{G}$中的元素作用于集合$X,$ 取$x\in X,$ 定义稳定化子(Stabilizer)
>$$\operatorname{Stab}_{\mathcal{G}}(x)\stackrel{\text{def}}{=}\mathcal{G}_{x}=\{g\in\mathcal{G}\mid gx=x\}.$$
>
>==正规化子== 假定$\mathcal{G}$中的元素作用于幂集$2^{\mathcal{G}},$ 取$\mathcal{H}\in 2^{\mathcal{G}},$ 定义正规化子(Nomalizer)
>$$\mathcal{N}_{\mathcal{G}}(\mathcal{H})=\{g\in\mathcal{G}\mid g\mathcal{H}g^{-1}=\mathcal{H}\}.$$
>
>==中心化子== 假定$\mathcal{H}$中的元素作用于$\mathcal{G}$自身, 取$\mathcal{H}\subset\mathcal{G},$ 定义中心化子(Centralizer)
>$$\mathcal{C}_{\mathcal{G}}(\mathcal{H})=\{g\in\mathcal{G}\mid h=ghg^{-1},\forall h\in\mathcal{H}\}.$$
>
><mark type="thm">轨道-稳定化子定理</mark>
>$$\#\mathcal{O}_{x}=\frac{\#\mathcal{G}}{\#\mathcal{G}_{x}}.$$
>[证明] 作$\varphi:\{g\mathcal{G}_{x}\mid g\in\mathcal{G}\}\to\mathcal{O}_{x},\,\varphi(g\mathcal{G}_{x})=gx,$（良定义）
>则由$\varphi(g_{1}\mathcal{G}_{x})=\varphi(g_{2}\mathcal{G}_{x})$即$g_{1}x=g_{2}x$
>$$g_{2}^{-1}g_{1}x=x\Longrightarrow g_{2}^{-1}g_{1}\in\mathcal{G}_{x},g_{1}\mathcal{G}_{x}=g_{2}\mathcal{G}_{x},$$
>知$\varphi$是单射. 又$\forall y\in\mathcal{O}_{x},y=gx=\varphi(g\mathcal{G}_{x})$知$\varphi$是满射. 从而$\varphi$是双射
>$$\#\mathcal{O}_{x}=\#\{g\mathcal{G}_{x}\mid g\in\mathcal{G}\}=\frac{\#\mathcal{G}}{\#\mathcal{G}_{x}}.$$
>类似作$\pi:\{g\mathcal{C}_{\mathcal{G}}(r)\mid g\in\mathcal{G}\}\to\mathcal{C}_{\alpha}(r),\,g\mathcal{C}_{\mathcal{G}}(r)\to grg^{-1}$可证明
>$$\#\mathcal{C}_{\alpha}(r)=\frac{\#\mathcal{G}}{\#\mathcal{C}_{\mathcal{G}}(r)}.$$

### 群的同态与同构

>==同态== 若群$\mathcal{G}$和$\mathcal{G}'$间
>$$\exist f:(\mathcal{G},\cdot)\to(\mathcal{G}',*)\ \text{s.t.}\ f(r\cdot s)=f(r)*f(s),\forall r,s\in\mathcal{G},$$
>则称$\mathcal{G}$与$\mathcal{G}'$同态(homomorphism), 记为$\mathcal{G}'\sim\mathcal{G}.$（因为$\mathcal{G}'$与$\mathcal{G}$间可能是一对多的映射关系, 所以同态关系不满足对称性, 不是等价关系）$f$是满射时, 称$\mathcal{G}$与$\mathcal{G}'$满同态.
>
>==同构== 若$f$还是双射(bijection), 则称$\mathcal{G}$与$\mathcal{G}'$同构(isomorphism), 记$\mathcal{G}\cong\mathcal{G}'.$
>
>==直积== 定义两个群的直积(direct product)$\mathcal{G}\times\mathcal{K}=\{(g,k)\mid g\in\mathcal{G},k\in\mathcal{K}\}$和$\mathcal{G}\times\mathcal{K}$上的乘法$(g_1,k_1)\circ(g_2,k_2)=(g_1g_2,k_1k_2).$ 这样$(\mathcal{G}\times\mathcal{K},\circ)$构成阶为$\#\mathcal{G}\times\#\mathcal{K}$的群.

¶对于$\mathcal{D}_{n}$和其两个循环子群的直积$\braket{s}\times\braket{r}.$ 在$n=2$时, 因为$sr=rs,$ $\mathcal{D}_{2}$是*Abelian*群,

$$
\exist f:\left\{\begin{aligned}&e\mapsto(e,e)\\&r\mapsto(e,r)\\&s\mapsto(s,e)\\&sr\mapsto(s,r)\end{aligned}\right.\ \text{s.t.}\ f(g_1g_2)=f(g_1)\circ f(g_2),\forall g_1,g_2\in\mathcal{D}_{2},
$$

又$f$是单射(injection)($4=2\times2$), 故$\mathcal{D}_{2}\cong\braket{s}\times\braket{r}.$

>==同态对应的核与像== 若$\mathcal{G}'\sim\mathcal{G}$且$\mathcal{H}=\{g\in\mathcal{G}:f(g)=e'\},$ 则称$\ker f=\mathcal{H}$为同态对应的核(kernel of a homomorphism). 而像(image)定义为$\operatorname{img}f=\{f(g)\mid g\in\mathcal{G}\}.$
>
><mark type="thm">同态基本定理</mark>
>
>1. $\ker f\trianglelefteq\mathcal{G}.$
>2. $\operatorname{img}f\leq\mathcal{G}'.$
>3. <mark type="thm">群同构第一定理</mark>$!\exists\bar{f}:\mathcal{G}/\ker f\xrightarrow{\sim}\operatorname{img} f,\,\bar{f}(g\ker f)=f(g)\Longleftrightarrow\mathcal{G}/\ker f\cong\operatorname{img}f.$
>
>[证明]
>
>1. 任取$r\in\mathcal{G},g\in\ker f,$ 因为$f(rgr^{-1})=f(r)e'f(r^{-1})=f(rr^{-1})=e',$ 故$\exists g'\in\ker f$使得
> $$rgr^{-1}=g'\Longleftrightarrow r\cdot\ker f=\ker f\cdot r,$$
>且易验证$\ker f\leq\mathcal{G},$ 故$\ker f\trianglelefteq\mathcal{G}.$
>
>2. 易验证.
>3. 作$\bar{f}:\mathcal{G}/\ker f\rightarrow\operatorname{img} f,\,\bar{f}(g\ker f)=f(g),$ 由*Lagrange*定理
>$$\mathcal{G}=\ker f\cup\cdots\cup r_{d}\ker f,$$
>假设$\exists r_{1}\ker f,r_{2}\ker f\in\mathcal{G}/\ker f,r_{1}\ker f\neq r_{2}\ker f\ \text{s.t.}\ \bar{f}(r_{1}\ker f)=\bar{f}(r_{2}\ker f)$即
>$$f(r_{1})=f(r_{2})\Longrightarrow f(r_{1}r_{2}^{-1})=e'\Longrightarrow r_{1}r_{2}^{-1}\in\ker f,$$
>故
>$$\exists g\in\ker f,r_{1}=r_{2}g\Longrightarrow r_{1}\ker f=r_{2}\ker f,$$
>这与假设矛盾, 故$\bar{f}:\mathcal{G}/\ker f\hookrightarrow\operatorname{img}f.$ 又任意$\mathcal{G}$中元素可表示为$r_{i}g$的形式, 故$\operatorname{img}f=\{f(r_{i})\mid i=1,\dots,d\},$ $\bar{f}:\mathcal{G}/\ker f\twoheadrightarrow\operatorname{img} f.$ 于是$\mathcal{G}/\ker f\cong\operatorname{img}f.$
>
><mark type="thm">群同构第二定理</mark> 若群$\mathcal{G}$有正规子群$\mathcal{N}$和子群$\mathcal{H},$ 则$\mathcal{N}\cap\mathcal{H}\trianglelefteq\mathcal{H},$ 且$\mathcal{H}/(\mathcal{H}\cap\mathcal{N})\cong\mathcal{H}\mathcal{N}/\mathcal{N}.$
>
>[证明]先证$\mathcal{H}\mathcal{N}/\mathcal{N}$是商群. 因为$hnh'n'=h[h'n(h')^{-1}]h'n'=hh'nn'\in\mathcal{H}\mathcal{N}$且$(hn)^{-1}=n^{-1}h^{-1}=h^{-1}(n')^{-1}\in\mathcal{H}\mathcal{N}$以及恒元$e_{\mathcal{H}}e_{\mathcal{N}}=e$的存在, $\mathcal{H}\mathcal{N}$是群. 因为$\mathcal{N}\subset\mathcal{H}\mathcal{N}\subset\mathcal{G}$且$\mathcal{N}\trianglelefteq\mathcal{G}$ 故$\mathcal{N}\trianglelefteq\mathcal{H}\mathcal{N}.$ 可以讨论商群$\mathcal{H}\mathcal{N}/\mathcal{N}.$
>
>¶取$j:\mathcal{H}\hookrightarrow\mathcal{H}\mathcal{N},\,j(h)=h$和$\sigma:\mathcal{H}\mathcal{N}/\mathcal{N}\twoheadrightarrow\mathcal{H}\mathcal{N}/\mathcal{N},\,\sigma(hn)=h\mathcal{N},$ 令$f=\sigma\circ j:\mathcal{H}\twoheadrightarrow\mathcal{H}\mathcal{N}/\mathcal{N},\,f(h)=h\mathcal{N},$ 则$\mathcal{H}\mathcal{N}/\mathcal{N}\sim\mathcal{H},$ $\ker f=\mathcal{H}\cap\mathcal{N}.$ 由群同构第一定理$\mathcal{H}\cap\mathcal{N}\trianglelefteq\mathcal{H}$且$\mathcal{H}/(\mathcal{H}\cap\mathcal{N})\cong\mathcal{H}\mathcal{N}/\mathcal{N}.$
>
><mark type="thm">群同构第三定理</mark> 若群$\mathcal{G}$有正规子群$\mathcal{N},\mathcal{M},$ 且$\mathcal{M}\subset\mathcal{N},$ 则$\mathcal{N}/\mathcal{M}\trianglelefteq\mathcal{G}/\mathcal{M},$ 且$(\mathcal{G}/\mathcal{M})/(\mathcal{N}/\mathcal{M})\cong\mathcal{G}/\mathcal{N}.$
>
>[证明]作$\tau:\mathcal{G}/\mathcal{M}\twoheadrightarrow\mathcal{G}/\mathcal{N},\,\tau(g\mathcal{M})=g\mathcal{M}\mathcal{N}=g\mathcal{N}$又$\tau(n\mathcal{M})=n\mathcal{N}=\mathcal{N},\,\forall n\mathcal{M}\in\mathcal{N}/\mathcal{M}$即$\ker\tau=\mathcal{N}/\mathcal{M},$ 由群同构第一定理$\mathcal{N}/\mathcal{M}\trianglelefteq\mathcal{G}/\mathcal{M}$且$(\mathcal{G}/\mathcal{M})/(\mathcal{N}/\mathcal{M})=\mathcal{G}/\mathcal{N}.$
