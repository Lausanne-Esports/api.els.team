/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArticleTranslation from 'App/Models/ArticleTranslation'
import Article from 'App/Models/Article'
import ArticleTranslationStoreValidator from 'App/Validators/ArticleTranslationStoreValidator'
import ArticleTranslationUpdateValidator from 'App/Validators/ArticleTranslationUpdateValidator'

export default class ArticleTranslationsController {
  public async show ({ params, response }: HttpContextContract) {
    const translation = await ArticleTranslation.query()
      .where('id', params.id)
      .preload('language')
      .first()

    return response.json(translation)
  }

  public async store ({ params, request, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)
    const data = await request.validate(ArticleTranslationStoreValidator)

    await article.related('translations').create(data)

    return response.noContent()
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const data = await request.validate(ArticleTranslationUpdateValidator)
    const translation = await ArticleTranslation.findOrFail(params.id)

    translation.merge(data)
    await translation.save()

    return response.noContent()
  }

  public async destroy ({ params, response }: HttpContextContract) {
    await ArticleTranslation.query().where('id', params.id).delete()

    return response.noContent()
  }
}
