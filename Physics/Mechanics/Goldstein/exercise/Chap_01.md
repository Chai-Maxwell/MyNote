# Chapter 01
## Derivations
### $\mathscr{D}_1$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d1.png">
</figure>

\par The equation of motion:$$
    \bm{F}=\frac{\mathrm{d}\bm{p}}{\mathrm{d}t} ,  
$$
namely,
$$\bm{F}\cdot\bm{p}=\frac{\mathrm{d}\bm{p}}{\mathrm{d}t}\cdot\bm{p}=\frac{\mathrm{d}}{\mathrm{d}t}\left(\frac{p^2}{2}\right)=\frac{\mathrm{d}(mT)}{\mathrm{d}t}.$$
### $\mathscr{D}_2$
<figure class="image-round" style="--image-width:80%;--broader-radius:10px;">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d2.png">
</figure>

\par Because $M\bm{R}=\sum_{i}m^{(i)}\bm{r}^{(i)}$,
$$
\begin{aligned}
    M^2R^2&=\left(\sum_{i}m^{(i)}\bm{r}^{(i)}\right)\cdot\left(\sum_{j}m^{(j)}\bm{r}^{(j)}\right)\\
    &=\sum_{i}(m^{(i)})^2(r^{(i)})^2+\sum_{i\neq j}m^{(i)}m^{(j)}\bm{r}^{(i)}\cdot\bm{r}^{(j)}\\
    &=\sum_{i}(m^{(i)})^2(r^{(i)})^2+\frac{1}{2}\sum_{i\neq j}m^{(i)}m^{(j)}[(r^{(i)})^2+(r^{(j)})^2-(r^{(ij)})^2]\\
    &=M\sum_{i}m^{(i)}(r^{(i)})^2-\frac{1}{2}\sum_{i\neq j}m^{(i)}m^{(j)}(r^{(ij)})^2.
\end{aligned}
$$
### $\mathscr{D}_3$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d3.png">
</figure>

\par Eqs.(1.22):
$$
    M\frac{\mathrm{d}^2\bm{R}}{\mathrm{d}t^2}=\bm{F}^{(e)},
$$
Eqs.(1.26):
$$
    \frac{\mathrm{d}\bm{L}}{\mathrm{d}t}=\bm{N}^{(e)},
$$
The weak law:
$$
    \bm{F}_{ij}+\bm{F}_{ji}=0,
$$
The strong law:
$$
    \bm{F}_{ij}+\bm{F}_{ji}=0,\quad \text{lie along the line joining the particles}.
$$
$$
M\frac{\mathrm{d}^2\bm{R}}{\mathrm{d}t^2}=\sum_{i}m^{(i)}\frac{\mathrm{d}^2\bm{r}^{(i)}}{\mathrm{d}t^2}=\sum_{i}\left[(\bm{F}^{(i)})^{(e)}+\sum_{j\neq i}\bm{F}^{(ji)}\right]=\bm{F}^{(e)}+\sum_{i\neq j}(\bm{F}_{ij}+\bm{F}_{ji}),
$$
implies,
$$
    \sum_{i\neq j}(\bm{F}_{ij}+\bm{F}_{ji})=0,\quad \text{forall particle number N of the considered system},
$$
suggesting that the weak law holds true. The same approach can be applied on the argument of the strong law.
### $\mathscr{D}_{4}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d4.png">
</figure>

\par Eqs.(1.39):
$$
\begin{aligned}
\mathrm{d}x-a\sin\theta\mathrm{d}\phi&=0,\\
\mathrm{d}y+a\cos\theta\mathrm{d}\phi&=0,
\end{aligned}
$$
For the first align in Eqs.(1.39):$g_{1x}=1,g_{1y}=0,g_{1\phi}=-a\sin\theta,g_{1\theta}=0.$
$$
\frac{\partial(fg_{1\phi})}{\partial\theta}=-a\sin\theta\frac{\partial f}{\partial\theta}-fa\cos\theta=\frac{\partial(fg_{1\theta})}{\partial\phi}=0,
$$
implies
$$f=\frac{1}{\sin\theta}+h(x,y,\phi).$$
Putting this result into
$$
\frac{\partial(fg_{1x})}{\partial\theta}=-\frac{\cos\theta}{\sin^2\theta}\neq0=\frac{\partial(fg_{1\theta})}{\partial x},
$$
thus prove $f$ does not exist by contradiction. So does the second align.
### $\mathscr{D}_{5}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d5_1.png">
</figure>
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d5_2.png">
</figure>
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d5_3.png">
</figure>

### $\mathscr{D}_{6}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d6.png">
</figure>

$$\frac{\mathrm{d}x}{f(t)-x}+\frac{\mathrm{d}y}{y}+0\cdot\mathrm{d}t=0.$$
suppose
$$\frac{\partial}{\partial t}\left(\frac{g}{y}\right)=\frac{g_{t}}{y}=0,$$
implies
$$
g=g(x,y),    
$$
thus,
$$
\frac{\partial}{\partial t}\left(\frac{g}{f(t)-x}\right)=-\frac{g}{(f(t)-x)^2}f'(t)=0.
$$
However $f(t)\neq\text{const}.$, so the constraint is nonholonomic.
### $\mathscr{D}_{7}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d7.png">
</figure>

For $T(q^{j},\dot{q}^{j},t)$
$$
\frac{\mathrm{d}}{\mathrm{d}t}=\dot{q}^j\frac{\partial}{\partial q^j}+\ddot{q}^j\frac{\partial}{\partial \dot{q}^j}+\frac{\partial}{\partial t},
$$
the communicator
$$
\left[\frac{\partial}{\partial\dot{q}^j},\frac{\mathrm{d}}{\mathrm{d}t}\right]=\frac{\partial}{\partial q^j},
$$
thus,
$$
Q_{j}=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial\dot{q}^j}-\frac{\partial T}{\partial q^j}=\left(\frac{\partial}{\partial\dot{q}^j}\frac{\mathrm{d}}{\mathrm{d}t}-\left[\frac{\partial}{\partial\dot{q}^j},\frac{\mathrm{d}}{\mathrm{d}t}\right]\right)T-\frac{\partial T}{\partial q^j}=\frac{\partial\dot{T}}{\partial\dot{q}^j}-2\frac{\partial T}{\partial q^j}.
$$
### $\mathscr{D}_{8}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d8.png">
</figure>

$$\frac{\mathrm{d}F}{\mathrm{d}t}=\dot{q}^j\frac{\partial F}{\partial q^j}+\frac{\partial F}{\partial t},$$
thus,
$$
\left(\deri{}{t}\part{}{\dot{q}^j}-\part{}{q^j}\right)\dot{F}=\left(\deri{}{t}\part{}{q^j}-\dot{q}^k\partSec{}{q^j}{q^k}-\part{}{q^j}\part{}{t}\right)F=\left[\part{}{t},\part{}{q^j}\right]F=0.
$$
### $\mathscr{D}_{9}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d9.png">
</figure>

\par Adopting System of International Units (SI), $L=T-q\phi+q\bm{v}\cdot\bm{A}$
$$L\longrightarrow L+q\bm{v}\cdot\nabla\psi+q\frac{\partial\psi}{\partial t}=L+q\deri{\psi}{t},$$
because the result remains satisfying Lagrange's equations, the motion stays unchanged.
### $\mathscr{D}_{10}$
<figure class="image-round" style="--image-width:80%">
  <img src="/Physics/Mechanics/Goldstein/figurebank/image_exe01_d10.png">
</figure>

\par Because
$$L=L(q^k(s^j,t),\dot{q}^k(s^j,\dot{s}^j,t),t),$$
then$$
\part{}{s^j}=\part{}{q^k}\part{q^k}{s^j}+\part{}{\dot{q}^k}\part{\dot{q}^k}{s^j},\quad\part{}{\dot{s}^j}=\part{}{\dot{q}^k}\part{\dot{q}^k}{\dot{s}^j}=\part{}{\dot{q}^k}\part{q^k}{s^j},
$$
we get
$$
\begin{aligned}
\deri{}{t}\left(\part{L}{\dot{s}^j}\right)-\part{L}{s^j}&=\deri{}{t}\left(\part{q^k}{s^j}\part{L}{\dot{q}^k}\right)-\part{q^k}{s^j}\part{L}{q^k}-\part{L}{\dot{q}^k}\part{\dot{q}^k}{s^j}\\
&=\left(\deri{}{t}\part{L}{\dot{q}^k}-\part{L}{q^k}\right)\part{q^k}{s^j}+\left(\deri{}{t}\part{q^k}{s^j}-\part{\dot{q}^k}{s^j}\right)\part{L}{\dot{q}^k}=0.
\end{aligned}
$$

## Exercises
### $\mathscr{E}_1$
### $\mathscr{E}_2$
### $\mathscr{E}_3$
### $\mathscr{E}_4$
### $\mathscr{E}_5$
### $\mathscr{E}_6$
### $\mathscr{E}_7$