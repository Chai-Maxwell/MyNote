## 点磁偶极子的电流分布
\par对于点磁偶极子
$$
0<\|\bm{m}\|<\infty\ (\Delta S\to0),
$$
其磁场分布
$$
\begin{aligned}
\bm{B}&=\frac{\mu_{0}}{4\pi}\nabla\times\left(\bm{m}\times\frac{\bm{r}}{\|\bm{r}\|^3}\right)=\mu_{0}\bm{m}\delta(\bm{r})-\frac{\mu_{0}}{4\pi}(\bm{m}\cdot\nabla)\frac{\bm{r}}{\|\bm{r}\|^3}\\
&=\mu_{0}\bm{m}\delta(\bm{r})-\frac{\mu_{0}}{4\pi}\nabla\left(\bm{m}\cdot\frac{\bm{r}}{\|\bm{r}\|^3}\right),
\end{aligned}
$$
电流分布
$$
\bm{J}=\frac{1}{\mu_{0}}\nabla\times\bm{B}=\bm{m}\times\nabla\delta(\bm{r}).    
$$
## 点磁偶极子层
\par设有点磁偶极子，电流均为$I$，密接形成空间中的$S$面
$$
\begin{aligned}
\bm{A}=\frac{\mu_{0}}{4\pi}\int_{\bm{m}(S)}\upd\bm{m}'\times\nabla_{\bm{r}'}\frac{1}{\|\bm{r}-\bm{r}'\|},
\end{aligned}
$$
因为
$$
\begin{aligned}
\int_{S}\nabla\times(\bm{a}\varphi)\cdot\upd\bm{f}'&=\bm{a}\cdot\oint_{\partial S}\varphi\ \upd\bm{l}'\\
&=\int_{S}(\nabla\varphi\times\bm{a})\cdot\upd\bm{f}'\\
&=\bm{a}\cdot\int_{S}\upd\bm{f}'\times\nabla\varphi,
\end{aligned}    
$$
即
$$
    \int_{S}\upd\bm{f}'\times\nabla\varphi=\oint_{\partial S}\varphi\ \upd\bm{l}',
$$
故
$$
\bm{A}=\frac{\mu_{0}I}{4\pi}\oint_{\partial S}\frac{\upd\bm{l}'}{\|\bm{r}-\bm{r}'\|}.    
$$
即点磁偶极子层$S$等效于载流线圈$\partial S$，而其激发的磁标势
$$
\varphi_{m}=\frac{1}{4\pi}\int_{\bm{m}(S)}\upd\bm{m}'\cdot\frac{\bm{r}-\bm{r}'}{\|\bm{r}-\bm{r}'\|^3}=\frac{I\Omega_{S}}{4\pi}.
$$