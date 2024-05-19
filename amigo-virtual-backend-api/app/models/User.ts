import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Chat from '#models/Chat'
import Action from '#models/Action'
import Questionnaire from '#models/Questionnaire'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare phone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare deletedAt: DateTime

  @hasMany(() => Chat, {
    foreignKey: 'userId',
  })
  declare chats: HasMany<typeof Chat>

  @manyToMany(() => Action, {
    localKey: 'id',
    pivotTable: 'user_actions',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'action_id',
  })
  declare action: ManyToMany<typeof Action>

  @hasMany(() => Questionnaire)
  declare questionnaires: HasMany<typeof Questionnaire>


}
