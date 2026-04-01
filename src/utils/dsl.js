import { message } from 'antd';

// 事件处理
export const handleEvent = (eventConfig) => {
  if (!eventConfig || !eventConfig.action) {
    console.warn('事件配置无效');
    return;
  }

  const { action, content, method, url } = eventConfig;

  switch (action) {
    case 'message':
      if (content) {
        message.info(content);
      } else {
        message.info('默认消息');
      }
      break;
    case 'api':
      if (url && method) {
        console.log('调用API:', url, method);
        // 这里可以添加实际的API调用逻辑
      } else {
        console.warn('API配置不完整，缺少URL或方法');
      }
      break;
    case 'navigation':
      if (content) {
        console.log('跳转到:', content);
        // 这里可以添加实际的页面跳转逻辑
      } else {
        console.warn('导航配置不完整，缺少目标页面');
      }
      break;
    default:
      console.log('未知事件:', eventConfig);
  }
};

// React组件树转换为DSL
export const componentToDsl = (component) => {
  // 实现组件树到DSL的转换逻辑
  // 暂时返回空对象，需要在第三步完善
  return {};
};