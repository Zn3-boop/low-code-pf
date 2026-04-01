import { Button as AntButton } from 'antd';

const Button = ({
  label = '按钮',
  type = 'default',
  size = 'default',
  disabled = false,
  onClick,
  style = {},
  position = 'static',
  top = '0',
  left = '0',
  width = 'auto',
  height = 'auto',
  margin = '0',
  padding = '5px 15px',
  borderRadius = '4',
  backgroundColor,
  color,
  fontSize,
  ...props
}) => {
  const buttonStyle = {
    position,
    top,
    left,
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
    <AntButton
      type={type}
      size={size}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      {...props}
    >
      {label}
    </AntButton>
  );
};

Button.componentMeta = {
  type: 'button',
  displayName: '按钮',
  category: 'basic',
  propsSchema: [
    {
      name: 'label',
      label: '按钮文字',
      type: 'string',
      required: true
    },
    {
      name: 'type',
      label: '按钮类型',
      type: 'select',
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      defaultValue: 'default'
    },
    {
      name: 'size',
      label: '按钮尺寸',
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
      type: 'string',
      defaultValue: '0'
    },
    {
      name: 'left',
      label: '左侧位置',
      type: 'string',
      defaultValue: '0'
    },
    {
      name: 'width',
      label: '宽度',
      type: 'string',
      defaultValue: 'auto'
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
      defaultValue: '5px 15px'
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
  events: ['onClick', 'onMouseEnter', 'onMouseLeave'],
  acceptsChildren: false
};

export default Button;
