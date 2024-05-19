import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import QuestionnaireType from '#models/QuestionnaireType'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import QuestionnaireAnswer from '#models/QuestionnaireAnswer'


export default class QuestionnaireQuestion extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare questionnaireTypeId: string

  @column()
  declare question: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => QuestionnaireType)
  declare questionnaireTypes: BelongsTo<typeof QuestionnaireType>

  @hasMany(() => QuestionnaireAnswer)
  declare questionnaireAnswers: HasMany<typeof QuestionnaireAnswer>

}
