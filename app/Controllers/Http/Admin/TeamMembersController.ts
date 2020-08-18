/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'

export default class TeamMembersController {
  public async index ({params, response}: HttpContextContract) {
    const team = await Team.findOrFail(params.id)
    await team.preload('members', (query) => {
      query.orderBy('order')
    })

    return response.json(team.members)
  }
}
