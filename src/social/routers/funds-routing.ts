import { Router } from 'express';

export function getFundsRouter() {
  const router = Router()
  const fundsRoute = router.route('/funds')
  // GET POST
  const fundIdRoute = router.route('/funds/:fundId')
  // GET UPDATE DELETE
  const fundContributionsRoute = router.route('/funds/:fundId/contributions/')
  // GET POST
  const fundContributionIdRoute = router.route('/funds/:fundId/contributions/:contributionId')
  // GET UPDATE DELETE

  const fundsUsersRoute = router.route('/funds/users/')
  // GET POST
  const userContributionsRoute = router.route('/funds/users/:userId/contributions/')
  // GET POST

  return router
}
