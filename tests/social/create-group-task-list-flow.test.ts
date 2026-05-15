
import { describe, it, test, expect } from 'vitest'
import request from 'supertest'
import { SocialService } from '@/social/social-service.js'
import { CommentInteractor } from '@/social/usecases/comment-interactors.js'
import { TestSocialDatabase } from '@/social/data/test-social-databases.mjs'

describe('Group Task List Creation', ()=> {

  test('No Account; No Group', async () => {
    const db = new TestSocialDatabase()
    const interactor = new CommentInteractor(db)
    const service = new SocialService(interactor)

    const supertest = request(service.app)
    
    // 1. Create Account
    const accountCreationResponse = await supertest
      .post('/login')
      .send({
        username: 'username',
        password: 'password'
      })
    expect(accountCreationResponse.status).toBe(201)
    expect(accountCreationResponse.body.token).toBeDefined()
    
    // 2. Create Group
    const token = accountCreationResponse.body.token
    const groupCreationResponse = await supertest
      .post('/groups')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'New Group'
      })
    expect(groupCreationResponse.status).toBe(201)
    expect(groupCreationResponse.body).toBeDefined()

    // 3. Create TaskList
    const groupId = groupCreationResponse.body.groupId
    const taskListCreationResponse = await supertest
      .post(`/groups/${groupId}/tasks/`)
      .send({
        name: "New List"
      })
    expect(taskListCreationResponse.status).toBe(201)
    expect(taskListCreationResponse.body).toBeDefined()

    // 4. Create Task x5
    const listId = taskListCreationResponse.body.listId
    const taskIds = []
    const total = 5
    for (let index = 0; index < total; index++) {
      const taskCreationResponse = await supertest
        .post(`/groups/${groupId}/tasks/${listId}/`)
        .auth(token, { type: 'bearer'})
        .send({
          name: 'New Task ' + index,
          description: 'Task number ' + index + ' of ' + total + '.'
        })

      expect(taskCreationResponse.status).toBe(201)
      expect(taskCreationResponse.body).toBeDefined()
      taskIds.push(taskCreationResponse.body.taskId)
    }

    // 5. Check off Tasks
    const secondTaskId = taskIds[1]
    const thirdTaskId = taskIds[2]
    const checkOffSecondResponse = await supertest
      .patch(`/groups/${groupId}/tasks/${listId}/${secondTaskId}`)
      .send({
        completion: 100
      })
    const checkOffThirdResponse = await supertest
      .patch(`/groups/${groupId}/tasks/${listId}/${thirdTaskId}`)
      .send({
        completion: 100
      })
    expect(checkOffSecondResponse.status).toBe(201)
    expect(checkOffSecondResponse.body).toBe({
      taskId: secondTaskId,
      name: 'New Task 1',
      description: 'Task number 1 of 5'
    })
    expect(checkOffThirdResponse.status).toBe(201)
    expect(checkOffThirdResponse.body).toBe({
      taskId: thirdTaskId,
      name: 'New Task 2',
      description: 'Task number 2 of 5'
    })
  })
})
