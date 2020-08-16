import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Streams extends BaseSchema {
  protected tableName = 'streams'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)

      table.integer('twitch_id').unsigned().notNullable()
      table.string('username', 80)
      table.string('display_name', 128)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
