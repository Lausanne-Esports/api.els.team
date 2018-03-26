'use strict'

const Model = use('Model')

class ArticleTemplate extends Model {
  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }
}

module.exports = ArticleTemplate
