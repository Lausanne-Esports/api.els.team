'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Article State Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('should be able to have all states', async ({ assert, client }) => {
  const state = await Factory.model('App/Models/ArticleState').create()

  const response = await client
    .get(`articles/states`)
    .end()

    response.assertStatus(200)
    response.assertJSONSubset([{
      id: state.id,
      name: state.name,
      code: state.code,
    }])
})
