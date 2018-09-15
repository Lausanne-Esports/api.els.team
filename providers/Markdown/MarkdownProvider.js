'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const MarkdownWrapper = require('./Markdown')
const Markdown = require('@dimerapp/markdown')
const { ServiceProvider } = require('@adonisjs/fold')

class MarkdownProvider extends ServiceProvider {
  $registerMacroBlockquote () {
    Markdown.addMacro('blockquote', (content, props) => ({
      type: 'element',
      data: {
        hName: 'blockquote',
        hProperties: {
          href: '#',
        },
      },
      children: [{
        type: 'text',
        value: content,
      }],
    }))
  }

  register () {
    this.$registerMacroBlockquote()

    this.app.singleton('Markdown', () => {
      return new MarkdownWrapper({
        // options
      })
    })
  }
}

module.exports = MarkdownProvider
