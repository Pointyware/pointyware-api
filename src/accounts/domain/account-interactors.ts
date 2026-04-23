import type { UUID } from "crypto";
import { Account, type ProfileImage } from "../entities/account.js";
import type { AccountDatabase } from "../data/account-database.js";
import { Token } from "../entities/token.js";

export interface UserQuery {
  userId:UUID
}
export interface GetAccountCommand { // FIXME: reconcile with UserQuery
  accountId:UUID
}
export interface DeleteAccountCommand {
  accountId:UUID
}

export type UserId = UUID
export interface UserHandle {
  userId:UserId
}
/**
 * Publicly accessible information about a user.
 */
interface UserInfo {
  username:string
  image:ProfileImage
}
interface ContactInfo {
  email?:string
  phoneNumber?:string
}

export interface NewUser {
  username:string
  email?:string
  phoneNumber?:string
}
export type EditUser = NewUser & UserHandle

export interface CreateAccountCommand { //FIXME: reconcile with NewUser
  username:string
  password:string
}
export interface LoginCommand {
  username:string
  password:string
}
export interface LogoutCommand {
  tokenId:UUID
}

export function CreateAccount(database:AccountDatabase): (command:CreateAccountCommand)=>Promise<Account> {
  return async function(command:CreateAccountCommand): Promise<Account> {
    return database.createAccount(command.username, command.password)
  }
}

export function GetAccount(database:AccountDatabase): (command:GetAccountCommand)=>Promise<Account> {
  return async function(command:GetAccountCommand): Promise<Account> {
    return database.readAccount(command.accountId)
  }
}

export function UpdateAccount(database:AccountDatabase): (command:EditUser) => Promise<Account> {
  return async function(command:EditUser): Promise<Account> {
    return database.updateAccount(command.userId, command.username)
  }
}

export function DeleteAccount(database:AccountDatabase): (command:DeleteAccountCommand) => Promise<void> {
  return async function(command:DeleteAccountCommand): Promise<void> {
    await database.deleteAccount(command.accountId)
  }
}

export function Login(database:AccountDatabase): (command:LoginCommand)=>Promise<Account> {
  return async function(command:LoginCommand): Promise<Account> {
    // TODO: Implement login logic
    return database.readAccount('') // TODO: read account by username, not id
  }
}

export function Logout(database:AccountDatabase): (command:LogoutCommand) => Promise<void> {
  return async function(command:LogoutCommand): Promise<void> {
    // TODO: remove session or token associated with user
    
  }
}

export class AccountInteractor {
  database: AccountDatabase
  constructor(database: AccountDatabase) {
    this.database = database
  }

  createAccount(command: CreateAccountCommand): Promise<Account> {
    // 
    return this.database.createAccount(command.username, command.password)
  }
  getAccount(query: GetAccountCommand): Promise<Account> {
    // 
    return this.database.readAccount(query.accountId)
  }
  updateAccount(command:EditUser): Promise<Account> {
    // 
    return this.database.updateAccount(command.userId, command.username)
  }
  deleteAccount(command:DeleteAccountCommand) {
    // 
    return this.database.deleteAccount(command.accountId)
  }
  async login(command:LoginCommand): Promise<Token> {
    // TODO: get password hash from database and compare with provided password
    // TODO: create session token for user and return on success
    // TODO: log failure and return 
    this.database.createSession('' as UUID, 'deviceInfo') // TODO: get userId from username, not hardcoded and get deviceInfo from request
    return new Token('testToken',new Date(Date.now() + 3600 * 1000))
  }
  async logout(command:LogoutCommand) {
    // TODO: remove session or token associated with user/device
    return this.database.deleteSession(command.tokenId)
  }
}
