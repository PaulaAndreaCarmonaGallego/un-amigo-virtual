import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questionnaires'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Questionnaire ID')
      table.uuid('user_id').notNullable().references('users.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('User ID')
      table.uuid('questionnaire_type_id').notNullable().references('questionnaire_types.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Questionnaire type ID: PHQ9 ot GAD7')
      table.string('status').notNullable().comment('Questionnaire status: completed or incomplete')
      table.integer('total').notNullable().comment('Score of questions')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
