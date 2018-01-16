'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Session Store')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('should be able to signin', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('sessions')
    .send({
      email: user.email,
      password: 'secret',
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    message: 'Logged in successfully',
  })
})

test('should throw invalid credential when email is incorrect', async ({ assert, client }) => {
  const response = await client
    .post('sessions')
    .send({
      email: 'romain.lanz@lausanne-esports.ch',
      password: 'secret',
    })
    .end()

  response.assertStatus(401)
  response.assertJSONSubset({
    errors: [{
      status: 401,
      code: 'E_INVALID_CREDENTIAL',
      detail: 'E_INVALID_CREDENTIAL: Authentication failed. Either supplied credentials are invalid or the account is inactive',
    }]
  })
})

test('should throw invalid credential when password is incorrect', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('sessions')
    .send({
      email: user.email,
      password: 'ThisIsntGoingToWork',
    })
    .end()

  response.assertStatus(401)
  response.assertJSONSubset({
    errors: [{
      status: 401,
      code: 'E_INVALID_CREDENTIAL',
      detail: 'E_INVALID_CREDENTIAL: Authentication failed. Either supplied credentials are invalid or the account is inactive',
    }]
  })
})

test('should test that email is required', async ({ assert, client }) => {
  const response = await client
    .post('sessions')
    .send({
      password: 'ThisIsntGoingToWork'
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'email' },
      title: 'required',
    }]
  })
})

test('should test that password is required', async ({ assert, client }) => {
  const response = await client
    .post('sessions')
    .send({
      email: 'romain.lanz@lausanne-esports.ch',
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'password' },
      title: 'required',
    }]
  })
})

test('should test that email must be correctly formated', async ({ assert, client }) => {
  const response = await client
    .post('sessions')
    .send({
      email: 'ThisIsntGoingToWork'
    })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'email' },
      title: 'email',
    }]
  })
})

test('should test that all errors are sent back', async ({ assert, client }) => {
  const response = await client
    .post('sessions')
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      { source: { pointer: 'email' }, title: 'required' },
      { source: { pointer: 'password' }, title: 'required' },
    ]
  })
})
