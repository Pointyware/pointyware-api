
import express from 'express'
import { configureCommentsRouting } from './api/resource-routing.js'
import { configureProfileRouting } from './api/resource-routing.js'

export default async function startApi(port:number) {
  const api = express()

  // Setup API Routing
  configureCommentsRouting(api)
  configureProfileRouting(api)

  api.listen(port, ()=> {
    console.log('API service is running')
  })
}
