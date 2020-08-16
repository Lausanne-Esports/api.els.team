import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Database from '@ioc:Adonis/Lucid/Database'
import Award from 'App/Models/Award'

export default class AwardSeeder extends BaseSeeder {
  public async run () {
    const awardsFile = 'tmp/awards.csv'
    const pivotFile = 'tmp/award_category_order_by_year.csv'
    try {
      const awards = await promises.readFile(awardsFile)
      const pivotTables = await promises.readFile(pivotFile)

      const awardsRecords = parse(awards, {
        columns: true,
        skip_empty_lines: true,
      })
      const pivotRecords = parse(pivotTables, {
        columns: true,
        skip_empty_lines: true,
      })

      await Award.createMany(awardsRecords)
      await Database.table('award_category_order_by_year').multiInsert(pivotRecords)
    } catch (e) {
      console.log(`Error! File ${awardsFile} or ${pivotFile} does not exist.`)
    }
  }
}
