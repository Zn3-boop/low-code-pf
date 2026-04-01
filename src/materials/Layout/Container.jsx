import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Container = ({
  id,
  layout = 'flex',
  direction = 'column',
  gap = 16,
  children,
  ...props
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const containerStyle = {
    display: layout === 'flex' ? 'flex' : 'grid',
    flexDirection: direction,
    gap: gap,
    padding: 16,
    border: isOver ? '2px dashed #764ba2' : '1px dashed #d9d9d9',
    minHeight: 100,
    background: isOver ? 'rgba(118, 75, 162, 0.1)' : 'transparent',
    transition: 'all 0.3s ease'
  };

  return (
    <div ref={setNodeRef} style={containerStyle} {...props}>
      {children}
    </div>
  );
};

Container.componentMeta = {
  type: 'container',
  displayName: '容器',
  category: 'layout',
  propsSchema: [
    {
      name: 'layout',
      label: '布局方式',
      type: 'select',
      options: ['flex', 'grid'],
      defaultValue: 'flex'
    },
    {
      name: 'direction',
      label: '排列方向',
      type: 'select',
      options: ['row', 'column'],
      defaultValue: 'column'
    },
    {
      name: 'gap',
      label: '间距',
      type: 'number',
      defaultValue: 16
    }
  ],
  acceptsChildren: true
};

export default Container;