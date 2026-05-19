# 约束与达朗贝尔原理

## 约束

### 约束的分类

\par一位矢为$\bm{r}_1,\cdots,\bm{r}_{n}$的质点系，其完整约束(holomonic constraint)写为
$$
    \begin{equation}
f(\bm{r}_1,\cdots,\bm{r}_{n},t)=0.
\end{equation}
$$
若完整约束不显含时间则称为定常约束(scleronomic constraint)，若显含时间则称为非定常约束(rheonomic constraint).
\par例如"A bead sliding on a rigid curved wire fixed in space is obviously subject to a scleronomous constraint; if the wire is moving in some prescribed fashion, the constraint is rheonomous. Note that if the wire moves, say, as a reaction to the bead’s motion, then the time dependence of the constraint enters in the equation of the constraint only through the coordinates of the curved wire (which are now part of the system coordinates). The overall constraint is then scleronomous."

### 非完整约束

\par非完整约束(nonholomonic constraint)相较于完整约束无法用来消去广义坐标，降低系统的自由度.如气体分子在球形器壁内的约束$(x-x_{c})^2+(y-y_{c})^2+(z-z_{c})\leq R^2$.
\par一半径为$R$的圆盘在$x-y$平面上的轨迹需要圆盘盘心坐标$(x,y)$、圆盘平面朝向角$\theta$以及圆盘绕自身对称轴的自转角$\phi$才能完全确定，即其广义坐标为$(x,y,\theta,\phi)$.若此圆盘无滑滚动，那么“无滑滚动”是完整约束吗？因无滑滚动对应微分条件
$$
\leftBrace
&\mathrm{d}x-R\cos\theta\mathrm{d}\phi=0,\\
&\mathrm{d}y-R\sin\theta\mathrm{d}\phi=0.
\rightEnd
$$
这两个条件在$\theta\neq\text{const}.$都是不可积的，得不到(1)式的形式.因此“无滑滚动”是非完整约束.（具体讲是对速度$v=R\dot{\phi}$的约束）

## 达朗贝尔原理

### 惯性力做功项的计算

\par一个质点系，在约束力不做功的前提下，要求对于任意的虚位移$\delta\bm{r}^{(i)}$都有
$$
    \sum_{i}(\bm{F}^{(i)}-\dot{\bm{p}}^{(i)})\cdot\delta\bm{r}^{(i)}=0,
$$
其中$\bm{F}^{(i)}$是对第$i$个质点施加的外力，$\bm{p}^{(i)}$是其动量.
\par在选择了相互独立、与自由度相适应的广义坐标$\bm{r}^{(i)}=\bm{r}^{(i)}(q^{1},\cdots,q^{n},t)$后，定义广义力分量
$$
    Q_{j}:=\sum_{i}\bm{F}^{(i)}\cdot\frac{\partial\bm{r}^{(i)}}{\partial q^j},
$$
则达朗贝尔定理的外力项表示为$\sum_{j}\bm{Q}_{j}\delta q^{j}$.而惯性力项为
$$
    \begin{aligned}
    \sum_{i}\dot{\bm{p}}^{(i)}\cdot\delta\bm{r}^{(i)}&=\sum_{i,j}m^{(i)}\ddot{\bm{r}}^{(i)}\cdot\frac{\partial\bm{r}^{(i)}}{\partial q^{j}}\delta q^{j}\\
    &=\sum_{i,j}m^{(i)}\left[\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{\bm{r}}^{(i)}\cdot\frac{\partial\bm{r}^{(i)}}{\partial q^{j}}\right)-\dot{\bm{r}}^{(i)}\frac{\mathrm{d}}{\mathrm{d}t}\left(\frac{\partial\bm{r}^{(i)}}{\partial q^{j}}\right)\right]\delta q^{j}.
    \end{aligned}
$$
定义$\bm{v}^{(i)}\equiv\dot{\bm{r}}^{(i)}$，则由$\bm{v}^{(i)}=\sum_{j}\left(\partial\bm{r}^{(i)}/\partial q^{j}\right)\dot{q}_{j}+\partial\bm{r}^{(i)}/\partial t$得
$$
    \begin{equation}
    \frac{\partial\bm{v}^{(i)}}{\partial{\dot{q}^{j}}}=\frac{\partial\bm{r}^{(i)}}{\partial{q^{j}}},
    \end{equation}
$$
于是
$$
    \begin{aligned}
    \sum_{i}\dot{\bm{p}}^{(i)}\cdot\delta\bm{r}^{(i)}&=\sum_{i,j}m^{(i)}\left[\frac{\mathrm{d}}{\mathrm{d}t}\left(\bm{v}^{(i)}\cdot\frac{\partial\bm{v}^{(i)}}{\partial\dot{q}^{j}}\right)-\bm{v}^{(i)}\cdot\frac{\partial\bm{v}^{(i)}}{\partial q^{j}}\right]\delta q^{j}\\
    &=\sum_{j}\left[\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial}{\partial\dot{q}^{j}}\left(\sum_{i}\frac{1}{2}m^{(i)}(v^{(i)})^2\right)-\frac{\partial}{\partial q^{j}}\left(\sum_{i}\frac{1}{2}m^{(i)}(v^{(i)})^2\right)\right]\delta q^{j}\\
    &\equiv\sum_{j}\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial\dot{q}^{j}}-\frac{\partial T}{\partial q^{j}}\right)\delta q^{j}.
    \end{aligned}
$$
得到
$$
    \begin{equation}
    Q_{j}=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial\dot{q}^{j}}-\frac{\partial T}{\partial q^{j}}.
    \end{equation}
$$
\par此式可以被改写为*Nielsen*形式，因为对于$T(q^{j},\dot{q}^{j},t)$
$$
\frac{\mathrm{d}}{\mathrm{d}t}=\dot{q}^j\frac{\partial}{\partial q^j}+\ddot{q}^j\frac{\partial}{\partial \dot{q}^j}+\frac{\partial}{\partial t},
$$
对易子
$$
\left[\frac{\partial}{\partial\dot{q}^j},\frac{\mathrm{d}}{\mathrm{d}t}\right]=\frac{\partial}{\partial q^j},
$$
于是
$$
Q_{j}=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial\dot{q}^j}-\frac{\partial T}{\partial q^j}=\left(\frac{\partial}{\partial\dot{q}^j}\frac{\mathrm{d}}{\mathrm{d}t}-\left[\frac{\partial}{\partial\dot{q}^j},\frac{\mathrm{d}}{\mathrm{d}t}\right]\right)T-\frac{\partial T}{\partial q^j}=\frac{\partial\dot{T}}{\partial\dot{q}^j}-2\frac{\partial T}{\partial q^j}.
$$

### 保守力情形

\par当$V=V(\bm{r}^{(1)},\cdots,\bm{r}^{(n)},t)$，$\bm{F}^{(i)}=-\nabla^{(i)}V=-\sum_{j}(1/h_{j})(\partial V/\partial (q^{j})^{(i)})\hat{\bm{e}}_{q^{j}}$时
$$
    Q_{j}=-\sum_{i}\frac{\partial V}{\partial (q^{j})^{(i)}}=-\sum_{i}\frac{\partial V}{\partial (q^{j})^{(i)}}\frac{\partial(q^{j})^{(i)}}{\partial q^{j}}=-\frac{\partial V}{\partial q^j},
$$
此时达朗贝尔原理(*D’Alembert*’s principle)可以表示为
$$\begin{equation}
    \color{Teal}
    \sum_{j}\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial}{\partial\dot{q}^{j}}(T-V)-\frac{\partial}{\partial q^{j}}(T-V)\right)\delta q^{j}
    \equiv\sum_{j}\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial L}{\partial\dot{q}^{j}}-\frac{\partial L}{\partial q^{j}}\right)\delta q^{j}=0,
    \end{equation}
$$

其中定义了拉格朗日量$L=T-V$.

### 非保守力情形

\par当$U=U(q^j,\dot{q}^{j})$时，(3)式仍适用，如电磁场的势
$$
    U=q\phi-q\bm{A}\cdot\bm{v}.
$$
\par在*Stokes*型阻力$\bm{F}_{f}^{(i)}=-(k_{x}^{(i)}\bm{v}_{x}+k_{y}^{(i)}\bm{v}_{y}+k_{z}^{(i)}\bm{v}_{z})$的情形下，定义系统的*Rayleigh*耗散函数
$$
\mathcal{F}=\frac{1}{2}\sum_{i}(k_{x}^{(i)}v_{x}^2+k_{y}^{(i)}v_{y}^2+k_{z}^{(i)}v_{z}^2)=-\frac{1}{2}\sum_{i}\bm{F}_{f}^{(i)}\cdot\bm{v}^{(i)},
$$
物理含义是系统的阻力做功功率的一半.可直接由定义得到
$$
\bm{F}_{f}=-\nabla_{v}\mathcal{F}.
$$
由(2)式可知阻力的广义力分量
$$
Q^{(f)}_{j}=\sum_{i}\bm{F}_{f}^{(i)}\cdot\part{\bm{r}}{q^j}=\sum_{i}-\nabla_{v}\mathcal{F}^{(i)}\cdot\part{\dot{\bm{r}}}{\dot{q}^j}=-\sum_{i}\part{\mathcal{F}^{(i)}}{\dot{q}^j}=-\part{\mathcal{F}}{\dot{q}^j},
$$
由此得到*Stokes*型阻力系统的拉格朗日方程
$$\color{Teal}
Q_{j}=-\delt{L}{q^j}+\part{\mathcal{F}}{\dot{q}^j}.
$$

### 动能项的展开

$$
\begin{aligned}
    T&=\sum_{i}\frac{1}{2}m^{(i)}(\dot{\bm{r}}^{(i)})^2=\sum_{i}\frac{1}{2}m^{(i)}\left(\sum_{j}\frac{\partial\bm{r}^{(i)}}{\partial q^j}\dot{q}^j+\frac{\partial\bm{r}^{(i)}}{\partial t}\right)^2\\
    &=\sum_{i}\frac{1}{2}m^{(i)}\left(\frac{\partial\bm{r}^{(i)}}{\partial t}\right)^2+\sum_{j}\left(\sum_{i}m^{(i)}\frac{\partial\bm{r}^{(i)}}{\partial t}\cdot\frac{\partial\bm{r}^{(i)}}{\partial q^j}\right)\dot{q}^j+\sum_{j,k}\left(\sum_{i}\frac{1}{2}m^{(i)}\frac{\partial\bm{r}^{(i)}}{\partial q^j}\frac{\partial\bm{r}^{(i)}}{\partial q^k}\right)\dot{q}^j\dot{q}^k.
\end{aligned}
$$
