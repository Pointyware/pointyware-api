
import express from 'express'
import type { AccountDb } from './data/account-database.js'
import { CreateAccount, DeleteAccount, GetAccount, Login, Logout, UpdateAccount } from './usecases/account-interactors.js'
import { CreateAccountCommandMapper, DeleteAccountCommandMapper, GetAccountCommandMapper, LoginCommandMapper, LogoutCommandMapper, UpdateAccountCommandMapper } from './adapters/account.js'
import { adapter, AuthResponseMapper, standardErrorMapper, UnimplementedAdapter, type ResultPayload } from '../common/adapters.js'
import type { Token } from './domain/token.js'
import type { Result } from '@/common/result.js'
import type { Account } from './domain/account.js'

/**
 * TODO: rename to Router and refactor to use express.Router() objects
 * @param app The authorization Express app to configure.
 */
export function accountRouting(
  app:express.Application,
  accountDatabase: AccountDb
) {

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  
  app.post('/login', 
    adapter(
    LoginCommandMapper,
    Login(accountDatabase),
    AuthResponseMapper
  ))

  app.post('/logout', adapter(
    LogoutCommandMapper,
    Logout(accountDatabase)
  ))

  // TODO: add OAuth endpoints/flow

  app
    .post('/auth/oauth', UnimplementedAdapter)

  const accountRoute = app.route('/account')
  accountRoute
    .post(
      adapter(
      CreateAccountCommandMapper,
      CreateAccount(accountDatabase),
      AccountCreatedResponseMapper
    ))
  app.route('/account/:userId')
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

function AccountCreatedResponseMapper(result:Result<Account>): ResultPayload<Account> {
  if (result.success) {
    return { body: result.data, status: 201 }
  } else {
    return standardErrorMapper(result.error)
  }
}
