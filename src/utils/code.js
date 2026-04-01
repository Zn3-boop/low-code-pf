import { format } from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

// 生成React代码
export const generateReactCode = async (dsl) => {
  const imports = generateImports(dsl);
  const componentCode = generateComponent(dsl);

  const rawCode = `
${imports}

export default function GeneratedPage() {
  return (
    ${componentCode}
  );
}
`;

  try {
    const formattedCode = await format(rawCode, {
      parser: 'babel',
      plugins: [parserBabel],
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 100,
      arrowParens: 'always',
    });
    return formattedCode;
  } catch (error) {
    console.error('代码格式化失败:', error);
    return rawCode;
  }
};

// 生成导入语句
const generateImports = (dsl) => {
  const components = extractComponents(dsl);
  const importMap = {
    button: "import { Button } from 'antd';",
    input: "import { Input } from 'antd';"
  };

  return Object.keys(components)
    .map(type => importMap[type])
    .filter(Boolean)
    .join('\n');
};

// 生成组件代码
const generateComponent = (node, indent = 0) => {
  const space = '  '.repeat(indent);
  const propsString = generatePropsString(node.props);
  const childrenString = node.children
    ? '\n' + node.children.map(child => generateComponent(child, indent + 1)).join('\n') + '\n' + space
    : '';

  switch (node.type) {
    case 'button':
      return `${space}<Button${propsString}>${node.props.label}</Button>`;
    case 'input':
      return `${space}<Input${propsString} />`;
    case 'container':
      return `${space}<div style={{ display: 'flex', flexDirection: '${node.props.direction}' }}>${childrenString}</div>`;
    default:
      return `${space}<div>未知组件</div>`;
  }
};

// 生成属性字符串
const generatePropsString = (props) => {
  if (!props || Object.keys(props).length === 0) return '';

  const propStrings = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? key : '';
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .filter(Boolean);

  return propStrings.length > 0 ? ' ' + propStrings.join(' ') : '';
};

// 提取所有使用的组件
const extractComponents = (node, components = {}) => {
  components[node.type] = true;
  if (node.children) {
    node.children.forEach(child => extractComponents(child, components));
  }
  return components;
};

// 生成HTML代码
export const generateHTMLCode = async (dsl) => {
  // 实现HTML代码生成逻辑
  const componentCode = generateHTMLComponent(dsl);

  const rawCode = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>生成的页面</title>
</head>
<body>
  ${componentCode}
</body>
</html>
`;

  try {
    const formattedCode = await format(rawCode, {
      parser: 'html',
      plugins: [parserBabel],
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 100,
      arrowParens: 'always',
    });
    return formattedCode;
  } catch (error) {
    console.error('HTML格式化失败:', error);
    return rawCode;
  }
};

const generateHTMLComponent = (node, indent = 0) => {
  const space = '  '.repeat(indent);
  const propsString = generateHTMLPropsString(node.props);
  const childrenString = node.children
    ? '\n' + node.children.map(child => generateHTMLComponent(child, indent + 1)).join('\n') + '\n' + space
    : node.props.label || '';

  switch (node.type) {
    case 'button':
      return `${space}<button${propsString}>${node.props.label}</button>`;
    case 'input':
      return `${space}<input${propsString} />`;
    case 'container':
      return `${space}<div${propsString}>${childrenString}</div>`;
    default:
      return `${space}<div>未知组件</div>`;
  }
};

const generateHTMLPropsString = (props) => {
  if (!props || Object.keys(props).length === 0) return '';

  const propStrings = Object.entries(props)
    .filter(([key]) => !['label'].includes(key))
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return ` ${key}="${value}"`;
      } else {
        return ` ${key}="${value}"`;
      }
    });

  return propStrings.join('');
};