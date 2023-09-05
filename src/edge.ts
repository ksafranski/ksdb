import { v4 as uuid } from 'uuid';

/**
 * Define an edge (connection) of the graph
 */
export class Edge {
  _id: string;
  name: string;
  weight: number = 1;

  constructor (name: string, id?: string) {
    this._id = id || uuid();
    this.name = name;
  }
}
