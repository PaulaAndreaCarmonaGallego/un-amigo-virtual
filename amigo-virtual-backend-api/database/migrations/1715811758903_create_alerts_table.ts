import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alerts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Alert ID')
      table.uuid('alert_type').notNullable().references('alert_types.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Alert type ID')
      table.string('description').notNullable().comment('Description of the alert')
      table.string('source').notNullable().comment('Source of the alert: Questionnaire or chat')
      table.string('action_type', 50).notNullable().comment('Action type: Attention or notification: Suicidal ideation, depression, anxiety.')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
