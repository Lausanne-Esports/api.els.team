/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import ArticleCategory from 'App/Models/ArticleCategory'

export default class ArticleCategoriesController {
  public async index () {
    return ArticleCategory.query().orderBy('id')
  }
}
