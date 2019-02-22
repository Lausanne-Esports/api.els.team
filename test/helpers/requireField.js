'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { omit } = require('lodash')

module.exports = async function testRequireField (field, data, endpoint, user, assert, client) {
  const response = await client
    .post(endpoint)
    .loginVia(user)
    .send(omit(data, [field]))
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: field },
      title: 'required',
    }],
  })
}
