'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const Model = use('Model')

class Staff extends Model {
  members () {
    return this.belongsToMany('App/Models/Member')
      .withPivot(['role', 'order']).pivotPrimaryKey(null)
      .orderBy('order', 'asc')
  }
}

module.exports = Staff
