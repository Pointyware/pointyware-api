import type { UUID } from "crypto"
import type { SocialDatabase } from "../data/social-db.js"
import type { SocialController } from "../social-controller.js"

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
export function GetComment(controller: SocialController): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return controller.getComments(query.id)
  }
}
export function GetComments(controller: SocialController): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return controller.getComments(query.id)
  }
}
export function GetUserComments(controller: SocialController): (query:UserQuery)=>Promise<Comment[]> {
  return (query:UserQuery)=> {
    return controller.getComments(query.userId)
  }
}

export function UpdateComment(controller: SocialController) {
  return (command:UpdateCommentCommand)=> {
    return controller.updateComment(command.id, command.content)
  }
}

export function DeleteComment(controller: SocialController) {
  return (command:DeleteCommentCommand)=> {
    return controller.deleteComment(command.id)
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
