import { type IUser } from '../../domain/interfaces/IUser.interface'
import { type BasicResponse } from '../types'

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUsersController {
  // Read all Users from database || Get one user by ID
  getUsers: (page: number, limit: number, id?: string) => Promise<any>
  // Delete user by ID
  deleteUser: (id?: string) => Promise<any>
  // Create new User
  updateUser: (id: string, user: any) => Promise<any>
}

export interface IAuthController {
  // Register Users
  registerUser: (user: IUser) => Promise<any>
  // Login User
  loginUser: (auth: any) => Promise<any>
}
