import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/User'
import QuestionnaireType from '#models/QuestionnaireType'
import QuestionnaireAnswer from '#models/QuestionnaireAnswer'


export default class Questionnaire extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare questionnaireTypeId: string

  @column()
  declare status: string

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime


  @hasMany(() => QuestionnaireAnswer)
  declare questionnaireAnswers: HasMany<typeof QuestionnaireAnswer>


  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => QuestionnaireType)
  declare questionnaireTypes: BelongsTo<typeof QuestionnaireType>


}
