'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Database = use('Database')
const Award = use('App/Models/Award')

class AwardController {
  index () {
    return Award.query().with('category').orderBy('order', 'asc').fetch()
  }

  async store ({ request }) {
    const data = request.only(['result', 'event_name', 'lineup', 'year', 'category_id'])
    const [{ 'max(`order`)': maxOrder }] = await Database.from('awards').where('year', data.year).max('order')

    data.order = maxOrder ? maxOrder + 1 : 1

    const [{ 'max(`order`)': maxCategoryOrder }] = await Database.from('award_category_order_by_year').where('year', data.year).max('order')
    const [{ 'count(*)': categoryAlreadyExists }] = await Database.from('award_category_order_by_year').where('year', data.year).where('category_id', data.category_id).count()

    if (!categoryAlreadyExists) {
      const categoryOrder = maxCategoryOrder ? maxCategoryOrder + 1 : 1
      await Database.table('award_category_order_by_year')
        .insert({
          category_id: data.category_id,
          year: data.year,
          order: categoryOrder,
        })
    }

    return Award.create(data)
  }

  async order ({ request, response }) {
    const { order: newOrder } = request.only('order')
    const awards = await Award.all()
    const updates = []

    for (const order of newOrder) {
      const award = awards.rows.find(award => award.$attributes.id === order.id)

      if (award.order !== order.order) {
        award.order = order.order
        updates.push(award.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }

  async categoryOrder ({ request, response }) {
    const { categories } = request.only('categories')

    const updates = categories.map((category) => {
      return Database.table('award_category_order_by_year')
        .where('category_id', category.category_id)
        .where('year', category.year)
        .update({ order: category.order })
    })

    await Promise.all(updates)

    return response.noContent()
  }
}

module.exports = AwardController
