import { accountRouting } from '../accounts/account-routing.js'
import { AccountDatabase, authSqlPool } from '../accounts/data/account-database.js'
import { AccountController } from '../accounts/account-controller.js'
import { Service } from '../common/service.js'

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
    const database = new AccountDatabase(pool)
    const controller = new AccountController(database)

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
