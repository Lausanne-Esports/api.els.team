/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - alentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StaffRepository from 'App/Repositories/StaffRepository'
import StaffTransformer from 'App/Transformers/StaffTransformer'

export default class StaffController {
  public async index ({ response }: HttpContextContract) {
    const staff = await StaffRepository.all()

    return response.json(StaffTransformer.transformCollection(staff))
  }

  public async show ({ params, response }: HttpContextContract) {
    const staff = await StaffRepository.get(params.id)

    return response.json(StaffTransformer.transform(staff, true))
  }
}
