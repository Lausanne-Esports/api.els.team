'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

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

    const [{ 'max(`order`)': maxOrder }] = await Database.from('member_team').where('team_id', team.id).max('order')

    await team.members().attach([member.id], (row) => {
      row.role = request.input('role')
      row.order = maxOrder + 1 || 1
      row.academy = request.input('academy')
    })

    return response.noContent()
  }

  async update ({ params, request, response }) {
    const [team, member] = await Promise.all([
      Team.findOrFail(params.id),
      Member.findOrFail(params.memberId),
    ])

    await Database.table('member_team')
      .where('member_id', member.id)
      .where('team_id', team.id)
      .update({
        role: request.input('role'),
        academy: request.input('academy'),
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

  async order ({ params, request, response }) {
    const { order: newOrder } = request.only('order')
    // const teams = await Team.query().with('members').where('id', params.id).first()
    const updates = []

    for (const order of newOrder) {
      updates.push(
        Database.table('member_team')
          .where('member_id', order.id)
          .where('team_id', params.id)
          .update({ order: order.order })
      )

      // updates.push(
      //   teams.members().pivotQuery().where('member_id', order.id).update({ order: order.order })
      // )
    }

    await Promise.all(updates)

    return response.noContent()
  }
}

module.exports = TeamMemberController
