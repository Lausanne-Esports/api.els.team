/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'

export default class Staff extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public order: number

  @column()
  public activated: boolean

  @manyToMany(() => Member, {
    localKey: 'id',
    pivotForeignKey: 'staff_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'member_id',
    pivotTable: 'member_staff',
    pivotColumns: ['role', 'order'],
  })
  public members: ManyToMany<typeof Member>
}
