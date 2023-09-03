export class Queue {
  items = new Set<any>();

  get size(): number {
    return this.items.size;
  }

  push<T>(item: T): Queue {
    this.items.add(item);
    return this;
  }

  next<T>(): T | undefined {
    const arr = [...this.items];
    const item = arr.shift();
    this.items = new Set(arr);
    return item;
  }
}
