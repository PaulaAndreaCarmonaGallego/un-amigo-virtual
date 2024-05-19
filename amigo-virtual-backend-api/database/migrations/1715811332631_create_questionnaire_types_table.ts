import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questionnaire_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Questionnaire type ID')
      table.string('name').notNullable().comment('Questionnaire type name: PHQ9 or GAD7')
      table.string('description').notNullable().comment('Questionnaire type description')
      table.timestamp('created_at', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
