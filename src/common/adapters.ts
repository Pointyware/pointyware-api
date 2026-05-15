
import type { Request, Response } from "express";
import { failure, success, type Result } from "./result.js";
import { AuthenticationError, ClientError, DoesNotExistError, ForbiddenError, IllegalArgumentError, TooManyRequestsError, UnauthorizedError } from "./errors.js";
import { ServiceError, UnimplementedError } from "./service-errors.js";
import type { AnonymousUser, AuthenticatedUser } from "./users.js";
import { getUnauthenticatedUser, getAuthenticatedUser } from "@/social/network/handlers.mjs";
import type { Token } from "@/accounts/domain/token.js";

const EMPTY_STRING_MAP = new Map<string,string>()

/**
 * Adapts between the express framework and the application domain.
 * 
 * TODO: rename to some type of request handler, create proper Adapter that receives messages from request handler
 */
export type Adapter<PathParams, QueryParams, ReqBody, ResBody> = (
  req: Request<PathParams, ResBody, ReqBody, QueryParams>,
  res: Response<ResBody>
)=>Promise<void>

export type RequestModelMapper<CQ> = (req:Request)=>CQ
export type Interpreter<CQ, Model> = (commandQuery:CQ,user:AnonymousUser)=>Promise<Result<Model>>
export type AuthenticatedInterpreter<CQ, Model> = (commandQuery:CQ,user:AuthenticatedUser) =>Promise<Result<Model>>
export type ModelResponseMapper<Model, ResBody> = (result:Result<Model>)=>ResBody

/**
 * @param requestModelMapper Maps an incoming Request to some domain Command or Query object
 * @param interpreter Executes a given Command or Query on the appropriate Controllers and captures the resulting Model.
 * @param modelResponseMapper Maps the resulting Model into a ResultPayload.
 */
export function adapter<Params, Model, ReqBody, ReqQuery, CQ, ResBody = Model | FailureBody>(
  requestModelMapper: (request:Request<Params, ResBody, ReqBody, ReqQuery>)=>CQ, 
  interpreter: (commandQuery:CQ,user:AnonymousUser)=>Promise<Model>,
  modelResponseMapper: (result:Result<Model>)=>ResultPayload<Model>=GenericResponseMapper
) {
  return async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>, 
    res: Response<ResBody>
  ) => {
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
  }
}

export function authenticatedAdapter<Params, Model, ReqBody, ReqQuery, CQ, ResBody = Model | FailureBody>(
  requestModelMapper: (request:Request<Params, ResBody, ReqBody, ReqQuery>)=>CQ,
  authenticatedInterpreter: (commandQuery:CQ,user:AuthenticatedUser)=>Promise<Model>,
  modelResponseMapper: (result: Result<Model>)=>ResultPayload<Model>=GenericResponseMapper
) {
  return async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>, 
    res: Response<ResBody>
  ) => {
    let response: ResultPayload<Model>
    try {
      const user = getAuthenticatedUser(req)
      const model = requestModelMapper(req)
      const result = await authenticatedInterpreter(model, user)
      response = modelResponseMapper(success(result))
      res.status(response.status ?? 200)
    } catch (error) {
      response = modelResponseMapper(failure(error))
      res.status(response.status ?? 500)
    }
    res
      .setHeaders(response.headers ?? EMPTY_STRING_MAP)
      .send(response.body)
  }
}

// TODO: move to top of file
export const UnimplementedAdapter = async (
  req: Request,
  res: Response
) => {
  res.status(501).send({message:"Endpoint Not Implemented"})
}

/**
 * Describes the contents of an HTTP response.
 * status and headers are optional and default to 200 with no additional headers.
 * body can be any value, which will be passed to `Response.send` to
 * be serialized.
 */
export interface Payload<T> {
  status?:number
  headers?:Map<string,string>
  body:T
}
/**
 * Constrains the `Payload.status` field to only supported HTTP success 
 * status codes.
 */
export interface SuccessPayload<T> extends Payload<T> {
  status?:200|201|303
}
/**
 * Constrains the `Payload.status` field to only supported HTTP failure 
 * status codes.
 */
export interface FailurePayload extends Payload<FailureBody> {
  status?:400|401|402|403|404|422|429|500|501
}
/**
 * The body property of FailurePayload-s should always have a message
 * and an error attached if it was caused by a thrown exception.
 */
export interface FailureBody {
  message:string
  cause?:unknown
}

/**
 * A union type discriminated on the `status` field.
 */
export type ResultPayload<T> = SuccessPayload<T> | FailurePayload

/**
 * 
 * @param result The Result corresponding to the above Model type.
 * @returns A ResultPayload
 */
export function GenericResponseMapper<T>(result:Result<T>): ResultPayload<T> {
  if (result.success) {
    return { body: result.data } // default status: 200 headers: {}
  } else {
    return standardErrorMapper(result.error)
  }
}

export function AuthResponseMapper(result:Result<Token>): ResultPayload<Token> {
  if (result.success) {
    return { body: result.data, status: 303, headers: new Map([['Location', 'http://Taushs-Mac-Studio.local:3000/']]) }
  } else {
    return standardErrorMapper(result.error)
  }
}

/**
 * 
 * @param error The error to type-narrow for refined failure reporting.
 * @returns A FailurePayload with status code determined by error type.
 */
export function standardErrorMapper<T>(error:unknown): FailurePayload {
  if (error instanceof ServiceError) {
    if (error instanceof UnimplementedError) {
      return { status: 501, body: { message:"Not Implemented", cause: error }}
    }
    return { status: 500, body: { message:"Server Error", cause: error}} // default headers: {}
  } else if (error instanceof ClientError) {
    if (error instanceof IllegalArgumentError) {
      return { status: 400, body: { message: "Bad Request" }}
    } else if (error instanceof UnauthorizedError) {
      return { status: 401, body: { message:"User is Unauthorized", cause:error}} // default headers: {}
    } else if (error instanceof AuthenticationError) {
      return { status: 401, body: { message:"Wrong username or password.", cause:error}}
    } else if (error instanceof ForbiddenError) {
      return { status: 403, body: { message:"User is Not Allowed to Access this Resource", cause:error}} // default headers: {}
    } else if (error instanceof DoesNotExistError) {
      return { status: 404, body: { message:"Resource does not exist.", cause:error} }
    } else if (error instanceof TooManyRequestsError) {
      return { status: 429, body: { message:"Too Many Requests" }, 
        headers: new Map([[
            'Retry-After', '500' // time in milliseconds
        ]])
      }
    }
  }
  console.error('Unhandled Server Error', error)
  return { status: 500, body: { message:"Unhandled Server Error", cause: error}} // default headers: {}
}

export type AuthenticatedInterpeter<CQ, Model> = (commandQuery:CQ, user:AuthenticatedUser)=>Promise<Model>
