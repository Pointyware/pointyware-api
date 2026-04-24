import type { UUID } from "crypto"
import type { ProfileImage } from "./account.js"


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
