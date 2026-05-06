
import { type Request, type Response, Router, type Application } from 'express'
import { adapter, authenticatedAdapter, GenericResponseMapper, UnimplementedAdapter, type ResultPayload } from '../common/adapters.js'
import { CreateCommentMapper, DeleteCommentMapper, GetCommentMapper, GetFeedCommentsMapper, UpdateCommentMapper } from './adapters/comment-mappers.js'
import { CommentInteractor, CreateComment, DeleteComment, GetComment, GetFeedComments, UpdateComment } from './usecases/comment-interactors.js'
import type { SocialDatabase } from './data/sqlite-social-database.js'
import type { CommentDatabase, FeedDatabase, ReactionDatabase } from "./data/social-databases.js"
import { DeleteReaction, SetReaction } from './usecases/reaction-interactors.js'
import { DeleteReactionMapper, SetReactionMapper } from './adapters/reaction-mappers.js'
import { CreateFeedMapper, DeleteFeedMapper, GetFeedMapper, GetFeedsMapper, UpdateFeedMapper } from './adapters/feed-mappers.js'
import { CreateFeed, DeleteFeed, GetFeed, GetFeeds, UpdateFeed } from './usecases/feed-interactor.js'
import type { AnonymousUser, AuthenticatedUser } from '@/common/users.js'
import { success } from '@/common/result.js'

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
  const feedsRouter = feedsRouting(database, database)
  const commentsRouter = commentsRoouting(database)
  const reactionsRouter = reactionsRouting(database)

  app.use(feedsRouter)
  app.use(commentsRouter)
  app.use(reactionsRouter)
}

export function feedsRouting(feedDb: FeedDatabase, commentDb: CommentDatabase) {
  const router = Router()
  const feedsRoute = router.route('/feeds')
  feedsRoute
    .post(authenticatedAdapter(
      CreateFeedMapper,
      CreateFeed(feedDb)
    ))
    .get(authenticatedAdapter(
      GetFeedsMapper,
      GetFeeds(feedDb)
    ))

  const feedIdRoute = router.route('/feeds/feed-:feedId')
  feedIdRoute
    .post(authenticatedAdapter(
      CreateCommentMapper,
      CreateComment(commentDb)
    ))
    .get(authenticatedAdapter(
      GetFeedMapper,
      GetFeed(feedDb)
    ))
    .put(authenticatedAdapter(
      UpdateFeedMapper,
      UpdateFeed(feedDb)
    ))
    .delete(authenticatedAdapter(
      DeleteFeedMapper,
      DeleteFeed(feedDb)
    ))

  return router
}

function anonymousCommandHandler<Command, Model>(
  commandMapper:(req:Request)=>Command,
  adapter:(command:Command,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // pull ip/device info from request

    // TODO: use GenericResponseMapper
  }
}
function anonymousQueryHandler<Query, Model>(
  queryMapper:(req:Request)=>Query,
  adapter:(query:Query,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // pull ip/device info from request

    // TODO: use GenericResponseMapper
  }
}
function authenticatedCommandHandler<Command, Model>(
  commandMapper:
  adapter:(command:Command,user:AuthenticatedUser)=>Promise<Model>){

}
function authenticatedQueryHandler<Query, Model>(adapter:(query:Query,user:AuthenticatedUser)=>Promise<Model>) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // TODO: pull bearer token/user info
    
    // TODO: user GenericResponseMapper
  }
}


function anonymousHandler<P, Q, B, CQ, Model>(
  requestMapper:(req:Request<P, unknown, B, Q>)=>CQ,
  adapter:(cq:CQ,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request<P, unknown, B, Q>, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    const cq = requestMapper(req)
    
    // pull ip/device info from request
    const user: AnonymousUser = {
      ip: req.ip || 'NO IP'
    }
    // TODO: pull token or ip of user

    const result = adapter(cq, user)
    
    const paylooad = GenericResponseMapper(success(result))
    // TODO move from adapter function
  }
}
function authenticatedHandler<P, Q, B, CQ, Model>(
  requestMapper:(req:Request<P, unknown, B, Q>)=>CQ,
  adapter:(cq:CQ,user:AuthenticatedUser)=>Promise<Model>
) {
  return (req: Request<P, unknown, B, Q>, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    const cq = requestMapper(req)
    
    // TODO: pull bearer token/user info
    const user: AuthenticatedUser = {
      accountId: '0-0-0-0-0'
    }

    const result = adapter(cq, user)
    
    // TODO: user GenericResponseMapper
    const payload = GenericResponseMapper(success(result))
    // TODO: move from adapter function
  }
}

export function commentsRoouting(database: SocialDatabase, commentsInteractor: CommentInteractor) {
  const router = Router()
  const comments = router.route('/feeds/feed-:feedId/comments')
  comments
    .post(adapter(
      CreateCommentMapper,
      CreateComment(database)
    ))
    .get(adapter(
      GetFeedCommentsMapper,
      GetFeedComments(database)
    ))
  
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
    .post(adapter(
      CreateCommentMapper,
      CreateComment(database)
    )).get(adapter(
      GetCommentMapper,
      GetComment(database)
    )).put(adapter(
      UpdateCommentMapper,
      UpdateComment(database)
    )).delete(adapter(
      DeleteCommentMapper, 
      DeleteComment(database)
    ))
  return router
}

export function reactionsRouting(database: ReactionDatabase) {
  const router = Router()
  const reactionsRoute = router.route('/feeds/feed-:feedId/comments/comment-:commentId/reactions')
  reactionsRoute
    .put(adapter(
      SetReactionMapper,
      SetReaction(database)
    ))
    .delete(adapter(
      DeleteReactionMapper,
      DeleteReaction(database)
    ))

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