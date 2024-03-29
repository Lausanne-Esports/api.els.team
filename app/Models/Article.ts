/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany, scope } from '@ioc:Adonis/Lucid/Orm'
import ArticleCategory from './ArticleCategory'
import ArticleTranslation from './ArticleTranslation'
import ArticleTemplate from './ArticleTemplate'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public thumbnail: string

  @column()
  public featuredThumbnail: string

  @column()
  public featured: boolean

  @column.dateTime({ autoCreate: true, consume: (value) => {
    return DateTime.fromJSDate(value).toFormat('yyyy-LL-dd HH:mm')
  },
  })
  public publishedAt: DateTime

  @column()
  public categoryId: number

  @column()
  public templateId: number

  @belongsTo(() => ArticleCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof ArticleCategory>

  @belongsTo(() => ArticleTemplate, { foreignKey: 'templateId' })
  public template: BelongsTo<typeof ArticleTemplate>

  @hasMany(() => ArticleTranslation)
  public translations: HasMany<typeof ArticleTranslation>

  public static published = scope((query) => {
    query.where('published_at', '<', DateTime.utc().toSQLDate())
  })
}
