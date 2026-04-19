
import express from 'express'
import { AuthController } from './auth-controller.js'
import type { UserIdDto } from '../data/dtos.js'

/**
 * Information for creating a new user.
 */
interface NewUser {
  username:string
  password:string
  email?:string
  phoneNumber?:string
}

/**
 * Publicly accessible information about a user.
 */
interface UserInfo {
  username:string
  profileImage:ProfileImage
}

interface ProfileImage {
  getImage(): ImageBitmap
}
interface DefaultImage extends ProfileImage {
  color:string
}
interface UrlImage extends ProfileImage {
  url:URL
}


/**
 * 
 * @param app The authorization Express app to configure.
 */
export function accountRouting(
  app:express.Application,
  controller: AuthController,
) {

  // Create New Account
  app.post('/account/', async (
    req: express.Request<any, any, NewUser>,
    res
  ) => {
    const body = req.body

    try {
      const account = await controller.createAccount(body.username, body.password, body.email, body.phoneNumber)

      res.send(account)
    } catch (error) {
      res.status(500).send({message:'Generic Error Occurred'})
    }
  })

  app.post('/login', async (req, res) => {
    // 1. decode request into appropriate model
    const username = ""
    const password = ""
    
    // 2. Invoke controller/interactor
    const token = await controller.login(username, password)

    // 3. encode result into response
    res.send(token)
  })

  app.post('/logout', (req, res) => {
    // 1. decode request into model
  })

  // TODO: add OAuth endpoints/flow

  app.post('/auth/oauth', async (req, res) => {

  })

  app.post('/account', async (
    req: express.Request<any, any, NewUser, any>, 
    res
  )=>{
    console.info('Creating new user: ', req.body)
    res.send('Ok')
  })
  app.get('/account:userId', async (
    req: express.Request<UserIdDto, any, any, any>, 
    res
  )=>{
    console.info('Getting user: ', req.params)
    res.send('Ok')
  })
  app.put('/account/:userId', async (
    req: express.Request<UserIdDto, any, UserInfo, any>,
    res
  )=>{
    console.info('Updating user: ', req.params)
    res.send('Ok')
  })
  app.delete('/account/:userId', async (
    req: express.Request<UserIdDto, any, any, any>, 
    res
  )=>{
    console.info('Deleting user: ', req.params)
    res.send('Ok')
  })
}
