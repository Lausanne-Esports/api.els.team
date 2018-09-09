'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Article Category Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('should be able to have all categories', async ({ assert, client }) => {
  const category = await Factory.model('App/Models/ArticleCategory').create()

  const response = await client
    .get(`articles/categories`)
    .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      id: category.id,
      name: category.name,
      code: category.code,
    })
})
