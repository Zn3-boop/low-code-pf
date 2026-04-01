import React, { useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';

const VirtualizedCanvasContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const VirtualizedCanvas = ({ 
  components, 
  renderComponent, 
  height = 800, 
  width = 1200,
  columnCount = 12,
  columnWidth = 100,
  rowHeight = 80,
  className 
}) => {
  // 计算行数
  const rowCount = Math.ceil(components.length / columnCount);

  // 使用 useMemo 优化 components 的引用
  const memoizedComponents = useMemo(() => components, [components]);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= memoizedComponents.length) return null;

    const component = memoizedComponents[index];
    return (
      <div style={style}>
        {renderComponent(component, index)}
      </div>
    );
  };

  return (
    <VirtualizedCanvasContainer className={className}>
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={width}
      >
        {Cell}
      </Grid>
    </VirtualizedCanvasContainer>
  );
};

export default VirtualizedCanvas;
