import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableProps {
  id: string;
  children: ReactNode;
}

export const Droppable = ({ id, children }: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
  backgroundColor: isOver ? 'rgba(222, 238, 255, 0.3)' : undefined,
  width : isOver ? '80%' : undefined,
  
};


  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
