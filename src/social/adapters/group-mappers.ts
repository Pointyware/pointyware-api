import type { CreateGroupCommand } from "../domain/command-queries.js";
import { type Request } from "express";
import z from 'zod'

interface CreateGroupDto {
  name: string
}

const groupSchema = z.object({
    name: z.string()
  })

export function CreateGroupCommandMapper(req: Request<unknown, unknown, CreateGroupDto>): CreateGroupCommand {
  const schema = groupSchema.toJSONSchema()
  return groupSchema.parse(req.body)
}
