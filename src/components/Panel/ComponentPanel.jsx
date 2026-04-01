import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getAllComponents } from '../../utils/componentRegistry';
import { useEditor } from '../../context/EditorContext';
import DraggableItem from '../Dnd/DraggableItem';
import VirtualizedComponentList from '../Virtualized/VirtualizedComponentList';
import {
  AppstoreOutlined,
  BlockOutlined,
  SettingOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  CameraOutlined,
  TableOutlined,
  LineChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const ComponentPanelContainer = styled.div`
  padding: 20px;
  background: ${props => props.$theme === 'dark' ? '#16213e' : '#f5f5f5'};
  border-right: 1px solid ${props => props.$theme === 'dark' ? '#2d3748' : '#e0e0e0'};
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

const CategoryTitle = styled.h4`
  margin: 20px 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$theme === 'dark' ? '#a0aec0' : '#666'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ComponentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const categoryIcons = {
  basic: <AppstoreOutlined />,
  layout: <BlockOutlined />,
  function: <SettingOutlined />,
  special: <FileTextOutlined />,
};

const categoryNames = {
  basic: '基础组件',
  layout: '布局组件',
  function: '功能组件',
  special: '特殊组件',
};

const ComponentPanel = () => {
  const { theme, addComponent } = useEditor();
  const components = getAllComponents();

  const groupedComponents = components.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = [];
    }
    acc[comp.category].push(comp);
    return acc;
  }, {});

  // 为每个分类创建虚拟化列表
  const renderVirtualizedList = (comps, category) => {
    return (
      <VirtualizedComponentList
        items={comps}
        renderItem={(comp, index) => (
          <DraggableItem
            key={comp.type}
            id={`component-${comp.type}`}
            type={comp.type}
            label={comp.displayName}
            onClick={() => {
              console.log('点击组件:', comp.type);
              addComponent('page_1', comp.type);
            }}
          />
        )}
        height={400}
        itemSize={90}
      />
    );
  };

  return (
    <ComponentPanelContainer $theme={theme}>
      <Title>组件库</Title>
      {Object.entries(groupedComponents).map(([category, comps], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <CategoryTitle>
            {categoryIcons[category]}
            {categoryNames[category] || category}
          </CategoryTitle>
          {comps.length > 20 ? (
            // 当组件数量超过20个时使用虚拟化列表
            renderVirtualizedList(comps, category)
          ) : (
            // 组件数量较少时使用普通网格布局
            <ComponentGrid>
              {comps.map((comp, index) => (
                <DraggableItem
                  key={comp.type}
                  id={`component-${comp.type}`}
                  type={comp.type}
                  label={comp.displayName}
                  onClick={() => {
                    console.log('点击组件:', comp.type);
                    addComponent('page_1', comp.type);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                />
              ))}
            </ComponentGrid>
          )}
        </motion.div>
      ))}
    </ComponentPanelContainer>
  );
};

export default ComponentPanel;