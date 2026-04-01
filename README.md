# 低代码平台

一个功能强大的可视化低代码平台，支持拖拽式组件编辑、实时预览和代码生成。

## 功能特性

- 🎨 **可视化编辑器**：直观的拖拽式界面，轻松构建页面
- 🧩 **丰富组件库**：提供基础组件（按钮、输入框、卡片等）和布局组件（容器、页面）
- 📄 **多页面管理**：支持创建、编辑、删除多个页面
- 🔄 **实时预览**：即时查看页面效果
- 💾 **项目导入导出**：支持DSL格式的项目导入和导出
- 📝 **代码生成**：自动生成React和HTML代码
- 🎯 **属性配置**：可视化配置组件属性和事件
- 🌓 **主题切换**：支持浅色和深色主题
- ↩️ **撤销重做**：完善的操作历史管理
- 📱 **响应式设计**：适配不同屏幕尺寸

## 技术栈

- **框架**：React 18.2.0
- **构建工具**：Vite 5.0.8
- **UI组件库**：Ant Design 5.12.0
- **拖拽库**：@dnd-kit/core 6.1.0
- **路由**：React Router DOM 6.20.0
- **代码编辑器**：@uiw/react-codemirror 4.21.21
- **动画**：Framer Motion 10.16.0
- **样式**：Styled Components 6.1.0

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 核心功能说明

### 组件系统

平台提供以下组件：

**基础组件**
- 按钮：支持多种类型和尺寸
- 输入框：支持各种输入场景
- 卡片：用于内容展示
- 图标：支持Ant Design图标
- 通知：消息提示组件

**布局组件**
- 容器：支持flex和grid布局
- 页面：页面容器组件

### DSL（领域特定语言）

项目使用DSL（Domain Specific Language）来描述页面结构，DSL是一个JSON格式的树形结构，包含以下字段：

```json
{
  "id": "组件ID",
  "type": "组件类型",
  "name": "组件名称",
  "props": {
    // 组件属性
  },
  "events": {
    // 组件事件
  },
  "children": [
    // 子组件
  ]
}
```

### 代码生成

平台支持将DSL转换为以下格式的代码：

- **React代码**：生成可运行的React组件代码
- **HTML代码**：生成纯HTML页面代码

### 导入导出

- **导入**：支持导入JSON格式的DSL文件
- **导出**：支持导出当前项目为JSON文件
- **保存**：支持将项目保存到浏览器本地存储

## 开发指南

### 添加自定义组件

1. 在 `src/materials` 目录下创建新组件
2. 实现组件逻辑和样式
3. 定义 `componentMeta` 元数据
4. 在 `src/utils/componentRegistry.js` 中注册组件

示例：

```javascript
// 组件实现
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// 组件元数据
MyComponent.componentMeta = {
  type: 'myComponent',
  displayName: '我的组件',
  category: 'basic',
  propsSchema: [
    {
      name: 'prop1',
      label: '属性1',
      type: 'string',
      defaultValue: '默认值'
    }
  ],
  acceptsChildren: false
};

export default MyComponent;
```

### 扩展代码生成

在 `src/utils/code.js` 中扩展代码生成逻辑，添加对新组件的支持。

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge


