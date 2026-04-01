import { useState } from 'react';
import { Layout, Drawer, Modal, message, Upload, Button } from 'antd';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ComponentPanel from '../../components/Panel/ComponentPanel';
import PropertyPanel from '../../components/Panel/PropertyPanel';
import CodePanel from '../../components/Panel/CodePanel';
import PageManager from '../../components/Panel/PageManager';
import EditorCanvas from '../../components/Canvas/EditorCanvas';
import Toolbar from '../../components/Toolbar/Toolbar';
import DndEditor from '../../components/Dnd/DndContext';
import { useEditor } from '../../context/EditorContext';
import { generateReactCode, generateHTMLCode } from '../../utils/code';
import { importDslFromFile, exportDslToFile, saveDslToStorage } from '../../utils/importExport';
import './Editor.css';

const { Sider, Content } = Layout;

const EditorLayout = styled(motion(Layout))`
  height: calc(100vh - 73px);
`;

const ComponentSider = styled(Sider)`
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#f5f5f5'};
  border-right: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const EditorContent = styled(Content)`
  background: ${props => props.$theme === 'dark'
    ? 'radial-gradient(#2d3748 1px, transparent 1px)'
    : 'radial-gradient(#e0e0e0 1px, transparent 1px)'};
  background-size: 20px 20px;
  background-color: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#ffffff'};
  overflow-y: auto;
  position: relative;
  transition: all 0.3s ease;
`;

const PropertySider = styled(Sider)`
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#ffffff'};
  border-left: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const PageSider = styled(Sider)`
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#ffffff'};
  border-right: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  overflow-y: auto;
  transition: all 0.3s ease;
`;

const Editor = () => {
  const navigate = useNavigate();
  const {
    dsl,
    setDsl,
    togglePreviewMode,
    toggleCodeMode,
    previewMode,
    codeMode,
    theme,
    toggleTheme,
    handleDragEnd,

    undo,
    redo,
    history,
    historyIndex,

    pages,
    activePageId,
    addPage,
    deletePage,
    renamePage,
    selectPage,
  } = useEditor();
  const [codeDrawerVisible, setCodeDrawerVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeType, setCodeType] = useState('react');

  // 保存项目
  const handleSave = () => {
    saveDslToStorage(dsl);
  };

  // 导出DSL
  const handleExportDSL = () => {
    exportDslToFile(dsl);
  };

  // 导入DSL
  const handleImportDSL = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.style.display = 'none';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    importDslFromFile(
      file,
      (importedDsl) => {
        setDsl(importedDsl);
      },
      (error) => {
        console.error('导入失败:', error);
      }
    );

    document.body.removeChild(input);
  };

  document.body.appendChild(input);
  input.click();
};

  // 生成代码
  const handleGenerateCode = (type) => {
    setCodeType(type);
    const code = type === 'react' ? generateReactCode(dsl) : generateHTMLCode(dsl);
    setGeneratedCode(code);
    setExportModalVisible(true);
  };

  // 预览
  const handlePreview = () => {
    // 直接导航到预览页面，不需要切换预览模式
    navigate('/preview');
  };

  // 新建项目
  const handleNew = () => {
    Modal.confirm({
      title: '确认新建',
      content: '新建项目将清空当前编辑内容，确定继续吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setDsl({
          id: 'page_1',
          type: 'page',
          name: '我的页面',
          props: { title: '页面标题' },
          children: [],
        });
        message.success('已新建项目');
      },
    });
  };

  // 切换代码面板
  const handleToggleCodePanel = () => {
    setCodeDrawerVisible(!codeDrawerVisible);
    toggleCodeMode();
  };

  return (
    <Layout className="editor-layout">
      {/* 工具栏 */}
      <Toolbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onSave={handleSave}
        onImport={handleImportDSL}
        onExport={handleExportDSL}
        onPreview={handlePreview}
        onToggleCode={handleToggleCodePanel}
        onNew={handleNew}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={undo}
        onRedo={redo}
      />
      <DndEditor
        onDragEnd={handleDragEnd}
      >
        <EditorLayout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
        {/* 左侧页面管理 */}
        <PageSider width={200} $theme={theme}>
          <PageManager
            pages={pages}
            activePageId={activePageId}
            onPageSelect={selectPage}
            onPageAdd={addPage}
            onPageDelete={deletePage}
            onPageRename={renamePage}
            theme={theme}
          />
        </PageSider>

        {/* 左侧组件库 */}
        <ComponentSider width={250} $theme={theme}>
          <ComponentPanel />
        </ComponentSider>

        {/* 中间编辑画布 */}
        <EditorContent $theme={theme}>
          <EditorCanvas />
        </EditorContent>

        {/* 右侧属性面板 */}
        <PropertySider width={300} $theme={theme}>
          <PropertyPanel />
        </PropertySider>
      </EditorLayout>
      </DndEditor>

      {/* 代码面板抽屉 */}
      <Drawer
        title="生成的代码"
        placement="bottom"
        onClose={() => setCodeDrawerVisible(false)}
        open={codeDrawerVisible}
        height="50%"
        styles={{
          body: { background: theme === 'dark' ? '#1a1a2e' : '#ffffff' },
        }}
      >
        <CodePanel />
      </Drawer>

      {/* 代码导出弹窗 */}
      <Modal
        title="导出代码"
        open={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={[
          <Button key="copy" onClick={() => navigator.clipboard.writeText(generatedCode)}>
            复制
          </Button>,
          <Button
            key="download"
            type="primary"
            onClick={() => {
              const blob = new Blob([generatedCode], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `generated.${codeType === 'react' ? 'jsx' : 'html'}`;
              link.click();
              URL.revokeObjectURL(url);
              message.success('代码已下载');
            }}
          >
            下载
          </Button>,
        ]}
      >
        <pre style={{
          maxHeight: 400,
          overflow: 'auto',
          background: theme === 'dark' ? '#1a1a2e' : '#fafafa',
          padding: '16px',
          borderRadius: '8px',
        }}>
          {generatedCode}
        </pre>
      </Modal>
    </Layout>
  );
};

export default Editor;