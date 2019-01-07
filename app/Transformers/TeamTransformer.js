'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TransformerAbstract = use('TransformerAbstract')
const MemberTransformer = use('App/Transformers/MemberTransformer')

class TeamTransformer extends TransformerAbstract {
  /**
   * Automatically includes those relations.
   */
  availableInclude () {
    return ['players']
  }

  includePlayers (team) {
    return this.collection(team.getRelated('members'), MemberTransformer)
  }

  transform (team) {
    return {
      id: team.id,
      name: team.name,
      order: team.order,
      academy: team.academy,
      numberOfPlayers: team.getRelated('members').rows.length,
      category_id: team.category_id,
    }
  }
}

module.exports = TeamTransformer
