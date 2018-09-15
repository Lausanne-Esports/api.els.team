'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */const Model = use('Model')
const Hashids = use('Hashids')

class ArticleTranslation extends Model {
  getId (id) {
    return Hashids.encode(id)
  }

  language () {
    return this.belongsTo('App/Models/Language')
  }
}

module.exports = ArticleTranslation
