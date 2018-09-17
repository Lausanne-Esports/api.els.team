'use strict'

const { pick } = require('lodash')
const Team = use('App/Models/Team')

class TeamController {
  async index () {
    const teams = (await Team.query().with('category').with('members').fetch()).toJSON()

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
          { type: 'twitter', url: member.twitter },
          { type: 'facebook', url: member.facebook },
          { type: 'twitch', url: member.twitch },
          { type: 'youtube', url: member.youtube },
          { type: 'bnet', url: member.battletag },
          { type: 'steam', url: member.steam },
        ]
      }
    })

    return {
      ...pick(team, ['id', 'name', 'order', 'players', 'category'])
    }
  }
}

module.exports = TeamController
