/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { EventsList } from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'

export default class SendEmailVerificationEmail {
  public async handleRegistration (user: EventsList['new:user']) {
    const signedUrl = Route.makeSignedUrl('verifyEmail', {
      params: {
        email: user.email,
      },
    })
    const verificationUrl = `${Env.get('APP_ADMIN_URL') as string}${signedUrl}`

    try {
      await Mail.send((message) => {
        message.to(user.email)
        message.from('noreply@els.team')
        message.subject('Votre compte pour admin.els.team')
        message.htmlView('emails/email_verification', {
          user,
          url: verificationUrl,
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
