'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Language = use('App/Models/Language')
const ArticleTransformer = use('App/Transformers/ArticleTransformer')
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

  async index ({ auth, request, transform }) {
    const isAuthenticated = await auth.check().catch(() => {})

    const articles = await this.articleRepository.getAll({
      isAuthenticated,
      request,
    })

    return transform.collection(articles, ArticleTransformer)
  }

  async show ({ auth, params, request, transform }) {
    const isAuthenticated = await auth.check().catch(() => {})

    const [language, article] = await Promise.all([
      Language.findByOrFail('code', request.input('lang', 'fr')),
      this.articleRepository.get(params.id, { isAuthenticated }),
    ])

    const translation = await this.translationRepository.get(
      article.id, language.id, { isAuthenticated },
    )

    return transform.item(article)
      .transformWith(ArticleItemTransformer)
      .withContext(translation)
      .toArray()
  }
}

module.exports = ArticleController
