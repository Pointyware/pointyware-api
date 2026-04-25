import type { UUID } from "crypto"

/*
Theory: Role-Based Access Control
This Policy structures access around roles, where users are assigned to roles
and permissions are granted to roles, and by proxy users. This model
simplifies the mental overhead of managing directly assigned resource
permissions and allows privileges to be managed and assigned semantically,
reducing the likelihood of accidentally elevating an agent beyond
necessary privileges.
*/

export enum Resource {
  Account = 'Acct',
  Profile = 'Prof',
  Feed = 'Feed',
  Comment = 'Comm',
  Reaction = 'Reac'
}

export enum Action {
  Create = 'C',
  Read = 'R',
  Update = 'U',
  Delete = 'D'
}

/**
 * Founded on Unix Permission Model UGO, combined with social media concepts.
 * User: 
 *   - Self
 *   - Friend
 *   - <User-:userId>
 *   - Other
 * Group:
 *   - Self / Ingroup
 *   - Friend
 *   - <Group-:groupId>
 *   - Other / Outgroup
 * Other:
 *   - 
 */
export interface Permission {
  resource:Set<Resource> | 'ALL' | Resource // 'ALL' is a shorthand for all resources
  action:Set<Action> | 'CRUD' | Action // 'CRUD' is a shorthand for full permissions on a resource
}

export class Role {
  name:string
  permissions:Permission[]
  constructor(name:string, permissions:Permission[]) {
    this.name = name
    this.permissions = permissions
  }
}

export const AdminRole = new Role('Admin', [
  { resource: 'ALL', action: 'CRUD' }
])

export const AuditorRole = new Role('Auditor', [
  { resource: 'ALL', action: Action.Read }
])

export const UserRole = new Role('User', [
  { resource: Resource.Account, action: new Set([Action.Read]) },
  { resource: Resource.Profile, action: new Set([Action.Read]) },
  { resource: Resource.Feed, action: new Set([Action.Create, Action.Read]) },
  { resource: Resource.Comment, action: new Set([Action.Create, Action.Read]) },
  { resource: Resource.Reaction, action: new Set([Action.Create, Action.Read]) }
])


/**
 * Represents an authenticated session for a user, containing the user's account ID and an authentication token.
 */
export class Session {
  accountId: UUID
  token: Token
  constructor(accountId:UUID, token:Token) {
    this.accountId = accountId
    this.token = token
  }


}

/**
 * Represents a 
 */
export class Token {
  expiresAt: Date
  key: string
  constructor(token:string, expiresAt:Date) {
    this.key = token
    this.expiresAt = expiresAt
  }
}
