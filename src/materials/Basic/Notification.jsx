import React, { useEffect } from 'react';
import { message } from 'antd';

const Notification = ({
  type = 'info',
  content = '这是一条通知消息',
  duration = 3,
  position = 'top',
  showOnMount = false,
  triggerEvent = null,
  ...props
}) => {
  const showMessage = () => {
    switch (type) {
      case 'success':
        message.success(content, duration);
        break;
      case 'error':
        message.error(content, duration);
        break;
      case 'warning':
        message.warning(content, duration);
        break;
      case 'info':
      default:
        message.info(content, duration);
        break;
    }
  };

  useEffect(() => {
    if (showOnMount) {
      showMessage();
    }
  }, [showOnMount]);

  useEffect(() => {
    if (triggerEvent) {
      showMessage();
    }
  }, [triggerEvent]);

  return null;
};

Notification.componentMeta = {
  type: 'notification',
  displayName: '消息通知',
  category: 'basic',
  propsSchema: [
    {
      name: 'type',
      label: '通知类型',
      type: 'select',
      options: [
        { label: '信息', value: 'info' },
        { label: '成功', value: 'success' },
        { label: '警告', value: 'warning' },
        { label: '错误', value: 'error' }
      ],
      defaultValue: 'info'
    },
    {
      name: 'content',
      label: '通知内容',
      type: 'string',
      defaultValue: '这是一条通知消息'
    },
    {
      name: 'duration',
      label: '持续时间(秒)',
      type: 'number',
      defaultValue: 3
    },
    {
      name: 'position',
      label: '显示位置',
      type: 'select',
      options: [
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' }
      ],
      defaultValue: 'top'
    },
    {
      name: 'showOnMount',
      label: '组件加载时显示',
      type: 'boolean',
      defaultValue: false
    }
  ],
  events: [],
  acceptsChildren: false
};

export default Notification;
