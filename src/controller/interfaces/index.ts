import { type IKata } from '../../domain/interfaces/IKata.interface'
import { type IUser } from '../../domain/interfaces/IUser.interface'
import { type BasicResponse } from '../types'

// TODO implements all types (remove type any)

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUsersController {
  // Read all Users from database || Get one user by ID
  getUsers: (page: number, limit: number, id?: string) => Promise<any>
  // Get Katas by User
  getKatas: (page: number, limit: number, id: string) => Promise<any>
  // Delete user by ID
  deleteUser: (id?: string) => Promise<any>
  // Update user by ID
  updateUser: (id: string, user: IUser) => Promise<any>
}

export interface IAuthController {
  // Register Users
  registerUser: (user: IUser) => Promise<any>
  // Login User
  loginUser: (auth: any) => Promise<any>
}

export interface IKataController {
  // Read all Katas from database || Get one Kata by ID
  getKatas: (page: number, limit: number, id?: string) => Promise<any>
  // Create new kata
  createKata: (kata: IKata) => Promise<any>
  // Delete kata by ID
  deleteKata: (id?: string) => Promise<any>
  // Update kata by ID
  updateKata: (id: string, kata: IKata) => Promise<any>
}
