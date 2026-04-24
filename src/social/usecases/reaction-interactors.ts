

import type { ReactionBrief, ReactionDatabase } from "../data/social-databases.js"
import type { SetReactionCommand, GetReactionsQuery, DeleteReactionCommand } from "../domain/command-queries.js"


export function SetReaction(database: ReactionDatabase) {
  return async function(command:SetReactionCommand): Promise<ReactionBrief> {
    await database.upsertReaction(command.feedId, command.commentId, command.userId, command.reaction)
    return await database.readReactions(command.feedId, command.commentId)
  }
}
export function GetReactions(database: ReactionDatabase) {
  return async function(query:GetReactionsQuery): Promise<ReactionBrief> {
    return await database.readReactions(query.feedId, query.commentId)
  }
}

export function DeleteReaction(database: ReactionDatabase) {
  return async function(command:DeleteReactionCommand): Promise<ReactionBrief> {
    await database.deleteReaction(command.feedId, command.commentId, command.userId)
    return await database.readReactions(command.feedId, command.commentId)
  }
}
