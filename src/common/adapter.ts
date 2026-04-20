
import type { Request, Response } from "express";
import { failure, success, type Result } from "./result.js";

/**
 * 
 */
export function adapter<A, B, C, D, E, F>(
  requestModelMapper: (request:Request<A, B, C, D>)=>E, 
  modelFunction: (model:E)=>Promise<F>,
  modelResponseMapper: (result:Result<F>,response:Response)=>void
): (req:Request<A, B, C, D>,res:Response)=>Promise<void> {
  return async (
    req: Request<A, B, C, D>, 
    res: Response
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
