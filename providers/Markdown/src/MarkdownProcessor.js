'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const unified = require('unified')
const remarkParser = require('remark-parse')
const macroEngine = require('remark-macro')()
const squeezeParagraphs = require('remark-squeeze-paragraphs')
const remarkToRehype = require('remark-rehype')
const stringify = require('rehype-stringify')

class MarkdownProcessor {
  constructor (markdown, options = {}) {
    this.markdown = markdown
    this.options = options
  }

  /**
   * Register a custom macro with the markdown engine
   *
   * @method addMacro
   * @static
   *
   * @param  {String}   name
   * @param  {Function} callback
   * @param  {Boolean}  inline
   */
  static addMacro (name, callback, inline) {
    macroEngine.addMacro(name, callback, inline)
  }

  static async toHtml (markdown, options) {
    const markdownProcessor = new this(markdown, options)

    return (await markdownProcessor.renderToHtml()).contents
  }

  getStream () {
    return unified()
      .use(remarkParser)
      .use(macroEngine.transformer)
      .use(squeezeParagraphs)
      .use(remarkToRehype)
  }

  renderToHtml () {
    return new Promise((resolve, reject) => {
      this.getStream()
        .use(stringify)
        .process(this.markdown, (error, file) => {
          if (error) {
            return reject(error)
          }
          resolve(file)
        })
    })
  }
}

module.exports = MarkdownProcessor
