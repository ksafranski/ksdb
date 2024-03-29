import { GraphNode } from '../src/node';
import { Graph } from '../src/graph';
import { Edge } from '../src/edge';

let graph: Graph<any> | undefined;

describe('graph', () => {
  afterEach(() => {
    graph = undefined;
  });
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      graph = new Graph('test');
      expect(graph).toBeInstanceOf(Graph);
    });
    it('should throw error if no name is provided', () => {
      expect(() => new Graph('')).toThrowError('Graph must have a name');
    });
  });
  describe('nodeExists', () => {
    it('should return undefined if node does not exist', () => {
      graph = new Graph('test');
      expect(graph.nodeExists('test')).toBeUndefined();
    });
    it('should return the node if it exists', () => {
      graph = new Graph('test');
      const node = graph.addNode('test');
      expect(graph.nodeExists(node?._id)).toBeDefined();
    });
  });
  describe('addNode', () => {
    it('should add a node to the graph', () => {
      graph = new Graph('test');
      const node = graph.addNode('test');
      expect(graph.nodeExists(node?._id)).toBeDefined();
    });
    it('should not add a node if it already exists', () => {
      graph = new Graph('test');
      const node = graph.addNode('test');
      const node2 = graph.addNode(node);
      expect(node2).toBe(node);
    });
  });
  describe('removeNode', () => {
    it('should remove a node from the graph', () => {
      graph = new Graph('test');
      const node = graph.addNode('test');
      graph.removeNode(node?._id);
      expect(graph.nodeExists(node?._id)).toBeUndefined();
    });
  });
  describe('connectNodes', () => {
    it('should add an edge between two nodes', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      const edge = new Edge('edge');
      graph.connectNodes(node1, node2, edge);
      expect(node1?.isAdjacent(node2)).toBe(true);
      expect(node2?.isAdjacent(node1)).toBe(true);
    });
    it('should not add an edge if the nodes do not exist', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      const edge = new Edge('edge');
      graph.connectNodes(node1, node2, edge);
      expect(node1?.isAdjacent(node2)).toBe(true);
      expect(node2?.isAdjacent(node1)).toBe(true);
    });
  });
  describe('disconnectNodes', () => {
    it('should remove an edge between two nodes', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      const edge = new Edge('edge');
      graph.connectNodes(node1, node2, edge);
      graph.disconnectNodes(node1, node2);
      expect(node1?.isAdjacent(node2)).toBe(false);
      expect(node2?.isAdjacent(node1)).toBe(false);
    });
  });
  describe('scan', () => {
    describe('breadth', () => {
      it('should return an array of nodes from a breadth-first scan', () => {
        graph = new Graph('test');
        const node1 = graph.addNode('test');
        const node2 = graph.addNode('test2');
        const node2a = graph.addNode('test2a');
        const node3 = graph.addNode('test3');
        const edge = new Edge('edge');
        graph.connectNodes(node1, node2, edge);
        graph.connectNodes(node2, node2a, edge);
        graph.connectNodes(node2, node3, edge);
        const nodes = graph.scan('breadth', node1);
        expect(nodes).toBeInstanceOf(Set);
        expect([...nodes].map((n: any) => n.data)).toEqual([
          'test',
          'test2',
          'test2a',
          'test3'
        ]);
        expect(nodes?.size).toBe(4);
      });
      it('should return an array of nodes from a depth-first scan', () => {
        graph = new Graph('test');
        const node1 = graph.addNode('test');
        const node2 = graph.addNode('test2');
        const node2a = graph.addNode('test2a');
        const node3 = graph.addNode('test3');
        const edge = new Edge('edge');
        graph.connectNodes(node1, node2, edge);
        graph.connectNodes(node2, node2a, edge);
        graph.connectNodes(node2, node3, edge);
        const nodes = graph.scan('depth', node1);
        expect(nodes).toBeInstanceOf(Set);
        expect([...nodes].map((n: any) => n.data)).toEqual([
          'test',
          'test2',
          'test3',
          'test2a'
        ]);
        expect(nodes?.size).toBe(4);
      });
    });
  });
  describe('find', () => {
    it('finds a node by running a callback', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      const node2a = graph.addNode('test2a');
      const node3 = graph.addNode('test3');
      const edge = new Edge('edge');
      graph.connectNodes(node1, node2, edge);
      graph.connectNodes(node2, node2a, edge);
      graph.connectNodes(node2, node3, edge);
      const node = graph.find((n: any) => n.data === 'test2');
      expect(node).toBeInstanceOf(GraphNode);
      expect(node?.data).toBe('test2');
    });
  });
});
