'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidCredentialException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = InvalidCredentialException
