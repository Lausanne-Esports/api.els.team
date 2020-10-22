/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

interface ImageProps {
  align: string,
  src: string,
  legend?: string
}

interface Ast {
  type: string,
  data: AstData,
  children: any[]
}

interface AstData {
  hName: string,
  hProperties?: object
}

/**
 * align-left, align-right, align-center, wild
 *
 * <figure>
 *   <img src="$url" class="$align" alt="$legend" />
 *   <figcaption>$legend</figcaption>
 * </figure>
 */
export default (props: ImageProps) => {
  const ast:Ast = {
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
