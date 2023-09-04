import { GraphNode } from '../src/node';

describe('node', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      const node = new GraphNode('test');
      expect(node).toBeInstanceOf(GraphNode);
      expect(node.data).toBe('test');
      expect(node._id).toBeDefined();
    });
    it('should throw error if no data is provided', () => {
      expect(() => new GraphNode(false)).toThrowError('Node must have data');
    });
  });
  describe('isAdjacent', () => {
    it('should return true if node is adjacent', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent);
      expect(node.isAdjacent(adjacent)).toBe(true);
    });
    it('should return false if node is not adjacent', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      expect(node.isAdjacent(adjacent)).toBe(false);
    });
  });
  describe('addAdjacent', () => {
    it('should add a node to the adjacents array', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent);
      expect(node.adjacents.length).toBe(1);
      expect(node.adjacents[0]).toBe(adjacent);
    });
  });
  describe('removeAdjacent', () => {
    it('should remove a node from the adjacents array', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent);
      node.removeAdjacent(adjacent);
      expect(node.adjacents.length).toBe(0);
    });
  });
});
