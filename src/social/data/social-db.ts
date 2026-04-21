import { DatabaseSync, type SQLOutputValue } from "node:sqlite"
import { Comment } from "../entities/comment.js"
import { randomUUID, type UUID } from "node:crypto"
import { PgFacade } from "../../data/pg-facade.js"
import type { Pool } from "pg"
import type { Feed } from "../entities/feed.js"
import type { Reaction } from "../entities/reaction.js"

const TABLE_FEEDS = `
CREATE TABLE feeds (
  feed_id INT PRIMARY KEY AUTOINCREMENT,
);`

const TABLE_COMMENTS = `
CREATE TABLE comments (
  comment_id INT PRIMARY KEY AUTOINCREMENT,
  feed_id INT REFERENCES feeds ON DELETE CASCADE,
  parent_id INT,
  content TEXT NOT NULL
);`

export interface FeedDatabase {
  createFeed(title:string): Promise<Feed>
  readFeed(id:UUID): Promise<Feed>
  updateFeed(id:UUID,title:string): Promise<Feed>
  deleteFeed(id:UUID): Promise<void>
}
export interface CommentDatabase {
  createComment(content:string,feedId:UUID,parentId?:UUID): Promise<Comment>
  readComment(id:UUID): Promise<Comment>
  readComments(feedId:UUID): Promise<Comment[]>
  updateComment(id:UUID,content:string): Promise<Comment>
  deleteComment(id:UUID): Promise<void>
}
export interface ReactionDatabase {
  upsertCommentReaction(commentId:UUID,reaction:Reaction): Promise<Reaction[]>
  readCommentReactions(commentId:UUID): Promise<Reaction[]>
}
export class SocialDatabase { // TODO: implement feed, comment, reaction databases; only use narrow interfaces in controller so we can separate them behind the scenes
  private db: DatabaseSync
  constructor(path:string=':memory:') {
    this.db = new DatabaseSync(path)
  }

  async createComment(feedId:UUID,content:string,parentId?:UUID,): Promise<Comment> {
    
    return new Promise<Comment>((resolve,reject)=>{
      try {
        const uuid = randomUUID() // generate a UUID for the comment
        const statement = this.db.prepare(`
          INSERT INTO comments (feed_id,parent_id,content)
          VALUES ($feedId,$parentId,$content)
          `)
          statement.run({
            feedId: feedId,
            parentId: parentId,
            content: content,
            uuid: uuid
          }) 
          resolve(new Comment(content,uuid))
        }
        catch (err) {
          reject(err)
        }
      }
    )
  }
  
  async getComments(feedId:string): Promise<Comment[]> {
    const statement = this.db.prepare('SELECT (comment_id,content) FROM comments WHERE feed_id=$feedId LIMIT 10')
    const result = statement.all({
      feedId:feedId
    })
    
    const commentList = result.map((value:Record<string,SQLOutputValue>)=>{
      const comment = value['comment']?.valueOf() as string || '<No Comment>'
      const uuid = value['uuid']?.valueOf() as UUID || '<No UUID>'
      return new Comment(comment, uuid)
    })
    
    return commentList
  }
  setComment(id: string, content: string) {
    // TODO: attempt to overwrite comment
  
  }
  async deleteComment(id: string) {

  }
}


export function resourcePool(): Pool {
  return PgFacade.getPool(
    'pointyware-api',
    'apiUser','apiPass','localhost',5001,'social'
  )
}
