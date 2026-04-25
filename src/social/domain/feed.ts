import type { UUID } from "crypto"

/**
 * A Feed hosts comments associa ted with a specific context, like hosting
 * comments at the bottom of blog posts or a website home-page.
 */
export interface Feed {
  id:UUID
  title:string
  comments:Comment[]
}

export interface FeedPreview {
  id:UUID
  title:string
  commentCount:number

}

export interface FeedDetail {
  id:UUID
  title:string
  comments:CommentDetail
}

export interface CommentDetail {
  count:number
  
}