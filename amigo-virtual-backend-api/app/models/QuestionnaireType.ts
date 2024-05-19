import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Questionnaire from '#models/Questionnaire'
import QuestionnaireQuestion from '#models/QuestionnaireQuestion'


export default class QuestionnaireType extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Questionnaire)
  declare questionnaires: HasMany<typeof Questionnaire>

  @hasMany(() => QuestionnaireQuestion)
  declare questions: HasMany<typeof QuestionnaireQuestion>


}
