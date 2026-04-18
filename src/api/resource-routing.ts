

import express from 'express'
import { ApiController } from './resource-controller.js'
import { ResourceDb, resourcePool } from './data/resource-db.js'

interface CommentsParams {
  userId:string
}

export function configureCommentsRouting(api: express.Application) {
  const pool = resourcePool();
  // TODO: swap with pool interface
  const db = new ResourceDb()
  const controller = new ApiController(db)

  api.get('/comments/:userId', async (
    req: express.Request<CommentsParams, any, any, any>, 
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

export function configureProfileRouting(api: express.Application) {
  api.post('/profile', async (req, res)=>{
    
  })
  api.get('/profile', async (req, res)=>{
      
  })
  api.put('/profile/:userId', async (req, res)=>{
      
  })
  api.delete('/profile/:userId', async (req, res)=>{
      
  })
}
