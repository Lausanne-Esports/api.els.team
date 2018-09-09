'use strict'

const ArticleState = use('App/Models/ArticleState')

class ArticleStateController {
  index () {
    return ArticleState.all()
  }
}

module.exports = ArticleStateController
