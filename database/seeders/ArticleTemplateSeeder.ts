import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import ArticleTemplate from 'App/Models/ArticleTemplate'

export default class ArticleTemplateSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'name'
    await ArticleTemplate.fetchOrCreateMany(uniqueKey, [
      { name: 'Article' },
    ])
  }
}
