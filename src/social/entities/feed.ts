import type { UUID } from "crypto"

/**
 * A Feed hosts comments associated with a specific context, like hosting
 * comments at the bottom of blog posts or a website home-page.
 */
export interface Feed {
  id:UUID
  title:string
  comments:Comment[]
}
