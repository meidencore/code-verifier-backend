import dotenv from 'dotenv'
import server from './src/server'
import logger from './src/utils/logger'

// * configuration the .env file
dotenv.config()

const port: string | number = process.env.PORT ?? 1234

// * Execute SERVER
server.listen(port, () => {
  logger.LogSuccess(`[SERVER ON]: Running on http://localhost:${port}/api`)
})

// * Control SERVER ERROR
server.on('error', (error) => {
  const errorMessage: string = error.toString()
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.LogError(`[SERVER ERROR]: ${errorMessage}`)
})
