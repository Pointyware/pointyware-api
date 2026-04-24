import { DatabaseSync, type SQLOutputValue } from "node:sqlite"
import { randomUUID, type UUID } from "crypto"
import { Comment } from "../domain/comment.js"
import type { Feed } from "../domain/feed.js"
import type { Reaction } from "../domain/reaction.js"
import type { FeedDatabase, CommentDatabase, ReactionDatabase } from "./social-databases.js"

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

export class SqliteSocialDatabase implements FeedDatabase, CommentDatabase, ReactionDatabase { // TODO: implement feed, comment, reaction databases; only use narrow interfaces in controller so we can separate them behind the scenes
  private db: DatabaseSync
  constructor(path:string=':memory:') {
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
  async readFeed(id:UUID): Promise<Feed> {

    return {
      id: id,
      title: 'Example Feed',
      comments: []
    }
  }
  async readFeeds(): Promise<Feed[]> {
    return []
  }
  async updateFeed(id:UUID,title:string): Promise<Feed> {
    return {
      id: id,
      title: title,
      comments: []
    }
  }
  async deleteFeed(id:UUID): Promise<void> {
    // TODO: delete feed from database
  }

  async createComment(feedId:UUID,content:string,parentId?:UUID): Promise<Comment> {
    
    return new Promise<Comment>((resolve,reject)=>{
      try {
        const uuid = randomUUID() // generate a UUID for the comment
        const safeId = parentId || '' // TODO: replace with null UUID?
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
          resolve(new Comment(content,uuid))
        }
        catch (err) {
          reject(err)
        }
      }
    )
  }

  async readComment(feedId:UUID,id:UUID): Promise<Comment> {
    // TODO: read comment from database by id and return
    return new Comment('Example Comment', id)
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
  updateComment(feedId:UUID,id:UUID,content:string): Promise<Comment>
  async updateComment(id: UUID, content: string): Promise<Comment> {
    // TODO: attempt to overwrite comment

    return new Comment(content, id)
  }
  deleteComment(id:UUID): Promise<void>
  async deleteComment(id: UUID) {
    // TODO: remove comment from database
  }


  async upsertReaction(commentId: UUID, reaction: Reaction): Promise<Reaction[]> {
    // TODO: upsert reaction for comment, then return all reactions for comment
    return []
  }
  
  async readReactions(commentId: UUID): Promise<Reaction[]> {
    // TODO: 
    return []
  }


  async deleteReaction(commentId: UUID) {
    // TODO: delete reaction for comment
  }
}
