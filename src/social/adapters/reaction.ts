import type { Request } from "express"
import type { CommentIdDto, ReactionDto } from "../../data/dtos.js"
import type { DeleteReactionCommand, SetReactionCommand } from "../domain/reaction-interactors.js"

export function SetReactionMapper(req:Request<CommentIdDto,any,ReactionDto,any>): SetReactionCommand {
  return {
    commentId: req.params.commentId,
    reaction: req.body.reaction
  }
}

export function DeleteReactionMapper(req:Request<CommentIdDto>): DeleteReactionCommand {
  return {
    commentId: req.params.commentId
  }
}
