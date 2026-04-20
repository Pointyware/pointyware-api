import pg from "pg";



/**
 * Provides a simplified, minimal interface for interacting with 
 */
export class PgFacade {

  static getPool(
    app:string,
    username:string,password:string,
    hostName:string,port:number,
    databasePath:string
  ): pg.Pool {
    return new pg.Pool({
      user: username,
      password: password,
      host: hostName,
      port: port,
      database: databasePath,
      // max: number,
      // min: number,
      // Client?: (new() => ClientBase) | undefined,
      onConnect: function(client: pg.ClientBase) {
        console.info(`client connected: `, client)
      },
      application_name: app,
      // ssl: any, // passed directly to node.TLSSocket, supports all tls.connect options
      query_timeout: 3000,
      statement_timeout: 3000,
      // idleTimeoutMillis?: number | undefined | null,
      // log?: ((...messages: any[]) => void) | undefined,
    })
  }
}
