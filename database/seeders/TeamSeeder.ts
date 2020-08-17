/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Team from 'App/Models/Team'

export default class TeamSeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/teams.csv'
    try {
      const teams = await promises.readFile(file)
      const records = parse(teams, {
        columns: true,
        skip_empty_lines: true,
      })
      await Team.createMany(records)
    } catch (e) {
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
