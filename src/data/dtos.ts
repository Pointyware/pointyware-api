import type { UUID } from "crypto";
import type { Reaction } from "../social/domain/reaction.js";

/**
 * Identifies a single id for a single user.
 * // TODO: rename to AccountIdDto
 */
export interface UserIdDto {
  userId:UUID
}

export interface AccountAuthDto {
  username:string
  password:string
}

/**
 * Describes a user's profile information.
 */
export interface ProfileDto {
  email?:string
  phoneNumber?:string
}

export interface FeedIdDto {
  feedId:UUID
}
export interface FeedDto {
  title:string
}
/**
 * Identifies a comment by its id
 */
export interface CommentIdDto {
  feedId:UUID
  commentId:UUID
}
/**
 * Represents a comment as its comment alone.
 */
export interface CommentDto {
  content:string
}

export interface ReactionDto {
  reaction: Reaction
}
