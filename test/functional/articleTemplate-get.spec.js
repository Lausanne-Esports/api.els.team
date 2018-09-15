'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Article Template Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('should be able to have all templates', async ({ assert, client }) => {
  const template = await Factory.model('App/Models/ArticleTemplate').create()

  const response = await client
    .get(`articles/templates`)
    .end()

    response.assertStatus(200)
    response.assertJSONSubset([{
      id: template.id,
      name: template.name,
      code: template.code,
    }])
})
