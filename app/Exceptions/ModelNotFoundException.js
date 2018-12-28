'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ModelNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    response
      .status(404)
      .send({
        errors: [{
          status: 404,
          code: 'E_MODEL_NOT_FOUND',
          detail: 'The requested model cannot be found',
        }],
      })
  }
}

module.exports = ModelNotFoundException
