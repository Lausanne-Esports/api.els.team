'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.findOrCreate({ username: 'romain.lanz', email: 'romain.lanz@slynova.ch', password: 'secret', account_status: 'active' })
  }
}

module.exports = UserSeeder
