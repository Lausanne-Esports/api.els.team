'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TeamCategory = use('App/Models/TeamCategory')

class TeamCategoryController {
  index () {
    return TeamCategory.all()
  }
}

module.exports = TeamCategoryController
