'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('UserStore')
Route.post('sessions', 'SessionController.store').validator('SessionStore')

Route.get('articles/:id', 'ArticleController.show')
Route.post('articles', 'ArticleController.store').validator('ArticleStore')
Route.post('articles/:id/translations', 'ArticleTranslationController.store').validator('ArticleTranslationStore')
