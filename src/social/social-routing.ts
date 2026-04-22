
import { Router, type Application, type Request, type Response } from 'express'
import { adapter, GenericResponseMapper } from '../common/adapter.js'
import { CreateCommentMapper, DeleteCommentMapper, GetCommentMapper, GetUserCommentsMapper, UpdateCommentMapper } from './adapters/comments.js'
import { CreateComment, DeleteComment, GetComments, GetUserComments, UpdateComment } from './domain/comment-interactors.js'
import type { SocialDatabase } from './data/social-db.js'

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
export function socialRouting(app: Application, database: SocialDatabase) {
  app.route('/feeds/feed-:feedId/comments')
    .post(// marshall data       , pass to business layer   , marshall data back to response
      adapter(CreateCommentMapper, CreateComment(database), GenericResponseMapper)
    )
  const route = app.route('/feeds/feed-:feedId')

  app.route('/feeds/feed-:feedId/comments/comment-:commentId')
  app.get('/comments/user-:userId',
    adapter(
      GetUserCommentsMapper,
      GetUserComments(database)
    )
  )
  // TODO: split into separate functions for comments and reactions routing

  const feedsRouter = feedsRouting(app)
  const commentsRouter = commentsRoouting(app, database)
  const reactionsRouter = reactionsRouting(app)

  app.use(feedsRouter)
  app.use(commentsRouter)
  app.use(reactionsRouter)

  app.use(router)
}

export function feedsRouting(app: Application) {
  const router = Router()
  const feedsRoute = router.route('/feeds')
  const feedIdRoute = router.route('/feeds/feed-:feedId')
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

    return router
}

export function commentsRoouting(app: Application, database: SocialDatabase) {
  const router = Router()
  const comments = router.route('/feeds/feed-:feedId/comments')
  const commentIdRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId')
  comments
    .post()
    .get()

  commentIdRoute
    .post(adapter(
      CreateCommentMapper,
      CreateComment(database)
    )).get(adapter(
      GetCommentMapper, 
      GetComments(database)
    )).put(adapter(
      UpdateCommentMapper,
      UpdateComment(database)
    )).delete(adapter(
      DeleteCommentMapper, 
      DeleteComment(database)
    ))
    return router
}

export function reactionsRouting(app: Application) {
  const router = Router()
  const reactionsRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId/reactions')
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
  reactionsRoute
    .put((
      req: Request,
      res: Response
    ) => {
      
    })

  return router
}
