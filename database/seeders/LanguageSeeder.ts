import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Language from 'App/Models/Language'

export default class LanguageSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'code'
    await Language.fetchOrCreateMany(uniqueKey, [
      { code: 'fr', name: 'Français' },
      { code: 'en', name: 'English' },
    ])
  }
}
