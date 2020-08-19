/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import ArticleValidator from 'App/Validators/ArticleValidator'
import ArticleTranslationStoreValidator from 'App/Validators/ArticleTranslationStoreValidator'

export default class ArticlesController {
  public async index ({ response }: HttpContextContract) {
    const articles = await Article.query()
      .preload('translations', query => {
        query.preload('language')
      })
      .preload('category')
      .orderBy('published_at', 'desc')

    return response.json(articles)
  }

  public async show ({ params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id)

    return response.json(article)
  }

  public async store ({ request, response }: HttpContextContract) {
    const metadata = await request.validate(ArticleValidator)
    const translation = await request.validate(ArticleTranslationStoreValidator)

    const article = await Article.create(metadata)
    await article.related('translations').create(translation)

    return response.noContent()
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const metadata = await request.validate(ArticleValidator)

    const article = await Article.findOrFail(params.id)
    article.merge(metadata)
    await article.save()

    return response.json(article)
  }

  public async featured ({ params, response }: HttpContextContract) {
    const featuredArticle = await Article.findByOrFail('featured', true)
    const article = await Article.findOrFail(params.id)

    featuredArticle.featured = false
    article.featured = true

    await featuredArticle.save()
    await article.save()

    return response.noContent()
  }
}
