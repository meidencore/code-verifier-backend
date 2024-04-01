import { type Chalk } from 'chalk'

export interface ILogger {
  infoColor: Chalk
  WarnColor: Chalk
  SuccessColor: Chalk
  ErrorColor: Chalk
  LogInfo: (message: string) => void
  LogWarn: (message: string) => void
  LogSuccess: (message: string) => void
  LogError: (message: string) => void
}
