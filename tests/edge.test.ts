import { Edge } from '../src/edge';

describe('edge', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      const edge = new Edge('test');
      expect(edge).toBeInstanceOf(Edge);
      expect(edge.name).toBe('test');
      expect(edge.id.length).toBe(36);
    });
  });
});
