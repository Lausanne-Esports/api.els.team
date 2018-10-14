'use strict'

class NoTimestamp {
  register (Model) {
    Object.defineProperty(Model, 'createdAtColumn', {
      get () { return null }
    })

    Object.defineProperty(Model, 'updatedAtColumn', {
      get () { return null }
    })
  }
}

module.exports = NoTimestamp
