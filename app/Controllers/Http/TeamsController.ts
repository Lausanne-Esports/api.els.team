import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TeamRepository from 'App/Repositories/TeamRepository'
import TeamTransformer from 'App/Transformers/TeamTransformer'

export default class TeamsController {
  public async index ({ response }: HttpContextContract) {
    const teams = await TeamRepository.all()

    return response.json(TeamTransformer.transformCollection(teams))
  }

  public async show ({params, response}: HttpContextContract) {
    const team = await TeamRepository.get(params.id)

    return response.json(TeamTransformer.transform(team, true))
  }
}
