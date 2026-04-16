import { describe, test, expect } from 'vitest'
import { AuthDatabase } from './auth-db.js'

describe('Auth Database', () => {
  
  test('login', () => {
    const database = new AuthDatabase()

    expect(database).toBeTruthy()
  })
})
