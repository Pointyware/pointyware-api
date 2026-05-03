
/**
 * 
 */
namespace Databases {
  
  /**
   * 
   * 
   * @template RD The resource description.
   * @template ID The resource id.
   * @template FR The full resource.
   */
  export interface ResourceDatabase<RD,ID,FR> {
    create(resource:RD): Promise<FR>
    read(id:ID): Promise<FR>
    update(id:ID,resource:RD): Promise<FR>
    delete(id:ID): Promise<void>
  }
}
