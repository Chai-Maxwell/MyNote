# 群的基本概念和群的线性表示理论

## 线性代数回顾

### 线性空间

¶设对于*Hamilton*算符$\hat{H}$, 作用于$m$个线性无关的态${\psi_{\mu}},\,\mu=1,\dots,m$, 得到本征值能量$E$,

$$
\hat{H}{\psi_{\mu}}=E{\psi_{\mu}},
$$

那么${\phi}={\psi_{\mu}}a_{\mu}$的线性组合仍是本征态.

$$
{\psi_{\mu}}a_{\mu}\in\operatorname{span}\{{\psi_{\mu}}\}\equiv\mathcal{L},\,\operatorname{dim}\mathcal{L}=m.
$$

设$\mathcal{L}_{1},\mathcal{L_{2}}\subset\mathcal{L}$, 当

$$
\mathcal{L}=\mathcal{L}_{1}+\mathcal{L}_{2},
$$

且三个等价条件(1)$\mathcal{L}_{1}\cap\mathcal{L}_{2}=\bm{0}$,
(2)$\operatorname{dim}\mathcal{L}=\operatorname{dim}\mathcal{L}_{1}+\operatorname{dim}\mathcal{L}_{2}$, (3)对于${\phi}\in\mathcal{L}$, $!\exist{\phi_{1}}\in\mathcal{L}_{1},\,{\phi_{2}}\in\mathcal{L}_{2}\ \text{s.t.}\ {\phi}={\phi_{1}}+{\phi_{2}}$满足之一, 则称$\mathcal{L}$为$\mathcal{L}_{1}$和$\mathcal{L}_{2}$的直和, 记$\mathcal{L}=\mathcal{L}_{1}\oplus\mathcal{L}_{2}$.

### 线性算符

¶线性算符$\hat{T}$描述$\mathcal{L}$上的线性变换, 满足

$$
\hat{T}(c_{1}{\phi_{1}}+c_{2}{\phi_{2}})=c_{1}\hat{T}({\phi_{1}})+c_{2}\hat{T}({\phi_{2}}),
$$

因为这种性质, $\hat{T}$在固定基后可被矩阵表示$[\hat{T}]_{\psi}=T_{\mu\nu}$. 那么$\hat{T}(\psi_{\mu}a_{\mu})$在$\psi_{\nu}$上的分量

$$
[\hat{T}(\psi_{\mu}a_{\mu})]_{\nu}=[\hat{T}(\psi_{\mu})a_{\mu}]_{\nu}=[\psi_{\nu}T_{\nu\mu}a_{\mu}]_{\nu}=T_{\nu\mu}a_{\mu}.
$$

¶如果算符$\hat{R}$与$\hat{H}$对易, 则

$$
\hat{H}(\hat{R}\psi_{\mu})=E\hat{R}\psi_{\mu},
$$

即$\hat{R}(\psi_{\mu})\in\mathcal{L}$.

### 相似变换

¶设两个基之间有如下变换关系

$$
e'_{\mu}=e_{\nu}S_{\nu\mu},
$$

则同一线性算符$\hat{R}$在不同基下的矩阵表示存在关系

$$
\left\{\begin{aligned}
&\hat{R}(e'_{\mu})=e'_{\mu}R_{\mu\nu}=e_{\sigma}S_{\sigma\mu}R'_{\mu\nu},\\
&\hat{R}(e'_{\mu})=\hat{R}(e_{\mu}S_{\mu\nu})=e_{\sigma}R_{\sigma\mu}S_{\mu\nu},
\end{aligned}\right.
\Longrightarrow R'=S^{-1}RS.
$$
