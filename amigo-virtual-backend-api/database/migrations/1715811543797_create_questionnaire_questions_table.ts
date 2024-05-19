import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questionnaire_questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('questionnaire_type_id').notNullable().references('questionnaire_types.id').onDelete('NO ACTION').onUpdate('CASCADE')
      table.string('question').notNullable()
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
