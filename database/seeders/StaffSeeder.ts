import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { promises } from 'fs'
import parse from 'csv-parse/lib/sync'
import Database from '@ioc:Adonis/Lucid/Database'
import Staff from 'App/Models/Staff'

export default class StaffSeeder extends BaseSeeder {
  public async run () {
    const staffFile = 'tmp/staff.csv'
    const pivotFile = 'tmp/member_staff.csv'
    try {
      const staff = await promises.readFile(staffFile)
      const pivotTables = await promises.readFile(pivotFile)

      const staffRecords = parse(staff, {
        columns: true,
        skip_empty_lines: true,
      })
      const pivotRecords = parse(pivotTables, {
        columns: true,
        skip_empty_lines: true,
      })

      await Staff.createMany(staffRecords)
      await Database.table('member_staff').multiInsert(pivotRecords)
    } catch (e) {
      console.log(e)
      console.log(`Error! File ${staffFile} or ${pivotFile} does not exist.`)
    }
  }
}
