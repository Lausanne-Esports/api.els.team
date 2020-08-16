import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import ArticleCategory from 'App/Models/ArticleCategory'

export default class ArticleCategorySeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/article_categories.csv'
    try {
      const articleCategories = await promises.readFile(file)
      const records = parse(articleCategories, {
        columns: true,
        skip_empty_lines: true,
      })
      await ArticleCategory.createMany(records)
    } catch (e) {
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
