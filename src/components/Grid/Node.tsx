import React from 'react';
import { NodeType } from '../../types';
import { Droppable } from '../../utils/droppable';
import { Draggable } from '../../utils/draggable';

interface NodeProps {
  node: NodeType;
  onWallToggle: (id: string) => void;
  onDropNode: (draggedId: string, targetId: string) => void; 
  isPlaying: boolean;
}

const Node: React.FC<NodeProps> = ({ node, onWallToggle, onDropNode, isPlaying }) => {
  const { isStart, isEnd, isWall } = node;
  const id = `node-${node.row}-${node.col}`;

  const handleNodeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStart || isEnd) {
      e.stopPropagation();
      return;
    }
    onWallToggle(id);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const draggedId = event.dataTransfer.getData('text/plain');

    
    if (isStart || isEnd) {
      return;
    }

    
    onDropNode(draggedId, id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Droppable id={id}>
      <div
        onClick={handleNodeClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`w-10 aspect-square h-10 border rounded-2xl flex items-center justify-center transition-colors duration-300
          ${!isWall ? 'border-gray-300 bg-[#C7EDE6]' : 'border-none bg-transparent'}
          ${node.isPath ? 'bg-purple-200' : node.isVisited ? 'bg-blue-300' : ''}
          ${node.isCurrent ? 'bg-blue-400 animate-ping' : ''}`}
          style={{ cursor: isStart || isEnd ? 'default' : 'pointer' }}
      >
        {isStart && (
          isPlaying ? (
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/color/50/bot.png"
              alt="bot"
            />
          ) : (
            <Draggable id="bot">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/color/50/bot.png"
                alt="bot"
              />
            </Draggable>
          )
        )}
        {isEnd && (
          isPlaying ? (
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/nolan/64/point-objects.png"
              alt="point-objects"
            />
          ) : (
            <Draggable id="point">
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/point-objects.png"
                alt="point-objects"
              />
            </Draggable>
          )
        )}
        {isWall && (
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/dusk/64/block.png"
            alt="block"
          />
        )}
      </div>
    </Droppable>
  );
};

export default Node;
