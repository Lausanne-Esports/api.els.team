/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Harminder Virk & Romain Lanz & Valentin Kaelin
 */

import urlParser from 'url'

interface YoutubeProps {
  url: string,
  width?: string,
  height?: string,
}

interface EmbedProps {
  height: string,
  width: string,
  src: string,
  frameborder: string,
  allow: string,
  allowfullscreen: boolean
}

/**
 * Returns an an error when url is not part of any give
 * domains.
 */
function ensureDomainUrl (url: string, macroName: string, fromDomains: string[] | string) {
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
 */
function getEmbedNode (className: string, props: EmbedProps) {
  return {
    type: 'EmbedNode',
    data: {
      hName: 'div',
      hProperties: {
        className: ['embed', className],
      },
    },
    children: [
      {
        type: 'IFrameNode',
        data: {
          hName: 'iframe',
          hProperties: props,
        },
      },
    ],
  }
}

export default (props: YoutubeProps, { badNode }) => {
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

  let videoId: string | null = null

  const parsedUrl = urlParser.parse(url)

  if (parsedUrl.hostname === 'youtu.be') {
    videoId = parsedUrl.pathname!.replace(/^\//, '')
  } else {
    const matchedTokens = /v=(\w+)/.exec(parsedUrl.query!)
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
