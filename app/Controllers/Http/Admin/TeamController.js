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

  async up ({ params, response }) {
    const team = await Team.findOrFail(params.id)
    const teamToSwap = await Team.findByOrFail('order', team.order - 1)

    team.order -= 1
    teamToSwap.order += 1

    await Promise.all([
      team.save(),
      teamToSwap.save(),
    ])

    return response.noContent()
  }

  async down ({ params, response }) {
    const team = await Team.findOrFail(params.id)
    const teamToSwap = await Team.findByOrFail('order', team.order + 1)

    team.order += 1
    teamToSwap.order -= 1

    await Promise.all([
      team.save(),
      teamToSwap.save(),
    ])

    return response.noContent()
  }
}

module.exports = TeamController
