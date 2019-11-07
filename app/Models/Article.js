'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')
const moment = require('moment')

class Article extends Model {
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
