/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { Exception } from '@poppinss/utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new InvalidCredentialException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InvalidCredentialException extends Exception {
  constructor (message: string, status: number, code: string) {
    super(message, status, code)
  }
}
