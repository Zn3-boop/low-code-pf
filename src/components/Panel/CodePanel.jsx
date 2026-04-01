import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useEditor } from '../../context/EditorContext';
import './CodePanel.css';

const CodePanel = () => {
  const { dsl, setDsl } = useEditor();
  const [code, setCode] = useState(JSON.stringify(dsl, null, 2));

  useEffect(() => {
    setCode(JSON.stringify(dsl, null, 2));
  }, [dsl]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    try {
      const newDsl = JSON.parse(newCode);
      setDsl(newDsl);
    } catch (error) {
      console.error('JSON格式错误:', error);
    }
  };

  return (
    <div className="code-panel">
      <h3>DSL代码</h3>
      <CodeMirror
        value={code}
        height="100%"
        extensions={[javascript(), oneDark]}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodePanel;