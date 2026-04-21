

import { Router, type Application, type Request, type Response } from 'express'
import { SocialController } from './social-controller.js'
import { adapter, GenericResponseMapper } from '../common/adapter.js'
import { CreateCommentMapper, DeleteCommentMapper, GetCommentMapper, GetUserCommentsMapper, UpdateCommentMapper } from './adapters/comments.js'
import { CreateComment, DeleteComment, GetComments, GetUserComments, UpdateComment } from './domain/comments.js'

/**
 * What is the single responsibility of a router?
 * To route of course!
 * Route what?
 * Incoming requests to their appropriate logic controller and return an appropriate response.
 * Don't we have to map the request data into the controller models?
 * Yes, we usually do that in the routing code.
 * Isn't that 
 * @param app 
 */
export function socialRouting(app: Application, controller: SocialController) {
  app.route('/feeds/feed-:feedId/comments')
    .post(// marshall data       , pass to business layer   , marshall data back to response
      adapter(CreateCommentMapper, CreateComment(controller), GenericResponseMapper)
    )
  const route = app.route('/feeds/feed-:feedId')

  app.route('/feeds/feed-:feedId/comments/comment-:commentId')
  app.get('/comments/user-:userId',
    adapter(
      GetUserCommentsMapper,
      GetUserComments(controller)
    )
  )
  // TODO: split into separate functions for comments and reactions routing
  const router = Router()
  const feedsRoute = router.route('/feeds')
  const feedIdRoute = router.route('/feeds/feed-:feedId')
  const comments = router.route('/feeds/feed-:feedId/comments')
  const commentIdRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId')
  const reactionsRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId/reactions')

  feedsRoute
    .post()
    .get()
  
  feedIdRoute
    .post(adapter(
      FeedIdCreateCommentMapper,
      CreateComment(controller)
    ))
    .get(adapter(
      GetFeedQueryMapper,
      GetFeed(controller)
    ))
    .put(adapter(
      UpdateFeedCommandMapper,
      UpdateFeed(controller)
    ))
    .delete(adapter(
      RemoveFeedCommandMapper,
      RemoveComment(controller)
    ))

  comments
    .post()
    .get()

  commentIdRoute
    .post(adapter(
      CreateCommentMapper,
      CreateComment(controller)
    )).get(adapter(
      GetCommentMapper, 
      GetComments(controller)
    )).put(adapter(
      UpdateCommentMapper,
      UpdateComment(controller)
    )).delete(adapter(
      DeleteCommentMapper, 
      DeleteComment(controller)
    ))
  
  reactionsRoute
    .put((
      req: Request,
      res: Response
    ) => {
      
    })

  app.use(router)
}

export function commentsRoouting(app: Application, controller: SocialController) {

}

export function reactionsRouting(app: Application, controller: SocialController) {
  const router = Router()
  return Router()
  .route('')
  .get(async (
    req: Request,
    res: Response
  )=>{

  }).post(async (
    req: Request,
    res: Response
  )=>{

  }).put(async (
    req: Request,
    res: Response
  )=>{

  })
}
