/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ArticleTemplate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
}
