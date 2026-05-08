
import { Router, type Application } from 'express'
import { UnimplementedAdapter } from '../common/adapters.js'
import { CreateCommentMapper, GetCommentMapper } from './adapters/comment-mappers.js'
import { CommentInteractor } from './usecases/comment-interactors.js'
import { authenticatedHandler } from './network/handlers.mjs'

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
export function socialRouting(app: Application, interactor: CommentInteractor) {
  const feedsRouter = getFeedsRouter()
  const commentsRouter = getCommentsRouter(interactor)
  const reactionsRouter = getReactionsRouter()

  app.use(feedsRouter)
  app.use(commentsRouter)
  app.use(reactionsRouter)
}

export function getFeedsRouter() {
  const router = Router()
  const feedsRoute = router.route('/feeds')
  feedsRoute
    // .post(authenticatedAdapter(
    //   CreateFeedMapper,
    //   CreateFeed(feedDb)
    // ))
    // .get(authenticatedAdapter(
    //   GetFeedsMapper,
    //   GetFeeds(feedDb)
    // ))

  const feedIdRoute = router.route('/feeds/feed-:feedId')
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
  const comments = router.route('/feeds/feed-:feedId/comments')
  comments
    .post(authenticatedHandler(
      CreateCommentMapper,
      commentsInteractor.create
    ))
    .get(authenticatedHandler(
      GetCommentMapper,
      commentsInteractor.get
    ))
  
  const commentIdRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId')
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
  const reactionsRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId/reactions')
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


/*
GLOBAL SCOPE

tasks: Map[Id, Task]
tasks: Collection/Set[Task]
/tasks

type Task {
  someProperty: ReturnType
  /tasks/task-id/someProperty

  someFunction(arg1,arg2) {
  }
  /tasks/task-id/someFunction?arg1=val1&arg2=val2
}


*/

export function taskRouting(app:Application) {
  const taskRouter = Router()

  // - /tasks
  // - /tasks/taskId
  // 
  taskRouter
    .route('/tasks')
    .post(UnimplementedAdapter)
    .get(UnimplementedAdapter)
    .put(UnimplementedAdapter)
    .delete(UnimplementedAdapter)
  taskRouter
    .route('/tasks/')
  taskRouter
    .route('/tasks/')
  

  return taskRouter
}
export function recipesRouting(app:Application) {
  const recipesRouter = Router()

  // - /recipes
  // - /recipes
  // 

  return recipesRouter
}