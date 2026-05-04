
import { socialRouting } from '../social/social-routing.js'
import { Service } from '../common/service.js'
import { SqliteSocialDatabase, type SocialDatabase } from './data/sqlite-social-database.js'
import { ErrorHandler } from '../common/network.js'

/**
 * The Social Service 
 */
export class SocialService extends Service {

  db:SocialDatabase
  constructor(database:SocialDatabase) {
    super()
    this.db = database

    // Setup API Routing
    socialRouting(this.app, this.db)
  
    // Catch All Unhandled Errors
    this.app.use(ErrorHandler)
  }

  override async start(port:number) {
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
  const prodDb = new SqliteSocialDatabase()
  const service = new SocialService(prodDb)
  await service.start(port)
  return service
}
