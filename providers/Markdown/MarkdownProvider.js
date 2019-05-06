'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { ServiceProvider } = require('@adonisjs/fold')
const MarkdownProcessor = require('./src/MarkdownProcessor')
const macros = require('./src/Macros')

class MarkdownProvider extends ServiceProvider {
  $registerMacros () {
    MarkdownProcessor.addMacro('blockquote', macros.blockquote, false)
    MarkdownProcessor.addMacro('center', macros.center, false)
    MarkdownProcessor.addMacro('image', macros.image, true)
    MarkdownProcessor.addMacro('tweet', macros.tweet, true)
    MarkdownProcessor.addMacro('youtube', macros.youtube, true)
  }

  register () {
    this.$registerMacros()

    this.app.singleton('Markdown', () => MarkdownProcessor)
  }
}

module.exports = MarkdownProvider
