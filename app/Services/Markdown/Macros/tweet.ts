/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

interface TweetProps {
  link: string
}

/**
 * <blockquote class="twitter-tweet">
 *   <a href="$link"></a>
 * </blockquote>
 */
export default (props:TweetProps) => ({
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
