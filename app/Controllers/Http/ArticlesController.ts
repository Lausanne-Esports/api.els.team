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
  public async index ({ request, response }: HttpContextContract) {
    // TODO: change this when the auth package has been added
    // const isAuthenticated = await auth.check().catch(() => { })
    const isAuthenticated = false

    const articles = await ArticleRepository.getAll({
      isAuthenticated,
      request,
    })

    return response.json(ArticleTransformer.transformCollection(articles))
  }

  public async show ({ params, request, response }) {
    // TODO: change this when the auth package has been added
    // const isAuthenticated = await auth.check().catch(() => { })
    const isAuthenticated = false

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
