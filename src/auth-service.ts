
import express from 'express'
import { configureAuthRouting } from './auth/routing.js'

/**
 * 
 * @param port 
 */
export default function startAuth(port:number) {
  const auth = express()
  
  // Setup Auth Routing
  configureAuthRouting(auth)
  
  // Start Services
  auth.listen(port, ()=> {
    console.log('Auth service is running')
  })
}
