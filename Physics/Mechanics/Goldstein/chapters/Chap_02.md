# 变分原理与拉格朗日方程

## 变分原理

### 哈密顿原理

¶在给定的时间$t_1 \sim t_2$内，系统在构型空间(configuration space,通过$q^1,\cdots,q^n$编码了系统位置信息)中的真实运动路径是使得作用量$I$取稳定值(stationary value,特指一阶微扰不引起变化时的值)的路径.其中
$$I=\int_{t_1}^{t_2}L\ \mathrm{d}t,$$
取稳定值则要求
$$\delta I=0,$$
这正是哈密顿原理.

### 变分的计算

¶以一维情形为例

$$
J=\int_{x_1}^{x_2}f(y,\dot{y},x)\ \mathrm{d}x,
$$

为了确定稳定解，引进参数$\alpha$以代表一阶微扰，考虑稳定解附近的函数族

$$
\left\{\begin{aligned}
y(x,\alpha)&=y(x,0)+\alpha\eta(x),\\
\eta(x_1)&=\eta(x_2)=0.
\end{aligned}\right.
$$

此时稳定解条件为

$$
\left.\frac{\mathrm{d}J}{\mathrm{d}\alpha}\right|_{\alpha=0}=0,
$$

即

$$
\begin{aligned}
\frac{\mathrm{d}J}{\mathrm{d}\alpha}&=\int_{x_1}^{x_2}\frac{\partial f}{\partial y}\frac{\partial y}{\partial \alpha}+\frac{\partial f}{\partial \dot{y}}\frac{\partial \dot{y}}{\partial \alpha}\ \mathrm{d}x
=\int_{x_1}^{x_2}\left(\frac{\partial f}{\partial y}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial f}{\partial \dot{y}}\right)\frac{\partial y}{\partial \alpha}\ \mathrm{d}x+\left.\frac{\partial f}{\partial \dot{y}}\frac{\partial y}{\partial \alpha}\right|_{x_1}^{x_2}\\
&=\int_{x_1}^{x_2}\left(\frac{\partial f}{\partial y}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial f}{\partial \dot{y}}\right)\frac{\partial y}{\partial \alpha}\ \mathrm{d}x,
\end{aligned}
$$

条件化为

$$
\left.\frac{\mathrm{d}J}{\mathrm{d}\alpha}\right|_{\alpha=0}=\int_{x_1}^{x_2}\left(\frac{\partial f}{\partial y}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial f}{\partial \dot{y}}\right)\eta(x)\ \mathrm{d}x=0,\quad\forall\eta(x).
$$

定义变元

$$
\delta y:=\left.\frac{\partial y}{\partial \alpha}\right|_{\alpha=0}\mathrm{d}\alpha=\eta(x)\mathrm{d}\alpha,\quad\delta J:=\left.\frac{\mathrm{d}J}{\mathrm{d}\alpha}\right|_{\alpha=0}\mathrm{d}\alpha,
$$

得到

$$
\delta J=\int_{x_1}^{x_2}\left(\frac{\partial f}{\partial y}-\frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial f}{\partial \dot{y}}\right)\delta y\ \mathrm{d}x\equiv\int_{x_1}^{x_2}\frac{\delta f}{\delta y}\delta y\ \mathrm{d}x.
$$

## 拉格朗日方程

### 由哈密顿原理推导拉格朗日方程

¶根据上一小节的推导

$$
\delta I=\int_{t_1}^{t_2}\sum_{k}\frac{\delta L}{\delta q^k}\delta q^k\ \mathrm{d}t,
$$

又由哈密顿原理$\delta I=0$,

$$
\frac{\delta L}{\delta q^k}=0,
$$

得到拉格朗日方程，应用参见[最速降线](../examples/Chap_02.md#最速降线).

### 约束系统的哈密顿原理

¶对于自由度为$n$，并有$m$个完整约束的系统，为了在变分过程中体现完整约束$f^{(i)}(q^k,t)=0,\ i=1,\cdots,m$对虚位移的限制，使用拉格朗日乘子法(the method of _Lagrange undetermined multipliers_)

$$
I=\int_{t_1}^{t_2}L+\sum_{i=1}^{m}\lambda^{(i)}(t)f^{(i)}\ \mathrm{d}t,
$$

变分时交换自由度和约束的指标求和顺序

$$
\delta I=\int_{t_1}^{t_2}\sum_{k}\left(\frac{\delta L}{\delta q^k}+\sum_{i=1}^{m}\lambda^{(i)}(t)\frac{\partial f^{(i)}}{\partial q^k}\right)\delta q^k=0,
$$

其中$\lambda^{(i)}(t)$的选择是任意的.
¶由于$m$个完整约束限制自由度为$n-m$，此时可以选择$\lambda^{(i)}(t)$以消去$\delta q^j,\ j=1,\cdots,m$前的系数，剩下的$n-m$个虚位移相互独立，故也要求系数为零，于是

$$
\frac{\delta L}{\delta q^k}+\sum_{i=1}^{m}\lambda^{(i)}(t)\frac{\partial f^{(i)}}{\partial q^k}=0.
$$

应用参见[坡面滑落](../examples/Chap_02.md#半圆形坡面滑落).同时可得到约束力分量和第$i$个约束对应的约束力

$$
    Q^{(\text{holo})}_k=-\frac{\delta L}{\delta q^k}=\sum_{i=1}^{m}\lambda^{(i)}(t)\frac{\partial f^{(i)}}{\partial q^k},\quad
    \bm{Q}^{(i,\text{holo})}=\lambda^{(i)}(t)\nabla f^{(i)}.
$$

¶对于不可积的半完整约束(semi-holomonic constraint)

$$
    g^{(i)}(q^k,\dot{q}^k,t)=0,\ i=1,\cdots,l,
$$

也可得到[^1]
[^1]:见Am.J.Phys.34,406(1966);doi:10.1119/1.1973007

$$
\frac{\delta L}{\delta q^k}+\sum_{i=1}^{l}\mu^{(i)}(t)\left(\frac{\partial g^{(i)}}{\partial q^k}+\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial g^{(i)}}{\partial \dot{q}^k}\right)+\frac{\mathrm{d}\mu^{(i)}(t)}{\mathrm{d}t}\frac{\partial g^{(i)}}{\partial \dot{q}^k}=0,
$$

此约束力分量与第$i$个约束对应的约束力

$$
Q^{(\text{semi})}_{k}=\sum_{i=1}^{l}\mu^{(i)}(t)\frac{\delta g^{(i)}}{\delta q^k}+\frac{\mathrm{d}\mu^{(i)}(t)}{\mathrm{d}t}\frac{\partial g^{(i)}}{\partial \dot{q}^k},\quad\bm{Q}^{(i,\text{semi})}=\frac{1}{h_{q^k}}\left(\mu^{(i)}(t)\frac{\delta g^{(i)}}{\delta q^k}+\frac{\mathrm{d}\mu^{(i)}(t)}{\mathrm{d}t}\frac{\partial g^{(i)}}{\partial \dot{q}^k}\right)\hat{\bm{e}}_{q^k}.
$$

¶改写变分原理

$$
\delta I=0\Longleftrightarrow\delta\int_{t_1}^{t_2}T\ \mathrm{d} t=\int_{t_1}^{t_2}\sum_{k}\frac{\delta U}{\delta q^k}\delta q^k\ \mathrm{d} t=-\int_{t_1}^{t_2}\sum_{k}Q_k\delta q^k\ \mathrm{d} t.
$$

即在稳定值旁两相邻路径的动能的时间积分之差等于广义力在两路径间做虚功的时间积分之负值.
¶对于完整约束

$$
\mathrm{d} f^{(i)}=\sum_{k}\frac{\partial f^{(i)}}{\partial q^k}\delta q^k=\nabla f^{(i)}\cdot\delta\bm{r}=0\Longleftrightarrow \bm{Q}^{(i,\text{holo})}\cdot\delta\bm{r}=0.
$$

以上原理仍满足，对于理想的半完整约束$\bm{Q}^{(i,\text{semi})}\cdot\delta\bm{r}=0$也是如此.

### 拉格朗日力学[^2]的特点

[^2]: 指从变分原理发展的力学理论范式(formulation).

¶(1)独立于坐标框架的选取，如保持[点变换不变性](../examples/Chap_02.md#点变换不变性).
¶(2)规范变换不变性，即在变换$L\to L+\frac{\mathrm{d}}{\mathrm{d}t}F(q^j,t)$下不变,
其中
$$\frac{\mathrm{d}F}{\mathrm{d}t}=\dot{q}^j\frac{\partial F}{\partial q^j}+\frac{\partial F}{\partial t},$$
因此

$$
\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial }{\partial \dot{q}^j}-\frac{\partial }{\partial q^j}\right)\dot{F}=\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial }{\partial q^j}-\dot{q}^k\frac{\partial^2 }{\partial q^j \partial q^k}-\frac{\partial }{\partial q^j}\frac{\partial }{\partial t}\right)F=\left[\frac{\partial }{\partial t},\frac{\partial }{\partial q^j}\right]F=0,
$$

这一点也可由$\frac{\mathrm{d}}{\mathrm{d}t}F(q^j,t)$只在作用量中引入$F(q^j,t)|^{t_2}_{t_1}$的确定值直接证明.
¶(3)不局限于动力学系统.参见[电路方程](../examples/Chap_02.md#串联rl电路).

## 守恒律与对称性

¶为尽可能了解一个系统的物理性质，可在多数问题中考察此系统运动方程的一次积分

$$
f(q^k,\dot{q}^k,t)=\text{const}..
$$

### 广义动量守恒

¶定义广义动量（或称正则动量、共轭动量）

$$
p_{j}=\frac{\partial L}{\partial \dot{q}^j},
$$

若拉格朗日量$L$不含坐标$q^j$（称其为循环坐标，cyclic coordinate, ignorable coordinate），则由拉格朗日方程

$$
\frac{\mathrm{d}p_j}{\mathrm{d}t}=0\Longleftrightarrow p_j=\text{const}.,
$$

获得广义动量守恒律：与循环坐标共轭的广义动量守恒.注意循环坐标与其他坐标相独立，不参与约束.得到广义动量守恒关系有助于从问题中消去循环坐标，带入共轭广义动量，减少需要求解的方程个数.这一方法称为_Routh_方法.
¶广义动量守恒不同于动量守恒，不以牛顿第三定律为前提，适用范围更广.如若分布有电磁场$\phi=\phi(y,z),\ \bm{A}=\bm{A}(y,z)$，其中带电粒子拉格朗日量$L=\frac{1}{2}m\dot{\bm{r}}^2-q\phi+q\bm{A}\cdot\dot{\bm{r}}$

$$
\frac{\partial L}{\partial x}=0\Longleftrightarrow p_{x}=m\dot{x}+qA_{x}=\text{const}..
$$

### 能量守恒

¶因为

$$
\begin{aligned}
\frac{\mathrm{d}L}{\mathrm{d}t}&=\frac{\partial L}{\partial q^j}\dot{q}^j+\frac{\partial L}{\partial \dot{q}^j}\ddot{q}^j+\frac{\partial L}{\partial t}\\
&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial L}{\partial \dot{q}^j}\dot{q}^j+\frac{\partial L}{\partial \dot{q}^j}\ddot{q}^j+\frac{\partial L}{\partial t}\\
&=\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{q}^j\frac{\partial L}{\partial \dot{q}^j}\right)+\frac{\partial L}{\partial t},
\end{aligned}
$$

即

$$
\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{q}^j\frac{\partial L}{\partial \dot{q}^j}-L\right)+\frac{\partial L}{\partial t}=0,
$$

在$V$不显含时间的系统中，$\partial L/\partial t=0$得到

$$
H\equiv\dot{q}^j\frac{\partial L}{\partial \dot{q}^j}-L=\text{const}.\ (E=\text{const}.),
$$

定义了哈密顿量，这一等式称为_Jacobi_积分.
¶在$V$不含$\dot{q}^j$的三阶及以上项时，可将$L$按$\dot{q}^j$的幂次分解（$T=g_{ij}\dot{q}^{i}\dot{q}^{j}$，不引入$\dot{x}^j$的三阶及以上项）

$$
L=L_0+L_1+L_2,
$$

此时

$$
H=L_{1}+\dot{q}^{j}\frac{\partial L_{2}}{\partial \dot{q}^j}-L=L_{2}'-L_{0},
$$

即哈密顿量不含$\dot{q}^{j}$的一次项.特别地，在正交坐标系中$H=L_{2}-L_{0}$.
¶当系统存在_Stokes_型阻力耗散时

$$
\begin{aligned}
\frac{\mathrm{d}L}{\mathrm{d}t}&=\frac{\partial L}{\partial q^j}\dot{q}^j+\frac{\partial L}{\partial \dot{q}^j}\ddot{q}^j+\frac{\partial L}{\partial t}\\
&=\left(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial L}{\partial \dot{q}^j}+\frac{\partial \mathcal{F}}{\partial \dot{q}^{j}}\right)\dot{q}^j+\frac{\partial L}{\partial \dot{q}^j}\ddot{q}^j+\frac{\partial L}{\partial t}\\
&=\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{q}^j\frac{\partial L}{\partial \dot{q}^j}\right)+\frac{\partial L}{\partial t}+2\mathcal{F},
\end{aligned}
$$

即

$$
\frac{\mathrm{d}H}{\mathrm{d}t}+\frac{\partial L}{\partial t}+2\mathcal{F}=0.
$$

