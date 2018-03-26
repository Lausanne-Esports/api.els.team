'use strict'

/*
|--------------------------------------------------------------------------
| LanguageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Language = use('App/Models/Language')

class LanguageSeeder {
  async run () {
    await Language.findOrCreate({ code: 'fr', name: 'Français' })
    await Language.findOrCreate({ code: 'en', name: 'English' })
  }
}

module.exports = LanguageSeeder
