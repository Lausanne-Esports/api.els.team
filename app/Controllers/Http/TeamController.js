'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TeamTransformer = use('App/Transformers/TeamTransformer')

class TeamController {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return [
      'App/Repositories/TeamRepository',
    ]
  }

  constructor (TeamRepository) {
    this.repository = TeamRepository
  }

  async index ({ transform }) {
    const teams = await this.repository.all()

    return transform.collection(teams, TeamTransformer)
  }

  async show ({ params, transform }) {
    const team = await this.repository.get(params.id)

    return transform.include('players').item(team, TeamTransformer)
  }
}

module.exports = TeamController
