import express, { type Request, type Response } from 'express'
import { HelloController } from '../controller/HelloController'
import logger from '../utils/logger'
import { type BasicResponse } from '../controller/types'

// Router from express
const helloRouter = express.Router()

// http://localhost:8000/api/hello/
helloRouter.route('/')
  // GET ->
  .get(async (req: Request, res: Response) => {
    // Obtain query param
    const name: any = req?.query?.name // TODO Type name var
    logger.LogInfo(`Query param: ${name}`)
    // Instace the controller to execute
    const controller: HelloController = new HelloController()
    // Obtain Response
    const response: BasicResponse = await controller.getMessage(name)
    // Send to the client the response
    return res.send(response)
  })

// Export helloRouter

export default helloRouter
