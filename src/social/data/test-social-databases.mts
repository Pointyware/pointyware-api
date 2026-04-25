import { randomUUID, type UUID } from "crypto"
import type { CommentDatabase, FeedDatabase, ReactionBrief, ReactionDatabase } from "./social-databases.js"
import type { Comment } from "../domain/comment.js"
import type { Feed } from "../domain/feed.js"
import type { Reaction } from "../domain/reaction.js"
import { DoesNotExistError } from "@/common/errors.js"

export class TestSocialDatabase implements FeedDatabase, CommentDatabase, ReactionDatabase {
  private feeds: Map<UUID,Feed>
  private comments: Map<UUID, Map<UUID, Comment>>
  private reactions: Map<UUID, Map<UUID,Map<UUID,Reaction>>>
  constructor() {
    this.feeds = new Map()
    this.comments = new Map()
    this.reactions = new Map()
  }
  async createFeed(title: string): Promise<Feed> {
    const feed: Feed = {
      id: randomUUID(),
      title: title,
      comments: []
    }
    this.feeds.set(feed.id, feed)
    return feed
  }
  async readFeed(id: UUID): Promise<Feed> {
    const feed = this.feeds.get(id)
    if (!feed) {
      throw new DoesNotExistError(`/feed/feed-${id}`)
    }
    return feed
  }
  async readFeeds(): Promise<Feed[]> {
    return Array.from(this.feeds.values())
  }
  async updateFeed(id: UUID, title: string): Promise<Feed> {
    const feed = await this.readFeed(id)
    feed.title = title
    this.feeds.set(id, feed)
    return feed
  }
  async deleteFeed(id: UUID): Promise<void> {
    this.feeds.delete(id)
  }
  
  async createComment(userId: UUID, content: string, feedId: UUID, parentId?: UUID): Promise<Comment> {   
    const comment: Comment = {
      id: randomUUID(),
      text: content,
      parentId: parentId,
      authorId: userId
    }
    const feed = this.comments.get(feedId) || new Map()
    feed.set(comment.id, comment)
    this.comments.set(feedId, feed)
    return comment
  }
  async readComment(feedId: UUID, id: UUID): Promise<Comment> {
    const comment = this.comments.get(feedId)?.get(id)
    if (!comment) {
      throw new DoesNotExistError(`/feeds/feed-${feedId}/comments/comment-${comment}`)
    }
    return comment
  }
  async readComments(feedId: UUID): Promise<Comment[]> {
    const feedMap = this.comments.get(feedId) || new Map()
    return Array.from(feedMap.values()).filter(comment => comment.authorId === feedId)
  }
  async updateComment(feedId:UUID, id: UUID, content: string): Promise<Comment> {
    const feed = this.comments.get(feedId)
    if (!feed) {
      throw new DoesNotExistError(`/feeds/${feedId}`)
    }
    const comment = feed.get(id)
    if (!comment) {
      throw new DoesNotExistError(`/feeds/${feedId}/comments/${id}`)
    }
    comment.text = content
    feed.set(id, comment)
    this.comments.set(feedId, feed)
    return comment
  }
  async deleteComment(feedId:UUID,id: UUID): Promise<void> {
    const feed = this.comments.get(feedId)
    if (!feed) {
      throw new DoesNotExistError(`/feeds/${feedId}`)
    }
    const deleted = feed.delete(id)
    if (!deleted) {
      throw new DoesNotExistError(`/feeds/${feedId}/comments/${id}`)
    }
  }

  async upsertReaction(feedId: UUID, commentId: UUID, userId: UUID, reaction: Reaction): Promise<ReactionBrief> {
    const existingReactions = this.reactions.get(commentId) || new Map()
    existingReactions.set(userId, reaction)
    this.reactions.set(commentId, existingReactions)

    const summaryMap = new Map<Reaction, number>()
    existingReactions.forEach((value)=> {
      const count = summaryMap.get(value) || 0
      summaryMap.set(value, count + 1)
    })
    return { summary: summaryMap }
  }
  async readReactions(feedId: UUID, commentId: UUID): Promise<ReactionBrief> {
    const reactionMap = this.reactions.get(commentId) || new Map()
    const summaryMap = new Map<Reaction, number>()
    reactionMap.forEach((value)=> {
      const count = summaryMap.get(value) || 0
      summaryMap.set(value, count + 1)
    })
    return { summary: summaryMap }
  }
  async deleteReaction(feedId: UUID, commentId: UUID, userId: UUID): Promise<void> {
    const reactionMap = this.reactions.get(commentId)
    if (reactionMap) {
      reactionMap.delete(userId)
      this.reactions.set(commentId, reactionMap)
    }
  }
}
