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

  async store ({ request }) {
    const metadata = this.$getMetadata(request)
    const translation = this.$getTranslationData(request)

    const globalTrx = Database.connection('mysql')._globalTrx
    const trx =  globalTrx ? globalTrx : await Database.beginTransaction()

    const article = await Article.create(metadata, trx)
    await article.translations().create(translation, trx)

    if (!globalTrx) {
      trx.commit()
    }

    await article.load('translations')

    return article
  }

  $getMetadata (request) {
    return request.only([
      'thumbnail', 'thumbnail_featured',
      'published_at', 'template_id', 'category_id',
    ])
  }

  $getTranslationData (request) {
    return request.only([
      'headline', 'description', 'body', 'language_id', 'state_id'
    ])
  }
}

module.exports = ArticleController
