import type { AccountDatabase } from "./data/account-database.js"
import { Account } from "./entities/account.js"

/**
 * 
 */
export class AccountController {

  database:AccountDatabase
  constructor(database:AccountDatabase) {
    this.database = database
  }

  async createAccount(username:string, password:string, email?:string, phoneNumber?:string): Promise<Account> {
    const account = new Account(username, email, phoneNumber)

    try {
      this.database.createUser(username, password)
    } catch (error) {
      console.error(`Error while creating account: `, error)
      throw error
    }

    return account
  }

  /**
   * 
   */
  async login(username:string,password:string): Promise<Token> {

    return new Token()
  }

  /**
   * 
   */
  async logout(): Promise<void> {

  }
}

export class Token {

}
