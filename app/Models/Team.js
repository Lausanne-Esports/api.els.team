'use strict'

const Model = use('Model')

class Team extends Model {
  category () {
    return this.belongsTo('App/Models/TeamCategory', 'category_id')
  }

  members () {
    return this.belongsToMany('App/Models/Member')
      .withPivot(['role', 'order']).pivotPrimaryKey(null)
      .orderBy('order', 'asc')
  }
}

module.exports = Team
