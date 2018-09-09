'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('UserStore')
Route.post('sessions', 'SessionController.store').validator('SessionStore')

Route.get('articles/states', 'ArticleStateController.index')
Route.get('articles/templates', 'ArticleTemplateController.index')
Route.get('articles/categories', 'ArticleCategoryController.index')
Route.get('articles/:id', 'ArticleController.show')

Route.group(() => {
  Route.get('me', 'UserController.current')
  Route.post('articles', 'ArticleController.store').validator('ArticleStore')
  Route.post('articles/:id/translations', 'ArticleTranslationController.store').validator('ArticleTranslationStore')
  Route.delete('sessions', 'SessionController.destroy')
}).middleware('auth')
