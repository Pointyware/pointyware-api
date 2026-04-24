import { accountRouting } from '../accounts/account-routing.js'
import { AccountDatabase } from '../accounts/data/account-database.js'
import { Service } from '../common/service.js'
import { ErrorHandler } from '../common/network.js'
import type { Pool } from 'pg'
import { AccountInteractor } from './usecases/account-interactors.js'

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
  interactor: AccountInteractor
  constructor(pool:Pool) {
    super()
    this.pool = pool
    this.database = new AccountDatabase(pool)
    this.interactor = new AccountInteractor(this.database)
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
