'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

class ForceJson {
  async handle ({ request }, next) {
    request.request.headers.accept = 'application/json'

    // call next to advance the request
    await next()
  }
}

module.exports = ForceJson
