import ArticleState from 'App/Models/ArticleState'

export default class ArticleStatesController {
  public async index () {
    return ArticleState.query().orderBy('id')
  }
}
