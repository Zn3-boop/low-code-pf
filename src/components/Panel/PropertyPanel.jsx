import React from 'react';
import { Form, Input, Select, Switch, Tag, ColorPicker } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { getComponentMeta } from '../../utils/componentRegistry';
import { useEditor } from '../../context/EditorContext';
import { getComponent } from '../../utils/componentRegistry';

const PropertyPanelContainer = styled(motion.div)`
  padding: 20px;
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#ffffff'};
  border-left: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  flex: 1;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const ComponentList = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  flex: 1;
  overflow-y: auto;
`;

const ComponentListItem = styled.div`
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#fafafa'};
  border: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};

  &:hover {
    border-color: #764ba2;
    transform: translateX(4px);
  }

  ${props => props.$active && `
    border-color: #764ba2;
    background: ${props.$theme === 'dark' ? 'rgba(118, 75, 162, 0.2)' : 'rgba(118, 75, 162, 0.1)'};
  `}
`;

const ComponentName = styled.span`
  font-size: 14px;
  color: ${props => props.$theme === 'dark' ? '#f7fafc' : '#333'};
  font-weight: 500;
`;

const ComponentType = styled(Tag)`
  font-size: 12px;
  margin-left: 8px;
`;

const PropertySection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#f0f0f0'};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.$theme === 'dark' ? '#4a5568' : '#ccc'};
    border-radius: 3px;
  }
`;

const PropertyItem = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#fafafa'};
  border-radius: 8px;
  border: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
`;

const PropertyLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${props => props.$theme === 'dark' ? '#f7fafc' : '#333'};
  font-weight: 500;
`;

const PreviewBox = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  background: ${props => props.$theme === 'dark' ? '#1a1a2e' : '#fafafa'};
  border-radius: 8px;
  border: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
`;

const PropertyPanel = () => {
  const { selectedId, selectedComponent, updateComponentProps, updateComponentEvents, theme, dsl, setSelectedId } = useEditor();
  const [form] = Form.useForm();

  const { node } = selectedComponent() || {};
  const componentMeta = node ? getComponentMeta(node.type) : null;

  // 当选中组件或其属性变化时，更新表单值
  React.useEffect(() => {
    if (node && node.props) {
      form.setFieldsValue(node.props);
    }
  }, [node, form]);

  // 获取所有组件列表
  const getAllComponents = (node, components = []) => {
    if (!node) return components;

    components.push({
      id: node.id,
      type: node.type,
      name: node.props?.label || node.props?.title || node.props?.content || node.props?.name || node.type,
      props: node.props
    });

    if (node.children) {
      node.children.forEach(child => getAllComponents(child, components));
    }

    return components;
  };

  const allComponents = getAllComponents(dsl);

  // 选中组件处理
  const handleSelectComponent = (id) => {
    setSelectedId(id);
  };

  // 获取组件预览
  const renderPreview = () => {
    if (!node || !componentMeta) return null;

    const Component = getComponent(node.type);
    if (!Component) return null;

    return (
      <Component {...node.props} />
    );
  };

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

  return (
    <PropertyPanelContainer
      $theme={theme}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>属性配置</Title>

      {/* 组件预览 */}
      <PreviewBox>
        {renderPreview()}
      </PreviewBox>

      {/* 属性编辑 */}
      <PropertySection>
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handlePropsChange}
          initialValues={node.props}
        >
          <AnimatePresence>
            {componentMeta?.propsSchema?.map((prop, index) => (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Form.Item
                  name={prop.name}
                  label={prop.label}
                  rules={[{ required: prop.required }]}
                >
                  {prop.type === 'string' && (
                    <Input placeholder={`请输入${prop.label}`} />
                  )}
                  {prop.type === 'number' && (
                    <Input type="number" placeholder={`请输入${prop.label}`} />
                  )}
                  {prop.type === 'select' && (
                    <Select>
                      {prop.options?.map(option => (
                        <Select.Option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                          {typeof option === 'object' ? option.label : option}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                  {prop.type === 'boolean' && (
                    <Switch />
                  )}
                </Form.Item>
              </motion.div>
            ))}
          </AnimatePresence>
        </Form>

        {/* 事件配置 */}
        {componentMeta?.events?.length > 0 && (
          <AnimatePresence>
            {componentMeta.events.map((eventName, index) => (
              <motion.div
                key={eventName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ marginBottom: '16px' }}
              >
                <PropertyLabel>{eventName}</PropertyLabel>
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
        )}
      </PropertySection>

      {/* 组件列表 */}
      <ComponentList>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: theme === 'dark' ? '#f7fafc' : '#333' }}>
          组件列表
        </div>
        {allComponents.map(comp => (
          <ComponentListItem
            key={comp.id}
            $active={selectedId === comp.id}
            onClick={() => handleSelectComponent(comp.id)}
          >
            <ComponentName>{comp.name}</ComponentName>
            <ComponentType>{comp.type}</ComponentType>
          </ComponentListItem>
        ))}
      </ComponentList>
    </PropertyPanelContainer>
  );
};

export default PropertyPanel;
