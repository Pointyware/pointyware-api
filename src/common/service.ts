import express from "express";

export abstract class Service {
  app:express.Application
  constructor() {
    this.app = express()
    this.app.disable('x-powered-by')
  }
  abstract start(port:number):void
}
