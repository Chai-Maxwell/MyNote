## *Dirac*函数的展开
\par因为
$$
\begin{aligned}
\langle\partial_{i}\delta,\phi\rangle&=\int_{\mathbb{R}^3}(\partial_{i}\delta)\phi\ \upd^3\bm{r}'\\
&=\int_{\mathbb{R}^3}\partial_{i}(\delta\phi)\ \upd^3\bm{r}'-\int_{\mathbb{R}^3}\delta\partial_{i}(\phi)\ \upd^3\bm{r}'\\
&=-\langle\delta,\partial_{i}\phi\rangle,
\end{aligned}
$$
递推得
$$
\langle(\bm{r}\cdot\nabla)^k\delta,\phi\rangle=(-1)^k\langle\delta,(\bm{r}\cdot\nabla)^k\phi\rangle,    
$$
故
$$
\begin{aligned}
\langle\delta(\bm{r}-\bm{r}_{0}),\phi(\bm{r})\rangle&=\langle\delta(\bm{r}),\phi(\bm{r}+\bm{r}_{0})\rangle\\
&=\left\langle\delta(\bm{r}),\sum_{k=0}^{\infty}\frac{1}{k!}(\bm{r}_{0}\cdot\nabla)^{k}\phi(\bm{r})\right\rangle\\
&=\sum_{k=0}^{\infty}\frac{1}{k!}\left\langle\delta(\bm{r}),(\bm{r}_{0}\cdot\nabla)^{k}\phi(\bm{r})\right\rangle\\
&=\sum_{k=0}^{\infty}\frac{(-1)^k}{k!}\left\langle(\bm{r}_{0}\cdot\nabla)^{k}\delta(\bm{r}),\phi(\bm{r})\right\rangle\\
&=\left\langle\sum_{k=0}^{\infty}\frac{1}{k!}(-\bm{r}_{0}\cdot\nabla)^{k}\delta(\bm{r}),\phi(\bm{r})\right\rangle
\end{aligned}
$$