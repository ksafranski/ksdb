import { Base } from './util/base'

export class Queue extends Base {
  items: any[] = []

  constructor () {
    super()
  }

  get size (): number {
    return this.items.length
  }

  push<T>(item: T): Queue {
    this.items.push(item)
    return this
  }

  next<T>(): T | undefined {
    const item = this.items.shift()
    return item
  }
}
