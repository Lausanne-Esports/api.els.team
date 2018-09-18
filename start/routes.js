'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', () => ({ version: '20180919' }))

Route.post('contact', 'ContactController.store').validator('Contact')
Route.post('sessions', 'SessionController.store').validator('SessionStore')
Route.post('users/validate', 'Admin/UserController.validate')
Route.post('password-requests', 'PasswordRequestController.store')
Route.post('password-requests/:token', 'PasswordRequestController.update')

Route.get('articles/states', 'ArticleStateController.index')
Route.get('articles/templates', 'ArticleTemplateController.index')
Route.get('articles/categories', 'ArticleCategoryController.index')
Route.get('articles/:id', 'ArticleController.show')
Route.get('articles', 'ArticleController.index')

Route.get('articles/legacy/:id', 'ArticleController.legacy')

Route.get('teams', 'TeamController.index')
Route.get('teams/categories', 'TeamCategoryController.index')
Route.get('teams/:id', 'TeamController.show')

Route.group(() => {
  Route.get('me', 'Admin/UserController.current')
  Route.delete('sessions', 'SessionController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.post('users', 'UserController.store').validator('UserStore')

  Route.get('members', 'MemberController.index')
  Route.get('members/:id', 'MemberController.show')

  // TODO: add validator
  Route.post('members', 'MemberController.store')
  Route.put('members/:id', 'MemberController.update')

  Route.get('teams', 'TeamController.index')
  Route.get('teams/:id', 'TeamController.show')
  Route.get('teams/:id/members', 'TeamMemberController.index')

  // TODO: add validator
  Route.post('teams', 'TeamController.store')
  Route.put('teams/:id', 'TeamController.update')
  Route.post('teams/:id/up', 'TeamController.up')
  Route.post('teams/:id/down', 'TeamController.down')
  Route.post('teams/:id/members', 'TeamMemberController.store')
  Route.delete('teams/:id/members/:memberId', 'TeamMemberController.destroy')

  Route.post('teams/:id/members/:memberId/up', 'TeamMemberController.up')
  Route.post('teams/:id/members/:memberId/down', 'TeamMemberController.down')

  Route.get('articles', 'ArticleController.index')
  Route.post('articles', 'ArticleController.store').validator('ArticleStore')
  Route.get('articles/:id', 'ArticleController.show')
  Route.post('articles/:id/featured', 'ArticleController.featured')

  // TODO: add validator
  Route.put('articles/:id', 'ArticleController.update')
  Route.put('translations/:id', 'ArticleTranslationController.update')

  Route.delete('translations/:id', 'ArticleTranslationController.destroy')
  Route.get('translations/:id', 'ArticleTranslationController.show')
  Route.post('articles/:id/translations', 'ArticleTranslationController.store').validator('ArticleTranslationStore')
}).middleware('auth').prefix('admin').namespace('Admin')
