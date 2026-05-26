import type { UUID } from "crypto"

export interface Group {
  groupId: UUID
  name: string
}

export interface Member {
  accountId: UUID
  memberSince: Date
  role: string
}

export interface Task {
  name: string
  description?: string
  completion: number
}

export interface TaskList {
  name: string
  tasks: Task[]
}
