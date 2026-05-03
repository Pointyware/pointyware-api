
import { describe, test, expect } from 'vitest'

import { Databases } from './databases'
import { randomUUID, UUID } from "crypto";

interface KeyType {
  id: UUID
}
interface InfoType {
  info: string
}
interface FullType {
  id: UUID
  info: string
}

function TestDao() {
  const dao = new Databases.TestResourceDao<KeyType, InfoType>(
    (info:InfoType)=>{
      return {
        id: randomUUID(),
        ...info
      }
    },
    (resource:FullType)=> {
      return { id: resource.id }
    }
  )
  return dao
}

function newInfo() {
  return { info: `This is invocation ${console.count()}`}
}


describe('Databases', ()=>{
  describe('TestResourceDao', ()=>{
    describe('InitialState', ()=>{
      test('collection is empty',()=> {
        const dao = TestDao()
        expect(dao.collection.size).toBe(0)
      })
    })
    describe('Creating New Objects', ()=> {
      test('identical information creates new objects', ()=>{
        const dao = TestDao()
        const dummyInfo = {
          info: "this is all the same"
        }
        dao.create(dummyInfo)
        expect(dao.collection.size).toBe(1)
        dao.create(dummyInfo)
        expect(dao.collection.size).toBe(2)
        dao.create(dummyInfo)
        expect(dao.collection.size).toBe(3)
      })
      test('new information creates new objects', () => {
        const dao = TestDao()
        dao.create(newInfo())
        expect(dao.collection.size).toBe(1)
        dao.create(newInfo())
        expect(dao.collection.size).toBe(2)
        dao.create(newInfo())
        expect(dao.collection.size).toBe(3)
      })
    })

    describe('Reading Objects', ()=>{
      test('Reading an object with unknown id throws DoesNotExistError',()=>{
        const dao = TestDao()
        const expected = {id:randomUUID()}
        // expect(()=>{dao.read(expected)}).toThrow(DoesNotExistError)
      })
      test('Reading an object with known id returns the object',async ()=>{
        const dao = TestDao()
        const expected = newInfo()
        const newObj = await dao.create(expected)
        expect(newObj.info).toBe(expected.info)
        const result = await dao.read({id:newObj.id})
        expect(result).toBe(newObj)
      })
    })

    describe('Updating Objects', ()=>{
      test('Updating an object with unknown id throws DoesNotExistError',()=>{
        const dao = TestDao()
        const expected = {id:randomUUID()}
        // expect(()=>{dao.update(expected, newInfo())}).toThrow(DoesNotExistError)
      })
      test('Updating an object with known id',async ()=>{
        const dao = TestDao()
        const expected = newInfo()
        const newObj = await dao.create(expected)
        const key = {id:newObj.id}
        expect(newObj.info).toBe(expected.info)
        const updateInfo = newInfo()
        const updatedObj = await dao.update(key, updateInfo)
        expect(updatedObj.info).toBe(updateInfo.info)
        expect(updatedObj.id).toBe(newObj.id)
        const readObj = await dao.read(key)
        expect(readObj).toBe(updatedObj)
      })
    })

    describe('Deleting Objects', ()=>{
      test('Deleting an object with uknonwn id throws DoesNotExistError',()=>{
        const dao = TestDao()
        const key = {id:randomUUID()}
        // expect(()=>{dao.delete(expected, newInfo())}).toThrow(DoesNotExistError)
      })
      test("Deleting an object with a known id",async ()=>{
        const dao = TestDao()
        const expected = newInfo()
        const newObj = await dao.create(expected)
        const key = {id:newObj.id}
        expect(newObj.info).toBe(expected.info)
        await dao.delete(key)
        expect(dao.collection.size).toBe(0)
      })
    })
  })
})
