# style.css 美化方案

## 现状分析

当前 CSS 服务于 Markdown Preview Enhanced（Crossnote 内嵌），以暖金色（`#dcb48c`）为主色调，正文仿宋 + 标题楷体的搭配营造了学术/笔记氛围。已有样式覆盖了标题、引用块、代码块、图片、链接、高亮、分割线等常见元素。

### 已做得好的部分

- 标题层级用 § 编号 + 下划线区分，层次清晰
- 引用块有左色条 + 圆角 + 微阴影，辨识度高
- 代码块用主题色半透明底，与整体融合
- 图片圆角 + 阴影 + 题注右对齐色条，有设计感
- CDN 分包字体解决了 Safari 沙盒问题

### 待完善的问题

| 问题 | 说明 |
|------|------|
| 表格无样式 | 纯裸表格，无边框无斑马纹 |
| 列表缺乏层次 | ul/ol 缩进、间距、标记符号均可细化 |
| 行内代码无样式 | `` `code` `` 与正文无区分 |
| 无 `strong` 样式 | 粗体仅靠默认，与仿宋搭配不协调 |
| `em` 的 STFangsong 有 Safari 兼容风险 | 应改用 CDN 仿宋字体 |
| 链接的 STKaiti 有 Safari 兼容风险 | 应改用 CDN 楷体 |
| 无脚注样式 | MPE 支持的 `[^1]` 脚注无定制 |
| 无任务列表样式 | `- [ ]` / `- [x]` 无美化 |
| 无表格内容容器样式 | 无 TOC、admonition 等样式 |
| 无选中文字样式 | `::selection` 默认系统蓝 |
| 打印无优化 | `@media print` 未定义 |
| 暗色模式缺失 | 无 `@media (prefers-color-scheme: dark)` |
| 滚动条未定制 | WebKit 滚动条保持默认 |
| `.gold` 类无字体设置 | 不继承/覆盖不明确 |

---

## 美化方案

### 一、表格（table）

```css
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5em 0;
  font-size: 0.95em;
}
.markdown-body th {
  background: rgba(220, 180, 140, 0.15);
  border-bottom: 2px solid #dcb48c;
  padding: 10px 14px;
  font-family: "FZKai-Z03", "Times New Roman";
  font-weight: normal;
  text-align: left;
}
.markdown-body td {
  padding: 8px 14px;
  border-bottom: 1px solid rgba(220, 180, 140, 0.3);
}
.markdown-body tr:nth-child(even) td {
  background: rgba(220, 180, 140, 0.05);
}
```

### 二、列表（ul / ol）

```css
.markdown-body ul, .markdown-body ol {
  padding-left: 1.8em;
  margin: 0.8em 0;
}
.markdown-body li {
  margin: 0.3em 0;
  line-height: 1.7;
}
.markdown-body ul li::marker {
  color: #dcb48c;
}
.markdown-body ol li::marker {
  color: #dcb48c;
  font-family: "Times New Roman";
}
/* 嵌套列表字号不缩小 */
.markdown-body li ul, .markdown-body li ol {
  margin: 0.2em 0;
}
```

### 三、行内代码（inline code）

```css
.markdown-body code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 0.85em;
  background: rgba(220, 180, 140, 0.12);
  padding: 2px 6px;
  border-radius: 3px;
  color: #8b6914;
}
/* 区分代码块内的行内 code（还原） */
.markdown-body pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
  border-radius: 0;
}
```

### 四、粗体与强调

```css
.markdown-body strong {
  font-weight: 600;
  color: #1a1a1a;
}
.markdown-body em {
  font-family: "FZFangSong-Z02S", "Times New Roman";  /* 改用CDN仿宋 */
  font-style: italic;
  color: #1a1a1a;
}
```

### 五、链接（a）

```css
.markdown-body a {
  font-family: "FZKai-Z03", "Times New Roman";  /* 改用CDN楷体 */
  color: #c9a06c;                               /* 稍深，提升可读性 */
  text-decoration: none;
  border-bottom: 1px dashed #dcb48c;
  transition: border-color 0.2s, color 0.2s;
}
.markdown-body a:hover {
  color: #b8860b;
  border-bottom-style: solid;
}
```

### 六、脚注（footnote）

```css
.markdown-body .footnote {
  font-size: 0.85em;
  color: #666;
  border-top: 1px solid rgba(220, 180, 140, 0.4);
  margin-top: 3em;
  padding-top: 1em;
}
.markdown-body .footnote p {
  margin: 0.3em 0;
}
```

### 七、任务列表

```css
.markdown-body .task-list {
  padding-left: 0;
}
.markdown-body .task-list-item {
  list-style: none;
}
.markdown-body .task-list-item input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #dcb48c;
}
```

### 八、选中文字

```css
.markdown-body ::selection {
  background: rgba(220, 180, 140, 0.35);
  color: #1a1a1a;
}
```

### 九、打印优化

```css
@media print {
  .markdown-body {
    background: white;
    max-width: 100%;
    padding: 0;
    font-size: 12pt;
  }
  .markdown-body blockquote {
    background: transparent;
    box-shadow: none;
  }
  .markdown-body pre code {
    background: transparent !important;
    border: 1px solid #ccc;
  }
}
```

### 十、暗色模式

提供一套浅暗色方案（以深灰底 + 暖金点缀），不强制，用户可在 MPE 中选择亮/暗主题：

```css
@media (prefers-color-scheme: dark) {
  .markdown-body {
    background-color: rgba(30, 30, 30, 0.95);
    color: #d4d4d4;
  }
  .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
    color: #e8e8e8;
    border-color: rgba(220, 180, 140, 0.6);
  }
  .markdown-body h2:before, .markdown-body h3:before, .markdown-body h4:before {
    color: #dcb48c;
  }
  .markdown-body blockquote {
    background-color: rgba(220, 180, 140, 0.06);
    color: #ccc;
    box-shadow: none;
  }
  .markdown-body pre code {
    background: rgba(220, 180, 140, 0.08) !important;
    border-color: rgba(220, 180, 140, 0.2);
    color: #d4d4d4;
  }
  .markdown-body code {
    background: rgba(220, 180, 140, 0.15);
    color: #e0c080;
  }
  .markdown-body a { color: #dcb48c; }
  .markdown-body th { background: rgba(220, 180, 140, 0.1); }
  .markdown-body tr:nth-child(even) td { background: rgba(220, 180, 140, 0.04); }
  .markdown-body hr { border-color: rgba(220, 180, 140, 0.4); }
  .markdown-body mark {
    background-color: #5a4a20;
    color: #e8d8a0;
    border-left-color: #dcb48c;
  }
  .markdown-body .gold { color: #daa520; }
}
```

### 十一、滚动条（WebKit）

```css
.markdown-body ::-webkit-scrollbar { width: 6px; height: 6px; }
.markdown-body ::-webkit-scrollbar-thumb {
  background: rgba(220, 180, 140, 0.4);
  border-radius: 3px;
}
.markdown-body ::-webkit-scrollbar-track { background: transparent; }
```

### 十二、其他细节

- **`kbd` 键盘按键**：加边框 + 圆角 + 微阴影
- **`del` 删除线**：降低不透明度

---

## 实施优先级

| 优先级 | 模块 | 理由 |
|--------|------|------|
| ⭐⭐⭐ | 行内代码 | 高频使用，当前完全无样式 |
| ⭐⭐⭐ | 表格 | 学术笔记中表格常见，裸表格不可用 |
| ⭐⭐⭐ | font 兼容修复（em / a） | 消除 Safari STKaiti/STFangsong 风险 |
| ⭐⭐ | 列表 | 提升阅读节奏感 |
| ⭐⭐ | strong / 选中文字 | 低成本高感知 |
| ⭐ | 暗色模式 | 完整但工作量大，需逐色验证 |
| ⭐ | 脚注 / 任务列表 | 低频使用 |
| ⭐ | 打印 / 滚动条 | 锦上添花 |

---

## 不变的部分

- 主色调 `#dcb48c` 保持不变
- 正文字体 `FZFangSong-Z02S`（仿宋）不变
- 标题/引用块字体 `FZKai-Z03`（楷体）不变
- 标题 § 编号体系不变
- 引用块 / 图片 / 代码块核心样式不变
- 整体 900px 居中布局不变
