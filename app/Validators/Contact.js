'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

class Contact {
  get rules () {
    return {
      title: 'required',
      email: 'required|email',
      message: 'required',
    }
  }
}

module.exports = Contact
