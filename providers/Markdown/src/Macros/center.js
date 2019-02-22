'use strict'

/**
 * <center>$content</center>
 */
module.exports = (content, _, { transformer, eat }) => ({
  type: 'centerNode',
  data: {
    hName: 'center',
  },
  children: transformer.tokenizeBlock(content, eat.now()),
})
