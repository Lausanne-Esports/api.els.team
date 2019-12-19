'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Award = use('App/Models/Award')
const AwardCategoryOrder = use('App/Models/AwardCategoryOrder')

class AwardController {
  index () {
    return Award.query().with('category').orderBy('order', 'asc').fetch()
  }

  categoryOrder () {
    return AwardCategoryOrder.all()
  }
}

module.exports = AwardController
