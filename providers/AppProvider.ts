/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { IocContract } from '@adonisjs/fold'

export default class AppProvider {
  constructor (protected $container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public boot () {
    // IoC container is ready
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}
