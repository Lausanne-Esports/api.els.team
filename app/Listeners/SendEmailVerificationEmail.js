'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Env = use('Env')
const Mail = use('Mail')
const Encryption = use('Encryption')
const SendEmailVerificationEmail = exports = module.exports = {}

SendEmailVerificationEmail.method = async ({ user, token }) => {
  Mail.send('emails.email-verification', { user, token: Encryption.base64Encode(token), url: Env.get('APP_ADMIN_URL') }, (message) => {
    message
      .to(user.email)
      .from('noreply@els.team')
      .subject('Votre compte pour admin.els.team')
  })
}
