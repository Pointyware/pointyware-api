
import type { Request, Response } from "express";
import { failure, success, type Result } from "./result.js";

/**
 * 
 */
export function adapter<Params, ResBody, ReqBody, ReqQuery, CQ, Model>(
  requestModelMapper: (request:Request<Params, ResBody, ReqBody, ReqQuery>)=>CQ, 
  modelFunction: (commandQuery:CQ)=>Promise<Model>,
  modelResponseMapper: (result:Result<Model>,response:Response<ResBody>)=>void
) {
  return async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>, 
    res: Response<ResBody>
  ) => {
    const model = requestModelMapper(req)
    try {
      const result = await modelFunction(model)
      modelResponseMapper(success(result), res)
    } catch (error) {
      modelResponseMapper(failure(error), res)
    }
  }
}
