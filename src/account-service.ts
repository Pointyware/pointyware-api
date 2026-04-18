
import express from 'express'
import { configureAuthRouting } from './auth/auth-routing.js'
import { AuthDatabase, authSqlPool } from './auth/data/auth-db.js'
import { AuthController } from './auth/auth-controller.js'

/**
 * 
 * @param port 
 */
export default async function startAuth(port:number) {
  const auth = express()
  const pool = await authSqlPool()
  const database = new AuthDatabase(pool)
  const controller = new AuthController(database)
  
  // Setup Auth Routing
  configureAuthRouting(auth,controller)
  
  // Start Services
  auth.listen(port, ()=> {
    console.log('Auth service is running')
  })
}
