'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const { pick } = require('lodash')
const Team = use('App/Models/Team')

class TeamController {
  async index () {
    const teams = (
      await Team.query().with('category').with('members').where('activated', true).fetch()
    ).toJSON()

    return teams.map(team => ({
      ...pick(team, ['id', 'name', 'order', 'category', 'academy']),
      numberOfPlayers: team.members.length
    }))
  }

  async show ({ params }) {
    const team = (await Team.query().where('id', params.id).where('activated', true).with('category').with('members').first()).toJSON()

    team.players = team.members.map((member) => {
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
        ...pick(member, ['nickname', 'lastname', 'firstname']),
        role: member.pivot.role,
        socials
      }
    })

    return {
      ...pick(team, ['id', 'name', 'order', 'academy', 'players', 'category'])
    }
  }
}

module.exports = TeamController
