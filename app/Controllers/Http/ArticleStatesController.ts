/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import ArticleState from 'App/Models/ArticleState'

export default class ArticleStatesController {
  public async index () {
    return ArticleState.query().orderBy('id')
  }
}
