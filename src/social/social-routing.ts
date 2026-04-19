

import type { Application, Request, Response } from 'express'
import { SocialController } from './social-controller.js'
import { SocialDatabase, resourcePool } from './data/social-db.js'
import type { UserIdDto, CommentDto, CommentIdDto } from '../data/dtos.js'
import { handle } from '../common/adapter.js'
import type { UUID } from 'crypto'
import type { Comment } from './entities/comment.js'

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
export function commentsRouting(app: Application) {
  app.get('/feeds', async (
    req: Request<any>,
    res
  )=> {
  })
}

interface CommentQuery {
  id:UUID
}
function GetCommentMapper(req:Request<CommentIdDto,any,any,any>): CommentQuery {
  return {
    id: req.params.commentId
  }
}
async function GetComments(query:CommentQuery,controller: SocialController): Promise<Comment[]> {
return await controller.getComments(query.id)
}
function CommentListResponseMapper(comments: Comment[], res: Response) {
  
}


/**
 * 
 * @param app 
 */
export function socialRouting(app: Application) {
  const pool = resourcePool();
  // TODO: swap with pool interface
  const db = new SocialDatabase()
  const controller = new SocialController(db)

  const curriedFunction = async (query:CommentQuery) => {
    return GetComments(query,controller)
  }
  app.get('/comments/comment-:commentId', 
    handle(GetCommentMapper, curriedFunction, CommentListResponseMapper)
  )
  app.route('/comments/comment-:commentId')
    .post(
      handle(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .get(
      handle(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .put(
      handle(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .delete(
      handle(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )

  app.post('/comments/comment-:commentId', async(
    req: Request<CommentIdDto, any, CommentDto, any>,
    res
  )=>{
    // 1. marshall data from request
    const params = req.body

    // 2. pass request data to business layer
    try {
      const comment = await controller.createComment(params.content)

      // 3a. marshall data back to user in response
      res.status(201).send(comment)
    } catch (error) {
      // 3b. report error back to user in response
      res.status(500).send()
    }
  })

  app.get('/comments/user-:userId', async (
    req: Request<UserIdDto, any, any, any>, 
    res
  )=>{
    // 1. marshall data from request
    const params = req.params
    console.info('Greeting User: ', params)

    // 2. pass request data to business layer
    try {
      const comments = await controller.getComments(params.userId)

      // 3. marshall data back to user in response
      const response = comments.flatMap((value, index)=> {
        value.text
      })
      res.send(response)
    } catch (error) {
      // 3. notify user of error
      res.status(500).send('Generic Error')
    }
  })
}
