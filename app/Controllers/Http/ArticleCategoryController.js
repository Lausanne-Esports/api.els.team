'use strict'

const ArticleCategory = use('App/Models/ArticleCategory')

class ArticleCategoryController {
  index () {
    return ArticleCategory.all()
  }
}

module.exports = ArticleCategoryController
