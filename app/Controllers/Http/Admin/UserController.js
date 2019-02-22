'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Persona = use('Persona')
const User = use('App/Models/User')
const Encryption = use('Encryption')

class UserController {
  async index () {
    const users = User.all()

    return users
  }

  async current ({ auth }) {
    return auth.user
  }

  async store ({ request, response }) {
    const payload = request.only([
      'username', 'email', 'password', 'password_confirmation'])

    const user = await Persona.register(payload)

    return response.ok({
      user,
      status: 200,
      message: 'Account created successfully',
    })
  }

  async validate ({ request, response }) {
    const token = Encryption.base64Decode(request.input('token'))
    await Persona.verifyEmail(token)

    return response.ok({
      status: 200,
      message: 'Account validated successfully',
    })
  }
}

module.exports = UserController
