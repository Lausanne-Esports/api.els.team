'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

const Twitch = use('App/Helpers/Twitch');
const Stream = use('App/Models/Stream');

class StreamController {
  async index() {
    const channels = await Stream.query().orderBy('username').fetch();
    const streams = await Twitch.getStreams(channels.toJSON().map(x => x['username']));

    return this.$mergeTwitchData(channels.toJSON(), streams);
  }

  show ({ params }) {
    return Stream.findOrFail(params.id)
  }

  async store({ request, response }) {
    try {
      const channel = await Twitch.getChannel(request.input('username'));

      const stream = await Stream.create({
        twitch_id: channel._id,
        username: request.input('username'),
        display_name: channel.display_name
      });

      return stream;
    } catch(ex) {
      return response.status(400).send(ex);
    }
  }

  async update ({ params, request, response }) {
    try {
      const stream = await Stream.findOrFail(params.id)
      const channel = await Twitch.getChannel(request.input('username'));

      stream.merge({
        twitch_id: channel._id,
        username: request.input('username'),
        display_name: channel.display_name
      });
      await stream.save();

      return response.noContent()
    } catch(ex) {
      return response.status(400).send(ex);
    }
  }

  $mergeTwitchData(channels, streams) {
    channels.forEach(channel => {
      if(streams[channel.username] != null) {
        channel.is_live = true;
        channel.status = streams[channel.username].channel.status;
        channel.game = streams[channel.username].game;
      } else {
        channel.is_live = false;
        channel.status = '';
        channel.game = '';
      }
    });

    return channels;
  }
}

module.exports = StreamController
