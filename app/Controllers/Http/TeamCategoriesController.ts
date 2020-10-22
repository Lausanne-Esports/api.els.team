/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import TeamCategory from 'App/Models/TeamCategory'

export default class TeamCategoriesController {
  public async index () {
    return TeamCategory.query().orderBy('id')
  }
}
