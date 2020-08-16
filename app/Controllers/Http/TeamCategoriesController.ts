import TeamCategory from 'App/Models/TeamCategory'

export default class TeamCategoriesController {
  public async index () {
    return TeamCategory.query().orderBy('id')
  }
}
