'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class Token extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Token
