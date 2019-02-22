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
  async get (id) {
    const article = await this.Article.query()
      .published()
      .with('translations.language')
      .with('translations', builder => (
        builder
          .select(['language_id', 'article_id'])
          .where('state_id', 4)
      ))
      .where('id', id)
      .firstOrFail()

    if (article.getRelated('translations').rows.length < 1) {
      throw new ModelNotFound()
    }

    return article
  }
}

module.exports = ArticleRepository
