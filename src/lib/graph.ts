import { GraphNode, type GraphNodeId } from './node'

/**
 * Graphs are data structures with nodes (vertexes) and edges. This
 * forms a structure that allows traversal by referencing node edges
 * which connect a node to other nodes in the graph
 */
export class Graph {
  nodes = new Map<string, GraphNode<any>>()

  // Defines if edges move in one direction (true) or any (false)
  directed: boolean = false

  constructor (directed: boolean = false) {
    this.directed = directed
  }

  // Just check the map for the node and return
  nodeExists (id: GraphNodeId): GraphNode<any> | undefined {
    return this.nodes.get(id)
  }

  // Creates a new node and adds it to the graph
  addNode (data: any): GraphNode<any> | undefined {
    const node = this.nodeExists(data?.id)
    if (!node || node !== null) {
      const node = new GraphNode(data)
      this.nodes.set(node._id, node)
    }
    return node
  }

  // Adds an edge by connecting the adjacents between a source node an a destination
  addEdge (
    source: GraphNode<any>,
    destination: GraphNode<any>
  ): Array<GraphNode<any> | undefined> {
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

  removeEdge (
    source: GraphNode<any>,
    destination: GraphNode<any>
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
