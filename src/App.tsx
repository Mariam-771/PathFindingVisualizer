import { useState } from 'react';
import Grid from './components/Grid/Grid';
import ControlPanel from './components/Controls/ControlPanel';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useWallContext } from './context/WallContext';
import { dijkstra } from './algorithms/dijkstra';
import { aStar } from './algorithms/astar';
import { AlgorithmType } from './types';

function App() {
  const [draggedItem, setDraggedItem] = useState<{ id: string; overId: string } | null>(null);
  const [startPosition, setStartPosition] = useState<string | null>(null);
  const [endPosition, setEndPosition] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [pathNodes, setPathNodes] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('DIJKSTRA');
  const { wallPositions, clearWalls } = useWallContext();

  const handleTogglePlay = (state: boolean) => {
    setIsPlaying(state);
    if (state) {
      handleRunAlgorithm();
    } else {
      handleClearGrid(false);
    }
  };

  const handleClearGrid = (fullClear: boolean = true) => {
    setVisitedNodes([]);
    setPathNodes([]);
    if (fullClear) {
      setStartPosition(null);
      setEndPosition(null);
      setDraggedItem(null);
      if (clearWalls) clearWalls();
    }
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over) return;
    const dropId = over.id as string;
    if (wallPositions.includes(dropId)) return;

  
    if (active.id === 'bot' && dropId === endPosition) return;
    if (active.id === 'point' && dropId === startPosition) return;

    if (active.id === 'bot') {
      setStartPosition(dropId);
    } else if (active.id === 'point') {
      setEndPosition(dropId);
    }

    setDraggedItem({ id: active.id.toString(), overId: dropId.toString() });
  };

  const handleRunAlgorithm = () => {
    if (!startPosition || !endPosition) return;

    const result =
      algorithm === 'DIJKSTRA'
        ? dijkstra(startPosition, endPosition, wallPositions, 15, 20)
        : aStar(startPosition, endPosition, wallPositions, 15, 20);

    setVisitedNodes(result.visitedOrder);
    setPathNodes(result.shortestPath);
  };

  return (
    <div className="p-6 bg-black">
      <div className="container mx-auto">
        <DndContext onDragEnd={handleDragEnd}>
          <ControlPanel
            onPlay={handleRunAlgorithm}
            onTogglePlay={handleTogglePlay}
            startPosition={startPosition}
            endPosition={endPosition}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            isPlaying={isPlaying}
          />
          <Grid
            startPosition={startPosition}
            endPosition={endPosition}
            visitedNodes={visitedNodes}
            pathNodes={pathNodes}
            isPlaying={isPlaying}
            onClearGrid={handleClearGrid}
            onUpdateStart={setStartPosition}  
            onUpdateEnd={setEndPosition}     
          />
        </DndContext>
      </div>
    </div>
  );
}

export default App;
