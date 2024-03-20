import { type BasicResponse } from './types'
import { type IHelloController } from './interfaces'
import { LogSucess } from '../utils/logger'

export class HelloController implements IHelloController {
  public async getMessage (name?: string | undefined): Promise<BasicResponse> {
    LogSucess('[/api/hello] GET request')

    return {
      message: `Hello ${name ?? 'World!'}`
    }
  }
}
