import type { UUID } from "crypto"
import type { Reaction } from "./reaction.js"
import type { ReactionDatabase } from "../data/social-databases.js"


export interface SetReactionCommand {
  commentId: UUID,
  reaction: Reaction
}
export function SetReaction(database: ReactionDatabase) {
  return async function(command:SetReactionCommand): Promise<Reaction[]> {
    await database.upsertReaction(command.commentId, command.reaction)
    return await database.readReactions(command.commentId)
  }
}

export interface GetReactionsQuery {
  commentId: UUID
}
export function GetReactions(database: ReactionDatabase) {
  return async function(query:GetReactionsQuery): Promise<Reaction[]> {
    return await database.readReactions(query.commentId)
  }
}

export interface DeleteReactionCommand {
  commentId: UUID
}

export function DeleteReaction(database: ReactionDatabase) {
  return async function(command:DeleteReactionCommand): Promise<Reaction[]> {
    await database.deleteReaction(command.commentId)
    return await database.readReactions(command.commentId)
  }
}
