
import { describe, it, test, expect, assert, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'
import { SocialService } from '@/social/social-service.js'
import { TestSocialDatabase } from '@/social/data/test-social-databases.mjs'
import { CommentInteractor, FeedInteractor } from '@/social/usecases/comment-interactors.js'
import { TestAccountDatabase } from '@/accounts/data/test-account-database.mjs'
import { GroupInteractor } from '@/social/usecases/group-interactor.js'

function testRig() {
  const testDb = new TestSocialDatabase()
  const authDb = new TestAccountDatabase()
  const feedInteractor = new FeedInteractor(testDb)
  const interactor = new CommentInteractor(testDb)
  const groupInteractor = new GroupInteractor(testDb)
  const service = new SocialService(feedInteractor, interactor, groupInteractor)
  return {
    testDb: testDb,
    authDb: authDb,
    feedInteractor: feedInteractor,
    commentInteractor: interactor,
    service: service
  }
}

// TODO: consider using nock to mock network responses
beforeAll(()=>{
  console.info('beforeAll: ')
})

describe('Post Comment Flow', async ()=>{
  describe('Token is Valid', async() => {
    beforeEach(()=>{
      // TODO: setup session token

    })

    test('Post Root Comment on Feed', async ()=>{
      const rig = testRig()
      const feed = await rig.testDb.createFeed('someFeed')

      const service = rig.service
      const supertest = request(service.app)
      // User Session is Valid
      const token = 'valid-token' // TODO: insert into test db as valid session
      // User Submits
      const response = await supertest
        .post(`/feeds/${feed.id}/`)
        .send({
          content: 'This is a new comment!'
        })
        .set('Authorization', 'Bearer ${token}')
  
      expect(response.statusCode).toBe(201)
      expect(response.body.content).toBe('This is a new comment!')
    })
    test('Post Child Comment on Comment', async ()=>{
      const rig = testRig()
      const service = rig.service
      const supertest = request(service.app)
      // User Session is Valid
      const token = 'valid-token' // TODO: insert into test db as valid session
      // User Submits
      const response = await supertest
        .post('/feeds/feed-0-0-0-0-0/comments/comment-0-0-0-0-0')
        .send({
          content: 'This is a new comment!'
        })
        .set('Authorization', 'Bearer ${token}')
  
      expect(response.statusCode).toBe(201)
      expect(response.body.content).toBe('This is a new comment!')
    })
  })
  describe('Token is Expired', async ()=>{
    beforeEach(()=>{
      // TODO: setup expired token
    })
    test('User Not Logged In', async ()=>{
      const rig = testRig()
      const session = await rig.authDb.createSession(
        '0-0-0-0-0',
        'some device info'
      )
      const feed = await rig.testDb.createFeed('New Feed')

      const service = rig.service
      const supertest = request(service.app)
      // User Session is Invalid
      const token = session.key
      const feedId = feed.id
      // User Submits
      const response = await supertest
        .post(`/feeds/${feedId}`)
        .send({
          content: 'This is a new comment!'
        })
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(401)
      expect(response.body.message).toBe('User is Unauthorized')
      expect(response.body.cause.resource).toBe(`/feeds/${feedId}`)
    })
  })
})
