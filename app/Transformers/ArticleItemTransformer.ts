/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Article from 'App/Models/Article'
import ArticleTranslation from 'App/Models/ArticleTranslation'

class ArticleTransformer {
  public transform (article: Article, translation: ArticleTranslation) {
    return {
      translations: article.translations.map(translation => translation.language.code),
      id: article.id,
      headline: translation.headline,
      description: translation.description,
      body: translation.html,
      published_at: article.publishedAt,
      thumbnail: article.thumbnail,
      featured_thumbnail: article.featuredThumbnail,
      template_id: article.templateId,
      category_id: article.categoryId,
    }
  }
}

export default new ArticleTransformer()
