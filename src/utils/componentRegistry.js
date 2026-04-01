import Button from '../materials/Basic/Button';
import Input from '../materials/Basic/Input';
import Card from '../materials/Basic/Card';
import Container from '../materials/Layout/Container';
import Page from '../materials/Layout/Page';
import Icon from '../materials/Basic/Icon';
import Notification from '../materials/Basic/Notification';

// 组件注册表
const componentRegistry = {
  button: Button,
  input: Input,
  card: Card,
  container: Container,
  page: Page,
  icon: Icon,
  notification: Notification
};

// 获取组件
export const getComponent = (type) => {
  const Component = componentRegistry[type];
  if (!Component) {
    console.error(`未找到组件类型: ${type}`);
    return null;
  }
  return Component;
};

// 获取组件元数据
export const getComponentMeta = (type) => {
  const component = componentRegistry[type];
  return component?.componentMeta;
};

// 获取所有组件元数据
export const getAllComponents = () => {
  return Object.entries(componentRegistry).map(([type, component]) => ({
    type,
    ...component.componentMeta
  }));
};

// 注册自定义组件
export const registerComponent = (type, component) => {
  componentRegistry[type] = component;
};

export default componentRegistry;