'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Factory = use('Factory')
const { validateAll } = use('indicative')
const { test, trait } = use('Test/Suite')('Article Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const articleSchema = {
  id: 'number',
  category_id: 'number',
  template_id: 'number',
  'translations.*.headline': 'string',
  'translations.*.description': 'string',
  'translations.*.body': 'string',
  'translations.*.state_id': 'number',
  'translations.*.language_id': 'number',
}

test('should be able to get an article', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make()

  await article.translations().create(translation.toJSON())

  const response = await client
    .get(`articles/${article.id}`)
    .end()

  response.assertStatus(200)
  await validateAll(response.body, articleSchema)
})

test('shouldn\'t be able to get an article that has no translation published', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make({ state_id: 1 })

  await article.translations().create(translation.toJSON())

  const response = await client
    .get(`articles/${article.id}`)
    .end()

  response.assertStatus(404)
  response.assertJSONSubset({
    errors: [{
      code: 'E_MODEL_NOT_FOUND',
    }],
  })
})

test('shouldn\'t be able to get a translation that is not published', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make()
  const translation2 = await Factory.model('App/Models/ArticleTranslation').make({ state_id: 1 })

  await article.translations().create(translation.toJSON())
  await article.translations().create(translation2.toJSON())

  const response = await client
    .get(`articles/${article.id}`)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.translations.length, 1)
  await validateAll(response.body, articleSchema)
})

test('should be able to get all translations for an article', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make()
  const translation2 = await Factory.model('App/Models/ArticleTranslation').make({ language_id: 2 })

  await article.translations().create(translation.toJSON())
  await article.translations().create(translation2.toJSON())

  const response = await client
    .get(`articles/${article.id}`)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.translations.length, 2)
  await validateAll(response.body, articleSchema)
})
