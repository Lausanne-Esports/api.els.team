'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Article Store')
const { testRequireField, testNumberField } = require('../helpers')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const article = {
  headline: 'My First Article',
  description: '',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit veritatis rerum amet odio nostrum perferendis neque, vitae impedit aspernatur placeat?',
  // published_at: '04/03/1994 11pm',
  template_id: 1,
  state_id: 1,
  category_id: 1,
  language_id: 2,
}

test('should be able to create article with valid data', async ({ assert, client }) => {
  const response = await client
    .post('articles')
    .send(article)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    category_id: 1,
    template_id: 1,
    translations: [{
      headline: 'My First Article',
      description: '',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit veritatis rerum amet odio nostrum perferendis neque, vitae impedit aspernatur placeat?',
      state_id: 1,
      language_id: 2,
    }]
  })
})

test('should be able to translate an existing article', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()

  const response = await client
    .post(`articles/${article.id}/translations`)
    .send({
      headline: 'Mon premier article',
      description: '',
      body: 'Lorem',
      state_id: 1,
      language_id: 1,
    })
    .end()

  // response.assertStatus(200)
  response.assertJSONSubset({
    id: article.id,
    category_id: 1,
    template_id: 1,
    translations: [{
      headline: 'Mon premier article',
      description: '',
      body: 'Lorem',
      state_id: 1,
      language_id: 1,
    }],
  })
})

test('should be able to get an article', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make()

  await article.translations().create(translation.toJSON())

  const response = await client
    .get(`articles/${article.id}`)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: article.id,
    category_id: article.category_id,
    template_id: article.template_id,
    translations: [{
      headline: translation.headline,
      description: translation.description,
      body: translation.body,
      state_id: 4,
      language_id: 1,
    }],
  })
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
  response.assertJSONSubset({
    id: article.id,
    category_id: article.category_id,
    template_id: article.template_id,
    translations: [{
      headline: translation.headline,
      description: translation.description,
      body: translation.body,
      state_id: 4,
      language_id: 1,
    }],
  })
  assert.equal(response.body.translations.length, 1)
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
  response.assertJSONSubset({
    id: article.id,
    category_id: article.category_id,
    template_id: article.template_id,
    translations: [{
      headline: translation.headline,
      description: translation.description,
      body: translation.body,
      state_id: 4,
      language_id: 1,
    }, {
      headline: translation2.headline,
      description: translation2.description,
      body: translation2.body,
      state_id: 4,
      language_id: 2,
    }],
  })
  assert.equal(response.body.translations.length, 2)
})

test('shouldn\'t be able to translate an article twice in the same language', async ({ assert, client }) => {
  const article = await Factory.model('App/Models/Article').create()
  const translation = await Factory.model('App/Models/ArticleTranslation').make({ language_id: 1 })

  await article.translations().create(translation.toJSON())

  const response = await client
    .post(`articles/${article.id}/translations`)
    .send({
      headline: 'Mon premier article',
      description: '',
      body: 'Lorem',
      state_id: 1,
      language_id: 1,
    })
    .end()

  response.assertStatus(400)
})

testRequireField(test, 'body', article, 'articles')
testRequireField(test, 'headline', article, 'articles')
testNumberField(test, 'language_id', article, 'articles')
testRequireField(test, 'language_id', article, 'articles')
testNumberField(test, 'state_id', article, 'articles')
testRequireField(test, 'state_id', article, 'articles')
testNumberField(test, 'template_id', article, 'articles')
testRequireField(test, 'template_id', article, 'articles')
testNumberField(test, 'category_id', article, 'articles')
testRequireField(test, 'category_id', article, 'articles')
