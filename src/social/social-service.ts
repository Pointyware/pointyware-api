
import { socialRouting } from '../social/social-routing.js'
import { Service } from '../common/service.js'
import { SocialDatabase } from './data/social-db.js'
import type { Request, Response } from 'express'

/**
 * The Social Service 
 */
export class SocialService extends Service {

  db:SocialDatabase
  constructor() {
    super()
    this.db = new SocialDatabase()
  }

  override async start(port:number) {
    // Setup API Routing
    socialRouting(this.app, this.db)

    this.app.use((error:unknown,req:Request,res:Response,next:()=>void)=> {
      // Report error for debugging and log aggregation, but do not disclose details to users for security
      console.error('Uncaught Error: ', error)
      res.status(500).send({message:'Internal Server Error - Cannot Disclose Details'})
      next()
    })

    // Start Service App
    this.app.listen(port, ()=> {
      console.log('Social Service is running')
    })
  }
}

export default function startSocialService(port:number): SocialService {
  const service = new SocialService()
  service.start(port)
  return service
}
