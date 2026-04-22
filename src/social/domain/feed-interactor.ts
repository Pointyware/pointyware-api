import type { UUID } from "crypto"
import type { FeedDatabase } from "../data/social-db.js"
import type { Feed } from "../entities/feed.js"

export interface CreateFeedCommand {
  authorId: UUID
  title: string
}

export interface GetFeedQuery {
  feedId: UUID
}
export interface GetFeedsQuery {
  // no params
}

export interface UpdateFeedCommand {
  feedId: UUID
  title: string
}

export interface DeleteFeedCommand {
  feedId: UUID
}

export type FeedCommandQuery = CreateFeedCommand | GetFeedQuery | UpdateFeedCommand | DeleteFeedCommand

export class FeedInteractor {
  database: FeedDatabase
  constructor(database: FeedDatabase) {
    this.database = database
  }
}

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
