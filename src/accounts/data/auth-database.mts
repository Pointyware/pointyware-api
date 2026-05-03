import type { Databases } from "@/common/databases.js"
import { UnimplementedError } from "@/common/service-errors.js"
import type { UUID } from "crypto"

export interface SessionKey {
  userId: UUID
  deviceInfo: string
}

export interface SessionInfo {
  token: string
  permission: string[]
}

export type Session = SessionKey & SessionInfo

/**
 * 
 */
export default class SessionDatabase implements Databases.ResourceDao<SessionInfo,UUID,Session> {
  async create(resource:SessionInfo): Promise<Session> {
    throw new UnimplementedError('AuthDatabase', 'create')
  }
  async read(id:UUID): Promise<Session> {
    throw new UnimplementedError('AuthDatabase', 'read')
  }
  async update(id:UUID,resource:SessionInfo): Promise<Session> {
    throw new UnimplementedError('AuthDatabase', 'update')
  }
  async delete(id:UUID): Promise<void> {
    throw new UnimplementedError('AuthDatabase', 'delete')
  }
}
