'use strict'

const Article = use('App/Models/Article')

class ArticleTranslationController {
  async store ({ params, request }) {
    const article = await Article
      .query()
      .where('id', params.id)
      .first()

    const data = this.$getFormField(request)

    await article.translations().create(data)
    await article.load('translations')

    return article
  }

  $getFormField (request) {
    return request.only([
      'headline', 'description', 'body', 'language_id', 'state_id'
    ])
  }
}

module.exports = ArticleTranslationController
