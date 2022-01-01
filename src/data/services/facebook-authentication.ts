import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAccount } from '@/domain/models/facebook-account'

export class FacebookAuthenticationService {
  constructor(
    private facebookApi: LoadFacebookUserApi,
    private userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepo.saveWithFacebook(fbAccount)
    }

    return new AuthenticationError()
  }
}
