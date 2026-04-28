
import { type Request } from "express"
import type { AccountAuthDto, UserIdDto } from "../../data/dtos.js"
import type { DeleteAccountCommand, EditUser, GetAccountCommand, LoginCommand, LogoutCommand } from "../domain/command-queries.mjs"


export function CreateAccountCommandMapper(
  req: Request<unknown, unknown, AccountAuthDto>
): LoginCommand {
  return {
    username: req.body.username,
    password: req.body.password
  }
}
export function GetAccountCommandMapper(
  req: Request<UserIdDto> 
): GetAccountCommand {
  return {
    accountId: req.params.userId
  }
}
export function UpdateAccountCommandMapper(
  req: Request<UserIdDto, unknown, AccountAuthDto>
): EditUser {
  return {
    userId: req.params.userId,
    username: req.body.username,
    email: req.body.email
  }
}
export function DeleteAccountCommandMapper(
  req: Request<UserIdDto>
): DeleteAccountCommand {
  return {
    accountId: req.params.userId
  }
}

export function LoginCommandMapper(
  req: Request<unknown, unknown, AccountAuthDto>
): LoginCommand {
  return {
    username: req.body.username,
    password: req.body.password,
    deviceInfo: 'placeholder-device-info' // TODO: pass along from headers
  }
}

export function LogoutCommandMapper(
  req: Request
): LogoutCommand {
  return {
    tokenId: req.user.id
  }
}
