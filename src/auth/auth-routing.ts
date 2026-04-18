
import express from 'express'
import { AuthController } from './auth-controller.js'
import { AuthDatabase, authSqlPool } from './data/auth-db.js'

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
  profileImage:
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
 * @param auth The authorization Express app to configure.
 */
export async function configureAuthRouting(
  auth:express.Application,
  controller: AuthController,
) {

  // Create New Account
  auth.post('/create', async (
    req: express.Request<any, any, NewUser>,
    res
  ) => {
    const query = req.query

    try {
      const account = await controller.createAccount(query.username, query.password, query.email, query.phoneNumber)

      res.send(account)
    } catch (error) {
      res.status(500).send({message:'Generic Error Occurred'})
    }
  })

  auth.post('/login', async (req, res) => {
    // 1. decode request into appropriate model
    const username = ""
    const password = ""
    
    // 2. Invoke controller/interactor
    const token = await controller.login(username, password)

    // 3. encode result into response
    res.send(token)
  })

  auth.post('/logout', (req, res) => {
    // 1. decode request into model
  })

  // TODO: add OAuth endpoints/flow

  auth.post('/auth/oauth', async (req, res) => {

  })
}
