
import type { Request, Response } from "express";
import { failure, success, type Result } from "./result.js";
import { ClientError, DoesNotExistError, ForbiddenError, IllegalArgumentError, UnauthorizedError } from "./errors.js";
import { ServiceError, UnimplementedError } from "./service-errors.js";

const EMPTY_STRING_MAP = new Map<string,string>()
/**
 * @param requestModelMapper Maps an incoming Request to some domain Command or Query object
 * @param interpreter Executes a given Command or Query on the appropriate Controllers and captures the resulting Model.
 * @param modelResponseMapper Maps the resulting Model into a ResultPayload.
 */
export function adapter<Params, ResBody, ReqBody, ReqQuery, CQ, Model>(
  requestModelMapper: (request:Request<Params, ResBody, ReqBody, ReqQuery>)=>CQ, 
  interpreter: (commandQuery:CQ)=>Promise<Model>,
  modelResponseMapper: (result:Result<Model>)=>ResultPayload=GenericResponseMapper
) {
  return async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>, 
    res: Response<ResBody>
  ) => {
    const model = requestModelMapper(req)
    let response: ResultPayload
    try {
      const result = await interpreter(model)
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

/**
 * Describes the contents of an HTTP response.
 * status and headers are optional and default to 200 with no additional headers.
 * body can be any value, which will be passed to `Response.send` to
 * be serialized.
 */
export interface Payload {
  status?:number
  headers?:Map<string,string>
  body:any
}
/**
 * Constrains the `Payload.status` field to only supported HTTP success 
 * status codes.
 */
export interface SuccessPayload extends Payload {
  status?:200|201
}
/**
 * Constrains the `Payload.status` field to only supported HTTP failure 
 * status codes.
 */
export interface FailurePayload extends Payload {
  status?:400|401|402|403|404|500|501
}
/**
 * A union type discriminated on the `status` field.
 */
export type ResultPayload = SuccessPayload | FailurePayload

/**
 * 
 * @param result The Result corresponding to the above Model type.
 * @returns A ResultPayload
 */
export function GenericResponseMapper(result:Result<any>): ResultPayload {
  if (result.success) {
    return { body: result.data } // default status: 200 headers: {}
  } else {
    return standardErrorMapper(result.error)
  }
}

/**
 * 
 * @param error The error to type-narrow for refined failure reporting.
 * @returns A FailurePayload with status code determined by error type.
 */
export function standardErrorMapper(error:unknown): FailurePayload {
  if (error instanceof ServiceError) {
    if (error instanceof UnimplementedError) {
      return { status: 501, body: { message:"Not Implemented", error: error }}
    }
    return { status: 500, body: { message:"Server Error", error: error}} // default headers: {}
  } else if (error instanceof ClientError) {
    if (error instanceof IllegalArgumentError) {
      return { status: 400, body: { message: "Bad Request" }}
    } else if (error instanceof UnauthorizedError) {
      return { status: 401, body: { message:"User is Unauthorized", error:error}} // default headers: {}
    } else if (error instanceof ForbiddenError) {
      return { status: 403, body: { message:"User is Not Allowed to Access this Resource", error:error}} // default headers: {}
    } else if (error instanceof DoesNotExistError) {
      return { status: 404, body: { message:"Resource does not exist.", error:error} }
    }
  }
  return { status: 500, body: { message:"Unhandled Server Error", error: error}} // default headers: {}
}
