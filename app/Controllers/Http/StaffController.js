'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Valentin Kaelin
 */

const StaffTransformer = use('App/Transformers/StaffTransformer')

class StaffController {
  /**
   * Injecting required dependencies auto
   * fulfilled by the IoC container.
   *
   * @return {string[]}
   */
  static get inject () {
    return [
      'App/Repositories/StaffRepository',
    ]
  }

  constructor (StaffRepository) {
    this.repository = StaffRepository
  }

  async index ({ transform }) {
    const staff = await this.repository.all()

    return transform.collection(staff, StaffTransformer)
  }

  async show ({ params, transform }) {
    const staff = await this.repository.get(params.id)

    return transform.include('players').item(staff, StaffTransformer)
  }
}

module.exports = StaffController
