'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class ArticleRepository {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return ['App/Models/Article']
  }

  constructor (Article) {
    this.Article = Article
  }

  /**
   * Returns an article with the given ID if
   * it is released and has minimum one
   * translation that is published.
   *
   * @return {Promise<object>}
   */
  async get (id, { isAuthenticated = false }) {
    const query = this.Article.query()
      .with('translations.language')
      .with('translations', (builder) => {
        builder.select(['language_id', 'article_id'])
        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .where('id', id)

    if (!isAuthenticated) {
      query.published()
    }

    const article = await query.firstOrFail()

    if (article.getRelated('translations').rows.length < 1) {
      throw new ModelNotFound()
    }

    return article
  }

  getAll ({ request, isAuthenticated = false }) {
    const query = this.Article.query()
      .whereHas('translations', (builder) => {
        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .with('translations.language')
      .with('translations', (builder) => {
        builder.select(['headline', 'state_id', 'language_id', 'article_id'])

        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .with('category')
      .orderBy('published_at', 'desc')

    if (!isAuthenticated) {
      query.published()
    }

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
}

module.exports = ArticleRepository
