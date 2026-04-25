import type { UUID } from "node:crypto"

/**
 * A single user comment in a feed.
 */
export class Comment {
  id:UUID
  text:string
  authorId:UUID
  parentId:UUID|undefined
  constructor(id:UUID,text:string,authorId:UUID,parentId?:UUID) {
    this.id = id
    this.text = text
    this.authorId = authorId
    this.parentId = parentId
  }
}

export interface CommentsSummary {
  count: number
}

export interface CommentCore {
  commentId: UUID
  postedDate: Date
}

export interface CommentPreview extends CommentCore {
  preview:string
}

export interface CommentDetail extends CommentCore {
  text:string
  children:CommentsSummary
}
