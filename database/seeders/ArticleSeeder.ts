import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Article from 'App/Models/Article'

export default class ArticleCategorySeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/articles.csv'
    try {
      const users = await promises.readFile(file)
      const records = parse(users, {
        columns: true,
        skip_empty_lines: true,
      })
      await Article.createMany(records)
    } catch (e) {
      console.log(e)
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
