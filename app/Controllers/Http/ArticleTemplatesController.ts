import ArticleTemplate from 'App/Models/ArticleTemplate'

export default class ArticleTemplatesController {
  public async index () {
    return ArticleTemplate.query().orderBy('id')
  }
}
