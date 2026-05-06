import { type ResultPayload, type Payload, GenericResponseMapper } from "@/common/adapters.js"
import type { Comment } from "../domain/comment.js"
import type { CommentDto, CommentIdDto } from "@/data/dtos.js"
import type { CommentQuery, CreateCommentCommand, DeleteCommentCommand } from "../domain/command-queries.js"
import type { CommentsSummary } from "../domain/comment.js"
import type { CommentInteractor } from "../usecases/comment-interactors.js"

/**
 * 
 */
export class CommentAdapter {
  commentInteractor:CommentInteractor
  constructor(commentInteractor:CommentInteractor) {
    this.commentInteractor = commentInteractor
  }

  /**
   * Alternative to inclusion of Interactors in Router logic
   * 
   * Current Router:
   * - Adapter
   * - DataMapper
   * - Interpreter -> Interactor Bridge
   * 
   * New Router:
   * - DataMapper/Handlers
   * - Adapters
   * 
   * const comments = router.route('/feeds/feed-:feedId/comments')
     comments
       .post(adapter(
         CreateCommentMapper,
         CreateComment(database)
       ))
       .get(adapter(
         GetFeedCommentsMapper,
         GetFeedComments(database)
       ))

   * @param params 
   * @param body 
   * @returns 
   */
  async onCreate(params:CommentIdDto,body:CommentDto): Promise<ResultPayload<Comment>> {
    // TODO: invoke use case

    const result = await this.commentInteractor.create({
      feedId: params.feedId,
      parentId: params.commentId,
      content: body.content
    }, {
      accountId: '0-0-0-0-0'
    })

    // return GenericResponseMapper(result)

    return {
      body: result
    }
  }

  onRead(body:CommentIdDto): ResultPayload<CommentsSummary> {
    const query: CommentQuery = {
      feedId: body.feedId,
      commentId: body.commentId
    }

    // TODO: invoke

    return {
      body: {
        count: 10
      }
    }
  }

  

  onDelete(dto:CommentIdDto): Payload<void> {
    const command: DeleteCommentCommand = {
      feedId: dto.feedId,
      commentId: dto.commentId
    }

    // TODO: invoke domain

    return {
      body: undefined
    }
  }


}
