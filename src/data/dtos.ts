import type { UUID } from "crypto";

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

/**
 * Identifies a comment by its id
 */
export interface CommentIdDto {
  commentId:UUID
}
/**
 * Represents a comment as its comment alone.
 */
export interface CommentDto {
  content:string
}
