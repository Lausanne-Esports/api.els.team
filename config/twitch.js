
'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Env = use('Env')

module.exports = {
  apiKey: Env.getOrFail('TWITCH_API_KEY'),
}
