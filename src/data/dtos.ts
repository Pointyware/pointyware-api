import type { UUID } from "crypto";
import type { Reaction } from "../social/entities/reaction.js";

/**
 * Identifies a single id for a single user.
 */
export interface UserIdDto {
  userId:UUID
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

export interface AccountAuthDto {
  username:string
  password:string
}

export interface ReactionDto {
  reaction: Reaction
}
