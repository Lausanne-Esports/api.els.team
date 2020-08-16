import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Award from 'App/Models/Award'
import AwardCategoryOrder from 'App/Models/AwardCategoryOrder'

export default class AwardsController {
  public async index ({ response }: HttpContextContract) {
    const awards = await Award.query().preload('category').orderBy('order', 'asc')

    return response.json(awards)
  }

  public async categoryOrder ({ response }: HttpContextContract) {
    const awards = await AwardCategoryOrder.all()

    return response.json(awards)
  }
}
