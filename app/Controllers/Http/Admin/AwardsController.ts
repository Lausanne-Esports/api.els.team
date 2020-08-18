/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Award from 'App/Models/Award'
import Database from '@ioc:Adonis/Lucid/Database'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'
import AwardCategoryOrderValidator from 'App/Validators/AwardCategoryOrderValidator'
import AwardValidator from 'App/Validators/AwardValidator'

export default class AwardsController {
  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(AwardValidator)

    const { maxOrder } = await Database.from('awards').where('year', data.year).max('order as maxOrder').first()

    const { maxCategoryOrder } = await Database
      .from('award_category_order_by_year')
      .where('year', data.year)
      .max('order as maxCategoryOrder')
      .first()

    const { categoryAlreadyExists } = await Database
      .from('award_category_order_by_year')
      .where('year', data.year)
      .where('category_id', data.category_id)
      .count('* as categoryAlreadyExists')
      .first()

    if (Number(categoryAlreadyExists) === 0) {
      const categoryOrder = maxCategoryOrder ? maxCategoryOrder + 1 : 1
      await Database
        .insertQuery()
        .table('award_category_order_by_year')
        .insert({
          category_id: data.category_id,
          year: data.year,
          order: categoryOrder,
        })
    }

    Award.create({
      ...data,
      order: maxOrder ? maxOrder + 1 : 1,
    })

    return response.noContent()
  }
  public async order ({ request, response }: HttpContextContract) {
    const { order: newOrder } = await request.validate(OrderUpdateValidator)

    const awards = await Award.all()
    const updates: Promise<Award>[] = []

    for (const order of newOrder) {
      const award = awards.find(award => award.id === order.id)

      if (award && award.order !== order.order) {
        award.order = order.order
        updates.push(award.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }

  public async categoryOrder ({ request, response }: HttpContextContract) {
    const { categories } = await request.validate(AwardCategoryOrderValidator)

    const updates = categories.map((category) => {
      return Database
        .from('award_category_order_by_year')
        .where('category_id', category.category_id)
        .where('year', category.year)
        .update({ order: category.order })
    })

    await Promise.all(updates)

    return response.noContent()
  }
}
