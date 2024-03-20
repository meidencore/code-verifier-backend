import dotenv from 'dotenv'
import server from './src/server'
import { LogError, LogSucess } from './src/utils/logger'

// * configuration the .env file
dotenv.config()

const port: string | number = process.env.PORT ?? 8000

// * Execute SERVER
server.listen(port, () => {
  LogSucess(`[SERVER ON]: Running on http://localhost:${port}/api`)
})

// * Control SERVER ERROR
server.on('error', (error) => {
  const errorMessage: string = error.toString()
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  LogError(`[SERVER ERROR]: ${errorMessage}`)
})
