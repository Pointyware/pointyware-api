import { type Request, type Response } from 'express'
import { GenericResponseMapper } from "@/common/adapters.js"
import type { AnonymousUser, AuthenticatedUser } from "@/common/users.js"
import { success } from '@/common/result.js'
import { UnauthorizedError } from '@/common/errors.js'

export function getUnauthenticatedUser<A,B,C,D>(request:Request<A,B,C,D>): AnonymousUser {
  return {
    ip: request.ip ?? 'NO IP'
  }
}
export function getAuthenticatedUser<A,B,C,D>(request:Request<A,B,C,D>): AuthenticatedUser {
    const authHeader = request.headers['authorization']
  if (authHeader?.search(/^Bearer: /) == 0) {
    const token = authHeader.substring('Bearer: '.length)
    // TODO: get token from database with account id
    // verify token is still valid
    // extract permissions info
    // pass along with account id
    return {
      accountId: '0-0-0-0-0'
    }
  } else {
    throw new UnauthorizedError(request.path)
  }
}

export function anonymousHandler<P, Q, B, CQ, Model>(
  requestMapper:(req:Request<P, unknown, B, Q>)=>CQ,
  adapter:(cq:CQ,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request<P, unknown, B, Q>, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    const cq = requestMapper(req)
    
    // pull ip/device info from request
    const user: AnonymousUser = {
      ip: req.ip || 'NO IP'
    }
    // TODO: pull token or ip of user
    let response: ResultPayload<Model>
    try {
      const user = getUnauthenticatedUser(req)
      const model = requestModelMapper(req)
      const result = await interpreter(model,user)
      response = modelResponseMapper(success(result))
      res.status(response.status ?? 200)
    } catch (error) {
      response = modelResponseMapper(failure(error))
      res.status(response.status ?? 500)
    }
    res
      .setHeaders(response.headers ?? EMPTY_STRING_MAP)
      .send(response.body)

    const result = adapter(cq, user)
    
    const paylooad = GenericResponseMapper(success(result))
    // TODO move from adapter function
  }
}
export function authenticatedHandler<P, Q, B, CQ, Model>(
  requestMapper:(req:Request<P, unknown, B, Q>)=>CQ,
  adapter:(cq:CQ,user:AuthenticatedUser)=>Promise<Model>
) {
  return (req: Request<P, unknown, B, Q>, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    const cq = requestMapper(req)
    
    // TODO: pull bearer token/user info
    const user: AuthenticatedUser = {
      accountId: '0-0-0-0-0'
    }

    const result = adapter(cq, user)
    
    // TODO: user GenericResponseMapper
    const payload = GenericResponseMapper(success(result))
    // TODO: move from adapter function
  }
}


function anonymousCommandHandler<Command, Model>(
  commandMapper:(req:Request)=>Command,
  adapter:(command:Command,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // pull ip/device info from request

    // TODO: use GenericResponseMapper
  }
}
function anonymousQueryHandler<Query, Model>(
  queryMapper:(req:Request)=>Query,
  adapter:(query:Query,user:AnonymousUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // pull ip/device info from request

    // TODO: use GenericResponseMapper
  }
}
function authenticatedCommandHandler<Command, Model>(
  commandMapper: (req:Request)=>Command,
  adapter:(command:Command,user:AuthenticatedUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // TODO: pull bearer token/user info
    
    // TODO: user GenericResponseMapper
  }
}
function authenticatedQueryHandler<Query, Model>(
  queryMapper: (req:Request)=>Query,
  adapter:(query:Query,user:AuthenticatedUser)=>Promise<Model>
) {
  return (req: Request, res: Response) => {
    // TODO: insert Mapper for each param/query/body
    
    // TODO: pull bearer token/user info
    
    // TODO: user GenericResponseMapper
  }
}
