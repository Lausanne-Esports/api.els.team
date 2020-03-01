'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const Schema = use('Schema')

class StaffSchema extends Schema {
  up () {
    this.create('staff', (table) => {
      table.increments()
      table.timestamps()

      table.string('name')
      table.integer('order').unsigned().notNullable()
      table.boolean('activated').notNullable().defaultTo(false)
    })

    this.create('member_staff', (table) => {
      table.integer('member_id').unsigned().notNullable()
      table.integer('staff_id').unsigned().notNullable()
      table.string('role')
      table.integer('order').unsigned().notNullable()
    })
  }

  down () {
    this.dropIfExists('staff')
    this.dropIfExists('member_staff')
  }
}

module.exports = StaffSchema
