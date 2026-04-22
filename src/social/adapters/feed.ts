
/*
TODO: Feed CRUD
  - create feed
  - get feed details
  - update feed details
  - delete feed
*/
import type { Request } from 'express'
import type { CreateFeedCommand, DeleteFeedCommand, GetFeedQuery, GetFeedsQuery, UpdateFeedCommand } from "../domain/feed-interactor.js"
import type { FeedDto, FeedIdDto } from '../../data/dtos.js'

/*
TODO: include Zod
  1. validate request data and return 400 with schema validation errors if invalid
  2. use validated data to map to service models
  3. bind service response to http response with appropriate status codes
*/
export function CreateFeedMapper(req:Request<any,any,FeedDto,any>): CreateFeedCommand {
  return {
    authorId: req.user?.id, // assuming authentication middleware has set req.user
    title: req.body.title
  }
}
export function GetFeedMapper(req:Request<FeedIdDto,any,any,any>): GetFeedQuery {
  return {
    feedId: req.params.feedId
  }
}
export function GetFeedsMapper(req:Request<any,any,any,any>): GetFeedsQuery {
  return {
    // no params
  }
}

export function UpdateFeedMapper(req:Request<FeedIdDto,any,FeedDto,any>): UpdateFeedCommand {
  return {
    feedId: req.params.feedId,
    title: req.body.title
  }
}

export function DeleteFeedMapper(req:Request<FeedIdDto,any,any,any>): DeleteFeedCommand {
  return {
    feedId: req.params.feedId
  }
}
