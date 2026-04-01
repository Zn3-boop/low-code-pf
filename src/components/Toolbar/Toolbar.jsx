import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Tooltip, Switch } from 'antd';
import {
  SaveOutlined,
  EyeOutlined,
  CodeOutlined,
  ExportOutlined,
  ImportOutlined,
  FileAddOutlined,
  MoonOutlined,
  SunOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import StyledButton from './StyledButton';

const ToolbarContainer = styled(motion.header)`
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  box-shadow: ${props => props.$theme === 'dark'
    ? '0 2px 12px rgba(0, 0, 0, 0.3)'
    : '0 2px 12px rgba(0, 0, 0, 0.08)'};
  position: relative;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$theme === 'dark'
      ? 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)'
      : 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'};
  }
`;

const Logo = styled(motion.h2)`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Toolbar = ({
  theme,
  onToggleTheme,
  onSave,
  onImport,
  onExport,
  onPreview,
  onToggleCode,
  onNew,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <ToolbarContainer
      $theme={theme}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ToolbarLeft>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          低代码平台
        </Logo>
      </ToolbarLeft>
      <ToolbarRight>
        <Tooltip title="新建项目">
          <StyledButton variant="outline" onClick={onNew} icon={<FileAddOutlined />}>
            新建
          </StyledButton>
        </Tooltip>
        <Tooltip title="保存项目">
          <StyledButton variant="primary" onClick={onSave} icon={<SaveOutlined />}>
            保存
          </StyledButton>
        </Tooltip>
        <Tooltip title="撤销">
          <StyledButton
            variant="outline"
            onClick={onUndo}
            icon={<UndoOutlined />}
            disabled={!canUndo}
          />
        </Tooltip>
        <Tooltip title="重做">
          <StyledButton
            variant="outline"
            onClick={onRedo}
            icon={<RedoOutlined />}
            disabled={!canRedo}
          />
        </Tooltip>
        <Tooltip title="导入项目">
          <StyledButton variant="secondary" onClick={onImport} icon={<ImportOutlined />}>
            导入
          </StyledButton>
        </Tooltip>
        <Tooltip title="导出项目">
          <StyledButton variant="success" onClick={onExport} icon={<ExportOutlined />}>
            导出
          </StyledButton>
        </Tooltip>
        <Tooltip title="代码编辑">
          <StyledButton variant="outline" onClick={onToggleCode} icon={<CodeOutlined />}>
            代码
          </StyledButton>
        </Tooltip>
        <Tooltip title="预览页面">
          <StyledButton variant="primary" onClick={onPreview} icon={<EyeOutlined />}>
            预览
          </StyledButton>
        </Tooltip>
        <Tooltip title={theme === 'dark' ? '切换浅色主题' : '切换深色主题'}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Switch
              checked={theme === 'dark'}
              onChange={onToggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </motion.div>
        </Tooltip>
      </ToolbarRight>
    </ToolbarContainer>
  );
};

export default Toolbar;
