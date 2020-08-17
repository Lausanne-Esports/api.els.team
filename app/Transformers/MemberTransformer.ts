/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Member from 'App/Models/Member'

interface Social {
  type: string,
  url: string
}

export interface MemberTransformed {
  nickname: string,
  lastname: string,
  firstname: string,
  picture: string,
  role: string,
  academy: boolean,
  socials?: Social[]
}

class MemberTransformer {
  public transform (member: Member): MemberTransformed {
    const socials:Social[] = []

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
      role: member.$extras.pivot_role,
      academy: member.$extras.pivot_academy,
      socials,
    }
  }
}

export default new MemberTransformer()
