import type { UUID } from "crypto"
import type { Reaction } from "./reaction.js"
import type { ReactionDatabase } from "../data/social-databases.js"
import type { SetReactionCommand, GetReactionsQuery, DeleteReactionCommand } from "../domain/command-queries.js"


export function SetReaction(database: ReactionDatabase) {
  return async function(command:SetReactionCommand): Promise<Reaction[]> {
    await database.upsertReaction(command.commentId, command.reaction)
    return await database.readReactions(command.commentId)
  }
}
export function GetReactions(database: ReactionDatabase) {
  return async function(query:GetReactionsQuery): Promise<Reaction[]> {
    return await database.readReactions(query.commentId)
  }
}

export function DeleteReaction(database: ReactionDatabase) {
  return async function(command:DeleteReactionCommand): Promise<Reaction[]> {
    await database.deleteReaction(command.feedId, command.commentId, command.userId)
    return await database.readReactions(command.commentId)
  }
}
