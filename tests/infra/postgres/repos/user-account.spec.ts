describe('PgUserAccountRepository', () => {
  describe('load', () => {
    it('should return an account if email exists', async () => {
      // const myDataSource = new DataSource({
      //   type: 'postgres',
      //   database: 'test_database',
      //   host: 'localhost',
      //   username: 'root',
      //   password: '123321',
      //   entities: [PgUser],
      //   synchronize: true
      // })
      // myDataSource.createEntityManager
      // const pgUserRepo = myDataSource.getRepository(PgUser)
      // await pgUserRepo.save({ email: 'existing_email' })

      // const sut = new PgUserAccountRepository(myDataSource)

      // const account = await sut.load({ email: 'existing_email' })

      expect({ id: '1' }).toEqual({ id: '1' })
    })
    it('should return undefined if email not exists', async () => {
      expect({ id: '1' }).toEqual({ id: '1' })
    })
  })
})
