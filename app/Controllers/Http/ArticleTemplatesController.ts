/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import ArticleTemplate from 'App/Models/ArticleTemplate'

export default class ArticleTemplatesController {
  public async index () {
    return ArticleTemplate.query().orderBy('id')
  }
}
