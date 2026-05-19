# 电磁波的辐射

## *Lorenz*规范

\par在真空中，考虑自由电荷和电流的*Maxwell*方程组
$$
\begin{align}
&\nabla\cdot\bm{E}=\frac{\rho*{f}}{\varepsilon*{0}},\\
&\nabla\times\bm{E}=-\part{\bm{B}}{t},\\
&\nabla\cdot\bm{B}=0,\\
&\nabla\times\bm{B}=\mu*{0}\bm{J}*{f}+\mu*{0}\varepsilon*{0}\part{\bm{E}}{t},
\end{align}
$$
由(2),(3)式得到电磁场的势表示
$$
\bm{B}=\nabla\times\bm{A},\quad
\bm{E}=-\nabla\varphi-\part{\bm{A}}{t},
$$
带入(1),(4)式
$$\begin{equation}
\begin{aligned}
&\nabla^2\varphi+\part{}{t}\nabla\cdot\bm{A}=-\frac{\rho*{f}}{\varepsilon*{0}},\\
&\nabla^2\bm{A}-\frac{1}{c^2}\part{^2\bm{A}}{t^2}-\nabla\left(\nabla\cdot\bm{A}+\frac{1}{c^2}\part{\varphi}{t}\right)=-\mu*{0}\bm{J}*{f}.
\end{aligned}
\end{equation}$$
在规范变换下，$\bm{E},\bm{B}$不变
$$
\leftBrace
&\bm{A}\to\bm{A}'=\bm{A}+\nabla\psi,\\
&\varphi\to\varphi'=\varphi-\part{\psi}{t}.
\rightEnd
$$
\par选定*Lorenz*规范
$$
\nabla\cdot\bm{A}^{(\text{L})}+\frac{1}{c^2}\part{\varphi^{(\text{L})}}{t}=0,
$$
则(5)式化为*d'Alembert*方程
$$\begin{equation}
\begin{aligned}
&\nabla^2\varphi^{(\text{L})}-\frac{1}{c^2}\part{^2\varphi^{(\text{L})}}{t^2}=-\frac{\rho*{f}}{\varepsilon*{0}},\\
&\nabla^2\bm{A}^{(\text{L})}-\frac{1}{c^2}\part{^2\bm{A}^{(\text{L})}}{t^2}=-\mu*{0}\bm{J}\*{f}.
\end{aligned}
\end{equation}$$
在无界自由空间中$\rho*{f}=0,\ \bm{J}_{f}=\bm{0}$得到时谐波解
$$
\tilde{\bm{A}}^{(\text{L})}=\tilde{\bm{A}}^{(\text{L})}\*{0}\upe^{-\upi(\omega t-\bm{k}\cdot\bm{r})},\quad\tilde{\varphi}^{(\text{L})}=\tilde{\varphi}^{(\text{L})}_{0}\upe^{-\upi(\omega t-\bm{k}\cdot\bm{r})},
$$
其中$\bm{k}=\frac{\omega}{c}\hat{\bm{e}}_{k}$，*Lorenz*规范约束$\tilde{\varphi}^{(\text{L})}_{0}=\frac{c^2}{\omega}\bm{k}\cdot\tilde{\bm{A}}^{(\text{L})}_{0}$，进而解得
$$
\tilde{\bm{E}}=\upi\omega\tilde{\bm{A}}^{(\text{L})},\quad\tilde{\bm{B}}=\upi\bm{k}\times\tilde{\bm{A}}^{(\text{L})}.
$$

## 推迟势

### *d'Alembert*方程的*Green*函数

\par为了求解方程
$$
\left(\nabla^2-\frac{1}{c^2}\part{^2}{t^2}\right)\Psi(\bm{r},t)=-f(\bm{r},t),
$$
可以考虑*Green*函数
$$
\begin{equation}
\left(\nabla*{\bm{r}}^2-\frac{1}{c^2}\part{^2}{t^2}\right)G(\bm{r},t|\bm{r}',t')=-\delta(\bm{r}-\bm{r}')\delta(t-t'),
\end{equation}
$$
假定*Green*函数具有如下对称性
$$
G(\bm{r},t|\bm{r}',t')=G(\|\bm{r}-\bm{r}'\|,t-t'),
$$
这样一来
$$
\begin{aligned}
\Psi(\bm{r},t)&=\int*{t*{1}}^{t*{2}}\upd t'\int*{\Sigma}\upd^3\bm{r}'\Psi(\bm{r}',t')\delta(\bm{r}-\bm{r}')\delta(t-t')\\
&=\frac{1}{c^2}\int*{t*{1}}^{t*{2}}\upd t'\int*{\Sigma}\upd^3\bm{r}'\underset{\text{integrate by parts}}{\underline{\Psi(\bm{r}',t')\part{^2}{t'^2}G(\bm{r},t|\bm{r}',t')}}-\int*{t*{1}}^{t*{2}}\upd t'\int*{\Sigma}\upd^3\bm{r}'\underset{\text{apply Green's second identity}}{\underline{\Psi(\bm{r}',t')\nabla*{\bm{r}'}^2G(\bm{r},t|\bm{r}',t')}}\\
&=\int*{t*{1}}^{t*{2}}\upd t'\int*{\Sigma}\upd^3\bm{r}'G(\bm{r},t|\bm{r}',t')f(\bm{r}',t')\\
&\quad+\frac{1}{c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left[\part{}{t'}G(\bm{r},t|\bm{r}',t')\Psi(\bm{r}',t')-G(\bm{r},t|\bm{r}',t')\part{}{t'}\Psi(\bm{r}',t')\right]\right|*{t'=t*{1}}^{t*{2}}\\
&\quad+\int*{t_1}^{t_2}\upd t'\int*{\partial\Sigma}\upd\bm{f}'\cdot\left[G(\bm{r},t|\bm{r}',t')\nabla_{\bm{r}'}\Psi(\bm{r}',t')-\Psi(\bm{r}',t')\nabla_{\bm{r}'}G(\bm{r},t|\bm{r}',t')\right].
\end{aligned}
$$
其中$t\in[t_{1},t_{2}],\ \bm{r}\in\Sigma$.令$\bm{R}=\bm{r}-\bm{r}',\ \tau=t-t'$，(7)式化为
$$
\frac{1}{R}\left(\part{^2}{R^2}-\frac{1}{c^2}\part{^2}{\tau^2}\right)RG(R,\tau)=-\delta(\bm{R})\delta(\tau),
$$
在$\bm{R}\neq0,\ \tau\neq0$的区域容易得到两个独立解
$$
G*{\pm}(R,\tau)=\frac{1}{R}g*{\pm}(\tau\pm R/c),
$$
考虑
$$
\begin{aligned}
\left(\nabla*{\bm{R}}^2-\frac{1}{c^2}\part{^2}{\tau^2}\right)G*{\pm}&=\nabla*{\bm{R}}^2\left(\frac{1}{R}\right)g*{\pm}+2\nabla*{\bm{R}}\left(\frac{1}{R}\right)\cdot\nabla*{\bm{R}}(g*{\pm})+\frac{1}{R}\nabla*{\bm{R}}^2\left(g*{\pm}\right)-\frac{1}{c^2R}\part{^2g*{\pm}}{\tau^2}\\
&=-4\pi\delta(\bm{R})g*{\pm}+2\left(-\frac{\bm{R}}{R^3}\right)\cdot\left(\pm g'*{\pm}\frac{\bm{R}}{cR}\right)+\frac{2}{R^2}(\pm g'*{\pm}/c)\\
&=-4\pi\delta(\bm{R})g*{\pm},
\end{aligned}
$$
$g_{\pm}$应使得上式与(7)式保持一致，故
$$
G*{\pm}(\bm{r},t|\bm{r}',t')=\frac{\delta(t-t'\pm\|\bm{r}-\bm{r}'\|/c)}{4\pi\|\bm{r}-\bm{r}'\|},
$$
且有$G*{+}(\bm{r},t|\bm{r}',t')=G*{-}(\bm{r}',t'|\bm{r},t).$注意假定的*Green*函数对称性暗含了$\Sigma=\mathbb{R}^3$，这样$\Psi(\bm{r},t)$中消去了边界项
$$
\begin{aligned}
\Psi(\bm{r},t)&=\int*{t*{1}}^{t*{2}}\upd t\int*{\Sigma}\upd^3\bm{r}'G(\bm{r},t|\bm{r}',t')f(\bm{r}',t')\\
&\quad+\frac{1}{c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left[\part{}{t'}G(\bm{r},t|\bm{r}',t')\Psi(\bm{r}',t')-G(\bm{r},t|\bm{r}',t')\part{}{t'}\Psi(\bm{r}',t')\right]\right|*{t'=t*{1}}^{t\_{2}}.
\end{aligned}
$$

### 超前波与推迟波

\par$G_{\pm}$的选取分别对应着超前波解(advanced wave)与推迟波解(retarded wave)
$$
\begin{aligned}
&\Psi*{\text{ret}}(\bm{r},t)=\Psi*{\text{in}}(\bm{r},t)+\frac{1}{4\pi}\int*{\{\bm{r}'|\|\bm{r}'-\bm{r}\|<c(t-t*{1})\}}\upd^3\bm{r}'\frac{f(\bm{r}',t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|},\\
&\Psi*{\text{adv}}(\bm{r},t)=\Psi*{\text{out}}(\bm{r},t)+\frac{1}{4\pi}\int*{\{\bm{r}'|\|\bm{r}'-\bm{r}\|<c(t*{2}-t)\}}\upd^3\bm{r}'\frac{f(\bm{r}',t+\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|},
\end{aligned}
$$
其中
$$
\begin{aligned}
\Psi*{\text{in}}(\bm{r},t)&=\frac{1}{c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left[\part{}{t'}G_{-}(\bm{r},t|\bm{r}',t')\Psi(\bm{r}',t')-G_{-}(\bm{r},t|\bm{r}',t')\part{}{t'}\Psi(\bm{r}',t')\right]\right|*{t'=t*{1}}\\
&=\frac{1}{4\pi c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left\{\part{}{t'}\left[\frac{\delta(t-t'-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}\Psi(\bm{r}',t')\right]-2\frac{\delta(t-t'-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}\part{}{t'}\Psi(\bm{r}',t')\right\}\right|*{t'=t*{1}}\\
&=-\frac{1}{4\pi}\int*{0}^{2\pi}\upd\varphi\int*{0}^{\pi}\upd\theta\sin\theta\left[\Psi + c(t-t_1)\part{\Psi}{R} + (t-t*{1})\part{\Psi}{t'}\right]*{t'=t*{1}},\\\\
\Psi*{\text{out}}(\bm{r},t)&=\frac{1}{c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left[\part{}{t'}G_{+}(\bm{r},t|\bm{r}',t')\Psi(\bm{r}',t')-G_{+}(\bm{r},t|\bm{r}',t')\part{}{t'}\Psi(\bm{r}',t')\right]\right|*{t'=t*{2}}\\
&=\frac{1}{4\pi c^2}\int*{\Sigma}\upd^3\bm{r}'\left.\left\{\part{}{t'}\left[\frac{\delta(t-t'+\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}\Psi(\bm{r}',t')\right]-2\frac{\delta(t-t'+\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}\part{}{t'}\Psi(\bm{r}',t')\right\}\right|*{t'=t*{2}}\\
&=\frac{1}{4\pi}\int*{0}^{2\pi}\upd\varphi\int*{0}^{\pi}\upd\theta\sin\theta\left[\Psi + c(t*{2}-t)\part{\Psi}{R} - (t*{2}-t)\part{\Psi}{t'}\right]*{t'=t*{2}}.
\end{aligned}
$$
在物理问题中，我们更青睐使用推迟波求解.$\Psi$通常在无穷远处衰减为零，因此令$t*{1}\to-\infty$
$$\begin{equation}
\Psi(\bm{r},t)=\frac{1}{4\pi}\int\_{\{\bm{r}'|f\neq0\}}\upd^3\bm{r}'\frac{f(\bm{r}',t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}.
\end{equation}$$

### 时谐源的推迟波

\par考虑时谐源$\tilde{f}(\bm{r},t)=\tilde{f}(\bm{r}|\omega)\upe^{-\upi\omega t}$则
$$
\tilde{\Psi}(\bm{r},t)=\int*{\{\bm{r}'|\tilde{f}\neq0\}}\upd^3\bm{r}'\frac{\upe^{\upi k\|\bm{r}-\bm{r}'\|}}{4\pi\|\bm{r}-\bm{r}'\|}\tilde{f}(\bm{r}',t)\equiv\int*{\{\bm{r}'|\tilde{f}\neq0\}}\upd^3\bm{r}'G\_{0}(\bm{r},\bm{r}')\tilde{f}(\bm{r}',t).
$$

### 推迟势与*Schott*公式

\par由(6)(8)式立即得到
$$
\begin{aligned}
&\varphi^{(\text{L})}(\bm{r},t)=\frac{1}{4\pi\varepsilon*{0}}\int*{\{\bm{r}'|\rho*{f}\neq0\}}\upd^3\bm{r}'\frac{\rho*{f}(\bm{r}',t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|},\\
&\bm{A}^{(\text{L})}(\bm{r},t)=\frac{\mu*{0}}{4\pi}\int*{\{\bm{r}'|\bm{J}*{f}\neq0\}}\upd^3\bm{r}'\frac{\bm{J}*{f}(\bm{r}',t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|},
\end{aligned}
$$
对于时谐场，可将推迟时间写作相位因子.简写$t_{\text{ret}}=t-\|\bm{r}-\bm{r}'\|/c$，$f_{\text{ret}}(\bm{r}')=f(\bm{r}',t_{\text{ret}})$得到*Schott*公式
$$
\begin{aligned}
\bm{E}(\bm{r},t)&=-\frac{1}{4\pi\varepsilon*{0}}\nabla*{\bm{r}}\int\upd^3\bm{r}'\frac{\rho*{f,\text{ret}}(\bm{r}')}{\|\bm{r}-\bm{r}'\|}-\frac{\mu*{0}}{4\pi}\part{}{t}\int\upd^3\bm{r}'\frac{\bm{J}*{f,\text{ret}}(\bm{r}')}{\|\bm{r}-\bm{r}'\|}\\
&=\frac{1}{4\pi\varepsilon*{0}}\int\upd^3\bm{r}'\left[\left(\frac{\bm{r}-\bm{r}'}{\|\bm{r}-\bm{r}'\|^3}+\frac{\bm{r}-\bm{r}'}{c\|\bm{r}-\bm{r}'\|^2}\part{}{t}\right)\rho_{f,\text{ret}}-\frac{1}{c^2\|\bm{r}-\bm{r}'\|}\part{\bm{J}*{f,\text{ret}}}{t}\right],\\\\
\bm{B}(\bm{r},t)&=\frac{\mu*{0}}{4\pi}\nabla\_{\bm{r}}\times\int\upd^3\bm{r}'\frac{\bm{J}*{f,\text{ret}}}{\|\bm{r}-\bm{r}'\|}\\
&=\frac{\mu\*{0}}{4\pi}\int\upd^3\bm{r}'\left(\frac{1}{\|\bm{r}-\bm{r}'\|^3}+\frac{1}{c\|\bm{r}-\bm{r}'\|^2}\part{}{t}\right)\bm{J}\_{f,\text{ret}}\times(\bm{r}-\bm{r}').
\end{aligned}
$$

### 振荡电偶极子

\par振荡点电偶极子的含时电荷分布与电流密度
$$
\rho*{d}(\bm{r},t)=-\bm{p}(t)\cdot\nabla\delta(\bm{r}),\quad\bm{J}*{d}=\dot{\bm{p}}(t)\delta(\bm{r}),
$$
其激发的矢势
$$
\bm{A}^{(\text{L})}(\bm{r},t)=\frac{\mu*{0}}{4\pi}\int\upd^3\bm{r}'\delta(\bm{r}')\frac{\dot{\bm{p}}(t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}=\frac{\mu*{0}}{4\pi}\frac{\dot{\bm{p}}(t-r/c)}{r},
$$
标势
$$
\begin{aligned}
\varphi^{(\text{L})}(\bm{r},t)&=\frac{1}{4\pi\varepsilon*{0}}\int\upd^3\bm{r}'\frac{-\bm{p}(t-\|\bm{r}-\bm{r}'\|/c)\cdot\nabla*{\bm{r}'}\delta(\bm{r'})}{\|\bm{r}-\bm{r}'\|}\\
&=\frac{1}{4\pi\varepsilon*{0}}\int\upd^3\bm{r}'\delta(\bm{r'})\nabla*{\bm{r}'}\frac{\bm{p}(t-\|\bm{r}-\bm{r}'\|/c)}{\|\bm{r}-\bm{r}'\|}\\
&=\frac{1}{4\pi\varepsilon*{0}}\left[\frac{\bm{r}}{r^3}\cdot\bm{p}(t-r/c)+\frac{\bm{r}}{cr^2}\cdot\dot{\bm{p}}(t-r/c)\right],
\end{aligned}
$$
简写$\bm{p}*{\text{ret}}=\bm{p}(t-r/c)$，得到
$$
\begin{aligned}
&\bm{B}(\bm{r},t)=\frac{\mu_{0}}{4\pi}\left(\underset{\text{induction}}{\underline{\frac{\dot{\bm{p}}*{\text{ret}}}{r^2}}}+\underset{\text{radiation}}{\underline{\frac{\ddot{\bm{p}}*{\text{ret}}}{cr}}}\right)\times\hat{\bm{r}},\\
&\bm{E}(\bm{r},t)=\frac{1}{4\pi\varepsilon_{0}}\left[\underset{\text{radiation}}{\underline{\frac{(\hat{\bm{r}}\cdot\ddot{\bm{p}}*{\text{ret}})\hat{\bm{r}}-\ddot{\bm{p}}*{\text{ret}}}{c^2r}}}+\underset{\text{induction}}{\underline{\frac{3(\hat{\bm{r}}\cdot\dot{\bm{p}}*{\text{ret}})\hat{\bm{r}}-\dot{\bm{p}}*{\text{ret}}}{cr^2}}}+\underset{\text{quasi-electrostatic}}{\underline{\frac{3(\hat{\bm{r}}\cdot\bm{p}*{\text{ret}})\hat{\bm{r}}-\bm{p}*{\text{ret}}}{r^3}}}\right],
\end{aligned}
$$
注意到电磁场的$\bm{p}_{\text{ret}}$的导数阶数与衰减速度相关的特点，假定振荡的特征时间$\tau$，我们划分辐射场
$$
r\ll c\tau:\text{近场},\quad r\sim c\tau:\text{过渡带},\quad r\gg c\tau:\text{远场}.
$$
\par利用坡印廷矢量，计算得方向固定的振荡电偶极子通过电磁场向$r=R$的球面传递出的功率
$$
P(t)=\frac{2}{3}\frac{1}{4\pi\varepsilon_{0}}\left[\frac{\ddot{p}*{\text{ret}}^2}{c^3}+\deri{}{t}\left(\frac{\dot{p}^2}{c^2R}+\frac{p\dot{p}}{cR^2}+\frac{p^2}{2R^3}\right)*{\text{ret}}\right],
$$
对于时谐振荡的电偶极子$p(t)=\operatorname{Re}[\tilde{p}_{0}\upe^{-\upi\omega t}]$，其功率的时间平均
$$
\left\langle P\right\rangle=\frac{1}{4\pi\varepsilon*{0}}\frac{2\langle\ddot{p}*{\text{ret}}^2\rangle}{3c^3}=\frac{1}{4\pi\varepsilon*{0}}\frac{\omega^4|\tilde{p}*{0}|^2}{3c^3}.
$$

## 辐射

### 辐射的定义

\par辐射指电磁场能够脱离源向无穷远处传播能量的行为，即辐射源的一定立体角中无穷远处向外传递功率非零（可根据源的空间延展情况适时更改定义）
$$
\upd P(t)=\lim*{r\to\infty}\hat{\bm{r}}\cdot\bm{S}(\bm{r},t)r^2\upd\Omega>0.
$$
坡印廷定理说明克服电场对电荷做功是辐射能量的来源
$$
-\int*{\lim\limits*{r\to\infty}\Sigma}\upd^3\bm{r}'\bm{J}*{f}\cdot\bm{E}=P(t)+\deri{U*{\text{EM}}}{t},
$$
其中$U*{\text{EM}}$为积分区域内电磁场能量.特殊地，对于时谐电流源
$$
\langle P\rangle=-\frac{1}{2}\operatorname{Re}\int*{\lim\limits*{r\to\infty}\Sigma}\upd^3\bm{r}'\bm{J}\_{f}\cdot\bm{E}^{*}.
$$
\par*Hertz\*引入力线重联(field line reconnection)的概念来解释电磁场脱离源开始辐射的过程.

### 时域中的辐射场

\par为简便起见，我们取强度正比于$1/r$且能反应推迟时间的主要变化的势项作为辐射项$\bm{A}^{(\text{L})}_{\text{rad}}(\bm{r},t)$和$\varphi^{(\text{L})}_{\text{rad}}(\bm{r},t)$以直接计算辐射场强分布（注意取其中正比于$1/r$的项）与功率角分布.在远场
$$
\|\bm{r}-\bm{r}'\|=r\sqrt{1-2\frac{\hat{\bm{r}}\cdot\bm{r}'}{r}+\left(\frac{r'}{r}\right)^2}=r\left\{1-\hat{\bm{r}}\cdot\hat{\bm{r}'}\left(\frac{r'}{r}\right)-\frac{1}{2}[1-(\hat{\bm{r}}\cdot\hat{\bm{r}'})^2]\left(\frac{r'}{r}\right)^2+\cdots\right\},
$$
记$t_{\text{rad}}=t-r/c+\hat{\bm{r}}\cdot\bm{r}'/c$，辐射项
$$
\begin{aligned}
&\bm{A}^{(\text{L})}*{\text{rad}}(\bm{r},t)=\frac{\mu*{0}}{4\pi r}\int\upd^3\bm{r}'\bm{J}*{f}(\bm{r}',t*{\text{rad}}),\\
&\varphi^{(\text{L})}*{\text{rad}}(\bm{r},t)=\frac{1}{4\pi\varepsilon*{0}r}\int\upd^3\bm{r}'\rho*{f}(\bm{r}',t*{\text{rad}}),
\end{aligned}
$$
进而得到
$$
\begin{aligned}
\bm{B}*{\text{rad}}(\bm{r},t)&=-\frac{\mu*{0}}{4\pi c}\frac{\hat{\bm{r}}}{r}\times\int\upd^3\bm{r}'\part{}{t}\bm{J}*{f}(\bm{r}',t*{\text{rad}}),\\
\bm{E}*{\text{rad}}(\bm{r},t)&=\frac{1}{4\pi\varepsilon*{0}c}\frac{\hat{\bm{r}}}{r}\int\upd^3\bm{r}'\part{}{t}\rho*{f}(\bm{r}',t*{\text{rad}})-\frac{\mu*{0}}{4\pi r}\int\upd^3\bm{r}'\part{}{t}\bm{J}*{f}(\bm{r}',t*{\text{rad}}),
\end{aligned}
$$
利用连续性方程
$$\begin{aligned}
\nabla*{\bm{r}'}\cdot\bm{J}*{f}(\bm{r}',t*{\text{rad}})&=[\nabla_{\bm{r}'}\cdot\bm{J}*{f}(\bm{r}',t')]|*{t'=t\_{\text{rad}}}+\part{\bm{J}*{f}}{t}\cdot\frac{\hat{\bm{r}}}{c}\\
&=-\part{\rho*{f}}{t}+\part{\bm{J}*{f}}{t}\cdot\frac{\hat{\bm{r}}}{c},
\end{aligned}$$
带回上式
$$\begin{aligned}
\bm{E}*{\text{rad}}(\bm{r},t)&=\frac{\mu\_{0}}{4\pi r}\left[\hat{\bm{r}}\int\upd^3\bm{r}'\hat{\bm{r}}\cdot\part{}{t}\bm{J}*{f}(\bm{r}',t*{\text{rad}})-\int\upd^3\bm{r}'\part{}{t}\bm{J}*{f}(\bm{r}',t*{\text{rad}})\right]\\
&=\frac{\mu\_{0}}{4\pi r}\hat{\bm{r}}\times\left[\hat{\bm{r}}\times\int\upd^3\bm{r}'\part{}{t}\bm{J}*{f}(\bm{r}',t*{\text{rad}})\right].
\end{aligned}$$
\par由以上推导
$$\begin{aligned}
&c\bm{B}*{\text{rad}}(\bm{r},t)=-\hat{\bm{r}}\times\part{\bm{A}^{(\text{L})}*{\text{rad}}}{t},\\
&\bm{E}*{\text{rad}}(\bm{r},t)=-\hat{\bm{r}}\times c\bm{B}*{\text{rad}}(\bm{r},t),\\
&c\bm{B}*{\text{rad}}(\bm{r},t)=\hat{\bm{r}}\times\bm{E}*{\text{rad}},
\end{aligned}$$
说明辐射场表现为TEM波，其功率角分布
$$
\deri{P}{\Omega}=\frac{r^2}{\mu\_{0}}|\bm{E}*{\text{rad}}\times\bm{B}\*{\text{rad}}|=\frac{1}{c\mu*{0}}\left|\bm{r}\times\part{\bm{A}^{(\text{L})}*{\text{rad}}}{t}\right|^2.
$$

### *Larmor*公式

\par对于慢速运动的带电粒子
$$
\bm{J}*{f}(\bm{r},t*{\text{rad}})\approx q\bm{v}(t-r/c)\delta[\bm{r}-\bm{r}*{0}(t)],
$$
得到
$$
\bm{E}*{\text{rad}}=\frac{\mu\_{0}q}{4\pi r}\hat{\bm{r}}\times(\hat{\bm{r}}\times\bm{a}*{\text{rad}})=-\frac{\mu*{0}q}{4\pi r}(\bm{a}*{\text{rad}})*{\perp},
$$
假设$\bm{a}_{\text{rad}}$与$\hat{\bm{r}}$成$\theta$角，则
$$
\deri{P}{\Omega}=\frac{\mu\_{0}q^2}{(4\pi)^2c}|\bm{a}*{\text{rad}}|^2\sin^2\theta,
$$
或
$$
P=\frac{1}{4\pi\varepsilon\*{0}}\frac{2q^2|\bm{a}\_{\text{rad}}|^2}{3c^3}.
$$

### 频域中的辐射场

\par利用*Fourier*变换（约定时域上正变换用$\upe^{\upi\omega t}$，下文空域上正变换用$\upe^{-\upi\bm{k}\cdot\bm{r}}$，$1/2\pi$的因子均分配给逆变换）的性质
$$
\mathcal{F}[f(t-t\_{0})](\omega)=\upe^{\upi\omega t*{0}}\mathcal{F}[f(t)](\omega),
$$
得到
$$\begin{aligned}
\bm{A}*{\text{rad}}^{(\text{L})}(\bm{r}|\omega)&=\mathcal{F}[\bm{A}*{\text{rad}}^{(\text{L})}(\bm{r},t)]\\
&=\frac{\mu*{0}}{4\pi r}\int\upd^3\bm{r}'\mathcal{F}[\bm{J}*{f}(\bm{r}',t*{\text{rad}})]\\
&=\frac{\mu*{0}}{4\pi}\frac{\upe^{\upi kr}}{r}\int\upd^3\bm{r}'\bm{J}*{f}(\bm{r}'|\omega)\upe^{-\upi k\hat{\bm{r}}\cdot\bm{r}'}\\
&=\frac{\mu*{0}}{4\pi}\frac{\upe^{\upi kr}}{r}\bm{J}*{f}(k\hat{\bm{r}}|\omega)
\end{aligned}$$
考虑时谐场中的场强
$$
c\bm{B}*{\text{rad}}(\bm{r}|\omega)=\upi\omega\hat{\bm{r}}\times\bm{A}*{\text{rad}}(\bm{r}|\omega),\quad\bm{E}*{\text{rad}}(\bm{r}|\omega)=-\upi\omega\hat{\bm{r}}\times[\hat{\bm{r}}\times\bm{A}*{\text{rad}}(\bm{r}|\omega)],
$$
则辐射功率的时间频率平均角分布
$$\begin{aligned}
\left\langle\deri{P}{\Omega}(\Omega|\omega)\right\rangle&=\frac{r^2}{2\mu*{0}}\operatorname{Re}[{E}*{\text{rad}}(\bm{r}|\omega)\times\bm{B}^{*}*{\text{rad}}(\bm{r}|\omega)]\\
&=\frac{\omega^2}{2c\mu*{0}}|\hat{\bm{r}}\times\bm{A}*{\text{rad}}(\bm{r}|\omega)|^2\\
&=\frac{\mu*{0}\omega^2}{2(4\pi)^2c}|\bm{J}\_{f,\perp}(k\hat{\bm{r}}|\omega)|^2.
\end{aligned}$$

### 多极辐射

\par记辐射矢量
$$
\bm{\alpha}(\bm{r},t)=\part{}{t}\int\upd^3\bm{r}'\bm{J}*{f}(\bm{r}',t*{\text{rad}}).
$$
将电流密度做多极展开
$$
\bm{J}*{f}(\bm{r}',t*{\text{rad}})=\sum*{k=0}^{\infty}\frac{1}{k!}\left(\frac{\hat{\bm{r}}\cdot\bm{r}'}{c}\right)^{k}\part{^k}{t^k}\bm{J}*{f}(\bm{r}',t-r/c),
$$
以上展开在源的特征长度较短或源振荡周期较长的情况下合法.
\par观察辐射矢量展开中$k=0$的电偶极子项
$$\begin{aligned}
\bm{\alpha}*{\text{E1}}&=\part{}{t}\int\upd^3\bm{r}'\bm{J}*{f}(\bm{r}',t-r/c)\\
&=\part{}{t}\int\upd^3\bm{r}'\{\nabla*{\bm{r}'}\cdot[\bm{J}*{f}(\bm{r}',t-r/c)\bm{r}']-[\nabla*{\bm{r}'}\cdot\bm{J}*{f}(\bm{r}',t-r/c)]\bm{r}'\}\\
&=\part{}{t}\int\upd^3\bm{r}'\part{}{t}\rho*{f}(\bm{r}',t-r/c)\bm{r}'=\ddot{\bm{p}}(t-r/c),
\end{aligned}$$
观察$k=1$项，因为
$$\begin{aligned}
(\hat{\bm{r}}\cdot\bm{r}')\bm{J}*{f}&=\underset{\text{anti-symmetric}}{\underline{\frac{1}{2}(\bm{r}'\times\bm{J}*{f})\times\hat{\bm{r}}}}+\underset{\text{symmetric}}{\underline{\frac{1}{2}(\bm{r}'\bm{J}*{f}+\bm{J}*{f}\bm{r}')\cdot\hat{\bm{r}}}}\\
&=\frac{1}{2}(\bm{r}'\times\bm{J}*{f})\times\hat{\bm{r}}+\frac{1}{2}[\nabla\cdot(\bm{J}*{f}\bm{r}'\bm{r}')-(\nabla\cdot\bm{J}*{f})\bm{r}'\bm{r}']\cdot\hat{\bm{r}}\\
&=\frac{1}{2}(\bm{r}'\times\bm{J}\*{f})\times\hat{\bm{r}}+\frac{1}{2}\left(\part{\rho*{f}}{t}\bm{r}'\bm{r}'\right)\cdot\hat{\bm{r}}+\frac{1}{2}\nabla\cdot(\bm{J}*{f}\bm{r}'\bm{r}')\cdot\hat{\bm{r}},
\end{aligned}$$
上式中散度项不对积分贡献，故
$$\begin{aligned}
\bm{\alpha}*{k1}&=\frac{1}{c}\part{^2}{t^2}\int\upd^3\bm{r}'\frac{1}{2}(\bm{r}'\times\bm{J}*{f})\times\hat{\bm{r}}+\frac{1}{2c}\part{^3}{t^3}\int\upd^3\bm{r}'\left(\rho*{f}\bm{r}'\bm{r}'\right)\cdot\hat{\bm{r}}\\
&=\frac{1}{c}\ddot{\bm{m}}(t-r/c)\times\hat{\bm{r}}+\frac{1}{2c}\dddot{\mathcal{Q}}(t-r/c)\cdot\hat{\bm{r}}\equiv\bm{\alpha}*{\text{M1}}+\bm{\alpha}*{\text{E2}}.
\end{aligned}$$
\par计算电磁量
$$\begin{aligned}
&\bm{B}*{\text{rad}}=-\frac{\mu*{0}}{4\pi c}\frac{\hat{\bm{r}}}{r}\times\bm{\alpha},\\
&\bm{E}*{\text{rad}}=\frac{\mu*{0}}{4\pi}\frac{\hat{\bm{r}}}{r}\times(\hat{\bm{r}}\times\bm{\alpha}),\\
&\deri{P}{\Omega}=\frac{\mu\_{0}}{(4\pi)^2c}|\hat{\bm{r}}\times\bm{\alpha}|^2.
\end{aligned}$$

### 短波天线

## 散射和衍射
