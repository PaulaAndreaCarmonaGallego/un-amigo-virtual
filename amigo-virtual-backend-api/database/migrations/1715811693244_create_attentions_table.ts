import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attentions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Attention ID')
      table.uuid('system_user_id').notNullable().references('system_users.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('System user ID')
      table.uuid('alert_id').notNullable().references('alerts.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Alert ID')
      table.string('description', 50).notNullable().comment('Description or notes of care given')
      table.string('status').notNullable().comment('Status of the attention: Attended / Not attended / In process')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
