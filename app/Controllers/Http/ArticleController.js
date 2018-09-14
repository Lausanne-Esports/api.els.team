'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Database = use('Database')
const Article = use('App/Models/Article')
const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class ArticleController {
  async index ({ auth, request }) {
    const articles = await Article.query()
      .has('translations', (builder) => {
        builder.where('state_id', 4)
      })
      .with('translations', (builder) => {
        builder.where('state_id', 4)
      })
      .with('translations.language')
      .with('category')
      .fetch()

    return articles
  }

  async show ({ params }) {
    const article = await Article.findOrFail(params.id)
    await article.load('translations', (builder) => {
      builder.where('state_id', 4)
    })

    if (article.toJSON().translations.length <= 0) {
      throw new ModelNotFound()
    }

    return article
  }
}

module.exports = ArticleController
