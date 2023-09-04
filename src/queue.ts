import { Base } from './util/base';

/**
 * Queue class
 */
export class Queue extends Base {
  // Items in the queue
  items: any[] = [];

  constructor() {
    super();
  }

  // Get the size of the queue
  get size(): number {
    return this.items.length;
  }

  // Add an item to the queue
  push<T>(item: T): Queue {
    this.items.push(item);
    return this;
  }

  // Get the next item from the queue
  next<T>(): T | undefined {
    const item = this.items.shift();
    return item;
  }
}
