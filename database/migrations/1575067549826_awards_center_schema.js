'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AwardsCenterSchema extends Schema {
  up () {
    this.create('awards', (table) => {
      table.increments()
      table.timestamps()
      table.string('event_name').notNullable()
      table.string('lineup').notNullable()
      table.integer('year').unsigned().notNullable()
      table.integer('result').unsigned().notNullable()
      table.integer('order').unsigned().notNullable()
      table.integer('category_id').unsigned().notNullable()
    })
  }

  down () {
    this.drop('awards')
  }
}

module.exports = AwardsCenterSchema
