import { DatabaseSync, type SQLOutputValue } from "node:sqlite"

import { Comment } from "../entities/comment.js"
import { randomUUID } from "node:crypto"

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
);
`

export class ResourceDb {
  private db: DatabaseSync
  constructor(path:string=':memory:') {
    this.db = new DatabaseSync(path)
  }

  async addComment(feedId:string,parentId:string,content:string): Promise<Comment> {

    return new Promise<Comment>((resolve,reject)=>{
      try {
        const comment = this._addComment(feedId,parentId,content)
        const uuid = randomUUID() // generate a UUID for the comment
        const statement = this.db.prepare('INSERT INTO comments (feed_id,parent_id,content,uuid) VALUES ($feedId,$parentId,$content,$uuid)')
        const changed = statement.run({
          feedId: feedId,
          parentId: parentId,
          content: content,
          uuid: uuid
        })
        const id = changed.lastInsertRowid
        // TODO: include id in Comment entity

        
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
      return new Comment(comment)
    })

    return commentList
  }
}
