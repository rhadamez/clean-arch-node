import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError, ServerError } from '../errors/http'
import { badRequest, HttpResponse, unauthorized } from '../helpers'

export class FacebookLoginController {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })

      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      } else {
        return unauthorized()
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        data: new ServerError(error)
      }
    }
  }
}