import { Queue } from '../src/queue';

let queue: Queue | undefined;

describe('queue', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      queue = new Queue();
      expect(queue).toBeInstanceOf(Queue);
    });
  });
  describe('push', () => {
    it('should add an item to the queue', () => {
      queue = new Queue();
      queue.push('test');
      expect(queue.size).toBe(1);
    });
  });
  describe('next', () => {
    it('should return the next item in the queue', () => {
      queue = new Queue();
      queue.push('test');
      expect(queue.next()).toBe('test');
    });
    it('should return undefined if there are no items in the queue', () => {
      queue = new Queue();
      expect(queue.next()).toBeUndefined();
    });
    it('should remove the item from the queue', () => {
      queue = new Queue();
      queue.push('test');
      queue.next();
      expect(queue.size).toBe(0);
    });
  });
});
