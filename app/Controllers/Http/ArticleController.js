'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { omit } = require('lodash')
const Markdown = use('Markdown')
const Article = use('App/Models/Article')
const Language = use('App/Models/Language')
const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class ArticleController {
  async index ({ auth, request }) {
    const query = Article.query()
      .published()
      .whereHas('translations', (builder) => {
        builder.where('state_id', 4)
      })
      .with('translations.language')
      .with('translations', (builder) => {
        builder.select(['headline', 'state_id', 'language_id', 'article_id'])
          .where('state_id', 4)
      })
      .with('category')
      .orderBy('published_at', 'desc')


    if (request.input('filter') && request.input('filter') !== 'featured') {
      query.whereHas('category', (builder) => {
        builder.where('code', request.input('filter'))
      })
    } else if (request.input('filter') === 'featured') {
      query.where('featured', true)
    }

    if (request.input('limit')) {
      query.limit(request.input('limit'))
    }

    return query.fetch()
  }

  async show ({ params, request }) {
    const language = await Language.findByOrFail('code', request.input('lang'))
    const article = await Article.query().published().with('translations', (builder) => builder.select(['language_id', 'article_id']).where('state_id', 4)).with('category').where('id', params.id).firstOrFail()
    const translation = await article.translations().where('language_id', language.id).first()

    if (!translation) {
      throw new ModelNotFound()
    }

    // Increments the view counter
    translation.view_count++
    await translation.save()

    // Create final payload
    const payload = {
      ...omit(translation.toJSON(), ['article_id', 'view_count', 'state_id', 'created_at', 'updated_at']),
      body: await Markdown.renderToHtml(translation.toJSON().body),
      ...omit(article.toJSON(), ['created_at', 'updated_at']),
      translations: article.toJSON().translations.filter((t) => t.language_id !== language.id)
    }

    return payload
  }

  async legacy ({ params }) {
    const article = await Article
      .query()
      .published()
      .with('translations', (builder) => builder.select(['language_id', 'article_id']))
      .where('id', params.id)
      .firstOrFail()

    const translation = await article.translations().where('language_id', 1).first()

    return { id: article.id, headline: translation.headline}
  }
}

module.exports = ArticleController
