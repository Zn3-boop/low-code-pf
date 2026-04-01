import { Form, Input, Select, Switch, Collapse, ColorPicker, Slider } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { getComponentMeta } from '../../utils/componentRegistry';
import { useEditor } from '../../context/EditorContext';

const { Panel } = Collapse;

const PropertyPanelContainer = styled(motion.div)`
  padding: 20px;
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#ffffff'};
  border-left: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EmptyState = styled(motion.div)`
  padding: 60px 20px;
  text-align: center;
  color: ${props => props.$theme === 'dark' ? '#a0aec0' : '#999'};

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    font-weight: 600;
  }

  .ant-collapse-item {
    background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#fafafa'};
    border: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
    border-radius: 8px;
    margin-bottom: 8px;

    &.ant-collapse-item-active {
      border-color: #764ba2;
    }
  }

  .ant-collapse-content-box {
    padding: 16px;
  }
`;

const PropertyPanel = () => {
  const { selectedId, selectedComponent, updateComponentProps, updateComponentEvents, theme } = useEditor();
  const [form] = Form.useForm();

  const { node } = selectedComponent() || {};
  const componentMeta = node ? getComponentMeta(node.type) : null;

  if (!selectedId || !node) {
    return (
      <PropertyPanelContainer
        $theme={theme}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <EmptyState
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>请选择一个组件进行配置</p>
        </EmptyState>
      </PropertyPanelContainer>
    );
  }

  const handlePropsChange = (changedValues) => {
    updateComponentProps(selectedId, changedValues);
  };

  const handleEventsChange = (eventName, value) => {
    updateComponentEvents(selectedId, {
      [eventName]: value
    });
  };

  // 将属性分为不同的组
  const basicProps = componentMeta?.propsSchema?.filter(prop => 
    ['label', 'placeholder', 'title', 'content', 'type', 'size', 'disabled'].includes(prop.name)
  ) || [];

  const positionProps = componentMeta?.propsSchema?.filter(prop => 
    ['position', 'top', 'left'].includes(prop.name)
  ) || [];

  const sizeProps = componentMeta?.propsSchema?.filter(prop => 
    ['width', 'height'].includes(prop.name)
  ) || [];

  const spacingProps = componentMeta?.propsSchema?.filter(prop => 
    ['margin', 'padding'].includes(prop.name)
  ) || [];

  const appearanceProps = componentMeta?.propsSchema?.filter(prop => 
    ['borderRadius', 'backgroundColor', 'color', 'fontSize', 'bordered', 'hoverable'].includes(prop.name)
  ) || [];

  const renderFormItem = (prop) => {
    const commonProps = {
      name: prop.name,
      label: prop.label,
      rules: [{ required: prop.required }]
    };

    switch (prop.type) {
      case 'string':
        return (
          <Form.Item key={prop.name} {...commonProps}>
            <Input placeholder={`请输入${prop.label}`} />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item key={prop.name} {...commonProps}>
            <Input type="number" placeholder={`请输入${prop.label}`} />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item key={prop.name} {...commonProps}>
            <Select>
              {prop.options?.map(option => (
                <Select.Option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                  {typeof option === 'object' ? option.label : option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'boolean':
        return (
          <Form.Item key={prop.name} {...commonProps} valuePropName="checked">
            <Switch />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <PropertyPanelContainer
      $theme={theme}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>属性配置</Title>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ fontSize: '12px', color: theme === 'dark' ? '#a0aec0' : '#999' }}
      >
        组件类型: {componentMeta?.displayName}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ fontSize: '12px', color: theme === 'dark' ? '#a0aec0' : '#999' }}
      >
        组件ID: {selectedId}
      </motion.p>

      <StyledCollapse
        defaultActiveKey={['basic', 'position', 'size', 'spacing', 'appearance', 'events']}
        style={{ marginTop: '20px' }}
      >
        {basicProps.length > 0 && (
          <Panel header="基础属性" key="basic">
            <AnimatePresence>
              {basicProps.map((prop, index) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderFormItem(prop)}
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}

        {positionProps.length > 0 && (
          <Panel header="位置" key="position">
            <AnimatePresence>
              {positionProps.map((prop, index) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderFormItem(prop)}
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}

        {sizeProps.length > 0 && (
          <Panel header="尺寸" key="size">
            <AnimatePresence>
              {sizeProps.map((prop, index) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderFormItem(prop)}
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}

        {spacingProps.length > 0 && (
          <Panel header="间距" key="spacing">
            <AnimatePresence>
              {spacingProps.map((prop, index) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderFormItem(prop)}
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}

        {appearanceProps.length > 0 && (
          <Panel header="外观" key="appearance">
            <AnimatePresence>
              {appearanceProps.map((prop, index) => (
                <motion.div
                  key={prop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderFormItem(prop)}
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}

        {componentMeta?.events?.length > 0 && (
          <Panel header="事件" key="events">
            <AnimatePresence>
              {componentMeta.events.map((eventName, index) => (
                <motion.div
                  key={eventName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ marginBottom: '16px' }}
                >
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: theme === 'dark' ? '#f7fafc' : '#333',
                    }}
                  >
                    {eventName}
                  </label>
                  <Select
                    placeholder="选择动作"
                    value={node.events?.[eventName]?.action}
                    onChange={(value) => handleEventsChange(eventName, { action: value })}
                  >
                    <Select.Option value="message">显示消息</Select.Option>
                    <Select.Option value="api">调用API</Select.Option>
                    <Select.Option value="navigation">页面跳转</Select.Option>
                  </Select>
                </motion.div>
              ))}
            </AnimatePresence>
          </Panel>
        )}
      </StyledCollapse>
    </PropertyPanelContainer>
  );
};

export default PropertyPanel;
