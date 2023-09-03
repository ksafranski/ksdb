import { Graph } from '../src/graph';

describe('graph', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      const graph = new Graph('test');
      expect(graph).toBeInstanceOf(Graph);
    });
    it('should throw error if no name is provided', () => {
      expect(() => new Graph('')).toThrowError('Graph must have a name');
    });
  });
});
