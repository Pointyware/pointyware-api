import { accountRouting } from './auth/auth-routing.js'
import { AuthDatabase, authSqlPool } from './auth/data/auth-db.js'
import { AuthController } from './auth/auth-controller.js'
import { Service } from './service.js'

/**
 * The Account Service manages all user account information, which includes
 * basic authentication, as well as enterprise-wide settings like profile
 * information and privacy settings.
 * 
 * Resource servers use this service to perform authorization via provided
 * credentials.
 * 
 * The `AccountService` object encapsulates all information relevant to the
 * lifecycle of the service.
 */
export class AccountService extends Service {
  constructor() {
    super()
  }

  override async start(port:number) {
    const pool = await authSqlPool()
    const database = new AuthDatabase(pool)
    const controller = new AuthController(database)

    // Setup Auth Routing
    accountRouting(this.app,controller)

    // Start Service App
    this.app.listen(port, ()=> {
      console.log('Auth service is running')
    })
  }
}

/**
 * Creates and returns an {@link AccountService} while it's starting
 * on the given port.
 * @param port 
 */
export default function startAccountService(port:number): AccountService {
  const service = new AccountService()
  service.start(port)
  return service
}
