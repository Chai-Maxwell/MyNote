({
  onWillParseMarkdown: async function (markdown) {
    let processed = markdown;

    // 辅助函数：检查是否在代码块中
    function isInCodeBlock(string, offset) {
      const before = string.substring(0, offset);
      const codeBlockCount = (before.match(/```/g) || []).length;
      const inlineCodeCount = (before.match(/`[^`]*$/g) || []).length;
      return codeBlockCount % 2 === 1 || inlineCodeCount > 0;
    }

    // 辅助函数：匹配平衡的大括号
    function extractBalancedBraces(str, startPos) {
      if (str[startPos] !== '{') {
        return null;
      }

      let depth = 1;
      let pos = startPos + 1;

      while (pos < str.length && depth > 0) {
        if (str[pos] === '{') {
          depth++;
        } else if (str[pos] === '}') {
          depth--;
        }
        pos++;
      }

      if (depth === 0) {
        return str.substring(startPos, pos);
      }

      return null; // 不匹配
    }

    // 解析和替换宏命令
    function replaceMacro(processed, macroName, numArgs, callback) {
      let index = 0;
      const macroPattern = new RegExp(`\\\\${macroName}\\b`, 'g');
      let result = '';
      let lastIndex = 0;

      while ((match = macroPattern.exec(processed)) !== null) {
        const macroStart = match.index;

        // 从当前位置开始检查
        index = macroStart;

        if (isInCodeBlock(processed, macroStart)) {
          result += processed.substring(lastIndex, macroStart + match[0].length);
          lastIndex = macroStart + match[0].length;
          continue;
        }

        // 保存当前位置
        macroPattern.lastIndex = macroStart + match[0].length;

        // 提取所有参数
        const args = [];
        let currentPos = macroStart + match[0].length;
        let hasError = false;

        for (let i = 0; i < numArgs; i++) {
          // 跳过可能的空白字符
          while (currentPos < processed.length && /\s/.test(processed[currentPos])) {
            currentPos++;
          }

          if (currentPos >= processed.length || processed[currentPos] !== '{') {
            hasError = true;
            break;
          }

          const arg = extractBalancedBraces(processed, currentPos);
          if (!arg) {
            hasError = true;
            break;
          }

          // 去掉最外层的大括号
          args.push(arg.substring(1, arg.length - 1));
          currentPos += arg.length;
        }

        if (hasError || args.length !== numArgs) {
          // 参数不匹配，保持原样
          result += processed.substring(lastIndex, macroStart + match[0].length);
          lastIndex = macroStart + match[0].length;
          continue;
        }

        // 应用回调函数生成替换内容
        const replacement = callback(args, macroStart, processed);

        // 添加替换前的内容
        result += processed.substring(lastIndex, macroStart);
        // 添加替换内容
        result += replacement;

        lastIndex = currentPos;

        // 重置正则表达式搜索位置
        macroPattern.lastIndex = lastIndex;
      }

      // 添加剩余内容
      result += processed.substring(lastIndex);
      return result;
    }

    // 规则1：将 \par替换为 &ensp;（段首空格）
    processed = processed.replace(/\\par\b/g, function (match, offset, string) {
      if (isInCodeBlock(string, offset)) {
        return match;
      }
      return '¶​';
    });

    // 规则2：将 \part{a}{b} 替换为 \frac{\partial a}{\partial b}（偏导数）
    processed = replaceMacro(processed, 'part', 2, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\frac{\\partial ${numerator}}{\\partial ${args[1]}}`;
    });

    // 规则3：将 \deri{a}{b} 替换为 \frac{\mathrm{d}a}{\mathrm{d}b}（微分）
    processed = replaceMacro(processed, 'deri', 2, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\frac{\\mathrm{d}${numerator}}{\\mathrm{d}${args[1]}}`;
    });

    // 规则4：将 \partSec{a}{b}{c} 替换为 \frac{\partial^2 a}{\partial b \partial c}（二阶偏导数）
    processed = replaceMacro(processed, 'partSec', 3, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\frac{\\partial^2 ${numerator}}{\\partial ${args[1]} \\partial ${args[2]}}`;
    });

    // 规则5：将 \delt{a}{b} 替换为 \frac{\delta a}{\delta b}（微分）
    processed = replaceMacro(processed, 'delt', 2, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\frac{\\delta ${numerator}}{\\delta ${args[1]}}`;
    });

    // 规则6：将 \dbm{a} 替换为 \dot{\bm{a}}
    processed = replaceMacro(processed, 'dbm', 1, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\dot{\\bm{${numerator}}}`;
    });

    // 规则7：将 \ddbm{a} 替换为 \ddot{\bm{a}}
    processed = replaceMacro(processed, 'ddbm', 1, function (args, offset, string) {
      const numerator = args[0] || ' ';
      return `\\ddot{\\bm{${numerator}}}`;
    });

    return processed;
  },

  onDidParseMarkdown: async function (html) {
    return html;
  },
})