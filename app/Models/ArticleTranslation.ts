import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Language from './Language'

export default class ArticleTranslation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public headline: string

  @column()
  public description: string

  @column()
  public body: string

  @column()
  public html: string

  @column()
  public viewCount: number

  @column()
  public languageId: number

  @belongsTo(() => Language)
  public language: BelongsTo<typeof Language>
}
