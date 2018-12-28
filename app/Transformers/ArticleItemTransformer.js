'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const moment = use('moment')
const TransformerAbstract = use('TransformerAbstract')

class ArticleItemTransformer extends TransformerAbstract {
  /**
   * Automatically includes those relations.
   */
  defaultInclude () {
    return ['translations']
  }

  includeTranslations (article) {
    return this.collection(article.getRelated('translations'), t => t.getRelated('language').code)
  }

  /**
   * Transforms the data.
   */
  transform (article, translation) {
    return {
      id: article.id,
      headline: translation.headline,
      description: translation.description,
      body: translation.html,
      published_at: moment(article.published_at).format('DD.MM.YYYY HH:mm'),
      thumbnail: article.thumbnail,
      featured_thumbnail: article.featured_thumbnail,
      template_id: article.template_id,
      category_id: article.category_id,
    }
  }
}

module.exports = ArticleItemTransformer
