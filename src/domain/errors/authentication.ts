export class AuthenticationError extends Error {
  constructor() {
    super('Authentication failed')
    this.name = 'Authentication failed'
  }
}
