#!/bin/bash
# 将 CDN 字体镜像到本地 .config/font/ 目录，断网也能用
# 用法: cd .config && bash setup-fonts.sh

set -e
FONT_DIR="$(cd "$(dirname "$0")" && pwd)/font"
mkdir -p "$FONT_DIR"

mirror_font() {
  local pkg="$1"          # npm 包名
  local css_name="$2"     # 本地 CSS 文件名
  local css_url="https://cdn.jsdelivr.net/npm/${pkg}/font.css"

  echo "=== 处理 ${pkg} ==="
  local tmp_css="$FONT_DIR/${css_name}.tmp"
  curl -sL "$css_url" -o "$tmp_css"

  # 提取所有 woff2 路径并下载
  grep -oE "url\('[^']+\.woff2'\)" "$tmp_css" | sed "s/url('//;s/')//" | sort -u | while read -r woff; do
    local woff_url="https://cdn.jsdelivr.net/npm/${pkg}/${woff}"
    if [ ! -f "$FONT_DIR/$woff" ]; then
      curl -sL "$woff_url" -o "$FONT_DIR/$woff"
    fi
  done
  echo "  所有 WOFF2 已就绪"

  # 将 CSS 中的 CDN URL 替换为相对路径
  sed "s|https://cdn\.jsdelivr\.net/npm/${pkg}/||g" "$tmp_css" > "$FONT_DIR/${css_name}"
  rm "$tmp_css"
  echo "  本地 CSS 已生成: font/${css_name}"
}

mirror_font "cn-fontsource-fz-kai-z-03-regular"    "fz-kai-z-03.css"
mirror_font "cn-fontsource-fz-fang-song-z-02-s"    "fz-fang-song-z-02-s.css"

echo ""
echo "✅ 完成！字体已缓存到 $(basename "$FONT_DIR")/"
