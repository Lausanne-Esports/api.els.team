/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArticleRepository from 'App/Repositories/ArticleRepository'
import ArticleTransformer from 'App/Transformers/ArticleTransformer'
import Language from 'App/Models/Language'
import TranslationRepository from 'App/Repositories/TranslationRepository'
import ArticleItemTransformer from 'App/Transformers/ArticleItemTransformer'

export default class ArticlesController {
  public async index ({ auth, request, response }: HttpContextContract) {
    const isAuthenticated = await auth.check().catch(() => {
      return false
    })

    const articles = await ArticleRepository.getAll({
      isAuthenticated,
      request,
    })

    return response.json(ArticleTransformer.transformCollection(articles))
  }

  public async show ({ auth, params, request, response }) {
    const isAuthenticated = await auth.check().catch(() => {
      return false
    })

    const [language, article] = await Promise.all([
      Language.findByOrFail('code', request.input('lang', 'fr')),
      ArticleRepository.get(params.id, { isAuthenticated }),
    ])

    const translation = await TranslationRepository.get(
      article.id, language.id, { isAuthenticated },
    )

    return response.json(ArticleItemTransformer.transform(article, translation))
  }
}
