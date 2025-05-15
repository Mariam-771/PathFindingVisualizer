type NodeId = string;

interface GridNode {
  id: NodeId;
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  previousNode: NodeId | null;
}

// Min-heap using a simple priority queue implementation
class MinHeap<T> {
  private heap: { item: T; priority: number }[] = [];

  insert(item: T, priority: number) {
    this.heap.push({ item, priority });
    this.bubbleUp();
  }

  extractMin(): T | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0].item;
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (element.priority >= parent.priority) break;

      this.heap[idx] = parent;
      this.heap[parentIdx] = element;
      idx = parentIdx;
    }
  }

  private bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let smallest = idx;

      if (leftIdx < length && this.heap[leftIdx].priority < this.heap[smallest].priority) {
        smallest = leftIdx;
      }

      if (rightIdx < length && this.heap[rightIdx].priority < this.heap[smallest].priority) {
        smallest = rightIdx;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

// Get valid neighboring nodes (up, down, left, right)
const getNeighbors = (
  node: GridNode,
  grid: Record<NodeId, GridNode>,
  maxRow: number,
  maxCol: number
): GridNode[] => {
  const neighbors: GridNode[] = [];
  const directions = [
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
    [-1, 0], // up
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = node.row + dx;
    const newCol = node.col + dy;
    const id = `node-${newRow}-${newCol}`;
    if (
      newRow >= 0 &&
      newRow < maxRow &&
      newCol >= 0 &&
      newCol < maxCol &&
      grid[id] &&
      !grid[id].isWall
    ) {
      neighbors.push(grid[id]);
    }
  });

  return neighbors;
};

// Dijkstra’s algorithm
export function dijkstra(
  startId: NodeId,
  endId: NodeId,
  wallPositions: NodeId[],
  maxRow: number,
  maxCol: number
): { visitedOrder: NodeId[]; shortestPath: NodeId[] } {
  const grid: Record<NodeId, GridNode> = {};
  const visitedOrder: NodeId[] = [];
  const visitedSet = new Set<NodeId>();

  // Create the grid with initial values
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      const id = `node-${row}-${col}`;
      grid[id] = {
        id,
        row,
        col,
        distance: Infinity,
        isWall: wallPositions.includes(id),
        previousNode: null,
      };
    }
  }

  grid[startId].distance = 0;
  const heap = new MinHeap<GridNode>();
  heap.insert(grid[startId], 0);

  while (!heap.isEmpty()) {
    const current = heap.extractMin()!;
    if (visitedSet.has(current.id)) continue;
    visitedSet.add(current.id);

    if (current.isWall) continue;

    visitedOrder.push(current.id);

    if (current.id === endId) break;

    const neighbors = getNeighbors(current, grid, maxRow, maxCol);
    for (const neighbor of neighbors) {
      if (visitedSet.has(neighbor.id)) continue;

      const alt = current.distance + 1;
      if (alt < neighbor.distance) {
        neighbor.distance = alt;
        neighbor.previousNode = current.id;
        heap.insert(neighbor, alt);
      }
    }
  }

  // Reconstruct the shortest path
  const shortestPath: NodeId[] = [];
  let currentId: NodeId | null = endId;
  while (currentId && grid[currentId].previousNode !== null) {
    shortestPath.unshift(currentId);
    currentId = grid[currentId].previousNode;
  }

  if (currentId === startId) {
    shortestPath.unshift(startId);
  } else {
    return { visitedOrder, shortestPath: [] }; // No path found
  }

  return { visitedOrder, shortestPath };
}
