import express, { type Request, type Response } from 'express'
import { UserController } from '../controller/UsersControllers'
import { LogInfo } from '../utils/logger'
import { verifyToken } from '../../src/middlewares/verifyToken.middlewares'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/user/ or http://localhost:8000/api/users?id=6601bc101c56890458188944
usersRouter.route('/')
  // GET ->
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain query param
    const page: any = req?.query?.page ?? 1
    const limit: any = req?.query?.limit ?? 10
    const id: any = req?.query?.id
    LogInfo(`Query param: ${id}`)
    // Instance the controller to execute
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.getUsers(page, limit, id)
    // Send to the client the response
    return res.status(200).send(response)
  })
  // DELETE ->
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    LogInfo(`Query param: ${id}`)
    // Instance the controller to execute
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.deleteUser(id)
    // Send to the client the response
    return res.status(response.status).send(response)
  })
  // PUT ->
  .put(verifyToken, async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    LogInfo(`Query param: ${id}, ${name}, ${email}, ${age}`)
    // Instance the controller to execute
    const controller: UserController = new UserController()

    const user = {
      name,
      email,
      age
    }

    // Obtain Response
    const response = await controller.updateUser(id, user)
    // Send to the client the response
    return res.status(response.status).send(response)
  })

// Export User Router
export default usersRouter
