'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Markdown = require('@dimerapp/markdown')

class MarkdownWrapper {
  constructor (options = {}) {
    this.options = options
  }

  async renderToHtml (markdown) {
    const parser = new Markdown(markdown, this.options)

    return (await parser.toHTML()).contents
  }
}

module.exports = MarkdownWrapper
