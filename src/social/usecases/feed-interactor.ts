
import type { FeedDatabase } from "../data/social-databases.js"
import type { Feed } from "../domain/feed.js"
import type { CreateFeedCommand, GetFeedQuery, GetFeedsQuery, UpdateFeedCommand, DeleteFeedCommand } from "../domain/command-queries.js"

export function CreateFeed(database: FeedDatabase): (command: CreateFeedCommand) => Promise<Feed> {
  return (command) => database.createFeed(command.title)
}

export function GetFeed(database: FeedDatabase): (query: GetFeedQuery) => Promise<Feed> {
  return (query) => database.readFeed(query.feedId)
}
export function GetFeeds(database: FeedDatabase): (query: GetFeedsQuery) => Promise<Feed[]> {
  return (query) => database.readFeeds()
}

export function UpdateFeed(database: FeedDatabase): (command: UpdateFeedCommand) => Promise<Feed> {
  return (command) => database.updateFeed(command.feedId, command.title)
}

export function DeleteFeed(database: FeedDatabase): (command: DeleteFeedCommand) => Promise<void> {
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

  createFeed(command: CreateFeedCommand) {
    return this.database.createFeed(command.title)
  }
  getFeed(query: GetFeedQuery) {
    return this.database.readFeed(query.feedId)
  }
  getFeeds(query: GetFeedsQuery) {
    return this.database.readFeeds(query)
  }
  updateFeed(command: UpdateFeedCommand) {
    return this.database.updateFeed(command.feedId, command.title)
  }
  deleteFeed(command: DeleteFeedCommand) {
    return this.database.deleteFeed(command.feedId)
  }
}
export class DelegateFeedInteractor {
  database: FeedDatabase
  constructor(database: FeedDatabase) {
    this.database = database
  }
  createFeed = (command:CreateFeedCommand)=> { CreateFeed(this.database)(command) }
  getFeed = (query:GetFeedQuery) => { GetFeed(this.database)(query) }
  getFeeds = (query:GetFeedsQuery) => { GetFeeds(this.database)(query) }
  updateFeed = (command:UpdateFeedCommand) => { UpdateFeed(this.database)(command) }
  deleteFeed = (command:DeleteFeedCommand) => { DeleteFeed(this.database)(command) }
}
 