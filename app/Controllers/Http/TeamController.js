'use strict'

const { pick } = require('lodash')
const Team = use('App/Models/Team')

class TeamController {
  async index () {
    const teams = (
      await Team.query().with('category').with('members').where('activated', true).fetch()
    ).toJSON()

    return teams.map(team => ({
      ...pick(team, ['id', 'name', 'order', 'category']),
      numberOfPlayers: team.members.length
    }))
  }

  async show ({ params }) {
    const team = (await Team.query().where('id', params.id).with('category').with('members').first()).toJSON()

    team.players = team.members.map((member) => {
      return {
        ...pick(member, ['nickname', 'lastname', 'firstname']),
        role: member.pivot.role,
        socials: [
          { type: 'twitter', url: `https://twitter.com/${member.twitter}` },
          { type: 'facebook', url: `https://www.facebook.com/${member.facebook}` },
          { type: 'twitch', url: `https://www.twitch.tv/${member.twitch}` },
          { type: 'youtube', url: `https://www.youtube.com/channel/${member.youtube}` },
          { type: 'bnet', url: member.battletag },
          { type: 'steam', url: `https://steamcommunity.com/id/${member.steam}` },
        ]
      }
    })

    return {
      ...pick(team, ['id', 'name', 'order', 'academy', 'players', 'category'])
    }
  }
}

module.exports = TeamController
