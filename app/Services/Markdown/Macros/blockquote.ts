/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

interface BlockQuoteProps {
  source?: string
}

/**
 * <blockquote>
 *   <p>$content</p>
 *   <footer class="blockquote-footer">$source</footer>
 * </blockquote>
 */
export default (content: any, props: BlockQuoteProps, { transformer, eat }) => {
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
      }],
    })
  }

  return ast
}
