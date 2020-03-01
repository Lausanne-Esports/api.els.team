'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const Database = use('Database')
const Staff = use('App/Models/Staff')
const Member = use('App/Models/Member')

class StaffMemberController {
  async index ({ params }) {
    const team = await Staff.findOrFail(params.id)

    return team.members().fetch()
  }

  async store ({ params, request, response }) {
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.id),
      Member.findOrFail(request.input('member_id')),
    ])

    const [{ 'max(`order`)': maxOrder }] = await Database.from('member_staff').where('staff_id', staff.id).max('order')

    await staff.members().attach([member.id], (row) => {
      row.role = request.input('role')
      row.order = maxOrder + 1 || 1
    })

    return response.noContent()
  }

  async update ({ params, request, response }) {
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.id),
      Member.findOrFail(params.memberId),
    ])

    await Database.table('member_staff')
      .where('member_id', member.id)
      .where('staff_id', staff.id)
      .update({
        role: request.input('role'),
      })

    return response.noContent()
  }

  async destroy ({ params, response }) {
    const [staff, member] = await Promise.all([
      Staff.findOrFail(params.id),
      Member.findOrFail(params.memberId),
    ])

    await staff.members().detach([member.id])

    return response.noContent()
  }

  async order ({ params, request, response }) {
    const { order: newOrder } = request.only('order')
    const updates = []

    for (const order of newOrder) {
      updates.push(
        Database.table('member_staff')
          .where('member_id', order.id)
          .where('staff_id', params.id)
          .update({ order: order.order }),
      )
    }

    await Promise.all(updates)

    return response.noContent()
  }
}

module.exports = StaffMemberController
