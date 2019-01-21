'use strict'

const Schema = use('Schema')

class StreamSchema extends Schema {
  up () {
    this.create('streams', (table) => {
      table.increments()
      table.integer('twitch_id').unsigned().notNullable()
      table.string('username', 80)
      table.string('display_name', 128)
      table.timestamps()
    })
  }

  down () {
    this.drop('streams')
  }
}

module.exports = StreamSchema
