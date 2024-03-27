import { type BasicResponse } from '../types'

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUsersController {
  // Read all Users from database || Get one user by ID
  getUsers: (id?: string) => Promise<any>
  // Delete user by ID
  deleteUser: (id?: string) => Promise<any>
  // Create new User
  createUser: (user: any) => Promise<any>
  // Update user by ID
  updateUser: (id: string, user: any) => Promise<any>
}
