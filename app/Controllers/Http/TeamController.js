'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Team = use('App/Models/Team')
const TeamTransformer = use('App/Transformers/TeamTransformer')

class TeamController {
  async index ({ transform }) {
    const teams = await Team.query().with('category').with('members').where('activated', true).fetch()

    return transform.collection(teams, TeamTransformer)
  }

  async show ({ params, transform }) {
    const team = await Team.query().where('id', params.id).where('activated', true).with('category').with('members').first()

    return transform.include('players').item(team, TeamTransformer)
  }
}

module.exports = TeamController
