
import { type Request } from "express"
import type { AccountAuthDto, UserIdDto } from "../../data/dtos.js"
import type { CreateAccountCommand, DeleteAccountCommand, EditUser, GetAccountCommand, LoginCommand, LogoutCommand } from "../domain/command-queries.mjs"


export function CreateAccountCommandMapper(
  req: Request<any, any, AccountAuthDto, any>
): CreateAccountCommand {
  return req.params
}
export function GetAccountCommandMapper(
  req: Request<UserIdDto, any, any, any> 
): GetAccountCommand {
  return {
    accountId: req.params.userId
  }
}
export function UpdateAccountCommandMapper(
  req: Request<UserIdDto, any, AccountAuthDto, any>
): EditUser {
  return {
    userId: req.params.userId,
    username: req.body.username,
    email: req.body.email
  }
}
export function DeleteAccountCommandMapper(
  req: Request<UserIdDto, any, any, any>
): DeleteAccountCommand {
  return {
    accountId: req.params.userId
  }
}

export function LoginCommandMapper(
  req: Request<any, any, AccountAuthDto, any>
): LoginCommand {
  return req.body
}

export function LogoutCommandMapper(
  req: Request
): LogoutCommand {
  return {
    tokenId: req.user.id
  }
}
