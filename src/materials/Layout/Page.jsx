import React from 'react';

const Page = ({ 
  title = '页面标题',
  children,
  ...props 
}) => {
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        padding: '20px',
        background: '#f5f5f5'
      }}
      {...props}
    >
      <h1 style={{ marginBottom: '20px' }}>{title}</h1>
      {children}
    </div>
  );
};

Page.componentMeta = {
  type: 'page',
  displayName: '页面',
  category: 'layout',
  propsSchema: [
    {
      name: 'title',
      label: '页面标题',
      type: 'string',
      defaultValue: '页面标题'
    }
  ],
  acceptsChildren: true
};

export default Page;