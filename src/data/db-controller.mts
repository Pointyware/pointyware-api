

/**
 * Controller for database processes.
 * 
 * 
 */
export interface DbController {
  /**
   * 
   */
  start(): void
  stop(): void
}


export class PgController implements DbController {
  constructor() {

  }
  start(): void {
    throw new Error("Method not implemented.")
  }
  stop(): void {
    throw new Error("Method not implemented.")
  }
}
