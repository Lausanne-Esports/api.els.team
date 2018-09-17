'use strict'

/*
|--------------------------------------------------------------------------
| MemberSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Member = use('App/Models/Member')

class MemberSeeder {
  async run () {
    await Member.findOrCreate({ nickname: 'SlyK', lastname: 'Lanz', firstname: 'Romain', twitter: 'romainlanz' })
    await Member.findOrCreate({ nickname: 'dodo021', lastname: 'Tornese', firstname: 'Killian', twitter: 'dodo021' })
    await Member.findOrCreate({ nickname: 'Pichade' })
    await Member.findOrCreate({ nickname: 'Xetrope', lastname: 'Rochat', firstname: 'Alexandre', twitter: 'xetrope', twitch: 'xetrope' })
    await Member.findOrCreate({ nickname: 'Larssonax', twitter: 'Larssonax_HS', facebook: 'Larssonax_HS-461094740759469', twitch: 'larssonax_hs' })
    await Member.findOrCreate({ nickname: 'Torrix', lastname: 'Boy', firstname: 'Frédéric', twitter: 'Torrix__', steam: 'Torrix', twitch: 'els_Torrix' })
    await Member.findOrCreate({ nickname: 'Kiba', lastname: 'Zürcher', firstname: 'Adrien', twitter: 'kiba1k', twitch: 'kiba1k' })
    await Member.findOrCreate({ nickname: 'Flow', lastname: 'Kress', firstname: 'Florian', twitter: 'Flow2400', facebook: 'FlorianKress', twitch: 'flow2400' })
    await Member.findOrCreate({ nickname: 'Khirya', lastname: 'Civitillo', firstname: 'Nastasia' })
    await Member.findOrCreate({ nickname: 'MJK', lastname: 'Bernardeau', firstname: 'Benoît' })
    await Member.findOrCreate({ nickname: 'Jacquard', lastname: 'Vuillod', firstname: 'Lucas' })
    await Member.findOrCreate({ nickname: 'Sandwich', lastname: 'Pisa', firstname: 'Maxime' })
    await Member.findOrCreate({ nickname: 'PacPac', lastname: 'Henry', firstname: 'Julien' })
    await Member.findOrCreate({ nickname: 'Fall0x', lastname: 'Moret', firstname: 'Valentin' })
    await Member.findOrCreate({ nickname: 'shn', lastname: 'Delavy', firstname: 'Maxime' })
    await Member.findOrCreate({ nickname: 'SekaiLove', lastname: 'Marguerat', firstname: 'Amandine' })
    await Member.findOrCreate({ nickname: 'tzann', lastname: 'Richards', firstname: 'Tynan' })
    await Member.findOrCreate({ nickname: 'Blitz', lastname: 'Delmond', firstname: 'Jean-Baptiste' })
    await Member.findOrCreate({ nickname: 'Tirizio', lastname: 'Walser', firstname: 'Adrian' })
    await Member.findOrCreate({ nickname: 'Fro10Soul', lastname: 'Salzgeber', firstname: 'Yanis' })
    await Member.findOrCreate({ nickname: 'Sakrod', lastname: 'Bollhalder', firstname: 'Remo' })
    await Member.findOrCreate({ nickname: 'younTheory', lastname: 'Widmer', firstname: 'Yannick' })
    await Member.findOrCreate({ nickname: 'Bozo', lastname: 'Gaspoz', firstname: 'Romain' })
    await Member.findOrCreate({ nickname: 'Hypno', lastname: 'Pfersich', firstname: 'Yoann' })
    await Member.findOrCreate({ nickname: 'Dokhan', lastname: 'Jungen', firstname: 'Loris' })
    await Member.findOrCreate({ nickname: 'Falkner', lastname: 'Fagone', firstname: 'Adriano' })
    await Member.findOrCreate({ nickname: 'KaratéSwag', lastname: 'Wichoud', firstname: 'Nicolas' })
    await Member.findOrCreate({ nickname: 'KarpetMan', lastname: 'Berger', firstname: 'Ethan' })
    await Member.findOrCreate({ nickname: 'Sanelix', lastname: 'Serigado', firstname: 'Alexandre' })
    await Member.findOrCreate({ nickname: 'Arkan', lastname: 'Djukanovic', firstname: 'Ljubisav' })
    await Member.findOrCreate({ nickname: 'Classic', lastname: 'Dorantani', firstname: 'Marco' })
    await Member.findOrCreate({ nickname: 'Keever', lastname: 'Eggenberger', firstname: 'Kevin' })
    await Member.findOrCreate({ nickname: 'Hell0', lastname: 'Michel', firstname: 'Léo' })
    await Member.findOrCreate({ nickname: 'Sherkan', lastname: 'Jaumain', firstname: 'Alexandre' })
    await Member.findOrCreate({ nickname: 'Adiss', lastname: 'Sonnet', firstname: 'Quentin' })
    await Member.findOrCreate({ nickname: 'Aimnight', lastname: 'Bresson', firstname: 'Corentin' })
    await Member.findOrCreate({ nickname: 'LoNe_LiNe', lastname: 'Henchoz', firstname: 'Paul' })
    await Member.findOrCreate({ nickname: 'Mass', lastname: 'Monnier', firstname: 'Massimo' })
    await Member.findOrCreate({ nickname: 'Grymiix', lastname: 'Chevallier', firstname: 'Laurent' })
    await Member.findOrCreate({ nickname: 'Kane', lastname: 'Mettraux', firstname: 'Steve' })
    await Member.findOrCreate({ nickname: 'biip', lastname: 'Burgard', firstname: 'Louis' })
    await Member.findOrCreate({ nickname: 'Crousti' })
    await Member.findOrCreate({ nickname: 'Kitsune Nosaka', lastname: 'Menoud', firstname: 'Jan' })
    await Member.findOrCreate({ nickname: 'Guigui', firstname: 'Elodie' })
    await Member.findOrCreate({ nickname: 'Larssogirl', lastname: 'Jev', firstname: 'Marou' })
    await Member.findOrCreate({ nickname: 'Jackmeister', lastname: 'Modolo', firstname: 'Giacomo' })
    await Member.findOrCreate({ nickname: 'Screez', lastname: 'Caillat', firstname: 'Mathias' })
    await Member.findOrCreate({ nickname: 'Nóray', lastname: 'Nicoulaz', firstname: 'Mehdi' })
    await Member.findOrCreate({ nickname: 'LikornRips', lastname: 'Barenzung', firstname: 'Alexandre' })
    await Member.findOrCreate({ nickname: 'R1yad', lastname: 'Kattar', firstname: 'Riyad' })
    await Member.findOrCreate({ nickname: 'RoxAs', lastname: 'Casas', firstname: 'Anthony' })
    await Member.findOrCreate({ nickname: 'Luckying', lastname: 'Chappuis', firstname: 'Nicolas' })
  }
}

module.exports = MemberSeeder
