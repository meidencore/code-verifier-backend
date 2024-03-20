import express, { type Express, type Request, type Response } from 'express'

// * Security
import cors from 'cors'
import helmet from 'helmet'

// TODO https

// * root Router
import router from '../routes'

// * Create Express server
const server: Express = express()

// * Define SERVER to use "/api" and use rootRouter from "index.ts" in routes
// from this point onover ==> http://localhost:8000/api/...
server.use(
  '/api',
  router
)

// TODO mongoose connection

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
