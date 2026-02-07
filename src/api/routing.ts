

import express from 'express'

export function configureCommentsRouting(api: express.Application) {

  api.get('/comments', async (req, res)=>{
    res.send('Hello Commenter!')
    console.log("Saying Hello to commenter")
  })

}

export function configureProfileRouting(api: express.Application) {
  api.get('/profile', async (req, res)=>{
    
  })
  api.get('/profile', async (req, res)=>{
      
  })
  api.get('/profile', async (req, res)=>{
      
  })
  api.get('/profile', async (req, res)=>{
      
  })
}
