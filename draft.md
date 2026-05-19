# 草稿

## 角动量的转动惯量表示

$$
    \begin{aligned}
    \bm{L}&=\sum_{i}m^{(i)}\bm{r}^{(i)}\times(\omega\times\bm{r}^{(i)})\\
    &=\left(\sum_{i}m^{(i)}(r^{(i)})^2\right)\omega-\sum_{i}m^{(i)}\bm{r}^{(i)}(\omega\cdot\bm{r}^{(i)})\\
    &=\left(\sum_{i}m^{(i)}(r^{(i)})^2\right)\omega^{k}\hat{\bm{e}}_{k}-\sum_{i}m^{(i)}\omega^{j}r^{(i)}_{j}(r^{(i)})^{k}\hat{\bm{e}}_{k}\\
    &=\left(\sum_{i}m^{(i)}\left[\delta_{kj}(r^{(i)})^2-r^{(i)}_{j}(r^{(i)})^{k}\right]\right)\omega^{j}\hat{\bm{e}}_{k}\\
    &\equiv\bm{I}\cdot\omega.
    \end{aligned}
$$

## 最速降线

$$
\begin{aligned}
J&=\int_{1}^{2}\frac{\mathrm{d}s}{v}=\int_{x_1}^{x_2}\frac{\sqrt{1+\dot{y}^2}}{\sqrt{2\mathrm{g}y}}\ \mathrm{d}x\equiv\int_{x_1}^{x_2}f(y,\dot{y},x)\ \mathrm{d}x,
\end{aligned}
$$
根据拉普拉斯方程
$$
\begin{aligned}
\part{f}{y}-\deri{}{x}\part{f}{\dot{y}}&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2y^{3/2}}-\deri{}{x}\frac{\dot{y}}{y^{1/2}\sqrt{1+\dot{y}^2}}\right)\\
&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2y^{3/2}}-\frac{\ddot{y}y^{1/2}\sqrt{1+\dot{y}^2}-\dot{y}(\dot{y}\sqrt{1+\dot{y}^2}/2y^{1/2}+\dot{y}\ddot{y}y^{1/2}/\sqrt{1+\dot{y}^2})}{y(1+\dot{y}^2)}\right)\\&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2}y^{-3/2}-\frac{\ddot{y}y^{-1/2}}{\sqrt{1+\dot{y}^2}}+\frac{\dot{y}^2}{2\sqrt{1+\dot{y}^2}}y^{-3/2}+\frac{\dot{y}^2}{(1+\dot{y}^2)^{3/2}}\ddot{y}y^{-1/2}\right)\\
&=\frac{1}{\sqrt{2\mathrm{g}}}\left[\frac{y^{-3/2}}{2\sqrt{1+\dot{y}^2}}(-1-\dot{y}^2+\dot{y}^2)+\frac{\ddot{y}y^{-1/2}}{\sqrt{1+\dot{y}^2}}(-1+\dot{y}^2/(1+\dot{y}^2))\right]\\
&=-\frac{y^{-3/2}}{2\sqrt{2\mathrm{g}(1+\dot{y}^2)}}\left(1+\frac{2\ddot{y}y}{1+\dot{y}^2}\right)=0.
\end{aligned}
$$
求解微分方程
$$
\leftBrace
&1+2y\ddot{y}/(1+\dot{y}^2)=0,\\
&y(x_1)=y_1,\ y(x_2)=y_2.
\rightEnd
$$
因为
$$\ddot{y}=\dot{y}\deri{\dot{y}}{y},$$
方程化为
$$
\frac{\mathrm{d}y}{y}+\frac{2\dot{y}\mathrm{d}\dot{y}}{1+\dot{y}^2}=0,
$$
即
$$
1+\dot{y}^2=\frac{C}{y}\Longleftrightarrow
x=\int\sqrt{\frac{y}{C-y}}\ \mathrm{d}y.
$$
令
$$
y=\frac{C}{2}(1-\cos\theta),
$$
则
$$
x=\int\sqrt{\frac{1-\cos\theta}{1+\cos\theta}}\ \frac{C}{2}\sin\theta\mathrm{d}\theta=C\int\sin^2\frac{\theta}{2}\ \mathrm{d}\theta=\frac{C}{2}(\theta-\sin\theta)+C'.
$$

## 半圆形坡面滑落

$$
\begin{aligned}
&L=\frac{1}{2}m(\dot{x}^2+\dot{y}^2+\dot{z}^2)-m\upg z,\\
&f(x,z)=x^2+z^2-r^2=0.
\end{aligned}
$$
拉格朗日方程
$$
\begin{aligned}
&\delt{L}{x}+\lambda\part{f}{x}=-m\ddot{x}+2\lambda x=0,\\
&\delt{L}{z}+\lambda\part{f}{z}=-m\upg-m\ddot{z}+2\lambda z=0.
\end{aligned}
$$
令$x=r\cos\theta,\ z=r\sin\theta,$
$$
\begin{aligned}
\sin\theta\cdot \ddot{\theta}+\cos\theta\cdot\dot{\theta}^2+\frac{2\lambda}{m}\cos\theta&=0,\\
-\cos\theta\cdot\ddot{\theta}+\sin\theta\cdot\dot{\theta}^2-\frac{\upg}{r}+\frac{2\lambda}{m}\sin\theta&=0.
\end{aligned}
$$
将第一式乘$\cos\theta$，第二式乘$\sin\theta$后相加
$$
\dot{\theta}^2+\frac{2\lambda}{m}-\frac{\upg}{r}\sin\theta=0,\tag{1}
$$
类似地
$$
\ddot{\theta}+\frac{\upg}{r}\cos\theta=0.
$$
注意$\dot{\theta}|_{\theta=\pi/2}=0$，积分得
$$
    \dot{\theta}^2=\frac{2\upg}{r}(1-\sin\theta),
$$
带入(1)式得
$$
\lambda=\frac{m\upg}{2r}(3\sin\theta-2),
$$
因为$2\lambda r$是约束力，故$\lambda=0$时滑块脱离坡面，此时$\sin\theta_0=2/3$.

## 椭圆形坡面滑落

若在上一例中
$$
f(x,z)=\frac{x^2}{a^2}+\frac{z^2}{b^2}-1=0.
$$
则
$$
\begin{aligned}
-m\ddot{x}+\frac{2\lambda}{a^2}x&=0,\\
-m\upg-m\ddot{z}+\frac{2\lambda}{b^2}&=0.
\end{aligned}
$$
令$x=a\cos\theta,\ z=b\sin\theta,$
$$
\begin{aligned}
\sin\theta\cdot \ddot{\theta}+\cos\theta\cdot\dot{\theta}^2+\frac{2\lambda}{ma^2}\cos\theta&=0,\\
-\cos\theta\cdot\ddot{\theta}+\sin\theta\cdot\dot{\theta}^2-\frac{\upg}{b}+\frac{2\lambda}{mb^2}\sin\theta&=0.
\end{aligned}
$$
得到
$$
\begin{aligned}
\dot{\theta}^2-\frac{\upg}{b}\sin\theta+\frac{2\lambda}{m}\left(\frac{\cos^2\theta}{a^2}+\frac{\sin^2\theta}{b^2}\right)&=0,\\
\ddot{\theta}+\frac{\upg}{b}\cos\theta+\frac{2\lambda}{m}\left(\frac{1}{a^2}-\frac{1}{b^2}\right)\sin\theta\cos\theta&=0.
\end{aligned}
$$
即
$$
\ddot{\theta}+\frac{\upg}{b}\cos\theta+\frac{(a^2-b^2)\sin\theta\cos\theta}{a^2\sin^2\theta+b^2\cos^2\theta}\left(\dot{\theta}^2-\frac{\upg}{b}\sin\theta\right)=0,
$$
记
$$
A(\theta)=a^2\sin^2\theta+b^2\cos^2\theta,
$$
则
$$
\begin{aligned}
&A(\theta)\ddot{\theta}+\frac{\upg}{b}\left(A(\theta)\cos\theta-\frac{A'(\theta)}{2}\sin\theta\right)+\frac{A'(\theta)}{2}\dot{\theta}^2\\
=&A(\theta)\ddot{\theta}+\upg b\cos\theta+\frac{A'(\theta)}{2}\dot{\theta}^2\\
=&\deri{}{\theta}\left(\frac{1}{2}A(\theta)\dot{\theta}^2+\upg b\sin\theta\right)=0,
\end{aligned}
$$
故
$$
\dot{\theta}^2=\frac{2\upg b(1-\sin\theta)}{A(\theta)}.
$$
$\lambda=0$时滑块滑落，此时
$$
    \frac{\upg}{b}\sin\theta=\frac{2\upg b(1-\sin\theta)}{A(\theta)},
$$
解得
$$
(a^2-b^2)\sin^3\theta_0+3b^2\sin\theta_0-2b^2=0.
$$

## 矢量分析

### $\varepsilon_{ijk}\varepsilon^{lmk}$

考虑置换
$$
p,q\in S_{n},
$$
定义广义kronecket delta
$$
\delta_{i_1\cdots i_n}^{j_1\cdots j_n}=\det\left(\begin{matrix}\delta_{i_1}^{j_1}&\cdots&\delta_{i_1}^{j_n}\\
\vdots&\ddots&\vdots\\\delta_{i_n}^{j_1}&\cdots&\delta_{i_n}^{j_n}\end{matrix}\right),
$$
若
$$
i_\alpha=p(\alpha),\ j_\alpha=q(\alpha),\quad \alpha=1,\cdots,n,
$$
故
$$
\delta_{p(\alpha)}^{q(\alpha)}=q_{\text{col}}\circ p_{\text{row}}(E_n)=P_{p}E_{n}Q_{q},\quad E_n \text{是}n\text{阶单位矩阵},P,Q\text{分别表示行、列置换矩阵},
$$
那么
$$
\delta_{p(\alpha)}^{q(\alpha)}=\text{sgn}(q)\text{sgn}(p)=\varepsilon^{q(\alpha)}\varepsilon_{p(\alpha)}.
$$
故
$$
\varepsilon_{ijk}\varepsilon^{lmk}=\delta_{ijk}^{lmk}=\delta_{ij}^{lm}=\delta_{i}^{l}\delta_{j}^{m}-\delta_{i}^{m}\delta_{j}^{l}.
$$

### $\nabla(\bm{A}\cdot\bm{B})$

$$
\begin{aligned}
\nabla(\bm{A}\cdot\bm{B})&=A_j\partial_iB_j\hat{\bm{e}}_i+B_j\partial_iA_j\hat{\bm{e}}_i
\end{aligned}
$$
又
$$
\begin{aligned}
\bm{A}\times(\nabla\times\bm{B})&=\bm{A}\times\varepsilon_{ijk}\partial_i B_j\hat{\bm{e}}_k\\
&=\varepsilon_{lkm}\varepsilon_{ijk}A_l\partial_iB_j\hat{\bm{e}}_m\\
&=(\delta_{im}\delta_{jl}-\delta_{il}\delta_{jm})A_l\partial_iB_j\hat{\bm{e}}_m\\
&=A_j\partial_iB_j\hat{\bm{e}}_i-A_i\partial_{i}B_j\hat{\bm{e}}_j\\
&=A_j\partial_iB_j\hat{\bm{e}}_i-(\bm{A}\cdot\nabla)\bm{B},
\end{aligned}
$$
故
$$
    \nabla(\bm{A}\cdot\bm{B})=\bm{A}\times\nabla\times\bm{B}+(\bm{A}\cdot\nabla)\bm{B}+\bm{B}\times\nabla\times\bm{A}+(\bm{B}\cdot\nabla)\bm{A}.
$$

### $\nabla\times(\varphi\bm{A})$

$$
\begin{aligned}
\nabla\times(\varphi\bm{A})&=\partial_{i}(\varphi A_j)\hat{\bm{e}}_k\\
&=\varphi\nabla\times\bm{A}+\nabla\varphi\times\bm{A}.
\end{aligned}
$$

## 正交坐标系中的微分算子

\par取正交坐标系$\{q^1,q^2,q^3\}$，定义拉梅系数
$$
h_i=\left|\part{\bm{r}}{q^i}\right|,
$$
定义单位向量
$$
\hat{\bm{e}}_{q^i}=\frac{1}{h_i}\part{\bm{r}}{q^i}.
$$
考察全微分
$$
\upd\varphi=\part{\varphi}{q^i}\upd q^i,
$$
又
$$
\upd\varphi=\nabla\varphi\cdot\upd\bm{r}=(\nabla\varphi)_{q^i}\hat{\bm{e}}_{q^i}\cdot h_{j}\upd q^j\hat{\bm{e}}_{q^j}=h_i(\nabla\varphi)_{q^i}\upd q^i,
$$
得到
$$
\nabla=\frac{1}{h_i}\part{}{q^i}\hat{\bm{e}}_{q^i}.
$$
从中也可得到
$$
\hat{\bm{e}}_{q^i}=h_i\nabla q^i,
$$
以及
$$
\hat{\bm{e}}_{q^i}=\hat{\bm{e}}_{q^j}\times\hat{\bm{e}}_{q^k}=h_jh_k\nabla q^j\times\nabla q^k,\quad \text{其中}\varepsilon_{ijk}=1.
$$
考察散度
$$
\begin{aligned}
\nabla\cdot\bm{A}&=\nabla\cdot(A_{q^i}\hat{\bm{e}}_{q^i})\\
&=\nabla\cdot(h_jh_kA_{q^i}\nabla q^j\times\nabla q^k)\\
&=\nabla(h_jh_kA_{q^i})\cdot\nabla q^j\times\nabla q^k+h_jh_kA_{q^i}\nabla\cdot(\nabla q^j\times\nabla q^k)\\
&=\frac{1}{h_ih_jh_k}\part{h_jh_kA_{q^i}}{q^i}.
\end{aligned}
$$
考察旋度
$$
\begin{aligned}
\nabla\times\bm{A}&=\nabla\times(h_iA_{q^i}\nabla q^i)\\
&=\nabla(h_iA_{q^i})\times\nabla q^i+h_iA_{q^i}\nabla\times\nabla q^i\\
&=\part{h_iA_{q^i}}{q^j}\nabla q^j\times\nabla q^i\\
&=-\frac{1}{h_ih_jh_k}\part{h_iA_{q^i}}{q^j}h_k\hat{\bm{e}}_{q^k}\\
&=\frac{1}{h_1h_2h_3}\left|\begin{matrix}
\partial_{q^1}&\partial_{q^2}&\partial_{q^3}\\
h_1A_{q^1}&h_2A_{q^2}&h_3A_{q^3}\\
h_1\hat{\bm{e}}_{q^1}&h_2\hat{\bm{e}}_{q^2}&h_3\hat{\bm{e}}_{q^3}
\end{matrix}\right|.
\end{aligned}
$$

## *Hermitian*矩阵

$$
\langle\bm{a},\bm{H}\bm{b}\rangle=\langle\bm{H}\bm{a},\bm{b}\rangle\Longleftrightarrow\bm{H}=\bm{H}^{\dag},
$$
特征值满足
$$
\bm{H}\bm{v}=\lambda\bm{v},
$$
左乘$\bm{v}^{\dag}$
$$
\bm{v}^{\dag}\bm{H}\bm{v}=\bm{v}^{\dag}\bm{H}^{\dag}\bm{v}\Longrightarrow\lambda\|\bm{v}\|=\bar{\lambda}\|\bm{v}\|,
$$
故特征值为实数.

## 电偶极子的电场

$$
\begin{aligned}
\hat{\bm{e}}_{d}&=\frac{1}{4\pi\varepsilon_{0}}\nabla\left(\bm{p}\cdot\nabla\frac{1}{r}\right)\\
&=-\frac{1}{4\pi\varepsilon_{0}}\nabla\frac{p_{i}x_{i}}{r^3}\\
&=-\frac{1}{4\pi\varepsilon_{0}}\frac{\delta_{ij}p_{i}r^3-p_{i}x_{i}\cdot3r^2\frac{x_{j}}{r}}{r^6}\hat{\hat{\bm{e}}}_{j}\\
&=-\frac{1}{4\pi\varepsilon_{0}}\frac{\delta_{ij}p_{i}r^2-3p_{i}x_{i}x_{j}}{r^5}\hat{\hat{\bm{e}}}_{j}\\
&=\frac{1}{4\pi\varepsilon_{0}}\frac{3(\bm{p}\cdot\hat{\bm{r}})\hat{\bm{r}}-\bm{p}}{r^3}.
\end{aligned}
$$

## ans

$$
\varepsilon_{0}(1+\chi_{e})=\varepsilon\Longrightarrow\bm{P}=\varepsilon_{0}\chi_{e}\hat{\bm{e}}
$$
$$
\begin{aligned}
(\nabla\times\bm{A})\times\bm{B}&=\varepsilon_{ijk}\varepsilon_{klm}(\partial_{i}A_{j})B_{l}\hat{\hat{\bm{e}}}_{m}\\
&=(\partial_{i}A_{j})B_{i}\hat{\hat{\bm{e}}}_{j}-(\partial_{i}A_{j})B_{j}\hat{\hat{\bm{e}}}_{i}\\
&=(\bm{B}\cdot\nabla)\bm{A}-\nabla_{\bm{A}}(\bm{A}\cdot\bm{B})
\end{aligned}
$$
$$
\begin{aligned}
\nabla\cdot(\bm{J}\bm{r}'\bm{r}')&=\partial_{i}(J_{i}x'_{j}x'_{k})\hat{\bm{e}}_{j}\hat{\bm{e}}_{k}\\
&=(\nabla\cdot\bm{J})\bm{r}'\bm{r}'+\bm{J}\bm{r}'+\bm{r}'\bm{J}
\end{aligned}
$$
$$
\begin{aligned}
\nabla\times(\bm{A}\times\bm{B})&=\varepsilon_{ijk}\varepsilon_{lmj}\partial_{i}(A_{l}B_{m})\hat{\bm{e}}_{k}\\
&=\partial_{i}(A_{k}B_{i})\hat{\bm{e}}_{k}-\partial_{i}(A_{i}B_{k})\hat{\bm{e}}_{k}\\
&=(\nabla\cdot\bm{B})\bm{A}+(\bm{B}\cdot\nabla)\bm{A}-(\nabla\cdot\bm{A})\bm{B}-(\bm{A}\cdot\nabla)\bm{B}
\end{aligned}
$$
$$\begin{aligned}
&D_{x}^{(\text{i,t})}=\varepsilon E_{p}^{(\text{i,t})}\cos\theta_{i,t},\\
&D_{x}^{(\text{r})}=-\varepsilon E_{p}^{(\text{r})}\cos\theta_{r},\\
&D_{y}=-\varepsilon E_{s},\\
&D_{z}=\varepsilon E_{p}\sin\theta
\end{aligned}$$
$$
P_{j}=(\mathcal{T}_{3j}^{(\text{t})}-\mathcal{T}_{3j}^{(\text{i})}-\mathcal{T}_{3j}^{(\text{r})})\hat{\bm{e}}_{j}
$$

$$
\begin{aligned}
(\nabla\times\bm{A})_{i}(\bm{r}\times\nabla)B_{i}=\varepsilon_{ijk}\varepsilon_{lmn}(\partial_{j}A_{k})x_{l}\partial_{m}B_{i}\hat{\bm{e}}_{n}
\end{aligned}
$$
$$
\begin{aligned}
\sum_{i}\upd T_{i}&=\sum_{i}\left(\bm{F}_{i}+\sum_{j}\bm{f}_{ij}\right)\cdot\upd\bm{r}_{i}\\
&=\sum_{i}W_{i}+\sum_{i\neq j}\bm{f}_{ij}\cdot\upd\bm{r}_{i}\\
&=\sum_{i}W_{i}+\frac{1}{2}\sum_{i\neq j}(\bm{f}_{ij}\cdot\upd\bm{r}_{i}+\bm{f}_{ji}\cdot\upd\bm{r}_{j})\\
&=\sum_{i}W_{i}+\frac{1}{2}\sum_{i\neq j}\bm{f}_{ij}\cdot\upd\bm{r}_{ij}
\end{aligned}
$$
$$
\bm{J}=\sum_{i}(\bm{R}+\bm{r}')\times m_{i}(\dot{\bm{R}}+\dot{\bm{r}}')=\bm{J}_{c}+\bm{J}'
$$
\par通过改写作用量
$$
S=\int^{t_{2}}_{t_{1}}L(q^{j},\dot{q}^{j},t)\upd t=\int^{\tau_{2}}_{\tau_{1}}L\left(q^{j},t,\frac{1}{\deri{t}{\tau}}\deri{q^{j}}{\tau}\right)\deri{t}{\tau}\upd\tau,
$$
证明时间平移对称性对应的不变量是能量.
