'use strict'

const Mail = use('Mail')

class ContactController {
  async store ({ request }) {
    const payload = request.only(['title', 'email', 'message'])

    Mail.send('emails.contact', { ...payload, ip: request.ip() }, (message) => {
      message
        .to('contact@lausanne-esports.ch')
        .from(payload.email)
        .subject(`[Contact] ${payload.title}`)
    })
  }
}

module.exports = ContactController
