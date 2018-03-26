'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.timestamps()

      table.string('title')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
