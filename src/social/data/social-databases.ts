import type { UUID } from "node:crypto";
import type { Comment } from "../domain/comment.js";
import type { Feed } from "../domain/feed.js";
import type { Reaction } from "../domain/reaction.js";
import type { GetFeedsQuery } from "../domain/command-queries.js";


export interface FeedDatabase {
  createFeed(title: string): Promise<Feed>;
  readFeed(id: UUID): Promise<Feed>;
  readFeeds(query:GetFeedsQuery): Promise<Feed[]>;
  updateFeed(id: UUID, title: string): Promise<Feed>;
  deleteFeed(id: UUID): Promise<void>;
}
export interface CommentDatabase {
  createComment(content: string, feedId: UUID, parentId?: UUID): Promise<Comment>;
  readComment(feedId: UUID, id: UUID): Promise<Comment>;
  readComments(feedId: UUID): Promise<Comment[]>;
  updateComment(feedId: UUID, id: UUID, content: string): Promise<Comment>;
  deleteComment(feedId: UUID, id: UUID): Promise<void>;
}
export interface ReactionDatabase {
  upsertReaction(feedId: UUID, commentId: UUID, userId: UUID, reaction: Reaction): Promise<ReactionBrief>;
  readReactions(feedId: UUID, commentId: UUID): Promise<ReactionBrief>;
  deleteReaction(feedId: UUID, commentId: UUID, userId: UUID): Promise<void>;
}

export interface ReactionBrief {
  summary: Map<Reaction, number>
}

export interface ReactionDetail {
  reactions: Map<Reaction, ReactionUserList>
}
export type ReactionUserMap = Record<string, ReactionUserList>;
export type ReactionUserList = Record<string, UserList>;

export interface UserList {
  users: UUID[]
}
