测地线方程描述了弯曲时空中两点间的最短路径（或更一般地，极值路径），它是广义相对论和微分几何中的核心概念。下面我将从最基础的变分原理出发，完整推导测地线方程。

1. 出发点：弧长与变分原理

在具有度规  g_{\mu\nu}  的时空中，两个事件之间的时空间隔为  
$$
ds^2 = g_{\mu\nu} \, dx^\mu dx^\nu
$$
沿一条曲线 \( x^\mu(\lambda) \)（ \lambda  是曲线参数），固有长度（或类空间隔）为：
$$
S = \int ds = \int \sqrt{ g_{\mu\nu} \frac{dx^\mu}{d\lambda} \frac{dx^\nu}{d\lambda} } \, d\lambda
$$
但为了数学方便，特别是对于类时或类光线情况，我们常引入平方形式的作用量，利用变分原理得到相同的极值曲线方程。  

2. 两种作用量选择

2.1 用弧长作作用量

$$
L_1 = \sqrt{ g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu }, \quad \dot{x}^\mu = \frac{dx^\mu}{d\lambda}
$$
但平方根形式在  \dot{x}=0  或光锥上不方便，且在参数化变换下表现特殊。

2.2 用“能量型”作用量

更方便的是用：
$$
L_2 = \frac12 g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu
$$
这称为“测地线拉格朗日量”（相差因子不影响极值曲线形状）。对 L_2 用欧拉-拉格朗日方程得到的曲线与用 L_1 得到的在仿射参数下相同。

我们选择 S = \int L_2 \, d\lambda 进行变分。

3. 欧拉-拉格朗日方程

欧拉-拉格朗日方程为：
$$
\frac{d}{d\lambda} \left( \frac{\partial L_2}{\partial \dot{x}^\alpha} \right) - \frac{\partial L_2}{\partial x^\alpha} = 0
$$
先算：
$$
\frac{\partial L_2}{\partial \dot{x}^\alpha} = \frac12 g_{\mu\nu} ( \delta^\mu_\alpha \dot{x}^\nu + \dot{x}^\mu \delta^\nu_\alpha )
= \frac12 ( g_{\alpha\nu} \dot{x}^\nu + g_{\mu\alpha} \dot{x}^\mu )
$$
由于 g_{\mu\nu} 对称：
$$
\frac{\partial L_2}{\partial \dot{x}^\alpha} = g_{\alpha\nu} \dot{x}^\nu
$$
再算：
$$
\frac{\partial L_2}{\partial x^\alpha} = \frac12 \, \partial_\alpha g_{\mu\nu} \, \dot{x}^\mu \dot{x}^\nu
$$
其中 $$\partial_\alpha = \frac{\partial}{\partial x^\alpha}$$。

代入欧拉-拉格朗日方程：
$$
\frac{d}{d\lambda} \left( g_{\alpha\nu} \dot{x}^\nu \right) - \frac12 \partial_\alpha g_{\mu\nu} \, \dot{x}^\mu \dot{x}^\nu = 0
$$

4. 展开导数

注意 \(g_{\alpha\nu} = g_{\alpha\nu}(x(\lambda))\)，所以
$$
\frac{d}{d\lambda} g_{\alpha\nu} = (\partial_\mu g_{\alpha\nu}) \dot{x}^\mu
$$
于是：
$$
\frac{d}{d\lambda} \left( g_{\alpha\nu} \dot{x}^\nu \right) = (\partial_\mu g_{\alpha\nu}) \dot{x}^\mu \dot{x}^\nu + g_{\alpha\nu} \ddot{x}^\nu
$$
代入得：
$$
(\partial_\mu g_{\alpha\nu}) \dot{x}^\mu \dot{x}^\nu + g_{\alpha\nu} \ddot{x}^\nu - \frac12 \partial_\alpha g_{\mu\nu} \, \dot{x}^\mu \dot{x}^\nu = 0
$$
即：
$$
g_{\alpha\nu} \ddot{x}^\nu + \left[ \partial_\mu g_{\alpha\nu} - \frac12 \partial_\alpha g_{\mu\nu} \right] \dot{x}^\mu \dot{x}^\nu = 0
$$

5. 引入克氏符号

定义克里斯托弗符号（第二类）：
$$
\Gamma^\rho_{\mu\nu} = \frac12 g^{\rho\alpha} ( \partial_\mu g_{\alpha\nu} + \partial_\nu g_{\alpha\mu} - \partial_\alpha g_{\mu\nu} )
$$
我们需要将方括号项与此联系起来。  
注意括号内是：
$$
\partial_\mu g_{\alpha\nu} - \frac12 \partial_\alpha g_{\mu\nu}
$$
我们把它与 \Gamma 的定义比较。从定义可得：
$$
g_{\alpha\sigma} \Gamma^\sigma_{\mu\nu} = \frac12 ( \partial_\mu g_{\alpha\nu} + \partial_\nu g_{\alpha\mu} - \partial_\alpha g_{\mu\nu} )
$$
我们括号项并不对称于 \mu\leftrightarrow\nu，但注意在括号乘以 \dot{x}^\mu \dot{x}^\nu 时是对称的，所以可将其对称化（因 \dot{x}^\mu\dot{x}^\nu 对称）：

设 Q_{\alpha\mu\nu} = \partial_\mu g_{\alpha\nu} - \frac12 \partial_\alpha g_{\mu\nu}，对 \mu,\nu 对称部分为：
$$
Q_{\alpha(\mu\nu)} = \frac12 (Q_{\alpha\mu\nu} + Q_{\alpha\nu\mu})
$$
计算：
$$
Q_{\alpha\mu\nu} + Q_{\alpha\nu\mu} = \partial_\mu g_{\alpha\nu} - \frac12 \partial_\alpha g_{\mu\nu} + \partial_\nu g_{\alpha\mu} - \frac12 \partial_\alpha g_{\nu\mu}
$$
利用 g_{\mu\nu} 对称，有 \partial_\alpha g_{\mu\nu} = \partial_\alpha g_{\nu\mu}，所以：
$$
= \partial_\mu g_{\alpha\nu} + \partial_\nu g_{\alpha\mu} - \partial_\alpha g_{\mu\nu}
$$
这正是 2 g_{\alpha\sigma} \Gamma^\sigma_{\mu\nu}。

所以对称化后：
$$
Q_{\alpha(\mu\nu)} = g_{\alpha\sigma} \Gamma^\sigma_{\mu\nu}
$$
因为原方程中 \(Q_{\alpha\mu\nu} \dot{x}^\mu \dot{x}^\nu = Q_{\alpha(\mu\nu)} \dot{x}^\mu \dot{x}^\nu\)（对称化后作用于对称张量相同），所以可替换。

于是方程变成：
$$
g_{\alpha\nu} \ddot{x}^\nu + g_{\alpha\sigma} \Gamma^\sigma_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = 0
$$

6. 得到标准测地线方程

用 g^{\rho\alpha} 乘上式并对 \alpha 求和：
$$
\delta^\rho_\nu \ddot{x}^\nu + \Gamma^\rho_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = 0
$$
即：
$$
\ddot{x}^\rho + \Gamma^\rho_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = 0
$$
这就是仿射参数下的测地线方程。

其中，参数 \lambda 需满足沿曲线 g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = \text{const}，这正好是 L_2 为常数对应的条件，称为仿射参数。

7. 类时、类光、类空与参数选择

• 如果初始选择的作用量是 S = \int \sqrt{g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu
} \, d\lambda，并固定参数为固有时间 \tau（对类时曲线），则 g_{\mu\nu} \dot{x}^\mu \dot{x}^\nu = -c^2（约定号差 -+++），得到相同的方程形式，但此时参数已是仿射参数。

• 如果参数不是仿射参数，方程会多一项与速度平行的项，可通过重参数化消除。

8. 几何解释

测地线方程也可以从“切矢量的协变导数沿曲线为0”得到：
$$
\frac{D \dot{x}^\rho}{d\lambda} = \dot{x}^\nu \nabla_\nu \dot{x}^\rho = 0
$$
因为
$$
\nabla_\nu \dot{x}^\rho = \partial_\nu \dot{x}^\rho + \Gamma^\rho_{\nu\sigma} \dot{x}^\sigma
$$
而 \dot{x}^\nu \partial_\nu \dot{x}^\rho = \frac{d}{d\lambda} \dot{x}^\rho = \ddot{x}^\rho，所以：
$$
\dot{x}^\nu \nabla_\nu \dot{x}^\rho = \ddot{x}^\rho + \Gamma^\rho_{\nu\sigma} \dot{x}^\nu \dot{x}^\sigma = 0
$$
这与上面导出的方程一致。这表示切矢量沿曲线平行移动，即自平行曲线，是弯曲空间中的“直线”。

最终结论：测地线方程为
$$
\boxed{ \frac{d^2 x^\rho}{d\lambda^2} + \Gamma^\rho_{\mu\nu} \frac{dx^\mu}{d\lambda} \frac{dx^\nu}{d\lambda} = 0 }
$$
其中 \Gamma^\rho_{\mu\nu} 是 Levi-Civita 联络系数（由度规决定）。这是弯曲时空中自由粒子（仅受引力）的运动轨迹。