import { DatabaseSync, type SQLOutputValue } from "node:sqlite"
import { randomUUID, type UUID } from "crypto"
import { Comment } from "../domain/comment.js"
import type { Feed } from "../domain/feed.js"
import type { Reaction } from "../domain/reaction.js"
import type { FeedDatabase, CommentDatabase, ReactionDatabase, ReactionBrief } from "./social-databases.js"
import { UnimplementedError } from "@/common/service-errors.js"


const TABLE_FEEDS = `
CREATE TABLE feeds (
  feed_id INT PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);`

const TABLE_COMMENTS = `
CREATE TABLE comments (
  comment_id INT PRIMARY KEY AUTOINCREMENT,
  feed_id INT REFERENCES feeds ON DELETE CASCADE,
  parent_id INT,
  content TEXT NOT NULL
);`

const NULL_UUID: UUID = '00000000-000000-0000-0000-00000000'

export class SqliteFeedDao implements FeedDatabase {
  createFeed(title: string): Promise<Feed> {
    throw new Error("Method not implemented.")
  }
  readFeed(feedId: UUID): Promise<Feed> {
    throw new Error("Method not implemented.")
  }
  readFeeds(): Promise<Feed[]> {
    throw new Error("Method not implemented.")
  }
  updateFeed(feedId: UUID, title: string): Promise<Feed> {
    throw new Error("Method not implemented.")
  }
  deleteFeed(feedId: UUID): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
export class SqliteCommentDao implements CommentDatabase {
  createComment(content: string, feedId: UUID, parentId?: UUID): Promise<Comment> {
    throw new Error("Method not implemented.")
  }
  readComment(feedId: UUID, id: UUID): Promise<Comment> {
    throw new Error("Method not implemented.")
  }
  readComments(feedId: UUID): Promise<Comment[]> {
    throw new Error("Method not implemented.")
  }
  updateComment(feedId: UUID, id: UUID, content: string): Promise<Comment> {
    throw new Error("Method not implemented.")
  }
  deleteComment(feedId: UUID, id: UUID): Promise<void> {
    throw new Error("Method not implemented.")
  }

}
export class SqliteReactionDao implements ReactionDatabase {
  upsertReaction(commentId: UUID, userId: UUID, reaction: Reaction): Promise<ReactionBrief> {
    throw new Error("Method not implemented.")
  }
  readReactions(commentId: UUID): Promise<ReactionBrief> {
    throw new Error("Method not implemented.")
  }
  deleteReaction(commentId: UUID, userId: UUID): Promise<void> {
    throw new Error("Method not implemented.")
  }
}

export class SqliteSocialDatabase implements FeedDatabase, CommentDatabase, ReactionDatabase {
  private db: DatabaseSync
  constructor(path=':memory:') {
    this.db = new DatabaseSync(path)
  }

  async createFeed(title:string): Promise<Feed> {
    const uuid = randomUUID() // generate a UUID for the feed
    const statement = this.db.prepare(`
      INSERT INTO feeds (feed_id,title)
      VALUES ($feedId,$title)
      `)
    statement.run({
      feedId: uuid,
      title: title
    }) 
    return {
      id: uuid,
      title: title,
      comments: []
    }
  }
  async readFeed(feedId:UUID): Promise<Feed> {
    throw new UnimplementedError('sqlite-social-database', 'newFeed')
  }
  async readFeeds(): Promise<Feed[]> {
    throw new UnimplementedError('sqlite-social-database', 'readFeeds')
  }
  async updateFeed(feedId:UUID,title:string): Promise<Feed> {
    throw new UnimplementedError('sqlite-social-database', 'updateFeed')
  }
  async deleteFeed(feedId:UUID): Promise<void> {
    // TODO: delete feed from database
    throw new UnimplementedError('sqlite-social-database', 'readFeed')
  }

  async createComment(feedId:UUID,content:string,parentId?:UUID): Promise<Comment> {
    
    return new Promise<Comment>((resolve,reject)=>{
      try {
        const uuid = randomUUID() // generate a UUID for the comment
        const userId = randomUUID() // TODO: 
        const safeId = parentId || NULL_UUID  // TODO: replace with null UUID?
        const statement = this.db.prepare(`
          INSERT INTO comments (feed_id,parent_id,content,uuid)
          VALUES ($feedId,$parentId,$content,$uuid)
          `)
        statement.run({
          feedId: feedId,
          parentId: safeId,
          content: content,
          uuid: uuid
        }) 
        resolve(new Comment(uuid,content,userId,safeId))
      }
      catch (err) {
        reject(err)
      }
    }
    )
  }

  async readComment(feedId:UUID,id:UUID): Promise<Comment> {
    // TODO: read comment from database by id and return
    throw new UnimplementedError('sqlite-social-database', 'readComment')
  }
  
  async readComments(feedId:UUID): Promise<Comment[]> {
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

  async updateComment(feedId: UUID, id:UUID, content: string): Promise<Comment> {
    // TODO: attempt to overwrite comment
    throw new UnimplementedError('sqlite-social-database', 'updateComment')
  }
  deleteComment(feedId:UUID,commentId:UUID): Promise<void>
  async deleteComment(id: UUID) {
    throw new UnimplementedError('sqlite-social-database', 'deleteComment')
  }


  async upsertReaction(feedId:UUID,commentId: UUID, userId: UUID, reaction: Reaction): Promise<ReactionBrief> {
    // TODO: upsert reaction for comment, then return all reactions for comment
    throw new UnimplementedError('sqlite-social-database', 'upsertReaction')
  }
  
  async readReactions(feedId:UUID,commentId: UUID): Promise<ReactionBrief> {
    // TODO: 
    throw new UnimplementedError('sqlite-social-database', 'readReaction')
  }


  async deleteReaction(feedId:UUID,commentId: UUID) {
    // TODO: delete reaction for comment
    throw new UnimplementedError('sqlite-social-database', 'deleteReaction')
  }
}
