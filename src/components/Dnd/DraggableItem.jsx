import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const DraggableItemContainer = styled(motion.div)`
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  cursor: grab;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    cursor: grabbing;
  }

  &.is-dragging {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.span`
  font-size: 16px;
`;

const LabelWrapper = styled.span`
  flex: 1;
  font-weight: 500;
`;

const DraggableItem = ({ id, type, label, icon, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type, label }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  const handleClick = (e) => {
    if (!isDragging && onClick) {
      onClick(e);
    }
  };

  return (
    <DraggableItemContainer
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`draggable-item ${isDragging ? 'is-dragging' : ''}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <LabelWrapper>{label}</LabelWrapper>
    </DraggableItemContainer>
  );
};

export default DraggableItem;