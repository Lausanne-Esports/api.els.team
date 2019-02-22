'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Model = use('Model')
const Markdown = use('Markdown')

class ArticleTranslation extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (instance) => {
      instance.html = await Markdown.toHtml(instance.body)
    })
  }

  language () {
    return this.belongsTo('App/Models/Language')
  }
}

module.exports = ArticleTranslation
