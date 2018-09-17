'use strict'

/*
|--------------------------------------------------------------------------
| TeamCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const TeamCategory = use('App/Models/TeamCategory')

class TeamCategorySeeder {
  async run () {
    await TeamCategory.findOrCreate({ code: 'staff', name: 'Staff' })
    await TeamCategory.findOrCreate({ code: 'fifa', name: 'Fifa' })
    await TeamCategory.findOrCreate({ code: 'ow', name: 'Overwatch' })
    await TeamCategory.findOrCreate({ code: 'hs', name: 'Hearthstone' })
    await TeamCategory.findOrCreate({ code: 'rl', name: 'Rocket League' })
    await TeamCategory.findOrCreate({ code: 'lol', name: 'League of Legends' })
    await TeamCategory.findOrCreate({ code: 'csgo', name: 'Counter-Strike: Global Offensive' })
    await TeamCategory.findOrCreate({ code: 'fortnite', name: 'Fortnite' })
  }
}

module.exports = TeamCategorySeeder
