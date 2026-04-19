import type { Request, Response } from "express";

/**
 * 
 */
export function handle<A, B, C, D, E, F>(
  requestModelMapper: (request:Request<A, B, C, D>)=>E, 
  modelFunction: (model:E)=>F,
  modelResponseMapper: (model:F,response:Response)=>void
): (req:Request<A, B, C, D>,res:Response)=>void {
  return (
    req: Request<A, B, C, D>, 
    res: Response
  ) => {
    const model = requestModelMapper(req)
    const result = modelFunction(model)
    modelResponseMapper(result, res)
  }
}