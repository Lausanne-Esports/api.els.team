'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AwardCategoryOrderByYearSchema extends Schema {
  up () {
    this.create('award_category_order_by_year', (table) => {
      table.increments()
      table.integer('category_id')
      table.integer('year')
      table.integer('order')
    })
  }

  down () {
    this.drop('award_category_order_by_year')
  }
}

module.exports = AwardCategoryOrderByYearSchema
