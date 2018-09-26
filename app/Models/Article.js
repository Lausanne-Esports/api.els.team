'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require('moment')

class Article extends Model {
  static boot () {
    super.boot()
    this.addTrait('FormatDate')
  }

  static scopePublished (query) {
    return query
      .where('published_at', '<', moment().format('YYYY-MM-DD HH:mm:ss'))
  }

  static get dates () {
    return super.dates.concat(['published_at'])
  }

  category () {
    return this.belongsTo('App/Models/ArticleCategory', 'category_id')
  }

  translations () {
    return this.hasMany('App/Models/ArticleTranslation')
  }
}

module.exports = Article
