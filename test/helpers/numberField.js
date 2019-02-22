'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

module.exports = async function testNumberField (field, data, endpoint, user, assert, client) {
  data[field] = 'a'

  const response = await client
    .post(endpoint)
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: field },
      title: 'number',
    }],
  })
}
