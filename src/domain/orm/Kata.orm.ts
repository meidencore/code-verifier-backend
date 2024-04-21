import { kataEntity } from '../entities/Kata.entity'
import logger from '../../utils/logger'
import { type IKata } from '../interfaces/IKata.interface'
import { type KataResponse } from './types/KataResponse.type'
import { totalPages } from './utils/pagination'

/**
 * Method to obtain all Katas from Collections "Katas" in MongoDB
 */
export const getAllKatas = async (page: number, limit: number): Promise<KataResponse | undefined> => {
  try {
    const kataModel = kataEntity()

    const response: KataResponse = {
      katas: [],
      totalPages: await totalPages(kataModel, limit),
      currentPage: page
    }
    // Search all katas (using pagination)
    await kataModel.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas
      })

    return response
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Getting all katas: ${error}`)
  }
}
// -> Get Kata by ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()
    return await kataModel.findById(id, { __v: 0 })
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Getting kata by ID: ${error}`)
  }
}

// -> Delete Kata by ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()
    return await kataModel.deleteOne({ _id: id })
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Deleting kata by ID: ${error}`)
  }
}

// -> Create new kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()
    return await kataModel.create(kata)
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Creating kata: ${error}`)
  }
}

// -> Update kata by ID
export const updateKataById = async (id: string, kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()
    return await kataModel.findByIdAndUpdate(id, kata)
  } catch (error: any) {
    logger.LogError(`[ORM ERROR]: Updating kata: ${error}`)
  }
}
