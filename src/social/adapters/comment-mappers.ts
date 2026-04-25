import type { UserQuery } from "@/accounts/domain/command-queries.mjs"
import type { CommentDto, CommentIdDto, FeedIdDto, UserIdDto } from "../../data/dtos.js"
import type { Request } from 'express'
import type { CreateCommentCommand, CommentQuery, CommentsQuery, UpdateCommentCommand, DeleteCommentCommand } from "../domain/command-queries.js"


/*
TODO: include Zod
  1. validate request data and return 400 with schema validation errors if invalid
  2. use validated data to map to service models
  3. bind service response to http response with appropriate status codes
*/
export function CreateCommentMapper(req:Request<CommentIdDto,unknown,CommentDto>): CreateCommentCommand {
  return {
    feedId: req.params.feedId,
    parentId: req.params.commentId,
    content: req.body.content
  }
}
export function GetCommentMapper(req:Request<CommentIdDto>): CommentQuery {
  return {
    feedId: req.params.feedId,
    commentId: req.params.commentId
  }
}
export function GetFeedCommentsMapper(req:Request<FeedIdDto>): CommentsQuery {
  return {
    feedId: req.params.feedId
  }
}

export function GetUserCommentsMapper(req:Request<UserIdDto>): UserQuery {
  return {
    userId: req.params.userId
  }
}

export function UpdateCommentMapper(req:Request<CommentIdDto,unknown,CommentDto>): UpdateCommentCommand {
  return {
    feedId: req.params.feedId, 
    commentId: req.params.commentId,
    content: req.body.content
  }
}

export function DeleteCommentMapper(req:Request<CommentIdDto>): DeleteCommentCommand {
  return {
    feedId: req.params.feedId,
    commentId: req.params.commentId
  }
}
