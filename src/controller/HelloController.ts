import { Get, Query, Route, Tags } from 'tsoa'
import { type BasicResponse } from './types'
import { type IHelloController } from './interfaces'
import { LogSucess } from '../utils/logger'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint to retrieve a Message "Hello {name}" in JSON
   * @param {string} name Name of user to be greeted
   * @returns { BasicResponse }Promise of Basic Response
   */
  @Get('/')
  public async getMessage (@Query()name?: string | undefined): Promise<BasicResponse> {
    LogSucess('[/api/hello] GET request')

    return {
      message: `Hello ${name ?? 'World!'}`
    }
  }
}
