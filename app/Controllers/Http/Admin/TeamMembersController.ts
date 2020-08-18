/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import Member from 'App/Models/Member'
import Database from '@ioc:Adonis/Lucid/Database'
import TeamMemberStoreValidator from 'App/Validators/TeamMemberStoreValidator'
import TeamMemberUpdateValidator from 'App/Validators/TeamMemberUpdateValidator'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'

export default class TeamMembersController {
  public async index ({ params, response }: HttpContextContract) {
    const team = await Team.findOrFail(params.team_id)
    await team.preload('members', (query) => {
      query.orderBy('order')
    })

    return response.json(team.members)
  }

  public async store ({ params, request, response }: HttpContextContract) {
    const { academy, member_id: memberId, role } = await request.validate(TeamMemberStoreValidator)
    const [team, member] = await Promise.all([
      Team.findOrFail(params.team_id),
      Member.findOrFail(memberId),
    ])

    const { max } = await Database.from('member_team').where('team_id', team.id).max('order as max').first()

    await team.related('members').attach({
      [member.id]: {
        role: role,
        order: max + 1 || 1,
        academy: academy,
      },
    })

    return response.noContent()
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const { academy, role } = await request.validate(TeamMemberUpdateValidator)
    const [team, member] = await Promise.all([
      Team.findOrFail(params.team_id),
      Member.findOrFail(params.id),
    ])

    await Database
      .from('member_team')
      .where('member_id', member.id)
      .where('team_id', team.id)
      .update({ role, academy })

    return response.noContent()
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const [team, member] = await Promise.all([
      Team.findOrFail(params.team_id),
      Member.findOrFail(params.id),
    ])

    await team.related('members').detach([member.id])

    return response.noContent()
  }

  public async order ({ params, request, response }: HttpContextContract) {
    const { order: newOrder } = await request.validate(OrderUpdateValidator)
    const updates: Promise<any>[] = []

    for (const order of newOrder) {
      updates.push(
        Database
          .from('member_team')
          .where('member_id', order.id)
          .where('team_id', params.team_id)
          .update({ order: order.order })
      )
    }

    await Promise.all(updates)

    return response.noContent()
  }
}
