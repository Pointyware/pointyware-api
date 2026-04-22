import { URL } from "node:url"

/**
 * A user account
 */
export class Account {
  username:string
  email:string|undefined
  phoneNumber:string|undefined

  constructor(username:string,email?:string,phoneNumber?:string) {
    this.username = username
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

/**
 * A Profile is the externally facing information about a user, which includes their profile image and other public information (nothing else for now).
 */
export interface Profile {
  image:ProfileImage
}

/**
 * Generally unused since it contains both public and private information 
 * about a user, but can be used in some cases where both are needed, such 
 * as a user's settings page or an admin panel.
 */
export type User = Profile & Account

/**
 * A user's profile image is initially a randomly selected color of the 
 * default image. They can choose to override the default with an image given
 * by some URL.
 */
interface ProfileImage {
  // TODO: define image function(s)
}
/**
 * Presents a default silhouette and background in the given color.
 */
export class DefaultImage implements ProfileImage {
  color:string
  constructor(color:string) {
    this.color = color
  }
}
/**
 * Presents an image identified by a URL.
 */
export class UrlImage implements ProfileImage {
  url:URL
  constructor(url:URL) {
    this.url = url
  }
}
