'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Factory = use('Factory')
const { before, test, trait } = use('Test/Suite')('User Store')
let user = null

trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')

before(async () => {
  user = await Factory.model('App/Models/User').create()
})

test('should be able to register with valid data', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    user: {
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
    },
  })
})

test('should test that password must match', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
      password_confirmation: 'secret2',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'password_confirmation' },
      title: 'same',
    }],
  })
})

test('should test that password is required', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'password' },
      title: 'required',
    }],
  })
})

test('should test that password_confirmation is required', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'password_confirmation' },
      title: 'requiredIf',
    }],
  })
})

test('should test that username is required', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'username' },
      title: 'required',
    }],
  })
})

test('should test that username must be unique', async ({ client }) => {
  await Factory.model('App/Models/User').create({ username: 'romain.lanz' })

  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'username' },
      title: 'unique',
    }],
  })
})

test('should test that email is required', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'email' },
      title: 'required',
    }],
  })
})

test('should test that email must be correctly formated', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain-esports.ch',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'email' },
      title: 'email',
    }],
  })
})

test('should test that email must be unique', async ({ client }) => {
  await Factory.model('App/Models/User').create({ email: 'romain.lanz@lausanne-esports.ch' })

  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({
      username: 'romain.lanz',
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
      password_confirmation: 'secret',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'email' },
      title: 'unique',
    }],
  })
})

test('should test that all errors are sent back', async ({ client }) => {
  const response = await client
    .post('admin/users')
    .loginVia(user)
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      { source: { pointer: 'username' }, title: 'required' },
      { source: { pointer: 'email' }, title: 'required' },
      { source: { pointer: 'password' }, title: 'required' },
    ],
  })
})
