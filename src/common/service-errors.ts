
/**
 * All errors defined by this service should extend ServiceError
 * 
 * 
 */
export class ServiceError extends Error {
  cause?:unknown
  constructor(cause?:unknown) {
    super()
    this.cause = cause
  }
}
/**
 * Determines whether the given error is of the ServiceError hierarchy or not.
 * @param error Some generic error
 * @returns True if `error` is a `ServiceError`
 */
export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError
}

export class UnimplementedError extends ServiceError {
  clss: string
  method: string
  constructor(clss:string,method:string) {
    super()
    this.clss = clss
    this.method = method
  }
}
