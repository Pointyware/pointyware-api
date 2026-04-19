
import type { UUID } from 'node:crypto';
import type { SocialDatabase } from './data/social-db.js'
import type { Comment } from './entities/comment.js';

const NULL_UUID = `0-0-0-0-0`
/**
 * 
 */
export class SocialController {
  private resourceDb: SocialDatabase;
  constructor(resourceDb:SocialDatabase) {
    this.resourceDb = resourceDb;
  }

  async createComment(content: string, parentId?: UUID): Promise<Comment> {
    // TODO: get feed id as well or default
    return await this.resourceDb.addComment(NULL_UUID, parentId || NULL_UUID, content)
  }
  async getComments(feedId:string): Promise<Array<Comment>> {
    return await this.resourceDb.getComments(feedId)
  }
}
