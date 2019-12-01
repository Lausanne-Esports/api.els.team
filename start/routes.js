'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Route = use('Route')

Route.get('/', () => ({ version: '20191129', uptime: process.uptime() }))

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

Route.get('teams', 'TeamController.index')
Route.get('teams/categories', 'TeamCategoryController.index')
Route.get('teams/:id', 'TeamController.show')

Route.get('streams', 'StreamController.index')
Route.get('streams/:id', 'StreamController.show')

Route.get('awards', 'AwardController.index')

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

  Route.get('streams', 'StreamController.index')
  Route.get('streams/:id', 'StreamController.show')

  Route.post('streams', 'StreamController.store').validator('StreamStore')
  Route.put('streams/:id', 'StreamController.update')
  Route.delete('streams/:id', 'StreamController.destroy')

  Route.get('teams', 'TeamController.index')
  Route.get('teams/:id', 'TeamController.show')
  Route.get('teams/:id/members', 'TeamMemberController.index')

  // TODO: add validator
  Route.post('teams', 'TeamController.store')
  Route.put('teams/:id', 'TeamController.update')
  Route.post('teams/order', 'TeamController.order')
  Route.post('teams/:id/up', 'TeamController.up')
  Route.post('teams/:id/down', 'TeamController.down')
  Route.post('teams/:id/members', 'TeamMemberController.store')
  Route.put('teams/:id/members/:memberId', 'TeamMemberController.update')
  Route.delete('teams/:id/members/:memberId', 'TeamMemberController.destroy')
  Route.post('teams/:id/members/order', 'TeamMemberController.order')

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

  Route.post('awards', 'AwardController.store')
  Route.post('awards/order', 'AwardController.order')
}).middleware('auth').prefix('admin').namespace('Admin')
