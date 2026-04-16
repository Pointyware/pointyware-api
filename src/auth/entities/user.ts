import { URL } from "node:url"

/**
 * 
 */
export default class User {
  username:string
  profileImage:ProfileImage

  constructor(username:string,image:ProfileImage) {
    this.username = username
    this.profileImage = image
  }
}

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
