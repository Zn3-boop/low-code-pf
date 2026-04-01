import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';

const DropZoneContainer = styled.div`
  min-height: 200px;
  padding: 24px;
  border: 2px dashed ${props => props.$isOver && props.$canDrop ? '#764ba2' : '#e0e0e0'};
  border-radius: 12px;
  background: ${props => props.$isOver && props.$canDrop
    ? 'linear-gradient(135deg, rgba(118, 75, 162, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)'
    : '#fafafa'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
    pointer-events: none;
  }

  &.drop-over {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(118, 75, 162, 0.4);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(118, 75, 162, 0);
    }
  }
`;

const EmptyState = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
  font-size: 14px;
  pointer-events: none;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
    opacity: 0.5;
  }
`;

const DropZone = ({ id, children, onDrop, accepts = [] }) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id,
    data: { accepts }
  });

  const canDrop = accepts.includes(active?.data.current?.type);
  const isEmpty = !children || children.length === 0;

  return (
    <DropZoneContainer
      ref={setNodeRef}
      $isOver={isOver}
      $canDrop={canDrop}
      className={`drop-zone ${isOver && canDrop ? 'drop-over' : ''}`}
    >
      {children}
      {isEmpty && (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p>拖拽组件到此处</p>
        </EmptyState>
      )}
    </DropZoneContainer>
  );
};

export { DropZone };
export default DropZone;