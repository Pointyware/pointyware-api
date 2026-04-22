import type { UUID } from "crypto";
import { Account, type ProfileImage } from "../entities/account.js";
import type { AccountDatabase } from "../data/account-database.js";

export interface UserQuery {
  userId:UUID
}
export interface GetAccountCommand { // FIXME: reconcile with UserQuery
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
  userId:UUID
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
    return database.updateAccount(command.userId, command.name)
  }
}

export function DeleteAccount(database:AccountDatabase): (command:UserHandle) => Promise<void> {
  return async function(command:UserHandle): Promise<void> {
    await database.removeAccount(command.userId)
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
