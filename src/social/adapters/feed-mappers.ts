
import type { Request } from 'express'
import type { CreateFeedCommand, DeleteFeedCommand, GetFeedQuery, GetFeedsQuery, UpdateFeedCommand } from "../domain/feed-interactor.js"
import type { FeedDto, FeedIdDto } from '../../data/dtos.js'

export class FeedMapper {
  constructor() {

  }
}

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
