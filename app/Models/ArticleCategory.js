'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArticleCategory extends Model {
  static boot () {
    super.boot()
    this.addTrait('NoTimsetamp')
  }
}

module.exports = ArticleCategory
