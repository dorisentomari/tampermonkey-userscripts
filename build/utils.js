function parseTemplate(template, variables) {
  // 使用正则表达式匹配 ${key} 格式的变量
  return template.replace(/\${(.*?)}/g, (match, key) => {
    // 从 variables 对象中获取对应的值，若不存在则返回原始变量
    return variables[key] !== undefined ? variables[key] : match;
  });
}

const BannerMap = {
  // 纯文本，比如【==UserScript==】
  PURE_TEXT: 'PURE_TEXT',
  // 制表符分隔的变量，比如【@name         ${name}】
  MATCH_TAB: 'MATCH_TAB',
  // 换行
  EMPTY_LINE: 'EMPTY_LINE',
};

function parseTampermonkeyBanner(bannerList) {
  return bannerList
    .map((item) => {
      switch (item.type) {
        case BannerMap.PURE_TEXT:
          return `// ${item.text}`;
        case BannerMap.MATCH_TAB:
          return `// @${String(item.variable).padEnd(40, ' ')}${item.value}`;
        case BannerMap.EMPTY_LINE:
          const lines = item.lines || 1;
          return Array(lines).fill('\n').join('');
        default:
          return null;
      }
    })
    .filter(Boolean)
    .join('\n');
}

module.exports = {
  parseTemplate,
  BannerMap,
  parseTampermonkeyBanner,
};
