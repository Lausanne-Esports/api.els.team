'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')

class AwardCategoryOrder extends Model {
  static get table () {
    return 'award_category_order_by_year'
  }

  category () {
    return this.belongsTo('App/Models/TeamCategory', 'category_id')
  }
}

module.exports = AwardCategoryOrder
