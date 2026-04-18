
/**
 * A user account
 */
export class Account {
  username:string
  email:string|undefined
  phoneNumber:string|undefined

  constructor(username:string,email:string|undefined=undefined,phoneNumber:string|undefined=undefined) {
    this.username = username
    this.email = email
    this.phoneNumber = phoneNumber
  }
}
