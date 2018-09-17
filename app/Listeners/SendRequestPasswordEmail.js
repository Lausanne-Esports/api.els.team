'use strict'

const Env = use('Env')
const Mail = use('Mail')
const Encryption = use('Encryption')
const SendRequestPasswordEmail = exports = module.exports = {}

SendRequestPasswordEmail.method = async ({ user, token }) => {
  Mail.send('emails.reset-password', { user, token: Encryption.base64Encode(token), url: Env.get('APP_ADMIN_URL') }, (message) => {
    message
      .to(user.email)
      .from('noreply@els.team.com')
      .subject('Demande de réinitialisation de mot de passe')
  })
}
