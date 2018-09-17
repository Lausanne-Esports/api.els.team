'use strict'

const Database = use('Database')
const Team = use('App/Models/Team')
const Member = use('App/Models/Member')

class TeamMemberController {
  async index ({ params }) {
    const team = await Team.findOrFail(params.id)

    return team.members().fetch()
  }

  async store ({ params, request, response }) {
    const [team, member] = await Promise.all([
      Team.findOrFail(params.id),
      Member.findOrFail(request.input('member_id')),
    ])

    const [{ max: maxOrder }] = await Database.from('member_team').where('team_id', team.id).max('order')

    await team.members().attach([member.id], (row) => {
      row.role = request.input('role')
      row.order = maxOrder + 1
    })

    return response.noContent()
  }

  async destroy ({ params, response }) {
    const [team, member] = await Promise.all([
      Team.findOrFail(params.id),
      Member.findOrFail(params.memberId),
    ])

    await team.members().detach([member.id])

    return response.noContent()
  }

  async up ({ params, response }) {
    const team = await Team.findOrFail(params.id)
    const member = await team.members().where('member_id', params.memberId).first()
    const oldOrder = member.toJSON().__meta__.pivot_order
    const newOrder = member.toJSON().__meta__.pivot_order - 1

    const memberToSwap = await team.members().where('order', newOrder).first()

    await Promise.all([
      team.members().pivotQuery().where('member_id', member.id).update({ order: newOrder }),
      team.members().pivotQuery().where('member_id', memberToSwap.id).update({ order: oldOrder }),
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

module.exports = TeamMemberController
