import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EditorProvider } from './context/EditorContext';
import Editor from './pages/Editor/Editor';
import Preview from './pages/Preview/Preview';

function App() {
  return (
    <BrowserRouter>
      <EditorProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/editor" />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </EditorProvider>
    </BrowserRouter>
  );
}

export default App;