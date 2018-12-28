'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const ArticleTemplate = use('App/Models/ArticleTemplate')

class ArticleTemplateController {
  index () {
    return ArticleTemplate.all()
  }
}

module.exports = ArticleTemplateController
