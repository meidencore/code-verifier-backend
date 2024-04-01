import { userEntity } from '../entities/User.entity'
import { kataEntity } from '../entities/Kata.entity'
import { type IUser } from '../interfaces/IUser.interface'
import { type UserResponse } from './types/UsersResponse.type'
import logger from '../../utils/logger'
import { totalPages } from './utils/pagination'
import { type KataResponse } from './types/KataResponse.type'

/**
 * Method to obtain all Users from Collections "Users" in MongoDB
 */
export const getAllUsers = async (page: number, limit: number): Promise<UserResponse | undefined> => {
  try {
    const userModel = userEntity()

    const response: UserResponse = {
      users: [],
      totalPages: await totalPages(userModel, limit),
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

    return response
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Getting all users: ${error}`)
  }
}
// -> Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.findById(id, { password: 0 })
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Getting user by ID: ${error}`)
  }
}

// -> Delete User by ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.deleteOne({ _id: id })
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Deleting user by ID: ${error}`)
  }
}

// -> Update user by ID
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Updating User: ${error}`)
  }
}

// -> Get Katas from User
export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<KataResponse | undefined> => {
  try {
    const userModel = userEntity()
    const kataModel = kataEntity()

    const response: KataResponse = {
      katas: [],
      totalPages: 1,
      currentPage: page
    }
    // Search for a user by Id
    const user: IUser | null = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    // Set the total pages
    response.totalPages = await totalPages(kataModel, limit, { _id: { $in: user.katas } })

    // Get all the Katas on the katas Array of the User found, using pagination
    response.katas = await kataModel.find({ _id: { $in: user.katas } })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
    // return the response to the controller
    return response
  } catch (error: any) {
    logger.LogError(`[ORM ERROR] Obtaining User: ${error}`)
  }
}
