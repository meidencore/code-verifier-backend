import { Body, Get, Post, Query, Route, Tags } from 'tsoa'
import { type IAuthController } from './interfaces'
import logger from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// ORM Imports
import { registerUser, loginUser } from '../../src/domain/orm/Auth.orm'
import { type ErrorResponse, type AuthResponse, type BasicResponse } from './types'
import { getUserByID } from '../../src/domain/orm/User.orm'

@Route('api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  /**
   * Endpint to create an users in the collection "Users" of the DB
   * @param {IUser} user user info
   * @returns message informing if creation was correct
   */
  @Post('/register')
  public async registerUser (@Body()user: IUser): Promise<any> {
    let response: BasicResponse | ErrorResponse | undefined

    if (user) {
      logger.LogInfo('[api/auth/register] Register New User')
      await registerUser(user).then((r) => {
        logger.LogSuccess(`[api/auth/register] Created User: ${user.name}`)
        response = {
          message: `User ${user.name} created successfully `
        }
      }).catch((err) => {
        logger.LogError(`[/api/auth/register] ${err}`)
        response = {
          error: `[AUTH ERROR]: ${err}`,
          message: 'User not Registered'
        }
      })
    } else {
      logger.LogError('[/api/auth/register] Register needs User Entity')
      response = {
        error: '[AUTH ERROR]: Provide all the data needed',
        message: 'User not Registered: Please, provide a User entity to create one'
      }
    }

    return response
  }

  @Post('/login')
  public async loginUser (@Body()authCredentials: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined
    if (authCredentials) {
      logger.LogSuccess('[api/auth/login] Login User')
      const data = await loginUser(authCredentials)
      response = {
        message: `User ${data.user.name} logged in successfully`,
        token: data.token // JWT generated for logged user
      }
    } else {
      logger.LogError('[/api/auth/login] login needs auth')
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a User entity to register'
      }
    }
    return response
  }

  /**
   * Endpoint to retrieve the User in the Collection "Users" of DB
   * Middleware: Validate JWT
   * in headers you must add the x-access-token with a valid JWT
   * @param {string} id Id of users to retrieve
   * @returns return the user found
   */
  @Get('/me')
  public async userData (@Query()id: string): Promise<any> {
    let response: any = ''

    if (id) {
      logger.LogSuccess(`[api/users] Get User Data By ID: ${id}`)
      response = await getUserByID(id)
    }

    return response
  }

  @Post('/logout')
  public async logoutUser (@Body()auth: any): Promise<any> {
    // TODO close session of user
    logger.LogSuccess('success')
  }
}
