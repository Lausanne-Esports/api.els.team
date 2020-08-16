import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import TeamCategory from './TeamCategory'

export default class AwardCategoryOrder extends BaseModel {
  public static table = 'award_category_order_by_year'

  @column({ isPrimary: true })
  public id: number

  @column()
  public year: number

  @column()
  public order: number

  @column()
  public categoryId: number

  @belongsTo(() => TeamCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof TeamCategory>
}
