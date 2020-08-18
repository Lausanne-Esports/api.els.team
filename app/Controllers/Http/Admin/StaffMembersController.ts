/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'

export default class StaffMembersController {
  public async index ({ params, response }: HttpContextContract) {
    const staff = await Staff.findOrFail(params.staff_id)

    await staff.preload('members', (query) => {
      query.orderBy('order')
    })

    return response.json(staff.members)
  }
}
