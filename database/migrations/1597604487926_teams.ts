import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Teams extends BaseSchema {
  protected tableName = 'teams'

  public async up () {
    this.schema.createTable('teams', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('name')
      table.boolean('academy').notNullable().defaultTo(false)
      table.integer('order').unsigned().notNullable()
      table.boolean('activated').notNullable().defaultTo(false)
      table.integer('category_id').unsigned().notNullable()
    })

    this.schema.createTable('team_categories', (table) => {
      table.increments('id')

      table.string('name')
      table.string('code')
    })

    this.schema.createTable('members', (table) => {
      table.increments('id')
      table.timestamps(true)

      table.string('nickname')
      table.string('lastname')
      table.string('firstname')
      table.date('birth_on')
      table.string('picture')

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

    this.schema.createTable('member_team', (table) => {
      table.integer('member_id').unsigned().notNullable()
      table.integer('team_id').unsigned().notNullable()
      table.string('role')
      table.integer('order').unsigned().notNullable()
      table.boolean('academy').defaultTo(0)
    })
  }

  public async down () {
    this.schema.dropTableIfExists('teams')
    this.schema.dropTableIfExists('team_categories')
    this.schema.dropTableIfExists('members')
    this.schema.dropTableIfExists('member_team')
  }
}
