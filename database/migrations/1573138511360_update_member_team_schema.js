'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateMemberTeamSchema extends Schema {
  up () {
    this.table('member_team', (table) => {
      table.boolean('academy').defaultTo(0)
    })
  }

  down () {
    this.table('member_team', (table) => {
      table.dropColumn('academy')
    })
  }
}

module.exports = UpdateMemberTeamSchema
