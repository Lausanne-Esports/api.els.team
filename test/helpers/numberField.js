'use strict'

const _ = require('lodash')

module.exports = function testNumberField (test, field, data, endpoint, user) {
  test(`should test that ${field} must be a number`, async ({ assert, client }) => {
    data[field] = 'a'

    const response = await client
      .post(endpoint)
      .loginVia(user, 'jwt')
      .send(data)
      .end()

    response.assertStatus(400)
    response.assertJSONSubset({
      errors: [{
        source: { pointer: field },
        title: 'number',
      }]
    })
  })
}
