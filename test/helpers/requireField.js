'use strict'

const _ = require('lodash')

module.exports = function testRequireField (test, field, data, endpoint) {
  test(`should test that ${field} is required`, async ({ assert, client }) => {
    const response = await client
      .post(endpoint)
      .send(_.omit(data, [field]))
      .end()

    response.assertStatus(400)
    response.assertJSONSubset({
      errors: [{
        source: { pointer: field },
        title: 'required',
      }]
    })
  })
}
