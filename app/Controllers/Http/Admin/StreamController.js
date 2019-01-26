'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

const Stream = use('App/Models/Stream')
const Twitch = use('App/Helpers/Twitch')

class StreamController {
  async index () {
    const channels = await Stream.query().orderBy('username').fetch()
    const streams = await Twitch.getStreams(channels.toJSON().map(x => x['username']))

    return this.$mergeTwitchData(channels.toJSON(), streams)
  }

  show ({ params }) {
    return Stream.findOrFail(params.id)
  }

  async store ({ request, response }) {
    try {
      const channel = await Twitch.getChannel(request.input('username'))

      const stream = await Stream.create({
        twitch_id: channel._id,
        username: request.input('username'),
        display_name: channel.display_name,
      })

      return stream
    } catch (e) {
      return response.status(400).send(e)
    }
  }

  async update ({ params, request, response }) {
    try {
      const stream = await Stream.findOrFail(params.id)
      const channel = await Twitch.getChannel(request.input('username'))

      stream.merge({
        twitch_id: channel._id,
        username: request.input('username'),
        display_name: channel.display_name,
      })

      await stream.save()

      return response.noContent()
    } catch (e) {
      return response.status(400).send(e)
    }
  }

  $mergeTwitchData (channels, streams) {
    channels.forEach(channel => {
      if (streams[channel.username] !== undefined) {
        channel.is_live = true
        channel.status = streams[channel.username].channel.status
        channel.game = streams[channel.username].game
      } else {
        channel.is_live = false
        channel.status = ''
        channel.game = ''
      }
    })

    return channels;
  }
}

module.exports = StreamController
