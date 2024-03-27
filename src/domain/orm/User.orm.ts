import { userEntity } from '../entities/User.entity'
import { LogError } from '../../utils/logger'

// CRUD

/**
 * Method to obtain all Users from Collections "Users" in MongoDB
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    // Search all users
    return await userModel.find()
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`)
  }
}
// -> Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()
    return await userModel.findById(id)
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

// TODO
// -> Get User by email
