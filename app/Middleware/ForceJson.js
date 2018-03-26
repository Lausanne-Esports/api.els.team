'use strict'

class ForceJson {
  async handle ({ request }, next) {
    request.request.headers.accept = 'application/json'

    // call next to advance the request
    await next()
  }
}

module.exports = ForceJson
