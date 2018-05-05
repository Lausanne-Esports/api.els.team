'use strict'

const _ = require('lodash')

module.exports = function testNumberField (test, field, data, endpoint) {
  test(`should test that ${field} must be a number`, async ({ assert, client }) => {
    data[field] = 'a'

    const response = await client
      .post(endpoint)
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
