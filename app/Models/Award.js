'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class Award extends Model {
  category () {
    return this.belongsTo('App/Models/TeamCategory', 'category_id')
  }
}

module.exports = Award
