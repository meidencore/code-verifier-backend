import { userEntity } from '../entities/User.entity'

import { LogError, LogSucess } from '@/utils/logger'

// CRUD

/**
 * Method to obtain all Users from Collections "Users" in MongoDB
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    // Search all users
    return await userModel.find({ isDeleted: false })
  } catch (error: any) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`)
  }
}

// TODO
// -> Get User by ID
// -> Get User by email
// -> Delete User by ID
// -> Create new user
// -> Update user by ID
