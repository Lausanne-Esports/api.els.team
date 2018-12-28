'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const ArticleCategory = use('App/Models/ArticleCategory')

class ArticleCategoryController {
  index () {
    return ArticleCategory.all()
  }
}

module.exports = ArticleCategoryController
