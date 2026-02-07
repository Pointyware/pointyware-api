
import type { ResourceDb } from './data/resource-db.js'



/**
 * 
 */
export class ApiController {
  private resourceDb: ResourceDb;
  constructor(resourceDb:ResourceDb) {
    this.resourceDb = resourceDb;
  }

  getComments(feedId:string): Array<Comment> {
    return this.resourceDb.getComments(feedId)
  }
}
