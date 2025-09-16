// // 自定义插件，用于移除导致错误的 "inline" 相关规则
// const inlineRemover = {
//   postcssPlugin: 'inline-remover',
//   // 遍历所有 @ 规则 (例如 @import)
//   AtRule(atRule) {
//     // 如果 @ 规则的参数中包含 'inline'，则移除它
//     if (atRule.params && atRule.params.includes('inline')) {
//       atRule.remove();
//     }
//   },
//   // 遍历所有普通 CSS 规则
//   Rule(rule) {
//     // 如果选择器就是 'inline'，这很可能是错误来源，移除它
//     if (rule.selector === 'inline') {
//       rule.remove();
//     }
//   }
// };

// module.exports = {
//   plugins: [
//     // inlineRemover, // 首先运行我们的自定义插件来清理 CSS
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ],
// };
