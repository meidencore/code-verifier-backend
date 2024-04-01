/**
 * Root Router
 * Redirections to Routers
 */

import express, { type Request, type Response } from 'express'
import helloRouter from './HelloRouter'
import usersRouter from './UserRouter'
import authRouter from './AuthRouter'
import kataRouter from './KataRouter'
import logger from '../utils/logger'

// * server instance
const server = express()

// * Router Instance
const rootRouter = express.Router()

// * Activate for requests to http://localhost:8000/api
// GET -> http://localhost:8000/api/

rootRouter.get('/', (req: Request, res: Response) => {
  logger.LogInfo('GET: http://localhost:8000/api/')
  // send Hello World
  res.send('Welcome to APP Express + TS + Swagger + Mongoose')
})

// Redirections to Router & Controllers

server.use('/', rootRouter) // http://localhost:8000/api --> rootRouter
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> helloRouter
server.use('/users', usersRouter) // http://localhost:8000/api/users --> usersRouter
server.use('/auth', authRouter) // http://localhost:8000/api/auth --> authRouter
server.use('/katas', kataRouter) // http://localhost:8000/api/katas --> katasRouter
// Add more router to the app

export default server
