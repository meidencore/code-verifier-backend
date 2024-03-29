import { Delete, Get, Put, Query, Route, Tags } from 'tsoa'
import { type IUsersController } from './interfaces'
import { LogSucess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { getAllUsers, getUserByID, deleteUserById, updateUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUsersController {
  /**
   * Endpint to retrieve the users in the collection "Users" of the DB
   * @param {string} id Id of User to retrieve (optional)
   * @returns All users or user found by id
   */
  @Get('/')
  public async getUsers (@Query()id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSucess(`[api/users] Get User By ID: ${id}`)
      response = await getUserByID(id)
    } else {
      LogSucess('[/api/users] Get All Users Request')
      response = await getAllUsers()
    }

    return response
  }

  /**
   * Endpint to delete the users in the collection "Users" of the DB
   * @param {string} id Id of User to delete
   * @returns message informing if deletion was correct
   */
  @Delete('/')
  public async deleteUser (@Query()id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSucess(`[api/users] Deleting User By ID: ${id}`)
      await deleteUserById(id).then((r) => {
        response = {
          status: 200,
          message: `User with id: ${id} deleted successfully`
        }
      }
      )
    } else {
      LogWarning('[/api/users] Delete User Request WITHOUT ID')
      response = {
        status: 400,
        message: 'Please, provide an ID to remove from database'
      }
    }

    return response
  }

  /**
   * Endpint to update an users in the collection "Users" of the DB
   * @param {string} id user id
   * @param {any} user user info
   * @returns message informing if the updating was correct
   */
  @Put('/')
  public async updateUser (id: string, user: any): Promise<any> {
    let response: any = ''

    if (id) {
      LogSucess(`[api/users] Updating User By ID: ${id}`)
      await updateUserById(id, user).then((r) => {
        response = {
          status: 200,
          message: `User with id: ${id} updated successfully`
        }
      }
      )
    } else {
      LogWarning('[/api/users] Update User Request WITHOUT ID')
      response = {
        status: 400,
        message: 'Please, provide an ID to update an existing user'
      }
    }

    return response
  }
}
