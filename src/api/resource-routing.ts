

import express from 'express'
import { ApiController } from './resource-controller.js'
import { ResourceDb, resourcePool } from './data/resource-db.js'

interface UserParams {
  userId:string
}

interface UserInfo {
  email?:string
  phoneNumber?:string
}

export function configureCommentsRouting(api: express.Application) {
  const pool = resourcePool();
  // TODO: swap with pool interface
  const db = new ResourceDb()
  const controller = new ApiController(db)

  api.get('/comments/:userId', async (
    req: express.Request<UserParams, any, any, any>, 
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
  api.post('/profile', async (
    req: express.Request<any, any, NewUser, any>, 
    res
  )=>{
    console.info('Creating new user: ', )
  })
  api.get('/profile:userId', async (
    req: express.Request<UserParams, any, any, any>, 
    res
  )=>{
      
  })
  api.put('/profile/:userId', async (
    req: express.Request<UserParams, any, UserInfo, any>,
    res
  )=>{
      
  })
  api.delete('/profile/:userId', async (
    req: express.Request<UserParams, any, any, any>, 
    res
  )=>{
      
  })
}
