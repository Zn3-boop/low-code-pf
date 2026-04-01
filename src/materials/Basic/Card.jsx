import { Card as AntCard } from 'antd';

const Card = ({
  title = '卡片标题',
  content = '卡片内容',
  bordered = true,
  hoverable = false,
  style = {},
  position = 'static',
  top = '0',
  left = '0',
  width = '100%',
  height = 'auto',
  margin = '0',
  padding = '24',
  borderRadius = '8',
  backgroundColor,
  color,
  fontSize,
  ...props
}) => {
  const cardStyle = {
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
    <AntCard
      title={title}
      bordered={bordered}
      hoverable={hoverable}
      style={cardStyle}
      {...props}
    >
      {content}
    </AntCard>
  );
};

Card.componentMeta = {
  type: 'card',
  displayName: '卡片',
  category: 'basic',
  propsSchema: [
    {
      name: 'title',
      label: '卡片标题',
      type: 'string',
      defaultValue: '卡片标题'
    },
    {
      name: 'content',
      label: '卡片内容',
      type: 'string',
      defaultValue: '卡片内容'
    },
    {
      name: 'bordered',
      label: '是否显示边框',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'hoverable',
      label: '是否可悬浮',
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
      type: 'number',
      defaultValue: 24
    },
    {
      name: 'borderRadius',
      label: '圆角',
      type: 'number',
      defaultValue: 8
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
  acceptsChildren: true
};

export default Card;
