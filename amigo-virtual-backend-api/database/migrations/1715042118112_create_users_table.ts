import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('User ID')
      table.string('phone').notNullable().comment('User phone')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
      table.timestamp('updated_at', {useTz: true}).nullable().comment('Update date')
      table.timestamp('deleted_at', {useTz: true}).nullable().comment('Deletion date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
