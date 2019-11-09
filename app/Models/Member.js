'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class Member extends Model {
  static get dates () {
    return super.dates.concat(['birth_on'])
  }

  teams () {
    return this.belongsToMany('App/Models/Team')
      .withPivot(['role', 'order', 'academy']).pivotPrimaryKey(null)
  }
}

module.exports = Member
