
import { socialRouting } from '../social/social-routing.js'
import { Service } from '../common/service.js'
import { SocialDatabase } from './data/social-db.js'
import type { Request, Response } from 'express'
import { ErrorHandler } from '../common/network.js'

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

    // Catch All Unhandled Errors
    this.app.use(ErrorHandler)

    // Start Service App
    this.app.listen(port, (error:unknown)=> {
      if (error) {
        console.error('Error starting Social service: ', error)
      } else {
        console.log('Social Service is running')
      }
    })
  }
}

export default async function startSocialService(port:number): Promise<SocialService> {
  const service = new SocialService()
  await service.start(port)
  return service
}
