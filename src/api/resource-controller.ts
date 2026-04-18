
import type { ResourceDb } from './data/resource-db.js'
import type { Comment } from './entities/comment.js';


/**
 * 
 */
export class ApiController {
  private resourceDb: ResourceDb;
  constructor(resourceDb:ResourceDb) {
    this.resourceDb = resourceDb;
  }

  async getComments(feedId:string): Promise<Array<Comment>> {
    return await this.resourceDb.getComments(feedId)
  }
}
