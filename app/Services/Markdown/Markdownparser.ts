/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import unified from 'unified'
import markdown from 'remark-parse'
import macroEngine from 'remark-macro'
import html from 'rehype-stringify'
import remarkToRehype from 'remark-rehype'
import externalLinks from 'remark-external-links'
import squeezeParagraphs from 'remark-squeeze-paragraphs'
import minifyWhiteSpace from 'rehype-minify-whitespace'
import macros from './Macros'
import { VFile } from 'vfile'

class MarkdownParser {
  private $parser: unified.Processor
  private $macroEngine: macroEngine

  constructor () {
    this.registerMacros()

    this.$parser = unified()
      .use(markdown)
      .use(this.$macroEngine.transformer)
      .use(squeezeParagraphs)
      .use(externalLinks)
      .use(remarkToRehype)
      .use(minifyWhiteSpace)
      .use(html)
  }

  private registerMacros () {
    this.$macroEngine = new macroEngine()
    this.$macroEngine.addMacro('blockquote', macros.blockquote, false)
    this.$macroEngine.addMacro('center', macros.center, false)
    this.$macroEngine.addMacro('image', macros.image, true)
    this.$macroEngine.addMacro('tweet', macros.tweet, true)
    this.$macroEngine.addMacro('youtube', macros.youtube, true)
  }

  public renderToHtml (content: any): Promise<VFile> {
    return new Promise((resolve, reject) => {
      this.$parser.process(content, (error, computedContent) => {
        if (error) {
          return reject(error)
        }

        return resolve(computedContent)
      })
    })
  }
}

export default new MarkdownParser()
