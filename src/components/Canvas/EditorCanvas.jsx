import { DropZone } from '../Dnd/DropZone';
import { dslToComponentTree } from '../../utils/dslToComponent';
import { useEditor } from '../../context/EditorContext';
import VirtualizedCanvas from '../Virtualized/VirtualizedCanvas';
import './EditorCanvas.css';

const EditorCanvas = () => {
  const { dsl, selectedId, setSelectedId, activeId } = useEditor();

  const handleCanvasClick = (e) => {
    // 点击画布空白处取消选择
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  const handleComponentClick = (e, componentId) => {
    e.stopPropagation();
    setSelectedId(componentId);
  };

  // 将 DSL 转换为扁平化的组件列表
  const flattenComponents = (node, components = []) => {
    if (!node) return components;
    components.push(node);
    if (node.children) {
      node.children.forEach(child => flattenComponents(child, components));
    }
    return components;
  };

  const flatComponents = flattenComponents(dsl);
  const componentCount = flatComponents.length;

  return (
    <div className="editor-canvas" onClick={handleCanvasClick}>
      <DropZone id="page_1" accepts={['button', 'input', 'container']}>
        {componentCount > 100 ? (
          // 当组件数量超过100个时使用虚拟化画布
          <VirtualizedCanvas
            components={flatComponents}
            renderComponent={(component, index) => (
              <div 
                key={component.id}
                onClick={(e) => handleComponentClick(e, component.id)}
                style={{
                  border: selectedId === component.id ? '2px solid #1890ff' : '1px dashed #d9d9d9',
                  padding: '8px',
                  margin: '4px',
                  cursor: 'pointer'
                }}
              >
                {component.type}: {component.name || component.id}
              </div>
            )}
            height={800}
            width={1200}
            columnCount={12}
            columnWidth={100}
            rowHeight={80}
          />
        ) : (
          // 组件数量较少时使用普通渲染
          <div className={`component-tree ${selectedId ? 'has-selection' : ''}`} onClick={handleCanvasClick}>
            {dslToComponentTree(dsl)}
          </div>
        )}
      </DropZone>
    </div>
  );
};

export default EditorCanvas;