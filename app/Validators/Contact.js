'use strict'

class Contact {
  get rules () {
    return {
      'title': 'required',
      'email': 'required|email',
      'message': 'required',
    }
  }
}

module.exports = Contact
