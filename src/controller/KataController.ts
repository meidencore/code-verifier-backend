import { type IKataController } from './interfaces'
import { type IKata } from '../domain/interfaces/IKata.interface'
import logger from '../utils/logger'
import { Route, Tags, Get, Post, Put, Delete, Query, Body } from 'tsoa'
import { type BasicResponse, type ErrorResponse } from './types'

// ORM imports
import { getAllKatas, getKataByID, deleteKataById, updateKataById, createKata } from '../domain/orm/Kata.orm'

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKataController {
  /**
   * Endpoint to retrieve Katas in the collection "Katas" of the DB
   * @param {number} page Number of page (default is 1)
   * @param {number} limit Number of the limit of documents to retreive (default is 10)
   * @param {string | undefined} id id to retrieve a kata by ID (optional)
   * @returns Return a list of Katas || return a Kata found by the ID provide
   */
  @Get('/')
  public async getKatas (@Query()page: number, @Query()limit: number, @Query()id?: string | undefined): Promise<any> {
    let response: any = ''

    if (id) {
      logger.LogSuccess(`[api/katas] Get Kata By ID: ${id}`)
      response = await getKataByID(id)
    } else {
      logger.LogSuccess('[/api/katas] Get All Katas Request')
      response = await getAllKatas(page, limit)
    }

    return response
  }

  /**
   * Endpoint to create a new Kata in the collection "Katas" of the DB
   * @param {IKata} kata Kata info to create a new one
   * @returns Message with the completion of the creation
   */

  @Post('/')
  public async createKata (@Body()kata: IKata): Promise<any> {
    let response: BasicResponse | ErrorResponse | undefined

    if (kata) {
      logger.LogInfo('[api/katas] Create New kata')
      await createKata(kata).then((r) => {
        logger.LogSuccess(`[api/katas] Created kata: ${kata.name}`)
        response = {
          message: `kata ${kata.name} created successfully `
        }
      }).catch((err) => {
        logger.LogError(`[/api/katas] ${err}`)
        response = {
          error: `[KATA ERROR]: ${err}`,
          message: 'kata not Created'
        }
      })
    } else {
      logger.LogError('[/api/katas] Create new Kata needs kata Entity')
      response = {
        error: '[KATA ERROR]: Provide all the data needed',
        message: 'kata not created: Please, provide a kata entity to create one'
      }
    }

    return response
  }

  /**
   * Endpoint to delete a Kata in the collection "Katas" of the DB
   * @param {string} id id of a kata to delete
   * @returns Message with the completions of the deletion and a status code
   */
  @Delete('/')
  public async deleteKata (@Query()id: string | undefined): Promise<any> {
    let response: any = ''

    if (id) {
      logger.LogSuccess(`[api/katas] Deleting Kata By ID: ${id}`)
      await deleteKataById(id).then((r) => {
        response = {
          status: 200,
          message: `Kata with id: ${id} deleted successfully`
        }
      }
      )
    } else {
      logger.LogWarn('[/api/katas] Delete Kata Request WITHOUT ID')
      response = {
        status: 400,
        message: 'Please, provide an ID to remove from database'
      }
    }

    return response
  }

  /**
   * Endpoint to update an existing Kata of the collection "Katas" of the DB
   * @param {string} id id of a kata to update
   * @param {IKata} kata object with the fields to update
   * @returns Message with the completions of the update and a status code
   */
  @Put('/')
  public async updateKata (@Query()id: string | undefined, @Body()kata: IKata): Promise<any> {
    let response: any = ''

    if (id) {
      logger.LogSuccess(`[api/katas] Updating Kata By ID: ${id}`)
      await updateKataById(id, kata).then((r) => {
        response = {
          status: 200,
          message: `Kata with id: ${id} updated successfully`
        }
      }
      )
    } else {
      logger.LogWarn('[/api/katas] Update Kata Request WITHOUT ID')
      response = {
        status: 400,
        message: 'Please, provide an ID to update an existing Kata'
      }
    }

    return response
  }
}
