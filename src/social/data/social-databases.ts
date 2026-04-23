import type { UUID } from "node:crypto";
import type { Comment } from "../entities/comment.js";
import type { Feed } from "../entities/feed.js";
import type { Reaction } from "../entities/reaction.js";


export interface FeedDatabase {
  createFeed(title: string): Promise<Feed>;
  readFeed(id: UUID): Promise<Feed>;
  readFeeds(): Promise<Feed[]>;
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
  upsertReaction(commentId: UUID, userId: UUID, reaction: Reaction): Promise<ReactionBrief>;
  readReactions(commentId: UUID): Promise<ReactionBrief>;
  deleteReaction(commentId: UUID, userId: UUID): Promise<void>;
}

export interface ReactionBrief {
  summary: Map<Reaction, number>
}

export interface ReactionDetail {
  reactions: Map<Reaction, ReactionUserList>
}
export interface ReactionUserMap {
  [commentId: string]: ReactionUserList
}
export interface ReactionUserList {
  [reaction: string]: UserList  
}

export interface UserList {
  users: UUID[]
}
