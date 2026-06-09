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
\frac{\partial f}{\partial y}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial f}{\partial \dot{y}}&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2y^{3/2}}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\dot{y}}{y^{1/2}\sqrt{1+\dot{y}^2}}\right)\\
&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2y^{3/2}}-\frac{\ddot{y}y^{1/2}\sqrt{1+\dot{y}^2}-\dot{y}(\dot{y}\sqrt{1+\dot{y}^2}/2y^{1/2}+\dot{y}\ddot{y}y^{1/2}/\sqrt{1+\dot{y}^2})}{y(1+\dot{y}^2)}\right)\\&=\frac{1}{\sqrt{2\mathrm{g}}}\left(-\frac{\sqrt{1+\dot{y}^2}}{2}y^{-3/2}-\frac{\ddot{y}y^{-1/2}}{\sqrt{1+\dot{y}^2}}+\frac{\dot{y}^2}{2\sqrt{1+\dot{y}^2}}y^{-3/2}+\frac{\dot{y}^2}{(1+\dot{y}^2)^{3/2}}\ddot{y}y^{-1/2}\right)\\
&=\frac{1}{\sqrt{2\mathrm{g}}}\left[\frac{y^{-3/2}}{2\sqrt{1+\dot{y}^2}}(-1-\dot{y}^2+\dot{y}^2)+\frac{\ddot{y}y^{-1/2}}{\sqrt{1+\dot{y}^2}}(-1+\dot{y}^2/(1+\dot{y}^2))\right]\\
&=-\frac{y^{-3/2}}{2\sqrt{2\mathrm{g}(1+\dot{y}^2)}}\left(1+\frac{2\ddot{y}y}{1+\dot{y}^2}\right)=0.
\end{aligned}
$$

求解微分方程

$$
\left\{\begin{aligned}
&1+2y\ddot{y}/(1+\dot{y}^2)=0,\\
&y(x_1)=y_1,\ y(x_2)=y_2.
\end{aligned}\right.
$$

因为
$$\ddot{y}=\dot{y}\frac{\mathrm{d}\dot{y}}{\mathrm{d}y},$$
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
&L=\frac{1}{2}m(\dot{x}^2+\dot{y}^2+\dot{z}^2)-m\mathrm{g} z,\\
&f(x,z)=x^2+z^2-r^2=0.
\end{aligned}
$$

拉格朗日方程

$$
\begin{aligned}
&\frac{\delta L}{\delta x}+\lambda\frac{\partial f}{\partial x}=-m\ddot{x}+2\lambda x=0,\\
&\frac{\delta L}{\delta z}+\lambda\frac{\partial f}{\partial z}=-m\mathrm{g}-m\ddot{z}+2\lambda z=0.
\end{aligned}
$$

令$x=r\cos\theta,\ z=r\sin\theta,$

$$
\begin{aligned}
\sin\theta\cdot \ddot{\theta}+\cos\theta\cdot\dot{\theta}^2+\frac{2\lambda}{m}\cos\theta&=0,\\
-\cos\theta\cdot\ddot{\theta}+\sin\theta\cdot\dot{\theta}^2-\frac{\mathrm{g}}{r}+\frac{2\lambda}{m}\sin\theta&=0.
\end{aligned}
$$

将第一式乘$\cos\theta$，第二式乘$\sin\theta$后相加

$$
\dot{\theta}^2+\frac{2\lambda}{m}-\frac{\mathrm{g}}{r}\sin\theta=0,\tag{1}
$$

类似地

$$
\ddot{\theta}+\frac{\mathrm{g}}{r}\cos\theta=0.
$$

注意$\dot{\theta}|_{\theta=\pi/2}=0$，积分得

$$
    \dot{\theta}^2=\frac{2\mathrm{g}}{r}(1-\sin\theta),
$$

带入(1)式得

$$
\lambda=\frac{m\mathrm{g}}{2r}(3\sin\theta-2),
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
-m\mathrm{g}-m\ddot{z}+\frac{2\lambda}{b^2}&=0.
\end{aligned}
$$

令$x=a\cos\theta,\ z=b\sin\theta,$

$$
\begin{aligned}
\sin\theta\cdot \ddot{\theta}+\cos\theta\cdot\dot{\theta}^2+\frac{2\lambda}{ma^2}\cos\theta&=0,\\
-\cos\theta\cdot\ddot{\theta}+\sin\theta\cdot\dot{\theta}^2-\frac{\mathrm{g}}{b}+\frac{2\lambda}{mb^2}\sin\theta&=0.
\end{aligned}
$$

得到

$$
\begin{aligned}
\dot{\theta}^2-\frac{\mathrm{g}}{b}\sin\theta+\frac{2\lambda}{m}\left(\frac{\cos^2\theta}{a^2}+\frac{\sin^2\theta}{b^2}\right)&=0,\\
\ddot{\theta}+\frac{\mathrm{g}}{b}\cos\theta+\frac{2\lambda}{m}\left(\frac{1}{a^2}-\frac{1}{b^2}\right)\sin\theta\cos\theta&=0.
\end{aligned}
$$

即

$$
\ddot{\theta}+\frac{\mathrm{g}}{b}\cos\theta+\frac{(a^2-b^2)\sin\theta\cos\theta}{a^2\sin^2\theta+b^2\cos^2\theta}\left(\dot{\theta}^2-\frac{\mathrm{g}}{b}\sin\theta\right)=0,
$$

记

$$
A(\theta)=a^2\sin^2\theta+b^2\cos^2\theta,
$$

则

$$
\begin{aligned}
&A(\theta)\ddot{\theta}+\frac{\mathrm{g}}{b}\left(A(\theta)\cos\theta-\frac{A'(\theta)}{2}\sin\theta\right)+\frac{A'(\theta)}{2}\dot{\theta}^2\\
=&A(\theta)\ddot{\theta}+\mathrm{g} b\cos\theta+\frac{A'(\theta)}{2}\dot{\theta}^2\\
=&\frac{\mathrm{d}}{\mathrm{d}\theta}\left(\frac{1}{2}A(\theta)\dot{\theta}^2+\mathrm{g} b\sin\theta\right)=0,
\end{aligned}
$$

故

$$
\dot{\theta}^2=\frac{2\mathrm{g} b(1-\sin\theta)}{A(\theta)}.
$$

$\lambda=0$时滑块滑落，此时

$$
    \frac{\mathrm{g}}{b}\sin\theta=\frac{2\mathrm{g} b(1-\sin\theta)}{A(\theta)},
$$

解得

$$
(a^2-b^2)\sin^3\theta_0+3b^2\sin\theta_0-2b^2=0.
$$

## 固有系中的加速度与速度

¶ 取实验室惯性系 $S$。质点世界线的四维坐标 $x^{\mu}=(ct,\bm{x})$，固有时

$$
\mathrm{d}\tau=\mathrm{d}t\sqrt{1-v^{2}/c^{2}}=\mathrm{d}t/\gamma,
$$

其中 $\bm{v}=\mathrm{d}\bm{x}/\mathrm{d}t$，$\gamma=1/\sqrt{1-v^{2}/c^{2}}$。

四维速度定义为

$$
u^{\mu}\equiv\frac{\mathrm{d}x^{\mu}}{\mathrm{d}\tau}=(\gamma c,\ \gamma\bm{v}),
$$

满足 $u^{\mu}u_{\mu}=c^{2}$。四维加速度定义为

$$
a^{\mu}\equiv\frac{\mathrm{d}u^{\mu}}{\mathrm{d}\tau}=\gamma\frac{\mathrm{d}u^{\mu}}{\mathrm{d}t}.
$$

由 $u^{\mu}u_{\mu}=c^{2}$ 求导得 $a^{\mu}u_{\mu}=0$，即四维加速度与四维速度恒正交。

质点在某一时刻的瞬时随动惯性系（固有系）$S_0$ 是与质点在该时刻相对静止的惯性系。在 $S_0$ 中，

$$
u^{\mu}=(c,\ \bm{0}),\qquad a^{\mu}=(0,\ \bm{\alpha}),
$$

其中 $\bm{\alpha}$ 称为固有加速度（proper acceleration），$a^{\mu}u_{\mu}=0$ 自动成立。由此得洛伦兹不变量

$$
a^{\mu}a_{\mu}=-\bm{\alpha}^{2}.
$$

以下推导 $\bm{\alpha}$ 与实验室系中 $\bm{a}\equiv\mathrm{d}\bm{v}/\mathrm{d}t$ 的关系。在实验室系，

$$
\begin{aligned}
a^{\mu}&=\gamma\frac{\mathrm{d}}{\mathrm{d}t}(\gamma c,\ \gamma\bm{v})\\
&=\left(\gamma\dot{\gamma}c,\ \gamma\dot{\gamma}\bm{v}+\gamma^{2}\bm{a}\right).
\end{aligned}
$$

由 $\dot{\gamma}=\gamma^{3}(\bm{v}\cdot\bm{a})/c^{2}$，

$$
a^{\mu}=\left(\frac{\gamma^{4}}{c}\bm{v}\cdot\bm{a},\ \frac{\gamma^{4}}{c^{2}}(\bm{v}\cdot\bm{a})\bm{v}+\gamma^{2}\bm{a}\right).
$$

将 $\bm{a}$ 分解为平行和垂直于速度的分量：

$$
\bm{a}_{\parallel}=\frac{\bm{v}\cdot\bm{a}}{v^{2}}\bm{v},\qquad \bm{a}_{\perp}=\bm{a}-\bm{a}_{\parallel},
$$

则

$$
a^{\mu}=\left(\frac{\gamma^{4}}{c}v a_{\parallel},\ \gamma^{4}a_{\parallel}\hat{\bm{v}}+\gamma^{2}\bm{a}_{\perp}\right).
$$

计算不变量：

$$
\begin{aligned}
\bm{\alpha}^{2}&=|a_{\text{空间}}|^{2}-(a^{0})^{2}\\
&=(\gamma^{8}a_{\parallel}^{2}+\gamma^{4}a_{\perp}^{2})-\frac{\gamma^{8}v^{2}}{c^{2}}a_{\parallel}^{2}\\
&=\gamma^{8}\left(1-\frac{v^{2}}{c^{2}}\right)a_{\parallel}^{2}+\gamma^{4}a_{\perp}^{2}\\
&=\gamma^{6}a_{\parallel}^{2}+\gamma^{4}a_{\perp}^{2},
\end{aligned}
$$

通过洛伦兹boost可得方向与上式一致，于是得到矢量关系

$$
\boxed{\bm{\alpha}=\gamma^{3}\bm{a}_{\parallel}+\gamma^{2}\bm{a}_{\perp}}.
$$

此即固有系加速度与实验室系速度、加速度的关系。等价形式为

$$
\boxed{\bm{\alpha}=\gamma^{2}\bm{a}+(\gamma^{3}-\gamma^{2})\frac{\bm{v}\cdot\bm{a}}{v^{2}}\bm{v}}.
$$

特例：（1）若 $\bm{a}\parallel\bm{v}$（直线加速），$\bm{\alpha}=\gamma^{3}\bm{a}$；（2）若 $\bm{a}\perp\bm{v}$（如匀速圆周运动），$\bm{\alpha}=\gamma^{2}\bm{a}$。

## 匀固有加速度直线运动

¶ 对上节直线加速情形，设固有加速度大小恒定 $\alpha=\text{const}$。由 $\bm{\alpha}=\gamma^{3}\bm{a}$，

$$
\alpha=\gamma^{3}\frac{\mathrm{d}v}{\mathrm{d}t}=\frac{\mathrm{d}}{\mathrm{d}t}(\gamma v),
$$

积分，设 $t=0$ 时 $v=0$，得

$$
\gamma v=\alpha t.
$$

由此

$$
\frac{v^{2}}{1-v^{2}/c^{2}}=\alpha^{2}t^{2}\quad\Longrightarrow\quad
\boxed{v=\frac{\alpha t}{\sqrt{1+(\alpha t/c)^{2}}}}.
$$

改用固有时 $\tau$（$\mathrm{d}\tau=\mathrm{d}t/\gamma$）。由 $\gamma v=\alpha t$ 得

$$
\gamma=\sqrt{1+(\alpha t/c)^{2}},\qquad
\mathrm{d}\tau=\frac{\mathrm{d}t}{\gamma}=\frac{\mathrm{d}t}{\sqrt{1+(\alpha t/c)^{2}}}.
$$

积分得

$$
\tau=\frac{c}{\alpha}\operatorname{arsinh}\frac{\alpha t}{c}\quad\Longrightarrow\quad
\frac{\alpha t}{c}=\sinh\frac{\alpha\tau}{c},
$$

于是

$$
\gamma=\cosh\frac{\alpha\tau}{c},\qquad
\gamma\frac{v}{c}=\sinh\frac{\alpha\tau}{c},
$$

相除即得速度-时间双曲正切关系

$$
\boxed{v=c\tanh\frac{\alpha\tau}{c}}.
$$

此即匀固有加速运动中速度与固有时的关系。

对固有时积分得世界线：

$$
x=\int v\,\mathrm{d}t=\int_{0}^{\tau}c\tanh\frac{\alpha\tau'}{c}\cdot\cosh\frac{\alpha\tau'}{c}\,\mathrm{d}\tau'
=\frac{c^{2}}{\alpha}\left(\cosh\frac{\alpha\tau}{c}-1\right),
$$

或用实验室时表示为

$$
x=\frac{c^{2}}{\alpha}\left(\sqrt{1+\left(\frac{\alpha t}{c}\right)^{2}}-1\right),
$$

即双曲线 $(x+c^{2}/\alpha)^{2}-c^{2}t^{2}=(c^{2}/\alpha)^{2}$。

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

¶取正交坐标系$\{q^1,q^2,q^3\}$，定义拉梅系数

$$
h_i=\left|\frac{\partial \bm{r}}{\partial q^i}\right|,
$$

定义单位向量

$$
\hat{\bm{e}}_{q^i}=\frac{1}{h_i}\frac{\partial \bm{r}}{\partial q^i}.
$$

考察全微分

$$
\mathrm{d}\varphi=\frac{\partial \varphi}{\partial q^i}\mathrm{d} q^i,
$$

又

$$
\mathrm{d}\varphi=\nabla\varphi\cdot\mathrm{d}\bm{r}=(\nabla\varphi)_{q^i}\hat{\bm{e}}_{q^i}\cdot h_{j}\mathrm{d} q^j\hat{\bm{e}}_{q^j}=h_i(\nabla\varphi)_{q^i}\mathrm{d} q^i,
$$

得到

$$
\nabla=\frac{1}{h_i}\frac{\partial }{\partial q^i}\hat{\bm{e}}_{q^i}.
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
&=\frac{1}{h_ih_jh_k}\frac{\partial h_jh_kA_{q^i}}{\partial q^i}.
\end{aligned}
$$

考察旋度

$$
\begin{aligned}
\nabla\times\bm{A}&=\nabla\times(h_iA_{q^i}\nabla q^i)\\
&=\nabla(h_iA_{q^i})\times\nabla q^i+h_iA_{q^i}\nabla\times\nabla q^i\\
&=\frac{\partial h_iA_{q^i}}{\partial q^j}\nabla q^j\times\nabla q^i\\
&=-\frac{1}{h_ih_jh_k}\frac{\partial h_iA_{q^i}}{\partial q^j}h_k\hat{\bm{e}}_{q^k}\\
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

$$
\begin{aligned}
&D_{x}^{(\text{i,t})}=\varepsilon E_{p}^{(\text{i,t})}\cos\theta_{i,t},\\
&D_{x}^{(\text{r})}=-\varepsilon E_{p}^{(\text{r})}\cos\theta_{r},\\
&D_{y}=-\varepsilon E_{s},\\
&D_{z}=\varepsilon E_{p}\sin\theta
\end{aligned}
$$

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
\sum_{i}\mathrm{d} T_{i}&=\sum_{i}\left(\bm{F}_{i}+\sum_{j}\bm{f}_{ij}\right)\cdot\mathrm{d}\bm{r}_{i}\\
&=\sum_{i}W_{i}+\sum_{i\neq j}\bm{f}_{ij}\cdot\mathrm{d}\bm{r}_{i}\\
&=\sum_{i}W_{i}+\frac{1}{2}\sum_{i\neq j}(\bm{f}_{ij}\cdot\mathrm{d}\bm{r}_{i}+\bm{f}_{ji}\cdot\mathrm{d}\bm{r}_{j})\\
&=\sum_{i}W_{i}+\frac{1}{2}\sum_{i\neq j}\bm{f}_{ij}\cdot\mathrm{d}\bm{r}_{ij}
\end{aligned}
$$

$$
\bm{J}=\sum_{i}(\bm{R}+\bm{r}')\times m_{i}(\dot{\bm{R}}+\dot{\bm{r}}')=\bm{J}_{c}+\bm{J}'
$$

¶通过改写作用量

$$
S=\int^{t_{2}}_{t_{1}}L(q^{j},\dot{q}^{j},t)\mathrm{d} t=\int^{\tau_{2}}_{\tau_{1}}L\left(q^{j},t,\frac{1}{\frac{\mathrm{d}t}{\mathrm{d}\tau}}\frac{\mathrm{d}q^{j}}{\mathrm{d}\tau}\right)\frac{\mathrm{d}t}{\mathrm{d}\tau}\mathrm{d}\tau,
$$

证明时间平移对称性对应的不变量是能量.

## 线性多普勒效应的悖论

¶ 狭义相对论中，设光源在惯性系 $K_0$ 中静止，发出角频率为 $\omega_0$ 的单色光，波矢 $\bm{k}_0$ 与 $+x$ 轴夹角记为 $\theta_0$。$K$ 系以速度 $v$ 沿 $+x$ 方向相对 $K_0$ 运动。四维波矢

$$
k^{\mu}=(\omega/c,\ \bm{k}),\qquad k^{\mu}k_{\mu}=0,
$$

在洛伦兹boost下按四矢量变换：

$$
\omega=\gamma(\omega_0+vk_{0x})=\gamma\omega_0(1+\beta\cos\theta_0),
$$

其中 $\beta=v/c$，$\gamma=1/\sqrt{1-\beta^{2}}$。此即相对论线性多普勒效应的常用形式。若改用 $K$ 系中的观测角 $\theta$，由光行差关系也有等价形式

$$
\boxed{\omega=\frac{\omega_0}{\gamma(1-\beta\cos\theta)}}.
$$

现在考虑如下往返变换：

$$
K_0\xrightarrow{+v}K\xrightarrow{-v}K_0.
$$

**矛盾陈述**：在 $K_0\to K$ 中应用上式的角度形式

$$
\omega'=\frac{\omega_0}{\gamma(1-\beta\cos\theta)}\quad(\text{或 }\omega'=\gamma\omega_0(1+\beta\cos\theta_0)),
$$

在 $K\to K_0$ 中若**错误地**仍使用原系 $K_0$ 的角度 $\theta_0$（即以为boost $-v$ 时只需反转 $\beta$ 的符号而不改变角度），则

$$
\omega''\overset{?}{=}\gamma\omega'(1-\beta\cos\theta_0)=\gamma^{2}(1-\beta^{2}\cos^{2}\theta_0)\,\omega_0\neq\omega_0,
$$

或者直接从 $K$ 系的角度形式出发，若两次使用相同的 $\cos\theta$，则

$$
\omega''\overset{?}{=}\gamma^{2}(1-\beta\cos\theta)^{2}\omega_0\neq\omega_0.
$$

这与物理事实矛盾——返回原系理应恢复原频率 $\omega_0$。

**矛盾的根源——光行差**：问题的关键在于，每次洛伦兹变换不仅改变频率，也改变光线的方向。$K_0\to K$ 时，光行差（aberration）公式为

$$
\cos\theta'=\frac{\cos\theta_0+\beta}{1+\beta\cos\theta_0},
$$

或以 $K$ 系中的观测角 $\theta$ 表示

$$
\cos\theta=\frac{\cos\theta_0+\beta}{1+\beta\cos\theta_0}.
$$

**矛盾消解**：在回程 $K\to K_0$（boost $-v$）中，多普勒公式必须使用 $K$ 系中的角度 $\theta'$（而非 $K_0$ 系中的 $\theta_0$）：

$$
\begin{aligned}
\omega''&=\gamma\omega'(1-\beta\cos\theta')\\
&=\gamma\cdot\gamma\omega_0(1+\beta\cos\theta_0)\cdot\left(1-\beta\frac{\cos\theta_0+\beta}{1+\beta\cos\theta_0}\right)\\
&=\gamma^{2}\omega_0(1+\beta\cos\theta_0)\cdot\frac{1+\beta\cos\theta_0-\beta\cos\theta_0-\beta^{2}}{1+\beta\cos\theta_0}\\
&=\gamma^{2}\omega_0(1-\beta^{2})=\omega_0.
\end{aligned}
$$

频率正确恢复。

**四维波矢观点**：用四维波矢 $k^{\mu}$ 处理则无此"悖论"。洛伦兹boost是四维时空的线性变换：

$$
k'^{\mu}=\Lambda^{\mu}_{\ \nu}(v)\,k^{\nu},
$$

两个相继的boost自动满足 $\Lambda(-v)\Lambda(v)=I$，因此 $k^{\mu}$ 回到原值，$\omega$ 自然也恢复。所谓的"悖论"本质上是在第二次变换中**忘了角度也是被变换量**——只对标量 $\omega$ 做了手脚，而没有把 $\bm{k}$ 的方向一并更新。四维矢量形式天然避免了这个错误。

## Homework

```
$$
\left(\begin{matrix}3&1\\0&3\end{matrix}\right)
$$
```

```
finish the multiply table of D4
```
