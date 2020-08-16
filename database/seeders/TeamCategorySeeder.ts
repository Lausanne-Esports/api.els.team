import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TeamCategory from 'App/Models/TeamCategory'

export default class TeamCategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'code'
    await TeamCategory.fetchOrCreateMany(uniqueKey, [
      { code: 'staff', name: 'Staff' },
      { code: 'fifa', name: 'Fifa' },
      { code: 'ow', name: 'Overwatch' },
      { code: 'hs', name: 'Hearthstone' },
      { code: 'rl', name: 'Rocket League' },
      { code: 'lol', name: 'League of Legends' },
      { code: 'csgo', name: 'Counter-Strike' },
      { code: 'fortnite', name: 'Fortnite' },
      { code: 'roe', name: 'Ring of Elysium' },
      { code: 'smash', name: 'Super Smash Bros' },
    ])
  }
}
