import { GraphNode } from '../src/node';
import { Edge } from '../src/edge';

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
      node.addAdjacent(adjacent, new Edge('test-edge'));
      expect(node.isAdjacent(adjacent)).toBe(true);
    });
    it('should return false if node is not adjacent', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      expect(node.isAdjacent(adjacent)).toBe(false);
    });
  });
  describe('addAdjacent', () => {
    it('should not add a node if it already exists', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent, new Edge('test-edge'));
      node.addAdjacent(adjacent, new Edge('test-edge'));
      expect(node.adjacents.length).toBe(1);
    });
    it('should add a node if it does not already exist', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent, new Edge('test-edge'));
      const adjacent2 = new GraphNode('test3');
      node.addAdjacent(adjacent2, new Edge('test-edge'));
      expect(node.adjacents.length).toBe(2);
    });
  });
  describe('removeAdjacent', () => {
    it('should remove a node from the adjacents array', () => {
      const node = new GraphNode('test');
      const adjacent = new GraphNode('test2');
      node.addAdjacent(adjacent, new Edge('test-edge'));
      node.removeAdjacent(adjacent);
      expect(node.adjacents.length).toBe(0);
    });
  });
});
