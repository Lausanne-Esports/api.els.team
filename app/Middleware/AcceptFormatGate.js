'use strict'

class AcceptFormatGate {
  async handle ({ request }, next) {
    // console.log(request.request.headers.accept)
    // if (!request.accepts(['html', 'json']) === 'json') {
    request.request.headers.accept = 'application/json'
    // }

    // call next to advance the request
    await next()
  }
}

module.exports = AcceptFormatGate
