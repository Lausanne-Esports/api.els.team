'use strict'

class UserStore {
  get formatter () {
    return 'jsonapi'
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    }
  }
}

module.exports = UserStore
