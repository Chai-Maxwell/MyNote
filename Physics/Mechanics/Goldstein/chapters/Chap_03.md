# 向心力问题

## 双质点系统

¶定义质心位矢$\bm{R}=(m_{1}\bm{r}_{1}+m_{2}\bm{r}_{2})/(m_{1}+m_{2})$和差位矢$\bm{r}=\bm{r}_{2}-\bm{r}_{1}$，则

$$
\begin{aligned}
T&=\frac{1}{2}(m_{1}\dot{\bm{r}}_{1}^2+m_{2}\dot{\bm{r}}_{2}^{2})\\
&=\frac{1}{2}\left[m_{1}\left(\dot{\bm{R}}-\frac{m_{2}}{m_{1}+m_{2}}\dot{\bm{r}}\right)^2+m_{2}\left(\dot{\bm{R}}+\frac{m_{1}}{m_{1}+m_{2}}\dot{\bm{r}}\right)^2\right]\\
&=\frac{1}{2}(m_{1}+m_{2})\dot{\bm{R}}^2+\frac{1}{2}\frac{m_{1}m_{2}}{m_{1}+m_{2}}\dot{\bm{r}}^2\equiv\frac{1}{2}M\dot{\bm{R}}^2+\frac{1}{2}\mu\dot{\bm{r}}^2.
\end{aligned}
$$

¶假设两质点间为向心力，即服从强作用与反作用定理.选定一点为原点，考察另一点的运动

$$
L=\frac{1}{2}m(\dot{r}^2+r^2\dot{\theta}^2)-V(r),
$$

立刻得到角动量守恒

$$
p_{\theta}=\frac{\partial L}{\partial \dot{\theta}}=mr^2\dot{\theta}=l,
$$

也有能量守恒

$$
\begin{equation}
\dot{r}\frac{\partial L}{\partial \dot{r}}+\dot{\theta}\frac{\partial L}{\partial \dot{\theta}}-L=\frac{1}{2} m\dot{r}^2+\frac{l^2}{2mr^2}+V(r)=E.
\end{equation}
$$

¶求解轨迹$r(\theta)$时作代换

$$
\frac{\mathrm{d}}{\mathrm{d}t}=\dot{\theta}\frac{\mathrm{d}}{\mathrm{d}\theta}=\frac{l}{mr^2}\frac{\mathrm{d}}{\mathrm{d}\theta},
$$

得到

$$
\begin{equation}\color{Teal}
\mathrm{d}\theta=\frac{l\mathrm{d} r}{mr^2\sqrt{\frac{2}{m}(E-V(r)-\frac{l^2}{2mr^2})}}.\end{equation}
$$

## *Virial*定理

¶考虑

$$
\frac{\mathrm{d}}{\mathrm{d}t}(\bm{r}^{(i)}\cdot\bm{p}^{(i)})=2T+\bm{r}^{(i)}\cdot\bm{F}^{(i)},
$$

取其在$[0,\tau]$时间的平均

$$
2\langle T\rangle+\langle\bm{r}^{(i)}\cdot\bm{F}^{(i)}\rangle=\frac{1}{\tau}(\bm{r}^{(i)}\cdot\bm{p}^{(i)})|_{0}^{\tau},
$$

对于封闭系统式子右侧随$\tau\to\infty$趋于零，得到

$$
\color{Teal}
\langle T\rangle=\underset{\text{the virial of \textit{Clausius}}}{\underline{-\frac{1}{2}\langle\bm{r}^{(i)}\cdot\bm{F}^{(i)}\rangle}},
$$

应用见[推导理想气体状态方程](/Physics/Mechanics/Goldstein/examples/Chap_03.md#推导理想气体状态方程).
¶特别地，对于单质点系统，且受向心力$-\partial V/\partial r=ar^{n}$

$$
\begin{equation}
\langle T\rangle=\frac{n+1}{2}\langle V\rangle.
\end{equation}
$$

## *Bertrand*定理

¶形成稳定的有界轨道，要求等效势能有最小值

$$
V_{\text{eff}}(r)=\frac{l^2}{2mr^2}+V(r),
$$

即

$$
\exist r_{0},\ \text{s.t.}\ V_{\text{eff}}'(r_{0})=0\ \text{and}\ V_{\text{eff}}''(r_{0})>0,
$$

得到

$$
V'(r_{0})=\frac{l^2}{mr_{0}^3}\ \text{and}\ V''(r_{0})>-\frac{3l^2}{mr_{0}^{4}}=-\frac{3V'(r_{0})}{r_{0}}.
$$

若势能为幂律形式$V(r)=ar^{n+1}$，则有

$$
a>0,\ n>-3.
$$

¶在$r=r_{0}$附近将(1)式展开至二阶

$$
\begin{aligned}
&\quad\frac{1}{2}m\left[\frac{\mathrm{d}}{\mathrm{d}t}(r-r_{0})\right]^2-\frac{l^2}{mr_{0}^3}(r-r_{0})+\frac{3l^2}{2mr_{0}^{4}}(r-r_{0})^{2}+V'(r_{0})(r-r_{0})+\frac{1}{2}V''(r_{0})(r-r_{0})^{2}\\
&=\frac{1}{2}m\left[\frac{\mathrm{d}}{\mathrm{d}t}(r-r_{0})\right]^2+\frac{3l^2}{2mr_{0}^{4}}(r-r_{0})^{2}+\frac{1}{2}V''(r_{0})(r-r_{0})^{2}\\
&=E-V_{\text{eff}}(r_{0}),
\end{aligned}
$$

得到小振动特征时间频率$\omega_{t}$满足

$$
\omega_{t}^2=\frac{3l^2}{m^2r_{0}^4}+\frac{V''(r_{0})}{m},
$$

则角频率$\omega_{\theta}$满足

$$
\omega_{\theta}^2=\frac{\omega_{t}^{2}}{\dot{\theta}^2}=3+\frac{mr_{0}^{4}}{l^2}V''(r_{0})=3+\left.\frac{\mathrm{d}\ln V'(r)}{\mathrm{d}\ln r}\right|_{r=r_{0}},
$$

得到

$$
V(r)=ar^{\omega_{\theta}^2-2},
$$

当$\omega_{\theta}$为有理数时，小振动轨道闭合.*Bertrand*证明对于$\omega_{\theta}^2=1,4$时，更大振动轨道仍闭合.参见[Bertrand定理的初级证明](../append/Chap_03/chin2015.pdf)，[Bertrand定理的微扰证明](../append/Chap_03/zarmi2002.pdf)和[Bertrand定理的全面证明](../append/Chap_03/21m1436658.pdf).

## *Kepler*问题

### *Kepler*第一定律：轨迹$r(\theta)$是二次曲线

¶对于符合平方反比定律的力$V(r)=-k/r$，求解(2)式

$$
\begin{aligned}
\theta-\theta_{0}&=\int_{r_{0}}^{r}\frac{l\mathrm{d} r}{mr^2\sqrt{\frac{2}{m}(E+\frac{k}{r}-\frac{l^2}{2mr^2})}}\\
&\overset{u=1/r}{=}\int_{u_{0}}^{u}\frac{\mathrm{d} u}{\sqrt{\frac{2mE}{l^2}+\frac{2mk}{l^2}u-u^2}}\\
&\equiv\int_{u_{0}}^{u}\frac{\mathrm{d} u}{\sqrt{\alpha+\beta u-u^2}}\\
&=\left.\arccos\left(\frac{2u-\beta}{\sqrt{\beta^2+4\alpha}}\right)\right|_{u_{0}}^{u},
\end{aligned}
$$

即

$$
u=\frac{\beta}{2}+\frac{\sqrt{\beta^2+4\alpha}}{2}\cos\left[\theta-\left(\theta_{0}-\arccos\frac{2u_{0}-\beta}{\sqrt{\beta^2+4\alpha}}\right)\right],
$$

写为

$$
\frac{1}{r}=\frac{mk}{l^2}\left\{1+\sqrt{1+\frac{2El^2}{mk^2}}\cos\left[\theta-\left(\theta_{0}-\arccos\frac{\frac{l^2}{mkr_{0}}-1}{\sqrt{1+\frac{2El^2}{mk^2}}}\right)\right]\right\},
$$

得到离心率和半长轴

$$
\begin{aligned}
&e=\sqrt{1+\frac{2El^2}{mk^2}}=
\left\{\begin{aligned}
&>1,\ E>0:\ \text{双曲线},\\
&=1,\ E=0:\ \text{抛物线},\\
&<1,\ E<0:\ \text{椭圆},\\
&=0,\ E=-\frac{mk^2}{2l^2}:\ \text{圆},
\end{aligned}\right.\\
&a=-\frac{k}{2E},
\end{aligned}
$$

$E=-mk^2/2l^2$的结论也可以用*Virial*定理推出.

### *Kepler*第二定律：等时扫过面积相等

¶由角动量守恒直接得到.

### *Kepler*第三定律：$a^3/T^2\propto m$

¶由角动量守恒和(2)式得到

$$
t-t_{0}=\int_{r_{0}}^{r}\frac{\mathrm{d} r}{\sqrt{\frac{2}{m}(E+\frac{k}{r}-\frac{l^2}{2mr^2})}},
$$

引入近偏点角作为计算辅助量

$$
r=a(1-e\cos\psi),
$$

<figure class="image-round" style="--image-width:40%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_chap03_1.png">
  <figcaption>

图一：$E$为近偏点角

  </figcaption>
</figure>

并将$E$与$l$用$a$与$e$表示

$$
t-t_{0}=\sqrt{\frac{ma^3}{k}}\int_{\psi_{0}}^{\psi}1-e\cos\psi\ \mathrm{d}\psi,
$$

积分一周得到

$$
\frac{a^3}{T^2}=\frac{k}{4\pi^2m}=\frac{G}{4\pi^2}(m_{1}+m_{2}).
$$

## *Laplace-Runge-Lenz*矢量

¶利用有心力的角动量守恒

$$
\begin{aligned}
\frac{\mathrm{d}}{\mathrm{d}t}(\bm{p}\times\bm{L})&=\dot{\bm{p}}\times\bm{L}\\
&=\frac{mf(r)}{r}\bm{r}\times(\bm{r}\times\dot{\bm{r}})\\
&=\frac{mf(r)}{r}[(\bm{r}\cdot\dot{\bm{r}})\bm{r}-r^2\dot{\bm{r}}]\\
&=-mr^2f(r)\frac{\mathrm{d}}{\mathrm{d}t}\left(\frac{\bm{r}}{r}\right),
\end{aligned}
$$

在平方反比的情形中，可以构造守恒的*Laplace-Runge-Lenz*矢量

$$
\color{Teal}
\bm{A}=\bm{p}\times\bm{L}-mk\frac{\bm{r}}{r}=\text{const}..
$$

<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_chap03_2.png">
  <figcaption>

图二：$\bm{A}$的守恒示意图

  </figcaption>
</figure>

¶由$\bm{A}$的守恒特性可直接得到轨迹

$$
\begin{aligned}
\bm{A}\cdot\bm{r}&=(\bm{p}\times\bm{L})\cdot\bm{r}-mkr\\
&=(\bm{r}\times\bm{p})\cdot\bm{L}-mkr\\
&=l^2-mkr,
\end{aligned}
$$

即

$$
\frac{1}{r}=\frac{mk}{l^2}\left(1+\frac{A}{mk}\cos\theta\right),
$$

与轨道方程比对得到

$$
A=mke\propto e.
$$

$\bm{L}$,$\bm{A}$与$E$一并固定了轨道的所在平面和朝向以及轨道的形状和大小，再考虑$A^2=m^2k^2+2mEl^2$与$\bm{A}\cdot\bm{L}=0$的约束，共计得到五个独立的运动参量.这与初始速度和初始坐标（由速度决定运动平面后只剩面内坐标可自由选择，3+2=5）的独立参量个数吻合.

## 向心力场中的散射

¶参见[卢瑟福散射](../append/Chap_03/卢瑟福散射.pdf).
