import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'chats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Chat ID')
      table.uuid('user_id').notNullable().references('users.id').onDelete('NO ACTION').onUpdate('CASCADE').comment('User ID: user associated with the chat')
      table.string('message').nullable().comment('Message sent by the user or bot')
      table.string('source').nullable().comment('Source of the message: User or bot')
      table.timestamp('created_ad', {useTz: true}).notNullable().defaultTo(this.now()).index().comment('Creation date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
