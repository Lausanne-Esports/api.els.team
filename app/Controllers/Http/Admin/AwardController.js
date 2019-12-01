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

    data.order = maxOrder + 1 || 1

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
}

module.exports = AwardController
