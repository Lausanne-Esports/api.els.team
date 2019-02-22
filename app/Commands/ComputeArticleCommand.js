'use strict'

/* eslint-disable no-await-in-loop */

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Markdown = use('Markdown')
const Database = use('Database')
const { Command } = use('@adonisjs/ace')
const ArticleTranslation = use('App/Models/ArticleTranslation')

class ComputeArticleCommand extends Command {
  static get signature () {
    return 'compute:article'
  }

  static get description () {
    return 'Compute the markdown of all article.'
  }

  async handle () {
    const translations = await ArticleTranslation.all()

    for (const translation of translations.rows) {
      translation.html = await Markdown.renderToHtml(translation.body)
      await translation.save()
    }

    await Database.close()
  }
}

module.exports = ComputeArticleCommand
