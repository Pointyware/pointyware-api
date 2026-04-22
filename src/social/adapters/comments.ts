import type { CommentDto, CommentIdDto, UserIdDto } from "../../data/dtos.js"
import type { Request } from 'express'
import type { CommentQuery, CreateCommentCommand, DeleteCommentCommand, UpdateCommentCommand } from "../domain/comment-interactors.js"
import type { UserQuery } from "../../accounts/domain/accounts.js"

/*
TODO: include Zod
  1. validate request data and return 400 with schema validation errors if invalid
  2. use validated data to map to service models
  3. bind service response to http response with appropriate status codes
*/
export function CreateCommentMapper(req:Request<CommentIdDto,any,CommentDto,any>): CreateCommentCommand {
  return {
    parent: req.params.commentId,
    content: req.body.content
  }
}
export function GetCommentMapper(req:Request<CommentIdDto,any,any,any>): CommentQuery {
  return {
    id: req.params.commentId
  }
}

export function GetUserCommentsMapper(req:Request<UserIdDto,any,any,any>): UserQuery {
  return {
    userId: req.params.userId
  }
}

export function UpdateCommentMapper(req:Request<CommentIdDto,any,CommentDto,any>): UpdateCommentCommand {
  return {
    id: req.params.commentId,
    content: req.body.content
  }
}

export function DeleteCommentMapper(req:Request<CommentIdDto,any,any,any>): DeleteCommentCommand {
  return {
    id: req.params.commentId
  }
}
