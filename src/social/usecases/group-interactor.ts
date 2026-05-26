import type { AuthenticatedUser } from "@/common/users.js";
import type { Group, TaskList } from "../domain/group.js";
import { UnimplementedError } from "@/common/service-errors.js";
import type { AddMemberCommand, CreateTaskListCommand, CreateTaskCommand, CreateGroupCommand } from "../domain/command-queries.js";

/**
 * Using a Command-Oriented Interface
 * 
 */
export class GroupInteractor {


  constructor() {

  }

  async createGroup(command: CreateGroupCommand, user: AuthenticatedUser): Promise<Group> {
    throw new UnimplementedError('GroupInteractor', 'createGroup')
  }

  async addMember(command: AddMemberCommand, user: AuthenticatedUser): Promise<Group> {
    throw new UnimplementedError('GroupInteractor', 'createGroup')
  }

  async createTaskList(commmand: CreateTaskListCommand, user: AuthenticatedUser): Promise<TaskList> {
    throw new UnimplementedError('GroupInteractor', 'createGroup')
  }
  
  async createTask(command: CreateTaskCommand, user: AuthenticatedUser): Promise<TaskList> {
    throw new UnimplementedError('GroupInteractor', 'createGroup')
  }

  async deleteGroup(): Promise<void> {
    throw new UnimplementedError('GroupInteractor', 'deleteGroup')
  }
}
