'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const users = User.all()

    return users
  }

  async current ({ auth }) {
    return auth.user
  }

  async store ({ request, response }) {
    const data = request.only([
      'username', 'email', 'password', 'password_confirmation']
    )

    delete data.password_confirmation

    const user = await User.create(data)

    return response.ok({
      user,
      status: 200,
      message: 'Account created successfully',
    })
  }
}

module.exports = UserController
