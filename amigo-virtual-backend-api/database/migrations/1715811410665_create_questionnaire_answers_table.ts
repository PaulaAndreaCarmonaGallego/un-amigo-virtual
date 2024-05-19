import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questionnaire_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('questionnaire_summary_id').notNullable().references('questionnaires.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Questionnaire summary ID: reference to PHQ9 or GAD7 questionnaire')
      table.uuid('questionnaire_question_id').notNullable().references('questionnaire_questions.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('Questionnaire question ID: reference to PHQ9 or GAD7 questionnaire question')
      table.integer('value').notNullable().comment('Questionnaire answer value')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
