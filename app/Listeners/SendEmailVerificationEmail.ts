/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { EventsList } from '@ioc:Adonis/Core/Event'

export default class SendEmailVerificationEmail {
  public async handleRegistration (user: EventsList['new:user']) {
    console.log(user)
  }
}
