import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ArticleTemplate from 'App/Models/ArticleTemplate'

export default class ArticleTemplateSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'name'
    await ArticleTemplate.fetchOrCreateMany(uniqueKey, [
      { name: 'Article' },
    ])
  }
}
