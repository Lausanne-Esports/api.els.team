'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Database = use('Database')
  const Validator = use('Validator')

  function uniqueScope (data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const value = get(data, field)

      if (!value) {
        return
      }

      const [table, scope_field, id] = args
      const query = Database
        .table(table)
        .select(field)
        .where(field, value)
        .where(scope_field, id)

      query.then((rows) => {
        if (rows && rows.length) {
          reject()
        }

        resolve()
      })
    })
  }

  Validator.extend('uniqueScope', uniqueScope)
})
