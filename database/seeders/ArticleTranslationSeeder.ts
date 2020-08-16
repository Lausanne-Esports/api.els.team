import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import ArticleTranslation from 'App/Models/ArticleTranslation'

export default class ArticleTranslationSeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/article_translations.csv'
    try {
      const users = await promises.readFile(file)
      const records = parse(users, {
        columns: true,
        skip_empty_lines: true,
      })
      await ArticleTranslation.createMany(records)
    } catch (e) {
      console.log(e)
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
