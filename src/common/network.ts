
import type { Request, Response } from "express"

/**
 * A middleware function to handle errors in the application. 
 * @param error THe error caught
 * @param req The request which is the origin of the error
 * @param res The response object to send 
 * @param next The chain callback to pass control to the next callback
 */
export function ErrorHandler(error:unknown,req:Request,res:Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next:()=>void) {
  // Report error for debugging and log aggregation, but do not disclose details to users for security
  console.error('Uncaught Error: ', error)
  res.status(500).send({message:'Internal Server Error - Cannot Disclose Details'})
}
