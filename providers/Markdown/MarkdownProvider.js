'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const whitelist = require('@dimerapp/markdown/github')
const MarkdownWrapper = require('./Markdown')
const Markdown = require('@dimerapp/markdown')
const { ServiceProvider } = require('@adonisjs/fold')

class MarkdownProvider extends ServiceProvider {
  /**
   * <blockquote>
   *   <p>$content</p>
   *   <footer class="blockquote-footer">$source</footer>
   * </blockquote>
   */
  $registerMacroBlockquote () {
    Markdown.addMacro('blockquote', (content, props, { transformer, eat }) => {
      const ast = {
        type: 'blockquoteNode',
        data: { hName: 'blockquote' },
        children: transformer.tokenizeBlock(content, eat.now()),
      }

      if (props.source) {
        ast.children.push({
          type: 'blockquoteFooter',
          data: {
            hName: 'footer',
            hProperties: { className: ['blockquote-footer'] },
          },
          children: [{
            type: 'text',
            value: props.source,
          }]
        })
      }

      return ast
    }, false)
  }

  /**
   * align-left, align-right, align-center, wild
   *
   * <figure>
   *   <img src="$url" class="$align" alt="$legend" />
   *   <figcaption>$legend</figcaption>
   * </figure>
   */
  $registerMacroImage () {
    Markdown.addMacro('image', (props) => {
      const ast = {
        type: 'figureContainer',
        data: {
          hName: 'figure',
          hProperties: {
            className: [props.align],
          },
        },
        children: [{
          type: 'figureImage',
          data: {
            hName: 'img',
            hProperties: {
              src: props.src,
              alt: props.legend || ''
            },
          },
        }],
      }

      if (props.legend) {
        ast.children.push({
          type: 'figureLegend',
          data: { hName: 'figcaption' },
          children: [{
            type: 'text',
            value: props.legend,
          }],
        })
      }

      return ast
    }, true)
  }

  /**
   * <blockquote class="twitter-tweet">
   *   <a href="$link"></a>
   * </blockquote>
   */
  $registerMacroTweet () {
    Markdown.addMacro('tweet', (props) => ({
      type: 'tweetContainer',
      data: {
        hName: 'blockquote',
        hProperties: {
          className: ['twitter-tweet'],
          dataLang: ['fr-FR'],
        },
      },
      children: [{
        type: 'tweetLink',
        data: {
          hName: 'a',
          hProperties: {
            href: props.link,
          },
        }
      }],
    }), true)
  }

  /**
   * <center>$content</center>
   */
  $registerMacroCenter() {
    Markdown.addMacro('center', (content, _, { transformer, eat }) => ({
      type: 'centerNode',
      data: {
        hName: 'center',
      },
      children: transformer.tokenizeBlock(content, eat.now()),
    }), false)
  }

  $addTags () {
    whitelist.tagNames.push('figure')
    whitelist.tagNames.push('figcaption')
    whitelist.tagNames.push('footer')
    whitelist.tagNames.push('center')
  }

  register () {
    this.$addTags()
    this.$registerMacroBlockquote()
    this.$registerMacroImage()
    this.$registerMacroTweet()
    this.$registerMacroCenter()

    this.app.singleton('Markdown', () => {
      return new MarkdownWrapper({
        // options
      })
    })
  }
}

module.exports = MarkdownProvider
