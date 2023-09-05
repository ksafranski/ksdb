import { v4 as uuid } from 'uuid';

/**
 * Define an edge (connection) of the graph
 */
export class Edge {
  id: string = uuid();
  name: string;

  constructor (name: string) {
    this.name = name;
  }
}
