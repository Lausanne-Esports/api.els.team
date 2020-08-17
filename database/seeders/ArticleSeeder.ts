/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Article from 'App/Models/Article'

export default class ArticleCategorySeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/articles.csv'
    try {
      const articles = await promises.readFile(file)
      const records = parse(articles, {
        columns: true,
        skip_empty_lines: true,
      })
      await Article.createMany(records)
    } catch (e) {
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
