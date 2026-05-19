# Chapter 02
## Derivation
### $\mathscr{D}_{1}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe02_d1.png">
</figure>

\parThe total time $T$ to travel along a path $y(x)$
$$T = \int \frac{ds}{v} = \int_{0}^{x_2} \frac{\sqrt{1 + y'^2}}{\sqrt{2gy}} dx = \frac{1}{\sqrt{2g}} \int_{0}^{x_2} \sqrt{\frac{1 + y'^2}{y}} dx$$
Since $f$ does not depend explicitly on $x$, we can use the *Beltrami* identity
$$f - y' \frac{\partial f}{\partial y'} = C$$
Substituting $f$
$$\sqrt{\frac{1 + y'^2}{y}} - y' \left( \frac{y'}{\sqrt{y(1 + y'^2)}} \right) = C$$
$$\frac{1 + y'^2 - y'^2}{\sqrt{y(1 + y'^2)}} = C \implies \frac{1}{\sqrt{y(1 + y'^2)}} = C$$
Squaring both sides and defining a new constant $2a = 1/C^2$
$$y(1 + y'^2) = 2a \implies y'^2 = \frac{2a - y}{y} \implies \frac{dy}{dx} = \sqrt{\frac{2a - y}{y}}$$
To solve $dx = \sqrt{\frac{y}{2a - y}} dy$, we use the substitution $y = a(1 - \cos\theta)$
$$dy = a \sin\theta \, d\theta$$
$$dx = \sqrt{\frac{a(1 - \cos\theta)}{a(1 + \cos\theta)}} (a \sin\theta) d\theta = \sqrt{\frac{2 \sin^2(\theta/2)}{2 \cos^2(\theta/2)}} (2a \sin(\theta/2) \cos(\theta/2)) d\theta = 2a \sin^2(\theta/2) d\theta$$
Using $2\sin^2(\theta/2) = 1 - \cos\theta$
$$dx = a(1 - \cos\theta) d\theta \implies x = a(\theta - \sin\theta) + C'$$
With initial point $(0,0)$, we get $C' = 0$ and $\theta = 0$. The equations
$$x = a(\theta - \sin\theta), \quad y = a(1 - \cos\theta)$$
describe a cycloid with a cusp at the origin ($\theta=0$, where $y=0$ and the slope is infinite).

----
\parNow, suppose the particle is projected with initial kinetic energy $K_0 = \frac{1}{2}mv_0^2$ at $y=0$.
$$T = \int \frac{\sqrt{1 + y'^2}}{\sqrt{v_0^2 + 2gy}} dx$$
Define a shift in the coordinate $y$ by letting $y = Y - z$, where $z = \frac{v_0^2}{2g}$. Note that $dy = dY$.
Then $v_0^2 + 2gy = 2g(z + y) = 2gY$. Substituting this into the integral:
$$T = \frac{1}{\sqrt{2g}} \int \sqrt{\frac{1 + Y'^2}{Y}} dx$$
This is the exact same form as the original brachistochrone problem. Therefore, the solution for $Y(x)$ is a cycloid:
$$x = a(\theta - \sin\theta) + C, \quad Y = a(1 - \cos\theta)$$
\parA cycloid has a cusp where its height $Y = 0$.In our original coordinates, $Y=0$ corresponds to
$$y = Y - z = 0 - z = -z$$
Since $y$ is positive downwards, $y = -z$ means the cusp is at a height $z$ above the initial point.
### $\mathscr{D}_{2}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe02_d2.png">
</figure>

\parThe mechanical angular momentum is defined as
$$
L_{\theta}=\part{T}{\dot{\theta}},    
$$ 
The general angular momentum is defined as
$$
\begin{aligned}
p_{\theta}&=\part{L}{\dot{\theta}}=L_{\theta}-\part{U}{\dot{\theta}}\\
&=L_{\theta}-\part{U}{\dot{x}^{(i),j}}\part{\dot{x}^{(i),j}}{\dot{\theta}}=\nabla_{\bm{v}^{(i)}}U\cdot\part{\bm{r}^{(i)}}{\dot{\theta}}\\
&=\nabla_{\bm{v}^{(i)}}U\cdot(\bm{n}\times\bm{r}^{(i)})\\
&=\bm{n}\cdot(\bm{r}^{(i)}\times\nabla_{\bm{v}^{(i)}}U).
\end{aligned}
$$
\parFor the electromagnetic field
$$
U=q^{(i)}\varphi^{(i)}-q^{(i)}\bm{v}^{(i)}\cdot\bm{A}^{(i)}    
$$
thus
$$
p_{\theta}=L_{\theta}+\bm{n}\cdot(\bm{r}^{(i)}\times q{(i)}\bm{A}^{(i)}).    
$$
### $\mathscr{D}_{3}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe02_d3.png">
</figure>

$$
J=\int_{t_{1}}^{t_{2}}\sqrt{\dot{x}^2+\dot{y}^2+\dot{z}^2}\ \upd t,    
$$
implies
$$
f=\sqrt{\dot{x}^2+\dot{y}^2+\dot{z}^2},
$$
applying the *Langrange* equation
$$
\delt{f}{t}=-\deri{}{t}\frac{\dot{x}_{i}}{\|\dot{\bm{r}}\|}=\frac{\dot{x}_{i}^2\ddot{x}_{i}/\|\dot{\bm{r}}\|-\|\dot{\bm{r}}\|\ddot{x}_{i}}{\dot{\bm{r}}^2}=0,
$$
resulting
$$
\ddot{x}_{i}=0\implies x_{i}=a_{i}t+b_{i}.    
$$

### $\mathscr{D}_{4}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe02_d4.png">
</figure>

$$
J=\int_{\theta_{1}}^{\theta_{2}}r\sqrt{(\sin\theta\varphi_{\theta})^2+1}\ \upd\theta,
$$
implies
$$
f(\theta)=\sqrt{(\sin\theta\varphi_{\theta})^2+1},\quad\varphi(\theta_{1})=\varphi(\theta_{2}),    
$$
applying the *Beltrami* identity
$$
\varphi_{\theta}\part{f}{\varphi_{\theta}}-f=\frac{\sin^2\theta\cdot\varphi_{\theta}^2-f^2}{f}=C\implies\sin\theta\varphi_{\theta}=C'    
$$