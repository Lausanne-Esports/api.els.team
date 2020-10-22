/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Articles extends BaseSchema {
  public async up () {
    this.schema.createTable('articles', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('thumbnail')
      table.string('featured_thumbnail')
      table.boolean('featured').notNullable().defaultTo(false)
      table.dateTime('published_at').defaultTo(this.now())
      table.integer('template_id').unsigned().notNullable().defaultTo(1)
      table.integer('category_id').unsigned().notNullable().defaultTo(1)
    })

    this.schema.createTable('article_translations', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('headline').notNullable()
      table.text('description')
      table.text('body').notNullable()
      table.text('html')

      table.integer('view_count').unsigned().notNullable().defaultTo(0)
      table.integer('article_id').unsigned().notNullable()
      table.integer('state_id').unsigned().notNullable().defaultTo(1)
      table.integer('language_id').unsigned().notNullable()
    })

    this.schema.createTable('languages', (table) => {
      table.increments('id')

      table.string('name')
      table.string('code')
    })

    this.schema.createTable('article_templates', (table) => {
      table.increments('id')

      table.string('name')
    })

    this.schema.createTable('article_states', (table) => {
      table.increments('id')

      table.string('name')
    })

    this.schema.createTable('article_categories', (table) => {
      table.increments('id')

      table.string('name')
      table.string('code')
    })
  }

  public async down () {
    this.schema.dropTableIfExists('languages')
    this.schema.dropTableIfExists('articles')
    this.schema.dropTableIfExists('article_translations')
    this.schema.dropTableIfExists('article_templates')
    this.schema.dropTableIfExists('article_states')
    this.schema.dropTableIfExists('article_categories')
  }
}
