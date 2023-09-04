import { Stack } from '../src/stack';

let stack;

describe('stack', () => {
  describe('instance', () => {
    it('should be able to be instantiated', () => {
      stack = new Stack();
      expect(stack).toBeInstanceOf(Stack);
    });
  });
  describe('push', () => {
    it('should add an item to the stack', () => {
      const stack = new Stack();
      stack.push(1);
      expect(stack.size).toEqual(1);
    });
  });
  describe('next', () => {
    it('should return the next item in the stack', () => {
      const stack = new Stack();
      stack.push(1);
      expect(stack.next()).toEqual(1);
    });
    it('should return undefined if there are no items in the stack', () => {
      const stack = new Stack();
      expect(stack.next()).toBeUndefined();
    });
    it('should remove the item from the stack', () => {
      const stack = new Stack();
      stack.push(1);
      stack.next();
      expect(stack.size).toEqual(0);
    });
  });
});
