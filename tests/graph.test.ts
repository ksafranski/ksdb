import { Graph } from '../src/graph';

let graph: Graph | undefined;

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
  describe('addEdge', () => {
    it('should add an edge between two nodes', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      graph.addEdge(node1, node2);
      expect(node1?.isAdjacent(node2)).toBe(true);
      expect(node2?.isAdjacent(node1)).toBe(true);
    });
    it('should not add an edge if the nodes do not exist', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      graph.addEdge(node1, node2);
      expect(node1?.isAdjacent(node2)).toBe(true);
      expect(node2?.isAdjacent(node1)).toBe(true);
    });
  });
  describe('removeEdge', () => {
    it('should remove an edge between two nodes', () => {
      graph = new Graph('test');
      const node1 = graph.addNode('test');
      const node2 = graph.addNode('test2');
      graph.addEdge(node1, node2);
      graph.removeEdge(node1, node2);
      expect(node1?.isAdjacent(node2)).toBe(false);
      expect(node2?.isAdjacent(node1)).toBe(false);
    });
  });
  describe('search', () => {
    describe('breadth', () => {
      it('should return an array of nodes from a breadth-first search', () => {
        graph = new Graph('test');
        const node1 = graph.addNode('test');
        const node2 = graph.addNode('test2');
        const node2a = graph.addNode('test2a');
        const node3 = graph.addNode('test3');
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node2a);
        graph.addEdge(node2, node3);
        const nodes = graph.search('breadth', node1);
        expect(nodes).toBeInstanceOf(Set);
        expect([...nodes].map((n: any) => n.data)).toEqual([
          'test',
          'test2',
          'test2a',
          'test3',
        ]);
        expect(nodes?.size).toBe(4);
      });
      it('should return an array of nodes from a depth-first search', () => {
        graph = new Graph('test');
        const node1 = graph.addNode('test');
        const node2 = graph.addNode('test2');
        const node2a = graph.addNode('test2a');
        const node3 = graph.addNode('test3');
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node2a);
        graph.addEdge(node2, node3);
        const nodes = graph.search('depth', node1);
        expect(nodes).toBeInstanceOf(Set);
        expect([...nodes].map((n: any) => n.data)).toEqual([
          'test',
          'test2',
          'test3',
          'test2a',
        ]);
        expect(nodes?.size).toBe(4);
      });
    });
  });
});
