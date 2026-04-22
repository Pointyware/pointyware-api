import type { UUID } from "crypto"
import type { SocialDatabase } from "../data/social-db.js"

export interface CreateCommentCommand {
  feedId:UUID
  parentId?:UUID
  content:string
}

export interface CommentQuery {
  id:UUID
}

export interface UpdateCommentCommand {
  id:UUID,
  content:string
}

export interface DeleteCommentCommand {
  id:UUID
}

export function CreateComment(database: SocialDatabase): (command:CreateCommentCommand) => Promise<Comment> {
  return (command:CreateCommentCommand)=> {
    return database.createComment(command.feedId, command.parentId || '', command.content)
  }
}
export function GetComment(database: SocialDatabase): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return database.readComments(query.id)
  }
}
export function GetComments(database: SocialDatabase): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return database.readComments(query.id)
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
    return this.database.createComment(command.feedId || '', command.parentId || '', command.content)
  }
  get(query: CommentQuery): Promise<Comment[]> {
    return this.database
  }
}
