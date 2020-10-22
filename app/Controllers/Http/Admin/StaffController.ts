/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'
import StaffValidator from 'App/Validators/StaffValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'

export default class StaffController {
  public async index ({ response }: HttpContextContract) {
    const allStaff = await Staff.query().orderBy('order', 'asc')

    return response.json(allStaff)
  }

  public async show ({ params, response }: HttpContextContract) {
    const staff = await Staff.findOrFail(params.id)

    return response.json(staff)
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(StaffValidator)
    const { max } = await Database.query().max('order as max').from('staff').first()

    const staff = await Staff.create({
      ...data,
      order: max + 1 || 1,
    })

    return response.json(staff)
  }

  public async update ({params, request, response}: HttpContextContract) {
    const data = await request.validate(StaffValidator)
    const staff = await Staff.findOrFail(params.id)

    staff.merge(data)
    await staff.save()

    return response.noContent()
  }

  public async order ({request, response}: HttpContextContract) {
    const { order: newOrder } = await request.validate(OrderUpdateValidator)

    const allStaff = await Staff.all()
    const updates: Promise<Staff>[] = []

    for (const order of newOrder) {
      const staff = allStaff.find(staff => staff.id === order.id)

      if (staff && staff.order !== order.order) {
        staff.order = order.order
        updates.push(staff.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }
}
