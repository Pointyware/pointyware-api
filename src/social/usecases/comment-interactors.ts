import type { SqliteSocialDatabase } from "../data/sqlite-social-database.js"
import type { CommentDatabase } from "../data/social-databases.js"
import type { Comment } from "../domain/comment.js"
import type { UserQuery } from "../../accounts/domain/account-interactors.js"
import type { CreateCommentCommand, CommentQuery, CommentsQuery, UpdateCommentCommand, DeleteCommentCommand } from "../domain/command-queries.js"

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
    return database.updateComment(command.feedId, command.commentId, command.content)
  }
}

export function DeleteComment(database: SqliteSocialDatabase) {
  return (command:DeleteCommentCommand)=> {
    return database.deleteComment(command.feedId, command.commentId)
  }
}

export class CommentInteractor {
  database: SqliteSocialDatabase
  constructor(database: SqliteSocialDatabase) {
    this.database = database
  }
  create(command: CreateCommentCommand): Promise<Comment> {
    return this.database.createComment(command.feedId, command.content, command.parentId)
  }
  get(query: CommentQuery): Promise<Comment[]> {
    return this.database.readComments(query.commentId)
  }
}
