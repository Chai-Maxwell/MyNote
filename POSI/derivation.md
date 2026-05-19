## SAM与OAM

\par电磁场角动量分解为SAM与OAM
$$
\begin{aligned}
\bm{J}&=\int_{\mathbb{R}^3}\bm{r}'\times\bm{g}_{M}\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}\bm{r}'\times(\bm{D}\times\bm{B})\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}\bm{r}'\times(D_{j}\partial_{i}A_{j}\hat{\bm{e}}_{i}-(\bm{D}\cdot\nabla)\bm{A})\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}D_{j}(\bm{r}'\times\nabla)A_{j}-\varepsilon_{ikm}x'_{i}D_{j}\partial_{j}A_{k}\hat{\bm{e}}_{m}\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}D_{j}(\bm{r}'\times\nabla)A_{j}-\varepsilon_{ikm}\partial_{j}(x'_{i}D_{j}A_{k})\hat{\bm{e}}_{m}+\varepsilon_{ikm}A_{k}\partial_{j}(x'_{i}D_{j})\hat{\bm{e}}_{m}\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}D_{j}(\bm{r}'\times\nabla)A_{j}-\nabla\cdot(\bm{D}(\bm{r}'\times\bm{A}))+\bm{D}\times\bm{A}\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}D_{j}(\bm{r}'\times\nabla)A_{j}\ \upd^3\bm{r}'+\int_{\mathbb{R}^3}\bm{D}\times\bm{A}\ \upd^3\bm{r}'+\lim_{\Sigma\to\mathbb{R}^3}\oint_{\partial\Sigma}(\bm{r}'\times\bm{A})\bm{D}\cdot\upd \bm{f}'\\
&\equiv\bm{L}+\bm{S},
\end{aligned}
$$
在自由空间中，引入对偶电矢势
$$
\bm{E}=-\nabla\times\bm{C},
$$
\par进行*Heaviside-Lamor*变换[^1]
[^1]:Stephen M. Barnett (2010) Rotation of electromagnetic fields and the nature of optical angular momentum, Journal of Modern Optics, 57:14-15, 1339-1343, DOI: 10.1080/09500341003654427

$$
\begin{aligned}
&\bm{A}\to\bm{A}'=\cos\theta\bm{A}+\frac{1}{c}\sin\theta\bm{C},\\
&\bm{C}\to\bm{C}'=\cos\theta\bm{C}-c\sin\theta\bm{A},
\end{aligned}
$$
为使得$\bm{S}$和$\bm{L}$满足变换的不变性，改写
$$
\begin{aligned}
\bm{S}&=\varepsilon\int_{\mathbb{R}^3}\bm{E}\times\bm{A}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}A_{i}\partial_{i}C_{j}\hat{\bm{e}}_{j}-A_{i}\partial_{j}C_{i}\hat{\bm{e}}_{j}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}-C_{j}\partial_{i}A_{i}\hat{\bm{e}}_{j}+C_{i}\partial_{j}A_{i}\hat{\bm{e}}_{j}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}(\bm{C}\times\nabla)\times\bm{A}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}\bm{C}\times(\nabla\times\bm{A})+C_{i}\partial_{i}A_{j}\hat{\bm{e}}_{j}-\underbrace{C_{j}\partial_{i}A_{i}\hat{\bm{e}}_{j}}_{=0}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}\bm{C}\times(\nabla\times\bm{A})+\nabla\cdot(\bm{C}\bm{A})-\underbrace{(\nabla\cdot\bm{C})\bm{A}}_{=0}\ \upd^3\bm{r}'\\
&=-\varepsilon\int_{\mathbb{R}^3}\bm{C}\times(\nabla\times\bm{A})\ \upd^3\bm{r}'\\
&=\frac{\varepsilon}{2}\int_{\mathbb{R}^3}\bm{E}\times\bm{A}+\bm{B}\times\bm{C}\ \upd^3\bm{r}',
\end{aligned}
$$
类似地
$$
\bm{L}=\frac{\varepsilon}{2}\int_{\mathbb{R}^3}E_{i}(\bm{r}'\times\nabla)A_{i}+B_{i}(\bm{r}'\times\nabla)C_{i}\ \upd^3\bm{r}',
$$
引入SAM与OAM密度
$$
\begin{aligned}
&\bm{s}=\frac{\varepsilon}{2}(\bm{E}\times\bm{A}+\bm{B}\times\bm{C}),\\
&\bm{l}=\frac{\varepsilon}{2}(E_{i}(\bm{r}'\times\nabla)A_{i}+B_{i}(\bm{r}'\times\nabla)C_{i}),
\end{aligned}
$$
注意只需要介质是线性介质.

## 线性不均匀介质中的SAM连续性

\par已有关系
$$
\begin{aligned}
&\nabla\times\bm{E}=-\partial_{t}\bm{B},\ \nabla\times\bm{H}=\partial_{t}\bm{D},\\
&\bm{D}=\varepsilon_{0}\bm{E}+\bm{P},\ \bm{B}=\mu_{0}(\bm{H}+\bm{M}),\\
&\bm{E}=-\partial_{t}\bm{A}-\nabla\varphi,\ \bm{H}=-\partial_{t}\bm{C},\\
&\bm{B}=\nabla\times\bm{A},\ \bm{D}=-\nabla\times\bm{C},\\
&\nabla\cdot\bm{A}=0,\ \nabla\cdot\bm{C}=0.
\end{aligned}
$$
注意在$\bm{D}=-\nabla\times\bm{C}$的表示下
$$
\bm{s}=\frac{1}{2}(\bm{D}\times\bm{A+\bm{B}\times\bm{C}}),
$$
$$
\color{Teal}\bm{s}=\frac{1}{2}(\varepsilon_{0}\bm{E}\times\bm{A}+\mu_{0}\bm{H}\times\bm{C}),
$$

---
于是
$$
\begin{aligned}
\partial_{t}\bm{s}&=\frac{1}{2}(\partial_{t}\bm{D}\times\bm{A}+\bm{D}\times\partial_{t}\bm{A}+\partial_{t}\bm{B}\times\bm{C}+\bm{B}\times\partial_{t}\bm{C})\\
&=\frac{1}{2}\left[(\nabla\times\bm{H})\times\bm{A}-\bm{D}\times(\bm{E}+\nabla\varphi)-(\nabla\times\bm{E})\times\bm{C}+\bm{H}\times\bm{B}\right]\\
&=\frac{1}{2}\left[(\nabla\times\bm{H})\times\bm{A}+\nabla\varphi\times\bm{D}-(\nabla\times\bm{E})\times\bm{C}\right],
\end{aligned}
$$
其中
$$
\begin{aligned}
(\nabla\times\bm{H})\times\bm{A}&=-\nabla(\bm{A}\cdot\bm{H})+(\bm{A}\cdot\nabla)\bm{H}+(\bm{H}\cdot\nabla)\bm{A}+\bm{H}\times(\nabla\times\bm{A})\\
&=\nabla\cdot(-(\bm{A}\cdot\bm{H})\mathcal{I})+\nabla\cdot(\bm{A}\bm{H})-(\nabla\cdot\bm{A})\bm{H}+\nabla\cdot(\bm{H}\bm{A})-(\nabla\cdot\bm{H})\bm{A}\\
&=\nabla\cdot(-(\bm{A}\cdot\bm{H})\mathcal{I}+\bm{A}\bm{H}+\bm{H}\bm{A}),
\end{aligned}
$$
类似地
$$
\bm{C}\times(\nabla\times\bm{E})=\nabla\cdot((\bm{C\cdot\bm{E}})\mathcal{I}-\bm{C}\bm{E}-\bm{E}\bm{C})-(\nabla^2\varphi)\bm{C},
$$
而
$$
\begin{aligned}
\nabla\varphi\times\bm{D}&=-(\nabla\times\bm{C})\times\nabla\varphi\\
&=-\nabla(\nabla\varphi\cdot\bm{C})+(\bm{C}\cdot\nabla)\nabla\varphi+(\nabla\varphi\cdot\nabla)\bm{C}+\bm{C}\times(\nabla\times\nabla\varphi)\\
&=\nabla\cdot(-(\nabla\varphi\cdot\bm{C})\mathcal{I})+\nabla\cdot(\bm{C}\nabla\varphi)-(\nabla\cdot\bm{C})\nabla\varphi+\nabla\cdot(\nabla\varphi\bm{C})-\nabla^2\varphi\bm{C}\\
&=\nabla\cdot(-(\nabla\varphi\cdot\bm{C})\mathcal{I}+\bm{C}\nabla\varphi+\nabla\varphi\bm{C})-(\nabla^2\varphi)\bm{C},
\end{aligned}
$$
故
$$
\partial_{t}\bm{s}=-\nabla\cdot\frac{1}{2}((\bm{A}\cdot\bm{H}+\nabla\varphi\cdot\bm{C}-\bm{E}\cdot\bm{C})\mathcal{I}+\bm{C}\bm{E}+\bm{E}\bm{C}-\bm{A}\bm{H}-\bm{H}\bm{A}-\bm{C}\nabla\varphi-\nabla\varphi\bm{C})-(\nabla^2\varphi)\bm{C}.
$$

---
根据[^2]
$$\color{Black}
\partial_{t}\bm{s}+\nabla\cdot\bm{J}^{(\text{spin})}=-\bm{\tau},
$$
其中
$$\color{Black}
\begin{aligned}
&\bm{s}=\frac{1}{2}(\varepsilon_{0}\bm{E}\times\bm{A}+\mu_{0}\bm{H}\times\bm{C}),\\
&\bm{J}^{(\text{spin})}=\bm{C}\bm{E}-\bm{A}\bm{H}-\frac{1}{2}(\bm{C}\cdot\bm{E}-\bm{A}\cdot\bm{H})\mathcal{I},\\
&\bm{\tau}=\part{}{t}(\bm{P}\times\bm{A})+\bm{P}\times\bm{E}+\part{}{t}(\bm{M}\times\bm{C})+\bm{M}\times\bm{H}.
\end{aligned}
$$

---
\par设定
$$\color{Grey}
\begin{aligned}
&\bm{E}=-\partial_{t}\bm{A}-\nabla\varphi,\quad\bm{D}=-\nabla\times\bm{C},\\
&\bm{H}=-\partial_{t}\bm{C}-\nabla\phi,\quad\bm{B}=\nabla\times\bm{A},\\
&\bm{D}=\varepsilon_{0}\bm{E}+\bm{P},\quad\bm{B}=\mu_{0}(\bm{H}+\bm{M}),\\
&\nabla\cdot\bm{A}=0,\quad\nabla\cdot\bm{C}=0.\\\\
&\bm{S}=\frac{1}{2}(\varepsilon_{0}\bm{E}\times\bm{A}+\mu_{0}\bm{H}\times\bm{C}),\\
&\bm{L}=\frac{1}{2}[\varepsilon_{0}E_i(\bm{r}\times\nabla)A_i+\mu_{0}H_i(\bm{r}\times\nabla)C_{i}].
\end{aligned}
$$
推论
$$
\begin{aligned}
\nabla\times\bm{H}=\partial_{t}\bm{D},\quad\nabla\times\bm{E}=-\partial_{t}\bm{B}.
\end{aligned}
$$
推导
$$
\begin{aligned}
\partial_{t}\bm{S}&=\frac{\varepsilon_{0}}{2}({\color{Teal}\partial_{t}\bm{E}\times\bm{A}}+{\color{Salmon}\bm{E}\times\partial_{t}\bm{A}})+\frac{\mu_{0}}{2}({\color{Purple}\partial_{t}\bm{H}\times\bm{C}}+{\color{Green}\bm{E}\times\partial_{t}\bm{C}})\\
&={\color{Teal}\frac{1}{2}(\nabla\times\bm{H}-\underline{\partial_{t}\bm{P}})\times\bm{A}}+{\color{Salmon}\frac{\varepsilon_{0}}{2}\bm{E}\times(-\bm{E}-\nabla\varphi)}\\
&\quad+{\color{Purple}\frac{1}{2}(-\nabla\times\bm{E}-\underline{\mu_{0}\partial_{t}\bm{M}})\times\bm{C}}+{\color{Green}\frac{\mu_{0}}{2}\bm{H}\times(-\bm{H}-\nabla\phi)}\\
&={\color{Teal}\frac{1}{2}[-\nabla(\bm{A}\cdot\bm{H})+(\bm{A}\cdot\nabla)\bm{H}+(\bm{H}\cdot\nabla)\bm{A}+\bm{H}\times(\nabla\times\bm{A})]-\underline{\frac{1}{2}\partial_{t}\bm{P}\times\bm{A}}}\\
&\quad{\color{Salmon}+\frac{1}{2}(\nabla\times\bm{C}+\bm{P})\times\nabla\varphi}\\
&\quad{\color{Purple}-\frac{1}{2}[-\nabla(\bm{C}\cdot\bm{E})+(\bm{C}\cdot\nabla)\bm{E}+(\bm{E}\cdot\nabla)\bm{C}+\bm{E}\times(\nabla\times\bm{C})]-\underline{\frac{\mu_{0}}{2}\partial_{t}\bm{M}\times\bm{C}}}\\
&\quad{\color{Green}-\frac{1}{2}(\nabla\times\bm{A}-\mu_{0}\bm{M})\times\nabla\phi}\\
&={\color{Teal}\frac{1}{2}[\nabla\cdot(-(\bm{A}\cdot\bm{H})\mathcal{I})+\nabla\cdot(\bm{A}\bm{H})-(\nabla\cdot\bm{A})\bm{H}+\nabla\cdot(\bm{H}\bm{A})-(\nabla\cdot\bm{H})\bm{A}]}\\
&\quad{\color{Teal}+\frac{1}{2}\mu_{0}\bm{H}\times\bm{M}-\underline{\frac{1}{2}\partial_{t}\bm{P}\times\bm{A}}}\\
&\quad{\color{Salmon}+\frac{1}{2}[-\nabla(C\cdot\nabla\varphi)+(\bm{C}\cdot\nabla)\nabla\varphi+(\nabla\varphi\cdot\nabla)\bm{C}+\bm{C}\times(\nabla\times\nabla\varphi)]+\underline{\frac{1}{2}\bm{P}\times\nabla\varphi}}\\
&\quad{\color{Purple}-\frac{1}{2}[\nabla\cdot(-(\bm{C}\cdot\bm{E})\mathcal{I})+\nabla\cdot(\bm{C}\bm{E})-(\nabla\cdot\bm{C})\bm{E}+\nabla\cdot(\bm{E}\bm{C})-(\nabla\cdot\bm{E})\bm{C}]}\\
&\quad{\color{Purple}-\frac{1}{2}\bm{E}\times\bm{P}-\underline{\frac{\mu_{0}}{2}\partial_{t}\bm{M}\times\bm{C}}}\\
&\quad{\color{Green}-\frac{1}{2}[-\nabla(\nabla\phi\cdot\bm{A})\mathcal{I}+(\nabla\phi\cdot\nabla)\bm{A}+(\bm{A}\cdot\nabla)\nabla\phi+\bm{A}\times(\nabla\times\nabla\phi)]+\underline{\frac{\mu_{0}}{2}\bm{M}\times\nabla\phi}}\\
&={\color{Teal}\frac{1}{2}\nabla\cdot[-(\bm{A\cdot\bm{H}})\mathcal{I}+\bm{A}\bm{H}+\bm{H}\bm{A}]+\frac{1}{2}(\nabla^2\phi)\bm{A}}{\color{Teal}+\frac{1}{2}\mu_{0}\bm{H}\times\bm{M}-\underline{\frac{1}{2}\partial_{t}\bm{P}\times\bm{A}}}\\
&\quad{\color{Salmon}+\frac{1}{2}\nabla\cdot[-({\nabla\varphi\cdot\bm{C}})\mathcal{I+\nabla\varphi\bm{C}+\bm{C}\nabla\varphi}]-\frac{1}{2}(\nabla^2\varphi)\bm{C}+\underline{\frac{1}{2}\bm{P}\times\nabla\varphi}}\\
&\quad{\color{Purple}-\frac{1}{2}\nabla\cdot[-(\bm{C}\cdot\bm{E})\mathcal{I}+\bm{C}\bm{E}+\bm{E}\bm{C}]-\frac{1}{2}(\nabla^2\varphi)\bm{C}}{\color{Purple}-\frac{1}{2}\bm{E}\times\bm{P}-\underline{\frac{\mu_{0}}{2}\partial_{t}\bm{M}\times\bm{C}}}\\
&\quad{\color{Green}-\frac{1}{2}\nabla\cdot[-(\nabla\phi\cdot\bm{A})\mathcal{I}+\nabla\phi\bm{A}+\bm{A}\nabla\phi]+\frac{1}{2}(\nabla^2\phi)\bm{A}+\underline{\frac{\mu_{0}}{2}\bm{M}\times\nabla\phi}},
\end{aligned}
$$
以及
$$
\begin{aligned}
\partial_{t}\bm{L}&=\frac{\varepsilon_{0}}{2}({\color{Teal}(\partial_{t}E_i)(\bm{r}\times\nabla)A_i}+{\color{Salmon}E_i(\bm{r}\times\nabla)(\partial_{t}A_i)})+\frac{\mu_{0}}{2}({\color{Purple}(\partial_{t}H_i)(\bm{r}\times\nabla)C_{i}}+{\color{Green}H_i(\bm{r}\times\nabla)(\partial_{t}C_{i})})\\
&={\color{Teal}\frac{1}{2}(\nabla\times\bm{H}-\underline{\partial_{t}\bm{P}})_i(\bm{r}\times\nabla)A_i}+{\color{Salmon}\frac{\varepsilon_{0}}{2}E_i(\bm{r}\times\nabla)(-E_i-\nabla_i\varphi)}\\
&\quad+{\color{Purple}\frac{1}{2}(-\nabla\times\bm{E}-\underline{\mu_{0}\partial_{t}\bm{M}})_i(\bm{r}\times\nabla)C_i}+{\color{Green}\frac{\mu_{0}}{2}H_i(\bm{r}\times\nabla)(-H_i-\nabla_i\phi)}\\
&={\color{Teal}\frac{1}{2}[\nabla\cdot(\bm{H}\times(\bm{r}\times\nabla)\bm{A})+(\bm{H}\cdot\nabla)\bm{A}-\bm{H}(\nabla\cdot\bm{A})+H_i(\bm{r}\times\nabla)B_i]-\underline{\frac{1}{2}(\partial_{t}P_i)(\bm{r}\times\nabla)A_i}}\\
&\quad{\color{Salmon}-\frac{\varepsilon_{0}}{4}(\bm{r}\times\nabla)(\bm{E}^2)+\frac{1}{2}(\nabla\times\bm{C})_i(\bm{r}\times\nabla)\nabla_i\varphi+\underline{\frac{1}{2}P_i(\bm{r}\times\nabla)\nabla_i\varphi}}\\
&\quad{\color{Purple}-\frac{1}{2}[\nabla\cdot(\bm{E}\times(\bm{r}\times\nabla)\bm{C})+(\bm{E}\cdot\nabla)\bm{C}-\bm{E}(\nabla\cdot\bm{C})+E_i(\bm{r}\times\nabla)(\nabla\times\bm{C})_i]-\underline{\frac{\mu_{0}}{2}(\partial_{t}M_i)(\bm{r}\times\nabla)C_i}}\\
&\quad{\color{Green}-\frac{\mu_{0}}{4}(\bm{r}\times\nabla)(\bm{H}^2)-\frac{1}{2}(\nabla\times\bm{A})_i(\bm{r}\times\nabla)\nabla_i\phi+\underline{\frac{\mu_{0}}{2}M_i(\bm{r}\times\nabla)\nabla_i\phi}}\\
&={\color{Teal}\frac{1}{2}[\nabla\cdot(\bm{H}\times(\bm{r}\times\nabla)\bm{A})+\nabla\cdot(\bm{H}\bm{A})-(\nabla\cdot\bm{H})\bm{A}-(\nabla\cdot\bm{A})\bm{H}]}\\
&\quad{\color{Teal}+\frac{\mu_{0}}{4}(\bm{r}\times\nabla)(\bm{H}^2)+\frac{1}{2}\mu_{0}H_i(\bm{r}\times\nabla)M_i-\underline{\frac{1}{2}(\partial_{t}P_i)(\bm{r}\times\nabla)A_i}}\\
&\quad{\color{Salmon}-\frac{\varepsilon_{0}}{4}(\bm{r}\times\nabla)(\bm{E}^2)+\frac{1}{2}[\nabla\cdot(\bm{C}\times(\bm{r}\times\nabla)\nabla\varphi)+\nabla\cdot(\bm{C}\nabla\varphi)-(\nabla\cdot\bm{C})\nabla\varphi-\bm{C}(\nabla^2\varphi)]+\underline{\frac{1}{2}P_i(\bm{r}\times\nabla)\nabla_i\varphi}}\\
&\quad{\color{Purple}-\frac{1}{2}[\nabla\cdot(\bm{E}\times(\bm{r}\times\nabla)\bm{C})+\nabla\cdot(\bm{E}\bm{C})-(\nabla\cdot\bm{E})\bm{C}-(\nabla\cdot\bm{C})\bm{E}]}\\
&\quad{\color{Purple}+\frac{\varepsilon_{0}}{4}(\bm{r}\times\nabla)(\bm{E}^2)+\frac{1}{2}E_i(\bm{r}\times\nabla)P_i-\underline{\frac{\mu_{0}}{2}(\partial_{t}M_i)(\bm{r}\times\nabla)C_i}}\\
&\quad{\color{Green}-\frac{\mu_{0}}{4}(\bm{r}\times\nabla)(\bm{H}^2)-\frac{1}{2}[\nabla\cdot(\bm{A}\times(\bm{r}\times\nabla)\nabla\phi)+\nabla\cdot(\bm{A}\nabla\phi)-(\nabla\cdot\bm{A})\nabla\phi-\bm{A}(\nabla^2\phi)]+\underline{\frac{\mu_{0}}{2}M_i(\bm{r}\times\nabla)\nabla_i\phi}}\\
&={\color{Teal}\frac{1}{2}\nabla\cdot[\bm{H}\times(\bm{r}\times\nabla)\bm{A}+\bm{H}\bm{A}]+\frac{1}{2}(\nabla^2\phi)\bm{A}}{\color{Teal}+\frac{1}{2}\mu_{0}H_i(\bm{r}\times\nabla)M_i-\underline{\frac{1}{2}(\partial_{t}P_i)(\bm{r}\times\nabla)A_i}}\\
&\quad{\color{Salmon}+\frac{1}{2}\nabla\cdot[\bm{C}\times(\bm{r}\times\nabla)\nabla\varphi+\bm{C}\nabla\varphi]-\frac{1}{2}(\nabla^2\varphi)\bm{C}+\underline{\frac{1}{2}P_i(\bm{r}\times\nabla)\nabla_i\varphi}}\\
&\quad{\color{Purple}-\frac{1}{2}\nabla\cdot[\bm{E}\times(\bm{r}\times\nabla)\bm{C}+\bm{E}\bm{C}]-\frac{1}{2}(\nabla^2\varphi)\bm{C}}{\color{Purple}+\frac{1}{2}E_i(\bm{r}\times\nabla)P_i-\underline{\frac{\mu_{0}}{2}(\partial_{t}M_i)(\bm{r}\times\nabla)C_i}}\\
&\quad{\color{Green}-\frac{1}{2}\nabla\cdot[\bm{A}\times(\bm{r}\times\nabla)\nabla\phi+\bm{A}\nabla\phi]+\frac{1}{2}(\nabla^2\phi)\bm{A}+\underline{\frac{\mu_{0}}{2}M_i(\bm{r}\times\nabla)\nabla_i\phi}}
\end{aligned}
$$

$$
\leftBrace
&\partial_{t}\bm{S}+\nabla\cdot\Sigma=-\tau_{s}+\Delta_{c},\\
&\partial_{t}\bm{L}+\nabla\cdot\Lambda=-\tau_{o}-\Delta_{c}.
\rightEnd
$$

[^2]:Maxim Durach, Natalia Noginova. Spin angular momentum transfer and plasmogalvanic phenomena[J]. Phys Rev B. Nov 2017, 96:195411
