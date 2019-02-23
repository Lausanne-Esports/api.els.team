'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

class TranslationRepository {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return ['App/Models/ArticleTranslation']
  }

  constructor (Translation) {
    this.Translation = Translation
  }

  async get (articleId, langId, { isAuthenticated = false }) {
    const query = this.Translation.query()
      .where('language_id', langId)
      .where('article_id', articleId)

    if (!isAuthenticated) {
      query.where('state_id', 4)
    }

    const translation = await query.firstOrFail()

    // Increments the view counter
    translation.view_count += 1
    await translation.save()

    return translation
  }
}

module.exports = TranslationRepository
