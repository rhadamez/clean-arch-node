import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { mock } from 'jest-mock-extended'

class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com/auth/access_token'

  constructor(
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) { }

  async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }
}

interface HttpGetClient {
  get(params: HttpGetClient.Params): Promise<void>
}

namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}

describe('FacebookApi', () => {
  const clientId = 'any_client_id'
  const clientSecret = 'any_client_secret'

  it('should get app token', async () => {
    const httpClient = mock<HttpGetClient>()
    const sut = new FacebookApi(httpClient, clientId, clientSecret)

    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/auth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })
})