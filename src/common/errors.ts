
/**
 * Compare with any {ServiceError}, which has a `cause?:unkown` property,
 * usually the underlying system error that surfaced the problem.
 * 
 * A Client Error is an error made by a client (not necessarily the user operating the client), e.g. an attempt to delete
 * a resource that no-longer exists, or a comment that exists on a
 * different feed.
 */
export class ClientError extends Error {
}
/**
 * Determines whether the given error is of the ClientError hierarchy or not.
 * @param error Some generic error
 * @returns True if `error` is a `ClientError`
 */
export function isClientError(error: unknown): error is ClientError {
  return error instanceof ClientError
}

/**
 * There was an attempt to access a resource which was denied for some reason.
 * 
 * Typically in Client Code Range (400)
 */
export class ResourceAccessError extends ClientError {
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
}
/**
 * The user could not be authenticated because the username or password is wrong.
 * 
 * HTTP Status 401
 */
export class AuthenticationError extends ClientError {
}
/**
 * The user is known but does not have access to the resource.
 * 
 * HTTP Status 402
*/
export class ForbiddenError extends ResourceAccessError{
}
/**
 * The requested resource does not exist 
 * (or we don't want to expose its existence with another resource access error)
 * 
 * HTTP Status 404
 */
export class DoesNotExistError extends ResourceAccessError {
}

/**
 * The requested resource was requested too many times in too short a span
 * of time.
 * 
 * HTTP Status 429
 */
export class TooManyRequestsError extends ClientError {
  
}

/**
 * Indicates the client attempted to do something that is prevented by 
 * current state, instead of permissions.
 */
export class IllegalStateError extends ClientError {
}
/**
 * Indicates the endpoint and method were given unexpected arguments.
 */
export class IllegalArgumentError extends ClientError {
}