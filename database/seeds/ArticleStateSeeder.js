'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

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
