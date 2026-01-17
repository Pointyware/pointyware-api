
import express from 'express'

const auth = express()
const api = express()

// Setup Auth Routing
auth.get('/', (req, res) => {
  res.send('Hello World')
  console.log("Saying Hello to user")
})

// Setup API Routing
api.get('/comments', async (req, res)=>{
  res.send('Hello Commenter!')
  console.log("Saying Hello to commenter")

  await fetch('http://localhost:3001/')
})

// Start Services
auth.listen(3001, ()=> {
  console.log('Auth service is running')
})
api.listen(3002, ()=> {
  console.log('API service is running')
})
