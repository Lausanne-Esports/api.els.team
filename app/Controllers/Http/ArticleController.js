'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Article = use('App/Models/Article')
const Language = use('App/Models/Language')
const ArticleItemTransformer = use('App/Transformers/ArticleItemTransformer')

class ArticleController {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return [
      'App/Repositories/ArticleRepository',
      'App/Repositories/TranslationRepository',
    ]
  }

  constructor (ArticleRepository, TranslationRepository) {
    this.articleRepository = ArticleRepository
    this.translationRepository = TranslationRepository
  }

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

  async show ({ params, request, transform }) {
    const [language, article] = await Promise.all([
      Language.findByOrFail('code', request.input('lang', 'fr')),
      this.articleRepository.get(params.id)
    ])
    const translation = await this.translationRepository.get(article.id, language.id)

    return transform.item(article)
      .transformWith(ArticleItemTransformer)
      .withContext(translation)
      .toArray()
  }
}

module.exports = ArticleController
