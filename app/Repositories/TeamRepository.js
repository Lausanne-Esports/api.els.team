'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const ModelNotFound = use('App/Exceptions/ModelNotFoundException')

class TeamRepository {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return ['App/Models/Team']
  }

  constructor (Team) {
    this.Team = Team
  }

  all () {
    return this.Team
      .query()
      .with('category')
      .with('members')
      .where('activated', true)
      .orderBy('order', 'asc')
      .fetch()
  }

  get (id) {
    return this.Team
      .query()
      .where('id', id)
      .where('activated', true)
      .with('category')
      .with('members')
      .firstOrFail()
  }
}

module.exports = TeamRepository
