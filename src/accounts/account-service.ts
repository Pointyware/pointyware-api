import { accountRouting } from '../accounts/account-routing.js'
import { AccountDatabase, authSqlPool } from '../accounts/data/account-database.js'
import { AccountController } from '../accounts/account-controller.js'
import { Service } from '../common/service.js'
import { ErrorHandler } from '../common/network.js'
import type { Pool } from 'pg'

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
  pool: Pool
  database: AccountDatabase
  controller: AccountController
  constructor(pool:Pool) {
    super()
    this.pool = pool
    this.database = new AccountDatabase(pool)
    this.controller = new AccountController(this.database)
  }

  override async start(port:number) {
    // Setup Auth Routing
    accountRouting(this.app,this.database)

    // Catch All Unhandled Errors
    this.app.use(ErrorHandler)

    // Start Service App
    this.app.listen(port, (error:unknown)=> {
      if (error) {
        console.error('Error starting Auth service: ', error)
      } else {
        console.log('Auth service is running')
      }
    })
  }
}

/**
 * Creates and returns an {@link AccountService} while it's starting
 * on the given port.
 * @param port 
 * @param pool 
 */
export default async function startAccountService(port:number,pool:Pool): Promise<AccountService> {
  const service = new AccountService(pool)
  await service.start(port)
  return service
}
