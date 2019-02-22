'use strict'

/**
 * <blockquote>
 *   <p>$content</p>
 *   <footer class="blockquote-footer">$source</footer>
 * </blockquote>
 */
module.exports = (content, props, { transformer, eat }) => {
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
