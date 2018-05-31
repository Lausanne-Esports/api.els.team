'use strict'

const _ = require('lodash')

module.exports = async function testNumberField (field, data, endpoint, user, assert, client) {
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
}
