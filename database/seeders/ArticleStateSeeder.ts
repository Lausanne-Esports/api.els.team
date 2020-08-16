import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ArticleState from 'App/Models/ArticleState'

export default class ArticleStateSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'name'
    await ArticleState.fetchOrCreateMany(uniqueKey, [
      { name: 'Draft' },
      { name: 'Proofreading Requested' },
      { name: 'Ready' },
      { name: 'Published' },
    ])
  }
}
