import React from "react";
import { Draggable } from "../../utils/draggable";
import { AlgorithmType } from "../../types";

interface ControlPanelProps {
  onPlay: () => void;
  onTogglePlay: (isPlaying: boolean) => void;
  startPosition: string | null;
  endPosition: string | null;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  isPlaying: boolean; 
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onTogglePlay,
  startPosition,
  endPosition,
  algorithm,
  setAlgorithm,
  isPlaying, 
}) => {
  const [play, setPlay] = React.useState(false);

  return (
    <div className="w-full px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4 rounded shadow">
      {/* Left Side */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
        <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center md:text-left">
          Pathfinding Visualizer
        </h1>

        <div className="dropdown">
          <div
            tabIndex={play ? -1 : 0}
            role="button"
            className={`btn px-4 py-2 text-base ${
              play ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {algorithm}
          </div>

          {!play && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-44 p-2 shadow"
            >
              <li>
                <a onClick={() => setAlgorithm("DIJKSTRA")}>Dijkstra</a>
              </li>
              <li>
                <a onClick={() => setAlgorithm("A_STAR")}>A* (Astar)</a>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-row flex-wrap gap-4 items-center justify-center md:justify-end w-full md:w-1/2">
       {!isPlaying && startPosition == null && (
          <Draggable id="bot">
            <img
              src="https://img.icons8.com/color/48/bot.png"
              alt="bot"
              className="w-20 sm:w-24 md:w-14 lg:w-16 hover:scale-110 transition-transform"
            />
          </Draggable>
        )}

        {!isPlaying && endPosition == null && (
          <Draggable id="point">
            <img
              src="https://img.icons8.com/nolan/64/point-objects.png"
              alt="point"
              className="w-20 sm:w-24 md:w-14 lg:w-16 hover:scale-110 transition-transform"
            />
          </Draggable>
        )}

        <button
          className={`transition-all duration-200 ${
            startPosition == null || endPosition == null
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
          onClick={() => {
            const newPlayState = !play;
            setPlay(newPlayState);
            onTogglePlay(newPlayState);
          }}
          disabled={startPosition == null || endPosition == null}
        >
          <img
            src={
              play
                ? "https://img.icons8.com/clouds/100/repeat.png"
                : "https://img.icons8.com/clouds/100/play.png"
            }
            alt={play ? "repeat" : "play"}
            className="w-24 sm:w-28 md:w-16 lg:w-20"
          />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
