/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

import Staff from 'App/Models/Staff'

class StaffRepository {
  public all () {
    return Staff
      .query()
      .preload('members')
      .where('activated', true)
      .orderBy('order', 'asc')
  }

  public get (id: number) {
    return Staff
      .query()
      .where('id', id)
      .where('activated', true)
      .preload('members', (query) => {
        query.pivotColumns(['role', 'order'])
        query.orderBy('order', 'asc')
      })
      .firstOrFail()
  }
}

export default new StaffRepository()
