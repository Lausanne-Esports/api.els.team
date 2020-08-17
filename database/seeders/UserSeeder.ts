/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    const file = 'tmp/users.csv'
    try {
      const users = await promises.readFile(file)
      const records = parse(users, {
        columns: true,
        skip_empty_lines: true,
      })
      await User.createMany(records)
    } catch (e) {
      console.log(`Error! File ${file} does not exist.`)
    }
  }
}
