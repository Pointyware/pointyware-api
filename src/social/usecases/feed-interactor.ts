
import type { FeedDatabase } from "../data/social-databases.js"
import type { Feed } from "../domain/feed.js"
import type { CreateFeedCommand, GetFeedQuery, GetFeedsQuery, UpdateFeedCommand, DeleteFeedCommand } from "../domain/command-queries.js"
import type { AuthenticatedUser } from "@/common/users.js"

export function CreateFeed(database: FeedDatabase): (command: CreateFeedCommand, user: AuthenticatedUser) => Promise<Feed> {
  return (command,user) => database.createFeed(user.accountId, command.title)
}

export function GetFeed(database: FeedDatabase): (query: GetFeedQuery, user: AuthenticatedUser) => Promise<Feed> {
  return (query) => database.readFeed(query.feedId)
}
export function GetFeeds(database: FeedDatabase): (query: GetFeedsQuery, user: AuthenticatedUser) => Promise<Feed[]> {
  return (query) => database.readFeeds(query)
}

export function UpdateFeed(database: FeedDatabase): (command: UpdateFeedCommand, user: AuthenticatedUser) => Promise<Feed> {
  return (command) => database.updateFeed(command.feedId, command.title)
}

export function DeleteFeed(database: FeedDatabase): (command: DeleteFeedCommand, user: AuthenticatedUser) => Promise<void> {
  return (command) => database.deleteFeed(command.feedId)
}

/**
 * Defines the Feed entry points to the Service Layer
 */
export class FeedInteractor {
  database: FeedDatabase
  constructor(database: FeedDatabase) {
    this.database = database
  }

  createFeed(command: CreateFeedCommand, user: AuthenticatedUser) {
    return this.database.createFeed(user.accountId, command.title)
  }
  getFeed(query: GetFeedQuery, user: AuthenticatedUser) {
    return this.database.readFeed(query.feedId)
  }
  getFeeds(query: GetFeedsQuery, user: AuthenticatedUser) {
    return this.database.readFeeds(query)
  }
  updateFeed(command: UpdateFeedCommand, user: AuthenticatedUser) {
    return this.database.updateFeed(command.feedId, command.title)
  }
  deleteFeed(command: DeleteFeedCommand, user: AuthenticatedUser) {
    return this.database.deleteFeed(command.feedId)
  }
}
export class DelegateFeedInteractor {
  database: FeedDatabase
  constructor(database: FeedDatabase) {
    this.database = database
  }
  createFeed = (command:CreateFeedCommand, user: AuthenticatedUser)=> { CreateFeed(this.database)(command,user) }
  getFeed = (query:GetFeedQuery, user: AuthenticatedUser) => { GetFeed(this.database)(query,user) }
  getFeeds = (query:GetFeedsQuery, user: AuthenticatedUser) => { GetFeeds(this.database)(query,user) }
  updateFeed = (command:UpdateFeedCommand, user: AuthenticatedUser) => { UpdateFeed(this.database)(command,user) }
  deleteFeed = (command:DeleteFeedCommand, user: AuthenticatedUser) => { DeleteFeed(this.database)(command,user) }
}
