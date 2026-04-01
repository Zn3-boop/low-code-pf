import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor } from '../../context/EditorContext';
import { dslToComponent } from '../../utils/dslToComponent';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PreviewContainer = styled(motion.div)`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px;
`;

const PreviewHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1000;
`;

const BackButton = styled(motion.button)`
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const PreviewContent = styled(motion.div)`
  max-width: 1200px;
  margin: 80px auto 0;
  background: white;
  min-height: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  color: #999;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const Preview = () => {
  const navigate = useNavigate();
  const { dsl, togglePreviewMode } = useEditor();

  return (
    <PreviewContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PreviewHeader
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <BackButton
          onClick={() => {
            togglePreviewMode();
            navigate('/editor');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          返回编辑
        </BackButton>
        <h2>页面预览</h2>
      </PreviewHeader>

      <PreviewContent
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {dsl && dsl.children && dsl.children.length > 0 ? (
          dslToComponent(dsl)
        ) : (
          <EmptyState>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>暂无内容，请先在编辑器中添加组件</p>
          </EmptyState>
        )}
      </PreviewContent>
    </PreviewContainer>
  );
};

export default Preview;