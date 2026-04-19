import express from "express";

export abstract class Service {
  app:express.Application
  constructor() {
    this.app = express()
  }
  abstract start(port:number):void
}
