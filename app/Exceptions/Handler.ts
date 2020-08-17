/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle (error: any, ctx: HttpContextContract) {
    if (error.code === 'E_INVALID_CREDENTIAL') {
      return ctx.response.status(error.status).send({
        errors: [{
          status: error.status,
          code: error.code,
          detail: error.message,
        }],
      })
    }

    if (error.code === 'E_MISSING_DATABASE_ROW') {
      return ctx.response.status(404).send({
        errors: [{
          status: 404,
          code: 'E_MODEL_NOT_FOUND',
          detail: 'The requested model cannot be found',
        }],
      })
    }

    return super.handle(error, ctx)
  }
}
