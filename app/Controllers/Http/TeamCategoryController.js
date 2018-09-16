'use strict'

const TeamCategory = use('App/Models/TeamCategory')

class TeamCategoryController {
  index () {
    return TeamCategory.all()
  }
}

module.exports = TeamCategoryController
