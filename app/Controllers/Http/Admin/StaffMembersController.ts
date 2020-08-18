/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Staff from 'App/Models/Staff'
import Member from 'App/Models/Member'
import Database from '@ioc:Adonis/Lucid/Database'
import StaffMemberStoreValidator from 'App/Validators/StaffMemberStoreValidator'
import StaffMemberUpdateValidator from 'App/Validators/StaffMemberUpdateValidator'
import OrderUpdateValidator from 'App/Validators/OrderUpdateValidator'

export default class StaffMembersController {
  public async index ({ params, response }: HttpContextContract) {
    const staff = await Staff.findOrFail(params.staff_id)
    await staff.preload('members', (query) => {
      query.orderBy('order')
    })

    return response.json(staff.members)
  }

  public async store ({ params, request, response }: HttpContextContract) {
    const { member_id: memberId, role } = await request.validate(StaffMemberStoreValidator)
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.staff_id),
      Member.findOrFail(memberId),
    ])

    const { max } = await Database.from('member_staff').where('staff_id', staff.id).max('order as max').first()

    await staff.related('members').attach({
      [member.id]: {
        role: role,
        order: max + 1 || 1,
      },
    })

    return response.noContent()
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const { role } = await request.validate(StaffMemberUpdateValidator)
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.staff_id),
      Member.findOrFail(params.id),
    ])

    await Database
      .from('member_staff')
      .where('member_id', member.id)
      .where('staff_id', staff.id)
      .update({ role })

    return response.noContent()
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.staff_id),
      Member.findOrFail(params.id),
    ])

    await staff.related('members').detach([member.id])

    return response.noContent()
  }

  public async order ({ params, request, response }: HttpContextContract) {
    const { order: newOrder } = await request.validate(OrderUpdateValidator)
    const updates: Promise<any>[] = []

    for (const order of newOrder) {
      updates.push(
        Database
          .from('member_staff')
          .where('member_id', order.id)
          .where('staff_id', params.staff_id)
          .update({ order: order.order }),
      )
    }

    await Promise.all(updates)

    return response.noContent()
  }
}
