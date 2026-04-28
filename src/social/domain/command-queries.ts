import type { UUID } from "crypto"
import type { Reaction } from "./reaction.js"

export interface CreateFeedCommand {
  title: string
}
export interface GetFeedQuery {
  feedId: UUID
}
export interface GetFeedsQuery {
  topics?: string[]
}
export interface UpdateFeedCommand {
  feedId: UUID
  title: string
}
export interface DeleteFeedCommand {
  feedId: UUID
}

export type FeedCommandQuery = CreateFeedCommand | GetFeedQuery | UpdateFeedCommand | DeleteFeedCommand

export interface CreateCommentCommand {
  feedId:UUID
  parentId?:UUID
  content:string
}
export interface CommentQuery {
  feedId:UUID
  commentId:UUID
}
export interface CommentsQuery {
  feedId:UUID
  parentId?:UUID
}
export interface UpdateCommentCommand {
  feedId:UUID
  commentId:UUID
  content:string
}
export interface DeleteCommentCommand {
  feedId:UUID
  commentId:UUID
}

export interface SetReactionCommand {
  feedId: UUID
  commentId: UUID
  userId: UUID
  reaction: Reaction
}
export interface GetReactionsQuery {
  feedId: UUID
  commentId: UUID
}
export interface DeleteReactionCommand {
  feedId: UUID
  commentId: UUID
  userId: UUID
}
