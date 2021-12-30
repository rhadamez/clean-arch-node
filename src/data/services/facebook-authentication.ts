import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '../contracts/apis'

export class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserByTokenApi.loadUser(params)

    return new AuthenticationError()
  }
}
