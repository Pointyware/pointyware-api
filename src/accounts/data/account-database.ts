
import pg from "pg"
import { PgFacade } from "../../data/pg-facade.js"

/**
 * 
 */
export class AccountDatabase {

  /**
   * The Postgres database connection.
   */
  private pool:pg.Pool
  constructor(pool:pg.Pool) {
    this.pool = pool
  }
  
  createUser(name:string,password:string) {

  }

  getUser(name?:string,email?:string) {

  }

  updateUser(id:string,name?:string,email?:string) {

  }

  removeUser(id:string) {

  }
}

export async function authSqlPool(): Promise<pg.Pool> {
  const pool = PgFacade.getPool(
    'pointyware-api',
    'authUser','authPass','localhost',5001,'auth'
  )
  return pool
}
