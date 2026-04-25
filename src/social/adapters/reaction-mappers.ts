import type { Request } from "express"
import type { ReactionDto, ReactionIdDto } from "../../data/dtos.js"
import type { DeleteReactionCommand, SetReactionCommand } from "../domain/command-queries.js"

export function SetReactionMapper(req:Request<ReactionIdDto,unknown,ReactionDto>): SetReactionCommand {
  return {
    feedId: req.params.feedId,
    commentId: req.params.commentId,
    userId: req.params.userId,
    reaction: req.body.reaction
  }
}

export function DeleteReactionMapper(req:Request<ReactionIdDto>): DeleteReactionCommand {
  return {
    feedId: req.params.feedId,
    commentId: req.params.commentId,
    userId: req.params.userId
  }
}
