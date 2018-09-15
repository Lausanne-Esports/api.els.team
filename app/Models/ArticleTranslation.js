'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */const Model = use('Model')

class ArticleTranslation extends Model {
  language () {
    return this.belongsTo('App/Models/Language')
  }
}

module.exports = ArticleTranslation
