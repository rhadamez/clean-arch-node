import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAccount } from '@/domain/models/facebook-account'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AccessToken } from '@/domain/models'

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor(
    private facebookApi: LoadFacebookUserApi,
    private userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private crypto: TokenGenerator
  ) { }

  async perform(params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)
      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
