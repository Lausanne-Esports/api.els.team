'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const moment = use('moment')
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, index, data) => {
  const defaultValue = {
    username: faker.username(),
    email: faker.email(),
    password: 'secret',
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Article', (faker, index, data) => {
  const defaultValue = {
    published_at: moment().subtract(1, 'days').format('DD.MM.YYYY HH:mm'),
    category_id: 1,
    template_id: 1,
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/ArticleTranslation', (faker, index, data) => {
  const defaultValue = {
    headline: faker.sentence(),
    description: faker.paragraph(),
    body: faker.paragraph({ sentences: 10 }),
    state_id: 4,
    language_id: 1,
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/ArticleCategory', (faker, index, data) => {
  const word = faker.word()

  const defaultValue = {
    name: word,
    code: word,
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/ArticleState', (faker, index, data) => {
  const word = faker.word()

  const defaultValue = {
    name: word,
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/ArticleTemplate', (faker, index, data) => {
  const word = faker.word()

  const defaultValue = {
    name: word,
  }

  return Object.assign(defaultValue, data)
})
