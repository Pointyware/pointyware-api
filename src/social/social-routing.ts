

import type { Application, Request, Response } from 'express'
import { SocialController } from './social-controller.js'
import { SocialDatabase, resourcePool } from './data/social-db.js'
import type { UserIdDto, CommentDto, CommentIdDto } from '../data/dtos.js'
import { adapter as adapter } from '../common/adapter.js'
import type { UUID } from 'crypto'
import type { Comment } from './entities/comment.js'
import type { Result } from '../common/result.js'

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
function CommentListResponseMapper(result:Result<Comment[]>, res: Response) {
  if (result.success) {
    res.send(result.data)
  } else {
    if (result.error instanceof UnauthorizedError) {
      res.status(401).send({ message:"User is Unauthorized", error:result.error})
    } else if (result.error instanceof ForbiddenError) {
      res.status(403).send({ message:"User is Not Allowed to Access this Resource", error:result.error})
    } else {
      res.status(500).send({ error: result.error})
    }
  }
}

export class UnauthorizedError {
  resource:string
  constructor(resource:string) {
    this.resource = resource
  }
}
export class ForbiddenError {
  constructor() {}
}
export class UnknownError {
  constructor() {}
}

/**
 * 
 * @param app 
 */
export function socialRouting(app: Application) {
  const db = new SocialDatabase()
  const controller = new SocialController(db)

  const curriedFunction = async (query:CommentQuery) => {
    return GetComments(query,controller)
  }
  app.get('/comments/comment-:commentId', 
    adapter(GetCommentMapper, curriedFunction, CommentListResponseMapper)
  )
  app.route('/comments/comment-:commentId')
    .post(
      adapter(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .get(
      adapter(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .put(
      adapter(GetCommentMapper, curriedFunction, CommentListResponseMapper)
    )
    .delete(
      adapter(GetCommentMapper, curriedFunction, CommentListResponseMapper)
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
