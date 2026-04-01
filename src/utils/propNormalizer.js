// 属性标准化工具
export const normalizeProps = (props, componentType) => {
  const normalized = { ...props };

  // 标准化颜色值
  if (normalized.backgroundColor && typeof normalized.backgroundColor === 'string') {
    normalized.backgroundColor = normalizeColor(normalized.backgroundColor);
  }

  if (normalized.color && typeof normalized.color === 'string') {
    normalized.color = normalizeColor(normalized.color);
  }

  // 标准化尺寸属性 - 自动添加单位
  const sizeProps = ['fontSize', 'width', 'height', 'padding', 'margin', 'borderRadius', 'top', 'left'];
  sizeProps.forEach(prop => {
    if (normalized[prop] && typeof normalized[prop] === 'string') {
      normalized[prop] = normalizeSize(normalized[prop], prop);
    }
  });

  return normalized;
};

// 标准化颜色值
const normalizeColor = (color) => {
  if (['红色', '蓝色', '绿色', '黄色', '黑色', '白色'].includes(color)) {
    const colorMap = {
      '红色': '#ff0000',
      '蓝色': '#0000ff',
      '绿色': '#00ff00',
      '黄色': '#ffff00',
      '黑色': '#000000',
      '白色': '#ffffff'
    };
    return colorMap[color] || color;
  }
  return color;
};

// 标准化尺寸值
const normalizeSize = (value, prop) => {
  // 如果是纯数字字符串，转换为数字并添加单位
  if (typeof value === 'string' && !isNaN(value) && value !== '') {
    const numValue = parseFloat(value);
    if (['fontSize', 'borderRadius', 'top', 'left', 'width', 'height', 'padding', 'margin'].includes(prop)) {
      return `${numValue}px`;
    }
    return value;
  }

  // 如果已经有单位，直接返回
  if (typeof value === 'string' && (value.includes('px') || value.includes('%') || value.includes('rem'))) {
    return value;
  }

  return value; // 其他情况保持原样
};
