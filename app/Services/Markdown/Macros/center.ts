/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

/**
 * <center>$content</center>
 */
export default (content: any, _: any, { transformer, eat }) => ({
  type: 'centerNode',
  data: {
    hName: 'center',
  },
  children: transformer.tokenizeBlock(content, eat.now()),
})
