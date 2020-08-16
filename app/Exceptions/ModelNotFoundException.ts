import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new ModelNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ModelNotFoundException extends Exception {
  constructor (message: string) {
    super(message, 404)
  }

  public async handle (error: this, { response }: HttpContextContract) {
    response
      .status(error.status)
      .send({
        errors: [{
          status: 404,
          code: 'E_MODEL_NOT_FOUND',
          detail: 'The requested model cannot be found',
        }],
      })
  }
}
