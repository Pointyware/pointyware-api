
import startAccountService from './accounts/account-service.js'
import startSocialService from './social/social-service.js'

// Accounts Service (authorization) must be running for anything to work
startAccountService(3001)
// Start resource services
startSocialService(3002)
