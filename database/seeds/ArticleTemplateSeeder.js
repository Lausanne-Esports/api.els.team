'use strict'

/*
|--------------------------------------------------------------------------
| ArticleTemplateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ArticleTemplate = use('App/Models/ArticleTemplate')

class ArticleTemplateSeeder {
  async run () {
    await ArticleTemplate.findOrCreate({ name: 'Article' })
  }
}

module.exports = ArticleTemplateSeeder
