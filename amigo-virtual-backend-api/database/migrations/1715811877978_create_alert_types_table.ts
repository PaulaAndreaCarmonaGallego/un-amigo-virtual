import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alert_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Alert type ID')
      table.string('name', 50).notNullable().comment('Name of the alert type')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
