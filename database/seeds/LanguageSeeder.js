'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Language = use('App/Models/Language')

class LanguageSeeder {
  async run () {
    await Language.findOrCreate({ code: 'fr', name: 'Français' })
    await Language.findOrCreate({ code: 'en', name: 'English' })
  }
}

module.exports = LanguageSeeder
