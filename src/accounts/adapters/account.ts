
import { type Request } from "express"
import type { AccountAuthDto, UserIdDto } from "../../data/dtos.js"
import type { CreateAccountCommand, EditUser, GetAccountCommand, LoginCommand, LogoutCommand } from "../domain/accounts.js"


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

export function LoginCommandMapper(
  req: Request<any, any, AccountAuthDto, any>
): LoginCommand {
  return req.body
}

export function LogoutCommandMapper(
  req: Request
): LogoutCommand {
  return {
    userId: req.user.id
  }
}
