import express, { type Request, type Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken.middlewares'
import logger from '../utils/logger'
import { KatasController } from '../controller/KataController'
import { type IKata } from '../domain/interfaces/IKata.interface'

// BodyParser
import bodyParser from 'body-parser'

// Middleware to read the json in body
const jsonParser = bodyParser.json()

const kataRouter = express.Router()

kataRouter.route('/')
  // GET ->
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain query param
    const page: any = req?.query?.page ?? 1
    const limit: any = req?.query?.limit ?? 10
    const id: any = req?.query?.id
    logger.LogInfo(`Query param: id:${id}, page:${page}, limit:${limit}`)
    // Instance the controller to execute
    const controller: KatasController = new KatasController()
    // Obtain Response
    const response = await controller.getKatas(page, limit, id)
    // Send to the client the response
    return res.status(200).send(response)
  })
  // POST ->
  .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtain the data from the body
    const { name, description, level, creator, solution } = req?.body

    if (name) {
      const newKata: IKata = {
        name,
        description,
        level,
        intents: 0,
        stars: 0,
        creator,
        solution,
        participants: []
      }

      // Instance the controller to execute
      const controller: KatasController = new KatasController()

      // Obtain Response
      const response: any = await controller.createKata(newKata)

      // Send to the client the response
      return res.status(201).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR: Kata data missing] No Kata can be created'
      })
    }
  })
  // PUT ->
  .put(verifyToken, jsonParser, async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id

    // Obtain the data from the body
    const { name, description, level, intents, stars, creator, solution, participants } = req?.body

    if (name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
      const kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants
      }

      // Controller Instance to execute method
      const controller: KatasController = new KatasController()
      // Obtain Response
      const response = await controller.updateKata(id, kata)
      // Send to the client the response
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(200).send({
        message: '[ERROR] Updating kata. You need to send all atts of Kata to update it'
      })
    }
  })
  // DELETE ->
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain query param
    const id: any = req?.query?.id
    logger.LogInfo(`Query param: id:${id}`)
    // Controller Instance to execute method
    const controller: KatasController = new KatasController()
    // Obtain Response
    const response = await controller.deleteKata(id)
    // Send to the client the response
    return res.status(200).send(response)
  })

export default kataRouter
