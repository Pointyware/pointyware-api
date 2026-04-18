
/**
 * A user account
 */
export class Account {
  username:string
  password:string
  email?:string
  phoneNumber?:string

  constructor(username:string,password:string) {
    this.username = username
    this.password = password
  }
}
