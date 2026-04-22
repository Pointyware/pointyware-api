
import startAccountService from './accounts/account-service.js'
import { authSqlPool } from './accounts/data/account-database.js'
import startSocialService from './social/social-service.js'

console.log('==Welcome to the Pointyware API==')
// Collect Arguments for Port Configuration, Passwords, etc.
// TODO: Use a library like `commander` to handle CLI arguments and configuration
const authPort = process.env.AUTH_PORT ? parseInt(process.env.AUTH_PORT) : 3001
const authHost = process.env.AUTH_HOST || 'localhost'
const socialPort = process.env.SOCIAL_PORT ? parseInt(process.env.SOCIAL_PORT) : 3002
const socialHost = process.env.SOCIAL_HOST || 'localhost'

// ==== Setup Dependencies
const pool = await authSqlPool()

// ==== Start Services
// Accounts Service (authorization) must be running for anything to work
const accountService = await startAccountService(authPort, pool)
// Start resource services
const socialService = await startSocialService(socialPort)

console.log('Accounts Service: http://' + authHost + ':' + authPort)
console.log('Social Service: http://' + socialHost + ':' + socialPort)
