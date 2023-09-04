import { Base } from './util/base';

/**
 * Stack class
 */
export class Stack extends Base {
  // Items in the stack
  items: any[] = [];

  constructor () {
    super();
  }

  // Get the size of the stack
  get size (): number {
    return this.items.length;
  }

  // Add an item to the stack
  push<T>(item: T): Stack {
    this.items.push(item);
    return this;
  }

  // Get the next item from the stack
  next<T>(): T | undefined {
    const item = this.items.pop();
    return item;
  }
}
