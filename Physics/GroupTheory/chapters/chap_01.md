# 群的基本概念和群的线性表示理论

## 线性代数回顾

### 线性空间

¶设对于*Hamilton*算符$\hat{H}$, 作用于$m$个线性无关的态${\psi_{\mu}},\,\mu=1,\dots,m$, 得到本征值能量$E$,

$$
\hat{H}{\psi_{\mu}}=E{\psi_{\mu}},
$$

那么${\phi}={\psi_{\mu}}a^{\mu}$的线性组合仍是本征态.

$$
{\psi_{\mu}}a^{\mu}\in\operatorname{span}\{{\psi_{\mu}}\}\equiv\mathcal{L},\,\operatorname{dim}\mathcal{L}=m.
$$

设$\mathcal{L}^{(1)},\mathcal{L}^{(2)}\subset\mathcal{L}$, 当

$$
\mathcal{L}=\mathcal{L}^{(1)}+\mathcal{L}^{(2)},
$$

且三个等价条件(1)$\mathcal{L}^{(1)}\cap\mathcal{L}^{(2)}=\bm{0}$,
(2)$\operatorname{dim}\mathcal{L}=\operatorname{dim}\mathcal{L}^{(1)}+\operatorname{dim}\mathcal{L}^{(2)}$, (3)对于${\phi}\in\mathcal{L}$, $!\exist{\phi^{(1)}}\in\mathcal{L}^{(1)},\,{\phi^{(2)}}\in\mathcal{L}^{(2)}\ \text{s.t.}\ {\phi}={\phi^{(1)}}+{\phi^{(2)}}$满足之一, 则称$\mathcal{L}$为$\mathcal{L}^{(1)}$和$\mathcal{L}^{(2)}$的直和, 记$\mathcal{L}=\mathcal{L}^{(1)}\oplus\mathcal{L}^{(2)}$.

### 线性算符

¶线性算符$\hat{T}$描述$\mathcal{L}$上的线性变换, 满足

$$
\hat{T}(c^{(1)}{\phi^{(1)}}+c^{(2)}{\phi^{(2)}})=c^{(1)}\hat{T}({\phi^{(1)}})+c^{(2)}\hat{T}({\phi^{(2)}}),
$$

因为这种性质, $\hat{T}$在固定基后可被矩阵表示$[\hat{T}]_{\psi}=T^{\mu}_{\nu}$. 那么$\hat{T}(\psi_{\mu}a^{\mu})$在$\psi_{\nu}$上的分量

$$
[\hat{T}(\psi_{\mu}a^{\mu})]^{\nu}=[\hat{T}(\psi_{\mu})a^{\mu}]^{\nu}=[\psi_{\nu}T^{\nu}_{\mu}a^{\mu}]^{\nu}=T^{\nu}_{\mu}a^{\mu}.
$$

¶如果算符$\hat{R}$与$\hat{H}$对易, 则

$$
\hat{H}(\hat{R}\psi_{\mu})=E\hat{R}\psi_{\mu},
$$

即$\hat{R}(\psi_{\mu})\in\mathcal{L}$.

### 相似变换(Similarity Transformation)

¶设两个基之间有如下变换关系

$$
e'_{\mu}=e_{\nu}S^{\nu}_{\mu},
$$

则同一线性算符$\hat{R}$在不同基下的矩阵表示存在关系

$$
\left\{\begin{aligned}
&\hat{R}(e'_{\mu})=e'_{\nu}R^{\nu}_{\mu}=e_{\sigma}S^{\sigma}_{\nu}(R')^{\nu}_{\mu},\\
&\hat{R}(e'_{\mu})=\hat{R}(e_{\nu}S^{\nu}_{\mu})=e_{\sigma}R^{\sigma}_{\nu}S^{\nu}_{\mu},
\end{aligned}\right.
\Longrightarrow \bm{R}'=\bm{S}^{-1}\bm{R}\bm{S}.
$$

相似变换不改变$\hat{R}$的作用效果

$$
b'^{\mu}=(R')^{\mu}_{\nu}a'^{\nu}=(S^{-1}RS)^{\mu}_{\nu}(S^{-1}a)^{\nu}=(S^{-1})^{\mu}_{\nu}b^{\nu}.
$$

¶称拥有如下性质的空间$\mathcal{K}$为算子$\hat{R}$的不变空间(invariant space)

$$
\hat{R}(a)\in\mathcal{K},\ \forall a\in\mathcal{K}.
$$

设$\mathcal{L}^{(1)}$是$\hat{R}$的不变空间, 而$\mathcal{L}^{(2)}$是其互补子空间, 取
$e_{\mu}\in\mathcal{L}^{(1)},\,\mu=1,\dots,n;\ e_{\nu}\in\mathcal{L}^{(2)},\,\nu=n+1,\dots,m,$则$\hat{R}$在基下表示为上三角矩阵

$$
R=\left(
\begin{matrix}
R^{(1)}&M\\\bf{0}&R^{(2)}
\end{matrix}
\right)
$$
