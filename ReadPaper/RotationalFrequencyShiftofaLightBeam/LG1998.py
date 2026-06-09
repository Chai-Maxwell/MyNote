import numpy as np
import matplotlib.pyplot as plt

plt.rcParams.update(
    {
        "font.family": "serif",
        "font.size": 11,
        "axes.titlesize": 13,
        "mathtext.fontset": "stix",
    }
)

# =========================
# 1. 参数与网格设置
# =========================
w0 = 1.0
limit = 3.0

# 背景光强 —— 高分辨率
x_dense = np.linspace(-limit, limit, 400)
y_dense = np.linspace(-limit, limit, 400)
X_dense, Y_dense = np.meshgrid(x_dense, y_dense)
R_dense = np.sqrt(X_dense**2 + Y_dense**2)

# 矢量箭头 —— 稀疏网格
n_arrows = 22
x_sparse = np.linspace(-limit, limit, n_arrows)
y_sparse = np.linspace(-limit, limit, n_arrows)
X_sparse, Y_sparse = np.meshgrid(x_sparse, y_sparse)
R_sparse = np.sqrt(X_sparse**2 + Y_sparse**2)
Phi_sparse = np.arctan2(Y_sparse, X_sparse)

phase_offset = 0

# =========================
# 2. 创建画布
# =========================
fig, axes = plt.subplots(2, 4, figsize=(13, 7.5))
fig.subplots_adjust(
    wspace=0.08, hspace=0.12, left=0.08, right=0.98, top=0.93, bottom=0.05
)

l_values = [1, 2, 3, 4]
sigma_values = [-1, 1]

for j, l in enumerate(l_values):
    for i, sigma in enumerate(sigma_values):
        ax = axes[i, j]

        # --- 背景光强 ---
        I_dense = ((R_dense**2) / (w0**2)) ** np.abs(l) * np.exp(
            -2 * (R_dense**2) / (w0**2)
        )
        # 用 imshow 叠加 pcolormesh：pcolormesh 做主渲染，imshow 做平滑
        ax.imshow(
            I_dense,
            extent=[-limit, limit, -limit, limit],
            cmap="Greys",
            origin="lower",
            alpha=0.55,
            interpolation="bicubic",
        )

        # --- 电场矢量 ---
        A_sparse = (R_sparse / w0) ** np.abs(l) * np.exp(-(R_sparse**2) / (w0**2))

        Ex = A_sparse * np.cos(l * Phi_sparse + phase_offset)
        Ey = A_sparse * (-sigma) * np.sin(l * Phi_sparse + phase_offset)

        mask = A_sparse > 0.55 * np.max(A_sparse)
        U = np.where(mask, Ex, np.nan)
        V = np.where(mask, Ey, np.nan)

        ax.quiver(
            X_sparse,
            Y_sparse,
            U,
            V,
            pivot="mid",
            color="#C44E52",
            width=0.0035,
            scale=1.0,
            scale_units="xy",
            headwidth=4.5,
            headlength=5.5,
            headaxislength=4.5,
        )

        # --- 对称轴标记 ---
        J = l + sigma
        if J != 0:
            angles = np.linspace(0, 2 * np.pi, J + 1)[:-1] if J > 0 else []
            for angle in angles:
                ax.plot(
                    [0, 2.6 * np.cos(angle)],
                    [0, 2.6 * np.sin(angle)],
                    color="blue",
                    linestyle=(0, (3, 5)),
                    lw=0.8,
                    alpha=0.7,
                )
                # 在轴线末端外侧标注角度（π 的分数形式，全部用 \dfrac）
                from math import gcd

                k = round(angle / (2 * np.pi) * J)  # angle = 2πk/J
                if k == 0:
                    label = r"$2\pi$"
                else:
                    n, d = 2 * k, J
                    g = gcd(n, d)
                    n, d = n // g, d // g
                    if d == 1:
                        label = rf"${n}\pi$" if n > 1 else r"$\pi$"
                    else:
                        num_str = rf"{n}\pi" if n > 1 else r"\pi"
                        label = rf"$\dfrac{{{num_str}}}{{{d}}}$"
                ax.text(
                    2.85 * np.cos(angle),
                    2.85 * np.sin(angle),
                    label,
                    fontsize=7,
                    color="blue",
                    alpha=0.8,
                    ha="center",
                    va="center",
                )

        # --- J 标签 ---
        ax.text(
            0.05,
            0.93,
            rf"$J = {J}$",
            transform=ax.transAxes,
            fontsize=12,
            verticalalignment="top",
            bbox=dict(
                boxstyle="round,pad=0.35",
                facecolor="white",
                edgecolor="none",
                alpha=0.85,
            ),
        )

        # --- 坐标轴 ---
        ax.set_xlim(-limit, limit)
        ax.set_ylim(-limit, limit)
        ax.set_aspect("equal")
        ax.set_xticks([])
        ax.set_yticks([])
        for spine in ax.spines.values():
            spine.set_visible(True)
            spine.set_linewidth(0.5)
            spine.set_edgecolor("#cccccc")

        # --- 行/列标签 ---
        if j == 0:
            pol_label = "LCP" if sigma == -1 else "RCP"
            ax.text(
                -0.18,
                0.5,
                rf"$\sigma = {sigma}$" + f"\n({pol_label})",
                transform=ax.transAxes,
                fontsize=12,
                va="center",
                ha="right",
                fontweight="bold",
            )
        if i == 0:
            ax.set_title(rf"$l = {l}$", fontsize=13, pad=8, fontweight="bold")

# 总标题
fig.suptitle(
    "Transverse electric field of circularly polarized LG beams",
    fontsize=14,
    fontweight="bold",
    y=0.98,
)

plt.savefig(
    "LG1998.png", dpi=600, bbox_inches="tight", facecolor="white", edgecolor="none"
)
plt.close()
