import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ArticleCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string
}
