'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Hashids = require('hashids')
const { ServiceProvider } = require('@adonisjs/fold')

class HashidsProvider extends ServiceProvider {
  register () {
     this.app.singleton('Hashids', () => {
       const Env = this.app.use('Env')
       return new Hashids(Env.get('APP_KEY'), 10)
     })
  }
}

module.exports = HashidsProvider
