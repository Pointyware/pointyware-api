
/**
 * All errors defined by this service should extend ServiceError
 */
export class ServiceError {
  constructor() {}
}
/**
 * Determines whether the given error is of the ServiceError hierarchy or not.
 * @param error Some generic error
 * @returns True if `error` is a `ServiceError`
 */
export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError
}

/**
 * There was an attempt to access a resource which was denied for some reason.
 * 
 * Typically in Client Code Range (400)
 */
export class ResourceAccessError extends ServiceError {
  resource: string
  constructor(resource:string) {
    super()
    this.resource = resource
  }
}
/**
 * The user is not authorized to access the resource (because they are unkown).
 * 
 * HTTP Status 401
*/
export class UnauthorizedError extends ResourceAccessError {
  constructor(resource:string) {super(resource)}
}
/**
 * The user is known but does not have access to the resource.
 * 
 * HTTP Status 402
*/
export class ForbiddenError extends ResourceAccessError{
  constructor(resource:string) {super(resource)}
}
/**
 * The requested resource does not exist 
 * (or we don't want to expose its existence with another resource access error)
 * 
 * HTTP Status 404
 */
export class DoesNotExistError extends ResourceAccessError {
  constructor(resource:string) {super(resource)}
}
