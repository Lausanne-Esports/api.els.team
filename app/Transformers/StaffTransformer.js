'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const MemberTransformer = use('App/Transformers/MemberTransformer')

class StaffTransformer extends TransformerAbstract {
  /**
   * Automatically includes those relations.
   */
  availableInclude () {
    return ['players']
  }

  includePlayers (team) {
    return this.collection(team.getRelated('members'), MemberTransformer)
  }

  transform (staff) {
    return {
      id: staff.id,
      name: staff.name,
      order: staff.order,
      numberOfPlayers: staff.getRelated('members').rows.length,
    }
  }
}

module.exports = StaffTransformer
