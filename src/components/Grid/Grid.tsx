import React, { useState, useEffect } from 'react';
import Node from './Node';
import { useWallContext } from '../../context/WallContext';
import { NodeType } from '../../types';

interface GridProps {
  startPosition: string | null;
  endPosition: string | null;
  visitedNodes: string[];
  pathNodes: string[];
  isPlaying: boolean;
  onClearGrid: () => void;
  onUpdateStart: (newStartId: string) => void;
  onUpdateEnd: (newEndId: string) => void;
}

const Grid: React.FC<GridProps> = ({
  startPosition,
  endPosition,
  visitedNodes,
  pathNodes,
  isPlaying,
  onClearGrid,
  onUpdateStart,
  onUpdateEnd,
}) => {
  const { wallPositions, toggleWall } = useWallContext();
  const [visualState, setVisualState] = useState<Record<string, Partial<NodeType>>>({});

  const ROWS = 15;
  const COLUMNS = 20;

  useEffect(() => {
    let isCancelled = false;

    const animateAlgorithm = async (visited: string[], path: string[]) => {
      if (!isPlaying) {
        isCancelled = true;
        onClearGrid();
        return;
      }

      for (let i = 0; i < visited.length; i++) {
        if (isCancelled) { onClearGrid(); return; }
        await new Promise(res => setTimeout(res, 10));
        setVisualState(prev => ({
          ...prev,
          [visited[i]]: { ...(prev[visited[i]] || {}), isVisited: true },
        }));
      }

      for (let i = 0; i < visited.length; i++) {
        if (isCancelled) { onClearGrid(); return; }
        await new Promise(res => setTimeout(res, 10));
        setVisualState(prev => ({
          ...prev,
          [visited[i]]: { ...(prev[visited[i]] || {}), isVisited: true },
        }));
      }

      for (let i = 0; i < path.length; i++) {
        if (isCancelled) { onClearGrid(); return; }
        await new Promise(res => setTimeout(res, 20));
        setVisualState(prev => ({
          ...prev,
          [path[i]]: { ...(prev[path[i]] || {}), isPath: true },
        }));
      }
    };

    if (visitedNodes.length === 0 && pathNodes.length === 0) {
      setVisualState({});
    }

    if (visitedNodes.length > 0 || pathNodes.length > 0) {
      animateAlgorithm(visitedNodes, pathNodes);
    }

    return () => {
      isCancelled = true;
    };
  }, [visitedNodes, pathNodes, isPlaying, onClearGrid]);

  const handleWallToggle = (id: string) => {
    if (isPlaying) return;
    toggleWall(id);
  };

  const handleDropNode = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    if (targetId === startPosition || targetId === endPosition) return;

    if (draggedId === startPosition) {
      onUpdateStart(targetId);
    } else if (draggedId === endPosition) {
      onUpdateEnd(targetId);
    }
  };

  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      const id = `node-${i}-${j}`;
      const visual = visualState[id] || {};
      const node: NodeType = {
        row: i,
        col: j,
        isStart: startPosition === id,
        isEnd: endPosition === id,
        isWall: wallPositions.includes(id),
        distance: 0,
        f: 0,
        g: 0,
        h: 0,
        previousNode: null,
        ...visual,
      };

      grid.push(
        <Node
          key={id}
          node={node}
          onWallToggle={() => handleWallToggle(id)}
          isPlaying={isPlaying}
          onDropNode={handleDropNode}
        />
      );
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-2 pt-8 select-none">
      <div
        className="grid w-full max-w-screen-2xl"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          columnGap: '1px',
          rowGap: '20px',
        }}
      >
        {grid}
      </div>
    </div>
  );
};

export default Grid;

