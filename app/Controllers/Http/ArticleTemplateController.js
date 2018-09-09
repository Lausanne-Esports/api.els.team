'use strict'

const ArticleTemplate = use('App/Models/ArticleTemplate')

class ArticleTemplateController {
  index () {
    return ArticleTemplate.all()
  }
}

module.exports = ArticleTemplateController
