'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Database = use('Database')
const Team = use('App/Models/Team')

class TeamController {
  index () {
    return Team.query().with('category').orderBy('order', 'asc').fetch()
  }

  async store ({ request }) {
    const data = request.only(['name', 'category_id', 'academy', 'activated'])
    const [{ max: maxOrder }] = await Database.from('teams').max('order')

    data.order = maxOrder + 1 || 1

    return Team.create(data)
  }

  show ({ params }) {
    return Team.findOrFail(params.id)
  }

  async update ({ params, request, response }) {
    const team = await Team.findOrFail(params.id)

    team.merge(request.only(['name', 'category_id', 'academy', 'activated']))
    await team.save()

    return response.noContent()
  }

  async order ({ request, response }) {
    const { order: newOrder } = request.only('order')
    const teams = await Team.all()
    const updates = []

    for (const order of newOrder) {
      const team = teams.rows.find(team => team.$attributes.id === order.id)

      if (team.order !== order.order) {
        team.order = order.order
        updates.push(team.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }
}

module.exports = TeamController
