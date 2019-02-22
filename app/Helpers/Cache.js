'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

const Cache = new Map()

module.exports = {
  has (key) {
    return Cache.has(key)
  },

  set (key, value) {
    return Cache.set(key, [value, Date.now()])
  },

  get (key) {
    return Cache.get(key)[0]
  },

  delete (key) {
    return Cache.delete(key)
  },

  clear () {
    return Cache.clear()
  },

  isExpired (key, seconds) {
    const [, timestamp] = Cache.get(key)

    return (Date.now() - timestamp) / 1000 > seconds
  },
}
