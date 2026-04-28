
import express from 'express'
import type { AccountDatabase } from './data/account-database.js'
import { CreateAccount, DeleteAccount, GetAccount, Login, Logout, UpdateAccount } from './usecases/account-interactors.js'
import { CreateAccountCommandMapper, DeleteAccountCommandMapper, GetAccountCommandMapper, LoginCommandMapper, LogoutCommandMapper, UpdateAccountCommandMapper } from './adapters/account.js'
import { adapter, UnimplementedAdapter } from '../common/adapter.js'

/**
 * TODO: rename to Router and refactor to use express.Router() objects
 * @param app The authorization Express app to configure.
 */
export function accountRouting(
  app:express.Application,
  accountDatabase: AccountDatabase
) {

  app.post('/login', adapter(
    LoginCommandMapper,
    Login(accountDatabase)
  ))

  app.post('/logout', adapter(
    LogoutCommandMapper,
    Logout(accountDatabase)
  ))

  // TODO: add OAuth endpoints/flow

  app
    .post('/auth/oauth', UnimplementedAdapter)

  app
    .route('/account')
    .post(adapter(
      CreateAccountCommandMapper,
      CreateAccount(accountDatabase)
    ))
  app
    .route('/account/:userId')
    .get(adapter(
      GetAccountCommandMapper,
      GetAccount(accountDatabase)
    ))
    .put(adapter(
      UpdateAccountCommandMapper,
      UpdateAccount(accountDatabase)
    ))
    .delete(adapter(
      DeleteAccountCommandMapper,
      DeleteAccount(accountDatabase)
    ))
}
