'use strict'

/*
|--------------------------------------------------------------------------
| ArticleCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const ArticleCategory = use('App/Models/ArticleCategory')

class ArticleCategorySeeder {
  async run () {
    await ArticleCategory.findOrCreate({ code: 'news', name: 'News' })
    await ArticleCategory.findOrCreate({ code: 'fifa', name: 'Fifa' })
    await ArticleCategory.findOrCreate({ code: 'ow', name: 'Overwatch' })
    await ArticleCategory.findOrCreate({ code: 'hs', name: 'Hearthstone' })
    await ArticleCategory.findOrCreate({ code: 'rl', name: 'Rocket League' })
    await ArticleCategory.findOrCreate({ code: 'lol', name: 'League of Legends' })
    await ArticleCategory.findOrCreate({ code: 'csgo', name: 'Counter-Strike: Global Offensive' })
  }
}

module.exports = ArticleCategorySeeder
