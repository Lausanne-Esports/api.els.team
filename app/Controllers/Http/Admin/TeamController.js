'use strict'

const Team = use('App/Models/Team')

class TeamController {
  index () {
    return Team.query().with('category').fetch()
  }

  store ({ request }) {
    return Team.create(
      request.only(['name', 'category_id'])
    )
  }

  show ({ params }) {
    return Team.findOrFail(params.id)
  }

  async update ({ params, request, response }) {
    const team = await Team.findOrFail(params.id)

    team.merge(request.only(['name', 'category_id']))
    await team.save()

    return response.noContent()
  }
}

module.exports = TeamController
