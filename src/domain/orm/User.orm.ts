import { userEntity } from '../entities/User.entity'
import { LogError } from '../../utils/logger'
import { type IUser } from '../interfaces/IUser.interface'
import { type UserResponse } from './types/UsersResponse.type'

/**
 * Method to obtain all Users from Collections "Users" in MongoDB
 */
export const getAllUsers = async (page: number, limit: number): Promise<UserResponse | undefined> => {
  try {
    const userModel = userEntity()

    const response: UserResponse = {
      users: [],
      totalPages: 1,
      currentPage: page
    }

    // Search all user (using pagination)
    await userModel.find({}, { password: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users
      })

    // Count total documents in collection "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`)
  }
}
// -> Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.findById(id, { password: 0 })
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting user by ID: ${error}`)
  }
}

// -> Delete User by ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.deleteOne({ _id: id })
  } catch (error: any) {
    LogError(`[ORM ERROR]: Deleting user by ID: ${error}`)
  }
}

// -> Create new user
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.create(user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Creating User: ${error}`)
  }
}

// -> Update user by ID
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Updating User: ${error}`)
  }
}
