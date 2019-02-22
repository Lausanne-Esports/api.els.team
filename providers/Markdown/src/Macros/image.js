'use strict'

/**
 * align-left, align-right, align-center, wild
 *
 * <figure>
 *   <img src="$url" class="$align" alt="$legend" />
 *   <figcaption>$legend</figcaption>
 * </figure>
 */
module.exports = (props) => {
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
          alt: props.legend || '',
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
}
