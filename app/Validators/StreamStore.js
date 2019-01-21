'use strict'

class Stream {
  get rules () {
    return {
      username: 'required|unique:streams,username'
    }
  }
}

module.exports = Stream
