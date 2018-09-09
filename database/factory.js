'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

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
