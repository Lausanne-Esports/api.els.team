/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Article from 'App/Models/Article'
import ModelNotFoundException from 'App/Exceptions/ModelNotFoundException'

class ArticleRepository {
  /**
   * Returns an article with the given ID if
   * it is released and has minimum one
   * translation that is published.
   */
  public async get (id: number, { isAuthenticated = false }) {
    const query = Article.query()
      .preload('translations', (builder) => {
        builder.preload('language')
        builder.select(['language_id', 'article_id'])
        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .where('id', id)

    if (!isAuthenticated) {
      query.apply((scopes) => scopes.published())
    }

    const article = await query.firstOrFail()

    if (article.translations.length < 1) {
      throw new ModelNotFoundException('Model not found')
    }

    return article
  }

  public getAll ({ request, isAuthenticated = false }) {
    const query = Article.query()
      .whereHas('translations', (builder) => {
        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .preload('translations', (builder) => {
        builder.preload('language')
        builder.select(['headline', 'state_id', 'language_id', 'article_id'])

        if (!isAuthenticated) {
          builder.where('state_id', 4)
        }
      })
      .preload('category')
      .orderBy('published_at', 'desc')

    if (!isAuthenticated) {
      query.apply((scopes) => scopes.published())
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

    return query
  }
}

export default new ArticleRepository()
