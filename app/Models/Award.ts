/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import TeamCategory from './TeamCategory'

export default class Award extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public eventName: string

  @column()
  public lineup: string

  @column()
  public year: number

  @column()
  public result: number

  @column()
  public order: number

  @column()
  public categoryId: number

  @belongsTo(() => TeamCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof TeamCategory>
}
