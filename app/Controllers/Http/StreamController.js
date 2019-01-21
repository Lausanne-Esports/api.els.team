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

  async show ({ params }) {
    const channel = await Stream.findOrFail(params.id);
    const stream = await Twitch.getStreams([channel.username]);
    return this.$mergeTwitchData([channel.toJSON()], stream)[0];
  }

  $mergeTwitchData(channels, streams) {
    channels.forEach(channel => {
      if(streams[channel.username] != null) {
        const stream = streams[channel.username];

        channel.is_live = true;
        channel.is_partner = stream.channel.partner;
        channel.logo = stream.channel.logo;
        channel.viewers = stream.viewers;
        channel.status = stream.channel.status;
        channel.game = stream.game;
        channel.preview = stream.preview.large;
      } else {
        channel.is_live = false;
        channel.is_partner = false;
        channel.logo = '';
        channel.status = '';
        channel.viewers = 0;
        channel.game = '';
        channel.preview = '';
      }
    });

    return channels;
  }
}

module.exports = StreamController
