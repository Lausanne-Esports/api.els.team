'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('UserStore')
Route.post('sessions', 'SessionController.store').validator('SessionStore')

Route.get('articles/states', 'ArticleStateController.index')
Route.get('articles/templates', 'ArticleTemplateController.index')
Route.get('articles/categories', 'ArticleCategoryController.index')
Route.get('articles/:id', 'ArticleController.show')
Route.get('articles', 'ArticleController.index')

Route.group(() => {
  Route.get('me', 'UserController.current')
  Route.delete('sessions', 'SessionController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('articles', 'ArticleController.index')
  Route.post('articles', 'ArticleController.store').validator('ArticleStore')
  Route.get('articles/:id', 'ArticleController.show')

  // TODO: add validator
  Route.put('articles/:id', 'ArticleController.update')
  Route.put('translations/:id', 'ArticleTranslationController.update')

  Route.delete('translations/:id', 'ArticleTranslationController.destroy')
  Route.get('translations/:id', 'ArticleTranslationController.show')
  Route.post('articles/:id/translations', 'ArticleTranslationController.store').validator('ArticleTranslationStore')
}).middleware('auth').prefix('admin').namespace('Admin')
