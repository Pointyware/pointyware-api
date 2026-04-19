
import type { Request, Response } from "express";

/**
 * 
 */
export function handle<A, B, C, D, E, F>(
  requestModelMapper: (request:Request<A, B, C, D>)=>E, 
  modelFunction: (model:E)=>Promise<F>,
  modelResponseMapper: (model:F,response:Response)=>void
): (req:Request<A, B, C, D>,res:Response)=>Promise<void> {
  return async (
    req: Request<A, B, C, D>, 
    res: Response
  ) => {
    const model = requestModelMapper(req)
    const result = await modelFunction(model)
    modelResponseMapper(result, res)
  }
}
