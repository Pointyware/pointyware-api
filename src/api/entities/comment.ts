import type { UUID } from "node:crypto"

/**
 * A single user comment in a feed.
 */
export class Comment {
  text:string
  constructor(text:string,uuid:UUID) {
    this.text = text
  }
}
