'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TransformerAbstract = use('TransformerAbstract')

class ArticleTransformer extends TransformerAbstract {
  /**
   * Automatically includes those relations.
   */
  defaultInclude () {
    return ['translations']
  }

  includeTranslations (article) {
    return this.collection(article.getRelated('translations'), t => ({
      headline: t.headline,
      code: t.getRelated('language').code,
    }))
  }

  transform (article) {
    return {
      id: article.id,
      featured: article.featured,
      featured_thumbnail: article.featured_thumbnail,
      published_at: article.published_at,
      thumbnail: article.thumbnail,
      category_id: article.category_id,
    }
  }
}

module.exports = ArticleTransformer
