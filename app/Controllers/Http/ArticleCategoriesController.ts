import ArticleCategory from 'App/Models/ArticleCategory'

export default class ArticleCategoriesController {
  public async index () {
    return ArticleCategory.query().orderBy('id')
  }
}
