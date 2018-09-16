'use strict'

const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.timestamps()

      table.string('thumbnail')
      table.string('featured_thumbnail')
      table.boolean('featured').notNullable().defaultTo(false)
      table.dateTime('published_at').defaultTo(this.fn.now())

      table.integer('template_id').unsigned().notNullable().defaultTo(1)
      table.integer('category_id').unsigned().notNullable().defaultTo(1)
    })

    this.create('article_translations', (table) => {
      table.increments()
      table.timestamps()

      table.string('headline').notNullable()
      table.text('description')
      table.text('body').notNullable()

      table.integer('view_count').unsigned().notNullable().defaultTo(0)
      table.integer('article_id').unsigned().notNullable()
      table.integer('state_id').unsigned().notNullable().defaultTo(1)
      table.integer('language_id').unsigned().notNullable()
    })

    this.create('languages', (table) => {
      table.increments()

      table.string('name')
      table.string('code')
    })

    this.create('article_templates', (table) => {
      table.increments()

      table.string('name')
    })

    this.create('article_states', (table) => {
      table.increments()

      table.string('name')
    })

    this.create('article_categories', (table) => {
      table.increments()

      table.string('name')
      table.string('code')
    })
  }

  down () {
    this.dropIfExists('languages')
    this.dropIfExists('articles')
    this.dropIfExists('article_translations')
    this.dropIfExists('article_templates')
    this.dropIfExists('article_states')
    this.dropIfExists('article_categories')
  }
}

module.exports = ArticleSchema
