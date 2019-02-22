'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Database = use('Database')
const Article = use('App/Models/Article')

class ArticleController {
  async index () {
    const articles = await Article.query()
      .with('translations.language')
      .with('category')
      .orderBy('published_at', 'desc')
      .fetch()

    return articles
  }

  async show ({ params }) {
    return Article.findOrFail(params.id)
  }

  async store ({ request }) {
    const metadata = this.$getMetadata(request)
    const translation = this.$getTranslationData(request)

    const globalTrx = Database.connection('pg')._globalTrx
    const trx = globalTrx || await Database.beginTransaction()

    const article = await Article.create(metadata, trx)
    await article.translations().create(translation, trx)

    if (!globalTrx) {
      trx.commit()
    }

    await article.load('translations')

    return article
  }

  async featured ({ params, response }) {
    const featuredArticle = await Article.findByOrFail('featured', true)
    const article = await Article.findOrFail(params.id)

    featuredArticle.featured = false
    article.featured = true

    await featuredArticle.save()
    await article.save()

    return response.noContent()
  }

  async update ({ params, request }) {
    const metadata = this.$getMetadata(request)

    const article = await Article.findOrFail(params.id)
    article.merge(metadata)
    await article.save()

    return article
  }

  $getMetadata (request) {
    return request.only([
      'thumbnail', 'featured_thumbnail',
      'published_at', 'template_id', 'category_id',
    ])
  }

  $getTranslationData (request) {
    return request.only([
      'headline', 'description', 'body', 'language_id', 'state_id',
    ])
  }
}

module.exports = ArticleController
