({
  katexConfig: {
    "macros": {
      "\\R": "\\mathbb{R}",
      "\\C": "\\mathbb{C}",
      "\\Z": "\\mathbb{Z}",
      "\\N": "\\mathbb{N}",
      "\\Q": "\\mathbb{Q}",
      "\\E": "\\mathbb{E}",
      "\\P": "\\mathbb{P}",
      "\\var": "\\operatorname{Var}",
      "\\cov": "\\operatorname{Cov}",
      "\\leftBrace": "\\left\\{\\begin{aligned}",
      "\\rightEnd": "\\end{aligned}\\right.",
      "\\upd": "\\mathrm{d}",
      "\\upg": "\\mathrm{g}",
      "\\upe": "\\mathrm{e}",
      "\\upi": "\\mathrm{i}",
      "\\diag":"\\operatorname{diag}"
    }
  },

  mathjaxConfig: {
    "tex": {},
    "options": {},
    "loader": {}
  },

  mermaidConfig: {
    "startOnLoad": false
  },
  style: {
    "fontFamily": {
      "base": [
        "Songti SC",        // macOS 系统宋体
        "SimSun",           // 备用宋体
        "STSong",           // 华文宋体
        "Times New Roman",  // 英文 Times New Roman
        "Times",            // 备用
        "serif"             // 最后备用
      ],
      "code": [
        "SF Mono",          // macOS 等宽字体
        "Menlo",
        "Monaco",
        "Consolas",
        "Courier New",
        "monospace"
      ]
    },
    "fontSize": 16,
    "lineHeight": 1.6
  },
})

