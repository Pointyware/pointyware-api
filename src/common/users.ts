import type { UUID } from "crypto"

/*
TODO: possibly create another 
*/

/**
 * An unknown user of the service.
 */
export interface AnonymousUser {
  ip: string
  ipRegion?: string
}

/**
 * A known (presumed) user of the service.
 */
export interface AuthenticatedUser {
  accountId: UUID
}

/**
 * Some kind of user.
 */
export type User = AnonymousUser | AuthenticatedUser
