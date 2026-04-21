
import { type Request } from "express"
import type { AccountAuthDto, UserIdDto } from "../../data/dtos.js"
import type { CreateAccountCommand, GetAccountCommand, LoginCommand } from "../domain/accounts.js"


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

export function LoginCommandMapper(
  req: Request<any, any, AccountAuthDto, any>
): LoginCommand {
  return req.body
}
