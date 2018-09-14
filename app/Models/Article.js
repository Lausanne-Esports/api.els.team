'use strict'

const Model = use('Model')
const moment = require('moment')

class Article extends Model {
  static get dates () {
    return super.dates.concat([
      'published_at',
    ])
  }

  static formatDates (field, value) {
    if (field.slice(-3) === '_on') {
      return moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')
    }

    if (field.slice(-3) === '_at') {
      return moment(value, 'DD.MM.YYYY H:mm').format('YYYY-MM-DD HH:mm:ss')
    }
  }

  static castDates (field, value) {
    if (field.slice(-3) === '_on') {
      return value.format('DD.MM.YYYY')
    }

    if (field.slice(-3) === '_at') {
      return value.format('DD.MM.YYYY H:mm')
    }
  }

  category () {
    return this.belongsTo('App/Models/ArticleCategory', 'category_id')
  }

  translations () {
    return this.hasMany('App/Models/ArticleTranslation')
  }
}

module.exports = Article
