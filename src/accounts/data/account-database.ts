
import pg from "pg"
import { PgFacade } from "@/data/pg-facade.js"
import type { UUID } from "crypto"
import { Account, DefaultImage } from "../entities/account.js"

/**
 * TODO: consider renaming to UserDatabase since it is meant to handle both
 * public and private facets of user information. Consider defining separate database classes for public and private information to better ensure sanitation
 * of private information and to better separate concerns.
 */
export class AccountDatabase {

  /**
   * The Postgres database connection.
   */
  private pool:pg.Pool
  constructor(pool:pg.Pool) {
    this.pool = pool
  }
  
  async createAccount(name:string,password:string): Promise<Account> {
    // TODO: create user in database and return created user

    return new Account(name, new DefaultImage('blue')) // TODO: default image color should be randomly generated
  }

  async readAccount(userId:UUID): Promise<Account> {
    // TODO: read user from database and return user
    return new Account('testAccount', new DefaultImage('blue')) // TODO: default image color should be randomly generated
  }

  async updateAccount(id:UUID,name?:string): Promise<Account> {
    // TODO: update user in database and return updated user

    return new Account(name ?? 'testAccount', new DefaultImage('blue')) // TODO: default image color should be randomly generated
  }

  async removeAccount(id:string) {
    // TODO: remove user from database


  }
}

export async function authSqlPool(): Promise<pg.Pool> {
  const pool = PgFacade.getPool(
    'pointyware-api',
    'authUser','authPass','localhost',5001,'auth'
  )
  return pool
}
