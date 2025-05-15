// src/components/Controls/ControlPanel.tsx
import React, { useState } from "react";
import { Draggable } from "../../utils/draggable";

interface ControlPanelProps {
  onPlay: () => void;
  onTogglePlay: (isPlaying: boolean) => void;
  startPosition: string | null;
  endPosition: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onPlay,
  onTogglePlay,
  startPosition,
  endPosition
}) => {
  const [play, setPlay] = React.useState(false);
  const [algorithm, setAlgorithmState] = useState("Dijkstra");

  const setAlgorithm = (algo: string) => {
    setAlgorithmState(algo); 
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap pl-2.5 gap-4 mb-4 justify-between items-center w-full">
      
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 items-start md:items-center">
        <div className="text-white text-2xl md:text-4xl font-semibold">Pathfinding Visualizer</div>

        {/* Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={play ? -1 : 0}
            role="button"
            className={`btn px-4 py-2 flex justify-center ${play ? 'pointer-events-none opacity-50' : ''}`}
          >
            {algorithm}
          </div>
          {!play && (
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              <li><a onClick={() => setAlgorithm("Dijkstra")}>Dijkstra</a></li>
              <li><a onClick={() => setAlgorithm("Astar")}>Astar</a></li>
            </ul>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-wrap justify-end gap-4 items-center">
        {startPosition == null && (
          <Draggable id="bot">
            <img
              width="40"
              height="40"
              className="md:w-[50px] md:h-[50px]"
              src="https://img.icons8.com/color/50/bot.png"
              alt="bot"
            />
          </Draggable>
        )}

        {endPosition == null && (
          <Draggable id="point">
            <img
              width="50"
              height="50"
              className="md:w-[64px] md:h-[64px]"
              src="https://img.icons8.com/nolan/64/point-objects.png"
              alt="point-objects"
            />
          </Draggable>
        )}

        <button
          className={`py-2 rounded hover:cursor-pointer transition-transform duration-200 ${
            (startPosition == null || endPosition == null) ? 'opacity-50 pointer-events-none' : ''
          }`}
          onClick={() => {
            const newPlayState = !play;
            setPlay(newPlayState);
            onTogglePlay(newPlayState);
          }}
          disabled={startPosition == null || endPosition == null}
        >
          {!play ? (
            <img
              width="70"
              height="70"
              className="md:w-[100px] md:h-[100px]"
              src="https://img.icons8.com/clouds/100/play.png"
              alt="play"
            />
          ) : (
            <img
              width="70"
              height="70"
              className="md:w-[100px] md:h-[100px]"
              src="https://img.icons8.com/clouds/100/repeat.png"
              alt="repeat"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
