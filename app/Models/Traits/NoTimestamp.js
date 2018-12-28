'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

class NoTimestamp {
  register (Model) {
    Object.defineProperty(Model, 'createdAtColumn', {
      get () { return null }
    })

    Object.defineProperty(Model, 'updatedAtColumn', {
      get () { return null }
    })
  }
}

module.exports = NoTimestamp
