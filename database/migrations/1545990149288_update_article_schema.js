'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Schema = use('Schema')

class UpdateArticleSchema extends Schema {
  up () {
    this.table('articles', (table) => {
      table.dropColumn('legacy_id')
    })

    this.table('article_translations', (table) => {
      table.text('html')
    })
  }

  down () {
    this.table('articles', (table) => {
      table.integer('legacy_id').unsigned()
    })

    this.table('article_translations', (table) => {
      table.dropColumn('html')
    })
  }
}

module.exports = UpdateArticleSchema
