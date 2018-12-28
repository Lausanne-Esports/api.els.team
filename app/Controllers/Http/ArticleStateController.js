'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const ArticleState = use('App/Models/ArticleState')

class ArticleStateController {
  index () {
    return ArticleState.all()
  }
}

module.exports = ArticleStateController
