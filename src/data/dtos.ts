import type { UUID } from "crypto";

/**
 * Identifies a single id for a single user.
 */
export interface UserIdDto {
  userId:UUID
}



export interface CommentDto {
  content:string
}