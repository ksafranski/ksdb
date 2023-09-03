export type GraphNodeId = string;

const generateID = (): string => Math.random().toString(36).substr(2, 9);

/**
 * Define the node (vertex) of the graph
 */
export class GraphNode<T> {
  _id: string = generateID();
  data: T;
  adjacents: Array<GraphNode<T>> = [];

  constructor(data: T, id?: string) {
    this._id = id || generateID();
    this.data = data;
  }

  // Determine if another node is adjacent
  isAdjacent(node: GraphNode<T>): boolean {
    return this.adjacents.includes(node);
  }

  // Just pushes an adjacent onto the array
  addAdjacent(node: GraphNode<T>): GraphNode<T> {
    this.adjacents.push(node);
    return node;
  }

  // Removes an adjacent node by reference
  removeAdjacent(node: GraphNode<T>): void {
    this.adjacents.filter((n: GraphNode<T>) => n !== node);
  }
}
