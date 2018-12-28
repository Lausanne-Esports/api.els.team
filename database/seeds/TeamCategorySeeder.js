'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TeamCategory = use('App/Models/TeamCategory')

class TeamCategorySeeder {
  async run () {
    // await TeamCategory.findOrCreate({ code: 'staff', name: 'Staff' })
  }
}

module.exports = TeamCategorySeeder
