import type { UUID } from "node:crypto";
import type { Account } from "../domain/account.js";
import type { Token } from "../domain/token.js";
import { type AccountDb } from "./account-database.js";

export class TestAccountDatabase implements AccountDb {
  createAccount(username: string, password: string): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  readAccount(userId: UUID): Promise<Account> {
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
