'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { formatters } = use('Validator')

class ArticleStore {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      headline: 'required',
      body: 'required',
      language_id: 'required|number',
      state_id: 'required|number',
      template_id: 'required|number',
      category_id: 'required|number',
    }
  }
}

module.exports = ArticleStore
