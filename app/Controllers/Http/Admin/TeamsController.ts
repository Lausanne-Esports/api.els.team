/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import TeamValidator from 'App/Validators/TeamValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'

export default class TeamsController {
  public async index ({ response }: HttpContextContract) {
    const teams = await Team.query().preload('category').orderBy('order', 'asc')

    return response.json(teams)
  }

  public async show ({ params, response }: HttpContextContract) {
    const team = await Team.findOrFail(params.id)

    return response.json(team)
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(TeamValidator)
    const { max } = await Database.query().max('order as max').from('teams').first()

    const team = await Team.create({
      ...data,
      order: max + 1 || 1,
    })

    return response.json(team)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const data = await request.validate(TeamValidator)
    const team = await Team.findOrFail(params.id)

    team.merge(data)
    await team.save()

    return response.noContent()
  }

  public async order ({ request, response }: HttpContextContract) {
    const { order: newOrder } = await request.validate(OrderUpdateValidator)

    const teams = await Team.all()
    const updates: Promise<Team>[] = []

    for (const order of newOrder) {
      const team = teams.find(team => team.id === order.id)

      if (team && team.order !== order.order) {
        team.order = order.order
        updates.push(team.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }
}
