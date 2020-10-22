/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Awards extends BaseSchema {
  public async up () {
    this.schema.createTable('awards', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('event_name').notNullable()
      table.string('lineup').notNullable()
      table.integer('year').unsigned().notNullable()
      table.integer('result').unsigned().notNullable()
      table.integer('order').unsigned().notNullable()
      table.integer('category_id').unsigned().notNullable()
    })

    this.schema.createTable('award_category_order_by_year', (table) => {
      table.increments('id')

      table.integer('category_id')
      table.integer('year')
      table.integer('order')
    })
  }

  public async down () {
    this.schema.dropTableIfExists('awards')
    this.schema.dropTableIfExists('award_category_order_by_year')
  }
}
