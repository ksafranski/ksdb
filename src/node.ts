import { v4 as uuid } from 'uuid'
export type GraphNodeId = string

/**
 * Define the node (vertex) of the graph
 */
export class GraphNode<T> {
  _id: string = uuid()
  data: T
  adjacents: Array<GraphNode<T>> = []

  constructor (data: T, id?: string) {
    if (!data) throw new Error('Node must have data')
    this._id = id || uuid()
    this.data = data
  }

  // Determine if another node is adjacent
  isAdjacent (node: GraphNode<T>): boolean {
    return this.adjacents.includes(node)
  }

  // Just pushes an adjacent onto the array
  addAdjacent (node: GraphNode<T>): GraphNode<T> {
    if (this.isAdjacent(node)) return node
    if (node instanceof GraphNode) {
      this.adjacents.push(node)
      return node
    } else {
      throw new Error('Cannot add non-GraphNode as adjacent')
    }
  }

  // Removes an adjacent node by reference
  removeAdjacent (node: GraphNode<T>): void {
    this.adjacents = this.adjacents.filter((n: GraphNode<T>) => n !== node)
  }
}
