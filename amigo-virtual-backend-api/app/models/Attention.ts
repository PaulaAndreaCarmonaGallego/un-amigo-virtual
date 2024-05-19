import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SystemUser from '#models/SystemUser'
import Alert from '#models/Alert'

export default class Attention extends compose(BaseModel, SoftDeletes){
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare systemUserId: string

  @column()
  declare alertId: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => SystemUser)
  declare systemUsers: BelongsTo<typeof SystemUser>

  @belongsTo(() => Alert)
  declare alerts: BelongsTo<typeof Alert>

}
