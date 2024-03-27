import express, { type Request, type Response } from 'express'
import { UserController } from '../controller/UsersControllers'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/user/ or http://localhost:8000/api/users?id=6601bc101c56890458188944
usersRouter.route('/')
  // GET ->
  .get(async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    LogInfo(`Query param: ${id}`)
    // Instace the controller to execute
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.getUsers(id)
    // Send to the client the response
    return res.send(response)
  })
  // DELETE ->
  .delete(async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    LogInfo(`Query param: ${id}`)
    // Instace the controller to execute
    const controller: UserController = new UserController()
    // Obtain Response
    const response = await controller.deleteUser(id)
    // Send to the client the response
    return res.send(response)
  })
  // POST ->
  .post(async (req: Request, res: Response) => {
    // Obtain query param
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    LogInfo(`Query param: ${name}, ${email}, ${age}`)

    // Instace the controller to execute
    const controller: UserController = new UserController()

    const user = {
      name: name || 'Default',
      email: email || 'Default email',
      age: age || 18
    }

    // Obtain Response
    const response = await controller.createUser(user)
    // Send to the client the response
    return res.send(response)
  })
  // PUT ->
  .put(async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    LogInfo(`Query param: ${id}, ${name}, ${email}, ${age}`)
    // Instace the controller to execute
    const controller: UserController = new UserController()

    const user = {
      name,
      email,
      age
    }

    // Obtain Response
    const response = await controller.updateUser(id, user)
    // Send to the client the response
    return res.send(response)
  })

// Export UserRouter
export default usersRouter
