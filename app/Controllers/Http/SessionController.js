'use strict'

const InvalidCredential = use('App/Exceptions/InvalidCredentialException')

class SessionController {
  async store ({ auth, request, response }) {
    const { email, password } = request.all()

    await auth.attempt(email, password)
      .catch((e) => {
        throw new InvalidCredential('Authentication failed. Either supplied credentials are invalid or the account is inactive', 401, 'E_INVALID_CREDENTIAL')
      })

    return response.ok({
      status: 200,
      message: 'Logged in successfully',
    })
  }

  async destroy ({ auth, response }) {
    await auth.logout()

    return response.ok({
      status: 200,
      message: 'Logged out successfully',
    })
  }
}

module.exports = SessionController
