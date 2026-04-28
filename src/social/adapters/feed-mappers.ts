
import type { Request } from 'express'
import type { FeedDto, FeedIdDto, FeedQueryParams } from '../../data/dtos.js'
import type { CreateFeedCommand, GetFeedQuery, GetFeedsQuery, UpdateFeedCommand, DeleteFeedCommand } from '../domain/command-queries.js'

export function CreateFeedMapper(req:Request<unknown,unknown,FeedDto>): CreateFeedCommand {
  return {
    title: req.body.title
  }
}
export function GetFeedMapper(req:Request<FeedIdDto>): GetFeedQuery {
  return {
    feedId: req.params.feedId
  }
}
export function GetFeedsMapper(req:Request<unknown,unknown,unknown,FeedQueryParams>): GetFeedsQuery {
  return {
    topics: req.query.topics
  }
}

export function UpdateFeedMapper(req:Request<FeedIdDto,unknown,FeedDto>): UpdateFeedCommand {
  return {
    feedId: req.params.feedId,
    title: req.body.title
  }
}

export function DeleteFeedMapper(req:Request<FeedIdDto>): DeleteFeedCommand {
  return {
    feedId: req.params.feedId
  }
}
