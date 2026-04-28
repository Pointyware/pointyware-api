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
export interface UserInfo {
  username:string
  image:ProfileImage
}

/**
 * All information that can be used to contact a user.
 */
export interface ContactInfo {
  email?:string
  phoneNumber?:string
}

export type EditUser = NewUser & UserHandle

/**
 * Used for regular login as well as first-time login (account creation).
 */
export interface LoginCommand {
  username:string
  password:string
  deviceInfo?:string // TODO: pass along from headers
}
/**
 * Identifies which session token to drop.
 */
export interface LogoutCommand {
  tokenId:UUID
}

export type NewUser = ContactInfo & LoginCommand


/**
 * 
 */
export interface PublicInfo {

}

/**
 * Information collected and used by the service for a variety of purposes,
 * but never shown to other users.
 */
export interface PrivateInfo {

}

export type SSN = `${string}-${string}-${string}`
/**
 *
 * 
 */
export interface PersonallyIdentifiableInfo {
  ssn:SSN
}

export enum InfoType {
  SSN = 'ssn',
  FULL_NAME = 'full-name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CREDIT_CARD = 'credit-card',
  
}

/**
 * Personally Identifiable Information
 */
export function isPII(type:InfoType): boolean {
  switch (type) {
    case InfoType.SSN:
    case InfoType.FULL_NAME:
      return true
    default: return false
  }
}

/**
 * Typically only viewed by Admins but also by users for any accounts they
 * manage (their own or their children's).
 */
export type CompleteInfo = PublicInfo & PrivateInfo
