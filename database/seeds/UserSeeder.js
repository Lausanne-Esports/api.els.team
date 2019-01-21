'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.findOrCreate({ username: 'test', email: 'test@test.dev', password: 'secret', account_status: 'active' })
  }
}

module.exports = UserSeeder
