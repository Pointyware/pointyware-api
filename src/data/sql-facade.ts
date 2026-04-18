
export interface Result {

}
export interface SqlPool {
  getClient(): SqlClient
}

/**
 * 
 */
export interface SqlFacade {
  getPool(): SqlPool
}

export interface SqlClient {
  /**
   * 
   * @param query 
   */
  query(query:string):Result
  /**
   * 
   * @param query 
   */
  statement(query:string):void|number
}