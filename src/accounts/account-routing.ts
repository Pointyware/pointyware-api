
import express from 'express'
import type { AccountDatabase } from './data/account-database.js'
import { CreateAccount, GetAccount, Login, Logout, UpdateAccount } from './domain/accounts.js'
import { CreateAccountCommandMapper, GetAccountCommandMapper, LoginCommandMapper, LogoutCommandMapper } from './adapters/account.js'
import { adapter } from '../common/adapter.js'

/**
 * TODO: rename to Router and refactor to use express.Router() objects
 * @param app The authorization Express app to configure.
 */
export function accountRouting(
  app:express.Application,
  accountDatabase: AccountDatabase
) {

  // Create New Account
  
  app.post('/account/', adapter(
    CreateAccountMapper,
    CreateAccount(accountDatabase)
  ))

  app.post('/login', async (req, res) => {
    // 1. decode request into appropriate model
    const username = ""
    const password = ""
    
    // 2. Invoke controller/interactor
    const token = await controller.login(username, password)

    // 3. encode result into response
    res.send(token)
  })
  app.post('/login', adapter(
    LoginCommandMapper,
    Login(accountDatabase)
  ))

  app.post('/logout', adapter(
    LogoutCommandMapper,
    Logout(accountDatabase)
  ))

  // TODO: add OAuth endpoints/flow

  app.post('/auth/oauth', async (req, res) => {

  })

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
      UpdateAccount,
      UpdateAccount(accountDatabase)
    ))
    .delete(adapter(
      DeleteAccountCommandMapper,
      DeleteAccount(accountDatabase)
    ))
}
