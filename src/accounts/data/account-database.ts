
import pg from "pg"
import { PgFacade } from "@/data/pg-facade.js"
import type { UUID } from "crypto"
import { Account } from "../domain/account.js"
import { Token } from "../domain/token.js"

export interface AccountDb {
  createAccount(username:string,password:string): Promise<Account>
  readAccount(userId:UUID): Promise<Account>
  updateAccount(id:UUID,username?:string,password?:string): Promise<Account>
  deleteAccount(id:string): Promise<void>

  createSession(userId:UUID, deviceInfo:string): Promise<Token>
  deleteSession(key:string): Promise<void>
}

/**
 * TODO: consider renaming to UserDatabase since it is meant to handle both
 * public and private facets of user information. Consider defining separate database classes for public and private information to better ensure sanitation
 * of private information and to better separate concerns.
 */
export class AccountDatabase implements AccountDb {
  
  /**
   * The Postgres database connection.
  */
  private pool:pg.Pool
  constructor(pool:pg.Pool) {
    this.pool = pool
  }
  
  async createAccount(username:string,password:string): Promise<Account> {
    // TODO: create user in database and return created user
    
    return new Account(username) // TODO: default image color should be randomly generated
  }
  
  async readAccount(userId:UUID): Promise<Account> {
    // TODO: read user from database and return user
    return new Account('testAccount') // TODO: default image color should be randomly generated
  }
  
  async updateAccount(id:UUID,name?:string): Promise<Account> {
    // TODO: update user in database and return updated user
    
    return new Account(name ?? 'testAccount') // TODO: default image color should be randomly generated
  }
  
  async deleteAccount(id:string) {
    // TODO: remove user from database
  }

  async createSession(userId:UUID, deviceInfo:string): Promise<Token> {
    // TODO: create session token in database and return token
    return new Token('testToken',new Date(Date.now() + 3600 * 1000))
  }

  async deleteSession(key:string) {
    // TODO: delete session token from database
  }
}

export async function authSqlPool(): Promise<pg.Pool> {
  const pool = PgFacade.getPool(
    'pointyware-api',
    'authUser','authPass','localhost',5001,'auth'
  )
  return pool
}

export class TestAccountDatabase implements AccountDb {
  createAccount(username: string, password: string): Promise<Account> {
    throw new Error("Method not implemented.")
  }
  readAccount(userId: UUID): Promise<Account> {
    throw new Error("Method not implemented.")
  }
  updateAccount(id: UUID, username?: string, password?: string): Promise<Account> {
    throw new Error("Method not implemented.")
  }
  deleteAccount(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  createSession(userId: UUID, deviceInfo: string): Promise<Token> {
    throw new Error("Method not implemented.")
  }
  deleteSession(key: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
