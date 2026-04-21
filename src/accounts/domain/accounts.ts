import type { UUID } from "crypto";

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
export interface NewUser {
  name:string,
  email:string
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
