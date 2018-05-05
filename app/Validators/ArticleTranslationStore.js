'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { formatters } = use('Validator')

class ArticleTranslationStore {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

get rules () {
  const articleId = this.ctx.params.id

  return {
    language_id: `uniqueScope:article_translations,article_id,${articleId}`
  }
}
}

module.exports = ArticleTranslationStore
