import React from 'react';

const DragOverlay = ({ activeId, activeData }) => {
  if (!activeId) return null;

  return (
    <div className="drag-overlay">
      <div className="drag-preview-item">
        {activeData?.icon && <span className="preview-icon">{activeData.icon}</span>}
        <span className="preview-label">{activeData?.label || activeId}</span>
      </div>
    </div>
  );
};

export default DragOverlay;