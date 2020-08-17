/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Language from './Language'
import Article from './Article'
import ArticleState from './ArticleState'

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
  public articleId: number

  @column()
  public languageId: number

  @column()
  public stateId: number

  @belongsTo(() => Article)
  public article: BelongsTo<typeof Article>

  @belongsTo(() => Language, { foreignKey: 'languageId' })
  public language: BelongsTo<typeof Language>

  @belongsTo(() => ArticleState, { foreignKey: 'stateId' })
  public state: BelongsTo<typeof ArticleState>
}
