
import { describe, it, test, expect, assert, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'
import { SocialService } from '@/social/social-service.js'
import { TestSocialDatabase } from '@/social/data/test-social-databases.mjs'

function testService(): SocialService {
  const testDb = new TestSocialDatabase()
  return new SocialService(testDb)
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
      const service = testService()
      const supertest = request(service.app)
      // User Session is Valid
      const token = 'valid-token' // TODO: insert into test db as valid session
      // User Submits
      const response = await supertest
        .post('/feeds/feed-0-0-0-0-0')
        .send({
          content: 'This is a new comment!'
        })
        .set('Authorization', 'Bearer ${token}')
  
      expect(response.statusCode).toBe(201)
      expect(response.body.content).toBe('This is a new comment!')
    })
    test('Post Child Comment on Comment', async ()=>{
      const service = testService()
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
      const service = testService()
      const supertest = request(service.app)
      // User Session is Invalid
      const token = 'invalid-token' // TODO: insert into test db an expired session
      // User Submits
      const response = await supertest
        .post('/feeds/feed-0-0-0-0-0')
        .send({
          content: 'This is a new comment!'
        })
        .set('Authorization', 'Bearer ${token}')

      expect(response.statusCode).toBe(401)
      expect(response.body.message).toBe('User is Unauthorized')
      expect(response.body.cause.resource).toBe('/feeds/feed-0-0-0-0-0')
    })
  })
})
