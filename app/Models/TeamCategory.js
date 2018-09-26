'use strict'

const Model = use('Model')

class TeamCategory extends Model {
  static boot () {
    super.boot()
    this.addTrait('NoTimsetamp')
  }
}

module.exports = TeamCategory
