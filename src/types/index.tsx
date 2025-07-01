export interface NodeType {
    row: number;
    col: number;
    isStart?: boolean;
    isEnd?: boolean;
    isWall?: boolean;
    distance?: number;         // Used in Dijkstra
    f?: number;                // f = g + h (Used in A*)
    g?: number;                // Cost from start (Used in A*)
    h?: number;                // Heuristic cost to end (Used in A*)
    previousNode?: NodeType | null; // For path reconstruction
    isVisited?: boolean;
    isPath?: boolean;
    isCurrent?: boolean;
  }

  export type AlgorithmType = "DIJKSTRA" | "A_STAR" ;
  export interface AlgorithmSelectType {
    name: string;
    value: AlgorithmType;
  }
  
  
  export type SpeedType = 2 | 1 | 0.5;
  export interface SpeedSelectType {
    name: string;
    value: SpeedType;
  }
  
  
  