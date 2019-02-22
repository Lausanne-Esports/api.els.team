'use strict'

/**
 * <blockquote class="twitter-tweet">
 *   <a href="$link"></a>
 * </blockquote>
 */
module.exports = props => ({
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
    },
  }],
})
