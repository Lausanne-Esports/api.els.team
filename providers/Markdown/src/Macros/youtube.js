/*
* markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const urlParser = require('url')

/**
 * Returns an an error when url is not part of any give
 * domains.
 *
 * @method ensureDomainUrl
 *
 * @param {String} url
 * @param {String} macroName
 * @param {Array|String} fromDomains
 */
function ensureDomainUrl (url, macroName, fromDomains) {
  if (!url) {
    return `define url prop on ${macroName} macro`
  }

  fromDomains = Array.isArray(fromDomains) ? fromDomains : [fromDomains]
  const matched = fromDomains.find(domain => url.indexOf(domain) > -1)

  if (!matched) {
    return 'invalid url domain'
  }
}

/**
 * Returns the embed node for an iframe. The URL and others
 * props are set via `props` parameter.
 *
 * @method getEmbedNode
 *
 * @param {String} className
 * @param {Object} props
 */
function getEmbedNode (className, props) {
  return {
    type: 'EmbedNode',
    data: {
      hName: 'div',
      hProperties: {
        className: ['embed', className],
      }
    },
    children: [
      {
        type: 'IFrameNode',
        data: {
          hName: 'iframe',
          hProperties: props,
        }
      }
    ]
  }
}


module.exports = (props, { badNode }) => {
  const { url, width, height } = Object.assign({
    url: null,
    width: '100%',
    height: '400',
  }, props)

  /**
   * Validate for youtube domains
   */
  const errorMessage = ensureDomainUrl(url, 'youtube', ['youtube.com/watch', 'youtu.be'])
  if (errorMessage) {
    return badNode(errorMessage, 'invalid-yt-domain')
  }

  let videoId = null

  const parsedUrl = urlParser.parse(url)

  if (parsedUrl.hostname === 'youtu.be') {
    videoId = parsedUrl.pathname.replace(/^\//, '')
  } else {
    const matchedTokens = /v=(\w+)/.exec(parsedUrl.query)
    videoId = matchedTokens ? matchedTokens[1] : ''
  }

  /**
   * Ensure existence of video id
   */
  if (!videoId) {
    return badNode('define valid youtube video url', 'invalid-yt-url')
  }

  return getEmbedNode('youtube', {
    height,
    width,
    src: `https://www.youtube.com/embed/${videoId}`,
    frameborder: 'none',
    allow: 'autoplay; encrypted-media',
    allowfullscreen: true,
  })
}
