import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

const VirtualizedListContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const VirtualizedComponentList = ({ 
  items, 
  renderItem, 
  height = 600, 
  itemSize = 80,
  className 
}) => {
  // 使用 useMemo 优化 items 的引用
  const memoizedItems = useMemo(() => items, [items]);

  const Row = ({ index, style }) => {
    const item = memoizedItems[index];
    return (
      <div style={style}>
        {renderItem(item, index)}
      </div>
    );
  };

  return (
    <VirtualizedListContainer className={className}>
      <List
        height={height}
        itemCount={memoizedItems.length}
        itemSize={itemSize}
        width="100%"
      >
        {Row}
      </List>
    </VirtualizedListContainer>
  );
};

export default VirtualizedComponentList;
