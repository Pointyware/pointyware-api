import { describe, test, expect } from 'vitest'
import { SqliteAccountDatabase } from './sqlite-account-database.mjs'


describe('SQLite Account Database', () => {
  
  test('login', () => {
    const database = new SqliteAccountDatabase()

    expect(database).toBeTruthy()
  })
})
