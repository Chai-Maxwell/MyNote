# 第一章习题

## $\mathfrak{B}_1$[习题1-1]

¶证明以乘法作为"乘积"的所有正实数构成的群和以"加法"作为乘积的所有实数构成的群同构.
>[证明]$(\mathbb{R}_{+},\times)$和$(\mathbb{R},+)$的恒元分别为$e=1$和$e'=0$. 要找到$f:(\mathbb{R}_{+},\times)\to(\mathbb{R},+)$使得
>$$f(a\times b)=f(a)+f(b),\,\forall a,b\in\mathbb{R}_{+},\tag{1.1}$$
>解此函数方程
>$$(1.1)\begin{aligned}
&\overset{a=b=1}{\Longrightarrow}\\
&\hspace{0.4em}\underset{b=1}{\overset{\dfrac{\mathrm{d}}{\mathrm{d}b}}{\Longrightarrow}}
\end{aligned}
\left\{\begin{aligned}
&f(1)=0\\\\
&af'(a)=f'(1)
\end{aligned}\right.
\overset{C\equiv f'(1)}{\Longrightarrow}f(a)=C\ln a\ (C\neq0),$$
>故$(\mathbb{R}_{+},\times)\cong(\mathbb{R},+)$.

## $\mathfrak{B}_{1}$[习题1-2]

¶沿三个坐标轴方向的三个二次转动, 加上恒元, 构成群, 证明为$\mathcal{D}_{2}$. 证明$\mathcal{D}_{2}$和四阶反演群$\mathcal{V}_{4}$(Vierergruppe)同构, $\mathcal{D}_{2}\cong\mathcal{V}_{4}$.
>[证明]题中群$\braket{r_{x},r_{y}\mid e=r_{x}^2=r_{y}^2, r_{z}=r_{x}r_{y}=r_{y}r_{x}}$有两个生成元且阶$d=4$, 正是$\mathcal{D}_{2}$, 明显同构于$\mathcal{V}_{4}$.

## $\mathfrak{B}_{1}$[习题1-3]

¶证明每个元素的平方都等于恒元的群一定是*Abelian*群.

>[证明]任取$a,b\in\mathcal{G}$, 满足$e=a^2=b^2$. 由$a^2=(ab)(ba)=e$得$ab=(ba)^{-1}=ba$则$\mathcal{G}$是*Abelian*群.

## $\mathfrak{B}_{1}$[习题1-6]

¶把下列置换化为无公共客体的轮换乘积:(1)$(1\ 2)(2\ 3)(1\ 2)$; (2)$(1\ 2\ 3)(1\ 3\ 4)(3\ 2\ 1)$; (3)$(1\ 2\ 3\ 4)^{-1}$; (4)$(1\ 2\ 4\ 5)(4\ 3\ 2\ 6)$; (5)$(1\ 2\ 3)(4\ 2\ 6)(3\ 4\ 5\ 6)$.

>[解]
>$$\tau_{1}:\left\{\begin{aligned}
&1\mapsto3\\
&2\mapsto2\\
&3\mapsto1\\
\end{aligned}\right.
=(1\ 3);\quad
\tau_{2}:\left\{\begin{aligned}
&1\mapsto4\\
&2\mapsto1\\
&3\mapsto3\\
&4\mapsto2
\end{aligned}\right.
=(1\ 4\ 2);\quad
\tau_{3}:(1\ 4\ 3\ 2);$$
>$$
\tau_{4}:\left\{\begin{aligned}
&1\mapsto2\\
&2\mapsto6\\
&3\mapsto4\\
&4\mapsto3\\
&5\mapsto1\\
&6\mapsto5
\end{aligned}\right.
=(1\ 2\ 6\ 5)(3\ 4);\quad
\tau_{5}:\left\{\begin{aligned}
&1\mapsto2\\
&2\mapsto6\\
&3\mapsto3\\
&4\mapsto5\\
&5\mapsto4\\
&6\mapsto1
\end{aligned}\right.
=(1\ 2\ 6)(4\ 5).$$

## $\mathfrak{B}_{1}$[习题1-8]

¶设群$\mathcal{G}$的阶数$g=2n$, $n$是大于$2$的素数, 准确到同构, 证明群$\mathcal{G}$只有两种: 循环群$\mathcal{C}_{2n}$和正$n$边形对称群$\mathcal{D}_{n}$.
