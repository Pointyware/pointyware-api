import { randomUUID, type UUID } from "node:crypto";
import { Account, type AccountAuth } from "../domain/account.js";
import { Token } from "../domain/token.js";
import { type AccountDb } from "./account-database.js";

export class TestAccountDatabase implements AccountDb {
  async createAccount(username: string, password: string): Promise<Account> {
    return new Account(username, randomUUID())
  }
  async readAccount(userId: UUID): Promise<Account> {
    return new Account('username', userId)
  }
  async findAccount(username: string): Promise<AccountAuth> {
    return {
      userId: randomUUID(),
      passHash: 'someHash'
    }
  }
  async updateAccount(id: UUID, username?: string, password?: string): Promise<Account> {
    return new Account(username ?? 'username', id)
  }
  async deleteAccount(id: string): Promise<void> {
    return
  }
  async createSession(userId: UUID, deviceInfo: string): Promise<Token> {
    const twoDaysInSeconds = 48 * 3600
    return new Token(
      randomUUID(), new Date(Date.now() + twoDaysInSeconds)
    )
  }
  async deleteSession(key: string): Promise<void> {
    return
  }
}
