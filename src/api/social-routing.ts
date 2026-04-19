

import type { Application, Request } from 'express'
import { SocialController } from './social-controller.js'
import { ResourceDb, resourcePool } from './data/resource-db.js'
import type { UserIdDto, CommentDto } from '../data/dtos.js'

interface UserInfo {
  email?:string
  phoneNumber?:string
}

/**
 * 
 * @param app 
 */
export function socialRouting(app: Application) {
  const pool = resourcePool();
  // TODO: swap with pool interface
  const db = new ResourceDb()
  const controller = new SocialController(db)

  app.get('/comments/comment-:commentId', async(
    req: Request<CommentDto, any, any, any>,
    res
  )=>{
    // 1. marshall data from request
    const params = req.body

    // 2. pass request data to business layer
    try {
      const comment = await controller.createComment(params.content)

      // 3a. marshall data back to user in response
      res.send(comment)
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
