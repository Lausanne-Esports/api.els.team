'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class Member extends Model {
  static boot () {
    super.boot()
    this.addTrait('FormatDate')
  }

  static get dates () {
    return super.dates.concat(['birth_on'])
  }

  teams () {
    return this.belongsToMany('App/Models/Team')
      .withPivot(['role', 'order']).pivotPrimaryKey(null)
  }
}

module.exports = Member
