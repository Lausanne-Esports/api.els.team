'use strict'

const Model = use('Model')

class Article extends Model {
  translations () {
    return this.hasMany('App/Models/ArticleTranslation')
  }
}

module.exports = Article
