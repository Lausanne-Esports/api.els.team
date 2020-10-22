/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import User from 'App/Models/User'
import PasswordRequestValidator from 'App/Validators/PasswordRequestValidator'
import PasswordUpdateValidator from 'App/Validators/PasswordUpdateValidator'

export default class PasswordRequestsController {
  public async store ({ request, response }: HttpContextContract) {
    const { uid } = await request.validate(PasswordRequestValidator)

    const user = await User.query()
      .where('email', uid)
      .orWhere('username', uid)
      .firstOrFail()

    Event.emit('password:request', user)

    return response.noContent()
  }

  public async update ({ params, request, response }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Validation failed')
    }

    const { password } = await request.validate(PasswordUpdateValidator)
    const user = await User.findByOrFail('email', params.email)

    user.password = password
    await user.save()

    return response.noContent()
  }
}
