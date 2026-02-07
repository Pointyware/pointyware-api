
import express from 'express'
import { configureCommentsRouting } from './api/routing.js'

export default function startApi(port:number) {
  const api = express()

  // Setup API Routing
  configureCommentsRouting(api)
  configureProfileRouting(api)

  api.listen(port, ()=> {
    console.log('API service is running')
  })
}
