# Prettier 集成和虚拟化优化文档

## 1. Prettier 集成

### 1.1 功能说明

项目已集成 Prettier 用于代码格式化，支持以下功能：

- **React 代码格式化**：自动格式化生成的 React 组件代码
- **HTML 代码格式化**：自动格式化生成的 HTML 页面代码
- **统一代码风格**：确保生成的代码符合项目规范

### 1.2 配置文件

Prettier 配置文件位于项目根目录：`.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 1.3 使用方式

代码生成时自动应用 Prettier 格式化：

```javascript
import { generateReactCode, generateHTMLCode } from './utils/code';

// 生成 React 代码（自动格式化）
const reactCode = await generateReactCode(dsl);

// 生成 HTML 代码（自动格式化）
const htmlCode = await generateHTMLCode(dsl);
```

### 1.4 实现细节

代码格式化在 `src/utils/code.js` 中实现：

- 使用 `prettier/standalone` 进行代码格式化
- React 代码使用 `prettier/parser-babel` 解析器
- HTML 代码使用内置 HTML 解析器
- 格式化失败时返回原始代码，不影响功能

## 2. 虚拟化优化

### 2.1 功能说明

项目已实现虚拟化渲染优化，支持以下场景：

- **组件库面板**：当组件数量超过 20 个时自动启用虚拟化列表
- **编辑器画布**：当组件数量超过 100 个时自动启用虚拟化画布
- **智能切换**：根据组件数量自动选择最佳渲染方式

### 2.2 虚拟化组件

#### 2.2.1 VirtualizedComponentList

用于组件库面板的虚拟化列表组件。

位置：`src/components/Virtualized/VirtualizedComponentList.jsx`

**Props：**
- `items`: 要渲染的项目数组
- `renderItem`: 渲染单个项目的函数
- `height`: 列表高度（默认 600）
- `itemSize`: 单个项目高度（默认 80）
- `className`: 自定义类名

**使用示例：**
```javascript
<VirtualizedComponentList
  items={components}
  renderItem={(comp, index) => (
    <DraggableItem
      key={comp.type}
      type={comp.type}
      label={comp.displayName}
    />
  )}
  height={400}
  itemSize={90}
/>
```

#### 2.2.2 VirtualizedCanvas

用于编辑器画布的虚拟化网格组件。

位置：`src/components/Virtualized/VirtualizedCanvas.jsx`

**Props：**
- `components`: 要渲染的组件数组
- `renderComponent`: 渲染单个组件的函数
- `height`: 画布高度（默认 800）
- `width`: 画布宽度（默认 1200）
- `columnCount`: 列数（默认 12）
- `columnWidth`: 列宽（默认 100）
- `rowHeight`: 行高（默认 80）
- `className`: 自定义类名

**使用示例：**
```javascript
<VirtualizedCanvas
  components={flatComponents}
  renderComponent={(component, index) => (
    <div key={component.id}>
      {component.type}: {component.name}
    </div>
  )}
  height={800}
  width={1200}
  columnCount={12}
  columnWidth={100}
  rowHeight={80}
/>
```

### 2.3 性能优化策略

#### 2.3.1 组件库面板优化

- **阈值**：组件数量 > 20 时启用虚拟化
- **优化效果**：减少 DOM 节点数量，提升滚动性能
- **用户体验**：保持拖拽和点击功能正常

#### 2.3.2 编辑器画布优化

- **阈值**：组件数量 > 100 时启用虚拟化
- **优化效果**：大幅提升大量组件场景下的渲染性能
- **功能保持**：支持组件选择和交互

### 2.4 技术实现

使用 `react-window` 库实现虚拟化：

- **FixedSizeList**：用于固定高度的列表虚拟化
- **FixedSizeGrid**：用于固定大小的网格虚拟化
- **useMemo**：优化组件和数据的引用，减少不必要的重新渲染

## 3. 最佳实践

### 3.1 代码生成

1. 使用 `async/await` 处理异步的代码生成
2. 捕获格式化错误，提供降级方案
3. 保持代码格式与项目配置一致

### 3.2 虚拟化使用

1. 根据实际场景选择合适的阈值
2. 为虚拟化组件提供稳定的 key
3. 使用 useMemo 优化数据引用
4. 合理设置 itemSize 和 rowHeight

### 3.3 性能监控

建议监控以下指标：

- 代码生成时间
- 组件渲染时间
- 滚动帧率
- 内存使用情况

## 4. 未来优化方向

1. **动态虚拟化**：根据组件大小自动调整虚拟化参数
2. **增量渲染**：支持大型项目的分批加载
3. **缓存优化**：缓存已格式化的代码
4. **性能分析**：添加性能监控和统计功能

## 5. 依赖说明

新增依赖：

```json
{
  "dependencies": {
    "react-window": "^1.8.10",
    "prettier": "^3.1.1"
  }
}
```

安装命令：
```bash
npm install
```
