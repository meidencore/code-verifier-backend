import { LogError } from '../../utils/logger'
import { type IUser } from '../interfaces/IUser.interface'
import { userEntity } from '../entities/User.entity'
import { type IAuth } from '../interfaces/IAuth.interface'
import dotenv from 'dotenv'

// Bcrypt for passwords
import bcrypt from 'bcrypt'
// JWT
import jwt from 'jsonwebtoken'

// COnfiguration of dotenv
dotenv.config()

// Obtain Secret Key to generate JWT

// const secret = process.env.SECRETKEY

/**
 * TODO Docs for this method
 * @param user
 */
// -> Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / insert new User
    return await userModel.create(user)
  } catch (error: any) {
    LogError(`[ORM ERROR]: Registering User: ${error}`)
    // Duplicated email Error
    throw new Error(`[ORM ERROR]: ${error}`)
  }
}

/**
 * TODO Docs for this method
 * @param user
 */
// -> Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  const userModel = userEntity()
  let userFound: IUser | undefined
  let token

  // Find User by Email
  await userModel.findOne({ email: auth.email }, { _id: 0, email: 1, password: 1, name: 1 }).then((user: IUser) => {
    userFound = user
    const validPassword = bcrypt.compareSync(auth.password, userFound?.password)

    // Check if password is valid
    if (!validPassword) {
      LogError('[ORM ERROR]: Authentication Error, User not found')
      throw new Error('[ORM ERROR]: Authentication Error, User not found')
    }

    // Check if ENV variable word, exist to generate an JWt
    if (process.env.SECRETKEY) {
      const secret: string = process.env.SECRETKEY
      // Generate our JWT
      token = jwt.sign({ email: user.email }, secret, {
        expiresIn: '2h'
      })
    } else {
      LogError('[ORM ERROR]: JWT generation Error, ENV variable does not exist')
      throw new Error('[ORM ERROR]: JWT generation Error, ENV variable does not exist')
    }
  }).catch((error) => {
    LogError('[ORM ERROR]: Authentication Error, User not found')
    throw new Error(`[ORM ERROR]: Authentication Error, User not found ${error}`)
  })

  return {
    user: userFound,
    token
  }
}

/**
 * TODO Docs for this method
 * @param user
 */
// -> Logout User
export const logoutUser = async (user: IUser): Promise<any | undefined> => {
  // TODO NOT IMPLEMENTED
  // try {
  //   const userModel = userEntity()
  // } catch (error: any) {
  //   LogError(`[ORM ERROR]: logout User: ${error}`)
  // }
}
