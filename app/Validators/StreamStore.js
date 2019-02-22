'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

class Stream {
  get rules () {
    return {
      username: 'required|unique:streams,username',
    }
  }
}

module.exports = Stream
