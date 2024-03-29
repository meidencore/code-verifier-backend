import express, { query, type Request, type Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { LogInfo } from '../utils/logger'
import { type IUser } from '../domain/interfaces/IUser.interface'

// Bcrypt for passwords
import bcrypt from 'bcrypt'
import { type IAuth } from '../domain/interfaces/IAuth.interface'

// Middleware
import { verifyToken } from '../middlewares/verifyToken.middlewares'

// BodyParser
import bodyParser from 'body-parser'

// Middleware to read the json in body
const jsonParser = bodyParser.json()

// Router from Express
const authRouter = express.Router()

authRouter.route('/register')
  // POST ->
  .post(jsonParser, async (req: Request, res: Response) => {
    const { name, password, email, age } = req?.body

    if (name && password && email && age) {
      // Obtain the password in the request nd cypher
      const hashPassword = bcrypt.hashSync(password, 8)

      const newUser: IUser = {
        name,
        email,
        password: hashPassword,
        age
      }

      // Instance the controller to execute
      const controller: AuthController = new AuthController()

      // Obtain Response
      const response: any = await controller.registerUser(newUser)

      // Send to the client the response
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR: User data missing]No User can be registered'
      })
    }
  })

authRouter.route('/login')
  // POST ->
  .post(jsonParser, async (req: Request, res: Response) => {
    const { email, password } = req?.body

    if (password && email) {
      // Instance the controller to execute
      const controller: AuthController = new AuthController()

      const auth: IAuth = {
        email,
        password
      }

      // Obtain Response
      const response: any = await controller.loginUser(auth)

      // Send to the client the response which include the JWT to authorize request
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR: User data missing] No User can be logged in'
      })
    }
  })

// Protected Routed by Verify token middleware

authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the ID of Users to check it's data
    const id: any = req?.query?.id

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController()
      // obtain the response
      const response: any = await controller.userData(id)
      // Send to the client
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'Not Authorize to perform this action'
      })
    }
  })

export default authRouter
