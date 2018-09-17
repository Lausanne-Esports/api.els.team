'use strict'

/*
|--------------------------------------------------------------------------
| TeamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Team = use('App/Models/Team')
const TeamCategory = use('App/Models/TeamCategory')

class TeamSeeder {
  async run () {
    this.categories = (await TeamCategory.all()).toJSON()

    await Team.findOrCreate({ name: 'Pachimari', category_id: this.$findCategoryFor('ow'), order: 1, activated: true })
    await Team.findOrCreate({ name: 'Indigo', category_id: this.$findCategoryFor('lol'), order: 2, activated: true })
    await Team.findOrCreate({ name: 'Hearthstone', category_id: this.$findCategoryFor('hs'), order: 3, activated: true })
    await Team.findOrCreate({ name: 'Aurora', category_id: this.$findCategoryFor('rl'), order: 4, activated: true })
    await Team.findOrCreate({ name: 'Hope', category_id: this.$findCategoryFor('fortnite'), academy: true, order: 5, activated: true })
    await Team.findOrCreate({ name: 'Hearthstone', category_id: this.$findCategoryFor('hs'), academy: true, order: 6, activated: true })
    await Team.findOrCreate({ name: 'FIFA', category_id: this.$findCategoryFor('fifa'), academy: true, order: 7, activated: true })
    await Team.findOrCreate({ name: 'Staff', category_id: this.$findCategoryFor('staff'), order: 8, activated: true })
  }

  $findCategoryFor(code) {
    return this.categories.find((c => c.code === code)).id
  }
}

module.exports = TeamSeeder
