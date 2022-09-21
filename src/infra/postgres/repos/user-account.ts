import { DataSource } from 'typeorm'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '../entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params
type SaveResult = SaveFacebookAccountRepository.Result

export class PgUserAccountRepository implements LoadUserAccountRepository {
  constructor(private dataSource: DataSource) { }

  async load(params:LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.dataSource.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ where: { email: params.email } })
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.email
      }
    }
    return undefined
  }

  async saveWithFacebook(params: SaveParams): Promise<SaveResult> {
    let id: string
    const pgUserRepo = this.dataSource.getRepository(PgUser)
    if (!params.id) {
      const pgUser = await pgUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
      id = pgUser.id.toString()
    } else {
      id = params.id
      await pgUserRepo.update({
        id: parseInt(params.id)
      }, {
        name: params.name,
        facebookId: params.facebookId
      })
    }

    return { id }
  }
}
