/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Staff extends BaseSchema {
  public async up () {
    this.schema.createTable('staff', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('name')
      table.integer('order').unsigned().notNullable()
      table.boolean('activated').notNullable().defaultTo(false)
    })

    this.schema.createTable('member_staff', (table) => {
      table.integer('member_id').unsigned().notNullable()
      table.integer('staff_id').unsigned().notNullable()
      table.string('role')
      table.integer('order').unsigned().notNullable()
    })
  }

  public async down () {
    this.schema.dropTableIfExists('staff')
    this.schema.dropTableIfExists('member_staff')
  }
}
