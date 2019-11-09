'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const TransformerAbstract = use('TransformerAbstract')

class MemberTransformer extends TransformerAbstract {
  transform (member) {
    const socials = []

    if (member.twitter) {
      socials.push({ type: 'twitter', url: `https://twitter.com/${member.twitter}` })
    }

    if (member.facebook) {
      socials.push({ type: 'facebook', url: `https://www.facebook.com/${member.facebook}` })
    }

    if (member.twitch) {
      socials.push({ type: 'twitch', url: `https://www.twitch.tv/${member.twitch}` })
    }

    if (member.youtube) {
      socials.push({ type: 'youtube', url: `https://www.youtube.com/channel/${member.youtube}` })
    }

    if (member.battletag) {
      socials.push({ type: 'bnet', url: member.battletag })
    }

    if (member.steam) {
      socials.push({ type: 'steam', url: `https://steamcommunity.com/id/${member.steam}` })
    }

    return {
      nickname: member.nickname,
      lastname: member.lastname,
      firstname: member.firstname,
      picture: member.picture,
      role: member.getRelated('pivot').role,
      academy: member.getRelated('pivot').academy,
      socials,
    }
  }
}

module.exports = MemberTransformer
