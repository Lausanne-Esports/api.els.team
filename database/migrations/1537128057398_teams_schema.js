'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Schema = use('Schema')

class TeamsSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.timestamps()

      table.string('name')
      table.boolean('academy').notNullable().defaultTo(false)
      table.integer('order').unsigned().notNullable()
      table.boolean('activated').notNullable().defaultTo(false)
      table.integer('category_id').unsigned().notNullable()
    })

    this.create('team_categories', (table) => {
      table.increments()

      table.string('name')
      table.string('code')
    })

    this.create('members', (table) => {
      table.increments()
      table.timestamps()

      table.string('nickname')
      table.string('lastname')
      table.string('firstname')
      table.date('birth_on')

      table.string('contract')
      table.string('iban')
      table.string('rib')
      table.string('swift')

      table.string('clothes_size')
      table.string('phone_number')
      table.string('address')
      table.string('postal_code')
      table.string('city')

      table.string('battletag')
      table.string('facebook')
      table.string('steam')
      table.string('twitch')
      table.string('twitter')
      table.string('youtube')
    })

    this.create('member_team', (table) => {
      table.integer('member_id').unsigned().notNullable()
      table.integer('team_id').unsigned().notNullable()
      table.string('role')
      table.integer('order').unsigned().notNullable()
    })
  }

  down () {
    this.dropIfExists('teams')
    this.dropIfExists('team_categories')
    this.dropIfExists('members')
    this.dropIfExists('member_team')
  }
}

module.exports = TeamsSchema
