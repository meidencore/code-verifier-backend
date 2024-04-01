import chalk from 'chalk'
import { type ILogger } from './interfaces/ILogger.interface'

class Logger implements ILogger {
  infoColor = chalk.blue
  WarnColor = chalk.yellow
  SuccessColor = chalk.green
  ErrorColor = chalk.red

  LogInfo (message: string): void {
    console.log(this.infoColor(`Info: ${message}`))
  }

  LogWarn (message: string): void {
    console.log(this.WarnColor(`Warn: ${message}`))
  }

  LogSuccess (message: string): void {
    console.log(this.SuccessColor(`Success: ${message}`))
  }

  LogError (message: string): void {
    console.log(this.ErrorColor(`Error: ${message}`))
  }
}

const logger = new Logger()

export default logger
