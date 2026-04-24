import { PgFacade } from "@/data/pg-facade.js";
import type { Pool } from "pg";
import type { FeedDatabase, CommentDatabase, ReactionDatabase, ReactionBrief } from "./social-databases.js";
import type { UUID } from "crypto";
import type { Feed } from "../domain/feed.js";
import type { Comment } from "../domain/comment.js";
import type { Reaction } from "../domain/reaction.js";


export class PostgresqlSocialDatabase implements FeedDatabase, CommentDatabase, ReactionDatabase {
  pool: Pool;
  constructor() {
    this.pool = resourcePool()
  }

  createFeed(title: string): Promise<Feed> {
    throw new Error("Method not implemented.");
  }
  readFeed(id: UUID): Promise<Feed> {
    throw new Error("Method not implemented.");
  }
  readFeeds(): Promise<Feed[]> {
    throw new Error("Method not implemented.");
  }
  updateFeed(id: UUID, title: string): Promise<Feed> {
    throw new Error("Method not implemented.");
  }
  deleteFeed(id: UUID): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(content: string, feedId: UUID, parentId?: UUID): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  readComment(id: UUID): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  readComments(feedId: UUID): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  updateComment(id: UUID, content: string): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: UUID): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upsertReaction(commentId: UUID, userId: UUID, reaction: Reaction): Promise<Reaction[]> {
    throw new Error("Method not implemented.");
  }
  readReactions(commentId: UUID): Promise<ReactionBrief> {
    throw new Error("Method not implemented.");
  }
  deleteReaction(commentId: UUID, userId: UUID): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export function resourcePool(): Pool {
  return PgFacade.getPool(
    'pointyware-api',
    'apiUser', 'apiPass', 'localhost', 5001, 'social'
  );
}
