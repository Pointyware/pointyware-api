import { DoesNotExistError } from "./errors.js"
import { UnimplementedError } from "./service-errors.js"

/**
 * Defines types for the data layer, where databases and their components 
 * reside.
 */
export namespace Databases {

  /**
   * A Data Access Object for a single resource type.
   * 
   * @template RD The resource description.
   * @template ID The resource id.
   * @template FR The full resource.
   */
  export interface ResourceDao<RD, ID, FR> {
    create(resource: RD): Promise<FR>
    read(id: ID): Promise<FR>
    update(id: ID, resource: RD): Promise<FR>
    delete(id: ID): Promise<void>
  }

  export class TestResourceDao<ID, RD> implements ResourceDao<RD, ID, RD & ID>{
    collection:Map<string,RD & ID>
    resourceFactory:(description:RD)=>RD & ID
    keyGetter:(resource:RD & ID)=>ID
    constructor(resourceFactory:(description:RD)=>RD & ID,keyGetter:(resource:RD & ID)=>ID) {
      this.collection = new Map()
      this.resourceFactory = resourceFactory
      this.keyGetter = keyGetter
    }
    async create(resource: RD): Promise<RD & ID> {
      const result = this.resourceFactory(resource)
      const key = this.keyGetter(result)
      const keyString = JSON.stringify(key)
      this.collection.set(keyString, result)
      return result
    }
    async read(id: ID): Promise<RD & ID> {
      const keyString = JSON.stringify(id)
      const result = this.collection.get(keyString)
      if (result) return result
      throw new DoesNotExistError(`${id}`)
    }
    async update(id: ID, resource: RD): Promise<RD & ID> {
      const keyString = JSON.stringify(id)
      const result = this.collection.get(keyString)
      if (result) {
        const newObj = {
          ...resource,
          ...id
        }
        this.collection.set(keyString, newObj)
        return newObj
      }
      throw new DoesNotExistError(`${id}`)
    }
    async delete(id: ID): Promise<void> {
      const keyString = JSON.stringify(id)
      if (!this.collection.delete(keyString)) throw new DoesNotExistError(`${id}`)
    }
  }
}
