import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Questionnaire from '#models/Questionnaire'
import QuestionnaireQuestion from '#models/QuestionnaireQuestion'



export default class QuestionnaireAnswer extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare questionnaireSummaryId: string

  @column()
  declare questionnaireQuestionId: string

  @column()
  declare value: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Questionnaire)
  declare questionnaires: BelongsTo<typeof Questionnaire>

  @belongsTo(() => QuestionnaireQuestion)
  declare questionnaireQuestions: BelongsTo<typeof QuestionnaireQuestion>

}
