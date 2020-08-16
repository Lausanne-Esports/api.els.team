import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Stream from 'App/Models/Stream'

export default class StreamSeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/streams.csv'
    try {
      const streams = await promises.readFile(file)
      const streamsRecords = parse(streams, {
        columns: true,
        skip_empty_lines: true,
      })
      await Stream.createMany(streamsRecords)
    } catch (e) {
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
