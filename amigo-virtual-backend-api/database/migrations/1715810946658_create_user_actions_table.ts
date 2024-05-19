import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_actions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('User action ID')
      table.uuid('user_id').notNullable().references('users.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('User ID')
      table.uuid('action_id').notNullable().references('actions.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Action ID')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}


