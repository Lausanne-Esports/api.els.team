'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Markdown = use('Markdown')
const Article = use('App/Models/Article')
const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class ArticleController {
  async index ({ auth, request }) {
    const articles = await Article.query()
      .whereHas('translations', (builder) => {
        builder.where('state_id', 4)
      })
      .with('translations.language')
      .with('translations', (builder) => {
        builder.select(['headline', 'state_id', 'language_id', 'article_id'])
          .where('state_id', 4)
      })
      .with('category')
      .fetch()

    return articles
  }

  async show ({ params }) {
    let article = await Article.findOrFail(params.id)

    await article.load('translations', (builder) => {
      builder.where('state_id', 4)
    })

    article = article.toJSON()

    if (article.translations.length <= 0) {
      throw new ModelNotFound()
    }

    article.translations.forEach(async (translation) => {
      translation.body = await Markdown.renderToHtml(translation.body)
    })

    return article
  }
}

module.exports = ArticleController
