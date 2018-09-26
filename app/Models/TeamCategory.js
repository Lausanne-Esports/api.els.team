'use strict'

const Model = use('Model')

class TeamCategory extends Model {
  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }
}

module.exports = TeamCategory
