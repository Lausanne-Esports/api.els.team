'use strict'

const Mail = use('Mail')

class ContactController {
  async store ({ request }) {
    const payload = request.only(['title', 'email', 'message'])
    Mail.send('emails.contact', payload, (message) => {
      message
        .to('romain.lanz@slynova.ch')
        .from(payload.email)
        .subject(`[Contact] ${payload.title}`)
    })
  }
}

module.exports = ContactController
