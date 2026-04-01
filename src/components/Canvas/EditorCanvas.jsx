import { DropZone } from '../Dnd/DropZone';
import { dslToComponentTree } from '../../utils/dslToComponent';
import { useEditor } from '../../context/EditorContext';
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

  return (
    <div className="editor-canvas" onClick={handleCanvasClick}>
      <DropZone id="page_1" accepts={['button', 'input', 'container']}>
        <div className={`component-tree ${selectedId ? 'has-selection' : ''}`} onClick={handleCanvasClick}>
          {dslToComponentTree(dsl)}
        </div>
      </DropZone>
    </div>
  );
};

export default EditorCanvas;