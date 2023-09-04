import { GraphNode, type GraphNodeId } from './node'
import { Base } from './util/base'

/**
 * Graphs are data structures with nodes (vertexes) and edges. This
 * forms a structure that allows traversal by referencing node edges
 * which connect a node to other nodes in the graph
 */
export class Graph extends Base {
  name: string

  nodes = new Map<string, GraphNode<any>>()

  // Defines if edges move in one direction (true) or any (false)
  directed: boolean = false

  constructor (name: string, directed: boolean = false) {
    super()
    if (!name) throw new Error('Graph must have a name')
    this.name = name
    this.directed = directed
  }

  // Just check the map for the node and return
  nodeExists (id?: GraphNodeId): GraphNode<any> | undefined {
    if (!id) return undefined
    return this.nodes.get(id)
  }

  // Creates a new node and adds it to the graph
  addNode<T>(data: GraphNode<T> | any): GraphNode<T | any> {
    let node = this.nodeExists(data?._id)
    if (!node || node === null) {
      node = new GraphNode(data)
      this.nodes.set(node._id, node)
    }
    return node
  }

  // Removes a node from the graph
  removeNode (id: GraphNodeId): void {
    const node = this.nodeExists(id)
    if (node) {
      this.nodes.delete(id)
      this.nodes.forEach((n: GraphNode<any>) => {
        n.removeAdjacent(node)
      })
    }
  }

  // Adds an edge by connecting the adjacents between a source node an a destination
  addEdge<S, D>(
    source: GraphNode<S>,
    destination: GraphNode<D>
  ): Array<GraphNode<any>> {
    const sourceNode = this.nodeExists(source._id) || this.addNode(source)
    const destinationNode =
      this.nodeExists(destination._id) || this.addNode(destination)
    if (sourceNode && destinationNode) {
      sourceNode.addAdjacent(destinationNode)
      if (!this.directed) {
        destinationNode.addAdjacent(sourceNode)
      }
    }
    return [sourceNode, destinationNode]
  }

  removeEdge<S, D>(
    source: GraphNode<S>,
    destination: GraphNode<D>
  ): Array<GraphNode<any>> | undefined {
    const sourceNode = this.nodeExists(source._id)
    const destinationNode = this.nodeExists(destination._id)

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode)
      if (!this.directed) {
        destinationNode.removeAdjacent(sourceNode)
      }

      return [sourceNode, destinationNode]
    }
  }
}
