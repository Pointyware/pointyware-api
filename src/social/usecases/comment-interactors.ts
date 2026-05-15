import type { SocialDatabase } from "../data/sqlite-social-database.js"
import type { CommentDatabase } from "../data/social-databases.js"
import type { Comment } from "../domain/comment.js"
import type { UserQuery } from "../../accounts/domain/command-queries.mjs"
import type { CreateCommentCommand, CommentQuery, CommentsQuery, UpdateCommentCommand, DeleteCommentCommand, CreateFeedCommand } from "../domain/command-queries.js"
import type { AnonymousUser, AuthenticatedUser } from "@/common/users.js"
import type { Feed } from "../domain/feed.js"

export function CreateComment(database: CommentDatabase): (command:CreateCommentCommand) => Promise<Comment> {
  return async (command:CreateCommentCommand)=> {
    return database.createComment(command.content, command.feedId, command.parentId)
  }
}
export function GetComment(database: SocialDatabase): (query:CommentQuery)=>Promise<Comment[]> {
  return (query:CommentQuery)=> {
    return database.readComments(query.commentId)
  }
}
export function GetFeedComments(database: SocialDatabase): (query:CommentsQuery)=>Promise<Comment[]> {
  return (query:CommentsQuery)=> {
    return database.readComments(query.feedId)
  }
}
export function GetUserComments(database: SocialDatabase): (query:UserQuery)=>Promise<Comment[]> {
  return (query:UserQuery)=> {
    return database.readComments(query.userId)
  }
}

export function UpdateComment(database: SocialDatabase) {
  return (command:UpdateCommentCommand)=> {
    return database.updateComment(command.feedId, command.commentId, command.content)
  }
}

export function DeleteComment(database: SocialDatabase) {
  return (command:DeleteCommentCommand)=> {
    return database.deleteComment(command.feedId, command.commentId)
  }
}

export class FeedInteractor {
  database: SocialDatabase
  constructor(database: SocialDatabase) {
    this.database = database
  }
  create(command: CreateFeedCommand, user: AuthenticatedUser): Promise<Feed> {
    return this.database.createFeed(user.accountId, command.title)
  }
}

export class CommentInteractor {
  database: SocialDatabase
  constructor(database: SocialDatabase) {
    this.database = database
  }
  create(command: CreateCommentCommand, user: AuthenticatedUser): Promise<Comment> {
    return this.database.createComment(command.content, command.feedId, command.parentId)
  }
  get(query: CommentQuery, user: AuthenticatedUser): Promise<Comment[]> {
    return this.database.readComments(query.commentId)
  }
}
