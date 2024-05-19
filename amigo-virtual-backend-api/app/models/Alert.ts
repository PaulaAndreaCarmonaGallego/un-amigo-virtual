import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Attention from '#models/Attention'
import AlertType from '#models/AlertType'

export default class Alert extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare alertType: string

  @column()
  declare description: string

  @column()
  declare source: string

  @column()
  declare actionType: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasOne(() => Attention)
  declare attentions: HasOne<typeof Attention>

  @belongsTo(() => AlertType)
  declare alertTypes: BelongsTo<typeof AlertType>

}
