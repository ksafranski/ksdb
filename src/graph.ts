import { GraphNode, type GraphNodeId } from './node';
import { Queue } from './queue';
import { Stack } from './stack';
import { Base } from './util/base';

/**
 * Primary Graph class
 */
export class Graph extends Base {
  // Ref for the graph context
  name: string;

  // Member nodes of the graph
  nodes = new Map<string, GraphNode<any>>();

  // Defines if edges move in one direction (true) or any (false)
  directed: boolean = false;

  constructor(name: string, directed: boolean = false) {
    super();
    if (!name) throw new Error('Graph must have a name');
    this.name = name;
    this.directed = directed;
  }

  // Just check the map for the node and return
  nodeExists(id?: GraphNodeId): GraphNode<any> | undefined {
    if (!id) return undefined;
    return this.nodes.get(id);
  }

  // Creates a new node and adds it to the graph
  addNode<T>(data: GraphNode<T> | any): GraphNode<T | any> {
    let node = this.nodeExists(data?._id);
    if (!node || node === null) {
      node = new GraphNode(data);
      this.nodes.set(node._id, node);
    }
    return node;
  }

  // Removes a node from the graph
  removeNode(id: GraphNodeId): void {
    const node = this.nodeExists(id);
    if (node) {
      this.nodes.delete(id);
      this.nodes.forEach((n: GraphNode<any>) => {
        n.removeAdjacent(node);
      });
    }
  }

  // Adds an edge by connecting the adjacents between a source node an a destination
  addEdge<S, D>(
    source: GraphNode<S>,
    destination: GraphNode<D>
  ): Array<GraphNode<any>> {
    const sourceNode = this.nodeExists(source._id) || this.addNode(source);
    const destinationNode =
      this.nodeExists(destination._id) || this.addNode(destination);
    if (sourceNode && destinationNode) {
      sourceNode.addAdjacent(destinationNode);
      if (!this.directed) {
        destinationNode.addAdjacent(sourceNode);
      }
    }
    return [sourceNode, destinationNode];
  }

  // Removes an edge by removing the adjacents between a source node and a destination
  removeEdge<S, D>(
    source: GraphNode<S>,
    destination: GraphNode<D>
  ): Array<GraphNode<any>> | undefined {
    const sourceNode = this.nodeExists(source._id);
    const destinationNode = this.nodeExists(destination._id);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
      if (!this.directed) {
        destinationNode.removeAdjacent(sourceNode);
      }

      return [sourceNode, destinationNode];
    }
  }

  search<T>(
    type: 'breadth' | 'depth' = 'breadth',
    first: GraphNode<T>
  ): Set<GraphNode<T> | unknown> {
    // Determine the type of visitList to use.
    const visitList = type === 'breadth' ? new Queue() : new Stack();
    visitList.push(first);

    // Create a set to store the nodes that we have already visited.
    const visited = new Set();

    // While there are still nodes in the visitList:
    while (visitList.size > 0) {
      // Get the next node from the visitList.
      const node: any = visitList.next();
      // If we have not already visited this node:
      if (!visited.has(node)) {
        // Mark the node as visited.
        visited.add(node);
        // Add all of the node's adjacent to the visitList.
        for (const adjacent of node.adjacents) {
          visitList.push(adjacent);
        }
      }
    }

    // Return the set
    return visited;
  }
}
