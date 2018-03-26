'use strict'

/*
|--------------------------------------------------------------------------
| ArticleStateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const ArticleState = use('App/Models/ArticleState')

class ArticleStateSeeder {
  async run () {
    await ArticleState.findOrCreate({ name: 'Draft' })
    await ArticleState.findOrCreate({ name: 'Proofreading Requested' })
    await ArticleState.findOrCreate({ name: 'Ready' })
    await ArticleState.findOrCreate({ name: 'Published' })
  }
}

module.exports = ArticleStateSeeder
