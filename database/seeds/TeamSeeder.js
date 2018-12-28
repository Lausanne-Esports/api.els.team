'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Team = use('App/Models/Team')
const TeamCategory = use('App/Models/TeamCategory')

class TeamSeeder {
  async run () {
    this.categories = (await TeamCategory.all()).toJSON()

    // await Team.findOrCreate({ name: 'Staff', category_id: this.$findCategoryFor('staff'), order: 1, activated: true })
  }

  $findCategoryFor(code) {
    return this.categories.find((c => c.code === code)).id
  }
}

module.exports = TeamSeeder
