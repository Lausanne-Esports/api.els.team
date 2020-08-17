/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public nickname: string

  @column()
  public lastname: string

  @column()
  public firstname: string

  @column()
  public birth_on: Date

  @column()
  public picture: string

  @column()
  public contract: string

  @column()
  public iban: string

  @column()
  public rib: string

  @column()
  public swift: string

  @column()
  public clothesSize: string

  @column()
  public phoneNumber: string

  @column()
  public address: string

  @column()
  public postalCode: string

  @column()
  public city: string

  @column()
  public battletag: string

  @column()
  public facebook: string

  @column()
  public steam: string

  @column()
  public twitch: string

  @column()
  public twitter: string

  @column()
  public youtube: string

  // static get dates () {
  //   return super.dates.concat(['birth_on'])
  // }

  @manyToMany(() => Team, {
    localKey: 'id',
    pivotForeignKey: 'member_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'team_id',
    pivotTable: 'member_team',
    pivotColumns: ['role', 'order', 'academy'],
  })
  public teams: ManyToMany<typeof Team>
}
