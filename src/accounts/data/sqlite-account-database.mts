import type { UUID } from "node:crypto";
import type { Account, AccountAuth } from "../domain/account.js";
import type { AccountDb } from "./account-database.js";
import type { Token } from "../domain/token.js";

export class SqliteAccountDatabase implements AccountDb {
  
  createAccount(username: string, password: string): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  readAccount(userId: UUID): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  findAccount(username: string): Promise<AccountAuth> {
    throw new Error("Method not implemented.");
  }
  updateAccount(id: UUID, username?: string, password?: string): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createSession(userId: UUID, deviceInfo: string): Promise<Token> {
    throw new Error("Method not implemented.");
  }
  deleteSession(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
