import { GraphNode } from '../src/node';

describe('node', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      const node = new GraphNode('test');
      expect(node).toBeInstanceOf(GraphNode);
    });
    it('should throw error if no data is provided', () => {
      expect(() => new GraphNode(false)).toThrowError('Node must have data');
    });
  });
});
