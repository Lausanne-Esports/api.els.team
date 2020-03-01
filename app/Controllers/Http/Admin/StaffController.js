'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const Database = use('Database')
const Staff = use('App/Models/Staff')

class StaffController {
  index () {
    return Staff.query().orderBy('order', 'asc').fetch()
  }

  show ({ params }) {
    return Staff.findOrFail(params.id)
  }

  async store ({ request }) {
    const data = request.only(['name', 'activated'])
    const [{ 'max(`order`)': maxOrder }] = await Database.from('staff').max('order')

    data.order = maxOrder + 1 || 1

    return Staff.create(data)
  }

  async update ({ params, request, response }) {
    const staff = await Staff.findOrFail(params.id)

    staff.merge(request.only(['name', 'activated']))
    await staff.save()

    return response.noContent()
  }

  async order ({ request, response }) {
    const { order: newOrder } = request.only('order')

    const allStaff = await Staff.all()
    const updates = []

    for (const order of newOrder) {
      const staff = allStaff.rows.find(staff => staff.$attributes.id === order.id)

      if (staff.order !== order.order) {
        staff.order = order.order
        updates.push(staff.save())
      }
    }

    await Promise.all(updates)

    return response.noContent()
  }
}

module.exports = StaffController
