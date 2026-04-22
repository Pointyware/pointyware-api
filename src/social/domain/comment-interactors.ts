import type { UUID } from "crypto"
import type { CommentDatabase, FeedDatabase, SocialDatabase } from "../data/social-db.js"
import type { Comment } from "../entities/comment.js"
import type { UserQuery } from "../../accounts/domain/accounts.js"

export interface CreateCommentCommand {
  feedId:UUID
  parentId?:UUID
  content:string
}

export interface CommentQuery {
  commentId:UUID
}
export interface CommentsQuery {
  feedId:UUID
  parentId?:UUID
}

export interface UpdateCommentCommand {
  id:UUID,
  content:string
}

export interface DeleteCommentCommand {
  id:UUID
}

export function CreateComment(database: CommentDatabase): (command:CreateCommentCommand) => Promise<Comment> {
  return async (command:CreateCommentCommand)=> {
    return database.createComment(command.content, command.feedId, command.parentId)
  }
}
export function GetComment(database: SocialDatabase): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return database.readComments(query.commentId)
  }
}
export function GetFeedComments(database: SocialDatabase): (query:CommentsQuery)=>Promise<Comment[]> {
  return (query:CommentsQuery)=> {
    return database.readComments(query.feedId)
  }
}
export function GetUserComments(database: SocialDatabase): (query:UserQuery)=>Promise<Comment[]> {
  return (query:UserQuery)=> {
    return database.readComments(query.userId)
  }
}

export function UpdateComment(database: SocialDatabase) {
  return (command:UpdateCommentCommand)=> {
    return database.updateComment(command.id, command.content)
  }
}

export function DeleteComment(database: SocialDatabase) {
  return (command:DeleteCommentCommand)=> {
    return database.deleteComment(command.id)
  }
}

export class CommentInteractor {
  database: SocialDatabase
  constructor(database: SocialDatabase) {
    this.database = database
  }
  create(command: CreateCommentCommand): Promise<Comment> {
    return this.database.createComment(command.content, command.feedId, command.parentId)
  }
  get(query: CommentQuery): Promise<Comment[]> {
    return this.database.readComments(query.commentId)
  }
}
