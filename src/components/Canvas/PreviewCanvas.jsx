import { dslToComponentTree } from '../../utils/dslToComponent';
import { useEditor } from '../../context/EditorContext';
import './PreviewCanvas.css';

const PreviewCanvas = () => {
  const { dsl } = useEditor();

  return (
    <div className="preview-canvas">
      <div className="preview-content">
        {dslToComponentTree(dsl)}
      </div>
    </div>
  );
};

export default PreviewCanvas;