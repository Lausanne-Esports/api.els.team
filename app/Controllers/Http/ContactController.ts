/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import ContactValidator from 'App/Validators/ContactValidator'

export default class ContactController {
  public async store ({ request, response }: HttpContextContract) {
    const { email, message: content, title } = await request.validate(ContactValidator)

    await Mail.sendLater((message) => {
      message
        .from('contact@els.team')
        .to('contact@lausanne-esports.ch')
        .subject(`[Contact] ${title} from ${email}`)
        .htmlView('emails/contact', {
          author: email,
          message: content,
          title,
          ip: request.ip(),
        })
    })

    return response.noContent()
  }
}
