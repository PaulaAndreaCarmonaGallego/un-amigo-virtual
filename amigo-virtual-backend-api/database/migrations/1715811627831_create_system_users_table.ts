import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'system_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('System user ID')
      table.string('name', 50).notNullable().index().comment('User name')
      table.string('last_name', 50).notNullable().index().comment('User last name')
      table.string('email', 255).notNullable().unique().comment('User email')
      table.string('phone', 20).notNullable().comment('User phone')
      table.string('password', 255).notNullable().comment('User password')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
      table.timestamp('updated_at', {useTz: true}).nullable().comment('Update date')
      table.timestamp('deleted_at', {useTz: true}).nullable().comment('Deletion date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
