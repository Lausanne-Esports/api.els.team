/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionStoreValidator from 'App/Validators/SessionStoreValidator'
import InvalidCredentialException from 'App/Exceptions/InvalidCredentialException'

export default class SessionsController {
  public async store ({ auth, request, response }: HttpContextContract) {
    const { uid, password } = await request.validate(SessionStoreValidator)

    try {
      await auth.attempt(uid, password)
    } catch (e) {
      throw new InvalidCredentialException(
        'Authentication failed. Either supplied credentials are invalid or the account is inactive',
        401,
        'E_INVALID_CREDENTIAL'
      )
    }

    return response.ok({
      status: 200,
      message: 'Logged in successfully',
    })
  }

  public async destroy ({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.ok({
      status: 200,
      message: 'Logged out successfully',
    })
  }
}
