/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => ({ version: '20211003', uptime: process.uptime() }))

Route.get('/health', async () => ({ report: await HealthCheck.getReport() }))

Route.post('contact', 'ContactController.store')
Route.post('sessions', 'SessionsController.store')
Route.get('users/validate/:email', 'Admin/UsersController.validate').as('verifyEmail')
Route.post('password-requests', 'PasswordRequestsController.store')
Route.post('password-requests/:email', 'PasswordRequestsController.update').as('verifyPasswordRequest')

Route.get('articles/states', 'ArticleStatesController.index')
Route.get('articles/templates', 'ArticleTemplatesController.index')
Route.get('articles/categories', 'ArticleCategoriesController.index')
Route.get('articles/:id', 'ArticlesController.show')
Route.get('articles', 'ArticlesController.index')

Route.get('teams', 'TeamsController.index')
Route.get('teams/categories', 'TeamCategoriesController.index')
Route.get('teams/:id', 'TeamsController.show')

Route.get('staff', 'StaffController.index')
Route.get('staff/:id', 'StaffController.show')

Route.get('streams', 'StreamsController.index')
Route.get('streams/:id', 'StreamsController.show')

Route.get('awards', 'AwardsController.index')
Route.get('awards/categories/order', 'AwardsController.categoryOrder')

Route.group(() => {
  Route.get('me', 'Admin/UsersController.current')
  Route.delete('sessions', 'SessionsController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.post('users', 'UsersController.store')

  Route.resource('members', 'MembersController').apiOnly().except(['destroy'])

  Route.resource('streams', 'StreamsController').apiOnly()

  Route.resource('teams', 'TeamsController').apiOnly().except(['destroy'])
  Route.post('teams/order', 'TeamsController.order')

  Route.resource('teams.members', 'TeamMembersController').apiOnly().except(['show'])
  Route.post('teams/:team_id/members/order', 'TeamMembersController.order')

  Route.resource('staff', 'StaffController').apiOnly().except(['destroy'])
  Route.post('staff/order', 'StaffController.order')

  Route.resource('staff.members', 'StaffMembersController').apiOnly().except(['show'])
  Route.post('staff/:staff_id/members/order', 'StaffMembersController.order')

  Route.resource('articles', 'ArticlesController').apiOnly().except(['destroy'])
  Route.post('articles/:id/featured', 'ArticlesController.featured')

  Route.resource('translations', 'ArticleTranslationsController').apiOnly().except(['index', 'store'])
  Route.post('articles/:id/translations', 'ArticleTranslationsController.store')

  Route.post('awards', 'AwardsController.store')
  Route.post('awards/order', 'AwardsController.order')
  Route.post('awards/categories/order', 'AwardsController.categoryOrder')
}).middleware('auth').prefix('admin').namespace('App/Controllers/Http/Admin')
