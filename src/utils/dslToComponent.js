import React from 'react';
import { getComponent } from './componentRegistry';
import { handleEvent } from './dsl';

export const dslToComponent = (node, path = []) => {
  if (!node) {
    return null;
  }

  const { id, type, props = {}, events = {}, children = [] } = node;

  const Component = getComponent(type);

  if (!Component) {
    console.error('组件类型未注册:', type);
    return React.createElement('div', {
      key: path.join('-'),
      style: { padding: '10px', border: '1px dashed red' }
    }, '未知组件: ' + type);
  }

  const eventProps = {};
  Object.entries(events).forEach(([eventName, eventConfig]) => {
    eventProps[eventName] = (e) => {
      handleEvent(eventConfig);
    };
  });

  const childrenElements = children.map((child, index) =>
    dslToComponent(child, [...path, index])
  );

  try {
    return React.createElement(
      Component,
      {
        key: path.join('-') || id,
        id: id,
        ...props,
        ...eventProps,
      },
      ...childrenElements
    );
  } catch (error) {
    console.error('组件渲染失败:', error);
    return React.createElement('div', {
      key: path.join('-'),
      style: { padding: '10px', border: '1px dashed red' }
    }, '渲染错误: ' + error.message);
  }
};

export const dslToComponentTree = (dsl) => {
  if (!dsl || !dsl.id) {
    return React.createElement('div', null, 'DSL数据无效');
  }
  return dslToComponent(dsl, [dsl.id]);
};