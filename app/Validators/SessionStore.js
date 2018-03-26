'use strict'

const { formatters } = use('Validator')

class SessionStore {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required',
    }
  }
}

module.exports = SessionStore
