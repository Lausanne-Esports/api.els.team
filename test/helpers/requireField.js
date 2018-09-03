'use strict'

const _ = require('lodash')

module.exports = async function testRequireField (field, data, endpoint, user, assert, client) {
  const response = await client
    .post(endpoint)
    .loginVia(user)
    .send(_.omit(data, [field]))
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: field },
      title: 'required',
    }]
  })
}
