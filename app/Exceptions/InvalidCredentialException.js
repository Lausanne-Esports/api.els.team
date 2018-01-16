'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidCredentialException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = InvalidCredentialException
