'use strict'

const Schema = use('Schema')

class UpdateMembersSchema extends Schema {
  up () {
    this.table('members', (table) => {
      table.string('picture')
    })
  }

  down () {
    this.table('members', (table) => {
      table.dropColumn('picture')
    })
  }
}

module.exports = UpdateMembersSchema
