/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import TeamCategory from './TeamCategory'
import Member from './Member'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public academy: boolean

  @column()
  public order: number

  @column()
  public activated: boolean

  @column()
  public categoryId: number

  @belongsTo(() => TeamCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof TeamCategory>

  @manyToMany(() => Member, {
    localKey: 'id',
    pivotForeignKey: 'team_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'member_id',
    pivotTable: 'member_team',
    pivotColumns: ['role', 'order', 'academy'],
  })
  public members: ManyToMany<typeof Member>
}
