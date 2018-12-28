'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class Team extends Model {
  category () {
    return this.belongsTo('App/Models/TeamCategory', 'category_id')
  }

  members () {
    return this.belongsToMany('App/Models/Member')
      .withPivot(['role', 'order']).pivotPrimaryKey(null)
      .orderBy('order', 'asc')
  }
}

module.exports = Team
