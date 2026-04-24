import type { UUID } from "crypto"
import type { SqliteSocialDatabase } from "../data/sqlite-social-database.js"
import type { CommentDatabase } from "../data/social-databases.js"
import type { Comment } from "./comment.js"
import type { UserQuery } from "../../accounts/domain/account-interactors.js"

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
export function GetComment(database: SqliteSocialDatabase): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return database.readComments(query.commentId)
  }
}
export function GetFeedComments(database: SqliteSocialDatabase): (query:CommentsQuery)=>Promise<Comment[]> {
  return (query:CommentsQuery)=> {
    return database.readComments(query.feedId)
  }
}
export function GetUserComments(database: SqliteSocialDatabase): (query:UserQuery)=>Promise<Comment[]> {
  return (query:UserQuery)=> {
    return database.readComments(query.userId)
  }
}

export function UpdateComment(database: SqliteSocialDatabase) {
  return (command:UpdateCommentCommand)=> {
    return database.updateComment(command.id, command.content)
  }
}

export function DeleteComment(database: SqliteSocialDatabase) {
  return (command:DeleteCommentCommand)=> {
    return database.deleteComment(command.id)
  }
}

export class CommentInteractor {
  database: SqliteSocialDatabase
  constructor(database: SqliteSocialDatabase) {
    this.database = database
  }
  create(command: CreateCommentCommand): Promise<Comment> {
    return this.database.createComment(command.content, command.feedId, command.parentId)
  }
  get(query: CommentQuery): Promise<Comment[]> {
    return this.database.readComments(query.commentId)
  }
}
