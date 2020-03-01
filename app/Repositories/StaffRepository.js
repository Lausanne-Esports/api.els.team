'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

class StaffRepository {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return ['App/Models/Staff']
  }

  constructor (Staff) {
    this.Staff = Staff
  }

  all () {
    return this.Staff
      .query()
      .with('members')
      .where('activated', true)
      .orderBy('order', 'asc')
      .fetch()
  }

  get (id) {
    return this.Staff
      .query()
      .where('id', id)
      .where('activated', true)
      .with('members')
      .firstOrFail()
  }
}

module.exports = StaffRepository
