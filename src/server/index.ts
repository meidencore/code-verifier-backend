import express, { type Express, type Request, type Response } from 'express'

// * Swagger
import swaggerUi from 'swagger-ui-express'

// * Security
import cors from 'cors'
import helmet from 'helmet'

// TODO https

// * root Router
import router from '../routes'
import mongoose from 'mongoose'
import { LogError } from '../utils/logger'

// * Create Express server
const server: Express = express()

// * Swagger Config
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  })
)

// * Define SERVER to use "/api" and use rootRouter from "index.ts" in routes
// from this point onover ==> http://localhost:8000/api/...
server.use(
  '/api',
  router
)

// Static Server
server.use(express.static('public'))

// * mongoose connection
try {
  void mongoose.connect('mongodb://0.0.0.0:27017/codeverification')
} catch (error: any) {
  LogError(`[MONGOOSE ERROR] Error when try to connecto to the DB: ${error}`)
}

// * Security Config
server.use(helmet())
server.use(cors())

// * Content Type config
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// * Redirections Config
// http://localhost:8000/ ===> http://localhost:8000/api
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
