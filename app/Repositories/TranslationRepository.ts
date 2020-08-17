/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import ArticleTranslation from 'App/Models/ArticleTranslation'

class TranslationRepository {
  public async get (articleId: number, langId: number, {isAuthenticated = false}) {
    const query = ArticleTranslation.query()
      .where('language_id', langId)
      .where('article_id', articleId)

    if (!isAuthenticated) {
      query.where('state_id', 4)
    }

    const translation = await query.firstOrFail()

    // Increments the view counter
    translation.viewCount += 1
    await translation.save()

    return translation
  }
}

export default new TranslationRepository()
