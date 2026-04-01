import React from 'react';
import { 
  SettingOutlined, 
  StarOutlined, 
  EditOutlined, 
  SortAscendingOutlined, 
  CameraOutlined, 
  FormOutlined,
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  MenuOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const Icon = ({
  type = 'setting',
  size = 24,
  color = '#333',
  style = {},
  ...props
}) => {
  const iconMap = {
    setting: SettingOutlined,
    star: StarOutlined,
    edit: EditOutlined,
    sort: SortAscendingOutlined,
    camera: CameraOutlined,
    input: FormOutlined,
    home: HomeOutlined,
    user: UserOutlined,
    search: SearchOutlined,
    bell: BellOutlined,
    plus: PlusOutlined,
    delete: DeleteOutlined,
    check: CheckOutlined,
    close: CloseOutlined,
    menu: MenuOutlined,
    info: InfoCircleOutlined,
    warning: ExclamationCircleOutlined,
    error: CloseCircleOutlined,
    success: CheckCircleOutlined
  };

  const IconComponent = iconMap[type] || SettingOutlined;

  const iconStyle = {
    fontSize: size,
    color,
    ...style
  };

  return <IconComponent style={iconStyle} {...props} />;
};

Icon.componentMeta = {
  type: 'icon',
  displayName: '图标',
  category: 'basic',
  propsSchema: [
    {
      name: 'type',
      label: '图标类型',
      type: 'select',
      options: [
        { label: '设置', value: 'setting' },
        { label: '收藏', value: 'star' },
        { label: '编辑', value: 'edit' },
        { label: '排序', value: 'sort' },
        { label: '相机', value: 'camera' },
        { label: '输入', value: 'input' },
        { label: '首页', value: 'home' },
        { label: '用户', value: 'user' },
        { label: '搜索', value: 'search' },
        { label: '通知', value: 'bell' },
        { label: '添加', value: 'plus' },
        { label: '删除', value: 'delete' },
        { label: '确认', value: 'check' },
        { label: '关闭', value: 'close' },
        { label: '菜单', value: 'menu' },
        { label: '信息', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '错误', value: 'error' },
        { label: '成功', value: 'success' }
      ],
      defaultValue: 'setting'
    },
    {
      name: 'size',
      label: '图标大小',
      type: 'number',
      defaultValue: 24
    },
    {
      name: 'color',
      label: '图标颜色',
      type: 'string',
      defaultValue: '#333'
    }
  ],
  events: ['onClick'],
  acceptsChildren: false
};

export default Icon;
