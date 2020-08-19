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

export default class SendPasswordRequestEmail {
  public async method (user: EventsList['password:request']) {
    const signedUrl = Route.makeSignedUrl('verifyPasswordRequest', {
      params: {
        email: user.email,
      },
      expiresIn: '30m',
    })
    const verificationUrl = `${Env.get('APP_ADMIN_URL') as string}${signedUrl}`

    try {
      await Mail.send((message) => {
        message.to(user.email)
        message.from('noreply@els.team')
        message.subject('Demande de réinitialisation de mot de passe')
        message.htmlView('emails/reset_password', {
          user,
          url: verificationUrl,
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
