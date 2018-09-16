'use strict'

const Model = use('Model')

class Team extends Model {
  category () {
    return this.belongsTo('App/Models/TeamCategory', 'category_id')
  }
}

module.exports = Team
