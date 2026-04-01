import { Input as AntInput } from 'antd';

const Input = ({
  placeholder = '请输入',
  size = 'default',
  disabled = false,
  value,
  onChange,
  style = {},
  position = 'static',
  top = 0,
  left = 0,
  width = '100%',
  height = 'auto',
  margin = 0,
  padding = '5px 12px',
  borderRadius = 4,
  backgroundColor,
  color,
  fontSize,
  ...props
}) => {
  const inputStyle = {
    position,
    top: position !== 'static' ? top : undefined,
    left: position !== 'static' ? left : undefined,
    width,
    height,
    margin,
    padding,
    borderRadius,
    backgroundColor,
    color,
    fontSize,
    ...style
  };

  return (
    <AntInput
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      value={value}
      onChange={onChange}
      style={inputStyle}
      {...props}
    />
  );
};

Input.componentMeta = {
  type: 'input',
  displayName: '输入框',
  category: 'basic',
  propsSchema: [
    {
      name: 'placeholder',
      label: '占位文字',
      type: 'string',
      defaultValue: '请输入'
    },
    {
      name: 'size',
      label: '输入框尺寸',
      type: 'select',
      options: ['large', 'middle', 'small'],
      defaultValue: 'default'
    },
    {
      name: 'disabled',
      label: '禁用状态',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'position',
      label: '定位方式',
      type: 'select',
      options: ['static', 'relative', 'absolute', 'fixed'],
      defaultValue: 'static'
    },
    {
      name: 'top',
      label: '顶部位置',
      type: 'number',
      defaultValue: 0
    },
    {
      name: 'left',
      label: '左侧位置',
      type: 'number',
      defaultValue: 0
    },
    {
      name: 'width',
      label: '宽度',
      type: 'string',
      defaultValue: '100%'
    },
    {
      name: 'height',
      label: '高度',
      type: 'string',
      defaultValue: 'auto'
    },
    {
      name: 'margin',
      label: '外边距',
      type: 'string',
      defaultValue: 0
    },
    {
      name: 'padding',
      label: '内边距',
      type: 'string',
      defaultValue: '5px 12px'
    },
    {
      name: 'borderRadius',
      label: '圆角',
      type: 'number',
      defaultValue: 4
    },
    {
      name: 'backgroundColor',
      label: '背景颜色',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'color',
      label: '文字颜色',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'fontSize',
      label: '字体大小',
      type: 'string',
      defaultValue: ''
    }
  ],
  events: ['onChange', 'onFocus', 'onBlur'],
  acceptsChildren: false
};

export default Input;
