import { DndContext, DragOverlay, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors, useDndContext } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const DragPreviewContainer = styled(motion.div)`
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transform: rotate(-2deg);
`;

const DragOverlayComponent = () => {
  const { active } = useDndContext();
  
  return (
    <DragOverlay>
      {active ? (
        <DragPreviewContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {active.id}
        </DragPreviewContainer>
      ) : null}
    </DragOverlay>
  );
};

const DndEditor = ({ children, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      {children}
      <DragOverlayComponent />
    </DndContext>
  );
};

export default DndEditor;