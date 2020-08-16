import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ArticleTranslation from './ArticleTranslation'

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @hasMany(() => ArticleTranslation, { foreignKey: 'languageId' })
  public translations: HasMany<typeof ArticleTranslation>
}
