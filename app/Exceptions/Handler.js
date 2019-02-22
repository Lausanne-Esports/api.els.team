'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { response }) {
    if (error.code === 'E_INVALID_CREDENTIAL') {
      return response.status(error.status).send({
        errors: [{
          status: error.status,
          code: error.code,
          detail: error.message,
        }],
      })
    }

    if (error.code === 'E_MISSING_DATABASE_ROW') {
      return response.status(404).send({
        errors: [{
          status: 404,
          code: 'E_MODEL_NOT_FOUND',
          detail: 'The requested model cannot be found',
        }],
      })
    }

    return super.handle(...arguments)
  }
}

module.exports = ExceptionHandler
