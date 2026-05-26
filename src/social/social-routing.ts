
import { Router, type Application } from 'express'
import { UnimplementedAdapter } from '../common/adapters.js'
import { CreateCommentMapper, GetCommentMapper } from './adapters/comment-mappers.js'
import { CommentInteractor, FeedInteractor } from './usecases/comment-interactors.js'
import { authenticatedHandler } from './network/handlers.mjs'
import { CreateFeedMapper } from './adapters/feed-mappers.js'
import type { GroupInteractor } from './usecases/group-interactor.js'
import { CreateGroupCommandMapper } from './adapters/group-mappers.js'

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
export function socialRouting(app: Application,
  feedInteractor: FeedInteractor,
  commentInteractor: CommentInteractor,
  groupInteractor: GroupInteractor
) {
  const feedsRouter = getFeedsRouter(feedInteractor)
  const commentsRouter = getCommentsRouter(commentInteractor)
  const reactionsRouter = getReactionsRouter()

  const groupsRouter = getGroupsRouter(groupInteractor)
  
  app.use(feedsRouter)
  app.use(commentsRouter)
  app.use(reactionsRouter)
  app.use(groupsRouter)
  app.use(getTaskRouter())
  app.use(getKitchenRouter())
}

export function getFeedsRouter(feedsInteractor: FeedInteractor) {
  const router = Router()
  const feedsRoute = router.route('/feeds')
  feedsRoute
    .post(authenticatedHandler(
      CreateFeedMapper,
      feedsInteractor.create
    ))
    // .post(authenticatedAdapter(
    //   CreateFeedMapper,
    //   CreateFeed(feedDb)
    // ))
    // .get(authenticatedAdapter(
    //   GetFeedsMapper,
    //   GetFeeds(feedDb)
    // ))

  const feedIdRoute = router.route('/feeds/:feedId')
  feedIdRoute
    // .post(authenticatedAdapter(
    //   CreateCommentMapper,
    //   CreateComment(commentDb)
    // ))
    // .get(authenticatedAdapter(
    //   GetFeedMapper,
    //   GetFeed(feedDb)
    // ))
    // .put(authenticatedAdapter(
    //   UpdateFeedMapper,
    //   UpdateFeed(feedDb)
    // ))
    // .delete(authenticatedAdapter(
    //   DeleteFeedMapper,
    //   DeleteFeed(feedDb)
    // ))

  return router
}

export function getCommentsRouter(commentsInteractor: CommentInteractor) {
  const router = Router()
  const comments = router.route('/feeds/:feedId/comments')
  comments
    .post(authenticatedHandler(
      CreateCommentMapper,
      commentsInteractor.create
    ))
    .get(authenticatedHandler(
      GetCommentMapper,
      commentsInteractor.get
    ))
  
  const commentIdRoute = router.route('/feeds/:feedId/comments/:commentId')
  commentIdRoute
    // .post(adapter(
    //   CreateCommentMapper,
    //   CreateComment(database)
    // )).get(adapter(
    //   GetCommentMapper,
    //   GetComment(database)
    // )).put(adapter(
    //   UpdateCommentMapper,
    //   UpdateComment(database)
    // )).delete(adapter(
    //   DeleteCommentMapper, 
    //   DeleteComment(database)
    // ))
  return router
}

export function getReactionsRouter() {
  const router = Router()
  const reactionsRoute = router.route('/feeds/:feedId/comments/:commentId/reactions')
  reactionsRoute
    // .put(adapter(
    //   SetReactionMapper,
    //   SetReaction(database)
    // ))
    // .delete(adapter(
    //   DeleteReactionMapper,
    //   DeleteReaction(database)
    // ))

  return router
}

export function getGroupsRouter(groupInteractor: GroupInteractor) {
  const groupRouter = Router()
  
  groupRouter.route('/groups')
    .post(authenticatedHandler(
      CreateGroupCommandMapper,
      groupInteractor.createGroup
    ))

  groupRouter.route('/groups/:groupId')
  groupRouter.route('/groups/:groupId/members')
  groupRouter.route('/groups/:groupId/members/:memberId')

  return groupRouter
}

export function getTaskRouter() {
  const taskRouter = Router()

  // - /tasks
  // - /tasks/taskId
  taskRouter.route('/groups/:groupId/lists')

  taskRouter.route('/group/:groupId/lists/:listId')
    .post(UnimplementedAdapter)
    .get(UnimplementedAdapter)
    .put(UnimplementedAdapter)
    .delete(UnimplementedAdapter)

  return taskRouter
}

export function getKitchenRouter() {
  const kitchenRouter = Router()

  // - /recipes
  // - /recipes

  return kitchenRouter
}
